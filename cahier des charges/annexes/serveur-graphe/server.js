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

const PORT = Number(process.env.PORT || 8081);
const XLSX = process.env.BACKLOG_XLSX ? path.resolve(process.env.BACKLOG_XLSX) : DEFAULT_XLSX;

// Colonnes de la feuille « Backlog » (ordre 1-based = A..M).
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
  'Besoins testables',
  "Point d'effort prestataire (1er niveau)",
];

// Colonnes reflet dans la feuille « Besoins testables ».
const BT_COLS = {
  epic: 3, id: 4, libelle: 5, mvp: 6, frontback: 7, module: 8,
  depend: 9, typ: 10, pilier: 11, role: 12, phrase: 13,
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
    besoins: s(readCell(row, 12)),
  };
}

const sheetBacklog = (wb) => wb.getWorksheet(SHEET_BACKLOG) || wb.worksheets[0];
const sheetTestable = (wb) => wb.getWorksheet(SHEET_TESTABLE) || wb.worksheets[1] || null;

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
  return {
    file: path.relative(process.cwd(), XLSX),
    archiveDir: path.relative(process.cwd(), ARCHIVE_DIR),
    columns: HEADERS,
    us,
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
  r.getCell(12).value = data.besoins ?? '';

  if (!bt) return;
  const depText = Array.isArray(depend) ? depend.join(' ; ') : (depend || '');
  for (let b = 2; b <= bt.rowCount; b += 1) {
    const br = bt.getRow(b);
    if (s(br.getCell(BT_COLS.id).value) !== s(id)) continue;
    br.getCell(BT_COLS.epic).value = epic ?? '';
    br.getCell(BT_COLS.libelle).value = libelle ?? '';
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
      const fcell = ws.getRow(newRow).getCell(13);
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

// Sert la page du graphe + statique annexes.
app.get('/', (_req, res) => res.sendFile(HTML_FILE));
app.use(express.static(path.join(__dirname, '..')));

app.listen(PORT, () => {
  log(`Serveur d'édition du backlog HydroScope`);
  log(`  → http://localhost:${PORT}`);
  log(`  → xlsx   : ${XLSX}`);
  log(`  → archive: ${ARCHIVE_DIR}`);
});