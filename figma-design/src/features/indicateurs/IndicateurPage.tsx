import { useState } from 'react'
import { IndicatorSymbol } from '@/components/ui/IndicatorSymbol'
import { LineChart, UnitBarChart, UnitValueTable, VigilanceGauge } from '@/components/charts'
import { UNITES_GESTIONES, BVAEPS, catalogueById } from '@/data/hydroscope'
import { valueForUnite, valueForBvaep, timeSeriesForUnite } from '@/data/values'
import { ChartModeSwitcher, type ChartViewMode } from './ChartModeSwitcher'
import type { PeriodRange, UnitMode } from '@/types/domain'
import { qualify, tendanceDe, debutTension, ecartA, seuilsRef, reserveCompletude } from '@/data/qualification'

export interface IndicateurPageProps {
  id: string
  unitMode: UnitMode
  selectedUnites: Set<string>
  selectedBvaeps: Set<string>
  onRemove: (id: string) => void
  onOpenFiche: (id: string) => void
  period: PeriodRange
}

interface RefUnit {
  label: string
  sub: string
  value: number
  niveau?: 0 | 1 | 2 | 3
}

function refKpis(units: RefUnit[], unit: string) {
  const vals = units.map((u) => u.value)
  const total = vals.reduce((a, b) => a + b, 0)
  const avg = vals.length ? Math.round(total / vals.length) : 0
  return [
    { k: 'Valeur sur la sélection', v: `${total.toLocaleString('fr-FR')} ${unit}` },
    { k: 'Moyenne par unité', v: `${avg.toLocaleString('fr-FR')} ${unit}` },
    { k: 'Unités concernées', v: `${vals.length}` },
    { k: 'Maximum', v: vals.length ? `${Math.max(...vals).toLocaleString('fr-FR')} ${unit}` : '—' },
  ]
}

const NIVEAU_LABELS = ['Indéterminé', 'Bon', 'Dégradé', 'Critique']
const NIVEAU_COLORS = ['#9ca3af', '#10b981', '#f59e0b', '#ef4444']

