import type { BvaepDef, CaptageDef, UniteGestionDef, IndicatorDef } from '@/types/domain'
import { detailOf } from './indicatorDetails'

export const UNITES_GESTIONES: UniteGestionDef[] = [
  { id: 'C-001', name: 'Koumac — Rivière Blanche', commune: 'Koumac', province: 'Province Nord', bvaep: 'Nord', kind: 'captage_superficiel' },
  { id: 'C-002', name: 'Voh — Forage F2', commune: 'Voh', province: 'Province Nord', bvaep: 'Nord', kind: 'forage' },
  { id: 'C-003', name: 'Pouembont — Tranchee du Col', commune: 'Pouembout', province: 'Province Nord', bvaep: 'Nord', kind: 'tranchee_drainante' },
  { id: 'C-004', name: 'Koné — Forage Nord', commune: 'Koné', province: 'Province Nord', bvaep: 'Nord', kind: 'forage' },
  { id: 'C-005', name: 'Poindimié — Ancien captage', commune: 'Poindimié', province: 'Province Nord', bvaep: 'Nord', kind: 'captage_superficiel' },
  { id: 'C-006', name: 'Houaïlou — Forage F1', commune: 'Houaïlou', province: 'Province Nord', bvaep: 'Centre', kind: 'forage' },
  { id: 'C-007', name: 'Canala — Tranchée de la Ouinnée', commune: 'Canala', province: 'Province Nord', bvaep: 'Centre', kind: 'tranchee_drainante' },
  { id: 'C-008', name: 'Boulouparis — Capture de la Néra', commune: 'Boulouparis', province: 'Province Sud', bvaep: 'Sud', kind: 'captage_superficiel' },
  { id: 'C-009', name: 'La Foa — Forage du Pont', commune: 'La Foa', province: 'Province Sud', bvaep: 'Sud', kind: 'forage' },
  { id: 'C-010', name: 'Sarraméa — Tranchée du Creek', commune: 'Sarraméa', province: 'Province Sud', bvaep: 'Sud', kind: 'tranchee_drainante' },
  { id: 'C-011', name: 'Poya — Rivière de Poya', commune: 'Poya', province: 'Province Nord', bvaep: 'Centre', kind: 'captage_superficiel' },
  { id: 'C-012', name: 'Kouaoua — Forage de la Mine', commune: 'Kouaoua', province: 'Province Nord', bvaep: 'Centre', kind: 'forage' },
]

export const CAPTAGES: CaptageDef[] = UNITES_GESTIONES

/** Coordonnées WGS84 réelles (lon, lat) des unités de gestion (communes). */
export const CAPTAGE_COORDS: Record<string, [number, number]> = {
  'C-001': [164.2619, -20.5621], // Koumac
  'C-002': [164.7, -20.9667], // Voh
  'C-003': [164.9, -21.13], // Pouembout
  'C-004': [164.8658, -21.0595], // Koné
  'C-005': [165.3293, -20.9496], // Poindimié
  'C-006': [165.6167, -21.2833], // Houaïlou
  'C-007': [165.95, -21.5333], // Canala
  'C-008': [166.05122, -21.86226], // Boulouparis
  'C-009': [165.83, -21.71], // La Foa
  'C-010': [165.85, -21.64], // Sarraméa
  'C-011': [165.15, -21.35], // Poya
  'C-012': [165.83, -21.4], // Kouaoua
}

type Row = [code: string, label: string, unit: string, family: 'ENJEUX' | 'MENACES', theme: string, group: string, datatype: 'stock' | 'qualite' | 'mixte', sourceLabel: string, timeSeries: boolean, desc: string]

