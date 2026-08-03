import { Icon } from '@/components/ui/Icon'
import { CATALOGUE } from '@/data/hydroscope'

export interface CatalogueIndicateursProps {
  sessionIndicators: string[]
  onToggleIndicator: (id: string) => void
  onOpenCatalogue: () => void
}

export function CatalogueIndicateurs({ sessionIndicators, onToggleIndicator, onOpenCatalogue }: CatalogueIndicateursProps) {
  return (
    <aside className="flex w-80 shrink-0 flex-col gap-3 overflow-y-auto rounded-md border border-neutral-200 bg-white p-3">
      <div>
        <span className="text-xs font-semibold text-neutral-700">Catalogue d’indicateurs</span>
        <p className="mt-0.5 text-[10px] text-neutral-400">Ajouter un indicateur → sa page s’ouvre dans le menu « Indicateurs ».</p>
      </div>

      <div className="flex items-center gap-2 rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-neutral-400">
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 stroke-neutral-400" fill="none" strokeWidth="1.5">
          <circle cx="7" cy="7" r="4.5" />
          <line x1="10.5" y1="10.5" x2="14" y2="14" />
        </svg>
        Rechercher un indicateur…
      </div>

      {(['ENJEUX', 'MENACES'] as const).map((fam) => (
        <div key={fam}>
          <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">{fam}</div>
          <div className="space-y-1.5">
            {CATALOGUE.filter((i) => i.family === fam).map((ind) => {
              const added = sessionIndicators.includes(ind.id)
              return (
                <div key={ind.id} className={`rounded-md border p-2 ${added ? 'border-blue-300 bg-blue-50' : 'border-neutral-200 bg-white'}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="truncate text-xs font-medium text-neutral-800">{ind.code} · {ind.label}</div>
                      <div className="text-[10px] text-neutral-400">{ind.theme} · unité {ind.unit}</div>
                    </div>
                    <button
                      onClick={() => onToggleIndicator(ind.id)}
                      title={added ? 'Retirer de la session' : 'Ajouter à la session'}
                      aria-label={added ? 'Retirer' : 'Ajouter'}
                      className={added ? 'text-blue-600' : 'text-neutral-300 hover:text-blue-600'}
                    >
                      <Icon>
                        {added ? (
                          <>
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </>
                        ) : (
                          <>
                            <path d="M12 5v14" />
                            <path d="M5 12h14" />
                          </>
                        )}
                      </Icon>
                    </button>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className={`text-[10px] font-medium ${added ? 'text-blue-600' : 'text-neutral-400'}`}>
                      {added ? 'Ajouté à la session' : 'Ajouter à la session'}
                    </span>
                    <button onClick={onOpenCatalogue} className="text-[10px] text-neutral-500 underline hover:text-blue-600">
                      Fiche &amp; métadonnées
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      <div className="mt-auto rounded-md border border-dashed border-neutral-300 bg-neutral-50 p-2 text-[11px] text-neutral-400">
        Favoris · fraîcheur &amp; qualité des données · compatibilité (AMC post-MVP) détaillées dans chaque fiche.
      </div>
    </aside>
  )
}