/* Generate the social-preview image (images/og.png) showing the current
   Boob Cup leader, and sync index.html's og/twitter meta.

   Run before pushing whenever the leaderboard changes:
     node scripts/make-og.mjs

   Reads the roster/run-log straight from js/roster.js (single source of
   truth) and renders a 1200x630 card with headless Chrome. */

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = dirname(here);
const rosterSrc = readFileSync(join(root, 'js/roster.js'), 'utf8');

/* parse CREW + GUESTS (name/animal/bg), preserving order */
function parseRoster(block){
  return [...block.matchAll(/name:\s*'([^']+)',\s*animal:\s*'([^']+)',\s*bg:\s*'([^']+)'/g)]
    .map(m => ({ name: m[1], animal: m[2], bg: m[3] }));
}
const crew = parseRoster(rosterSrc.match(/const CREW = \[([\s\S]*?)\];/)[1]);
const guests = parseRoster(rosterSrc.match(/const GUESTS = \[([\s\S]*?)\];/)[1]);
const roster = [...crew, ...guests];

/* tally attendance from every runLog `runners: [...]` array */
const att = Object.fromEntries(roster.map(p => [p.name, 0]));
for(const m of rosterSrc.matchAll(/runners:\s*\[([^\]]*)\]/g)){
  for(const nm of m[1].matchAll(/'([^']+)'/g)){
    if(att[nm[1]] !== undefined) att[nm[1]]++;
  }
}
const leaderP = [...roster].sort((a, b) => att[b.name] - att[a.name])[0];
const leader = leaderP.name;
const count = att[leader];
console.log(`Boob Cup leader: ${leader} (${count} runs)`);

/* render the 1200x630 card */
const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=DotGothic16&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box;}
  .wrap{width:1200px;height:630px;background:#FAF8F2;position:relative;
    display:flex;align-items:center;justify-content:center;
    font-family:'Space Mono',monospace;color:#5C3221;overflow:hidden;}
  .col{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;padding:0 60px;}
  .trophy{font-size:132px;line-height:1;}
  .name{font-family:'DotGothic16',monospace;font-size:104px;letter-spacing:8px;margin-top:4px;}
  .sub{font-size:37px;letter-spacing:2px;color:#615D51;margin-top:8px;}
  .brand{position:absolute;bottom:46px;left:0;right:0;text-align:center;
    font-family:'DotGothic16',monospace;font-size:18px;letter-spacing:6px;color:#5C3221;opacity:.55;}
</style></head>
<body><div class="wrap">
  <div class="col">
    <div class="trophy">🏆</div>
    <div class="name">${leader.toUpperCase()}</div>
    <div class="sub">is holding the Boob&nbsp;Cup</div>
  </div>
  <div class="brand">BOOB&nbsp;CUP</div>
</div></body></html>`;

const tmp = join(here, '.og-tmp.html');
writeFileSync(tmp, html);
const out = join(root, 'images/og.png');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
execFileSync(chrome, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-sandbox',
  '--force-device-scale-factor=1', '--virtual-time-budget=4000',
  `--screenshot=${out}`, '--window-size=1200,630',
  'file://' + tmp,
], { stdio: 'inherit' });
unlinkSync(tmp);
if(!existsSync(out)) throw new Error('images/og.png was not created');

/* keep index.html meta in sync (leader line + cache-busting ?v) */
const idxPath = join(root, 'index.html');
let idx = readFileSync(idxPath, 'utf8');
const line = `${leader} is holding the Boob Cup 🏆`;
idx = idx.replace(/content="[^"]*is holding the Boob Cup[^"]*"/g, `content="${line}"`);
idx = idx.replace(/(images\/og\.png\?v=)[^"]*/g, `$1${leader.toLowerCase()}-${count}`);
writeFileSync(idxPath, idx);
console.log('Wrote images/og.png and synced index.html meta.');