const ROWS: Row[] = [
  // ── ENJEUX / Enjeux AEP ──────────────────────────────────────────────
  ['1', 'Capacité de production', 'm³/j', 'ENJEUX', 'Enjeux AEP', 'Importance captage', 'stock', 'Hydrométrie — stations DAVAR', false, 'Volume d’eau prélevable en respectant un objectif de gestion laissant 50 % de la ressource s’écouler vers l’aval.'],
  ['6', 'Population desservie', 'hab', 'ENJEUX', 'Enjeux AEP', 'Importance captage', 'stock', 'Fichiers DASS — abonnés UD', true, 'Nombre d’habitants alimentés par la ressource, calculé à partir du suivi des abonnés de l’unité de distribution.'],
  ['10', 'Statut captage', 'Classe', 'ENJEUX', 'Enjeux AEP', 'Importance captage', 'qualite', 'Référentiel captages', true, 'Ressource principale (actif), de secours ou occasionnelle pour l’unité de distribution.'],
  ['12', 'Établissements sensibles', 'Nb', 'ENJEUX', 'Enjeux AEP', 'Importance captage', 'stock', 'Base établissements (DASS)', false, 'Nombre d’établissements sensibles (hôpitaux, dispensaires, écoles) rattachés à l’unité de distribution.'],
  ['2', 'Longueur réseau', 'km', 'ENJEUX', 'Enjeux AEP', 'Niveau infrastructures', 'stock', 'Réseaux AEP (OEIL / Provinces)', true, 'Longueur approximative des réseaux d’adduction et de distribution de l’unité de distribution.'],
  ['3', 'Capacité réservoir', 'm³', 'ENJEUX', 'Enjeux AEP', 'Niveau infrastructures', 'stock', 'Réseaux AEPAGE (OEIL)', true, 'Volume de stockage des réservoirs d’eau de l’unité de distribution associée à la ressource.'],
  ['4', 'Traitement', 'Classe', 'ENJEUX', 'Enjeux AEP', 'Sécurité sanitaire et règlementaire', 'qualite', 'Référentiel DASS', false, 'Type de traitement de l’eau avant mise en distribution.'],
  ['7', 'Statut AODPE', 'Classe', 'ENJEUX', 'Enjeux AEP', 'Sécurité sanitaire et règlementaire', 'qualite', 'AODPE — DAVAR', false, 'Statut de l’autorisation de prélèvement et informations associées (numéro, période).'],
  ['8', 'Statut PPE', 'Classe', 'ENJEUX', 'Enjeux AEP', 'Sécurité sanitaire et règlementaire', 'qualite', 'PPE — Référentiel', false, 'Statut du périmètre de protection établi selon le type d’arrêté (immédiat, rapproché, éloigné).'],
  ['11', 'Statut du foncier', 'Classe', 'ENJEUX', 'Enjeux AEP', 'Sécurité sanitaire et règlementaire', 'qualite', 'Foncier — DJS', false, 'Nature foncière de la parcelle (terrain public, privé…) occupée par le prélèvement.'],
  ['5', 'Interconnexion', 'Classe', 'ENJEUX', 'Enjeux AEP', 'Vulnérabilité structurelle', 'qualite', 'Réseaux AEPAGE', false, 'Présence de connexions avec d’autres unités de distribution pouvant servir de secours.'],
  ['9', 'Type ouvrage', 'Classe', 'ENJEUX', 'Enjeux AEP', 'Vulnérabilité structurelle', 'qualite', 'Référentiel captages', false, 'Type de ressource en eau selon l’ouvrage : captage superficiel, forage ou tranchée drainante.'],
  // ── ENJEUX / Enjeux Environnementaux ─────────────────────────────────
  ['105', 'Occupation sol (couvert végétal)', 'ha', 'ENJEUX', 'Enjeux Environnementaux', 'Zone naturelle', 'stock', 'Occupation du sol (MOS / Dynamic World)', true, 'Superficie des intersections avec les zones de couvert végétal.'],
  ['106', 'Occupation sol (couvert forestier)', 'ha', 'ENJEUX', 'Enjeux Environnementaux', 'Zone naturelle', 'stock', 'Cornette forestière (OEIL)', true, 'Superficie des intersections avec les couvertures forestières non perturbée (EOEIL).'],
  ['100', 'Zones UNESCO', 'ha', 'ENJEUX', 'Enjeux Environnementaux', 'Zones protégées', 'stock', 'Zons UNESCO', false, 'Superficie des intersections avec les zones inscrites au patrimoine mondial de l’UNESCO, source exploitant le MOS 2014.'],
  ['101', 'Zones protégées provinciales', 'ha', 'ENJEUX', 'Enjeux Environnementaux', 'Zones protégées', 'stock', 'Provinces', false, 'Superficie des intersections avec les parcs et réserves provinciales de Nouvelle-Calédonie.'],
  ['102', 'KBA / ZICO', 'ha', 'ENJEUX', 'Enjeux Environnementaux', 'Zones protégées', 'stock', 'KBA / BirdLife', false, 'Superficie des intersections avec les zones d’intérêt biologique et de biodiversité spécifique.'],
  ['104', 'Espèces rares et menacées (forêt sèche)', 'ha', 'ENJEUX', 'Enjeux Environnementaux', 'Zones protégées', 'stock', 'Forêt sèche / espèces', false, 'Superficie des patchs de forêt sèche et zones de présence d’espèces rares et menacées.'],
  // ── MENACES / MENACES ANTHROPIQUES ───────────────────────────────────
  ['107', 'Occupation sol (surfaces agricoles)', 'ha', 'MENACES', 'MENACES ANTHROPIQUES', 'Activités à risque', 'stock', 'MOS 2014 (OEIL)', true, 'Superficie des intersections avec les zones agricoles (arables, agropastorales).'],
  ['300', 'ICPE', 'Nombre', 'MENACES', 'MENACES ANTHROPIQUES', 'Activités à risque', 'stock', 'Base ICPE — DIMENC', false, 'Dénombre les sites d’Installations Classées pour la Protection de l’Environnement.'],
  ['301', 'Zone d’exploitation minière', 'ha', 'MENACES', 'MENACES ANTHROPIQUES', 'Activités à risque', 'stock', 'Occupations minières', false, 'Surface occupée par les activités minières (autorisations d’exploiter, couvert minier).'],
  ['308', 'Autres IOTA', 'Nombre', 'MENACES', 'MENACES ANTHROPIQUES', 'Activités à risque', 'stock', 'IOTA / dépotoirs', true, 'Dénombre les installations ou activités potentiellement impactantes (cultures hors sol, dépotoirs).'],
  ['302', 'Urbanisation', 'ha', 'MENACES', 'MENACES ANTHROPIQUES', 'Infrastructures et usages', 'stock', 'Localisation / satellites', true, 'Surface des bâtiments présents sur l’aire d’alimentation de la ressource.'],
  ['304', 'Habitations', 'Nombre', 'MENACES', 'MENACES ANTHROPIQUES', 'Infrastructures et usages', 'stock', 'Recensement', false, 'Nombre de logements (résidences principales et secondaires) sur l’aire d’alimentation.'],
  ['305', 'Franchissements', 'Nombre', 'MENACES', 'MENACES ANTHROPIQUES', 'Infrastructures et usages', 'stock', 'Routes / Ouvrages d’art', false, 'Nombre d’ouvrages de franchissement (ponts, radiers) sur l’aire d’alimentation.'],
  ['306', 'Linéaire de routes', 'km', 'MENACES', 'MENACES ANTHROPIQUES', 'Infrastructures et usages', 'stock', 'Réseau routier', false, 'Linéaire total de voiries (RT, RP, RC, pistes) intersectant l’aire d’alimentation.'],
  ['307', 'Plan d’Urbanisme Directeur', 'Classe', 'MENACES', 'MENACES ANTHROPIQUES', 'Infrastructures et usages', 'qualite', 'PUD / Schémas', false, 'Zones de type d’occupation et dynamiques d’aménagement futur des zones urbanisables.'],
  ['503', 'Nombre de prélèvements AODPE', 'Nombre', 'MENACES', 'MENACES ANTHROPIQUES', 'Infrastructures et usages', 'stock', 'AODPE — DAVAR', true, 'Dénombre les points de prélèvements officiellement autorisés en amont de la ressource.'],
  ['504', 'Volume des prélèvements AODPE', 'm³/j', 'MENACES', 'MENACES ANTHROPIQUES', 'Infrastructures et usages', 'stock', 'AODPE — DAVAR', true, 'Volume total des autorisations de prélèvement journalières situées en amont.'],
  // ── MENACES / MENACES NATURELLES ─────────────────────────────────────
  ['200', 'Incendies cumulés', 'ha', 'MENACES', 'MENACES NATURELLES', 'Perturbations environnementales', 'stock', 'Zons incendies (VIIRS)', true, 'Surface totale touchée par les incendies ces dernières années.'],
  ['201', 'Surface érosion', 'ha', 'MENACES', 'MENACES NATURELLES', 'Perturbations environnementales', 'mixte', 'Cartographie des formations', true, 'Surface des zones où le sol est abîmé ou fragile.'],
  ['202', 'Terrain nu', 'ha', 'MENACES', 'MENACES NATURELLES', 'Perturbations environnementales', 'stock', 'MOS / satellite', true, 'Superficie de terrain sans végétation, hors zones d’exploitation.'],
  ['204', 'Espèces exotiques envahissantes (EEE)', 'Classe', 'MENACES', 'MENACES NATURELLES', 'Perturbations environnementales', 'qualite', 'Mâchoires / EEE', true, 'Présence de cerfs et de cochons basée sur le comptage des mâchoires.'],
  ['203', 'Glissement de terrain', 'ha', 'MENACES', 'MENACES NATURELLES', 'Sensibilité naturelle', 'stock', 'Aléa mouvements de terrain', false, 'Zones exposées aux glissements de terrain par la répartition des surfaces d’aléa.'],
  ['401', 'Géologie', 'Classe', 'MENACES', 'MENACES NATURELLES', 'Sensibilité naturelle', 'qualite', 'Carte géologique', false, 'Répartition des surfaces géologiques définissant les propriétés des sols (infiltrant, intermédiaire ou ruisseau).'],
  ['402', 'Vulnérabilité intrinsèque eaux souterraines', 'Classe', 'MENACES', 'MENACES NATURELLES', 'Sensibilité naturelle', 'qualite', 'Aquifères / IMVEL', false, 'Niveau de sensibilité naturelle du terrain à laisser passer l’eau via les aquifères.'],
  ['500', 'BBR', 'Classe', 'MENACES', 'MENACES NATURELLES', 'Sensibilité naturelle', 'qualite', 'Bonne vieille : Hydrométrie', true, 'Bilan Besoin Ressource calculant l’écart entre l’eau disponible et les besoins.'],
  ['501', 'Pluviométrie', 'mm', 'MENACES', 'MENACES NATURELLES', 'Sensibilité naturelle', 'stock', 'Météo-France / pluviométrie', true, 'Quantité de pluie moyenne reçue sur l’aire d’alimentation de la ressource.'],
]

