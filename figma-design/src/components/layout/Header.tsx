import { Toggle } from '@/components/ui/Toggle'
import { ExportMenu } from '@/components/ui/ExportMenu'
import type { ExportFormat } from '@/features/export'
import type { PeriodRange } from '@/types/domain'

export interface HeaderProps {
  avance: boolean
  onToggleAvance: () => void
  period: PeriodRange
  onSetPeriod: (p: PeriodRange) => void
  onOpenHelp: () => void
  onExport: (fmt: ExportFormat) => void
}

const PERIODS: PeriodRange[] = ['2016 — 2020', '2016 — 2026', '2017 — 2021', '2021 — 2026']

export function Header({ avance, onToggleAvance, period, onSetPeriod, onOpenHelp, onExport }: HeaderProps) {
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
          <label className="flex items-center gap-1.5" title="Période globale — appliquée à la carte, aux graphiques et aux pages indicateurs">
            <span className="text-[11px] text-neutral-400">Période</span>
            <select
              value={period}
              onChange={(e) => onSetPeriod(e.target.value)}
              className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-xs text-neutral-600 hover:bg-neutral-50"
            >
              {PERIODS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <ExportMenu onExport={onExport} />
          <span className="hidden text-xs text-neutral-400 sm:block">{modeLabel} · OEIL</span>
          <button
            onClick={onOpenHelp}
            title="Aide — documentation"
            aria-label="Ouvrir l’aide — documentation"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-sm font-semibold text-neutral-500 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
          >
            ?
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-xs font-bold text-neutral-600">OE</div>
        </div>
    </header>
  )
}