/* HydroScope — Dynamic World · Côte ouest NC (démo) */

const DATE_MIN = '2016-01-01';
const DATE_MAX = '2026-09-01';
const PLAY_INTERVAL = 600;

const meta = { mode: 'mock', aoi: null, palette: [], classes: [] };
const frames = [];
const overlays = {};
const initSeq = {};
const maps = { A: null, B: null, median: null, swipe: null, swipeTop: null, anim: null };
const started = { compare: false, median: false, swipe: false, anim: false };

const overlayOpts = { opacity: 0.85, maxZoom: 19, tileSize: 256, noWrap: true };

// current global basemap key
let currentBasemap = 'esri';

// ── Basemap factories ──────────────────────────────────────────
function quadKey(x, y, z) {
  let key = '';
  for (let i = z; i > 0; i--) {
    let digit = 0;
    const mask = 1 << (i - 1);
    if (x & mask) digit += 1;
    if (y & mask) digit += 2;
    key += digit;
  }
  return key;
}

const GeorepLayer = L.TileLayer.extend({
  getTileUrl: function (coords) {
    const url = 'https://carto.gouv.nc/public/rest/services/fond_imagerie/MapServer/WMTS/tile/1.0.0/fond_imagerie/default/GoogleMapsCompatible/{z}/{y}/{x}';
    return L.Util.template(url, { z: coords.z, x: coords.x, y: coords.y });
  },
  options: {
    maxZoom: 19,
    attribution: 'Orthophotos © DITTT / GEOREP Nouvelle-Calédonie',
    pane: 'basemapPane'
  }
});

const BingLayer = L.TileLayer.extend({
  getTileUrl: function (coords) {
    const q = quadKey(coords.x, coords.y, coords.z);
    const sub = (coords.x + coords.y) % 4;
    return `https://ecn.t${sub}.tiles.virtualearth.net/tiles/a${q}.jpeg?g=0`;
  },
  options: {
    maxZoom: 19,
    attribution: 'Imagerie aérienne © Microsoft / Bing',
    pane: 'basemapPane'
  }
});

function buildBasemap(key) {
  switch (key) {
    case 'georep':
      return new GeorepLayer();

    case 'esri':
      return L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
        attribution: 'Imagerie © Esri, Maxar, Earthstar Geographics',
        pane: 'basemapPane'
      });

    case 'bing':
      return new BingLayer();

    case 'google':
      return L.tileLayer('https://mt{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        subdomains: '0123',
        maxZoom: 19,
        attribution: 'Imagerie satellite © Google',
        pane: 'basemapPane'
      });

    default:
      return L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
        attribution: 'Imagerie © Esri',
        pane: 'basemapPane'
      });
  }
}

// Helper: ensure basemapPane exists (z-index 150 < tilePane 200) and add basemap layer
function basemapFor(map, key) {
  if (!map.getPane('basemapPane')) {
    map.createPane('basemapPane');
    map.getPane('basemapPane').style.zIndex = '150';
  }
  map.basemapLayer = buildBasemap(key);
  map.basemapLayer.addTo(map);
}

// shared view across modules
const sharedView = { has: false, center: null, zoom: null };
function captureShared(map) { sharedView.has = true; sharedView.center = map.getCenter(); sharedView.zoom = map.getZoom(); }
function applyShared(map) { if (sharedView.has) { map.setView(sharedView.center, sharedView.zoom, { animate: false }); } else { fitAoi(map); captureShared(map); } }

// set basemap on all initialized maps
function setBasemap(key) {
  currentBasemap = key;
  Object.values(maps).forEach(m => {
    if (m && m.basemapLayer) {
      m.removeLayer(m.basemapLayer);
      m.basemapLayer = buildBasemap(key);
      m.basemapLayer.addTo(m);
    }
  });
}

// global opacity control
let overlayOpacity = 0.85;
function setGlobalOpacity(v) {
  overlayOpacity = v;
  overlayOpts.opacity = v;
  Object.values(overlays).forEach(layer => { if (layer) layer.setOpacity(v); });
}