export const CATALOGUE: IndicatorDef[] = ROWS.map((r) => {
  const id = `ind:${r[0]}`
  const detail = detailOf(id)
  return {
    id,
    code: r[0],
    label: detail?.label ?? r[1],
    unit: r[2],
    family: r[3],
    theme: detail?.theme ?? r[4],
    group: detail?.group ?? r[5],
    datatype: r[6],
    sourceLabel: r[7],
    hasTimeSeries: r[8],
    desc: detail?.desc ?? r[9],
    objectif: detail?.objectif ?? '',
  }
})

export const catalogueById = (id: string) => CATALOGUE.find((i) => i.id === id)

export const families = () => [...new Set(CATALOGUE.map((i) => i.family))] as IndicatorDef['family'][]

export const themesOfFamily = (family: IndicatorDef['family']) => [...new Set(CATALOGUE.filter((i) => i.family === family).map((i) => i.theme))].sort()

export const groupsOfFamily = (family: IndicatorDef['family']) =>
  [...new Set(CATALOGUE.filter((i) => i.family === family).map((i) => i.group))].sort()

export const groupsOfThemes = (family: IndicatorDef['family'], themes: Set<string>) =>
  [...new Set(CATALOGUE.filter((i) => i.family === family && themes.has(i.theme)).map((i) => i.group))].sort()

