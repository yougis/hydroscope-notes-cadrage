import { useEffect, useMemo, useRef, useState } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import { fromLonLat } from 'ol/proj'
import type Feature from 'ol/Feature'
import type { default as VectorLayer } from 'ol/layer/Vector'
import type { default as VectorSource } from 'ol/source/Vector'
import { createBasemapLayer } from './map/basemaps'
import { buildVectorLayers } from './map/layers'
import { QUALITE_COLORS, QUALITE_LABELS } from './map/theme'
import { KIND_LABELS } from '@/data/ouvrages'
import type { BasemapId, LayerDef } from './hooks/useLayers'
import type { CaptageKind, HoverEntity, UnitMode } from '@/types/domain'
import { tendanceDe, ecartA, debutTension, seuilsRef } from '@/data/qualification'
import type { LiveCaptage, LiveRegion } from '@/data/referentiels'

export interface MapCanvasProps {
  showGrid?: boolean
  selectedKeys?: string[]
  activeIndicator?: string | null
  unitMode?: UnitMode
  selectedBvaeps?: Set<string>
  layers?: LayerDef[]
  basemap?: BasemapId
  h3Mode?: boolean
  hoveredEntity?: HoverEntity | null
  onHoverEntity?: (e: HoverEntity | null) => void
  captages?: LiveCaptage[]
  regions?: LiveRegion[]
  bbrRegions?: LiveRegion[]
}

type HoverInfo =
  | { kind: 'entity'; nature: string; name: string; value: string | null; rows: Array<[string, string]> }
  | { kind: 'h3'; value: number; unit: string; cls: number; clsColor: string; niveau: number; niveauLabel: string; ecart: number; tendance: string; debutTension: number | null }

const NC_CENTER = fromLonLat([165.5, -21.3])