// animation state
let animReady = false;
let animPreloading = false;
let animCoverageCache = {};
let animLayerCurrent = null;
let animLayerNext = null;
let animPreloadOverlay = null;

let toastTimer = null;

function $(id) {
  return document.getElementById(id);
}

function toast(message, isError) {
  const el = $('toast');
  el.textContent = message;
  el.classList.toggle('error', Boolean(isError));
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 4200);
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body && body.error ? body.error : `Erreur HTTP ${res.status}`);
  }
  return res.json();
}

function tileUrlFor(coverage) {
  if (!coverage.urlFormat) throw new Error('Réponse de couverture incomplète');
  // Conserver les placeholders {z}/{x}/{y} sans les encoder
  return coverage.urlFormat.startsWith('/')
    ? location.origin + coverage.urlFormat
    : coverage.urlFormat;
}

function fitAoi(map) {
  const a = meta.aoi;
  map.fitBounds(L.latLngBounds([[a.minLat, a.minLon], [a.maxLat, a.maxLon]]), { padding: [16, 16] });
}

async function loadOverlay(key, map, start, end, stat, options) {
  const token = (initSeq[key] = (initSeq[key] || 0) + 1);
  try {
    const coverage = await fetchJson(`/api/coverage?start=${start}&end=${end}&stat=${stat}`);
    if (initSeq[key] !== token) return;
    const layer = L.tileLayer(tileUrlFor(coverage), Object.assign({}, overlayOpts, options));
    if (overlays[key]) map.removeLayer(overlays[key]);
    layer.addTo(map);
    overlays[key] = layer;
  } catch (err) {
    if (initSeq[key] !== token) return;
    overlays[key] = null;
    toast(`Impossible de charger les tuiles pour ${start} → ${end} (${stat}) : ${err.message}`, true);
  }
}

let syncGuard = false;

function syncTo(src, dst) {
  if (syncGuard) return;
  syncGuard = true;
  dst.setView(src.getCenter(), src.getZoom(), { animate: false });
  syncGuard = false;
}

function bindDate(input, labelEl, onChange) {
  input.min = DATE_MIN;
  input.max = DATE_MAX;
  input.addEventListener('change', onChange);
  if (labelEl) labelEl.textContent = `Situation · ${input.value}`;
}

/* ── Comparer (2 cartes synchronisées) ───────────────────── */
function initCompare() {
  const mapA = L.map('mapA');
  const mapB = L.map('mapB');
  basemapFor(mapA, currentBasemap);
  basemapFor(mapB, currentBasemap);
  applyShared(mapA);
  applyShared(mapB);
  mapA.on('moveend zoomend', () => { syncTo(mapA, mapB); captureShared(mapA); });
  mapB.on('moveend zoomend', () => { syncTo(mapB, mapA); captureShared(mapB); });

  maps.A = mapA;
  maps.B = mapB;

  const dateA = $('dateA');
  const dateB = $('dateB');
  bindDate(dateA, $('titleA'), () => loadOverlay('A', mapA, dateA.value, dateA.value, 'mode'));
  bindDate(dateB, $('titleB'), () => loadOverlay('B', mapB, dateB.value, dateB.value, 'mode'));
  loadOverlay('A', mapA, dateA.value, dateA.value, 'mode');
  loadOverlay('B', mapB, dateB.value, dateB.value, 'mode');
}

/* ── Médiane (deux couches togglables) ───────────────────── */
function initMedian() {
  const map = L.map('mapMedian');
  basemapFor(map, currentBasemap);
  applyShared(map);
  map.on('moveend zoomend', () => { captureShared(map); });

  maps.median = map;

  const startInput = $('medianStart');
  const endInput = $('medianEnd');
  const titleEl = $('medianTitle');
  const toggleMode = $('medianToggleMode');
  const togglePresence = $('medianTogglePresence');
  const legendEl = $('medianLegend');

  function setLayer(key, stat, enabled) {
    if (enabled) {
      loadOverlay(key, map, startInput.value, endInput.value, stat);
    } else {
      if (overlays[key]) {
        map.removeLayer(overlays[key]);
        overlays[key] = null;
      }
    }
  }

  function updateMedian() {
    const start = startInput.value;
    const end = endInput.value;
    if (!start || !end) return;
    if (start > end) return;
    titleEl.textContent = `Médiane · ${start} → ${end}`;
    const modeOn = toggleMode.checked;
    const presOn = togglePresence.checked;
    setLayer('medianMode', 'dominant', modeOn);
    setLayer('medianPresence', 'presence', presOn);
    // show/hide gradient legend
    if (presOn) legendEl.hidden = false; else legendEl.hidden = true;
  }

  startInput.addEventListener('change', updateMedian);
  endInput.addEventListener('change', updateMedian);
  toggleMode.addEventListener('change', updateMedian);
  togglePresence.addEventListener('change', updateMedian);

  updateMedian();
}

