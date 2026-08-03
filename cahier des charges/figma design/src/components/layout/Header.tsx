import { Toggle } from '@/components/ui/Toggle'
import type { IAMode } from '@/types/domain'

export interface HeaderProps {
  avance: boolean
  onToggleAvance: () => void
  iaMode: IAMode
  onSetIaMode: (mode: IAMode) => void
}

export function Header({ avance, onToggleAvance, iaMode, onSetIaMode }: HeaderProps) {
  const modeLabel = avance ? 'Avancé' : 'Standard'

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-neutral-200 bg-white px-4">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-sm font-bold text-white">H</div>
        <div className="leading-tight">
          <div className="text-sm font-bold">HydroScope</div>
          <div className="text-[10px] text-neutral-400">Nouvelle-Calédonie · Eau potable</div>
        </div>
      </div>

      <div className="mx-auto flex items-center gap-2">
        <Toggle on={avance} onClick={onToggleAvance} label="Mode avancé" />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-full border border-neutral-200 bg-neutral-50 p-0.5" title="Architecture d’information — comparer les 2 options">
          <button
            onClick={() => onSetIaMode('unifiee')}
            className={`rounded-full px-3 py-1 text-[11px] font-medium transition ${
              iaMode === 'unifiee' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            App unifiée
          </button>
          <button
            onClick={() => onSetIaMode('portail')}
            className={`rounded-full px-3 py-1 text-[11px] font-medium transition ${
              iaMode === 'portail' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            Portail public
          </button>
        </div>
        <span className="hidden text-xs text-neutral-400 sm:block">{modeLabel} · OEIL</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-xs font-bold text-neutral-600">OE</div>
      </div>
    </header>
  )
}