export const BVAEPS: BvaepDef[] = [
  { id: 'BV-01', name: 'Bassin versant du Nord', province: 'Province Nord', sector: 'Nord', captageRefs: ['C-001', 'C-002', 'C-003', 'C-004', 'C-005'] },
  { id: 'BV-02', name: 'Bassin versant du Centre', province: 'Province Nord', sector: 'Centre', captageRefs: ['C-006', 'C-007', 'C-011', 'C-012'] },
  { id: 'BV-03', name: 'Bassin versant du Sud', province: 'Province Sud', sector: 'Sud', captageRefs: ['C-008', 'C-009', 'C-010'] },
]

export const bvaepById = (id: string) => BVAEPS.find((b) => b.id === id)

export const bvaepsOfCaptage = (captageId: string) => BVAEPS.filter((b) => b.captageRefs.includes(captageId))

export const communes = () => [...new Set(UNITES_GESTIONES.map((c) => c.commune))].sort()

export const provinces = () => [...new Set(UNITES_GESTIONES.map((c) => c.province))].sort()

export const captagesOfBvaep = (bvId: string) => BVAEPS.find((b) => b.id === bvId)?.captageRefs.map((id) => CAPTAGES.find((c) => c.id === id)!).filter(Boolean) ?? []

export const communesIntersectingBvaep = (bvId: string) => [...new Set(captagesOfBvaep(bvId).map((c) => c.commune))].sort()

