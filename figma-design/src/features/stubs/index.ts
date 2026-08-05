import type { ReactElement } from 'react'
import { TableauStub } from './TableauStub'
import { FichesStub } from './FichesStub'
import { ComparaisonStub } from './ComparaisonStub'
import { CatalogueStub } from './CatalogueStub'
import { ImportStub } from './ImportStub'
import { MonitoringStub } from './MonitoringStub'
import { TracabiliteStub } from './TracabiliteStub'
import { ReferentielsStub } from './ReferentielsStub'
import { ConnexionStub } from './ConnexionStub'

export const STUBS: Record<string, () => ReactElement> = {
  tableau: TableauStub,
  fiches: FichesStub,
  comparaison: ComparaisonStub,
  catalogue: CatalogueStub,
  import: ImportStub,
  monitoring: MonitoringStub,
  tracabilite: TracabiliteStub,
  referentiels: ReferentielsStub,
  connexion: ConnexionStub,
}