export function IndicateurPage({ id, unitMode, selectedUnites, selectedBvaeps, onRemove, onOpenFiche, period }: IndicateurPageProps) {
  const [gestionView, setGestionView] = useState<ChartViewMode>('repartition')
  const [bvView, setBvView] = useState<ChartViewMode>('repartition')
  const ind = catalogueById(id)!
  const isGestion = unitMode === 'gestion'

  const currentVal = isGestion ? valueForUnite(id, Array.from(selectedUnites)[0] ?? 'C-001') : valueForBvaep(id, Array.from(selectedBvaeps)[0] ?? 'BV-01')
  const qual = qualify(id, currentVal)
  const { niveau, label: niveauLabel, justification } = qual
  const tend = ind.hasTimeSeries ? tendanceDe(timeSeriesForUnite(id, Array.from(selectedUnites)[0] ?? 'C-001')) : 'indeterminee'
  const debutT = ind.hasTimeSeries ? debutTension(timeSeriesForUnite(id, Array.from(selectedUnites)[0] ?? 'C-001'), seuilsRef(id).seuilP75) : null
  const ecart = ecartA(id, currentVal)
  const reserve = reserveCompletude(id, selectedUnites.size + selectedBvaeps.size, UNITES_GESTIONES.length + BVAEPS.length)

  const gestionUnits: RefUnit[] = UNITES_GESTIONES.filter((c) => selectedUnites.has(c.id)).map((c) => ({
    label: c.name,
    sub: `${c.commune} · Bassin versant ${c.bvaep}`,
    value: valueForUnite(id, c.id),
    niveau: qualify(id, valueForUnite(id, c.id)).niveau,
  }))

  const bvUnits: RefUnit[] = BVAEPS.filter((b) => selectedBvaeps.has(b.id)).map((b) => ({
    label: b.name,
    sub: `${b.province} · ${b.captageRefs.length} unités`,
    value: valueForBvaep(id, b.id),
    niveau: qualify(id, valueForBvaep(id, b.id)).niveau,
  }))

  const gestionSeries = UNITES_GESTIONES.filter((c) => selectedUnites.has(c.id)).map((c) => timeSeriesForUnite(id, c.id))
  const bvSeries = BVAEPS.filter((b) => selectedBvaeps.has(b.id)).map((b) => b.captageRefs.map((cid) => valueForBvaep(id, b.id)))

  const temporalBlock = (mode: ChartViewMode, series: number[][], title: string) => {
    if (mode !== 'temporel' && mode !== 'changements') return null
    if (!ind.hasTimeSeries) {
      return (
        <div className="rounded-md border border-dashed border-neutral-300 bg-neutral-50 p-3 text-center text-[11px] text-neutral-400">
          Données non historisées — vue temporelle indisponible pour cet indicateur.
        </div>
      )
    }
    const refVal = series[0]?.[0] ?? 0
    const threshold = seuilsRef(id).seuilP90
    return (
      <div className="mt-2 flex flex-col gap-2">
        <span className="text-[10px] font-medium text-neutral-500">
          {mode === 'temporel' ? `Série temporelle ${title}` : `Variations ${title}`}
        </span>
        <LineChart
          className="min-h-24 w-full"
          series={series}
          threshold={threshold > 0 ? threshold : undefined}
          thresholdLabel="Seuil critique (P90)"
          showMarkers={mode === 'changements'}
        />
        <span className="flex justify-between text-[10px] text-neutral-400">
          <span>2016</span>
          <span>2021</span>
          <span>2026</span>
        </span>
      </div>
    )
  }

  const referentielBlock = ({
    title,
    units,
    series,
    view,
    setView,
    accent,
  }: {
    title: string
    units: RefUnit[]
    series: number[][]
    view: ChartViewMode
    setView: (m: ChartViewMode) => void
    accent: string
  }) => (
    <div className="rounded-md border border-neutral-200 bg-white p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className={`rounded px-2 py-0.5 text-[11px] font-semibold ${accent}`}>{title}</span>
        <ChartModeSwitcher mode={view} onChange={setView} hasTimeSeries={ind.hasTimeSeries} />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {refKpis(units, ind.unit).map((s) => (
          <div key={s.k} className="rounded-md border border-neutral-200 bg-neutral-50 p-3">
            <span className="block text-[11px] uppercase tracking-wide text-neutral-400">{s.k}</span>
            <span className="mt-1 block text-xl font-semibold text-neutral-800">{s.v}</span>
          </div>
        ))}
      </div>
      {units.length === 0 ? (
        <div className="mt-3 rounded-md border border-dashed border-neutral-300 bg-neutral-50 p-3 text-center text-[11px] text-neutral-400">
          Aucune unité sélectionnée pour ce référentiel.
        </div>
      ) : view === 'tableau' ? (
        <UnitValueTable
          data={units.map((u) => ({ label: u.label, sub: u.sub, value: u.value, niveau: u.niveau }))}
          unit={ind.unit}
          className="mt-3 w-full"
          levels
        />
      ) : view === 'repartition' ? (
        <UnitBarChart data={units.map((u) => ({ label: u.label, value: u.value }))} unit={ind.unit} className="mt-3 min-h-28 w-full" />
      ) : (
        <div className="mt-3">{temporalBlock(view, series, 'de ce référentiel')}</div>
      )}
    </div>
  )

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto">
      <div className="flex items-center gap-2 rounded-md border border-neutral-200 bg-white p-3">
        <IndicatorSymbol id={id} size={16} />
        <span className="text-sm font-semibold text-neutral-800">{ind.label}</span>
        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] text-neutral-500">{ind.family} / {ind.theme}</span>
        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] text-neutral-500">{ind.group}</span>
        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] text-neutral-500">unité {ind.unit}</span>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-700">Période {period}</span>
        <button onClick={() => onRemove(id)} className="ml-auto rounded border border-red-200 bg-red-50 px-3 py-1 text-xs text-red-600 hover:bg-red-100">
          Retirer
        </button>
      </div>

      {/* Bloc Interprétation */}
      <div className="rounded-md border border-neutral-200 bg-white p-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Interprétation</span>
          <span className="shrink-0 rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] text-neutral-500">Niveau {niveau + 1}</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <VigilanceGauge value={currentVal} niveau={niveau} label="Niveau de qualité" threshold={seuilsRef(id).seuilP90} thresholdLabel="P90" />
          <div className="flex-1 min-w-0 space-y-2 text-xs text-neutral-600">
            <p className="text-neutral-700 font-medium">{niveauLabel}</p>
            <p>{justification}</p>
            {debutT !== null && <p>⚡ Début de tension détecté : <span className="font-medium">{debutT}</span></p>}
            {tend !== 'indeterminee' && <p>📈 Tendance : <span className="font-medium">{tend === 'hausse' ? 'Hausse' : tend === 'baisse' ? 'Baisse' : 'Stable'}</span></p>}
            <p>📊 Écart au seuil critique (P90) : <span className="font-medium">{ecart > 0 ? '+' : ''}{ecart}%</span></p>
            {reserve.indetermine && <p className="text-amber-700">⚠️ {reserve.raison}</p>}
            <p className="mt-2 text-[10px] text-neutral-400">
              <a href="#" className="underline hover:text-blue-600">📖 Voir la méthode de qualification</a>
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-md border border-neutral-200 bg-white p-3">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Description & objectif</span>
        <p className="mt-1 text-xs leading-relaxed text-neutral-600">{ind.desc}</p>
        <p className="mt-2 text-xs leading-relaxed text-neutral-600">
          <span className="font-semibold text-neutral-700">Objectif :</span> {ind.objectif}
        </p>
      </div>

      <button onClick={() => onOpenFiche(id)} className="w-fit rounded border border-neutral-300 bg-white px-3 py-1 text-xs text-neutral-600 hover:bg-neutral-50">
        Ouvrir la fiche & métadonnées
      </button>

      {referentielBlock({
        title: 'Référentiel unités de gestion',
        units: gestionUnits,
        series: gestionSeries,
        view: gestionView,
        setView: setGestionView,
        accent: 'bg-blue-50 text-blue-700',
      })}

      {referentielBlock({
        title: 'Référentiel bassins versants',
        units: bvUnits,
        series: bvSeries,
        view: bvView,
        setView: setBvView,
        accent: 'bg-emerald-50 text-emerald-700',
      })}

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col rounded-md border border-dashed border-neutral-300 bg-neutral-100 p-3">
          <span className="mb-1 text-[11px] font-semibold text-neutral-600">Cartostat — choroplèthe {isGestion ? 'unités de gestion' : 'bassins versants'}</span>
          <div className="grid min-h-24 flex-1 grid-cols-6 content-center gap-0.5 rounded-md border border-dashed border-neutral-300 bg-white/60">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-sm" style={{ background: ['#10b981', '#f59e0b', '#ef4444', '#93c5fd'][i % 4] }} />
            ))}
          </div>
          <span className="mt-1 text-[10px] text-neutral-400">Grille H3 (maquette simplifiée)</span>
        </div>
        <div className="flex flex-col rounded-md border border-neutral-200 bg-white p-3">
          <span className="mb-1 text-[11px] font-semibold text-neutral-600">Couche source</span>
          <div className="flex min-h-24 flex-1 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 text-center text-xs font-medium text-neutral-500">
            {ind.sourceLabel} — affichée sur la carte centrale
          </div>
        </div>
      </div>
    </div>
  )
}