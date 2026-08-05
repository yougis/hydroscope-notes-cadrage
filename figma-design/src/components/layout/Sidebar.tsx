import { Icon } from '@/components/ui/Icon'
import { IndicatorSymbol } from '@/components/ui/IndicatorSymbol'
import { VIEW_ICONS, type NavGroup } from '@/config/views'

export interface SidebarProps {
  groups: NavGroup[]
  active: string
  onSelect: (id: string) => void
  collapsed: boolean
  onToggleCollapsed: () => void
}

export function Sidebar({ groups, active, onSelect, collapsed, onToggleCollapsed }: SidebarProps) {
  return (
    <nav className={`shrink-0 overflow-y-auto border-r border-neutral-200 bg-white p-3 transition-all duration-150 ${collapsed ? 'w-14' : 'w-56'}`}>
      <button
        onClick={onToggleCollapsed}
        title={collapsed ? 'Déplier la navigation' : 'Replier la navigation'}
        aria-label={collapsed ? 'Déplier la navigation' : 'Replier la navigation'}
        className={`mb-3 flex items-center rounded-md border border-neutral-200 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-700 ${
          collapsed ? 'mx-auto h-8 w-8 justify-center' : 'w-full justify-between px-2 py-1.5'
        }`}
      >
        <span className={`text-[10px] font-semibold uppercase tracking-wider text-neutral-400 ${collapsed ? 'hidden' : ''}`}>
          Navigation
        </span>
        <Icon>
          <path d={collapsed ? 'm9 18 6-6-6-6' : 'm15 18-6-6 6-6'} />
        </Icon>
      </button>

      {groups.map((g) => (
        <div key={g.name} className="mb-4">
          {collapsed ? (
            <div className="mx-1.5 mb-1.5 border-t border-neutral-200" />
          ) : (
            <div className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">{g.name}</div>
          )}
          {g.name === 'Indicateurs' && g.views.length === 0 && !collapsed && (
            <div className="mb-1 rounded-md border border-dashed border-neutral-300 p-2 text-center text-[10px] text-neutral-400">
              Aucun indicateur ajouté.
              <br />
              Ajoutez-les depuis le catalogue (carte).
            </div>
          )}
          {g.views.map((v) => (
            <button
              key={v.id}
              onClick={() => onSelect(v.id)}
              title={collapsed ? v.label : undefined}
              className={`mb-0.5 flex w-full items-center rounded-md text-sm transition ${
                collapsed ? 'justify-center py-2' : 'gap-2 px-2 py-1.5'
              } ${active === v.id ? 'bg-blue-50 font-medium text-blue-700' : 'text-neutral-600 hover:bg-neutral-100'}`}
            >
              {v.id.startsWith('ind:') ? <IndicatorSymbol id={v.id} size={16} /> : VIEW_ICONS[v.id] ?? VIEW_ICONS.indicateurs}
              {!collapsed && <span className="truncate">{v.label}</span>}
            </button>
          ))}
        </div>
      ))}
    </nav>
  )
}