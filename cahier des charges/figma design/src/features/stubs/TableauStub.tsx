import { LineChart } from '@/components/charts/LineChart'
import { BarChart } from '@/components/charts/BarChart'

export function TableauStub() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3 rounded-md border border-neutral-200 bg-white p-3">
        <span className="text-xs font-semibold text-neutral-700">Territoire</span>
        <span className="rounded border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs text-neutral-600">Bassin versant du Nord</span>
        <span className="text-xs font-semibold text-neutral-700">Indicateur</span>
        <span className="rounded border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs text-neutral-600">Surface brûlée (ha)</span>
        <span className="text-xs font-semibold text-neutral-700">Période</span>
        <span className="rounded border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs text-neutral-600">2016 — 2026</span>
        <span className="ml-auto rounded border border-blue-500 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">Exporter</span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[
          { k: 'Valeur actuelle', v: '1 240 ha' },
          { k: 'Tendance 10 ans', v: '+18 %' },
          { k: 'Rang territorial', v: '#4 / 12' },
          { k: 'Fraîcheur donnée', v: 'Il y a 7 j' },
        ].map((s) => (
          <div key={s.k} className="rounded-md border border-neutral-200 bg-white p-3">
            <span className="block text-[11px] uppercase tracking-wide text-neutral-400">{s.k}</span>
            <span className="mt-1 block text-xl font-semibold text-neutral-800">{s.v}</span>
          </div>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-2 gap-4">
        <div className="flex flex-col rounded-md border border-neutral-200 bg-white p-3">
          <span className="mb-1 text-[11px] font-semibold text-neutral-600">Évolution annuelle</span>
          <LineChart className="min-h-28 w-full flex-1" />
        </div>
        <div className="flex flex-col rounded-md border border-neutral-200 bg-white p-3">
          <span className="mb-1 text-[11px] font-semibold text-neutral-600">Comparaison de périodes</span>
          <BarChart className="min-h-28 w-full flex-1" />
        </div>
      </div>
    </div>
  )
}