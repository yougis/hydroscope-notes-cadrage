import { Feature } from 'ol'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Polygon from 'ol/geom/Polygon'
import Point from 'ol/geom/Point'
import { Style, Fill, Stroke, Circle as CircleStyle, RegularShape } from 'ol/style'
import { catalogueById } from '@/data/hydroscope'
import { valueForBvaep, valueForUnite } from '@/data/values'
import type { UnitMode } from '@/types/domain'
import type { LayerDef } from '../hooks/useLayers'
import { buildH3Features } from './h3'
import { QUALITE_COLORS, SOURCE_FILLS, bvaepClass, symbolFor } from './theme'
import type { LiveCaptage, LiveRegion } from '@/data/referentiels'
import type { Polygon as GeoJSONPolygon, Point as GeoJSONPoint } from 'geojson'

// Empreinte approximative de la zone d'intérêt (en Web Mercator / EPSG:3857)
const SOURCE_FOOTPRINT_3857: Array<[number, number]> = [
  [18350000, -2600000],
  [18550000, -2600000],
  [18650000, -2400000],
  [18700000, -2300000],
  [18650000, -2200000],
  [18450000, -2150000],
  [18350000, -2400000],
  [18350000, -2600000],
]

function toPolygon3857(ring: number[][]): Polygon {
  return new Polygon([ring])
}

function toPoint3857(coords: [number, number]): Point {
  return new Point(coords)
}

export interface BuildLayersOptions {
  activeIndicator: string | null
  unitMode: UnitMode
  selectedBvaeps: Set<string>
  selectedKeys: string[]
  h3Mode: boolean
  layers: LayerDef[]
  captages: Array<{ id: string; coordinates: [number, number]; kind: string; name: string; commune: string; province: string }>
  regions: Array<{ id: string; coordinates: number[][][]; captageRefs: string[]; name: string; province: string; sector: string; communes: string[] }>
  bbrRegions?: Array<{ id: string; coordinates: number[][][]; name: string; province: string; sector: string; communes: string[] }>
}

/** Retourne les calques vectoriels ordonnés (bas → haut). */
export function buildVectorLayers(opts: BuildLayersOptions): VectorLayer<VectorSource>[] {
  const { activeIndicator, unitMode, selectedBvaeps, selectedKeys, h3Mode, layers, captages, regions } = opts
  const ind = activeIndicator ? catalogueById(activeIndicator) : undefined
  const isGestion = unitMode === 'gestion'
  const on = (key: string) => layers.find((l) => l.key === key)?.on ?? true
  const selectedCaptageIds = new Set(selectedKeys)

  const result: VectorLayer<VectorSource>[] = []

  // ── Bassins versants (régions hydrographiques réelles) ────────────────────────
  if (on('bv')) {
    const source = new VectorSource()
    for (const b of regions) {
      const cls = bvaepClass(activeIndicator, b.id)
      const hasSelectedCaptage = b.captageRefs.some((cid) => selectedCaptageIds.has(cid))
      const selBv = !isGestion && selectedBvaeps.has(b.id)
      const liaBv = isGestion && hasSelectedCaptage
      const emphasized = selBv || liaBv
      const stroke = selBv ? QUALITE_COLORS[cls] : '#94a3b8'
      const strokeWidth = emphasized ? 2.5 : 1.5
      const dash = emphasized ? null : '6,4'
      const opacity = emphasized ? 1 : 0.6

      const coords = b.coordinates?.[0] ? b.coordinates[0] : []
      const feature = new Feature({ geometry: coords.length ? toPolygon3857(coords) : undefined })
      feature.set('bvId', b.id)
      feature.set('name', b.name)
      feature.set('province', b.province)
      feature.set('sector', b.sector)
      feature.set('captageCount', b.captageRefs.length)
      feature.set(
        'value',
        ind ? `${valueForBvaep(ind.id, b.id).toLocaleString('fr-FR')} ${ind.unit}` : null
      )
      feature.set('stroke', stroke)
      feature.set('strokeWidth', strokeWidth)
      feature.set('dash', dash)
      feature.set('opacity', opacity)
      feature.set('kind', 'bv')
      feature.set('_hover', false)
      source.addFeature(feature)
    }
    result.push(new VectorLayer({ source, style: bvStyle }))
  }

  // ── Bassins versants BBR ────────────────────────────────────────────────────────
  if (on('bbr') && bbrRegions) {
    const source = new VectorSource()
    for (const b of bbrRegions) {
      const cls = bvaepClass(activeIndicator, b.id)
      const stroke = '#ef4444'
      const strokeWidth = 1.5
      const dash = '8,4'
      const opacity = 0.7

      const coords = b.coordinates?.[0] ? b.coordinates[0] : []
      const feature = new Feature({ geometry: coords.length ? toPolygon3857(coords) : undefined })
      feature.set('bvId', b.id)
      feature.set('name', b.name)
      feature.set('province', b.province)
      feature.set('sector', b.sector)
      feature.set('captageCount', b.communes?.length || 0)
      feature.set('value', ind ? `${valueForBvaep(ind.id, b.id).toLocaleString('fr-FR')} ${ind.unit}` : null)
      feature.set('stroke', stroke)
      feature.set('strokeWidth', strokeWidth)
      feature.set('dash', dash)
      feature.set('opacity', opacity)
      feature.set('kind', 'bbr')
      feature.set('_hover', false)
      source.addFeature(feature)
    }
    result.push(new VectorLayer({ source, style: bbrStyle }))
  }

  // ── Couche source ───────────────────────────────────────────────────────────
  if (ind && on('source')) {
    const source = new VectorSource()
    const feature = new Feature({ geometry: toPolygon3857(SOURCE_FOOTPRINT_3857) })
    feature.set('name', ind.sourceLabel)
    feature.set('datatype', ind.datatype)
    feature.set('theme', ind.theme)
    feature.set('unit', ind.unit)
    feature.set('fill', SOURCE_FILLS[ind.id] ?? 'rgba(239,68,68,0.15)')
    feature.set('stroke', ind.datatype === 'qualite' ? '#3b82f6' : '#ef4444')
    feature.set('kind', 'source')
    feature.set('_hover', false)
    source.addFeature(feature)
    result.push(new VectorLayer({ source, style: sourceStyle }))
  }

  // ── Cellules H3 ─────────────────────────────────────────────────────────────
  if (h3Mode && ind) {
    const source = new VectorSource()
    for (const feature of buildH3Features(ind.id)) {
      feature.set('unit', ind.unit)
      feature.set('_hover', false)
      source.addFeature(feature)
    }
    result.push(new VectorLayer({ source, style: h3Style }))
  }

  // ── Unités de gestion (captages réels) ──────────────────────────────────────
  if (on('capt')) {
    const source = new VectorSource()
    for (const c of captages) {
      const inSelectedBv = regions.some(
        (b) => selectedBvaeps.has(b.id) && b.captageRefs.includes(c.id)
      )
      const selCap = isGestion ? selectedKeys.includes(c.id) : false
      const liaCap = isGestion ? false : inSelectedBv
      const grayed = !selCap && !liaCap
      const sym = ind
        ? symbolFor(valueForUnite(ind.id, c.id), ind.datatype)
        : { r: 4.5, fill: '#3b82f6' }
      const radius = selCap ? Math.max(sym.r, 6) : sym.r
      const feature = new Feature({ geometry: toPoint3857(c.coordinates) })
      feature.set('kind', 'capt')
      feature.set('captId', c.id)
      feature.set('name', c.name)
      feature.set('commune', c.commune ?? '—')
      feature.set('province', c.province ?? '—')
      feature.set(
        'value',
        ind ? `${valueForUnite(ind.id, c.id).toLocaleString('fr-FR')} ${ind.unit}` : null
      )
      feature.set('radius', radius)
      feature.set('fill', grayed ? '#cbd5e1' : sym.fill)
      feature.set('stroke', selCap ? '#f59e0b' : '#ffffff')
      feature.set('strokeWidth', selCap ? 2 : 1.5)
      feature.set('kindType', c.kind)
      feature.set('_hover', false)
      source.addFeature(feature)
    }
    result.push(new VectorLayer({ source, style: captStyle }))
  }

  return result
}