/** Anneaux WGS84 (lon, lat) des bassins versants régionaux le long de la chaîne calédonienne. */
export const BVAEP_OUTLINES: Record<string, [number, number][]> = {
  'BV-01': [
    [163.98, -20.5],
    [164.15, -20.32],
    [164.45, -20.18],
    [164.8, -20.2],
    [165.15, -20.35],
    [165.45, -20.52],
    [165.62, -20.7],
    [165.5, -20.92],
    [165.25, -21.08],
    [165.0, -21.18],
    [164.72, -21.16],
    [164.5, -21.0],
    [164.32, -20.8],
    [164.15, -20.68],
    [163.98, -20.5],
  ],
  'BV-02': [
    [164.68, -21.12],
    [164.95, -21.05],
    [165.25, -21.12],
    [165.55, -21.22],
    [165.9, -21.28],
    [166.2, -21.45],
    [166.38, -21.6],
    [166.3, -21.82],
    [166.05, -21.98],
    [165.7, -22.0],
    [165.4, -21.9],
    [165.15, -21.78],
    [164.95, -21.7],
    [164.78, -21.52],
    [164.66, -21.35],
    [164.68, -21.12],
  ],
  'BV-03': [
    [165.3, -21.75],
    [165.55, -21.6],
    [165.85, -21.62],
    [166.15, -21.78],
    [166.45, -21.86],
    [166.72, -22.0],
    [166.95, -22.2],
    [166.9, -22.42],
    [166.6, -22.5],
    [166.2, -22.45],
    [165.85, -22.35],
    [165.55, -22.28],
    [165.35, -22.05],
    [165.28, -21.88],
    [165.3, -21.75],
  ],
}