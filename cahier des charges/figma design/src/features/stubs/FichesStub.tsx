import { WireframeBlock } from '@/components/ui/WireframeBlock'

export function FichesStub() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2">
        {['Commune', 'Bassin versant', 'Captage / Forage', 'Périmètre de protection', 'Indicateur'].map((t) => (
          <span key={t} className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs text-neutral-600">
            {t}
          </span>
        ))}
        <span className="ml-auto rounded border border-blue-500 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">Rapport PDF</span>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-4">
        <WireframeBlock label="Carte du périmètre" className="min-h-40 w-full" />
        <WireframeBlock label="Caractéristiques & unités de gestion" className="min-h-40 w-full" />
        <WireframeBlock label="Indicateurs associés" className="min-h-40 w-full" />
      </div>
      <WireframeBlock label="Visualisation des évolutions & comparaison descriptive entre unités" className="min-h-32 w-full" />
    </div>
  )
}