import { useState } from 'react'

const DEFAULT_CAPTAGES = ['C-001', 'C-003', 'C-006', 'C-009']
const ASSISTED_CAPTAGES = ['C-001', 'C-003', 'C-004', 'C-005', 'C-006', 'C-010']
const DEFAULT_INDICATORS = ['ind:200']

export function useSession() {
  const [selectedCaptages, setSelectedCaptages] = useState<Set<string>>(new Set(DEFAULT_CAPTAGES))
  const [sessionIndicators, setSessionIndicators] = useState<string[]>(DEFAULT_INDICATORS)

  const toggleCaptage = (id: string) =>
    setSelectedCaptages((prev) => {
      const s = new Set(prev)
      if (s.has(id)) s.delete(id)
      else s.add(id)
      return s
    })

  const assistedSelect = () => setSelectedCaptages(new Set(ASSISTED_CAPTAGES))

  const toggleIndicator = (id: string) =>
    setSessionIndicators((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const removeIndicator = (id: string) => setSessionIndicators((prev) => prev.filter((x) => x !== id))

  return {
    selectedCaptages,
    sessionIndicators,
    toggleCaptage,
    assistedSelect,
    toggleIndicator,
    removeIndicator,
  }
}