import type { CaptageKind } from '@/types/domain'

export interface KindMarkProps {
  kind: CaptageKind
  color?: string
  size?: number
  className?: string
}

/** Marqueur géométrique correspondant au symbole carte du type d'ouvrage. */
export function KindMark({ kind, color = '#3b82f6', size = 10, className }: KindMarkProps) {
  if (kind === 'forage') {
    return (
      <svg viewBox="0 0 10 10" width={size} height={size} className={className} aria-hidden="true">
        <rect x="2" y="2" width="6" height="6" transform="rotate(45 5 5)" fill={color} />
      </svg>
    )
  }
  if (kind === 'tranchee_drainante') {
    return (
      <svg viewBox="0 0 10 10" width={size} height={size} className={className} aria-hidden="true">
        <path d="M5 1 9 9 H1 Z" fill={color} />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 10 10" width={size} height={size} className={className} aria-hidden="true">
      <circle cx="5" cy="5" r="3.4" fill={color} />
    </svg>
  )
}
