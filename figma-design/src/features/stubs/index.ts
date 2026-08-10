import type { ReactElement, FC } from 'react'
import { TableauStub } from './TableauStub'
import { FichesStub } from './FichesStub'
import { ImportStub } from './ImportStub'
import { MonitoringStub } from './MonitoringStub'
import { TracabiliteStub } from './TracabiliteStub'
import { ReferentielsView } from '@/features/referentiels/ReferentielsView'
import { ConnexionStub } from './ConnexionStub'
import { CatalogueView } from '@/features/catalogue'

interface StubProps {
  onNavigate: (view: string) => void
  location: { pathname: string; search: string }
}

export const STUBS: Record<string, FC<StubProps>> = {
  tableau: TableauStub,
  fiches: FichesStub,
  catalogue: CatalogueView,
  import: ImportStub,
  monitoring: MonitoringStub,
  tracabilite: TracabiliteStub,
  referentiels: ReferentielsView,
  connexion: ConnexionStub,
}