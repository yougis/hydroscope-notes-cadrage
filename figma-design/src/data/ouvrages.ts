import type { CaptageKind } from '@/types/domain'

export const KIND_LABELS: Record<CaptageKind, string> = {
  captage_superficiel: 'Captage superficiel',
  forage: 'Forage',
  tranchee_drainante: 'Tranchée drainante',
}

export const KIND_SHORT: Record<CaptageKind, string> = {
  captage_superficiel: 'Superficiel',
  forage: 'Forage',
  tranchee_drainante: 'Tranchée',
}

export const CAPTAGE_KINDS: CaptageKind[] = ['captage_superficiel', 'forage', 'tranchee_drainante']