export function MapCanvas({
  showGrid = true,
  selectedKeys = [],
  activeIndicator = null,
  unitMode = 'gestion',
  selectedBvaeps = new Set(),
  layers = [],
  basemap = 'carto',
  h3Mode = false,
  hoveredEntity = null,
  onHoverEntity,
  captages = [],
  regions = [],
  bbrRegions = [],
}: MapCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Map | null>(null)
  const layersRef = useRef<VectorLayer<VectorSource>[]>([])
  const basemapRef = useRef<{ layer: ReturnType<typeof createBasemapLayer> } | null>(null)
  const hoveredFeatureRef = useRef<Feature | null>(null)
  const forcedFeatureRef = useRef<Feature | null>(null)
  const showForcedRef = useRef(false)
  const onHoverRef = useRef(onHoverEntity)
  onHoverRef.current = onHoverEntity
  const [hover, setHover] = useState<HoverInfo | null>(null)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)

  const selKeysStr = useMemo(() => selectedKeys.join(','), [selectedKeys])
  const selBvStr = useMemo(() => [...selectedBvaeps].sort().join(','), [selectedBvaeps])
  const layerStr = useMemo(() => layers.map((l) => `${l.key}:${l.on}`).join(','), [layers])

  useEffect(() => {
    if (!containerRef.current) return
    const map = new Map({
      target: containerRef.current,
      layers: [createBasemapLayer('carto')],
      controls: [],
      view: new View({
        center: NC_CENTER,
        zoom: 7.2,
        minZoom: 5,
        maxZoom: 16,
      }),
    })
    basemapRef.current = { layer: map.getLayers().item(0) as ReturnType<typeof createBasemapLayer> }
    mapRef.current = map

    map.on('pointermove', (evt) => {
      const hit = map.forEachFeatureAtPixel(evt.pixel, (f) => f as Feature)
      if (hit) {
        const prev = hoveredFeatureRef.current
        if (prev && prev !== hit) {
          prev.set('_hover', false)
          prev.changed()
        }
        if (!hit.get('_hover')) {
          hit.set('_hover', true)
          hit.changed()
        }
        hoveredFeatureRef.current = hit
        setPos({ x: evt.pixel[0], y: evt.pixel[1] })
        setHover(tooltipFor(hit))
        emitHoverFor(hit, onHoverRef.current)
      } else {
        const prev = hoveredFeatureRef.current
        if (prev) {
          prev.set('_hover', false)
          prev.changed()
        }
        hoveredFeatureRef.current = null
        setHover(null)
        setPos(null)
        onHoverRef.current?.(null)
      }
    })

    return () => {
      map.setTarget(undefined)
      mapRef.current = null
      basemapRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    const next = createBasemapLayer(basemap)
    map.getLayers().setAt(0, next)
    basemapRef.current = { layer: next }
  }, [basemap])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    for (const l of layersRef.current) map.removeLayer(l)
    layersRef.current = []
    const built = buildVectorLayers({
      activeIndicator,
      unitMode,
      selectedBvaeps,
      selectedKeys,
      h3Mode,
      layers,
      captages,
      regions,
      bbrRegions,
    })
    for (const l of built) map.addLayer(l)
    layersRef.current = built
  }, [activeIndicator, unitMode, selKeysStr, selBvStr, h3Mode, layerStr, captages, regions, bbrRegions])

  const hoveredStr = hoveredEntity ? `${hoveredEntity.kind}:${hoveredEntity.id}` : ''
  useEffect(() => {
    const prevF = forcedFeatureRef.current
    if (prevF) {
      prevF.set('_hover', false)
      prevF.changed()
    }
    forcedFeatureRef.current = null
    if (!hoveredEntity || !mapRef.current) {
      if (showForcedRef.current) {
        showForcedRef.current = false
        setHover(null)
        setPos(null)
      }
      return
    }
    const f = findFeatureForEntity(hoveredEntity, layersRef.current)
    forcedFeatureRef.current = f
    if (f) {
      showForcedRef.current = true
      f.set('_hover', true)
      f.changed()
      setPos({ x: 120, y: 120 })
      setHover(tooltipFor(f))
    }
  }, [hoveredStr, selKeysStr, selBvStr, activeIndicator, unitMode, layerStr])

  const containerW = containerRef.current?.clientWidth ?? 0
  const containerH = containerRef.current?.clientHeight ?? 0

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
      role="img"
      aria-label="Carte interactive de la Nouvelle-Calédonie"
      onMouseLeave={() => {
        const prev = hoveredFeatureRef.current
        if (prev) {
          prev.set('_hover', false)
          prev.changed()
        }
        hoveredFeatureRef.current = null
        setHover(null)
        setPos(null)
      }}
    >
      {showGrid && <GridOverlay />}
      {hover && pos && (
        <HoverTooltip
          hover={hover}
          pos={pos}
          containerW={containerW}
          containerH={containerH}
        />
      )}
      {hover?.kind === 'h3' && pos && (
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 rounded border border-neutral-300 bg-white px-2 py-1 font-mono text-[11px] text-neutral-700 shadow-sm">
          <span>↗ H3</span>
          <span style={{ color: hover.clsColor }}>
            {hover.value.toLocaleString('fr-FR')} {hover.unit}
          </span>
        </div>
      )}
    </div>
  )
}

function GridOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 opacity-40 [background-image:linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] [background-size:40px_40px]" />
  )
}

function emitHoverFor(feature: Feature, cb?: (e: HoverEntity | null) => void) {
  if (!cb) return
  const kind = feature.get('kind')
  if (kind === 'capt') cb({ kind: 'unite', id: feature.get('captId') as string })
  else if (kind === 'bv') cb({ kind: 'bvaep', id: feature.get('bvId') as string })
}

function findFeatureForEntity(e: HoverEntity, layers: VectorLayer<VectorSource>[]): Feature | null {
  const wantKind = e.kind === 'unite' ? 'capt' : 'bv'
  const idKey = wantKind === 'capt' ? 'captId' : 'bvId'
  for (const layer of layers) {
    const src = layer.getSource()
    if (!src) continue
    for (const f of src.getFeatures()) {
      if (f.get('kind') === wantKind && f.get(idKey) === e.id) return f
    }
  }
  return null
}

