import { WireframeBlock } from '@/components/ui/WireframeBlock'

export function ImportStub() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="rounded border border-blue-500 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">+ Nouvel import</span>
        <span className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-600">Planifier</span>
        <span className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-600">Connecter une API</span>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <WireframeBlock label="Glisser-déposer un fichier (CSV, GeoJSON, Shapefile…)" className="min-h-36 w-full" />
          <WireframeBlock label="Paramètres de l’import (structure, fréquence, format)" className="min-h-28 w-full" />
        </div>
        <div className="flex flex-col gap-3">
          <span className="rounded-md border border-neutral-200 bg-white p-3 text-xs font-semibold text-neutral-600">Historique des imports</span>
          {[
            ['2026-08-01 06:00', 'Captages — GEOREP', 'Succès', 'emerald'],
            ['2026-07-31 06:00', 'VIIRS brûlé', 'Succès', 'emerald'],
            ['2026-07-30 12:30', 'MOS vectorisés', 'Échec', 'red'],
          ].map((row) => (
            <div key={row[1]} className="flex items-center justify-between rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs">
              <span className="text-neutral-500">{row[0]}</span>
              <span className="font-medium text-neutral-700">{row[1]}</span>
              <span className={`font-medium ${row[3] === 'red' ? 'text-red-600' : 'text-emerald-600'}`}>{row[2]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}