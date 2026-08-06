import { useMemo, useState } from 'react'
import { CATALOGUE, catalogueById, families, themesOfFamily } from '@/data/hydroscope'
import { IndicatorSymbol } from '@/components/ui/IndicatorSymbol'
import { getHexSpecs } from '@/features/carte/map/h3'
import { useCroisement } from './useCroisement'
import { channelsForCells, rgbCss, cellValue, CHANNEL_COLORS, CHANNEL_NAMES, MAX_INDICATORS } from './ternary'
import { HexGrid, type HexCellView } from './HexGrid'
import { TernaryLegend } from './TernaryLegend'
import type { IndicatorFamily } from '@/types/domain'

function matchIndicator(i: { code: string; label: string; theme: string; group: string; family: string }, q: string) {
  return `${i.code} ${i.label} ${i.theme} ${i.group} ${i.family}`.toLowerCase().includes(q)
}

export function CroisementView() {
  const { indicators, add, remove, isFull, method, setMethod } = useCroisement()
  const [query, setQuery] = useState('')
  const [famille, setFamille] = useState<IndicatorFamily>('ENJEUX')

  const specs = useMemo(() => getHexSpecs(), [])
  const q = query.trim().toLowerCase()

  const filtered = useMemo(
    () => CATALOGUE.filter((i) => i.family === famille).filter((i) => (q ? matchIndicator(i, q) : true)),
    [famille, q],
  )

  const cells: HexCellView[] = useMemo(() => {
    if (indicators.length === 0) return []
    const channels = channelsForCells(indicators, specs, method)
    return specs.map((spec, index) => ({
      spec,
      color: rgbCss(channels.get(spec.cell) ?? [0.15, 0.15, 0.15]),
      values: indicators.map((id) => [catalogueById(id)?.label ?? id, cellValue(id, index, spec.center)]),
    }))
  }, [indicators, specs, method])

  const selected = indicators.map((id) => catalogueById(id))

  const scales = useMemo(
    () =>
      selected.map((ind, k) => {
        if (!ind) return null
        const vals = specs.map((s, i) => cellValue(ind.id, i, s.center))
        const min = Math.min(...vals)
        const max = Math.max(...vals)
        return { label: ind.label, channel: CHANNEL_NAMES[k] ?? '', color: CHANNEL_COLORS[k] ?? '#999', min, max }
      }),
    [selected, specs],
  )

  return (
    <div className="flex h-full gap-4">
      <aside className="flex w-72 shrink-0 flex-col gap-3 overflow-y-auto rounded-md border border-neutral-200 bg-white p-3">
        <div>
          <span className="text-xs font-semibold text-neutral-700">Analyse croisée</span>
          <p className="mt-0.5 text-[10px] text-neutral-400">
            Agrégez jusqu’à {MAX_INDICATORS} indicateurs : chaque indicateur devient un canal de couleur (R, G, B) sur les hexagones H3.
          </p>
        </div>

        <div className="flex overflow-hidden rounded-md border border-neutral-300 bg-white">
          {families().map((f) => (
            <button
              key={f}
              onClick={() => setFamille(f)}
              className={`flex-1 px-2 py-1.5 text-[10px] font-semibold transition ${famille === f ? 'bg-blue-600 text-white' : 'text-neutral-500 hover:bg-neutral-100'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un indicateur…"
          aria-label="Rechercher un indicateur à croiser"
          className="rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-neutral-700 outline-none focus:border-blue-400 focus:bg-white"
        />

        <div className="min-h-0 flex-1 space-y-1 overflow-y-auto">
          {filtered.length === 0 && (
            <div className="rounded-md border border-dashed border-neutral-300 p-2 text-center text-[10px] text-neutral-400">
              Aucun indicateur.
            </div>
          )}
          {filtered.map((i) => {
            const idx = indicators.indexOf(i.id)
            const isSelected = idx >= 0
            const disabled = isFull && !isSelected
            return (
              <button
                key={i.id}
                onClick={() => (isSelected ? remove(i.id) : add(i.id))}
                disabled={disabled}
                className={`flex w-full items-center gap-2 rounded-md border px-2 py-1.5 text-left transition ${
                  isSelected
                    ? 'border-blue-300 bg-blue-50'
                    : disabled
                      ? 'cursor-not-allowed border-neutral-100 bg-neutral-50 opacity-50'
                      : 'border-neutral-200 bg-white hover:border-blue-300'
                }`}
              >
                <span
                  className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm text-[9px] font-bold text-white"
                  style={{ background: isSelected ? CHANNEL_COLORS[idx] : 'transparent', border: isSelected ? 'none' : '1px solid #d4d4d8' }}
                >
                  {isSelected ? CHANNEL_NAMES[idx] : ''}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <IndicatorSymbol id={i.id} size={13} />
                    <span className="truncate text-xs font-medium text-neutral-800">{i.label}</span>
                  </span>
                  <span className="block text-[10px] text-neutral-400">{i.theme} · {i.group}</span>
                </span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-between gap-2 rounded-md border border-neutral-200 bg-neutral-50 p-2">
          <span className="text-[10px] font-medium text-neutral-500">Normalisation</span>
          <div className="flex overflow-hidden rounded-md border border-neutral-300 bg-white">
            {(['minmax', 'zscore'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`px-2 py-1 text-[10px] font-medium transition ${method === m ? 'bg-blue-600 text-white' : 'text-neutral-500 hover:bg-neutral-100'}`}
              >
                {m === 'minmax' ? 'Min-max' : 'z-score'}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div className="relative min-w-0 flex-1 overflow-hidden rounded-md border border-neutral-200 bg-white">
        {cells.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center text-xs text-neutral-400">
            <span className="text-2xl">▦</span>
            Sélectionnez de 1 à 3 indicateurs pour afficher l’agrégation ternaire des hexagones H3.
          </div>
        ) : (
          <HexGrid cells={cells} className="h-full w-full" />
        )}
      </div>

      <aside className="flex w-64 shrink-0 flex-col gap-3 overflow-y-auto rounded-md border border-neutral-200 bg-white p-3">
        <span className="text-xs font-semibold text-neutral-700">Légende — mélange de couleurs</span>
        {indicators.length === 0 ? (
          <div className="rounded-md border border-dashed border-neutral-300 p-2 text-center text-[10px] text-neutral-400">
            Aucun indicateur sélectionné.
          </div>
        ) : (
          <>
            <TernaryLegend labels={selected.map((i) => i?.label ?? '')} />
            <div className="space-y-2">
              {scales.map((s) =>
                s ? (
                  <div key={s.label} className="rounded-md border border-neutral-200 bg-neutral-50 p-2">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
                      <span className="truncate text-[11px] font-medium text-neutral-700">{s.label}</span>
                      <span className="ml-auto rounded bg-white px-1 text-[9px] font-bold text-neutral-400">{s.channel}</span>
                    </div>
                    <div className="mt-1 flex justify-between text-[10px] tabular-nums text-neutral-400">
                      <span>{s.min.toLocaleString('fr-FR')}</span>
                      <span>min · max</span>
                      <span>{s.max.toLocaleString('fr-FR')}</span>
                    </div>
                  </div>
                ) : null,
              )}
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
