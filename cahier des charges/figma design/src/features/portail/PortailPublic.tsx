import { MapCanvas } from '@/features/carte/MapCanvas'

export interface PortailPublicProps {
  onOpenExpert: () => void
}

export function PortailPublic({ onOpenExpert }: PortailPublicProps) {
  return (
    <div className="flex h-screen flex-col bg-neutral-50 text-neutral-800">
      <header className="flex h-14 shrink-0 items-center gap-6 border-b border-neutral-200 bg-white px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-600 text-sm font-bold text-white">H</div>
          <div className="leading-tight">
            <div className="text-sm font-bold">HydroScope</div>
            <div className="text-[10px] text-neutral-400">Le portail de l’eau potable</div>
          </div>
        </div>
        <nav className="flex items-center gap-1 text-sm text-neutral-600">
          {['Accueil', 'Carte', 'Indicateurs', 'Fiches des territoires', 'À propos'].map((l) => (
            <span key={l} className={`rounded-md px-3 py-1.5 ${l === 'Accueil' ? 'bg-emerald-50 font-medium text-emerald-700' : 'hover:bg-neutral-100'}`}>
              {l}
            </span>
          ))}
        </nav>
        <button
          onClick={onOpenExpert}
          className="ml-auto rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
        >
          Espace experts →
        </button>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto">
        <section className="border-b border-neutral-200 bg-white px-6 py-8">
          <h1 className="max-w-2xl text-2xl font-bold leading-tight">
            La qualité de l’eau potable en Nouvelle-Calédonie, cartographiée et suivie dans le temps.
          </h1>
          <p className="mt-2 max-w-xl text-sm text-neutral-500">
            Bassins versants, points de captage, périmètres de protection : explorez les données publiques de votre territoire.
          </p>
          <div className="mt-4 flex w-full max-w-xl items-center gap-2 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-400">
            <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 stroke-neutral-400" fill="none" strokeWidth="1.5">
              <circle cx="7" cy="7" r="4.5" />
              <line x1="10.5" y1="10.5" x2="14" y2="14" />
            </svg>
            Rechercher une commune, un cours d’eau, un captage…
          </div>
        </section>

        <section className="grid grid-cols-4 gap-3 px-6 py-4">
          {[
            { k: 'Territoires suivis', v: '12 bassins versants' },
            { k: 'Points de captage', v: '~500' },
            { k: 'Périmètres de protection', v: '~250' },
            { k: 'Alertes actives', v: '3', warn: true },
          ].map((s) => (
            <div key={s.k} className="rounded-md border border-neutral-200 bg-white p-4">
              <span className="block text-[11px] uppercase tracking-wide text-neutral-400">{s.k}</span>
              <span className={`mt-1 block text-xl font-semibold ${s.warn ? 'text-amber-600' : 'text-neutral-800'}`}>{s.v}</span>
            </div>
          ))}
        </section>

        <section className="px-6 pb-6">
          <div className="relative h-72 overflow-hidden rounded-lg border border-neutral-200 bg-white">
            <MapCanvas showGrid={false} />
            <div className="absolute bottom-3 left-3 rounded-md border border-neutral-200 bg-white p-2 text-[11px] text-neutral-500">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Point de captage</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full border border-dashed border-neutral-500" /> Périmètre de protection</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex h-10 shrink-0 items-center justify-between border-t border-neutral-200 bg-white px-6 text-[11px] text-neutral-400">
        <span>HydroScope · Portail public — démonstration « 2 apps distinctes » (option 3)</span>
        <span>Données publiques · OEIL &amp; partenaires</span>
      </footer>
    </div>
  )
}