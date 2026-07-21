/* ============================================================
   ROSTER — crew portraits, run log, timeline & filters
   ============================================================ */

/* ---- sticker-patch icons ---- */
const PATCH_SHOE = [
  [0,0,0,1,1,1,0,0,0],
  [0,0,1,1,1,1,1,0,0],
  [0,1,1,0,0,1,1,1,0],
  [1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1,1,1],
];
const PATCH_HEART = [
  [0,1,1,0,1,1,0],
  [1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1],
  [0,1,1,1,1,1,0],
  [0,0,1,1,1,0,0],
  [0,0,0,1,0,0,0],
];
const PATCH_STAR = [
  [0,0,0,0,1,0,0,0,0],
  [0,0,0,1,1,1,0,0,0],
  [0,0,0,1,1,1,0,0,0],
  [1,1,1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1,1,0],
  [0,1,1,1,1,1,1,1,0],
  [0,1,1,0,0,0,1,1,0],
  [0,1,0,0,0,0,0,1,0],
  [1,0,0,0,0,0,0,0,1],
];
const PATCH_TROPHY = [
  [0,1,1,1,1,1,0],
  [1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1],
  [0,1,1,1,1,1,0],
  [0,0,1,1,1,0,0],
  [0,0,0,1,0,0,0],
  [0,0,1,1,1,0,0],
  [0,1,1,1,1,1,0],
];
const PATCH_ICONS = [PATCH_SHOE, PATCH_HEART, PATCH_STAR, PATCH_TROPHY];

