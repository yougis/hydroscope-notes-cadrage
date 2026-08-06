import { useMemo } from 'react'
import { UNITES_GESTIONES, catalogueById } from '@/data/hydroscope'
import { valueForUnite } from '@/data/values'
import { QUALITE_COLORS, h3Class, h3Value, symbolFor } from '../map/theme'
import { getHexSpecs } from '../map/h3'
import { legendeFor } from '@/data/indicatorLegende'

export interface StatLegendProps {
  activeIndicator: string | null
  choropleth: boolean
}

interface Band {
  cls: number
  min: number
  max: number
}

/** Bornes [min, max] de valeurs brutes par classe, sur les cellules H3 de l'indicateur. */
function classBands(indId: string): Band[] {
  const byCls = new Map<number, number[]>()
  for (const s of getHexSpecs()) {
    const [lon, lat] = s.center
    const cls = h3Class(indId, lon, lat)
    const v = h3Value(indId, lon, lat)
    const arr = byCls.get(cls) ?? []
    arr.push(v)
    byCls.set(cls, arr)
  }
  return [0, 1, 2, 3].map((cls) => {
    const arr = byCls.get(cls) ?? []
    if (!arr.length) return { cls, min: NaN, max: NaN }
    return { cls, min: Math.min(...arr), max: Math.max(...arr) }
  })
}

/** Échantillons de valeur brute (bas / médian / haut) pour l'échelle proportionnelle. */
function proportionSamples(indId: string, datatype: string): number[] {
  const vals = UNITES_GESTIONES.map((u) => valueForUnite(indId, u.id)).sort((a, b) => a - b)
  if (!vals.length) return []
  const med = vals[Math.floor(vals.length / 2)]
  return [vals[0], med, vals[vals.length - 1]]
}

const fmt = (v: number, unit: string) => `${Math.round(v)} ${unit}`.trim()

/** Légende statistique cartographique : échelle de grandeur (choroplèthe) et proportion. */
export function StatLegend({ activeIndicator, choropleth }: StatLegendProps) {
  const ind = activeIndicator ? catalogueById(activeIndicator) : undefined

  const bands = useMemo(() => (activeIndicator ? classBands(activeIndicator) : []), [activeIndicator])
  const samples = useMemo(
    () => (ind ? proportionSamples(ind.id, ind.datatype) : []),
    [ind]
  )

  if (!ind) return null
  const proportional = ind.datatype === 'stock' || ind.datatype === 'mixte'
  if (!choropleth && !proportional) return null

  return (
    <div className="absolute bottom-3 left-3 z-20 max-w-[200px] rounded-md border border-neutral-200 bg-white/95 p-2.5 text-[11px] text-neutral-600 shadow-sm">
      <div className="mb-1.5">
        <div className="font-medium leading-snug text-neutral-800">{legendeFor(ind.id) ?? ind.desc}</div>
        <div className="text-[10px] text-neutral-400">{ind.label} · {ind.unit}</div>
      </div>

      {choropleth && (
        <div className="space-y-1">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">Échelle de grandeur</div>
          {bands.map((b) => (
            <div key={b.cls} className="flex items-center gap-1.5">
              <span className="h-3 w-3 shrink-0 rounded-sm" style={{ background: QUALITE_COLORS[b.cls] }} />
              <span className="truncate">
                {Number.isNaN(b.min) ? '—' : `${Math.round(b.min)} – ${Math.round(b.max)} ${ind.unit}`}
              </span>
            </div>
          ))}
        </div>
      )}

      {proportional && samples.length >= 2 && (
        <div className="mt-2 space-y-1">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">Information de proportion</div>
          <div className="flex items-end gap-3 pt-1">
            {samples.map((v, i) => {
              const { r } = symbolFor(v, ind.datatype as 'stock' | 'mixte')
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="rounded-full bg-blue-500" style={{ width: r * 2, height: r * 2 }} />
                  <span>{fmt(v, ind.unit)}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
