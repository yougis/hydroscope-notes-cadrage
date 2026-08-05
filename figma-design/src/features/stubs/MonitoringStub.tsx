import { WireframeBlock } from '@/components/ui/WireframeBlock'

export function MonitoringStub() {
  const cards = [
    { t: 'Import récents', v: '128 / 132', s: '4 échecs' },
    { t: 'Connexions sources', v: '30 / 32', s: '2 alertes' },
    { t: 'Disponibilité 30 j', v: '99,2 %', s: 'Objectif ≥ 98 %' },
    { t: 'Temps de réponse', v: '1,4 s', s: '< 3 s' },
  ]
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="grid grid-cols-4 gap-3">
        {cards.map((c) => (
          <div key={c.t} className="rounded-md border border-neutral-200 bg-white p-3">
            <span className="block text-[11px] uppercase tracking-wide text-neutral-400">{c.t}</span>
            <span className="mt-1 block text-xl font-semibold text-neutral-800">{c.v}</span>
            <span className="text-xs text-neutral-500">{c.s}</span>
          </div>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-2 gap-4">
        <WireframeBlock label="Tableau de bord qualité des données (complétude, fraîcheur)" className="min-h-44 w-full" />
        <WireframeBlock label="Journal des traitements en arrière-plan" className="min-h-44 w-full" />
      </div>
    </div>
  )
}