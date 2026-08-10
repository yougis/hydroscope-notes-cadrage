import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';
import { GoogleAuth } from 'google-auth-library';
import ee from '@google/earthengine';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, 'public');

const PALETTE = ['#419BDF', '#397D49', '#88B053', '#7B87C6', '#E49635', '#DFC35A', '#C4281B', '#A59B8F', '#B39FE1'];
const CLASSES = [
  { id: 0, name: 'Eau', color: PALETTE[0] },
  { id: 1, name: 'Arbres', color: PALETTE[1] },
  { id: 2, name: 'Herbe', color: PALETTE[2] },
  { id: 3, name: 'Végétation inondée', color: PALETTE[3] },
  { id: 4, name: 'Cultures', color: PALETTE[4] },
  { id: 5, name: 'Arbustes', color: PALETTE[5] },
  { id: 6, name: 'Bâti', color: PALETTE[6] },
  { id: 7, name: 'Sol nu', color: PALETTE[7] },
  { id: 8, name: 'Neige / glace', color: PALETTE[8] }
];

const PORT = Number(process.env.PORT || 8080);
const requestedMode = String(process.env.EE_MODE || 'mock').toLowerCase();
const eeProject = process.env.EE_PROJECT;

let mode = requestedMode === 'gee' ? 'gee' : 'mock';
const aoi = parseAoi(process.env.AOI);

const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

const FRAME_MIN = '2016-01-01';
const FRAME_MAX = '2026-09-01';
const DW_MIN_DATE = '2015-06-01';
const DW_START_MS = parseDate(DW_MIN_DATE).ms;
const TILE_CACHE = new Map();
const TILE_SIZE = 256;
const MOCK_LANDCLASSES = [0, 1, 2, 4, 6, 7];

function parseAoi(raw) {
  const def = { minLon: 163.4, minLat: -21.9, maxLon: 165.6, maxLat: -20.4 };
  if (!raw) return def;
  const parts = String(raw).split(',').map((s) => Number(s.trim()));
  if (parts.length !== 4 || parts.some(Number.isNaN)) {
    console.warn('[config] AOI invalide, utilisation du défaut côte ouest NC.');
    return def;
  }
  const [minLon, minLat, maxLon, maxLat] = parts;
  if (minLon >= maxLon || minLat >= maxLat) {
    console.warn('[config] AOI invalide, utilisation du défaut côte ouest NC.');
    return def;
  }
  return { minLon, minLat, maxLon, maxLat };
}

function parseDate(str) {
  if (typeof str !== 'string') return null;
  const m = DATE_RE.exec(str);
  if (!m) return null;
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  const d = new Date(Date.UTC(year, month - 1, day));
  if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) return null;
  return { year, month, day, iso: str, ms: d.getTime() };
}

function shiftIso(date, days) {
  return new Date(date.ms + days * 86400000).toISOString().slice(0, 10);
}

function quarterlyFrames() {
  const frames = [];
  for (let year = 2016; year <= 2026; year += 1) {
    for (const month of [3, 6, 9, 12]) {
      if (year === 2016 && month < 3) continue;
      if (year === 2026 && month > 9) break;
      frames.push(`${year}-${String(month).padStart(2, '0')}-01`);
    }
  }
  return frames;
}
const FRAMES = quarterlyFrames();

function hash32(...values) {
  let h = 2166136261;
  for (const v of values) {
    h = Math.imul(h ^ (v >>> 0), 16777619);
  }
  return h >>> 0;
}

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const CLASS_RGB = CLASSES.map((c) => hexToRgb(c.color));

function tileToLonLat(z, x, y) {
  const n = 2 ** z;
  const lon = x / n * 360 - 180;
  const latRad = Math.atan(Math.sinh(Math.PI * (1 - 2 * y / n)));
  const lat = latRad * 180 / Math.PI;
  return { lon, lat };
}