function bvStyle(feature: Feature): Style {
  const hover = feature.get('_hover')
  const opacity = hover ? Math.min(1, (feature.get('opacity') as number) + 0.3) : (feature.get('opacity') as number)
  const dash = feature.get('dash') as string | null
  const stroke = feature.get('stroke') as string
  const strokeColor = hexA(stroke, stroke.startsWith('#') ? opacity : 1)
  return new Style({
    stroke: new Stroke({
      color: strokeColor,
      width: hover ? (feature.get('strokeWidth') as number) + 0.5 : (feature.get('strokeWidth') as number),
      lineDash: dash ? [6, 4] : undefined,
    }),
  })
}

function bbrStyle(feature: Feature): Style {
  const hover = feature.get('_hover')
  const opacity = hover ? Math.min(1, (feature.get('opacity') as number) + 0.3) : (feature.get('opacity') as number)
  const dash = feature.get('dash') as string | null
  const stroke = feature.get('stroke') as string
  const strokeColor = hexA(stroke, stroke.startsWith('#') ? opacity : 1)
  return new Style({
    stroke: new Stroke({
      color: strokeColor,
      width: hover ? (feature.get('strokeWidth') as number) + 0.5 : (feature.get('strokeWidth') as number),
      lineDash: dash ? [8, 4] : undefined,
    }),
  })
}

function sourceStyle(feature: Feature): Style {
  return new Style({
    fill: new Fill({ color: feature.get('fill') as string }),
    stroke: new Stroke({ color: feature.get('stroke') as string, width: 1, lineDash: [5, 4] }),
  })
}

function h3Style(feature: Feature): Style {
  const cls = feature.get('cls') as number
  const hover = feature.get('_hover')
  const color = QUALITE_COLORS[cls]
  const fill = hexA(color, hover ? 0.82 : 0.42)
  return new Style({
    fill: new Fill({ color: fill }),
    stroke: new Stroke({ color: hover ? color : cls === 0 ? 'rgba(148,163,184,0.4)' : color, width: hover ? 1.5 : 0.8 }),
  })
}

function captStyle(feature: Feature): Style {
  const hover = feature.get('_hover')
  const radius = hover ? (feature.get('radius') as number) + 2 : (feature.get('radius') as number)
  const kind = feature.get('kindType') as 'captage_superficiel' | 'forage' | 'tranchee_drainante' | undefined
  const fill = new Fill({ color: feature.get('fill') as string })
  const stroke = new Stroke({ color: feature.get('stroke') as string, width: feature.get('strokeWidth') as number })
  if (kind === 'forage') {
    return new Style({
      image: new RegularShape({ points: 4, radius, rotation: Math.PI / 4, fill, stroke }),
    })
  }
  if (kind === 'tranchee_drainante') {
    return new Style({
      image: new RegularShape({ points: 3, radius, fill, stroke }),
    })
  }
  return new Style({
    image: new CircleStyle({ radius, fill, stroke }),
  })
}

// Ajoute un canal alpha (0..1) à une couleur rgb()/hex si possible.
function hexA(color: string, alpha: number): string {
  const m = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (m) return `rgba(${m[1]}, ${m[2]}, ${m[3]}, ${alpha})`
  if (color.startsWith('#') && color.length === 7) {
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
  return color
}
