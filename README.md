# Boob Run 🏃‍♀️

boob runners!

## Project structure

```
Boob Runners/
├── index.html          # page markup — links the CSS + JS below
├── css/
│   └── styles.css      # all styling
├── js/
│   ├── map-leaflet.js  # active map — real Leaflet + OpenStreetMap w/ the route
│   ├── map.js          # (unused) original hand-drawn pixel-art map, kept for reference
│   └── roster.js       # crew, run log data + timeline/filter rendering
├── images/             # run photos (referenced by js/roster.js)
└── README.md
```

It's a **100% static site** — no build step, no server code, no dependencies.
The only external request is to Google Fonts for the pixel typefaces.

## Run it locally

Because the browser loads JS files and images, open it through a tiny local
server rather than double-clicking the file (some browsers block local file
access otherwise):

```bash
cd "Boob Runners"
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Host it (sustainably & free)

Any static host works. Since the site never changes on its own and has no
backend, these are essentially zero-maintenance and free:

- **GitHub Pages** — push this folder to a repo, enable Pages on the `main`
  branch. Great default.
  ```bash
  cd "Boob Runners"
  git init && git add . && git commit -m "Boob Run site"
  # create a repo on github.com, then:
  git remote add origin <your-repo-url>
  git push -u origin main
  # Repo → Settings → Pages → Source: main / root
  ```
- **Netlify** or **Cloudflare Pages** — drag-and-drop this folder into their
  dashboard, or connect the GitHub repo for auto-deploys.

No account with any of these? The `python3 -m http.server` command above is
enough to view it on your own machine.

## Adding a new run

Edit `js/roster.js`:

1. Drop the new photos into `images/` (e.g. `jul01-1.jpg`).
2. Add an entry to the `runLog` array:
   ```js
   {
     date:'JUL 01',
     title:'your run name',
     runners:['Rui','Nicole'],           // names must match the roster
     photos:['images/jul01-1.jpg', 'images/jul01-2.jpg']
   }
   ```

To add a new runner, add them to the `CREW` (or `GUESTS`) array in the same
file with an `animal` (cat, dog, bear, fox, rabbit, owl, panda, unicorn) and a
background color.

## The map

The map is a real, interactive [Leaflet](https://leafletjs.com) map using
free OpenStreetMap-based tiles from CARTO — **no API key, no billing, no
account**. Attribution to OpenStreetMap + CARTO is required and shown in the
corner (please keep it). The tiles are tinted toward the cream/brown palette
via a CSS filter.

Tiles are recolored to a **Game Boy green** palette via a CSS filter on
`.leaflet-tile-pane`.

Each run has its own route in the `ROUTES` object in `js/map-leaflet.js`, keyed
by run date and holding `coords` (real-world `[lat, lon]` waypoints), `title`,
and `photos`. The routes came from **Strava GPX exports**, downsampled to ~85
waypoints each. **Clicking a run in the timeline** (the ones tagged
"🗺 VIEW ROUTE") swaps the map to that run's path and photo hot spots; the map
opens on the most recent run.

To add a route for another run, export its GPX from Strava (Activity → `⋯` →
Export GPX), extract + downsample the `<trkpt lat lon>` values, and add a
`ROUTES['<DATE>'] = { title, photos, coords }` entry whose key matches the
run's `date` in `runLog`.

The original hand-drawn pixel-art map still lives in `js/map.js` (not loaded).
To switch back to it, restore the `<svg id="mapSvg" …>` element in `index.html`
and load `js/map.js` instead of the Leaflet script + `js/map-leaflet.js`.