/* ── Swipe : deux cartes empilées synchronisées ────────────── */
let swipeState = null;

function initSwipe() {
  const container = $('map-swipe');
  const divider = $('swipeDivider');

  // Bottom map (date A - left side)
  const mapA = L.map('map-swipe');
  basemapFor(mapA, currentBasemap);
  applyShared(mapA);
  mapA.on('moveend zoomend', () => { captureShared(mapA); syncSwipeMaps(mapA); });

  // Top map (date B - right side, clipped)
  const mapB = L.map('map-swipe-top');
  basemapFor(mapB, currentBasemap);
  applyShared(mapB);
  mapB.on('moveend zoomend', () => { captureShared(mapB); syncSwipeMaps(mapB); });

  swipeState = { mapA, mapB, divider };

  function setSwipe(pos) {
    const clamped = Math.max(0, Math.min(100, pos));
    divider.style.left = `${clamped}%`;
    // Clip the top map (B) to show only right portion
    const topMapEl = $('#map-swipe-top');
    if (topMapEl) {
      topMapEl.style.clipPath = `inset(0 0 0 ${clamped}%)`;
    }
  }

  let dragging = false;
  divider.addEventListener('pointerdown', (e) => {
    dragging = true;
    divider.setPointerCapture(e.pointerId);
    e.preventDefault();
    e.stopPropagation();
  });
  divider.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const rect = container.getBoundingClientRect();
    setSwipe(((e.clientX - rect.left) / rect.width) * 100);
  });
  divider.addEventListener('pointerup', () => (dragging = false));
  divider.addEventListener('pointercancel', () => (dragging = false));

  setSwipe(50);

  maps.swipe = mapA;
  maps.swipeTop = mapB;

  const swipeA = $('swipeDateA');
  const swipeB = $('swipeDateB');
  bindDate(swipeA, null, () => loadOverlay('swipeA', mapA, swipeA.value, swipeA.value, 'mode'));
  bindDate(swipeB, null, () => loadOverlay('swipeB', mapB, swipeB.value, swipeB.value, 'mode'));
  loadOverlay('swipeA', mapA, swipeA.value, swipeA.value, 'mode');
  loadOverlay('swipeB', mapB, swipeB.value, swipeB.value, 'mode');
}

function syncSwipeMaps(source) {
  const target = source === swipeState.mapA ? swipeState.mapB : swipeState.mapA;
  if (!target) return;
  target.setView(source.getCenter(), source.getZoom(), { animate: false });
}

/* ── Animation : slider temporel ─────────────────────────── */
let playing = false;
let timer = null;

