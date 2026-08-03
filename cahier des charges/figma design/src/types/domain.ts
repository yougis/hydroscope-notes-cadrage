export type IAMode = 'unifiee' | 'portail'

export interface ViewDef {
  id: string
  label: string
  group: string
  expertOnly: boolean
  desc: string
  epic: string
  mvp: boolean
}

export interface CaptageDef {
  id: string
  name: string
  commune: string
  province: string
  bvaep: string
  dist: number
}

export interface IndicatorDef {
  id: string
  code: string
  label: string
  unit: string
  family: 'ENJEUX' | 'MENACES'
  theme: string
}
