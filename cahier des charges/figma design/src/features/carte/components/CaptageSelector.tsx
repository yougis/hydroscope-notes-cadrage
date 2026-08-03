import { Icon } from '@/components/ui/Icon'
import { CAPTAGES } from '@/data/hydroscope'

export interface CaptageSelectorProps {
  selected: Set<string>
  onToggleCaptage: (id: string) => void
  onAssistedSelect: () => void
}

export function CaptageSelector({ selected, onToggleCaptage, onAssistedSelect }: CaptageSelectorProps) {
  return (
    <aside className="flex w-72 shrink-0 flex-col gap-3 overflow-y-auto rounded-md border border-neutral-200 bg-white p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-neutral-700">Captages / forages</span>
        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">{selected.size} sélectionnés</span>
      </div>

      <div className="flex items-center gap-2 rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-neutral-400">
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 stroke-neutral-400" fill="none" strokeWidth="1.5">
          <circle cx="7" cy="7" r="4.5" />
          <line x1="10.5" y1="10.5" x2="14" y2="14" />
        </svg>
        Recherche (nom, commune, bassin versant)…
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        <span className="rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1 text-center text-[11px] text-neutral-600">Commune ▾</span>
        <span className="rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1 text-center text-[11px] text-neutral-600">Province ▾</span>
        <span className="rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1 text-center text-[11px] text-neutral-600">Bassins versants ▾</span>
      </div>

      <button onClick={onAssistedSelect} className="flex items-center gap-1.5 rounded-md border border-blue-500 bg-blue-50 px-2 py-1 text-left text-[11px] font-medium text-blue-700 hover:bg-blue-100">
        <Icon>
          <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
        </Icon>
        Sélection assistée — 10 captages les plus exposés
      </button>

      <div className="flex items-center justify-between border-b border-neutral-100 pb-1">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Liste</span>
        <span className="rounded border border-neutral-300 bg-white px-2 py-0.5 text-[10px] text-neutral-500">Trier : distance ▾</span>
      </div>

      <ul className="space-y-1">
        {CAPTAGES.map((c) => {
          const isSel = selected.has(c.id)
          return (
            <li key={c.id} className={`flex items-center gap-2 rounded-md border px-2 py-1.5 ${isSel ? 'border-blue-300 bg-blue-50' : 'border-neutral-200 bg-white'}`}>
              <button onClick={() => onToggleCaptage(c.id)} className="min-w-0 flex-1 text-left">
                <span className="block truncate text-xs font-medium text-neutral-800">{c.name}</span>
                <span className="block truncate text-[10px] text-neutral-400">{c.commune} · Bassin versant {c.bvaep}</span>
              </button>
              <span className="text-[10px] text-neutral-400">{c.dist} km</span>
              <button onClick={() => onToggleCaptage(c.id)} title="Retirer" aria-label={`Retirer ${c.name}`} className="text-neutral-300 hover:text-red-500">
                <Icon>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </Icon>
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}