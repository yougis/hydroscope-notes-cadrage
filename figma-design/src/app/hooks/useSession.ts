import { useState } from 'react'
import type { PeriodRange, UnitMode } from '@/types/domain'
import { BVAEPS } from '@/data/hydroscope'

const DEFAULT_UNITES = ['C-001', 'C-003', 'C-006', 'C-009']
const DEFAULT_INDICATORS = ['ind:200']
const DEFAULT_PERIOD: PeriodRange = '2016 — 2026'
const DEFAULT_BVAEP = BVAEPS.map((b) => b.id)

export function useSession() {
  const [unitMode, setUnitMode] = useState<UnitMode>('gestion')
  const [selectedUnites, setSelectedUnites] = useState<Set<string>>(new Set(DEFAULT_UNITES))
  const [selectedBvaeps, setSelectedBvaeps] = useState<Set<string>>(new Set(DEFAULT_BVAEP))
  const [sessionIndicators, setSessionIndicators] = useState<string[]>(DEFAULT_INDICATORS)
  const [activeIndicator, setActiveIndicator] = useState<string | null>(DEFAULT_INDICATORS[0] ?? null)
  const [period, setPeriod] = useState<PeriodRange>(DEFAULT_PERIOD)

  const setMode = (m: UnitMode) => setUnitMode(m)

  const toggleUnite = (id: string) =>
    setSelectedUnites((prev) => {
      const s = new Set(prev)
      if (s.has(id)) s.delete(id)
      else s.add(id)
      return s
    })

  const toggleBvaep = (id: string) =>
    setSelectedBvaeps((prev) => {
      const s = new Set(prev)
      if (s.has(id)) s.delete(id)
      else s.add(id)
      return s
    })

  const applyUnites = (ids: string[]) => setSelectedUnites(new Set(ids))
  const applyBvaeps = (ids: string[]) => setSelectedBvaeps(new Set(ids))
  const clearUnites = () => setSelectedUnites(new Set())
  const clearBvaeps = () => setSelectedBvaeps(new Set())

  const toggleIndicator = (id: string) =>
    setSessionIndicators((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const removeIndicator = (id: string) => {
    setSessionIndicators((prev) => prev.filter((x) => x !== id))
    if (activeIndicator === id) setActiveIndicator(sessionIndicators.find((x) => x !== id) ?? null)
  }

  const selectIndicator = (id: string) => {
    setActiveIndicator(id)
    setSessionIndicators((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  return {
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
    toggleIndicator,
    removeIndicator,
    period,
    setPeriod,
  }
}