function renderMockTile(z, x, y, dateSeed = 0) {
  const center = tileToLonLat(z, x + 0.5, y + 0.5);
  // Incorporate dateSeed into hash so different dates produce different patterns
  const classIdx = MOCK_LANDCLASSES[hash32(Math.round(center.lon * 1e5), Math.round(center.lat * 1e5), dateSeed) % MOCK_LANDCLASSES.length];
  const base = CLASS_RGB[classIdx];
  const stride = TILE_SIZE * 3;
  const rgb = Buffer.alloc(TILE_SIZE * stride);
  for (let py = 0; py < TILE_SIZE; py += 1) {
    const gy = y * TILE_SIZE + py;
    for (let px = 0; px < TILE_SIZE; px += 1) {
      const gx = x * TILE_SIZE + px;
      const line = (gx % 64) < 2 || (gy % 64) < 2 ? 0.85 : 1;
      // Use dateSeed to vary texture per date
      const tex = 0.9 + 0.2 * ((hash32(gx, gy, z, dateSeed) % 65536) / 65536);
      const f = line * tex;
      const o = py * stride + px * 3;
      rgb[o] = Math.min(255, Math.round(base[0] * f));
      rgb[o + 1] = Math.min(255, Math.round(base[1] * f));
      rgb[o + 2] = Math.min(255, Math.round(base[2] * f));
    }
  }
  return encodePng(rgb);
}