function initAnim() {
  const map = L.map('mapAnim');
  basemapFor(map, currentBasemap);
  applyShared(map);
  map.on('moveend zoomend', () => {
    captureShared(map);
    // If playing, pause and reset ready state so re-play triggers re-preload for new extent
    if (playing) {
      pauseAnimation();
    }
  });

  maps.anim = map;

  const slider = $('frameSlider');
  const btn = $('playBtn');
  slider.max = String(Math.max(0, frames.length - 1));
  slider.value = String(Math.max(0, frames.length - 1));
  const current = frames[Number(slider.value)] || frames[0];
  $('frameDate').textContent = current;

  // create preload overlay once (hidden by default)
  if (!animPreloadOverlay) {
    const mapContainer = $('mapAnim');
    animPreloadOverlay = document.createElement('div');
    animPreloadOverlay.id = 'animPreloadOverlay';
    animPreloadOverlay.className = 'preload-overlay';
    animPreloadOverlay.hidden = true;
    animPreloadOverlay.innerHTML = `
      <div class="preload-card">
        <div class="spinner"></div>
        <p class="preload-text" id="preloadText">Préparation…</p>
        <div class="preload-bar"><div class="preload-fill" id="preloadFill"></div></div>
      </div>`;
    mapContainer.appendChild(animPreloadOverlay);
  }

  // initial frame (no preload yet)
  loadAnimOverlay(map, current);

  slider.addEventListener('input', () => {
    const date = frames[Number(slider.value)];
    $('frameDate').textContent = date;
    loadAnimOverlay(map, date);
  });

  btn.addEventListener('click', async () => {
    if (!animReady) {
      // start preload then play
      btn.disabled = true;
      slider.disabled = true;
      animPreloadOverlay.hidden = false;
      await preloadAnimation(map);
      animPreloadOverlay.hidden = true;
      btn.disabled = false;
      slider.disabled = false;
      animReady = true;
    }
    playing = !playing;
    btn.textContent = playing ? '⏸' : '▶';
    btn.setAttribute('aria-label', playing ? 'Pause' : 'Lecture');
    clearInterval(timer);
    if (playing) {
      timer = setInterval(() => {
        const next = (Number(slider.value) + 1) % frames.length;
        slider.value = String(next);
        const date = frames[next];
        $('frameDate').textContent = date;
        loadAnimOverlay(map, date);
      }, PLAY_INTERVAL);
    }
  });
}

function pauseAnimation() {
  playing = false;
  clearInterval(timer);
  const btn = $('playBtn');
  if (btn) {
    btn.textContent = '▶';
    btn.setAttribute('aria-label', 'Lecture');
  }
  // reset ready state so next play re-preloads for new extent
  animReady = false;
}

// load animation frame with crossfade using cached coverage
async function loadAnimOverlay(map, date) {
  let coverage = animCoverageCache[date];
  if (!coverage) {
    coverage = await fetchJson(`/api/coverage?start=${date}&end=${date}`);
    animCoverageCache[date] = coverage;
  }
  const url = tileUrlFor(coverage);
  const layer = L.tileLayer(url, Object.assign({}, overlayOpts));
  layer.addTo(map);
  if (animLayerCurrent) {
    // crossfade: new layer from 0 to global opacity
    layer.setOpacity(0);
    // force reflow
    void layer.getContainer().offsetWidth;
    layer.setOpacity(overlayOpacity);
    // fade out old - capture reference to avoid race condition
    const oldLayer = animLayerCurrent;
    oldLayer.setOpacity(0);
    setTimeout(() => { map.removeLayer(oldLayer); }, 250);
  }
  animLayerCurrent = layer;
}

// preload all frames for current view
async function preloadAnimation(map) {
  if (animPreloading) return;
  animPreloading = true;
  const z = map.getZoom();
  const bounds = map.getBounds();
  const tiles = getTileCoords(bounds, z);
  const totalFrames = frames.length;
  let doneFrames = 0;
  const update = () => {
    doneFrames++;
    const pct = Math.round((doneFrames / totalFrames) * 100);
    $('preloadText').textContent = `Préparation ${doneFrames}/${totalFrames}`;
    $('preloadFill').style.width = `${pct}%`;
  };
  // fetch coverages with limited concurrency
  const concurrency = 6;
  for (let i = 0; i < totalFrames; i += concurrency) {
    const batch = frames.slice(i, i + concurrency);
    await Promise.all(batch.map(async (date) => {
      const cov = await fetchJson(`/api/coverage?start=${date}&end=${date}`);
      animCoverageCache[date] = cov;
      // prefetch tiles
      await Promise.all(tiles.map(async (t) => {
        const img = new Image();
        img.src = tileUrlFor(cov).replace('{z}', z).replace('{x}', t.x).replace('{y}', t.y);
        await new Promise(r => { img.onload = img.onerror = r; });
      }));
      update();
    }));
  }
  animPreloading = false;
}

