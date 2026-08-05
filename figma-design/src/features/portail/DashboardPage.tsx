import { PublicHome } from './PublicHome'

export interface DashboardPageProps {
  onOpenPublic: () => void
}

/** Page « Tableau de bord » : contenu fusionné (portail public) + chiffres clés + lien vers l'interface publique. */
export function DashboardPage({ onOpenPublic }: DashboardPageProps) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-end">
        <button
          onClick={onOpenPublic}
          className="rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
        >
          Interface publique →
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-neutral-200">
        <PublicHome key="dashboard" />
      </div>

      <section className="rounded-md border border-neutral-200 bg-white p-3">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Tableau de bord — chiffres clés</span>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {[
            { k: 'Valeur actuelle', v: '1 240 ha' },
            { k: 'Tendance 10 ans', v: '+18 %' },
            { k: 'Rang territorial', v: '#4 / 12' },
            { k: 'Fraîcheur donnée', v: 'Il y a 7 j' },
          ].map((s) => (
            <div key={s.k} className="rounded-md border border-neutral-200 bg-neutral-50 p-3">
              <span className="block text-[11px] uppercase tracking-wide text-neutral-400">{s.k}</span>
              <span className="mt-1 block text-xl font-semibold text-neutral-800">{s.v}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}