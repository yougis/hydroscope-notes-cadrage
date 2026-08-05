export type UnitMode = 'gestion' | 'bvaep'
export type DataType = 'stock' | 'qualite' | 'mixte'
export type PeriodRange = string

export interface ViewDef {
  id: string
  label: string
  group: string
  expertOnly: boolean
  desc: string
  epic: string
  mvp: boolean
}

export type CaptageKind = 'captage_superficiel' | 'forage' | 'tranchee_drainante'

export interface CaptageDef {
  id: string
  name: string
  commune: string
  province: string
  bvaep: string
  dist: number
}

export interface UniteGestionDef {
  id: string
  name: string
  commune: string
  province: string
  bvaep: string
  kind: CaptageKind
  dist: number
}

export type IndicatorFamily = 'ENJEUX' | 'MENACES'

export interface IndicatorDef {
  id: string
  code: string
  label: string
  unit: string
  family: IndicatorFamily
  theme: string
  group: string
  datatype: DataType
  sourceLabel: string
  hasTimeSeries: boolean
  desc: string
  objectif: string
}

/** Détails extraits de liste_flat_indicateurs.xlsx (source de vérité). */
export interface IndicatorDetail {
  family: string
  theme: string
  group: string
  label: string
  desc: string
  objectif: string
}

export interface BvaepDef {
  id: string
  name: string
  province: string
  sector: string
  captageRefs: string[]
}
