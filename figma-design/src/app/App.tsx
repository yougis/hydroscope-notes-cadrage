import { useState, type ReactElement } from 'react'
import { useSession } from './hooks/useSession'
import { VIEWS, GROUPS, buildIndicatorGroup } from '@/config/views'
import { catalogueById } from '@/data/hydroscope'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { Footer } from '@/components/layout/Footer'
import { CarteView } from '@/features/carte'
import { IndicateurPage, IndicateursView } from '@/features/indicateurs'
import { ComparaisonView } from '@/features/comparaison'
import { DashboardPage, PublicInterface } from '@/features/portail'
import { CroisementView } from '@/features/croisement'
import { HelpPage, helpAnchorFor } from '@/features/help'
import { STUBS } from '@/features/stubs'
import { downloadFile, exportContextAsCsv, exportContextAsGeoJson, exportContextAsGeoPackage } from '@/features/export'
import type { ExportContext, ExportFormat } from '@/features/export'
import type { IndicatorDef } from '@/types/domain'

export default function App() {
  const [avance, setAvance] = useState(true)
  const [active, setActive] = useState('carte')
  const [collapsed, setCollapsed] = useState(false)
  const [showPublic, setShowPublic] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [helpAnchor, setHelpAnchor] = useState<string | undefined>(undefined)
  const [helpFrom, setHelpFrom] = useState<string | undefined>(undefined)
  const [focusIndicator, setFocusIndicator] = useState<string | null>(null)
  const {
    unitMode,
    setMode,
    selectedUnites,
    selectedBvaeps,
    toggleUnite,
    toggleBvaep,
    applyUnites,
    applyBvaeps,
    clearUnites,
    clearBvaeps,
    sessionIndicators,
    activeIndicator,
    selectIndicator,
    removeIndicator,
    period,
    setPeriod,
  } = useSession()

  if (showHelp) {
    return <HelpPage initialAnchor={helpAnchor} fromLabel={helpFrom} onBack={() => setShowHelp(false)} />
  }

  if (showPublic) {
    return <PublicInterface onBack={() => setShowPublic(false)} />
  }

  const handleRemoveIndicator = (id: string) => {
    removeIndicator(id)
    if (active === id) setActive('carte')
  }

  const handleOpenFiche = (id: string) => {
    setFocusIndicator(id)
    setActive('indicateurs')
  }

  const handleOpenCatalogue = () => {
    setFocusIndicator(null)
    setActive('indicateurs')
  }

  const handleExport = (fmt: ExportFormat) => {
    const ctx: ExportContext = {
      unitMode,
      selectedUnites,
      selectedBvaeps,
      indicators: sessionIndicators.map((id) => catalogueById(id)).filter((i): i is IndicatorDef => i != null),
      period,
    }
    const result =
      fmt === 'csv' ? exportContextAsCsv(ctx) : fmt === 'geojson' ? exportContextAsGeoJson(ctx) : exportContextAsGeoPackage(ctx)
    downloadFile(result)
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
      }
    : VIEWS.find((v) => v.id === active)!

  const openHelp = () => {
    setHelpAnchor(helpAnchorFor(active))
    setHelpFrom(current.label)
    setShowHelp(true)
  }

  let content: ReactElement
  if (ind) {
    content = (
      <IndicateurPage
        id={ind.id}
        unitMode={unitMode}
        selectedUnites={selectedUnites}
        selectedBvaeps={selectedBvaeps}
        onRemove={handleRemoveIndicator}
        onOpenFiche={handleOpenFiche}
        period={period}
      />
    )
  } else if (active === 'carte') {
    content = (
      <CarteView
        unitMode={unitMode}
        onSetMode={setMode}
        selectedUnites={selectedUnites}
        onToggleUnite={toggleUnite}
        selectedBvaeps={selectedBvaeps}
        onToggleBvaep={toggleBvaep}
        onApplyUnites={applyUnites}
        onApplyBvaeps={applyBvaeps}
        onClearUnites={clearUnites}
        onClearBvaeps={clearBvaeps}
        activeIndicator={activeIndicator}
        onSelectIndicator={selectIndicator}
        onOpenCatalogue={handleOpenCatalogue}
        onOpenFiche={handleOpenFiche}
      />
    )
  } else if (active === 'indicateurs') {
    content = <IndicateursView focusId={focusIndicator} onOpenFiche={(id) => setActive(id)} />
  } else if (active === 'tableau') {
    content = <DashboardPage onOpenPublic={() => setShowPublic(true)} />
  } else if (active === 'croisement') {
    content = <CroisementView />
  } else if (active === 'comparaison') {
    content = (
      <ComparaisonView
        avance={avance}
        unitMode={unitMode}
        selectedUnites={selectedUnites}
        selectedBvaeps={selectedBvaeps}
        activeIndicator={activeIndicator}
        period={period}
      />
    )
  } else {
    const S = STUBS[active]
    content = <S />
  }

  return (
    <div className="flex h-screen flex-col bg-neutral-100 text-neutral-800">
      <Header avance={avance} onToggleAvance={() => setAvance((a) => !a)} period={period} onSetPeriod={setPeriod} onOpenHelp={openHelp} onExport={handleExport} />

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
            <div className="h-full">{content}</div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
