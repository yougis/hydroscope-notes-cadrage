import { GROUPS } from '@/config/views'
import { PublicHome } from './PublicHome'

export interface PublicInterfaceProps {
  onBack: () => void
}

const PUBLIC_GROUPS = GROUPS.map((g) => ({
  name: g.name,
  views: g.views.filter((v) => !v.expertOnly),
})).filter((g) => g.views.length > 0)

export function PublicInterface({ onBack }: PublicInterfaceProps) {
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
          {PUBLIC_GROUPS.map((g) => (
            <span key={g.name} className="flex items-center gap-1">
              <span className="px-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">{g.name}</span>
              {g.views.map((v, i) => (
                <span
                  key={v.id}
                  className={`rounded-md px-3 py-1.5 ${i === 0 ? 'bg-emerald-50 font-medium text-emerald-700' : 'hover:bg-neutral-100'}`}
                >
                  {v.label}
                </span>
              ))}
            </span>
          ))}
        </nav>
        <button
          onClick={onBack}
          className="ml-auto rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
        >
          Espace experts →
        </button>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto">
        <PublicHome mapKey="public" />
      </main>

      <footer className="flex h-10 shrink-0 items-center justify-between border-t border-neutral-200 bg-white px-6 text-[11px] text-neutral-400">
        <span>HydroScope · Interface publique — même contenu que le tableau de bord</span>
        <span>Données publiques · OEIL &amp; partenaires</span>
      </footer>
    </div>
  )
}