let CRC_TABLE = null;
function buildCrcTable() {
  CRC_TABLE = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    CRC_TABLE[n] = c >>> 0;
  }
}
function crc32(buf) {
  if (!CRC_TABLE) buildCrcTable();
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i += 1) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}
function encodePng(rgb) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(TILE_SIZE, 0);
  ihdr.writeUInt32BE(TILE_SIZE, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  const stride = TILE_SIZE * 3;
  const raw = Buffer.alloc((stride + 1) * TILE_SIZE);
  for (let y = 0; y < TILE_SIZE; y += 1) {
    raw[y * (stride + 1)] = 0;
    rgb.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const idat = zlib.deflateSync(raw, { level: 6 });
  return Buffer.concat([sig, pngChunk('IHDR', ihdr), pngChunk('IDAT', idat), pngChunk('IEND', Buffer.alloc(0))]);
}

function initializeGee(project) {
  return new Promise((resolve, reject) => {
    ee.initialize(null, null, resolve, reject, null, project);
  });
}

let authClient = null;

async function getAdcClient(project) {
  const auth = new GoogleAuth({ projectId: project, scopes: ['https://www.googleapis.com/auth/earthengine'] });
  const client = await auth.getClient();
  const hasRefresh = typeof client.getAccessToken === 'function';
  if (!hasRefresh) {
    throw new Error('Application Default Credentials non disponibles (aucun identifiant trouvé).');
  }
  return client;
}

async function initGee() {
  if (mode !== 'gee') return;
  const project = eeProject && eeProject.trim() ? eeProject.trim() : '';
  if (!project) {
    console.warn('[gee] EE_PROJECT non renseigné — bascule en mode simulation.');
    mode = 'mock';
    return;
  }
  try {
    authClient = await getAdcClient(project);
    ee.data.setAuthTokenRefresher((_authArgs, refresherCallback) => {
      authClient
        .getAccessToken()
        .then((token) => refresherCallback({ access_token: token, token_type: 'Bearer', expires_in: 3600 }))
        .catch((err) => refresherCallback({ error: err.message }));
    });
    await initializeGee(project);
    console.log(`[gee] Earth Engine authentifié via Application Default Credentials (projet : ${project}).`);
    mode = 'gee';
  } catch (err) {
    console.warn(`[gee] Échec de l'authentification Earth Engine : ${err.message}`);
    console.warn('[gee] Bascule en mode simulation (tuiles synthétiques).');
    mode = 'mock';
  }
}

const PYTHON_EE_URL = process.env.PYTHON_EE_URL || 'http://python-ee:8082';

async function fetchCoverageFromPython(startIso, endIso, stat = 'mode') {
  const url = `${PYTHON_EE_URL}/mapid?start=${startIso}&end=${endIso}&stat=${stat}`;
  const resp = await fetch(url);
  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Python EE service error ${resp.status}: ${txt}`);
  }
  return resp.json();
}

const app = express();
app.disable('x-powered-by');
app.use(express.static(PUBLIC_DIR));

app.get('/api/meta', (_req, res) => {
  res.json({ mode, aoi, palette: PALETTE, classes: CLASSES });
});

app.get('/api/frames', (_req, res) => {
  res.json({ min: FRAME_MIN, max: FRAME_MAX, frames: FRAMES });
});

app.get('/api/coverage', async (req, res) => {
  const startDate = parseDate(req.query.start);
  const endDate = parseDate(req.query.end);
  const stat = req.query.stat || 'mode';
  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'Les paramètres start et end doivent être des dates au format YYYY-MM-DD.' });
  }
  if (endDate.ms < startDate.ms) {
    return res.status(400).json({ error: 'La date de fin est antérieure à la date de début.' });
  }
  if (mode === 'gee') {
    if (startDate.ms < DW_START_MS || endDate.ms < DW_START_MS) {
      return res.status(400).json({ error: `Date hors de la plage des données Dynamic World (disponibles depuis ${DW_MIN_DATE}).` });
    }
    if (startDate.ms > Date.now() || endDate.ms > Date.now()) {
      return res.status(400).json({ error: 'La date demandée est dans le futur.' });
    }
    const key = `${startDate.iso}|${endDate.iso}|${stat}`;
    if (TILE_CACHE.has(key)) return res.json(TILE_CACHE.get(key));
    try {
      const coverage = await fetchCoverageFromPython(startDate.iso, endDate.iso, stat);
      TILE_CACHE.set(key, coverage);
      return res.json(coverage);
    } catch (err) {
      console.warn('[gee] Python EE proxy failed, fallback mock:', err.message);
      // fallback to mock
      const mock = { mapid: 'mock', token: '', urlFormat: `/mock/${startDate.iso}/{z}/{x}/{y}.png` };
      TILE_CACHE.set(key, mock);
      return res.json(mock);
    }
  }
  return res.json({ mapid: 'mock', token: '', urlFormat: `/mock/${startDate.iso}/{z}/{x}/{y}.png` });
});

app.get('/mock/:date/:z/:x/:y.png', (req, res) => {
  const dateStr = req.params.date;
  const z = Number(req.params.z);
  const x = Number(req.params.x);
  const y = Number(req.params.y);
  if (!DATE_RE.test(dateStr) || !Number.isInteger(z) || !Number.isInteger(x) || !Number.isInteger(y) || z < 0 || z > 19 || x < 0 || y < 0) {
    return res.status(400).json({ error: 'Coordonnées de tuile ou date invalides.' });
  }
  // Derive a deterministic seed from the date string
  const dateSeed = hash32(...dateStr.split('').map(c => c.charCodeAt(0)));
  const png = renderMockTile(z, x, y, dateSeed);
  res.set('Content-Type', 'image/png');
  res.set('Cache-Control', 'public, max-age=3600');
  res.send(png);
});

// Keep legacy route for backwards compat (dateSeed = 0)
app.get('/mock/:z/:x/:y.png', (req, res) => {
  const z = Number(req.params.z);
  const x = Number(req.params.x);
  const y = Number(req.params.y);
  if (!Number.isInteger(z) || !Number.isInteger(x) || !Number.isInteger(y) || z < 0 || z > 19 || x < 0 || y < 0) {
    return res.status(400).json({ error: 'Coordonnées de tuile invalides.' });
  }
  const png = renderMockTile(z, x, y, 0);
  res.set('Content-Type', 'image/png');
  res.set('Cache-Control', 'public, max-age=3600');
  res.send(png);
});

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Route API inconnue.' });
});

if (mode !== 'gee') {
  await initGee();
}

const server = app.listen(PORT, () => {
  console.log(`[hydroscope] Démo Dynamic World — côte ouest NC`);
  console.log(`[hydroscope] Mode : ${mode === 'gee' ? 'Earth Engine réel' : 'simulation (tuiles synthétiques)'}`);
  console.log(`[hydroscope] Adresse : http://localhost:${PORT}`);
  console.log(`[hydroscope] AOI : ${aoi.minLon},${aoi.minLat} → ${aoi.maxLon},${aoi.maxLat}`);
});

function shutdown(signal) {
  console.log(`\n[hydroscope] Arrêt (${signal})…`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 4000).unref();
}
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));