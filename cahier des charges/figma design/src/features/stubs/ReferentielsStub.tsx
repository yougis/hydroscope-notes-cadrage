import { WireframeBlock } from '@/components/ui/WireframeBlock'

export function ReferentielsStub() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2">
        {['Bassins versants', 'Captages / Forages', 'Périmètres de protection', 'Grille d’analyse', 'Profils'].map((r) => (
          <span key={r} className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs text-neutral-600">
            {r}
          </span>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-3 gap-4">
        <WireframeBlock label="Liste des bassins versants (~50)" className="min-h-44 w-full" />
        <WireframeBlock label="Liste des captages (~500)" className="min-h-44 w-full" />
        <WireframeBlock label="Périmètres de protection (~250)" className="min-h-44 w-full" />
      </div>
    </div>
  )
}