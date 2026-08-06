import { useState } from 'react'
import type { NormMethod } from './normalize'

export interface CroisementState {
  indicators: string[]
  isFull: boolean
  add: (id: string) => void
  remove: (id: string) => void
  method: NormMethod
  setMethod: (m: NormMethod) => void
}

const MAX = 3

export function useCroisement(): CroisementState {
  const [indicators, setIndicators] = useState<string[]>([])
  const [method, setMethod] = useState<NormMethod>('minmax')

  const add = (id: string) =>
    setIndicators((prev) =>
      prev.includes(id) || prev.length >= MAX ? prev : [...prev, id],
    )

  const remove = (id: string) => setIndicators((prev) => prev.filter((x) => x !== id))

  return { indicators, isFull: indicators.length >= MAX, add, remove, method, setMethod }
}
