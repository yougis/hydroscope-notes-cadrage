import { useState, type ReactElement } from 'react'
import { useSession } from './hooks/useSession'
import { VIEWS, GROUPS, buildIndicatorGroup } from '@/config/views'
import { catalogueById } from '@/data/hydroscope'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { Footer } from '@/components/layout/Footer'
import { CarteView } from '@/features/carte'
import { IndicateurPage } from '@/features/indicateurs'
import { PortailPublic } from '@/features/portail'
import { STUBS } from '@/features/stubs'
import type { IAMode } from '@/types/domain'

export default function App() {
  const [avance, setAvance] = useState(true)
  const [active, setActive] = useState('carte')
  const [iaMode, setIaMode] = useState<IAMode>('unifiee')
  const [collapsed, setCollapsed] = useState(false)
  const { selectedCaptages, sessionIndicators, toggleCaptage, assistedSelect, toggleIndicator, removeIndicator } = useSession()

  if (iaMode === 'portail') {
    return <PortailPublic onOpenExpert={() => setIaMode('unifiee')} />
  }

  const handleRemoveIndicator = (id: string) => {
    removeIndicator(id)
    if (active === id) setActive('carte')
  }

  const indicatorGroup = buildIndicatorGroup(sessionIndicators)

  const visibleGroups = [GROUPS[0], indicatorGroup, ...GROUPS.slice(1)]
    .map((g) => ({ ...g, views: g.views.filter((v) => (avance ? true : !v.expertOnly)) }))
    .filter((g) => (g.name === 'Indicateurs' ? true : g.views.length > 0))

  const ind = active.startsWith('ind:') ? catalogueById(active) : undefined

  const current = ind
    ? {
        label: ind.label,
        group: 'Indicateurs',
        epic: 'EPIC 4 · 1bis',
        mvp: true,
        desc: `Indicateur « ${ind.label} » — famille ${ind.family} / ${ind.theme}, unité ${ind.unit}. Valeurs des ${selectedCaptages.size} captages sélectionnés de la session.`,
      }
    : VIEWS.find((v) => v.id === active)!

  let content: ReactElement
  if (ind) {
    content = (
      <IndicateurPage id={ind.id} selected={selectedCaptages} onRemove={handleRemoveIndicator} onOpenFiche={() => setActive('indicateurs')} />
    )
  } else if (active === 'carte') {
    content = (
      <CarteView
        selected={selectedCaptages}
        onToggleCaptage={toggleCaptage}
        onAssistedSelect={assistedSelect}
        sessionIndicators={sessionIndicators}
        onToggleIndicator={toggleIndicator}
        onOpenCatalogue={() => setActive('indicateurs')}
      />
    )
  } else {
    const S = STUBS[active]
    content = <S />
  }

  return (
    <div className="flex h-screen flex-col bg-neutral-100 text-neutral-800">
      <Header avance={avance} onToggleAvance={() => setAvance((a) => !a)} iaMode={iaMode} onSetIaMode={setIaMode} />

      <div className="flex min-h-0 flex-1">
        <Sidebar groups={visibleGroups} active={active} onSelect={setActive} collapsed={collapsed} onToggleCollapsed={() => setCollapsed((c) => !c)} />

        <main className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-center gap-2 border-b border-neutral-200 bg-white px-5 py-2.5">
            <span className="text-xs text-neutral-400">{current.group}</span>
            <span className="text-xs text-neutral-300">/</span>
            <span className="text-sm font-semibold">{current.label}</span>
            <span className="ml-auto rounded border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] text-neutral-400">
              {current.epic} {current.mvp ? '· MVP' : ''}
            </span>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-5">
            <p className="mb-4 max-w-2xl text-sm leading-relaxed text-neutral-500">{current.desc}</p>
            <div className="h-[calc(100%-40px)]">{content}</div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}