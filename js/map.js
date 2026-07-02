/* ============================================================
   MAP — pixel-art SVG map of the Twin Peaks route
   ============================================================ */
const NS = "http://www.w3.org/2000/svg";
function el(tag, attrs){
  const e = document.createElementNS(NS, tag);
  for(const k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}
const svg = document.getElementById('mapSvg');

const lonMin=-122.483, lonMax=-122.428, latMin=37.730, latMax=37.786;
const PAD=20, MW=780, MH=1005;
function X(lon){ return PAD + (lon-lonMin)/(lonMax-lonMin) * MW; }
function Y(lat){ return PAD + (latMax-lat)/(latMax-latMin) * MH; }
function P(lat,lon){ return {x:X(lon), y:Y(lat)}; }
function clipX(x){ return Math.max(PAD, Math.min(PAD+MW, x)); }

/* ---- background dot-grid ---- */
const bg = el('g', {opacity:'0.28'});
for(let x=6; x<=814; x+=16){
  for(let y=6; y<=1039; y+=16){
    bg.appendChild(el('circle', {cx:x, cy:y, r:0.9, fill:'#5C3221'}));
  }
}
svg.appendChild(bg);

/* clip map content to the inner frame */
const clipRect = el('clipPath', {id:'mapClip'});
clipRect.appendChild(el('rect', {x:PAD,y:PAD,width:MW,height:MH}));
svg.appendChild(clipRect);
const mapLayer = el('g', {'clip-path':'url(#mapClip)'});
svg.appendChild(mapLayer);


function dottedPath(points, w){
  const d = points.map((pt,i)=> (i===0?'M':'L') + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1)).join(' ');
  return el('path', { d, fill:'none', stroke:'#5C3221', 'stroke-width': w||4, 'stroke-linecap':'round', 'stroke-dasharray':'0.1 11' });
}
function label(x,y,txt,size,anchor,rot){
  const t = el('text', {x,y,'font-size':size||12, fill:'#5C3221','letter-spacing':'2','text-anchor':anchor||'middle'});
  if(rot) t.setAttribute('transform', `rotate(${rot} ${x} ${y})`);
  t.textContent = txt;
  return t;
}

/* ---- pixel-art helper ---- */
function pixelArt(g, ox, oy, grid, px, palette){
  palette = palette || {1:'#5C3221', 2:'#FAF8F2', 3:'#E3A8AE'};
  for(let r=0;r<grid.length;r++){
    for(let c=0;c<grid[r].length;c++){
      const v = grid[r][c];
      if(v && palette[v]){
        g.appendChild(el('rect', {x:ox+c*px, y:oy+r*px, width:px+0.15, height:px+0.15, fill:palette[v]}));
      }
    }
  }
}

// Kawaii environmental matrices
const PUFF_TREE = [
  [0,0,1,1,1,0,0],
  [0,1,1,1,1,1,0],
  [1,1,3,1,3,1,1],
  [1,1,1,1,1,1,1],
  [0,1,1,1,1,1,0],
  [0,0,0,1,0,0,0],
  [0,0,0,1,0,0,0]
];