function tooltipFor(feature: Feature): HoverInfo {
  const kind = feature.get('kind')
  if (kind === 'h3') {
    const cls = feature.get('cls') as number
    const val = feature.get('value') as number
    const unit = feature.get('unit') as string
    const indId = feature.get('indicatorId') as string | undefined
    const niveau = cls
    const niveauLabel = QUALITE_LABELS[niveau]
    const ecart = indId ? ecartA(indId, val) : 0
    const timeSeries = indId ? feature.get('timeSeries') as number[] | undefined : undefined
    const tendance = timeSeries ? tendanceDe(timeSeries) : 'indeterminee'
    const debutT = indId && timeSeries ? debutTension(timeSeries, seuilsRef(indId).seuilP75) : null
    return {
      kind: 'h3',
      value: val,
      unit,
      cls,
      clsColor: QUALITE_COLORS[cls],
      niveau,
      niveauLabel,
      ecart,
      tendance: tendance === 'hausse' ? '↑ Hausse' : tendance === 'baisse' ? '↓ Baisse' : tendance === 'stable' ? '→ Stable' : '? Indéterminée',
      debutTension: debutT,
    }
  }
  if (kind === 'bv') {
    return {
      kind: 'entity',
      nature: 'Bassin versant',
      name: feature.get('name') as string,
      value: (feature.get('value') as string | null) ?? null,
      rows: [
        ['Province', feature.get('province') as string],
        ['Unités', String(feature.get('captageCount'))],
        ['Secteur', feature.get('sector') as string],
      ],
    }
  }
  if (kind === 'source') {
    return {
      kind: 'entity',
      nature: 'Couche source',
      name: feature.get('name') as string,
      value: null,
      rows: [
        [feature.get('datatype') as string, feature.get('theme') as string],
        [feature.get('unit') as string, feature.get('unit') as string],
      ],
    }
  }
  const kindLabel = KIND_LABELS[feature.get('kindType') as CaptageKind]
  return {
    kind: 'entity',
    nature: 'Unité de gestion',
    name: feature.get('name') as string,
    value: (feature.get('value') as string | null) ?? null,
    rows: [
      ['Type', kindLabel ?? '—'],
      ['Commune', feature.get('commune') as string],
      ['Province', feature.get('province') as string],
    ],
  }
}

function HoverTooltip({
  hover,
  pos,
  containerW,
  containerH,
}: {
  hover: HoverInfo
  pos: { x: number; y: number }
  containerW: number
  containerH: number
}) {
  if (hover.kind === 'h3') {
    const left = Math.min(pos.x + 14, Math.max(containerW - 190, 0))
    const top = pos.y > 100 ? pos.y - 120 : pos.y + 16
    return (
      <div
        className="pointer-events-none absolute z-20 w-44 rounded border border-neutral-300 bg-white p-2 shadow-lg"
        style={{ left, top }}
      >
        <div className="font-mono text-[10px] font-semibold text-blue-700">H3 cell</div>
        <div className="font-mono text-lg font-semibold leading-none text-neutral-800">
          {hover.value.toLocaleString('fr-FR')} {hover.unit}
        </div>
        <div className="text-[11px] font-medium" style={{ color: hover.clsColor }}>
          {hover.niveauLabel}
        </div>
        <div className="mt-1 space-y-0.5 border-t border-neutral-100 pt-1 text-[10px] text-neutral-600">
          <div className="flex justify-between">
            <span>Écart P90</span>
            <span className="font-medium text-neutral-700">{hover.ecart > 0 ? '+' : ''}{hover.ecart}%</span>
          </div>
          <div className="flex justify-between">
            <span>Tendance</span>
            <span className="font-medium text-neutral-700">{hover.tendance}</span>
          </div>
          {hover.debutTension !== null && (
            <div className="flex justify-between">
              <span>Début tension</span>
              <span className="font-medium text-neutral-700">{hover.debutTension}</span>
            </div>
          )}
        </div>
      </div>
    )
  }
  const left = Math.min(pos.x + 14, Math.max(containerW - 170, 0))
  const top = pos.y > 80 ? pos.y - 76 : pos.y + 16
  return (
    <div
      className="pointer-events-none absolute z-20 w-40 rounded border border-neutral-300 bg-white p-2 shadow-md"
      style={{ left, top }}
    >
      <div className="text-[9px] font-bold uppercase tracking-wide text-neutral-400">{hover.nature}</div>
      <div className="text-[11px] font-semibold text-neutral-800">{hover.name}</div>
      {hover.value && <div className="mt-0.5 text-[11px] font-medium text-blue-700">Valeur : {hover.value}</div>}
      {hover.rows.length > 0 && (
        <div className="mt-1 space-y-0.5 border-t border-neutral-100 pt-1">
          {hover.rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-2 text-[9px] text-neutral-500">
              <span>{k}</span>
              <span className="font-medium text-neutral-700">{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}