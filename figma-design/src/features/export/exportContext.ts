import { UNITES_GESTIONES, CAPTAGE_POINTS, BVAEPS, BVAEP_POLYGONS } from '@/data/hydroscope'
import { valueForUnite, valueForBvaep } from '@/data/values'
import { buildSqliteDatabase, gpkgPoint, gpkgPolygon, type GpkgTableDef } from './geopackage'
import type { IndicatorDef, PeriodRange, UnitMode } from '@/types/domain'

export type ExportFormat = 'csv' | 'geojson' | 'geopackage'

export interface ExportContext {
  unitMode: UnitMode
  selectedUnites: Set<string>
  selectedBvaeps: Set<string>
  indicators: IndicatorDef[]
  period: PeriodRange
}

export interface ExportResult {
  filename: string
  content: string | Uint8Array
  mime: string
}

const SRS_ID = 4326

const WGS84_DEF =
  'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]'

function stamp() {
  return new Date().toISOString().slice(0, 10)
}

function ncLonLat(x: number, y: number): [number, number] {
  const lon = 164.0 + ((x - 120) / 400) * 2.8
  const lat = -20.4 + ((205 - y) / 85) * -1.5
  return [lon, lat]
}

function selectedUnites(ctx: ExportContext) {
  return UNITES_GESTIONES.filter((c) => ctx.selectedUnites.has(c.id))
}

function selectedBvaeps(ctx: ExportContext) {
  return BVAEPS.filter((b) => ctx.selectedBvaeps.has(b.id))
}