const HAPPY_HILL = [
  [0,0,0,0,0,1,1,1,0,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,1,0,0],
  [0,1,1,0,1,1,1,1,1,0,1,1,0],
  [1,1,1,1,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const TOWER = [
  [0,0,0,1,0,0,0],
  [0,0,0,1,0,0,0],
  [0,0,1,1,1,0,0],
  [0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0],
  [1,0,0,1,0,0,1],
  [1,0,0,1,0,0,1],
  [1,0,0,1,0,0,1],
  [1,1,1,1,1,1,1],
];

const BEAR_SHIELD = [
  [0,1,1,0,0,0,0,1,1,0],
  [1,1,1,1,0,0,1,1,1,1],
  [1,1,2,2,1,1,2,2,1,1],
  [1,2,2,2,2,2,2,2,2,1],
  [1,2,1,2,2,2,2,1,2,1],
  [1,2,2,2,2,1,2,2,2,1],
  [0,1,2,2,1,2,1,2,1,0],
  [0,0,1,2,2,2,2,1,0,0],
  [0,0,0,1,1,1,1,0,0,0]
];

const FLOWER = [
  [0,1,0,1,0],
  [1,0,1,0,1],
  [0,1,3,1,0],
  [1,0,1,0,1],
  [0,1,0,1,0],
];

function scatterPuffs(cx,cy,count,spread){
  const g = el('g');
  for(let i=0;i<count;i++){
    const x = cx + (Math.random()-0.5)*spread;
    const y = cy + (Math.random()-0.5)*spread*0.6;
    pixelArt(g, x, y, PUFF_TREE, 2.3, {1:'#5C3221', 3:'#E3A8AE'});
  }
  mapLayer.appendChild(g);
}
function scatterFlowers(cx,cy,count,spread){
  const g = el('g');
  for(let i=0;i<count;i++){
    const x = cx + (Math.random()-0.5)*spread;
    const y = cy + (Math.random()-0.5)*spread*0.5;
    pixelArt(g, x, y, FLOWER, 2);
  }
  mapLayer.appendChild(g);
}

/* ---- Golden Gate Park ---- */
const ggpNW = P(37.7714, -122.511);
const ggpSE = P(37.7658, -122.4548);
mapLayer.appendChild(dottedPath([
  {x:clipX(ggpNW.x), y:ggpNW.y}, {x:ggpSE.x, y:ggpNW.y},
  {x:ggpSE.x, y:ggpSE.y}, {x:clipX(ggpNW.x), y:ggpSE.y}
], 2.4));
mapLayer.appendChild(label(ggpSE.x-70, ggpNW.y+30, 'GOLDEN GATE', 12, 'middle'));
mapLayer.appendChild(label(ggpSE.x-70, ggpNW.y+46, 'PARK', 12, 'middle'));
scatterPuffs(ggpSE.x-190, ggpNW.y+95, 5, 90);
scatterPuffs(ggpSE.x-40, ggpNW.y+50, 3, 40);
scatterFlowers(ggpSE.x-260, ggpNW.y+40, 3, 50);

/* ---- Geary Blvd ---- */
const geary = [ P(37.7815, lonMin), P(37.7815, lonMax) ];
mapLayer.appendChild(dottedPath(geary, 4));
mapLayer.appendChild(label((geary[0].x+geary[1].x)/2 + 70, geary[0].y-14, 'GEARY BLVD', 13));

/* ---- Route 1 / Park Presidio Blvd - 19th Ave ---- */
const rt1 = [ P(37.786, -122.4756), P(37.735, -122.4756) ];
mapLayer.appendChild(el('path', {
  d: `M ${rt1[0].x.toFixed(1)} ${rt1[0].y.toFixed(1)} L ${rt1[1].x.toFixed(1)} ${rt1[1].y.toFixed(1)}`,
  fill:'none', stroke:'#5C3221', 'stroke-width':6.5, 'stroke-linecap':'round', 'stroke-dasharray':'0.1 7'
}));

const shieldPos = {x: rt1[0].x - 14, y: rt1[0].y + 20};
mapLayer.appendChild((function(){ const g=el('g'); pixelArt(g, shieldPos.x, shieldPos.y, BEAR_SHIELD, 2.8, {1:'#5C3221', 2:'#FAF8F2'}); return g; })());
mapLayer.appendChild(label(shieldPos.x+14, shieldPos.y+40, 'HWY 1', 10));
mapLayer.appendChild(label(shieldPos.x+14, shieldPos.y+52, '19TH AVE', 8));

/* ---- 22nd Avenue ---- */
const ave22 = [ P(37.786, -122.4804), P(37.7350, -122.4804) ];
mapLayer.appendChild(dottedPath(ave22, 2.6));
mapLayer.appendChild(label(ave22[0].x-8, ave22[0].y+40, '22ND AVE', 11, 'end', -90));


/* ---- Divisadero St -> becomes Castro St ---- */
const divCastro = [
  P(37.7815, -122.4374), P(37.7717, -122.4374),
  P(37.7626, -122.4350), P(37.7517, -122.4337), P(37.7365, -122.4335),
];
mapLayer.appendChild(dottedPath(divCastro.slice(0,2), 4));
mapLayer.appendChild(dottedPath(divCastro.slice(1), 3.2));
mapLayer.appendChild(label(divCastro[0].x+16, (divCastro[0].y+divCastro[1].y)/2, 'DIVISADERO ST', 11, 'start', -90));
mapLayer.appendChild(label(divCastro[3].x+18, divCastro[3].y, 'CASTRO ST', 11, 'start'));

/* ---- Market St ---- */
const marketPts = [
  P(37.7626, -122.4350),
  P(37.7676, -122.4290),
  {x: 800, y: 251 },
];
mapLayer.appendChild(dottedPath(marketPts, 3.4));
mapLayer.appendChild(label(marketPts[1].x-30, marketPts[1].y-10, 'MARKET ST', 11, 'start', -40));

/* ---- Buena Vista Park + Corona Heights Park ---- */
const bvp = P(37.7683, -122.4396);
mapLayer.appendChild((function(){ const g=el('g'); pixelArt(g, bvp.x-6, bvp.y-6, HAPPY_HILL, 1.4, {1:'#5C3221', 2:'#FAF8F2', 3:'#E3A8AE'}); return g; })());
mapLayer.appendChild(label(bvp.x, bvp.y+22, 'BUENA VISTA PARK', 9));
scatterPuffs(bvp.x, bvp.y-16, 3, 30);
mapLayer.appendChild(label(bvp.x+58, bvp.y+40, 'CORONA HEIGHTS PARK', 7));

/* ---- Portola Dr ---- */
const portola = [ P(37.7480,-122.4460), P(37.7434,-122.4550), P(37.7345,-122.4699) ];
mapLayer.appendChild(dottedPath(portola, 4));
mapLayer.appendChild(label(portola[1].x, portola[1].y+30, 'PORTOLA DR', 13));

/* ---- Clipper St ---- */
const clipper = [ P(37.7477,-122.4520), P(37.7495,-122.4335) ];
mapLayer.appendChild(dottedPath(clipper, 2.6));
mapLayer.appendChild(label((clipper[0].x+clipper[1].x)/2, clipper[0].y+16, 'CLIPPER ST', 9));

/* ---- Mount Sutro ---- */
const sutro = P(37.7563, -122.4531);
mapLayer.appendChild((function(){ const g=el('g'); pixelArt(g, sutro.x-14, sutro.y-8, HAPPY_HILL, 2.2, {1:'#5C3221', 2:'#FAF8F2', 3:'#E3A8AE'}); return g; })());
scatterPuffs(sutro.x, sutro.y-10, 6, 46);
mapLayer.appendChild(label(sutro.x, sutro.y+30, 'MT SUTRO · 908 FT', 9));

/* ---- Twin Peaks ---- */
const tp = P(37.7516, -122.4477);
const FT_TO_PX = 0.0493;
const peakGapPx = 660 * FT_TO_PX;
const areaBaseR = 32;

function blobPoints(cx, cy, baseR, n){
  const pts = [];
  for(let i=0;i<n;i++){
    const a = (Math.PI*2*i)/n;
    const r = baseR + 7*Math.sin(a*2+0.6) + 3.2*Math.sin(a*5+1.1) + 2*Math.cos(a*3-0.4);
    pts.push({x: cx+Math.cos(a)*r, y: cy+Math.sin(a)*r});
  }
  return pts;
}
const tpBoundary = blobPoints(tp.x, tp.y, areaBaseR, 16);
mapLayer.appendChild(dottedPath([...tpBoundary, tpBoundary[0]], 2.2));

scatterPuffs(tp.x-8, tp.y+6, 3, 22);
scatterPuffs(tp.x+9, tp.y-8, 2, 16);

const northPeak = {x: tp.x+4, y: tp.y - peakGapPx/2};
const southPeak = {x: tp.x-4, y: tp.y + peakGapPx/2};
[northPeak, southPeak].forEach(pt=>{
  mapLayer.appendChild(el('circle', {cx:pt.x, cy:pt.y, r:3.4, fill:'none', stroke:'#5C3221', 'stroke-width':1.1}));
  const g = el('g'); pixelArt(g, pt.x-3.3, pt.y-3.3, FLOWER, 1.3); mapLayer.appendChild(g);
});

const towerOrigin = {x: tp.x + areaBaseR + 2, y: tp.y - 6};
mapLayer.appendChild((function(){ const g=el('g'); pixelArt(g, towerOrigin.x, towerOrigin.y, TOWER, 1.1); return g; })());

const baseY = tp.y + areaBaseR + 12;
mapLayer.appendChild(label(tp.x, baseY, 'TWIN PEAKS · 922 FT', 11));
mapLayer.appendChild(label(tp.x, baseY+12, '37.7516°N 122.4477°W', 8));

/* ============================================================
   ACCURATE RUN ROUTE
   Real-world [lat, lon] waypoints following the actual roads up
   to Twin Peaks, drawn in the pixel-dot style via the same map
   projection (X/Y) as everything else — so it's geographically
   correct without any Google API key or billing.

   To refine: right-click any point in Google Maps → the lat,lng
   is shown at the top of the menu → paste it in below.
   ============================================================ */
const ROUTE = [
  [37.7626, -122.4350], // START · Castro & Market
  [37.7614, -122.4368], // up Market St
  [37.7600, -122.4388],
  [37.7585, -122.4410],
  [37.7572, -122.4432], // onto Twin Peaks Blvd
  [37.7560, -122.4452],
  [37.7548, -122.4468], // climbing the switchbacks
  [37.7538, -122.4472],
  [37.7527, -122.4476], // Christmas Tree Point overlook
  [37.7517, -122.4477], // SUMMIT · Twin Peaks (meet point)
];
const routePts = ROUTE.map(([la, lo]) => P(la, lo));
const routeD = routePts.map((pt, i) => (i === 0 ? 'M' : 'L') + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1)).join(' ');

// soft cream casing so the gold route reads clearly over the street grid
mapLayer.appendChild(el('path', {
  d: routeD, fill:'none', stroke:'#FAF8F2', 'stroke-width':8,
  'stroke-linecap':'round', 'stroke-linejoin':'round', opacity:0.75
}));
// the running route itself — chunky gold pixel dots
mapLayer.appendChild(el('path', {
  d: routeD, fill:'none', stroke:'#D9A441', 'stroke-width':5,
  'stroke-linecap':'round', 'stroke-linejoin':'round', 'stroke-dasharray':'0.1 9'
}));

// START marker
const start = routePts[0];
mapLayer.appendChild(el('circle', {cx:start.x, cy:start.y, r:5, fill:'#D9A441', stroke:'#5C3221', 'stroke-width':1.3}));
mapLayer.appendChild(el('circle', {cx:start.x, cy:start.y, r:1.6, fill:'#5C3221'}));
mapLayer.appendChild(label(start.x+10, start.y-7, 'START · CASTRO/MARKET', 8, 'start'));

const meet = {x: tp.x, y: tp.y};
mapLayer.appendChild(el('circle', {cx:meet.x, cy:meet.y, r:5, fill:'none', stroke:'#5C3221', 'stroke-width':1.3}));
mapLayer.appendChild(el('circle', {cx:meet.x, cy:meet.y, r:1.6, fill:'#5C3221'}));
mapLayer.appendChild(label(meet.x+11, meet.y+3, 'MEET: 501 TWIN PEAKS BLVD', 8, 'start'));

scatterFlowers(610, 150, 2, 60);
scatterFlowers(280, 920, 3, 80);

/* ---- compass rose ---- */
function starBurst(gx,gy, arms, len){
  const g = el('g');
  for(let i=0;i<arms;i++){
    const ang=(Math.PI*2/arms)*i;
    g.appendChild(dottedPath([{x:gx,y:gy},{x:gx+Math.cos(ang)*len, y:gy+Math.sin(ang)*len}], 2.4));
  }
  return g;
}
mapLayer.appendChild(starBurst(785, 60, 8, 18));
mapLayer.appendChild(label(785, 90, 'N', 10));
