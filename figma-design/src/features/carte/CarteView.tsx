import { useEffect, useRef, useState } from 'react'
import { BVAEPS } from '@/data/hydroscope'
import { MapCanvas } from './MapCanvas'
import { useLayers, type BasemapId, SATELLITE_IDS } from './hooks/useLayers'
import { BASEMAP_META, probeUrl, probeTile, webMercatorTile } from './map/basemaps'
import { CaptageSelector } from './components/CaptageSelector'
import { IndicateurExplorer } from './components/IndicateurExplorer'
import { StatLegend } from './components/StatLegend'
import type { ChartViewMode } from '@/features/indicateurs/ChartModeSwitcher'
import type { HoverEntity, UnitMode } from '@/types/domain'

export interface CarteViewProps {
  unitMode: UnitMode
  onSetMode: (m: UnitMode) => void
  selectedUnites: Set<string>
  onToggleUnite: (id: string) => void
  selectedBvaeps: Set<string>
  onToggleBvaep: (id: string) => void
  onApplyUnites: (ids: string[]) => void
  onApplyBvaeps: (ids: string[]) => void
  onClearUnites: () => void
  onClearBvaeps: () => void
  activeIndicator: string | null
  onSelectIndicator: (id: string) => void
  onOpenCatalogue: () => void
  onOpenFiche: (id: string) => void
}

