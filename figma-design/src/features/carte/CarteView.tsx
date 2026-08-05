import { useState } from 'react'
import { BVAEPS } from '@/data/hydroscope'
import { MapCanvas } from './MapCanvas'
import { useLayers, type BasemapId } from './hooks/useLayers'
import { CaptageSelector } from './components/CaptageSelector'
import { IndicateurExplorer } from './components/IndicateurExplorer'
import type { ChartViewMode } from '@/features/indicateurs/ChartModeSwitcher'
import type { UnitMode } from '@/types/domain'

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

const BASEMAP_OPTIONS: Array<{ id: BasemapId; label: string }> = [
  { id: 'carto', label: 'Carto' },
  { id: 'satellite', label: 'Satellite' },
  { id: 'terrain', label: 'Terrain' },
]

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
  const isGestion = unitMode === 'gestion'
  const h3Mode = showCarte
  const selectedKeys = isGestion
    ? [...selectedUnites]
    : BVAEPS.filter((b) => selectedBvaeps.has(b.id)).flatMap((b) => b.captageRefs)

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
      />

      <div className="relative min-w-0 flex-1 overflow-hidden rounded-md border border-neutral-200 bg-white">
        <div className="absolute left-1/2 top-2 z-10 flex -translate-x-1/2 items-center rounded-md border border-neutral-300 bg-white p-0.5 shadow-sm">
          {BASEMAP_OPTIONS.map((b) => (
            <button
              key={b.id}
              onClick={() => setBasemap(b.id)}
              className={`rounded px-2.5 py-1 text-[11px] font-medium transition ${
                basemap === b.id ? 'bg-blue-600 text-white' : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
        <MapCanvas selectedKeys={selectedKeys} activeIndicator={activeIndicator} unitMode={unitMode} selectedBvaeps={selectedBvaeps} layers={layers} basemap={basemap} h3Mode={h3Mode} />
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
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
      />
    </div>
  )
}
