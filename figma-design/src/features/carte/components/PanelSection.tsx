import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

export interface PanelSectionProps {
  title: string
  icon?: ReactNode
  badge?: ReactNode
  defaultOpen?: boolean
  children: ReactNode
}

export function PanelSection({ title, icon, badge, defaultOpen = true, children }: PanelSectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section className="border-b border-neutral-100">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 px-1 py-1.5 text-left"
      >
        {icon && <span className="text-neutral-400">{icon}</span>}
        <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">{title}</span>
        {badge && <span className="ml-auto text-[10px] text-neutral-400">{badge}</span>}
        <ChevronDown size={12} className={`ml-1 shrink-0 text-neutral-400 transition-transform ${open ? '' : '-rotate-90'}`} />
      </button>
      {open && <div className="space-y-1.5 pb-2">{children}</div>}
    </section>
  )
}