/* ---- crew portraits ---- */
const BODY_ROWS = [
  [0,0,1,1,1,1,1,1,1,1,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,0,0,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,0,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
];
const ANIMALS = {
  cat: {
    top: [
      [0,0,1,0,0,0,0,0,0,0,1,0,0,0],
      [0,1,1,1,0,0,0,0,0,1,1,1,0,0],
      [0,1,1,1,1,0,0,0,1,1,1,1,0,0],
      [0,0,1,1,1,1,0,1,1,1,1,0,0,0],
      [0,0,0,1,1,1,1,1,1,1,0,0,0,0],
    ],
    eyes: [[9,4],[9,9]],
    feat: [[10,6],[10,7],[11,5],[12,6],[12,7],[11,8],[10,1],[10,2],[10,11],[10,12]],
    eyesShut: [[9,3],[9,4],[9,5],[9,8],[9,9],[9,10]],
  },
  dog: {
    top: [
      [0,0,0,0,1,1,0,0,1,1,0,0,0,0],
      [0,0,1,1,1,1,0,0,1,1,1,1,0,0],
      [0,1,1,1,1,1,0,0,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
    ],
    eyes: [[9,4],[9,5],[9,8],[9,9]],
    feat: [[10,5],[10,9],[11,5],[11,6],[11,7],[11,8],[11,9]],
    eyesShut: [[9,4],[9,5],[9,8],[9,9]],
    mouthOpen: [[11,6],[11,7]],
  },
  bear: {
    top: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,1,1,0,0,0,0,0,0,1,1,0,0],
      [0,1,1,1,1,0,0,0,0,1,1,1,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
    ],
    eyes: [[9,4],[9,9]],
    feat: [[10,6],[10,7]],
    eyesShut: [[9,3],[9,4],[9,5],[9,8],[9,9],[9,10]],
  },
  fox: {
    top: [
      [0,0,1,1,0,0,0,0,0,0,1,1,0,0],
      [0,0,1,1,1,0,0,0,0,1,1,1,0,0],
      [0,0,1,1,1,1,0,0,1,1,1,1,0,0],
      [0,0,0,1,1,1,1,1,1,1,1,0,0,0],
      [0,0,0,0,1,1,1,1,1,1,0,0,0,0],
    ],
    eyes: [[9,4],[9,9]],
    feat: [[10,6],[11,5],[11,6],[11,7],[11,8]],
    eyesShut: [[9,3],[9,4],[9,5],[9,8],[9,9],[9,10]],
    wink: [[9,4],[9,8],[9,9],[9,10]],
  },
  rabbit: {
    top: [
      [0,0,0,1,0,0,0,0,0,0,1,0,0,0],
      [0,0,0,1,0,0,0,0,0,0,1,0,0,0],
      [0,0,0,1,1,0,0,0,0,1,1,0,0,0],
      [0,0,0,1,1,1,0,0,1,1,1,0,0,0],
      [0,0,0,0,1,1,1,1,1,1,0,0,0,0],
    ],
    eyes: [[9,4],[9,9]],
    feat: [[10,6],[10,7],[11,6],[11,7]],
    eyesShut: [[9,3],[9,4],[9,5],[9,8],[9,9],[9,10]],
  },
  owl: {
    top: [
      [0,0,0,1,0,0,0,0,0,0,1,0,0,0],
      [0,0,1,1,0,0,0,0,0,1,1,0,0,0],
      [0,1,1,1,1,0,0,0,1,1,1,1,0,0],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    eyes: [[8,3],[8,4],[9,3],[9,4],[8,9],[8,10],[9,9],[9,10]],
    feat: [[10,6],[11,6],[11,7]],
    eyesShut: [[9,3],[9,4],[9,9],[9,10]],
  },
  panda: {
    top: [
      [0,1,1,0,0,0,0,0,0,0,0,1,1,0],
      [1,1,1,1,0,0,0,0,0,0,1,1,1,1],
      [1,1,1,1,0,0,0,0,0,0,1,1,1,1],
      [0,1,1,0,1,1,1,1,1,1,0,1,1,0],
      [0,0,0,1,1,1,1,1,1,1,1,0,0,0],
    ],
    eyes: [[8,3],[8,4],[9,3],[9,4],[10,3],[8,9],[8,10],[9,9],[9,10],[10,10]],
    feat: [[10,6],[10,7],[11,6],[11,7]],
    eyesShut: [[9,3],[9,4],[9,9],[9,10]],
    mouthOpen: [[11,6],[11,7]],
  },
  unicorn: {
    top: [
      [0,0,0,0,0,4,4,0,0,0,0,0,0,0],
      [0,0,0,0,0,4,4,0,0,0,0,0,0,0],
      [0,0,1,0,0,4,4,0,0,1,0,0,0,0],
      [0,1,1,1,0,4,4,0,1,1,1,0,0,0],
      [0,0,1,1,1,1,1,1,1,1,0,0,0,0],
    ],
    eyes: [[8,4],[9,4],[8,9],[9,9]],
    feat: [[11,5],[11,6],[11,7],[11,8]],
    eyesShut: [[9,4],[9,9]],
  },
  frog: {
    top: [
      [0,0,1,1,0,0,0,0,0,0,1,1,0,0],
      [0,1,1,1,1,0,0,0,0,1,1,1,1,0],
      [0,1,1,1,1,0,0,0,0,1,1,1,1,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
      [0,0,0,1,1,1,1,1,1,1,1,0,0,0],
    ],
    eyes: [[1,2],[1,3],[1,10],[1,11]],   // pupils up in the eye-bumps
    feat: [[11,4],[11,5],[11,6],[11,7],[11,8],[11,9]],   // wide smile
    eyesShut: [[1,2],[1,3],[1,10],[1,11]],
  },
  pig: {
    top: [
      [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
      [1,1,1,0,0,0,0,0,0,0,0,1,1,1],
      [0,1,1,1,1,0,0,0,0,1,1,1,1,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
      [0,0,0,1,1,1,1,1,1,1,1,0,0,0],
    ],
    eyes: [[9,4],[9,9]],
    feat: [[10,6],[10,7],[11,6],[11,7]],   // snout
    eyesShut: [[9,3],[9,4],[9,5],[9,8],[9,9],[9,10]],
  },
  mouse: {
    top: [
      [0,1,1,1,0,0,0,0,0,0,1,1,1,0],
      [1,1,1,1,1,0,0,0,0,1,1,1,1,1],
      [1,1,1,1,1,0,0,0,0,1,1,1,1,1],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
    ],
    eyes: [[9,4],[9,9]],
    feat: [[10,6],[10,7],[11,6],[11,7]],   // little snout
    eyesShut: [[9,3],[9,4],[9,5],[9,8],[9,9],[9,10]],
  },
  koala: {
    top: [
      [1,1,1,0,0,0,0,0,0,0,0,1,1,1],
      [1,1,1,1,0,0,0,0,0,0,1,1,1,1],
      [1,1,1,1,0,0,0,0,0,0,1,1,1,1],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
    ],
    eyes: [[9,4],[9,9]],
    feat: [[10,6],[10,7],[11,5],[11,6],[11,7],[11,8]],   // big nose
    eyesShut: [[9,3],[9,4],[9,5],[9,8],[9,9],[9,10]],
  },
};
const PALETTE = {1:'#FAF8F2', 2:'#5C3221', 4:'#D9A441'};

/* Sparkle overlays (svg-unit coords) for the unicorn's magical frames */
const SPARKLE_FRAMES = {
  1: [[70, 6, '#FAF8F2', 4], [98, 34, '#E3A8AE', 3.5]],
  2: [[40, 2, '#D9A441', 3.5], [104, 16, '#FAF8F2', 4], [16, 44, '#E3A8AE', 3]],
};

/* Per-character animation loops — each entry is a "pose" (a sprite frame).
   pose fields: dx/dy (px shift), sx/sy (squash/stretch about bottom-centre),
   blink, wink, mouthOpen, sparkle. */
const SPRITE_FRAMES = {
  cat:     [{}, {dy:-4, dx:-1}, {dy:-6}, {dy:-4, dx:1}, {}, {blink:true}],           // springy bounce + blink
  dog:     [{mouthOpen:true}, {dy:-3, mouthOpen:false}, {mouthOpen:true}, {dy:-3, mouthOpen:false}], // panting
  bear:    [{dx:-2, sy:0.96, dy:2}, {dx:0, dy:-2}, {dx:2, sy:0.96, dy:2}, {dx:0, dy:-2}],            // waddle
  fox:     [{sy:0.82, dy:8, sx:1.12}, {sy:1.12, dy:-12, sx:0.94}, {dy:-16}, {sy:0.9, dy:4, sx:1.08}, {wink:true}], // pounce + wink
  rabbit:  [{sy:0.8, dy:8, sx:1.15}, {sy:1.12, dy:-14, sx:0.92}, {dy:-22}, {dy:-12}, {sy:0.86, dy:4, sx:1.1}, {}], // big hops
  owl:     [{}, {dy:-2}, {blink:true, dy:-2}, {}, {blink:true}, {dy:-2}],            // head bob + blink
  panda:   [{mouthOpen:true}, {mouthOpen:false, dy:-2}, {mouthOpen:true}, {blink:true}, {mouthOpen:false, dy:-2}], // munching
  unicorn: [{dy:-2, sparkle:1}, {dy:-6, sparkle:2}, {dy:-9, sparkle:1}, {dy:-6, sparkle:2}, {dy:-2, sparkle:1}, {dy:0}], // float + sparkle
  frog:    [{sy:0.82, dy:8, sx:1.12}, {sy:1.12, dy:-14, sx:0.92}, {dy:-20}, {dy:-12}, {sy:0.88, dy:4, sx:1.1}, {}], // ribbit hops
  pig:     [{}, {dy:-3, dx:-1}, {dy:-5}, {dy:-3, dx:1}, {}, {dy:-2}], // happy bounce
  mouse:   [{}, {dy:-2, dx:-1}, {dy:-3}, {dy:-2, dx:1}, {}, {blink:true}], // quick scurry + blink
  koala:   [{}, {dx:-1}, {blink:true}, {dx:1}, {}, {blink:true}],          // sleepy sway
};

/* Render one sprite frame. pose (optional) animates the pixels within a fixed box. */
function renderSprite(animalKey, outW, pose){
  outW = outW || 48;
  pose = pose || {};
  const anim = ANIMALS[animalKey];
  const full = [...anim.top, ...BODY_ROWS];
  const cols = 14, px = 8.6;
  const w = cols*px, h = full.length*px;
  const sx = pose.sx || 1, sy = pose.sy || 1, dx = pose.dx || 0, dy = pose.dy || 0;
  const pivotX = w/2, pivotY = h;   // squash/stretch anchored at the feet
  const parts = [];
  function cell(x, y, fill, s){
    s = s || px;
    const X = pivotX + (x - pivotX)*sx + dx;
    const Y = pivotY + (y - pivotY)*sy + dy;
    parts.push(`<rect x="${X.toFixed(1)}" y="${Y.toFixed(1)}" width="${(s*sx+0.15).toFixed(2)}" height="${(s*sy+0.15).toFixed(2)}" fill="${fill}"/>`);
  }
  // body / fur / horn
  for(let r=0;r<full.length;r++){
    for(let c=0;c<full[r].length;c++){
      const v = full[r][c];
      if(v && PALETTE[v]) cell(c*px, r*px, PALETTE[v]);
    }
  }
  // facial features (nose / mouth / whiskers)
  (anim.feat || []).forEach(([r,c]) => cell(c*px, r*px, '#5C3221'));
  // eyes — open, closed (blink), or winking
  const eyeSet = pose.blink ? (anim.eyesShut || anim.eyes)
               : pose.wink  ? (anim.wink || anim.eyes)
               : anim.eyes;
  (eyeSet || []).forEach(([r,c]) => cell(c*px, r*px, '#5C3221'));
  // open mouth (pant / munch)
  if(pose.mouthOpen && anim.mouthOpen) anim.mouthOpen.forEach(([r,c]) => cell(c*px, r*px, '#E3A8AE'));
  // blush cheeks
  cell(w*0.22, h*0.54, '#E3A8AE');
  cell(w*0.64, h*0.54, '#E3A8AE');
  // sparkles (unicorn)
  if(pose.sparkle && SPARKLE_FRAMES[pose.sparkle]){
    SPARKLE_FRAMES[pose.sparkle].forEach(([x,y,col,s]) => cell(x, y, col, s));
  }
  return `<svg viewBox="0 0 ${w} ${h}" width="${outW}" height="${(outW*h/w).toFixed(0)}" style="display:block;">${parts.join('')}</svg>`;
}

/* idle portrait */
function buildPortrait(animalKey, outW){
  return renderSprite(animalKey, outW, {});
}

/* On hover, cycle a character's sprite frames inside its (static) box. */
function attachSpriteAnimation(cell, animalKey, size){
  const frame = cell.querySelector('.avatar-frame');
  if(!frame) return;
  const seq = SPRITE_FRAMES[animalKey] || [{}];
  let i = 0, timer = null;
  cell.addEventListener('mouseenter', () => {
    if(timer) return;
    i = 0;
    const tick = () => { frame.innerHTML = renderSprite(animalKey, size, seq[i % seq.length]); i++; };
    tick();
    timer = setInterval(tick, 130);
  });
  cell.addEventListener('mouseleave', () => {
    clearInterval(timer); timer = null;
    frame.innerHTML = renderSprite(animalKey, size, {});
  });
}


/* builds a tiny standalone patch badge */
function patchIcon(grid, filled){
  const px = 2.1;
  const w = grid[0].length*px, h = grid.length*px;
  const ox = 20 - w/2, oy = 20 - h/2;
  let rects = '';
  if(filled){
    for(let r=0;r<grid.length;r++){
      for(let c=0;c<grid[r].length;c++){
        if(grid[r][c]){
          rects += `<rect x="${(ox+c*px).toFixed(1)}" y="${(oy+r*px).toFixed(1)}" width="${(px+0.12).toFixed(2)}" height="${(px+0.12).toFixed(2)}" fill="#E3A8AE"/>`;
        }
      }
    }
  }
  return `<svg viewBox="0 0 40 40" width="34" height="34" style="display:block;">
    <circle cx="20" cy="20" r="17.5" fill="none" stroke="#5C3221" stroke-width="1.4" stroke-dasharray="0.1 4.2" opacity="${filled?1:0.4}"/>
    ${rects}
  </svg>`;
}

/* ---- roster ---- */
const CREW = [
  { name:'Rui',      animal:'cat',    bg:'#D9A441' },
  { name:'Katy',     animal:'dog',    bg:'#7C9070' },
  { name:'Allison',  animal:'bear',   bg:'#8C5B44' },
  { name:'Tac',  animal:'fox',    bg:'#D97B4F' },
  { name:'Gordon',   animal:'rabbit', bg:'#6E8CA0' },
  { name:'Becca',    animal:'owl',    bg:'#8A8F5C' },
  { name:'Nicole',   animal:'panda',  bg:'#5C6B73' },
];
const GUESTS = [
  { name:'Hanna',     animal:'unicorn', bg:'#E3A8AE' },
  { name:'Joanne',    animal:'frog', bg:'#6FA35B' },
  { name:'Logan',     animal:'pig',  bg:'#D98BA0' },
  { name:'Anying',    animal:'mouse', bg:'#B07AA1' },
  { name:'Katherine', animal:'koala', bg:'#7BA7B0' },
];
const ROSTER = {};
[...CREW, ...GUESTS].forEach(p=> ROSTER[p.name] = p);

/* ---- run log ---- */
const runLog = [
  {
    date:'APR 29',
    title:'Tiff & Rui Twin Peaks Trail Run',
    runners:['Tac','Rui','Allison','Gordon','Nicole'],
    photos:['images/apr29-1.jpg', 'images/apr29-2.jpg']
  },
  {
    date:'MAY 06',
    title:"I walk this lonely boob, the only one I have ever known",
    runners:['Rui'],
    photos:['images/may06-1.jpg', 'images/may06-2.jpg']
  },
  {
    date:'MAY 14',
    title:'Same boob, different day!',
    runners:['Rui','Allison','Gordon','Nicole'],
    photos:['images/may14-1.jpg', 'images/may14-2.jpg']
  },
  {
    date:'JUN 10',
    title:'Booben Arrow',
    runners:['Rui','Allison','Hanna','Katy','Nicole','Tac'],
    photos:['images/jun10-1.jpg', 'images/jun10-2.jpg']
  },
  {
    date:'JUN 17',
    title:'boobye derek',
    runners:['Rui','Nicole','Gordon','Becca'],
    photos:['images/jun17-1.jpg', 'images/jun17-2.jpg']
  },
  {
    date:'JUL 07',
    title:'Return of the Boob',
    runners:['Rui','Nicole','Allison','Gordon','Joanne','Logan'],
    photos:['images/jul07-1.jpg', 'images/jul07-2.jpg']
  },
  {
    date:'JUL 16',
    title:"Boob Run - Thursday's Version",
    runners:['Rui','Allison','Nicole','Anying','Katherine'],
    photos:['images/jul16-1.jpg', 'images/jul16-2.jpg']
  },
];

/* Newcomers = anyone whose first-ever run is the most recent event.
   They get the ✦ star (and are listed as regular runners). */
const _latestRun = runLog.length - 1;
const _firstSeen = {}, _lastSeen = {};
runLog.forEach((r, i) => r.runners.forEach(n => {
  if(_firstSeen[n] === undefined) _firstSeen[n] = i;
  _lastSeen[n] = i;
}));
const newcomers = new Set(Object.keys(_firstSeen).filter(n => _firstSeen[n] === _latestRun));
const star = n => newcomers.has(n) ? ' ✦' : '';

let activeFilter = null;

/* tiny gold pixel crown for the captain */
function crownSVG(w){
  const h = Math.round(w * 0.82);
  return `<svg viewBox="0 0 12 10" width="${w}" height="${h}" style="display:block;overflow:visible;">
    <path d="M1 6 L2 2 L4 4.7 L6 1.4 L8 4.7 L10 2 L11 6 L11 8.2 L1 8.2 Z" fill="#D9A441" stroke="#5C3221" stroke-width="0.7" stroke-linejoin="round"/>
    <circle cx="2" cy="2" r="0.7" fill="#E3A8AE"/>
    <circle cx="6" cy="1.4" r="0.8" fill="#E3A8AE"/>
    <circle cx="10" cy="2" r="0.7" fill="#E3A8AE"/>
  </svg>`;
}

/* static framed box + the animatable pixel character inside it,
   plus a randomly-tilted crown in a top corner for the captain */
function avatarWithCrown(p, size, isCaptain){
  const pixels = buildPortrait(p.animal, size);
  const side = Math.random() < 0.5 ? 'crown-left' : 'crown-right';
  const crown = isCaptain ? `<span class="crown ${side}">${crownSVG(Math.round(size*0.6))}</span>` : '';
  return `<span class="avatar-wrap"><span class="avatar-frame" style="background:${p.bg}">${pixels}</span>${crown}</span>`;
}

function miniAvatarRow(names){
  return names.map(n=>{
    const p = ROSTER[n];
    if(!p) return '';
    // no crown / captain badge in the timeline — those live only in the BOOB CUP bar
    const icon = avatarWithCrown(p, 30, false);
    return `<div class="run-avatar"><span class="ra-icon">${icon}</span><span class="ra-name">${n}</span></div>`;
  }).join('');
}

function buildPhotoGallery(photos){
  if(!photos || !photos.length) return '';
  // fan the set outward: leftmost photo tilts left, rightmost tilts right
  const n = photos.length, MAG = 3;
  const tiles = photos.map((src, i) => {
    const tilt = n === 1 ? -2.5 : (-1 + (2 * i) / (n - 1)) * MAG;
    return `<div class="polaroid" style="--tilt:${tilt.toFixed(2)}deg"><img src="${src}" alt="Run snapshot"></div>`;
  }).join('');
  return `<div class="run-photos">${tiles}</div>`;
}

/* Render active run entries — newest first (most recent on top) */
const runList = document.getElementById('runList');
for(let idx = runLog.length - 1; idx >= 0; idx--){
  const log = runLog[idx];
  const entry = document.createElement('div');
  entry.className = 'run-entry';
  entry.dataset.runners = JSON.stringify(log.runners);
  const patch = patchIcon(PATCH_ICONS[idx % PATCH_ICONS.length], true);

  const hasRoute = window.runHasRoute && window.runHasRoute(log.date);
  const mapTile = hasRoute
    ? '<div class="run-map"><div class="run-map-canvas"></div><button class="run-map-view" type="button">view route <span>&#8599;</span></button></div>'
    : '<div class="run-map run-map--empty"><div class="run-map-canvas"><span class="run-map-empty-label">no route logged</span></div><div class="run-map-view">— no route —</div></div>';

  entry.innerHTML = `
    <div class="run-num">${patch}</div>
    <div class="run-body">
      <div class="run-layout">
        ${mapTile}
        <div class="run-content">
          <div class="run-head">
            <span class="run-date">${log.date}</span>
            <span class="run-title">${log.title}</span>
          </div>
          <div class="run-runners">
            <div class="run-meta"><span class="rlabel">RUNNERS</span></div>
            <div class="run-avatars">${miniAvatarRow(log.runners)}</div>
          </div>
        </div>
        ${buildPhotoGallery(log.photos)}
      </div>
    </div>
  `;

  runList.appendChild(entry);

  // mini route map + "view route" modal
  if(hasRoute){
    const canvas = entry.querySelector('.run-map-canvas');
    if(canvas && window.makeMiniMap) window.makeMiniMap(canvas, log.date);
    const tile = entry.querySelector('.run-map');
    if(tile && window.openRouteModal) tile.addEventListener('click', () => window.openRouteModal(log.date));
  }
}

/* Filter Application System */
function toggleFilter(name) {
  const grid = document.getElementById('filterGrid');
  const cells = document.querySelectorAll('.cup-row');
  const entries = document.querySelectorAll('.run-entry');

  if (activeFilter === name) {
    activeFilter = null;
    grid.classList.remove('is-filtering');
    cells.forEach(c => c.classList.remove('active'));
    entries.forEach(e => e.classList.remove('hidden'));
  } else {
    activeFilter = name;
    grid.classList.add('is-filtering');
    cells.forEach(c => {
      if (c.dataset.name === name) c.classList.add('active');
      else c.classList.remove('active');
    });
    entries.forEach(e => {
      const runnersList = JSON.parse(e.dataset.runners);
      if (runnersList.includes(name)) e.classList.remove('hidden');
      else e.classList.add('hidden');
    });
  }
}

/* Count attendance across the run log */
const attendance = {};
[...CREW, ...GUESTS].forEach(p => attendance[p.name] = 0);
runLog.forEach(r => r.runners.forEach(n => { if(attendance[n] !== undefined) attendance[n]++; }));

/* Render the Boob Cup — ranked by attendance; newcomers win ties */
const CUP_VISIBLE = 8;   // show top 8, hide the rest behind "see all"
const filterGrid = document.getElementById('filterGrid');
const rosterByAttendance = [...CREW, ...GUESTS].sort((a,b) => {
  if(attendance[b.name] !== attendance[a.name]) return attendance[b.name] - attendance[a.name];
  return (_lastSeen[b.name] ?? -1) - (_lastSeen[a.name] ?? -1);  // ties: most recent runner first
});
rosterByAttendance.forEach((p, i) => {
  const rank = i + 1;
  const isCaptain = p.name === 'Rui';
  const guestMark = star(p.name);
  const count = attendance[p.name];

  const row = document.createElement('div');
  row.className = 'cup-row' + (rank === 1 ? ' first' : '') + (i >= CUP_VISIBLE ? ' cup-hidden' : '');
  row.dataset.name = p.name;
  row.dataset.animal = p.animal;
  row.title = `Filter the timeline by ${p.name}`;
  row.innerHTML = `
    <span class="cup-rank">${rank}</span>
    <span class="cup-avatar">${avatarWithCrown(p, 34, isCaptain)}</span>
    <span class="cup-name">${p.name}${guestMark}</span>
    <span class="cup-score"><span class="n">${count}</span><span class="u">RUN${count === 1 ? '' : 'S'}</span></span>
  `;
  row.addEventListener('click', () => toggleFilter(p.name));
  attachSpriteAnimation(row, p.animal, 34);
  filterGrid.appendChild(row);
});

/* "see all" toggle for entries beyond the top 8 */
if(rosterByAttendance.length > CUP_VISIBLE){
  const extra = rosterByAttendance.length - CUP_VISIBLE;
  const seeAll = document.createElement('button');
  seeAll.type = 'button';
  seeAll.className = 'cup-seeall';
  seeAll.textContent = `see all (+${extra})`;
  seeAll.addEventListener('click', () => {
    const expanded = filterGrid.classList.toggle('show-all');
    seeAll.textContent = expanded ? 'show less' : `see all (+${extra})`;
  });
  filterGrid.appendChild(seeAll);
}

/* Clicking anywhere outside a Boob Cup row clears the active filter */
document.addEventListener('click', (e) => {
  if (activeFilter && !e.target.closest('.cup-row, .cup-seeall')) toggleFilter(activeFilter);
});
