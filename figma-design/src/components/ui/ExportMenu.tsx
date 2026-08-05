import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import type { ExportFormat } from '@/features/export'

export interface ExportMenuProps {
  onExport: (fmt: ExportFormat) => void
}

const ITEMS: Array<{ fmt: ExportFormat; label: string; hint: string }> = [
  { fmt: 'csv', label: 'Valeurs (CSV)', hint: 'tableur / base' },
  { fmt: 'geojson', label: 'Géométries (GeoJSON)', hint: 'SIG / web' },
  { fmt: 'geopackage', label: 'Base SIG (GeoPackage)', hint: '.gpkg — QGIS' },
]

export function ExportMenu({ onExport }: ExportMenuProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Exporter le contexte de sélection"
        title="Exporter le contexte de sélection (unités + indicateurs)"
        className="flex h-8 items-center gap-1.5 rounded-md border border-neutral-200 px-2.5 text-xs font-medium text-neutral-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
      >
        <Icon>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <path d="m7 10 5 5 5-5" />
          <path d="M12 15V3" />
        </Icon>
        Exporter
        <svg
          viewBox="0 0 16 16"
          className={`h-3 w-3 stroke-current transition-transform ${open ? '' : '-rotate-90'}`}
          fill="none"
          strokeWidth="1.5"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-30 mt-1 w-64 overflow-hidden rounded-md border border-neutral-200 bg-white shadow-lg">
          {ITEMS.map((it) => (
            <button
              key={it.fmt}
              type="button"
              onClick={() => {
                onExport(it.fmt)
                setOpen(false)
              }}
              className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left transition hover:bg-blue-50"
            >
              <span className="text-xs font-medium text-neutral-700">{it.label}</span>
              <span className="text-[10px] text-neutral-400">{it.hint}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
