import { WireframeBlock } from '@/components/ui/WireframeBlock'

export function TracabiliteStub() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-neutral-700">Élément</span>
        <span className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-600">Surface brûlée</span>
        <span className="ml-auto rounded border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-600">Restaurer un état</span>
      </div>
      <WireframeBlock label="Parcours de la donnée — source → transformation → indicateur (graphe)" className="min-h-40 w-full" />
      <div className="grid flex-1 grid-cols-2 gap-4">
        <WireframeBlock label="Historique des versions (horodaté)" className="min-h-40 w-full" />
        <WireframeBlock label="Journal des actions utilisateurs" className="min-h-40 w-full" />
      </div>
    </div>
  )
}