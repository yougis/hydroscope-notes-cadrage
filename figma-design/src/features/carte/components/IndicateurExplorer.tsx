import { useMemo, useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { IndicatorSymbol } from '@/components/ui/IndicatorSymbol'
import { UnitBarChart, UnitValueTable } from '@/components/charts'
import { UNITES_GESTIONES, CATALOGUE, BVAEPS, catalogueById, groupsOfFamily, groupsOfThemes, themesOfFamily } from '@/data/hydroscope'
import { valueForUnite, valueForBvaep } from '@/data/values'
import { ChartModeSwitcher, type ChartViewMode } from '@/features/indicateurs/ChartModeSwitcher'
import { PanelSection } from './PanelSection'
import type { IndicatorDef, IndicatorFamily, UnitMode } from '@/types/domain'

export interface IndicateurExplorerProps {
  unitMode: UnitMode
  selectedUnites: Set<string>
  selectedBvaeps: Set<string>
  activeIndicator: string | null
  onSelectIndicator: (id: string) => void
  onOpenCatalogue: () => void
  onOpenFiche: (id: string) => void
  mode: ChartViewMode
  onMode: (m: ChartViewMode) => void
  showCarte: boolean
  onToggleCarte: () => void
}

function matchIndicator(i: IndicatorDef, q: string) {
  const t = `${i.code} ${i.label} ${i.theme} ${i.group} ${i.family}`.toLowerCase()
  return t.includes(q)
}

export function IndicateurExplorer({
  unitMode,
  selectedUnites,
  selectedBvaeps,
  activeIndicator,
  onSelectIndicator,
  onOpenCatalogue,
  onOpenFiche,
  mode,
  onMode,
  showCarte,
  onToggleCarte,
}: IndicateurExplorerProps) {
  const [query, setQuery] = useState('')
  const [famille, setFamille] = useState<IndicatorFamily>('ENJEUX')
  const [themes, setThemes] = useState<Set<string>>(new Set())
  const [groupe, setGroupe] = useState<string | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(true)
  const ind = activeIndicator ? catalogueById(activeIndicator) : undefined
  const q = query.trim().toLowerCase()

  const famThemes = useMemo(() => themesOfFamily(famille), [famille])
  const famGroups = useMemo(
    () => (themes.size ? groupsOfThemes(famille, themes) : groupsOfFamily(famille)),
    [famille, themes],
  )

  const filtered = useMemo(() => {
    let list = CATALOGUE.filter((i) => i.family === famille)
    if (themes.size) list = list.filter((i) => themes.has(i.theme))
    if (groupe) list = list.filter((i) => i.group === groupe)
    if (q) list = list.filter((i) => matchIndicator(i, q))
    return list
  }, [famille, themes, groupe, q])

  const switchFamille = (f: IndicatorFamily) => {
    setFamille(f)
    setThemes(new Set())
    setGroupe(null)
  }

  const toggleTheme = (t: string) =>
    setThemes((prev) => {
      const s = new Set(prev)
      if (s.has(t)) s.delete(t)
      else s.add(t)
      if (!s.size) setGroupe(null)
      return s
    })

  const chartData = (() => {
    if (!ind) return []
    if (unitMode === 'bvaep') {
      const units = BVAEPS.filter((b) => selectedBvaeps.has(b.id))
      return units.map((b) => ({ label: `BV-${b.id.slice(-2)}`, value: valueForBvaep(ind.id, b.id) }))
    }
    const units = UNITES_GESTIONES.filter((c) => selectedUnites.has(c.id))
    return units.map((c) => ({ label: c.name.slice(0, 8), value: valueForUnite(ind.id, c.id) }))
  })()

  const noUnits = chartData.length === 0

  const kpis =
    chartData.length > 0
      ? (() => {
          const vals = chartData.map((d) => d.value)
          const total = vals.reduce((a, b) => a + b, 0)
          const avg = total / vals.length
          return [
            { label: 'Unités', value: `${vals.length}`, unit: '' },
            { label: 'Total', value: total.toLocaleString('fr-FR'), unit: ind?.unit ?? '' },
            { label: 'Moyenne', value: avg.toLocaleString('fr-FR', { maximumFractionDigits: 0 }), unit: ind?.unit ?? '' },
            { label: 'Max', value: Math.max(...vals).toLocaleString('fr-FR'), unit: ind?.unit ?? '' },
          ]
        })()
      : []

  const h3Active = showCarte

  return (
    <aside className="flex w-80 shrink-0 flex-col gap-3 overflow-y-auto rounded-md border border-neutral-200 bg-white p-3">
      <div>
        <span className="text-xs font-semibold text-neutral-700">Indicateurs</span>
        <p className="mt-0.5 text-[10px] text-neutral-400">
          Filtrer par famille, thème ou groupe puis choisir un indicateur.
        </p>
      </div>

      <PanelSection
        title="Recherche & catalogue"
        badge={dropdownOpen ? `${filtered.length}` : `${CATALOGUE.length}`}
        defaultOpen={true}
      >
        {/* Recherche combinée : barre + dropdown du catalogue */}
        <div className="relative">
          <div className="flex items-center gap-2 rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-neutral-400 focus-within:border-blue-400 focus-within:bg-white">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 stroke-neutral-400" fill="none" strokeWidth="1.5">
              <circle cx="7" cy="7" r="4.5" />
              <line x1="10.5" y1="10.5" x2="14" y2="14" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher / filtrer un indicateur…"
              aria-label="Rechercher ou filtrer un indicateur"
              className="w-full bg-transparent text-xs text-neutral-700 outline-none placeholder:text-neutral-400"
            />
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              aria-expanded={dropdownOpen}
              aria-label={dropdownOpen ? 'Fermer le catalogue' : 'Ouvrir le catalogue'}
              className="shrink-0 rounded p-0.5 text-neutral-400 transition hover:text-blue-600"
            >
              <svg
                viewBox="0 0 16 16"
                className={`h-3.5 w-3.5 stroke-current transition-transform ${dropdownOpen ? '' : '-rotate-90'}`}
                fill="none"
                strokeWidth="1.5"
              >
                <path d="M4 6l4 4 4-4" />
              </svg>
            </button>
          </div>

          {dropdownOpen && (
            <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-[24rem] overflow-y-auto rounded-md border border-neutral-200 bg-white shadow-lg">
              <div className="space-y-2 border-b border-neutral-200 bg-neutral-50 p-2">
                <div className="flex overflow-hidden rounded-md border border-neutral-300 bg-white">
                  {(['ENJEUX', 'MENACES'] as IndicatorFamily[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => switchFamille(f)}
                      className={`flex-1 px-2 py-1.5 text-[10px] font-semibold transition ${
                        famille === f ? 'bg-blue-600 text-white' : 'text-neutral-500 hover:bg-neutral-100'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1">
                  {famThemes.map((t) => {
                    const on = themes.has(t)
                    return (
                      <button
                        key={t}
                        onClick={() => toggleTheme(t)}
                        className={`rounded-full border px-2 py-0.5 text-[9px] font-medium transition ${
                          on ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-neutral-300 bg-white text-neutral-500 hover:border-blue-300'
                        }`}
                      >
                        {t}
                      </button>
                    )
                  })}
                </div>

                <select
                  value={groupe ?? ''}
                  onChange={(e) => setGroupe(e.target.value || null)}
                  aria-label="Groupe d'indicateurs"
                  className="w-full rounded-md border border-neutral-300 bg-white px-2 py-1.5 text-[11px] text-neutral-700 outline-none focus:border-blue-400"
                >
                  <option value="">Tous les groupes ({famGroups.length})</option>
                  {famGroups.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1 p-1.5">
                {filtered.map((i) => {
                  const active = i.id === activeIndicator
                  return (
                    <button
                      key={i.id}
                      onClick={() => {
                        onSelectIndicator(i.id)
                        setDropdownOpen(false)
                      }}
                      className={`w-full rounded-md border p-2 text-left transition ${
                        active ? 'border-blue-500 bg-blue-50' : 'border-neutral-200 bg-white hover:border-blue-300 hover:bg-blue-50/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <IndicatorSymbol id={i.id} size={13} />
                            <div className="truncate text-xs font-medium text-neutral-800">{i.label}</div>
                          </div>
                          <div className="text-[10px] text-neutral-400">{i.theme} · {i.group}</div>
                        </div>
                        {active && (
                          <span className="mt-0.5 shrink-0 rounded-full bg-blue-600 px-1.5 py-0.5 text-[9px] font-medium text-white">actif</span>
                        )}
                      </div>
                    </button>
                  )
                })}
                {filtered.length === 0 && (
                  <div className="rounded-md border border-dashed border-neutral-300 p-2 text-center text-[10px] text-neutral-400">
                    Aucun indicateur pour ces filtres.
                  </div>
                )}
              </div>

              <div className="border-t border-neutral-200 p-1.5">
                <button
                  onClick={onOpenCatalogue}
                  className="w-full text-left text-[11px] font-medium text-blue-600 underline-offset-2 hover:underline"
                >
                  Voir toute la liste des indicateurs →
                </button>
              </div>
            </div>
          )}
        </div>
      </PanelSection>

      <PanelSection title="Indicateur & graphique" defaultOpen={ind != null}>
        {ind ? (
          <div className="rounded-md border border-neutral-200 bg-white p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-600">
                <IndicatorSymbol id={ind.id} size={14} />
                {ind.label}
              </span>
              <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[9px] font-medium text-neutral-500">{ind.unit}</span>
            </div>
            <div className="mb-2">
              <ChartModeSwitcher mode={mode} onChange={onMode} hasTimeSeries={ind.hasTimeSeries} showCarte={showCarte} onToggleCarte={onToggleCarte} />
            </div>

            <div className="mb-2 grid grid-cols-2 gap-1.5">
              {kpis.map((k) => (
                <div key={k.label} className="rounded-md border border-neutral-200 bg-neutral-50 p-2">
                  <span className="block text-[9px] uppercase tracking-wide text-neutral-400">{k.label}</span>
                  <span className="block text-sm font-semibold text-neutral-800">
                    {k.value} {k.unit}
                  </span>
                </div>
              ))}
            </div>
            {h3Active && (
              <p className="mb-2 rounded-md border border-blue-200 bg-blue-50 p-2 text-[10px] text-blue-700">
                Grille H3 affichée sur la carte — survolez chaque hexagone pour voir la valeur brute.
              </p>
            )}

            {noUnits ? (
              <p className="rounded-md border border-dashed border-neutral-300 bg-neutral-50 p-2 text-[10px] text-neutral-400">
                Aucune unité sélectionnée — sélectionnez des {unitMode === 'bvaep' ? 'bassins versants' : 'unités de gestion'} dans le volet gauche.
              </p>
            ) : h3Active ? (
              <p className="rounded-md border border-dashed border-neutral-300 bg-neutral-50 p-2 text-[10px] text-neutral-400">
                Valeurs par hexagone H3 disponibles au survol de la carte.
              </p>
            ) : mode === 'tableau' ? (
              <UnitValueTable data={chartData} unit={ind.unit} className="min-h-24 w-full" />
            ) : mode === 'repartition' ? (
              <UnitBarChart data={chartData} unit={ind.unit} className="min-h-24 w-full" />
            ) : (
              <div className="rounded-md border border-dashed border-neutral-300 bg-neutral-50 p-2 text-center text-[10px] text-neutral-400">
                Vue {mode} — détaillée dans la page indicateur (sidebar).
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 rounded-md border border-dashed border-neutral-300 bg-neutral-50 p-2 text-[11px] text-neutral-400">
            <Icon>
              <path d="M9 12h6" />
              <path d="M12 9v6" />
            </Icon>
            Sélectionnez un indicateur pour afficher ses valeurs.
          </div>
        )}
      </PanelSection>
    </aside>
  )
}