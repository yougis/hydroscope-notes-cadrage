import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ExcelJS from 'exceljs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Chemins ────────────────────────────────────────────────────────────────
// serveur-graphe/  →  ../graphe_dependances.html   (annexes/)
//                      ../../backlog.xlsx            (cahier des charges/)
//                      ../../archive_backlog/        (dossier d'archives)
const HTML_FILE = path.join(__dirname, '..', 'graphe_dependances.html');
const DEFAULT_XLSX = path.join(__dirname, '..', '..', 'backlog.xlsx');
const ARCHIVE_DIR = path.join(__dirname, '..', '..', 'archive_backlog');

const PORT = Number(process.env.PORT || 8082);
const XLSX = process.env.BACKLOG_XLSX ? path.resolve(process.env.BACKLOG_XLSX) : DEFAULT_XLSX;

// Colonnes de la feuille « Backlog » (ordre 1-based = A..M) — aligné sur le xlsx réel.
const HEADERS = [
  'EPIC',
  'ID User Story',
  'Libellé User Story',
  'MVP',
  'Front_or_Back',
  'Module',
  'Dépend de (Parent)',
  'Type fonctionnel',
  'Pilier(s)',
  'Profil utilisateur',
  'Phrase méthode agile',
  "Point d'effort prestataire",
  "Point d'effort estimé MOA",
];

// Colonnes reflet dans la feuille « Besoins testables ».
const BT_COLS = {
  ident: 1,        // Identifiant test
  libelle: 2,      // Libellé scénario
  epic: 3,
  id: 4,           // ID User Story
  libelleUs: 5,
  mvp: 6,
  frontback: 7,
  module: 8,
  depend: 9,
  typ: 10,
  pilier: 11,
  role: 12,
  phrase: 13,
  scenario: 14,    // Scénario testable (complet)
  effort: 15,      // Point d'effort prestataire (1er niveau)
};

const SHEET_BACKLOG = 'Backlog';
const SHEET_TESTABLE = 'Besoins testables';

// Formule point d'effort (même modèle que les lignes existantes).
const effortFormula = (row) =>
  `SUMIF('${SHEET_TESTABLE}'!$D:$D,$A${row},'${SHEET_TESTABLE}'!$O:$O)`;

// ── Log / verrou ───────────────────────────────────────────────────────────
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), '[backlog]', ...a);

let mutex = Promise.resolve();
const lock = (fn) => (mutex = mutex.then(fn, fn));

function pad(n) { return String(n).padStart(2, '0'); }

