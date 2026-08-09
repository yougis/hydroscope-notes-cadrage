import { useState, useMemo } from 'react'
import { BVAEPS, UNITES_GESTIONES, catalogueById } from '@/data/hydroscope'
import { valueForBvaep, valueForUnite, timeSeriesForUnite } from '@/data/values'
import { RadarChart, LineChart, UnitValueTable } from '@/components/charts'
import { RadarChart as RadarChartType } from '@/components/charts/RadarChart'
import { scoreCriticite, eligibleIndicators, amcEligible } from '@/data/qualification'
import { QUALITE_COLORS, QUALITE_LABELS } from '@/features/carte/map/theme'
import type { UnitMode } from '@/types/domain'

export interface ComparaisonViewProps {
  avance: boolean
  unitMode: UnitMode
  selectedUnites: Set<string>
  selectedBvaeps: Set<string>
  activeIndicator: string | null
  period: string
}

type TabId = 'cote' | 'radar' | 'amc'

function TabButton({ id, label, active, onClick, disabled = false }: { id: TabId; label: string; active: boolean; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-1.5 rounded border px-3 py-1.5 text-sm font-medium transition ${
        active
          ? 'border-blue-400 bg-blue-50 text-blue-700'
          : disabled
            ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
            : 'border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-50'
      }`}
    >
      {label}
    </button>
  )
}

function TerritorySelector({
  unitMode,
  selectedUnites,
  selectedBvaeps,
  onToggleUnite,
  onToggleBvaep,
  BVAEPS,
  UNITES_GESTIONES,
}: {
  unitMode: UnitMode
  selectedUnites: Set<string>
  selectedBvaeps: Set<string>
  onToggleUnite: (id: string) => void
  onToggleBvaep: (id: string) => void
  BVAEPS: typeof BVAEPS
  UNITES_GESTIONES: typeof UNITES_GESTIONES
}) {
  const isGestion = unitMode === 'gestion'
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {isGestion ? (
        UNITES_GESTIONES.map((u) => (
          <label key={u.id} className="flex items-center gap-1.5 rounded border px-2.5 py-1 text-xs cursor-pointer">
            <input
              type="checkbox"
              checked={selectedUnites.has(u.id)}
              onChange={() => onToggleUnite(u.id)}
              className="w-4 h-4 text-blue-600 rounded border-neutral-300"
            />
            <span className={selectedUnites.has(u.id) ? 'font-medium text-blue-700' : 'text-neutral-600'}>
              {u.name}
            </span>
          </label>
        ))
      ) : (
        BVAEPS.map((b) => (
          <label key={b.id} className="flex items-center gap-1.5 rounded border px-2.5 py-1 text-xs cursor-pointer">
            <input
              type="checkbox"
              checked={selectedBvaeps.has(b.id)}
              onChange={() => onToggleBvaep(b.id)}
              className="w-4 h-4 text-blue-600 rounded border-neutral-300"
            />
            <span className={selectedBvaeps.has(b.id) ? 'font-medium text-blue-700' : 'text-neutral-600'}>
              {b.name}
            </span>
          </label>
        ))
      )}
    </div>
  )
}

function CoteACoteTab({
  unitMode,
  selectedUnites,
  selectedBvaeps,
  activeIndicator,
  BVAEPS,
  UNITES_GESTIONES,
}: {
  unitMode: UnitMode
  selectedUnites: Set<string>
  selectedBvaeps: Set<string>
  activeIndicator: string | null
  BVAEPS: typeof BVAEPS
  UNITES_GESTIONES: typeof UNITES_GESTIONES
}) {
  if (!activeIndicator) return <div className="text-center text-neutral-400 py-8">Sélectionnez un indicateur pour comparer.</div>

  const ind = catalogueById(activeIndicator)!
  const isGestion = unitMode === 'gestion'
  const entities = isGestion
    ? UNITES_GESTIONES.filter((u) => selectedUnites.has(u.id))
    : BVAEPS.filter((b) => selectedBvaeps.has(b.id))

  if (entities.length === 0) return <div className="text-center text-neutral-400 py-8">Sélectionnez au moins un territoire.</div>

  return (
    <div className="grid flex-1 grid-cols-2 gap-4">
      {entities.map((e) => (
        <div key={e.id} className="flex flex-col gap-4">
          <div className="rounded-md border border-neutral-200 bg-white p-3 min-h-48 flex items-center justify-center">
            <span className="text-neutral-400 text-sm">Carte {e.name} (maquette)</span>
          </div>
          {ind.hasTimeSeries && (
            <div className="rounded-md border border-neutral-200 bg-white p-3">
              <span className="text-sm font-medium text-neutral-700">{e.name} — Série temporelle</span>
              <LineChart
                className="mt-2 min-h-24 w-full"
                series={[isGestion ? timeSeriesForUnite(activeIndicator, e.id) : [valueForBvaep(activeIndicator, e.id)]]}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function RadarTab({
  unitMode,
  selectedUnites,
  selectedBvaeps,
  activeIndicator,
  BVAEPS,
  UNITES_GESTIONES,
}: {
  unitMode: UnitMode
  selectedUnites: Set<string>
  selectedBvaeps: Set<string>
  activeIndicator: string | null
  BVAEPS: typeof BVAEPS
  UNITES_GESTIONES: typeof UNITES_GESTIONES
}) {
  if (!activeIndicator) return <div className="text-center text-neutral-400 py-8">Sélectionnez un indicateur.</div>

  const isGestion = unitMode === 'gestion'
  const entities = isGestion
    ? UNITES_GESTIONES.filter((u) => selectedUnites.has(u.id))
    : BVAEPS.filter((b) => selectedBvaeps.has(b.id))

  if (entities.length === 0) return <div className="text-center text-neutral-400 py-8">Sélectionnez au moins un territoire.</div>

  const axes = [
    { name: 'Prod.', enjeux: 80, menaces: 60 },
    { name: 'Pop.', enjeux: 70, menaces: 50 },
    { name: 'Infra.', enjeux: 60, menaces: 40 },
    { name: 'Envir.', enjeux: 90, menaces: 30 },
    { name: 'Risc.', enjeux: 50, menaces: 80 },
  ]

  return (
    <div className="flex flex-col items-center gap-4">
      <RadarChart className="w-96 h-96" axes={axes} />
      <div className="w-full max-w-md grid grid-cols-2 gap-2 text-xs text-neutral-600">
        <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500" /> Enjeux</div>
        <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500" /> Menaces</div>
      </div>
    </div>
  )
}

function AMCTab({
  unitMode,
  selectedUnites,
  selectedBvaeps,
  activeIndicator,
  BVAEPS,
  UNITES_GESTIONES,
}: {
  unitMode: UnitMode
  selectedUnites: Set<string>
  selectedBvaeps: Set<string>
  activeIndicator: string | null
  BVAEPS: typeof BVAEPS
  UNITES_GESTIONES: typeof UNITES_GESTIONES
}) {
  if (!activeIndicator) return <div className="text-center text-neutral-400 py-8">Sélectionnez un indicateur.</div>

  const isGestion = unitMode === 'gestion'
  const entities = isGestion
    ? UNITES_GESTIONES.filter((u) => selectedUnites.has(u.id))
    : BVAEPS.filter((b) => selectedBvaeps.has(b.id))

  const indValues: Record<string, number> = {}
  for (const e of entities) {
    const val = isGestion ? valueForUnite(activeIndicator, e.id) : valueForBvaep(activeIndicator, e.id)
    indValues[activeIndicator] = (indValues[activeIndicator] ?? 0) + val
  }
  if (entities.length > 0) indValues[activeIndicator] = Math.round(indValues[activeIndicator] / entities.length)

  const { score, label, contributions } = scoreCriticite(indValues)

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border border-neutral-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-neutral-400">Score de criticité</span>
            <div className="mt-1 flex items-center gap-3 text-2xl font-bold text-neutral-800">
              <span>{score.toFixed(2)}</span>
              <span className="text-lg font-normal text-neutral-500">({label})</span>
            </div>
          </div>
          <a href="#" className="text-sm text-blue-600 hover:underline">Voir la méthode</a>
        </div>
      </div>

      <div className="rounded-md border border-neutral-200 bg-white overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-neutral-50 text-[10px] uppercase tracking-wide text-neutral-400">
              <th className="border-b border-neutral-200 px-3 py-2 text-left font-medium">Famille</th>
              <th className="border-b border-neutral-200 px-3 py-2 text-left font-medium">Thème</th>
              <th className="border-b border-neutral-200 px-3 py-2 text-left font-medium">Indicateur</th>
              <th className="border-b border-neutral-200 px-3 py-2 text-right font-medium">Valeur</th>
              <th className="border-b border-neutral-200 px-3 py-2 text-right font-medium">Poids</th>
              <th className="border-b border-neutral-200 px-3 py-2 text-right font-medium">Contribution</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((c) => (
              <tr key={c.indicateur} className="border-b border-neutral-100 last:border-0">
                <td className="px-3 py-2 text-xs text-neutral-500">{catalogueById(c.indicateur)?.family}</td>
                <td className="px-3 py-2 text-xs text-neutral-500">{catalogueById(c.indicateur)?.theme}</td>
                <td className="px-3 py-2 text-xs font-medium text-neutral-800">{c.label}</td>
                <td className="px-3 py-2 text-xs text-right text-neutral-700">{c.valeur.toLocaleString('fr-FR')}</td>
                <td className="px-3 py-2 text-xs text-right text-neutral-700">{c.poids}</td>
                <td className="px-3 py-2 text-xs text-right font-semibold text-neutral-800">{c.contribution.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function ComparaisonView({
  avance,
  unitMode,
  selectedUnites,
  selectedBvaeps,
  activeIndicator,
  period,
}: ComparaisonViewProps) {
  const [activeTab, setActiveTab] = useState<TabId>('cote')

  const tabs: { id: TabId; label: string; disabled?: boolean }[] = [
    { id: 'cote', label: 'Côte à côte' },
    { id: 'radar', label: 'Radar' },
    { id: 'amc', label: 'Score AMC', disabled: !avance },
  ]

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">Comparer les territoires</span>
          <span className="rounded-full bg-neutral-100 px-2 py-1 text-[10px] text-neutral-500">{period}</span>
        </div>
        <div className="flex gap-2">{tabs.map((t) => (
          <TabButton key={t.id} id={t.id} label={t.label} active={activeTab === t.id} onClick={() => setActiveTab(t.id)} disabled={t.disabled} />
        ))}</div>
      </div>

      <TerritorySelector
        unitMode={unitMode}
        selectedUnites={selectedUnites}
        selectedBvaeps={selectedBvaeps}
        onToggleUnite={() => {}}
        onToggleBvaep={() => {}}
        BVAEPS={BVAEPS}
        UNITES_GESTIONES={UNITES_GESTIONES}
      />

      {activeTab === 'cote' && (
        <CoteACoteTab unitMode={unitMode} selectedUnites={selectedUnites} selectedBvaeps={selectedBvaeps} activeIndicator={activeIndicator} BVAEPS={BVAEPS} UNITES_GESTIONES={UNITES_GESTIONES} />
      )}
      {activeTab === 'radar' && (
        <RadarTab unitMode={unitMode} selectedUnites={selectedUnites} selectedBvaeps={selectedBvaeps} activeIndicator={activeIndicator} BVAEPS={BVAEPS} UNITES_GESTIONES={UNITES_GESTIONES} />
      )}
      {activeTab === 'amc' && avance && (
        <AMCTab unitMode={unitMode} selectedUnites={selectedUnites} selectedBvaeps={selectedBvaeps} activeIndicator={activeIndicator} BVAEPS={BVAEPS} UNITES_GESTIONES={UNITES_GESTIONES} />
      )}
      {activeTab === 'amc' && !avance && (
        <div className="rounded-md border border-dashed border-neutral-300 bg-neutral-50 p-4 text-center text-sm text-neutral-400">
          Le bloc Score AMC est réservé aux utilisateurs avancés (bascule « Avancé » dans l'en-tête).
        </div>
      )}
    </div>
  )
}