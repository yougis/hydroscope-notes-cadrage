import { CAPTAGE_POINTS } from '@/data/hydroscope'
import { MapCanvas } from './MapCanvas'
import { useLayers } from './hooks/useLayers'
import { CoucheBar } from './components/CoucheBar'
import { CaptageSelector } from './components/CaptageSelector'
import { CatalogueIndicateurs } from './components/CatalogueIndicateurs'

export interface CarteViewProps {
  selected: Set<string>
  onToggleCaptage: (id: string) => void
  onAssistedSelect: () => void
  sessionIndicators: string[]
  onToggleIndicator: (id: string) => void
  onOpenCatalogue: () => void
}

export function CarteView({
  selected,
  onToggleCaptage,
  onAssistedSelect,
  sessionIndicators,
  onToggleIndicator,
  onOpenCatalogue,
}: CarteViewProps) {
  const { layers, toggleLayer } = useLayers()
  const selectedKeys = CAPTAGE_POINTS.filter((p) => selected.has(p.key)).map((p) => p.key)

  return (
    <div className="flex h-full gap-3">
      <CaptageSelector selected={selected} onToggleCaptage={onToggleCaptage} onAssistedSelect={onAssistedSelect} />

      <div className="relative min-w-0 flex-1 overflow-hidden rounded-md border border-neutral-200 bg-white">
        <CoucheBar layers={layers} onToggleLayer={toggleLayer} />
        <MapCanvas selectedKeys={selectedKeys} />
        <div className="absolute bottom-3 left-3 rounded-md border border-neutral-200 bg-white p-2 text-[11px] leading-relaxed text-neutral-500">
          <span className="mb-1 block font-semibold text-neutral-700">Légende</span>
          <span className="flex items-center gap-1.5"><span className="h-0 w-0 border-y-4 border-l-4 border-y-transparent border-l-neutral-400" /> Bassin versant</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Captage</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500" /> Captage sélectionné</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full border border-dashed border-neutral-500" /> Périmètre de protection</span>
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <span className="rounded border border-neutral-300 bg-white px-2 py-1 text-[11px] text-neutral-500">0 — 50 km</span>
          <span className="flex h-9 w-9 items-center justify-center rounded border border-neutral-300 bg-white text-xs font-bold text-neutral-600">N</span>
        </div>
        <div className="absolute right-3 top-12 flex flex-col gap-1">
          <span className="flex h-8 w-8 items-center justify-center rounded border border-neutral-300 bg-white text-sm font-bold text-neutral-600">+</span>
          <span className="flex h-8 w-8 items-center justify-center rounded border border-neutral-300 bg-white text-sm font-bold text-neutral-600">−</span>
        </div>
      </div>

      <CatalogueIndicateurs sessionIndicators={sessionIndicators} onToggleIndicator={onToggleIndicator} onOpenCatalogue={onOpenCatalogue} />
    </div>
  )
}