// backlog_YYYY-MM-DD_HH-MM-SS[_i].xlsx
function archiveName(date, i = '') {
  const s = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}_${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`;
  return `backlog_${s}${i ? '_' + i : ''}.xlsx`;
}

function ensureArchiveDir() { fs.mkdirSync(ARCHIVE_DIR, { recursive: true }); }

// Copie l'état d'AVANT modification dans archive_backlog.
async function backupCurrent() {
  if (!fs.existsSync(XLSX)) return null;
  ensureArchiveDir();
  const now = new Date();
  let name = archiveName(now);
  let i = 2;
  while (fs.existsSync(path.join(ARCHIVE_DIR, name))) name = archiveName(now, i++);
  const dest = path.join(ARCHIVE_DIR, name);
  fs.copyFileSync(XLSX, dest);
  return { name, path: path.relative(process.cwd(), dest) };
}

async function readWorkbook() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(XLSX);
  return wb;
}

async function persistWorkbook(wb) {
  const tmp = XLSX + '.tmp';
  await wb.xlsx.writeFile(tmp);
  fs.renameSync(tmp, XLSX);
}

async function withWrite(wb, fn) {
  return lock(async () => {
    const backup = await backupCurrent();
    const result = await fn(wb);
    await persistWorkbook(wb);
    return { ...result, backup };
  });
}

// Lit une cellule en renvoyant la valeur calculée (résolution formule).
function readCell(row, col) {
  const v = row.getCell(col).value;
  if (v && typeof v === 'object' && v.result !== undefined) return v.result;
  return v;
}

function s(v) {
  if (v == null) return '';
  return String(v).trim();
}

function parseBacklogRow(row) {
  return {
    epic: s(readCell(row, 1)),
    id: s(readCell(row, 2)),
    libelle: s(readCell(row, 3)),
    mvp: s(readCell(row, 4)),
    frontback: s(readCell(row, 5)),
    module: s(readCell(row, 6)),
    depend: s(readCell(row, 7)) ? s(readCell(row, 7)).split(/[;]/).map(x => x.trim()).filter(Boolean) : [],
    typ: s(readCell(row, 8)),
    pilier: s(readCell(row, 9)),
    role: s(readCell(row, 10)),
    phrase: s(readCell(row, 11)),
    // plus de colonne « Besoins testables » dans le Backlog réel
    besoins: '',
  };
}

const sheetBacklog = (wb) => wb.getWorksheet(SHEET_BACKLOG) || wb.worksheets[0];
const sheetTestable = (wb) => wb.getWorksheet(SHEET_TESTABLE) || wb.worksheets[1] || null;

// Lit tous les scénarios de la feuille « Besoins testables ».
function parseScenarioRow(row) {
  return {
    ident: s(readCell(row, BT_COLS.ident)),
    libelle: s(readCell(row, BT_COLS.libelle)),
    usId: s(readCell(row, BT_COLS.id)),
    epic: s(readCell(row, BT_COLS.epic)),
    libelleUs: s(readCell(row, BT_COLS.libelleUs)),
    mvp: s(readCell(row, BT_COLS.mvp)),
    frontback: s(readCell(row, BT_COLS.frontback)),
    module: s(readCell(row, BT_COLS.module)),
    depend: s(readCell(row, BT_COLS.depend)) ? s(readCell(row, BT_COLS.depend)).split(/[;]/).map(x => x.trim()).filter(Boolean) : [],
    typ: s(readCell(row, BT_COLS.typ)),
    pilier: s(readCell(row, BT_COLS.pilier)),
    role: s(readCell(row, BT_COLS.role)),
    phrase: s(readCell(row, BT_COLS.phrase)),
    scenario: s(readCell(row, BT_COLS.scenario)),
    effort: s(readCell(row, BT_COLS.effort)),
  };
}

async function readScenarios(wb) {
  const bt = sheetTestable(wb);
  if (!bt) return [];
  const list = [];
  for (let r = 2; r <= bt.rowCount; r += 1) {
    const row = bt.getRow(r);
    if (row.getCell(1).value == null && row.getCell(2).value == null) continue;
    list.push({ ...parseScenarioRow(row), row: r });
  }
  return list;
}

// Lit toutes les US de la feuille Backlog.
async function readBacklog() {
  const wb = await readWorkbook();
  const ws = sheetBacklog(wb);
  const us = [];
  for (let r = 2; r <= ws.rowCount; r += 1) {
    const row = ws.getRow(r);
    if (row.getCell(1).value == null && row.getCell(2).value == null) continue;
    us.push({ ...parseBacklogRow(row), row: r });
  }
  const scenarios = await readScenarios(wb);
  return {
    file: path.relative(process.cwd(), XLSX),
    archiveDir: path.relative(process.cwd(), ARCHIVE_DIR),
    columns: HEADERS,
    us,
    scenarios,
  };
}

// Prochain id dans un EPIC : US{base}.{max+1}
function nextId(existingIds, epicName) {
  const m = /^EPIC\s+(\d+)(bis)?/i.exec(String(epicName || ''));
  const base = m ? 'US' + m[1] + (m[2] ? 'bis' : '') : 'US';
  const re = new RegExp('^' + base + '\\.(\\d+)$');
  let maxN = 0;
  for (const id of existingIds) {
    const mm = re.exec(id);
    if (mm) maxN = Math.max(maxN, Number(mm[1]));
  }
  return `${base}.${maxN + 1}`;
}

// Prochain identifiant de scénario pour une US : USx.yy-SC{n+1}
function nextScenarioId(existingScenarios, usId) {
  const prefix = usId + '-SC';
  const re = new RegExp('^' + prefix + '(\\d+)$');
  let maxN = 0;
  for (const sc of existingScenarios) {
    const mm = re.exec(sc.ident);
    if (mm) maxN = Math.max(maxN, Number(mm[1]));
  }
  return `${prefix}${String(maxN + 1).padStart(2, '0')}`;
}

// Remplace oldId → newId dans « Dépend de (Parent) » de toutes les US.
function renameRefs(ws, oldId, newId) {
  for (let r = 2; r <= ws.rowCount; r += 1) {
    const cell = ws.getRow(r).getCell(7);
    if (!cell.value) continue;
    const text = String(cell.value);
    if (!text.includes(oldId)) continue;
    const deps = text.split(/[;]/).map((x) => x.trim()).filter(Boolean);
    const updated = deps.map((d) => (d === oldId ? newId : d)).filter(Boolean);
    cell.value = updated.join(' ; ');
  }
}

function findRow(ws, id) {
  for (let r = 2; r <= ws.rowCount; r += 1) {
    const cell = ws.getRow(r).getCell(2);
    if (cell.value != null && s(cell.value) === id) return r;
  }
  return null;
}

function findScenarioRow(bt, ident) {
  for (let r = 2; r <= bt.rowCount; r += 1) {
    if (s(bt.getRow(r).getCell(BT_COLS.ident).value) === ident) return r;
  }
  return null;
}

// Écrit une US dans la feuille Backlog + propagation « Besoins testables ».
function applyUs(ws, bt, data) {
  const { row, id, epic, libelle, mvp, frontback, module, depend, typ, pilier, role, phrase } = data;
  const r = ws.getRow(row);
  r.getCell(1).value = epic ?? '';
  r.getCell(2).value = id ?? '';
  r.getCell(3).value = libelle ?? '';
  r.getCell(4).value = mvp ?? '';
  r.getCell(5).value = frontback ?? '';
  r.getCell(6).value = module ?? '';
  r.getCell(7).value = Array.isArray(depend) ? depend.join(' ; ') : (depend || '');
  r.getCell(8).value = typ ?? '';
  r.getCell(9).value = pilier ?? '';
  r.getCell(10).value = role ?? '';
  r.getCell(11).value = phrase ?? '';
  // Colonne 12 = Point d'effort prestataire (formule) — on n'écrit pas de « besoins »
  // La formule d'effort sera (ré)écrite par l'appelant au besoin.

  if (!bt) return;
  const depText = Array.isArray(depend) ? depend.join(' ; ') : (depend || '');
  for (let b = 2; b <= bt.rowCount; b += 1) {
    const br = bt.getRow(b);
    if (s(br.getCell(BT_COLS.id).value) !== s(id)) continue;
    br.getCell(BT_COLS.epic).value = epic ?? '';
    br.getCell(BT_COLS.libelleUs).value = libelle ?? '';
    br.getCell(BT_COLS.mvp).value = mvp ?? '';
    br.getCell(BT_COLS.frontback).value = frontback ?? '';
    br.getCell(BT_COLS.module).value = module ?? '';
    br.getCell(BT_COLS.depend).value = depText;
    br.getCell(BT_COLS.typ).value = typ ?? '';
    br.getCell(BT_COLS.pilier).value = pilier ?? '';
    br.getCell(BT_COLS.role).value = role ?? '';
    br.getCell(BT_COLS.phrase).value = phrase ?? '';
  }
}

// ── Serveur HTTP ───────────────────────────────────────────────────────────
const app = express();
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, mode: 'edit', file: path.relative(process.cwd(), XLSX), exists: fs.existsSync(XLSX) });
});

app.get('/api/backlog', async (_req, res) => {
  try { res.json(await readBacklog()); }
  catch (e) { res.status(500).json({ ok: false, error: String(e.message || e) }); }
});

app.post('/api/backlog', async (req, res) => {
  try {
    const us = req.body.us || {};
    const wb = await readWorkbook();
    const ws = sheetBacklog(wb);
    const bt = sheetTestable(wb);
    const existing = [];
    for (let r = 2; r <= ws.rowCount; r += 1) {
      const id = s(ws.getRow(r).getCell(2).value);
      if (id) existing.push(id);
    }
    const id = nextId(existing, us.epic);
    const newRow = ws.rowCount + 1;

    const result = await withWrite(wb, () => {
      applyUs(ws, bt, { ...us, row: newRow, id });
      // Formule d'effort en colonne 12 (Point d'effort prestataire)
      const fcell = ws.getRow(newRow).getCell(12);
      fcell.value = { formula: effortFormula(newRow) };
    });
    res.status(201).json({ ok: true, id, row: newRow, ...result });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e.message || e) });
  }
});

app.put('/api/backlog/:id', async (req, res) => {
  try {
    const oldId = req.params.id;
    const us = req.body.us || {};
    const wb = await readWorkbook();
    const ws = sheetBacklog(wb);
    const bt = sheetTestable(wb);
    const r = findRow(ws, oldId);
    if (r == null) return res.status(404).json({ ok: false, error: `US ${oldId} introuvable` });

    const newId = us.id || oldId;
    if (newId !== oldId) renameRefs(ws, oldId, newId);

    const result = await withWrite(wb, () => {
      applyUs(ws, bt, { ...us, row: r, id: newId });
      // S'assurer que la formule d'effort est présente en col 12
      const fcell = ws.getRow(r).getCell(12);
      if (!fcell.value || (fcell.value && typeof fcell.value === 'object' && fcell.value.formula === undefined)) {
        fcell.value = { formula: effortFormula(r) };
      }
    });
    res.json({ ok: true, id: newId, ...result });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e.message || e) });
  }
});

app.delete('/api/backlog/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const wb = await readWorkbook();
    const ws = sheetBacklog(wb);
    const r = findRow(ws, id);
    if (r == null) return res.status(404).json({ ok: false, error: `US ${id} introuvable` });

    const result = await withWrite(wb, () => {
      ws.spliceRows(r, 1);
      renameRefs(ws, id, '');
      const bt = sheetTestable(wb);
      if (bt) {
        for (let b = 2; b <= bt.rowCount; ) {
          if (s(bt.getRow(b).getCell(BT_COLS.id).value) === id) bt.spliceRows(b, 1);
          else b += 1;
        }
      }
    });
    res.json({ ok: true, deleted: id, ...result });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e.message || e) });
  }
});

// ── Scénarios (Besoins testables) ──────────────────────────────────────────
app.get('/api/scenarios', async (req, res) => {
  try {
    const wb = await readWorkbook();
    const scenarios = await readScenarios(wb);
    res.json({ ok: true, scenarios });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e.message || e) });
  }
});

app.post('/api/scenarios', async (req, res) => {
  try {
    const { usId } = req.body;
    if (!usId) return res.status(400).json({ ok: false, error: 'usId requis' });
    const wb = await readWorkbook();
    const ws = sheetBacklog(wb);
    const bt = sheetTestable(wb);
    if (!bt) return res.status(500).json({ ok: false, error: 'Onglet Besoins testables introuvable' });

    // Trouver l'US source pour copier ses méta
    const r = findRow(ws, usId);
    if (r == null) return res.status(404).json({ ok: false, error: `US ${usId} introuvable` });
    const usRow = ws.getRow(r);
    const usData = {
      epic: s(usRow.getCell(1).value),
      libelle: s(usRow.getCell(3).value),
      mvp: s(usRow.getCell(4).value),
      frontback: s(usRow.getCell(5).value),
      module: s(usRow.getCell(6).value),
      depend: s(usRow.getCell(7).value) ? s(usRow.getCell(7).value).split(/[;]/).map(x => x.trim()).filter(Boolean) : [],
      typ: s(usRow.getCell(8).value),
      pilier: s(usRow.getCell(9).value),
      role: s(usRow.getCell(10).value),
      phrase: s(usRow.getCell(11).value),
    };

    const existingScenarios = await readScenarios(wb);
    const ident = nextScenarioId(existingScenarios, usId);

    const result = await withWrite(wb, () => {
      const newRow = bt.rowCount + 1;
      const br = bt.getRow(newRow);
      br.getCell(BT_COLS.ident).value = ident;
      br.getCell(BT_COLS.libelle).value = '';
      br.getCell(BT_COLS.epic).value = usData.epic;
      br.getCell(BT_COLS.id).value = usId;
      br.getCell(BT_COLS.libelleUs).value = usData.libelle;
      br.getCell(BT_COLS.mvp).value = usData.mvp;
      br.getCell(BT_COLS.frontback).value = usData.frontback;
      br.getCell(BT_COLS.module).value = usData.module;
      br.getCell(BT_COLS.depend).value = usData.depend.join(' ; ');
      br.getCell(BT_COLS.typ).value = usData.typ;
      br.getCell(BT_COLS.pilier).value = usData.pilier;
      br.getCell(BT_COLS.role).value = usData.role;
      br.getCell(BT_COLS.phrase).value = usData.phrase;
      br.getCell(BT_COLS.scenario).value = 'Étant donné …, quand …, alors …';
      br.getCell(BT_COLS.effort).value = null;
      return { ident, row: newRow };
    });
    res.status(201).json({ ok: true, ...result });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e.message || e) });
  }
});

app.put('/api/scenarios/:ident', async (req, res) => {
  try {
    const ident = req.params.ident;
    const { libelle, scenario } = req.body;
    const wb = await readWorkbook();
    const bt = sheetTestable(wb);
    if (!bt) return res.status(500).json({ ok: false, error: 'Onglet Besoins testables introuvable' });
    const row = findScenarioRow(bt, ident);
    if (!row) return res.status(404).json({ ok: false, error: `Scénario ${ident} introuvable` });

    const result = await withWrite(wb, () => {
      const br = bt.getRow(row);
      if (libelle !== undefined) br.getCell(BT_COLS.libelle).value = libelle;
      if (scenario !== undefined) br.getCell(BT_COLS.scenario).value = scenario;
      return { ident, row };
    });
    res.json({ ok: true, ...result });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e.message || e) });
  }
});

app.delete('/api/scenarios/:ident', async (req, res) => {
  try {
    const ident = req.params.ident;
    const wb = await readWorkbook();
    const bt = sheetTestable(wb);
    if (!bt) return res.status(500).json({ ok: false, error: 'Onglet Besoins testables introuvable' });
    const row = findScenarioRow(bt, ident);
    if (!row) return res.status(404).json({ ok: false, error: `Scénario ${ident} introuvable` });

    const result = await withWrite(wb, () => {
      bt.spliceRows(row, 1);
      return { ident };
    });
    res.json({ ok: true, ...result });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e.message || e) });
  }
});

// Sert la page du graphe + statique annexes.
app.get('/', (_req, res) => res.sendFile(HTML_FILE));
app.use(express.static(path.join(__dirname, '..')));

app.listen(PORT, () => {
  log(`Serveur d'édition du backlog HydroScope`);
  log(`  → http://localhost:${PORT}`);
  log(`  → xlsx   : ${XLSX}`);
  log(`  → archive: ${ARCHIVE_DIR}`);
});