/* HydroScope — Dynamic World · Côte ouest NC (démo) */

const DATE_MIN = '2016-01-01';
const DATE_MAX = '2026-09-01';
const PLAY_INTERVAL = 600;

const meta = { mode: 'mock', aoi: null, palette: [], classes: [] };
const frames = [];
const overlays = {};
const initSeq = {};
const maps = { A: null, B: null, swipe: null, anim: null };
const started = { compare: false, swipe: false, anim: false };

const overlayOpts = { opacity: 0.85, maxZoom: 19, tileSize: 256, noWrap: true };

// shared view across modules
const sharedView = { has: false, center: null, zoom: null };
function captureShared(map) { sharedView.has = true; sharedView.center = map.getCenter(); sharedView.zoom = map.getZoom(); }
function applyShared(map) { if (sharedView.has) { map.setView(sharedView.center, sharedView.zoom, { animate: false }); } else { fitAoi(map); captureShared(map); } }

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

function esriLayer() {
  return L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: 'Imagerie © Esri, Maxar, Earthstar Geographics'
  });
}

function positronLayer() {
  return L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
    attribution: 'Fond © OpenStreetMap contributors & CARTO'
  });
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

async function loadOverlay(key, map, date, options) {
  const token = (initSeq[key] = (initSeq[key] || 0) + 1);
  try {
    const coverage = await fetchJson(`/api/coverage?start=${date}&end=${date}`);
    if (initSeq[key] !== token) return;
    const layer = L.tileLayer(tileUrlFor(coverage), Object.assign({}, overlayOpts, options));
    if (overlays[key]) map.removeLayer(overlays[key]);
    layer.addTo(map);
    overlays[key] = layer;
  } catch (err) {
    if (initSeq[key] !== token) return;
    overlays[key] = null;
    toast(`Impossible de charger les tuiles pour ${date} : ${err.message}`, true);
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
  esriLayer().addTo(mapA);
  esriLayer().addTo(mapB);
  applyShared(mapA);
  applyShared(mapB);
  mapA.on('moveend zoomend', () => { syncTo(mapA, mapB); captureShared(mapA); });
  mapB.on('moveend zoomend', () => { syncTo(mapB, mapA); captureShared(mapB); });

  maps.A = mapA;
  maps.B = mapB;

  const dateA = $('dateA');
  const dateB = $('dateB');
  bindDate(dateA, $('titleA'), () => loadOverlay('A', mapA, dateA.value));
  bindDate(dateB, $('titleB'), () => loadOverlay('B', mapB, dateB.value));
  loadOverlay('A', mapA, dateA.value);
  loadOverlay('B', mapB, dateB.value);
}

/* ── Swipe : une carte, diviseur vertical ────────────────── */
let swipeState = null;

function initSwipe() {
  const container = $('map-swipe');
  const divider = $('swipeDivider');
  const map = L.map('map-swipe');
  const pane = map.createPane('glide');
  pane.style.zIndex = '450';

  positronLayer().addTo(map);
  applyShared(map);
  map.on('moveend zoomend', () => captureShared(map));

  swipeState = { pane };

  function setSwipe(pos) {
    const clamped = Math.max(0, Math.min(100, pos));
    divider.style.left = `${clamped}%`;
    pane.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
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

  maps.swipe = map;

  const swipeA = $('swipeDateA');
  const swipeB = $('swipeDateB');
  const right = { };
  const left = { pane: 'glide' };
  bindDate(swipeA, null, () => loadOverlay('swipeA', map, swipeA.value, left));
  bindDate(swipeB, null, () => loadOverlay('swipeB', map, swipeB.value, right));
  loadOverlay('swipeA', map, swipeA.value, left);
  loadOverlay('swipeB', map, swipeB.value, right);
}

/* ── Animation : slider temporel ─────────────────────────── */
let playing = false;
let timer = null;

function initAnim() {
  const map = L.map('mapAnim');
  positronLayer().addTo(map);
  applyShared(map);
  map.on('moveend zoomend', () => captureShared(map));

  maps.anim = map;

  const slider = $('frameSlider');
  const btn = $('playBtn');
  slider.max = String(Math.max(0, frames.length - 1));
  slider.value = String(Math.max(0, frames.length - 1));
  const current = frames[Number(slider.value)] || frames[0];
  $('frameDate').textContent = current;

  // create preload overlay once
  if (!animPreloadOverlay) {
    const mapContainer = $('mapAnim');
    animPreloadOverlay = document.createElement('div');
    animPreloadOverlay.id = 'animPreloadOverlay';
    animPreloadOverlay.className = 'preload-overlay';
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
    if (name === 'swipe') initSwipe();
    if (name === 'anim') initAnim();
  }
  // apply shared view to active module maps
  const targets = {
    compare: [maps.A, maps.B],
    swipe: maps.swipe ? [maps.swipe] : [],
    anim: maps.anim ? [maps.anim] : []
  }[name];
  (targets || []).forEach(m => m && applyShared(m));
  invalidatePanelMaps(name);
}

function invalidatePanelMaps(name) {
  const targets = {
    compare: [maps.A, maps.B],
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
  initCompare();
  started.compare = true;
  switchTab('compare');
}

window.addEventListener('DOMContentLoaded', boot);