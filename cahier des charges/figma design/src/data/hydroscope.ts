import type { CaptageDef, IndicatorDef } from '@/types/domain'

export const CAPTAGES: CaptageDef[] = [
  { id: 'C-001', name: 'Koumac', commune: 'Koumac', province: 'Province Nord', bvaep: 'Nord', dist: 4.2 },
  { id: 'C-002', name: 'Voh', commune: 'Voh', province: 'Province Nord', bvaep: 'Nord', dist: 11.8 },
  { id: 'C-003', name: 'Pouembout', commune: 'Pouembout', province: 'Province Nord', bvaep: 'Nord', dist: 3.1 },
  { id: 'C-004', name: 'Koné', commune: 'Koné', province: 'Province Nord', bvaep: 'Nord', dist: 7.6 },
  { id: 'C-005', name: 'Poindimié', commune: 'Poindimié', province: 'Province Nord', bvaep: 'Nord', dist: 9.4 },
  { id: 'C-006', name: 'Houaïlou', commune: 'Houaïlou', province: 'Province Nord', bvaep: 'Centre', dist: 2.8 },
  { id: 'C-007', name: 'Canala', commune: 'Canala', province: 'Province Nord', bvaep: 'Centre', dist: 15.2 },
  { id: 'C-008', name: 'Boulouparis', commune: 'Boulouparis', province: 'Province Sud', bvaep: 'Sud', dist: 5.3 },
  { id: 'C-009', name: 'La Foa', commune: 'La Foa', province: 'Province Sud', bvaep: 'Sud', dist: 8.9 },
  { id: 'C-010', name: 'Sarraméa', commune: 'Sarraméa', province: 'Province Sud', bvaep: 'Sud', dist: 12.7 },
  { id: 'C-011', name: 'Poya', commune: 'Poya', province: 'Province Nord', bvaep: 'Centre', dist: 6.1 },
  { id: 'C-012', name: 'Kouaoua', commune: 'Kouaoua', province: 'Province Nord', bvaep: 'Centre', dist: 4.7 },
]

export const CAPTAGE_POINTS: Array<{ key: string; x: number; y: number }> = [
  { key: 'C-001', x: 120, y: 185 },
  { key: 'C-002', x: 175, y: 160 },
  { key: 'C-003', x: 210, y: 195 },
  { key: 'C-004', x: 285, y: 175 },
  { key: 'C-005', x: 350, y: 185 },
  { key: 'C-006', x: 395, y: 170 },
  { key: 'C-007', x: 430, y: 190 },
  { key: 'C-008', x: 465, y: 195 },
  { key: 'C-009', x: 500, y: 185 },
  { key: 'C-010', x: 520, y: 205 },
  { key: 'C-011', x: 155, y: 140 },
  { key: 'C-012', x: 260, y: 140 },
]

export const CATALOGUE: IndicatorDef[] = [
  { id: 'ind:105', code: '105', label: 'Occupation du sol (couvert végétal)', unit: 'ha', family: 'ENJEUX', theme: 'Occupation du sol' },
  { id: 'ind:500', code: '500', label: 'BBR', unit: 'Classe', family: 'ENJEUX', theme: 'Sécurité sanitaire' },
  { id: 'ind:308', code: '308', label: 'Autres IOTA', unit: 'Nombre', family: 'ENJEUX', theme: 'Infrastructures et usages' },
  { id: 'ind:200', code: '200', label: 'Surface brûlée', unit: 'ha', family: 'MENACES', theme: 'Incendies' },
  { id: 'ind:201', code: '201', label: 'Surface érosion', unit: 'ha', family: 'MENACES', theme: 'Érosion' },
  { id: 'ind:301', code: '301', label: "Zone d'exploitation minière", unit: 'ha', family: 'MENACES', theme: 'Industries minières' },
]

export const catalogueById = (id: string) => CATALOGUE.find((i) => i.id === id)