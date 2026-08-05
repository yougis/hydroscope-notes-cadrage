import { Icon } from '@/components/ui/Icon'

export type ChartViewMode = 'repartition' | 'temporel' | 'changements' | 'tableau'

export interface ChartModeSwitcherProps {
  mode: ChartViewMode
  onChange: (m: ChartViewMode) => void
  hasTimeSeries?: boolean
  showCarte?: boolean
  onToggleCarte?: () => void
}

interface Option {
  id: ChartViewMode
  label: string
  title: string
  path: React.ReactNode
  needsTimeSeries?: boolean
}

const CHART_OPTIONS: Option[] = [
  {
    id: 'repartition',
    label: 'Répartition',
    title: 'Répartition par unité sélectionnée',
    path: (
      <>
        <path d="M7 17V7" />
        <path d="M12 17V3" />
        <path d="M17 17v-6" />
      </>
    ),
  },
  {
    id: 'tableau',
    label: 'Tableau',
    title: 'Vue tabulaire des valeurs',
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M3 15h18" />
        <path d="M9 3v18" />
        <path d="M15 3v18" />
      </>
    ),
  },
  {
    id: 'temporel',
    label: 'Temporel',
    title: 'Vue temporelle',
    needsTimeSeries: true,
    path: (
      <>
        <path d="M3 3v18h18" />
        <path d="m4 16 5-5 4 3 7-8" />
      </>
    ),
  },
  {
    id: 'changements',
    label: 'Changements',
    title: 'Changements inter-périodes',
    needsTimeSeries: true,
    path: (
      <>
        <path d="M3 12c3 8 5 8 8-2s5-10 9-2" />
        <path d="M17 3h5v5" />
        <path d="M21 12c-3-8-5-8-8 2s-5 10-9 2" />
        <path d="M6 21H1v-5" />
      </>
    ),
  },
]

const CARTE_OPTION = {
  label: 'Grille H3',
  title: 'Grille H3 sur la carte',
  path: (
    <>
      <path d="M12 3l7.8 4.5v9L12 21l-7.8-4.5v-9L12 3" />
      <path d="M12 3v4.5M12 12l5.2-3M12 12v9M12 12l-5.2 3" />
    </>
  ),
}

function TooltipButton({
  label,
  children,
  className,
  title,
  'aria-label': ariaLabel,
  onClick,
}: {
  label: string
  children: React.ReactNode
  className: string
  title?: string
  'aria-label'?: string
  onClick?: () => void
}) {
  return (
    <div className="group relative">
      <button type="button" onClick={onClick} title={title ?? label} aria-label={ariaLabel ?? label} className={`flex items-center justify-center rounded p-1.5 transition ${className}`}>
        {children}
      </button>
      <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 -translate-x-1/2 whitespace-nowrap rounded border border-neutral-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-neutral-700 opacity-0 shadow-md transition group-hover:opacity-100">
        {label}
      </span>
    </div>
  )
}

export function ChartModeSwitcher({ mode, onChange, hasTimeSeries = false, showCarte = false, onToggleCarte }: ChartModeSwitcherProps) {
  return (
    <div className="flex items-center gap-0.5 rounded-md border border-neutral-200 bg-neutral-50 p-0.5">
      {CHART_OPTIONS.map((o) => {
        const disabled = (o.needsTimeSeries ?? false) && !hasTimeSeries
        const active = mode === o.id
        return (
          <TooltipButton
            key={o.id}
            label={o.label}
            title={disabled ? `${o.title} — données non historisées` : o.title}
            onClick={disabled ? undefined : () => onChange(o.id)}
            className={
              disabled
                ? 'cursor-not-allowed text-neutral-300'
                : active
                  ? 'bg-blue-600 text-white'
                  : 'text-neutral-500 hover:bg-white hover:text-neutral-800'
            }
          >
            <Icon>{o.path}</Icon>
          </TooltipButton>
        )
      })}

      {onToggleCarte && (
        <span className="mx-0.5 h-4 w-px bg-neutral-200" />
      )}

      {onToggleCarte && (
        <TooltipButton
          label={CARTE_OPTION.label}
          title={CARTE_OPTION.title}
          onClick={onToggleCarte}
          className={showCarte ? 'bg-blue-600 text-white' : 'text-neutral-500 hover:bg-white hover:text-neutral-800'}
        >
          <Icon>{CARTE_OPTION.path}</Icon>
        </TooltipButton>
      )}
    </div>
  )
}