import { WireframeBlock } from '@/components/ui/WireframeBlock'

export function ComparaisonStub() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded border border-blue-500 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">Bassin versant Nord</span>
        <span className="rounded border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs text-neutral-600">Bassin versant Sud</span>
        <span className="rounded border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs text-neutral-600">Bassin versant Centre</span>
        <span className="ml-auto rounded border border-neutral-300 bg-white px-3 py-1 text-xs text-neutral-500">Ajouter un territoire</span>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-4">
        <WireframeBlock label="Cartes comparatives côte à côte" className="min-h-48 w-full" />
        <div className="flex flex-col gap-4">
          <WireframeBlock label="Comparaison d’indicateurs (radar / barres)" className="min-h-32 w-full" />
          <WireframeBlock label="Séries temporelles superposées" className="min-h-32 w-full" />
        </div>
      </div>
    </div>
  )
}