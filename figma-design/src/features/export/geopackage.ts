const TE = new TextEncoder()

function utf8(s: string): Uint8Array {
  return TE.encode(s)
}

function setU32(b: Uint8Array, off: number, v: number) {
  b[off] = (v >>> 24) & 0xff
  b[off + 1] = (v >>> 16) & 0xff
  b[off + 2] = (v >>> 8) & 0xff
  b[off + 3] = v & 0xff
}

function varintBytes(n: number): number[] {
  if (!Number.isInteger(n) || n < 0) throw new Error(`varint out of range: ${n}`)
  if (n <= 0x7f) return [n]
  const out: number[] = []
  let v = n
  out.push(v & 0x7f)
  v = Math.floor(v / 128)
  while (v > 0) {
    out.push((v & 0x7f) | 0x80)
    v = Math.floor(v / 128)
  }
  out.reverse()
  return out
}

function intToBytes(n: number, len: number): Uint8Array {
  const out = new Uint8Array(len)
  let v = n
  for (let i = len - 1; i >= 0; i--) {
    out[i] = v & 0xff
    v = Math.floor(v / 256)
  }
  return out
}

function floatToBytes(n: number): Uint8Array {
  const b = new Uint8Array(8)
  new DataView(b.buffer).setFloat64(0, n, true)
  return b
}

function recordValue(v: unknown): { serial: number; bytes: Uint8Array } {
  if (v === null || v === undefined) return { serial: 0, bytes: new Uint8Array(0) }
  if (typeof v === 'number') {
    if (v === 0) return { serial: 8, bytes: new Uint8Array(0) }
    if (v === 1) return { serial: 9, bytes: new Uint8Array(0) }
    if (Number.isInteger(v)) {
      let len = 8
      if (v >= -128 && v <= 127) len = 1
      else if (v >= -32768 && v <= 32767) len = 2
      else if (v >= -8388608 && v <= 8388607) len = 3
      else if (v >= -2147483648 && v <= 2147483647) len = 4
      else if (v >= -140737488355328 && v <= 140737488355327) len = 6
      return { serial: len, bytes: intToBytes(v, len) }
    }
    return { serial: 7, bytes: floatToBytes(v) }
  }
  if (typeof v === 'string') {
    const b = utf8(v)
    return { serial: 13 + 2 * b.length, bytes: b }
  }
  if (v instanceof Uint8Array) {
    return { serial: 12 + 2 * v.length, bytes: v }
  }
  throw new Error(`unsupported value: ${typeof v}`)
}

function encodeRecord(values: unknown[]): Uint8Array {
  const parts = values.map(recordValue)
  const serialBytes: number[] = []
  let headerLen = 1
  for (const p of parts) {
    const sv = varintBytes(p.serial)
    serialBytes.push(...sv)
    headerLen += sv.length
  }
  const headerLenVar = varintBytes(headerLen)
  let total = headerLen
  for (const p of parts) total += p.bytes.length
  const out = new Uint8Array(total)
  let o = 0
  for (const b of headerLenVar) out[o++] = b
  for (const b of serialBytes) out[o++] = b
  for (const p of parts) {
    out.set(p.bytes, o)
    o += p.bytes.length
  }
  return out
}

function encodeCell(rowid: number, values: unknown[]): Uint8Array {
  const payload = encodeRecord(values)
  const payloadVar = varintBytes(payload.length)
  const rowidVar = varintBytes(rowid)
  const out = new Uint8Array(payloadVar.length + rowidVar.length + payload.length)
  let o = 0
  for (const b of payloadVar) out[o++] = b
  for (const b of rowidVar) out[o++] = b
  out.set(payload, o)
  return out
}

