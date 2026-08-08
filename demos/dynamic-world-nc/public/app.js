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

const overlayOpts = { opacity: 0.85, maxZoom: 19 };

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
  return coverage.urlFormat.startsWith('/')
    ? new URL(coverage.urlFormat, location.origin).href
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

function syncTo(src, dst) {
  dst.setView(src.getCenter(), src.getZoom(), { animate: false });
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
  fitAoi(mapA);
  fitAoi(mapB);
  mapA.on('moveend zoomend', () => syncTo(mapA, mapB));
  mapB.on('moveend zoomend', () => syncTo(mapB, mapA));

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
  pane.style.zIndex = '380';

  positronLayer().addTo(map);
  fitAoi(map);

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
  const right = { opacity: 0.9 };
  const left = { pane: 'glide', opacity: 0.9 };
  bindDate(swipeA, null, () => loadOverlay('swipeA', map, swipeA.value, right));
  bindDate(swipeB, null, () => loadOverlay('swipeB', map, swipeB.value, left));
  loadOverlay('swipeA', map, swipeA.value, right);
  loadOverlay('swipeB', map, swipeB.value, left);
}

/* ── Animation : slider temporel ─────────────────────────── */
let playing = false;
let timer = null;

function initAnim() {
  const map = L.map('mapAnim');
  positronLayer().addTo(map);
  fitAoi(map);
  maps.anim = map;

  const slider = $('frameSlider');
  const btn = $('playBtn');
  slider.max = String(Math.max(0, frames.length - 1));
  slider.value = String(Math.max(0, frames.length - 1));
  const current = frames[Number(slider.value)] || frames[0];
  $('frameDate').textContent = current;
  loadOverlay('anim', map, current);

  slider.addEventListener('input', () => {
    const date = frames[Number(slider.value)];
    $('frameDate').textContent = date;
    loadOverlay('anim', map, date);
  });

  btn.addEventListener('click', () => {
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
        loadOverlay('anim', map, date);
      }, PLAY_INTERVAL);
    }
  });
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
    frames.push(...framesPayload.frames);
  } catch (err) {
    toast(`Impossible de joindre le serveur : ${err.message}`, true);
    return;
  }
  renderLegend();
  renderMode();
  startTabs();
  initCompare();
  started.compare = true;
  switchTab('compare');
}

window.addEventListener('DOMContentLoaded', boot);