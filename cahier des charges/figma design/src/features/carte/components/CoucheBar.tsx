import type { LayerDef } from '../hooks/useLayers'

export interface CoucheBarProps {
  layers: LayerDef[]
  onToggleLayer: (key: string) => void
}

export function CoucheBar({ layers, onToggleLayer }: CoucheBarProps) {
  return (
    <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-1.5 border-b border-neutral-100 bg-white/95 p-2">
      <span className="rounded-md px-1.5 text-[11px] font-medium text-neutral-600">Carte des captages</span>
      {layers.map((l) => (
        <button
          key={l.key}
          onClick={() => onToggleLayer(l.key)}
          className={`rounded-full border px-2 py-0.5 text-[10px] transition ${l.on ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-neutral-200 bg-white text-neutral-400'}`}
        >
          {l.label}
        </button>
      ))}
      <span className="ml-auto rounded-md border border-neutral-300 bg-white px-2 py-1 text-[11px] text-neutral-500">Période : 2016 — 2026 ▾</span>
    </div>
  )
}