function csvCell(v: string) {
  if (/[";\r\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`
  return v
}

export function exportContextAsCsv(ctx: ExportContext): ExportResult {
  const indCols = ctx.indicators.map((i) => `${i.code} — ${i.label} (${i.unit})`)
  const rows: string[][] = []
  if (ctx.unitMode === 'bvaep') {
    rows.push(['mode', 'id', 'nom', 'province', 'nb_captages', ...indCols, 'periode'])
    for (const b of selectedBvaeps(ctx)) {
      rows.push([
        'bvaep',
        b.id,
        b.name,
        b.province,
        String(b.captageRefs.length),
        ...ctx.indicators.map((i) => String(valueForBvaep(i.id, b.id))),
        ctx.period,
      ])
    }
  } else {
    rows.push(['mode', 'id', 'nom', 'commune', 'province', 'bassin_versant', ...indCols, 'periode'])
    for (const c of selectedUnites(ctx)) {
      rows.push([
        'gestion',
        c.id,
        c.name,
        c.commune,
        c.province,
        c.bvaep,
        ...ctx.indicators.map((i) => String(valueForUnite(i.id, c.id))),
        ctx.period,
      ])
    }
  }
  const csv = '\uFEFF' + rows.map((r) => r.map(csvCell).join(';')).join('\r\n')
  return {
    filename: `hydroscope_${ctx.unitMode}_${stamp()}.csv`,
    content: csv,
    mime: 'text/csv;charset=utf-8',
  }
}

export function exportContextAsGeoJson(ctx: ExportContext): ExportResult {
  const features: Array<{ type: 'Feature'; geometry: unknown; properties: Record<string, unknown> }> = []
  if (ctx.unitMode === 'bvaep') {
    for (const b of selectedBvaeps(ctx)) {
      const pts = (BVAEP_POLYGONS[b.id] ?? '')
        .trim()
        .split(/\s+/)
        .map((p) => p.split(',').map(Number))
        .filter((a) => a.length === 2)
        .map(([x, y]) => ncLonLat(x, y))
      const ring = [...pts, pts[0] ?? ncLonLat(0, 0)]
      const properties: Record<string, unknown> = {
        id: b.id,
        nom: b.name,
        province: b.province,
        nb_captages: b.captageRefs.length,
      }
      for (const i of ctx.indicators) properties[`ind_${i.code}`] = valueForBvaep(i.id, b.id)
      features.push({ type: 'Feature', geometry: { type: 'Polygon', coordinates: [ring] }, properties })
    }
  } else {
    for (const c of selectedUnites(ctx)) {
      const pt = CAPTAGE_POINTS.find((p) => p.key === c.id)
      const [lon, lat] = pt ? ncLonLat(pt.x, pt.y) : [164.0, -20.4]
      const properties: Record<string, unknown> = {
        id: c.id,
        nom: c.name,
        commune: c.commune,
        province: c.province,
        bassin_versant: c.bvaep,
      }
      for (const i of ctx.indicators) properties[`ind_${i.code}`] = valueForUnite(i.id, c.id)
      features.push({ type: 'Feature', geometry: { type: 'Point', coordinates: [lon, lat] }, properties })
    }
  }
  const geojson = {
    type: 'FeatureCollection',
    name: ctx.unitMode === 'bvaep' ? 'hydroscope_bvaeps' : 'hydroscope_gestion',
    crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
    features,
  }
  return {
    filename: `hydroscope_${ctx.unitMode}_${stamp()}.geojson`,
    content: JSON.stringify(geojson, null, 2),
    mime: 'application/geo+json',
  }
}

export function exportContextAsGeoPackage(ctx: ExportContext): ExportResult {
  const tableName = ctx.unitMode === 'bvaep' ? 'hydroscope_bvaeps' : 'hydroscope_gestion'
  const indCols = ctx.indicators.map((i) => `ind_${i.code}`)
  const features: Array<{ rowid: number; values: unknown[] }> = []
  let geomTypeName = 'POINT'
  let attrs: Array<[string, string]> = []
  if (ctx.unitMode === 'bvaep') {
    geomTypeName = 'POLYGON'
    attrs = [
      ['id', 'TEXT'],
      ['nom', 'TEXT'],
      ['province', 'TEXT'],
      ['nb_captages', 'INTEGER'],
    ]
    for (const b of selectedBvaeps(ctx)) {
      const pts = (BVAEP_POLYGONS[b.id] ?? '')
        .trim()
        .split(/\s+/)
        .map((p) => p.split(',').map(Number))
        .filter((a) => a.length === 2)
        .map(([x, y]) => ncLonLat(x, y))
      const ring = [...pts, pts[0] ?? ncLonLat(0, 0)]
      features.push({
        rowid: features.length + 1,
        values: [
          features.length + 1,
          gpkgPolygon(SRS_ID, [ring]),
          b.id,
          b.name,
          b.province,
          b.captageRefs.length,
          ...ctx.indicators.map((i) => valueForBvaep(i.id, b.id)),
        ],
      })
    }
  } else {
    attrs = [
      ['id', 'TEXT'],
      ['nom', 'TEXT'],
      ['commune', 'TEXT'],
      ['province', 'TEXT'],
      ['bassin_versant', 'TEXT'],
    ]
    for (const c of selectedUnites(ctx)) {
      const pt = CAPTAGE_POINTS.find((p) => p.key === c.id)
      const [lon, lat] = pt ? ncLonLat(pt.x, pt.y) : [164.0, -20.4]
      features.push({
        rowid: features.length + 1,
        values: [
          features.length + 1,
          gpkgPoint(SRS_ID, lon, lat),
          c.id,
          c.name,
          c.commune,
          c.province,
          c.bvaep,
          ...ctx.indicators.map((i) => valueForUnite(i.id, c.id)),
        ],
      })
    }
  }

  const colDefs: string[] = ['"fid" INTEGER PRIMARY KEY', '"geom" BLOB']
  for (const [name, type] of attrs) colDefs.push(`"${name}" ${type}`)
  for (const c of indCols) colDefs.push(`"${c}" REAL`)
  const createSql = `CREATE TABLE "${tableName}" (${colDefs.join(',')})`

  const tables: GpkgTableDef[] = [
    {
      name: 'gpkg_spatial_ref_sys',
      createSql:
        'CREATE TABLE gpkg_spatial_ref_sys (srs_name TEXT NOT NULL, srs_id INTEGER NOT NULL PRIMARY KEY, organization TEXT NOT NULL, organization_coordsys_id INTEGER NOT NULL, definition TEXT NOT NULL, description TEXT)',
      rows: [{ rowid: SRS_ID, values: ['WGS 84 geodetic', SRS_ID, 'EPSG', SRS_ID, WGS84_DEF, 'longitude/latitude coordinates in decimal degrees on the WGS 84 spheroid'] }],
    },
    {
      name: 'gpkg_contents',
      createSql:
        'CREATE TABLE gpkg_contents (table_name TEXT NOT NULL, data_type TEXT NOT NULL, identifier TEXT, description TEXT DEFAULT \'\', last_change DATETIME NOT NULL, min_x DOUBLE, min_y DOUBLE, max_x DOUBLE, max_y DOUBLE, srs_id INTEGER)',
      rows: [
        {
          rowid: 1,
          values: [tableName, 'features', tableName, 'Export du contexte de sélection HydroScope', new Date().toISOString(), null, null, null, null, SRS_ID],
        },
      ],
    },
    {
      name: 'gpkg_geometry_columns',
      createSql:
        'CREATE TABLE gpkg_geometry_columns (table_name TEXT NOT NULL, column_name TEXT NOT NULL, geometry_type_name TEXT NOT NULL, srs_id INTEGER NOT NULL, z TINYINT NOT NULL, m TINYINT NOT NULL)',
      rows: [{ rowid: 1, values: [tableName, 'geom', geomTypeName, SRS_ID, 0, 0] }],
    },
    { name: tableName, createSql, rows: features },
  ]

  const db = buildSqliteDatabase(tables, 0x47504b47)
  return {
    filename: `${tableName}_${stamp()}.gpkg`,
    content: db,
    mime: 'application/geopackage+sqlite3',
  }
}

export function downloadFile(result: ExportResult) {
  const blob =
    typeof result.content === 'string' ? new Blob([result.content], { type: result.mime }) : new Blob([result.content], { type: result.mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = result.filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 0)
}