function buildLeafPage(pageSize: number, startOffset: number, cells: Uint8Array[]): Uint8Array {
  const page = new Uint8Array(pageSize)
  const headerLen = startOffset + 8
  const count = cells.length
  const ptrEnd = headerLen + count * 2
  let cur = pageSize
  const offsets: number[] = []
  for (const c of cells) {
    cur -= c.length
    if (cur < ptrEnd) throw new Error('SQLite leaf page overflow')
    page.set(c, cur)
    offsets.push(cur)
  }
  const contentStart = count ? Math.min(...offsets) : headerLen
  page[startOffset] = 13
  page[startOffset + 3] = (count >> 8) & 0xff
  page[startOffset + 4] = count & 0xff
  page[startOffset + 5] = (contentStart >> 8) & 0xff
  page[startOffset + 6] = contentStart & 0xff
  for (let i = 0; i < count; i++) {
    const off = offsets[i]
    page[startOffset + 8 + i * 2] = (off >> 8) & 0xff
    page[startOffset + 8 + i * 2 + 1] = off & 0xff
  }
  return page
}

function sqliteHeader(pageSize: number, totalPages: number, applicationId: number): Uint8Array {
  const h = new Uint8Array(100)
  const magic = 'SQLite format 3\0'
  for (let i = 0; i < magic.length; i++) h[i] = magic.charCodeAt(i)
  h[16] = (pageSize >> 8) & 0xff
  h[17] = pageSize & 0xff
  h[18] = 1
  h[19] = 1
  h[20] = 0
  h[21] = 64
  h[22] = 32
  h[23] = 32
  setU32(h, 24, 1)
  setU32(h, 28, totalPages)
  setU32(h, 32, 0)
  setU32(h, 36, 0)
  setU32(h, 40, 1)
  setU32(h, 44, 4)
  setU32(h, 48, 0)
  setU32(h, 52, 0)
  setU32(h, 56, 1)
  setU32(h, 60, 0)
  setU32(h, 64, 0)
  setU32(h, 68, applicationId)
  setU32(h, 92, 1)
  setU32(h, 96, 0x00320000)
  return h
}

export interface GpkgTableDef {
  name: string
  createSql: string
  rows: Array<{ rowid: number; values: unknown[] }>
}

export function buildSqliteDatabase(tables: GpkgTableDef[], applicationId = 0): Uint8Array {
  const pageSize = 4096
  const totalPages = tables.length + 1
  const masterRows = tables.map((t, i) => ({
    rowid: i + 1,
    values: ['table', t.name, t.name, i + 2, t.createSql],
  }))
  const masterCells = masterRows.map((r) => encodeCell(r.rowid, r.values))
  const page1 = buildLeafPage(pageSize, 100, masterCells)
  page1.set(sqliteHeader(pageSize, totalPages, applicationId), 0)
  const db = new Uint8Array(pageSize * totalPages)
  db.set(page1, 0)
  tables.forEach((t, i) => {
    const cells = t.rows.map((r) => encodeCell(r.rowid, r.values))
    const p = buildLeafPage(pageSize, 0, cells)
    db.set(p, (i + 1) * pageSize)
  })
  return db
}

function gpkgHeader(srsId: number, wkb: Uint8Array): Uint8Array {
  const out = new Uint8Array(8 + wkb.length)
  out[0] = 0x47
  out[1] = 0x50
  out[2] = 0x00
  out[3] = 0x01
  const dv = new DataView(out.buffer)
  dv.setUint32(4, srsId, true)
  out.set(wkb, 8)
  return out
}

export function gpkgPoint(srsId: number, x: number, y: number): Uint8Array {
  const wkb = new Uint8Array(21)
  const dv = new DataView(wkb.buffer)
  wkb[0] = 1
  dv.setUint32(1, 1, true)
  dv.setFloat64(5, x, true)
  dv.setFloat64(13, y, true)
  return gpkgHeader(srsId, wkb)
}

export function gpkgPolygon(srsId: number, rings: number[][][]): Uint8Array {
  const ring = rings[0] ?? []
  const n = ring.length
  const wkb = new Uint8Array(9 + 4 + n * 16)
  const dv = new DataView(wkb.buffer)
  wkb[0] = 1
  dv.setUint32(1, 3, true)
  dv.setUint32(5, rings.length, true)
  dv.setUint32(9, n, true)
  for (let i = 0; i < n; i++) {
    dv.setFloat64(13 + i * 16, ring[i][0], true)
    dv.setFloat64(13 + i * 16 + 8, ring[i][1], true)
  }
  return gpkgHeader(srsId, wkb)
}
