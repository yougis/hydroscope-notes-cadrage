import { useMemo } from 'react'
import { UNITES_GESTIONES, catalogueById } from '@/data/hydroscope'
import { valueForUnite } from '@/data/values'
import { QUALITE_COLORS, h3Class, h3Value, symbolFor } from '../map/theme'
import { getHexSpecs } from '../map/h3'
import { legendeFor } from '@/data/indicatorLegende'
import { seuilsRef, niveauLabel } from '@/data/qualification'

export interface StatLegendProps {
  activeIndicator: string | null
  choropleth: boolean
}

interface Band {
  cls: number
  label: string
  min: number
  max: number
}

function classBands(indId: string): Band[] {
  const { seuilP75, seuilP90 } = seuilsRef(indId)
  return [
    { cls: 0, label: 'Indéterminé', min: 0, max: 0 },
    { cls: 1, label: 'Bon', min: 0, max: seuilP75 },
    { cls: 2, label: 'Dégradé', min: seuilP75, max: seuilP90 },
    { cls: 3, label: 'Critique', min: seuilP90, max: Infinity },
  ].map((b) => ({ ...b, min: Math.round(b.min), max: b.max === Infinity ? Infinity : Math.round(b.max) }))
}

function proportionSamples(indId: string, datatype: string): number[] {
  const vals = UNITES_GESTIONES.map((u) => valueForUnite(indId, u.id)).sort((a, b) => a - b)
  if (!vals.length) return []
  const med = vals[Math.floor(vals.length / 2)]
  return [vals[0], med, vals[vals.length - 1]]
}

const fmt = (v: number, unit: string) => `${Math.round(v)} ${unit}`.trim()

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
                {b.cls === 0
                  ? '—'
                  : b.max === Infinity
                    ? `≥ ${b.min} ${ind.unit} (${b.label})`
                    : `${b.min} – ${b.max} ${ind.unit} (${b.label})`}
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