// compute tile x/y covering bounds at zoom z
function getTileCoords(bounds, z) {
  const n = 2 ** z;
  const min = latLngToTile(bounds.getSouthWest(), z);
  const max = latLngToTile(bounds.getNorthEast(), z);
  const xs = [];
  for (let x = min.x; x <= max.x; x++) xs.push(x);
  const ys = [];
  for (let y = max.y; y <= min.y; y++) ys.push(y); // y increases southward
  const res = [];
  for (const x of xs) for (const y of ys) res.push({x, y});
  return res;
}

function latLngToTile(latLng, z) {
  const n = 2 ** z;
  const x = Math.floor((latLng.lng + 180) / 360 * n);
  const latRad = latLng.lat * Math.PI / 180;
  const y = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n);
  return { x, y };
}

/* ── Onglets ─────────────────────────────────────────────── */
function switchTab(name) {
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === name);
  });
  document.querySelectorAll('.panel').forEach((panel) => {
    panel.classList.toggle('active', panel.id === `panel-${name}`);
  });
  if (!started[name]) {
    started[name] = true;
    if (name === 'compare') initCompare();
    if (name === 'median') initMedian();
    if (name === 'swipe') initSwipe();
    if (name === 'anim') initAnim();
  }
  // apply shared view to active module maps (including swipeTop)
  const targets = {
    compare: [maps.A, maps.B],
    median: maps.median ? [maps.median] : [],
    swipe: maps.swipe ? [maps.swipe, maps.swipeTop] : [],
    anim: maps.anim ? [maps.anim] : []
  }[name];
  (targets || []).forEach(m => m && applyShared(m));
  invalidatePanelMaps(name);
}

function invalidatePanelMaps(name) {
  const targets = {
    compare: [maps.A, maps.B],
    median: maps.median ? [maps.median] : [],
    swipe: maps.swipe ? [maps.swipe] : [],
    anim: maps.anim ? [maps.anim] : []
  }[name];
  (targets || []).forEach((m) => m && m.invalidateSize(false));
}

/* ── Légende & en-tête ───────────────────────────────────── */
function renderLegend() {
  const container = $('legendItems');
  container.innerHTML = '';
  meta.classes.forEach((c) => {
    const item = document.createElement('span');
    item.className = 'legend-item';
    const swatch = document.createElement('span');
    swatch.className = 'swatch';
    swatch.style.background = c.color;
    item.append(swatch, document.createTextNode(c.name));
    container.appendChild(item);
  });
}

function renderMode() {
  const isMock = meta.mode !== 'gee';
  const badge = $('modeBadge');
  badge.classList.toggle('is-live', !isMock);
  badge.classList.toggle('is-mock', isMock);
  $('modeLabel').textContent = isMock
    ? 'mode : simulation (tuiles synthétiques)'
    : 'mode : Earth Engine réel (Dynamic World)';
}

/* ── Démarrage ───────────────────────────────────────────── */
function startTabs() {
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
}

async function boot() {
  try {
    Object.assign(meta, await fetchJson('/api/meta'));
    const framesPayload = await fetchJson('/api/frames');
    frames.length = 0;
    // Filter out future dates (server rejects them)
    const today = new Date().toISOString().slice(0, 10);
    frames.push(...framesPayload.frames.filter(d => d <= today));
  } catch (err) {
    toast(`Impossible de joindre le serveur : ${err.message}`, true);
    return;
  }
  renderLegend();
  renderMode();
  startTabs();
  // opacity slider
  const opacitySlider = $('opacitySlider');
  if (opacitySlider) {
    opacitySlider.addEventListener('input', (e) => {
      setGlobalOpacity(Number(e.target.value) / 100);
    });
  }
  // basemap selector
  const basemapSelect = $('basemapSelect');
  if (basemapSelect) {
    basemapSelect.addEventListener('change', (e) => setBasemap(e.target.value));
  }
  initCompare();
  started.compare = true;
  switchTab('compare');
}

window.addEventListener('DOMContentLoaded', boot);