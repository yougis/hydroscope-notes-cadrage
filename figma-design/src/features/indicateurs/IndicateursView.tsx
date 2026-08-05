import { useState } from 'react'
import { CATALOGUE, catalogueById } from '@/data/hydroscope'
import { PanelSection } from '@/features/carte/components/PanelSection'
import { Icon } from '@/components/ui/Icon'
import { IndicatorSymbol } from '@/components/ui/IndicatorSymbol'
import type { IndicatorDef } from '@/types/domain'

export interface IndicateursViewProps {
  focusId?: string | null
  onOpenFiche: (id: string) => void
}

function matchIndicator(i: IndicatorDef, q: string) {
  const t = `${i.code} ${i.label} ${i.theme} ${i.group} ${i.family}`.toLowerCase()
  return t.includes(q)
}

function groupBy<T>(items: T[], key: (t: T) => string): Array<[string, T[]]> {
  const map = new Map<string, T[]>()
  for (const it of items) {
    const k = key(it)
    const arr = map.get(k) ?? []
    arr.push(it)
    map.set(k, arr)
  }
  return [...map.entries()]
}

export function IndicateursView({ focusId, onOpenFiche }: IndicateursViewProps) {
  const [query, setQuery] = useState('')
  const [ficheId, setFicheId] = useState<string | null>(focusId ?? null)
  const q = query.trim().toLowerCase()
  const items = q ? CATALOGUE.filter((i) => matchIndicator(i, q)) : CATALOGUE
  const fiche = ficheId ? catalogueById(ficheId) : undefined

  const families = groupBy(items, (i) => i.family)
    .map(([family, famInds]) => [
      family,
      groupBy(famInds, (i) => i.theme).map(([theme, themeInds]) => [theme, groupBy(themeInds, (i) => i.group)] as const),
    ] as const)

  return (
    <div className="flex h-full gap-4">
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-400 focus-within:border-blue-400">
            <Icon>
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </Icon>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher par nom, thème ou groupe…"
              aria-label="Rechercher un indicateur"
              className="w-full bg-transparent text-neutral-700 outline-none placeholder:text-neutral-400"
            />
          </div>
          <span className="rounded border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-600">
            {items.length} / {CATALOGUE.length} indicateurs
          </span>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto space-y-3 pr-1">
          {families.length === 0 && (
            <div className="rounded-md border border-dashed border-neutral-300 bg-neutral-50 p-4 text-center text-xs text-neutral-400">
              Aucun indicateur ne correspond à la recherche.
            </div>
          )}
          {families.map(([family, themes]) => (
            <div key={family} className="rounded-md border border-neutral-200 bg-white">
              <div className="border-b border-neutral-100 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Famille {family}
              </div>
              <div className="space-y-2 p-3">
                {themes.map(([theme, groups]) => (
                  <PanelSection
                    key={theme}
                    title={theme}
                    icon={
                      <Icon>
                        <path d="M12 3v18" />
                        <path d="M3 12h18" />
                      </Icon>
                    }
                  >
                    <div className="space-y-1">
                      {groups.map(([group, inds]) => (
                        <div key={group}>
                          <div className="px-1 py-0.5 text-[10px] font-medium italic text-neutral-400">{group}</div>
                          {inds.map((i) => {
                            const active = i.id === ficheId
                            return (
                              <div
                                key={i.id}
                                className={`flex items-center gap-2 rounded-md border px-2 py-1.5 ${
                                  active ? 'border-blue-300 bg-blue-50' : 'border-neutral-100 bg-white'
                                }`}
                              >
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-1.5">
                                    <IndicatorSymbol id={i.id} size={13} />
                                    <div className="truncate text-xs font-medium text-neutral-800">{i.label}</div>
                                  </div>
                                  <div className="text-[10px] text-neutral-400">
                                    {i.unit} · {i.datatype === 'qualite' ? 'qualitatif' : 'quantitatif'} · {i.hasTimeSeries ? 'série temporelle' : 'ponctuel'}
                                  </div>
                                </div>
                                <button
                                  onClick={() => setFicheId(i.id)}
                                  className="shrink-0 rounded border border-neutral-300 bg-white px-2 py-1 text-[10px] text-blue-600 hover:bg-blue-50"
                                >
                                  Fiche
                                </button>
                              </div>
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  </PanelSection>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {fiche ? (
        <aside className="w-80 shrink-0 rounded-md border border-neutral-200 bg-white p-4">
          <div className="flex items-start justify-between gap-2">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-neutral-800"><IndicatorSymbol id={fiche.id} size={16} />{fiche.label}</span>
            <button onClick={() => setFicheId(null)} aria-label="Fermer la fiche" className="text-neutral-400 hover:text-neutral-700">
              <Icon>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </Icon>
            </button>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">{fiche.desc}</p>
          <p className="mt-2 text-[11px] leading-relaxed text-neutral-500">
            <span className="font-semibold text-neutral-700">Objectif :</span> {fiche.objectif}
          </p>
          <dl className="mt-3 space-y-2 text-xs">
            {[
              ['Famille', fiche.family],
              ['Thème', fiche.theme],
              ['Groupe', fiche.group],
              ['Unité', fiche.unit],
              ['Type de donnée', fiche.datatype === 'qualite' ? 'Qualitatif' : fiche.datatype === 'mixte' ? 'Mixte' : 'Quantitatif'],
              ['Série temporelle', fiche.hasTimeSeries ? 'Oui' : 'Non'],
              ['Source', fiche.sourceLabel],
              ['Fraîcheur', 'Il y a 7 j'],
            ].map(([k, v]) => (
              <div key={k} className="flex items-start justify-between gap-2 border-b border-neutral-100 pb-1">
                <dt className="text-neutral-400">{k}</dt>
                <dd className="text-right font-medium text-neutral-700">{v}</dd>
              </div>
            ))}
          </dl>
          <button onClick={() => onOpenFiche(fiche.id)} className="mt-3 w-full rounded border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-600 hover:bg-neutral-50">
            Voir la page indicateur
          </button>
        </aside>
      ) : (
        <div className="flex w-80 shrink-0 flex-col items-center justify-center gap-2 rounded-md border border-dashed border-neutral-300 bg-neutral-50 p-4 text-center text-xs text-neutral-400">
          <Icon>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </Icon>
          Cliquez sur « Fiche » pour consulter les métadonnées d’un indicateur.
        </div>
      )}
    </div>
  )
}