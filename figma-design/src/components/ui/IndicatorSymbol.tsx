import type { LucideIcon } from 'lucide-react'
import { getIndicatorSymbol } from '@/data/indicatorSymbols'

export interface IndicatorSymbolProps {
  id: string
  size?: number
  className?: string
}

/**
 * Pictogramme lucide coloré (type Windy) représentant un indicateur.
 * Chaque indicateur a un symbole distinctif pour être reconnaissable sans sa lecture technique.
 */
export function IndicatorSymbol({ id, size = 14, className }: IndicatorSymbolProps) {
  const { icon: Icon, color } = getIndicatorSymbol(id)
  return <Icon size={size} strokeWidth={1.9} className={`${color} ${className ?? ''}`} aria-hidden />
}