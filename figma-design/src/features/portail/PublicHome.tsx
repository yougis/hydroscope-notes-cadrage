import { MapCanvas } from '@/features/carte/MapCanvas'

export interface PublicHomeProps {
  mapKey?: string
}

/** Contenu fusionné portail public ⇄ tableau de bord : hero, chiffres clés, carte. */
export function PublicHome({ mapKey }: PublicHomeProps) {
  return (
    <div className="flex flex-col gap-4">
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

      <section className="grid grid-cols-4 gap-3 px-6">
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

      <section className="px-6 pb-2">
        <div className="relative h-72 overflow-hidden rounded-lg border border-neutral-200 bg-white">
          <MapCanvas key={mapKey ?? 'public'} showGrid={false} />
          <div className="absolute bottom-3 left-3 rounded-md border border-neutral-200 bg-white p-2 text-[11px] text-neutral-500">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Point de captage</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full border border-dashed border-neutral-500" /> Périmètre de protection</span>
          </div>
        </div>
      </section>
    </div>
  )
}