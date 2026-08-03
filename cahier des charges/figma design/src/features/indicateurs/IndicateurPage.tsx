import { LineChart } from '@/components/charts/LineChart'
import { BarChart } from '@/components/charts/BarChart'
import { WireframeBlock } from '@/components/ui/WireframeBlock'
import { CAPTAGES, catalogueById } from '@/data/hydroscope'

export interface IndicateurPageProps {
  id: string
  selected: Set<string>
  onRemove: (id: string) => void
  onOpenFiche: () => void
}

export function IndicateurPage({ id, selected, onRemove, onOpenFiche }: IndicateurPageProps) {
  const ind = catalogueById(id)!
  const captages = CAPTAGES.filter((c) => selected.has(c.id))
  const values = captages.map((c, i) => ({ c, v: 186 - i * 13 + (c.id.charCodeAt(3) % 5) * 6 }))

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2 rounded-md border border-neutral-200 bg-white p-3">
        <span className="text-sm font-semibold text-neutral-800">{ind.code} · {ind.label}</span>
        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] text-neutral-500">{ind.family} / {ind.theme}</span>
        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] text-neutral-500">unité {ind.unit}</span>
        <button onClick={onOpenFiche} className="ml-auto rounded border border-neutral-300 bg-white px-3 py-1 text-xs text-neutral-600 hover:bg-neutral-50">
          Fiche &amp; métadonnées
        </button>
        <button onClick={() => onRemove(id)} className="rounded border border-red-200 bg-red-50 px-3 py-1 text-xs text-red-600 hover:bg-red-100">
          Retirer
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { k: 'Valeur sur la sélection', v: '1 240 ha' },
          { k: 'Tendance 10 ans', v: '+18 %' },
          { k: 'Captages concernés', v: `${captages.length} / ${selected.size}` },
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
          <span className="mb-1 text-[11px] font-semibold text-neutral-600">Évolution annuelle — captages sélectionnés</span>
          <LineChart className="min-h-28 w-full flex-1" />
          <span className="flex justify-between text-[10px] text-neutral-400"><span>2016</span><span>2021</span><span>2026</span></span>
        </div>
        <div className="flex flex-col rounded-md border border-neutral-200 bg-white p-3">
          <span className="mb-1 text-[11px] font-semibold text-neutral-600">Comparaison inter-captages</span>
          <BarChart className="min-h-28 w-full flex-1" />
        </div>
      </div>

      {captages.length === 0 ? (
        <WireframeBlock label="Aucun captage sélectionné — sélectionnez des captages depuis la carte." className="min-h-24 w-full" />
      ) : (
        <div className="overflow-hidden rounded-md border border-neutral-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
              <tr>
                <th className="px-3 py-2 font-medium">Rang</th>
                <th className="px-3 py-2 font-medium">Captage</th>
                <th className="px-3 py-2 font-medium">Commune · Bassin versant</th>
                <th className="px-3 py-2 font-medium">Valeur ({ind.unit})</th>
                <th className="px-3 py-2 font-medium">Évolution 5 ans</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {values.map((r, i) => (
                <tr key={r.c.id} className="hover:bg-neutral-50">
                  <td className="px-3 py-2 text-neutral-400">#{i + 1}</td>
                  <td className="px-3 py-2 font-medium">{r.c.name}</td>
                  <td className="px-3 py-2 text-neutral-500">{r.c.commune} · Bassin versant {r.c.bvaep}</td>
                  <td className="px-3 py-2 font-medium">{r.v} {ind.unit}</td>
                  <td className="px-3 py-2">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${i < 2 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
                      {i < 2 ? `+${(i + 2) * 11} %` : `+${(i + 1) * 4} %`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}