function SatelliteDropdown({
  basemap,
  onSelect,
  health,
}: {
  basemap: BasemapId
  onSelect: (id: BasemapId) => void
  health: Partial<Record<BasemapId, boolean>>
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const sats = BASEMAP_META.filter((m) => m.satellite)
  const active = sats.find((m) => m.id === basemap)
  const label = active ? active.label : 'Satellite'

  useEffect(() => {
    if (!open) return
    const onClick = (ev: MouseEvent) => {
      if (ref.current && !ref.current.contains(ev.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex max-w-[160px] items-center gap-1 rounded px-2.5 py-1 text-[11px] font-medium transition ${
          active ? 'bg-blue-600 text-white' : 'text-neutral-500 hover:text-neutral-800'
        }`}
      >
        <span className="truncate">{label}</span>
        <span className={`text-[10px] ${active ? 'text-white/70' : 'text-neutral-400'}`}>▼</span>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-1 w-56 rounded-md border border-neutral-200 bg-white p-1 shadow-lg">
          {sats.map((m) => {
            const broken = health[m.id] === false
            return (
              <button
                key={m.id}
                type="button"
                disabled={broken}
                onClick={() => {
                  onSelect(m.id)
                  setOpen(false)
                }}
                title={broken ? `${m.label} — source indisponible` : `Imagerie : ${m.credits}`}
                className={`flex w-full items-start gap-2 rounded px-2 py-1.5 text-left text-[11px] transition ${
                  broken
                    ? 'cursor-not-allowed opacity-40'
                    : 'hover:bg-neutral-100'
                } ${m.id === basemap ? 'bg-blue-50 text-blue-700' : 'text-neutral-700'}`}
              >
                <span className="mt-0.5 shrink-0 text-[10px] leading-none">
                  {m.id === basemap ? '●' : '○'}
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="truncate font-medium">{m.label}</span>
                  <span className="truncate text-[10px] text-neutral-400">
                    {broken ? 'Source indisponible' : m.credits}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function CarteView({
  unitMode,
  onSetMode,
  selectedUnites,
  onToggleUnite,
  selectedBvaeps,
  onToggleBvaep,
  onApplyUnites,
  onApplyBvaeps,
  onClearUnites,
  onClearBvaeps,
  activeIndicator,
  onSelectIndicator,
  onOpenCatalogue,
  onOpenFiche,
}: CarteViewProps) {
  const { layers, toggleLayer, basemap, setBasemap } = useLayers()
  const [mode, setMode] = useState<ChartViewMode>('repartition')
  const [showCarte, setShowCarte] = useState(false)
  const [hoverEntity, setHoverEntity] = useState<HoverEntity | null>(null)
  const [health, setHealth] = useState<Partial<Record<BasemapId, boolean>>>({})
  const isGestion = unitMode === 'gestion'
  const h3Mode = showCarte
  const selectedKeys = isGestion
    ? [...selectedUnites]
    : BVAEPS.filter((b) => selectedBvaeps.has(b.id)).flatMap((b) => b.captageRefs)
  const activeMeta = BASEMAP_META.find((m) => m.id === basemap)

  useEffect(() => {
    let alive = true
    const tile = webMercatorTile(165.5, -21.3, 8)
    for (const id of SATELLITE_IDS) {
      const url = probeUrl(id, tile.x, tile.y, tile.z)
      void (async () => {
        const ok = url ? await probeTile(url) : id !== 'mapbox'
        if (alive) setHealth((h) => ({ ...h, [id]: ok }))
      })()
    }
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="flex h-full gap-3">
      <CaptageSelector
        unitMode={unitMode}
        onSetMode={onSetMode}
        selectedUnites={selectedUnites}
        onToggleUnite={onToggleUnite}
        selectedBvaeps={selectedBvaeps}
        onToggleBvaep={onToggleBvaep}
        onApplyUnites={onApplyUnites}
        onApplyBvaeps={onApplyBvaeps}
        onClearUnites={onClearUnites}
        onClearBvaeps={onClearBvaeps}
        activeIndicator={activeIndicator}
        layers={layers}
        onToggleLayer={toggleLayer}
        hoverEntity={hoverEntity}
        onHoverEntity={setHoverEntity}
      />

      <div className="relative min-w-0 flex-1 overflow-hidden rounded-md border border-neutral-200 bg-white">
        <div className="absolute left-1/2 top-2 z-10 flex -translate-x-1/2 items-center rounded-md border border-neutral-300 bg-white p-0.5 shadow-sm">
          {(['carto', 'terrain'] as BasemapId[]).map((id) => {
            const meta = BASEMAP_META.find((m) => m.id === id)!
            const active = basemap === id
            return (
              <button
                key={id}
                onClick={() => setBasemap(id)}
                className={`rounded px-2.5 py-1 text-[11px] font-medium transition ${
                  active ? 'bg-blue-600 text-white' : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                {meta.label}
              </button>
            )
          })}
          <div className="mx-1 h-4 w-px bg-neutral-200" />
          <SatelliteDropdown basemap={basemap} onSelect={setBasemap} health={health} />
        </div>
        <MapCanvas selectedKeys={selectedKeys} activeIndicator={activeIndicator} unitMode={unitMode} selectedBvaeps={selectedBvaeps} layers={layers} basemap={basemap} h3Mode={h3Mode} hoveredEntity={hoverEntity} onHoverEntity={setHoverEntity} showGrid={false} />
        <StatLegend activeIndicator={activeIndicator} choropleth={h3Mode} />
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
{activeMeta?.credits && (
  <span className="rounded border border-neutral-300 bg-white px-2 py-1 text-[11px] text-neutral-500">
    📷 {activeMeta.credits}
  </span>
)}
          <span className="rounded border border-neutral-300 bg-white px-2 py-1 text-[11px] text-neutral-500">0 — 50 km</span>
          <span className="flex h-9 w-9 items-center justify-center rounded border border-neutral-300 bg-white text-xs font-bold text-neutral-600">N</span>
        </div>
        <div className="absolute right-3 top-12 flex flex-col gap-1">
          <span className="flex h-8 w-8 items-center justify-center rounded border border-neutral-300 bg-white text-sm font-bold text-neutral-600">+</span>
          <span className="flex h-8 w-8 items-center justify-center rounded border border-neutral-300 bg-white text-sm font-bold text-neutral-600">−</span>
        </div>
      </div>

      <IndicateurExplorer
        unitMode={unitMode}
        selectedUnites={selectedUnites}
        selectedBvaeps={selectedBvaeps}
        activeIndicator={activeIndicator}
        onSelectIndicator={onSelectIndicator}
        onOpenCatalogue={onOpenCatalogue}
        onOpenFiche={onOpenFiche}
        mode={mode}
        onMode={setMode}
        showCarte={showCarte}
        onToggleCarte={() => setShowCarte((c) => !c)}
        hoverEntity={hoverEntity}
        onHoverEntity={setHoverEntity}
      />
    </div>
  )
}