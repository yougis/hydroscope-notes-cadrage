import { useState, type ReactElement, type ReactNode } from 'react'

type IAMode = 'unifiee' | 'portail'

interface ViewDef {
  id: string
  label: string
  group: string
  expertOnly: boolean
  desc: string
  epic: string
  mvp: boolean
}

const VIEWS: ViewDef[] = [
  { id: 'carte', label: 'Carte des territoires', group: 'Exploration', expertOnly: false, desc: 'Zone de travail : sélecteur de captages et forages à gauche, carte et couches au centre, catalogue d’indicateurs à droite. Les indicateurs ajoutés ouvrent une page dédiée dans la sidebar.', epic: 'EPIC 6', mvp: true },
  { id: 'tableau', label: 'Tableau de bord', group: 'Exploration', expertOnly: false, desc: 'Vue d’ensemble par territoire : chiffres clés, évolution dans le temps, comparaison de périodes, tendances et alertes.', epic: 'EPIC 6', mvp: true },
  { id: 'fiches', label: 'Fiches des territoires', group: 'Exploration', expertOnly: false, desc: 'Fiches structurées par unité (commune, bassin versant, point de captage, périmètre de protection) et fiches indicateurs, avec rapports exportables.', epic: 'EPIC 7', mvp: true },
  { id: 'comparaison', label: 'Comparer les territoires', group: 'Exploration', expertOnly: true, desc: 'Comparaison de plusieurs territoires ou unités, visualisation simultanée et filtres cohérents entre les vues.', epic: 'EPIC 6', mvp: false },
  { id: 'indicateurs', label: 'Indicateurs', group: 'Données', expertOnly: false, desc: 'Liste des indicateurs (~40) : unité, échelle d’interprétation, méthode de calcul, seuils et sources.', epic: 'EPIC 1bis / 4', mvp: true },
  { id: 'catalogue', label: 'Données disponibles', group: 'Données', expertOnly: true, desc: 'Inventaire des jeux de données sources et dérivés, métadonnées, lien source → transformation → indicateur.', epic: 'EPIC 1bis', mvp: true },
  { id: 'import', label: 'Ajout de données', group: 'Données', expertOnly: true, desc: 'Intégration par fichiers (CSV, SIG) ou API, planification, normalisation, gestion des erreurs et rejeu de traitements.', epic: 'EPIC 1', mvp: true },
  { id: 'monitoring', label: 'Supervision', group: 'Suivi', expertOnly: true, desc: 'Suivi technique (imports, connexions, performances), qualité des données (fraîcheur, complétude, anomalies) et veille environnementale.', epic: 'Monitoring', mvp: true },
  { id: 'tracabilite', label: 'Historique & traçabilité', group: 'Suivi', expertOnly: true, desc: 'Cycle de vie des données : versioning, journal des actions, reconstitution d’un état ou d’un calcul à une date donnée.', epic: 'EPIC 10', mvp: true },
  { id: 'referentiels', label: 'Référentiels', group: 'Administration', expertOnly: true, desc: 'Gestion des objets géographiques (bassins versants, captages, périmètres, grille d’analyse), des indicateurs et des profils.', epic: 'EPIC 3', mvp: true },
  { id: 'connexion', label: 'Connexion', group: 'Administration', expertOnly: true, desc: 'Authentification, gestion des droits d’accès et des sessions, conformité RGPD.', epic: 'EPIC 9', mvp: true },
]

const GROUP_ORDER = ['Exploration', 'Données', 'Suivi', 'Administration']

const GROUPS = GROUP_ORDER.map((g) => ({
  name: g,
  views: VIEWS.filter((v) => v.group === g),
}))

/* ---------- Données de session (wireframe) ---------- */

interface CaptageDef {
  id: string
  name: string
  commune: string
  province: string
  bvaep: string
  dist: number
}

const CAPTAGES: CaptageDef[] = [
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

const CAPTAGE_POINTS: Array<{ key: string; x: number; y: number }> = [
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

interface IndicatorDef {
  id: string
  code: string
  label: string
  unit: string
  family: 'ENJEUX' | 'MENACES'
  theme: string
}

const CATALOGUE: IndicatorDef[] = [
  { id: 'ind:105', code: '105', label: 'Occupation du sol (couvert végétal)', unit: 'ha', family: 'ENJEUX', theme: 'Occupation du sol' },
  { id: 'ind:500', code: '500', label: 'BBR', unit: 'Classe', family: 'ENJEUX', theme: 'Sécurité sanitaire' },
  { id: 'ind:308', code: '308', label: 'Autres IOTA', unit: 'Nombre', family: 'ENJEUX', theme: 'Infrastructures et usages' },
  { id: 'ind:200', code: '200', label: 'Surface brûlée', unit: 'ha', family: 'MENACES', theme: 'Incendies' },
  { id: 'ind:201', code: '201', label: 'Surface érosion', unit: 'ha', family: 'MENACES', theme: 'Érosion' },
  { id: 'ind:301', code: '301', label: "Zone d'exploitation minière", unit: 'ha', family: 'MENACES', theme: 'Industries minières' },
]

const catalogueById = (id: string) => CATALOGUE.find((i) => i.id === id)

interface WireframeBlock {
  label: string
  className: string
}

function WireframeBlock({ label, className }: WireframeBlock) {
  return (
    <div className={`flex items-center justify-center rounded-md border border-dashed border-neutral-300 bg-neutral-100 text-center text-xs font-medium text-neutral-400 ${className}`}>
      {label}
    </div>
  )
}

/* ---------- Carte : fond filaire + calques ---------- */

function MapCanvas({ showGrid = true, selectedKeys = [] }: { showGrid?: boolean; selectedKeys?: string[] }) {
  return (
    <svg viewBox="0 0 600 420" className="h-full w-full" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Carte filaire de la Nouvelle-Calédonie">
      {showGrid && (
        <g>
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="420" stroke="#e5e7eb" strokeWidth="1" />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50} stroke="#e5e7eb" strokeWidth="1" />
          ))}
        </g>
      )}

      {/* Grande Terre + îles */}
      <polygon
        points="70,170 180,130 300,120 420,145 520,180 545,195 480,225 330,235 200,220 110,200 70,185"
        fill="#f4f4f5"
        stroke="#a1a1aa"
        strokeWidth="1.5"
      />
      <ellipse cx="545" cy="90" rx="26" ry="14" fill="#fafafa" stroke="#a1a1aa" strokeWidth="1" />
      <ellipse cx="575" cy="120" rx="18" ry="10" fill="#fafafa" stroke="#a1a1aa" strokeWidth="1" />

      {/* BVAEP — contours en pointillés */}
      <polygon points="100,160 200,120 260,150 210,200 130,195" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 4" />
      <polygon points="230,170 340,130 410,160 360,215 250,215" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 4" />
      <polygon points="400,150 520,175 510,215 420,200" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 4" />

      {/* PPE — cercles en pointillés */}
      <circle cx="180" cy="165" r="22" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx="330" cy="175" r="26" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* Points de captage */}
      {CAPTAGE_POINTS.map((p) => {
        const sel = selectedKeys.includes(p.key)
        return (
          <g key={p.key}>
            <circle cx={p.x} cy={p.y} r={sel ? 6 : 4.5} fill={sel ? '#f59e0b' : '#3b82f6'} stroke="#fff" strokeWidth={sel ? 2 : 1.5} />
          </g>
        )
      })}

      {/* Zone d’alerte (incendies) */}
      <ellipse cx="350" cy="160" rx="30" ry="16" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  )
}

function LineChart({ className = '' }: { className?: string }) {
  const pts = '0,72 40,64 80,68 120,50 160,54 200,38 240,44 280,30 320,34 360,20'
  return (
    <svg viewBox="0 0 360 80" className={className} preserveAspectRatio="none" role="img" aria-label="Graphique d’évolution">
      <rect width="360" height="80" fill="#fafafa" />
      {[20, 40, 60].map((y) => (
        <line key={y} x1="0" y1={y} x2="360" y2={y} stroke="#ececec" strokeWidth="1" />
      ))}
      <polyline points={pts} fill="none" stroke="#3b82f6" strokeWidth="2" />
      <circle cx="360" cy="20" r="3" fill="#3b82f6" />
    </svg>
  )
}

function BarChart({ className = '' }: { className?: string }) {
  const bars = [26, 40, 32, 55, 44, 62, 38, 48, 58, 42, 50, 46]
  const w = 360 / bars.length
  return (
    <svg viewBox={`0 0 360 80`} className={className} preserveAspectRatio="none" role="img" aria-label="Répartition par bassin versant">
      <rect width="360" height="80" fill="#fafafa" />
      {bars.map((h, i) => (
        <rect key={i} x={i * w + 2} y={80 - h} width={w - 4} height={h} rx="2" fill="#93c5fd" />
      ))}
    </svg>
  )
}

function Toggle({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <label className="flex cursor-pointer select-none items-center gap-2">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={onClick}
        className={`relative h-4 w-7 rounded-full transition ${on ? 'bg-blue-600' : 'bg-neutral-300'}`}
      >
        <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${on ? 'left-3.5' : 'left-0.5'}`} />
      </button>
      <span className="text-xs text-neutral-600">{label}</span>
    </label>
  )
}

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const VIEW_ICONS: Record<string, ReactElement> = {
  carte: (
    <Icon>
      <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4L1 6z" />
      <path d="M8 2v16" />
      <path d="M16 6v16" />
    </Icon>
  ),
  tableau: (
    <Icon>
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </Icon>
  ),
  fiches: (
    <Icon>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </Icon>
  ),
  comparaison: (
    <Icon>
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M14 15H9v-5" />
      <path d="M16 3h5v5" />
      <path d="M21 3l-7 7" />
    </Icon>
  ),
  indicateurs: (
    <Icon>
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </Icon>
  ),
  catalogue: (
    <Icon>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5" />
      <path d="M3 12a9 3 0 0 0 18 0" />
    </Icon>
  ),
  import: (
    <Icon>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5" />
      <path d="M12 15V3" />
    </Icon>
  ),
  monitoring: (
    <Icon>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </Icon>
  ),
  tracabilite: (
    <Icon>
      <path d="M3 3v5h5" />
      <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" />
      <path d="M12 7v5l4 2" />
    </Icon>
  ),
  referentiels: (
    <Icon>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <path d="M7 7h.01" />
    </Icon>
  ),
  connexion: (
    <Icon>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </Icon>
  ),
}

interface CarteViewProps {
  selected: Set<string>
  onToggleCaptage: (id: string) => void
  onAssistedSelect: () => void
  sessionIndicators: string[]
  onToggleIndicator: (id: string) => void
  onOpenCatalogue: () => void
}

const LAYER_DEFS = [
  { key: 'bv', label: 'Bassins versants', on: true },
  { key: 'capt', label: 'Captages', on: true },
  { key: 'ppe', label: 'Périmètres', on: true },
  { key: 'risque', label: 'Zones à risque', on: false },
  { key: 'sat', label: 'Satellite', on: false },
]

function CarteView({ selected, onToggleCaptage, onAssistedSelect, sessionIndicators, onToggleIndicator, onOpenCatalogue }: CarteViewProps) {
  const [layers, setLayers] = useState(LAYER_DEFS)
  const selectedKeys = CAPTAGE_POINTS.filter((p) => selected.has(p.key)).map((p) => p.key)

  return (
    <div className="flex h-full gap-3">
      {/* ——— Colonne gauche : sélecteur de captages / forages ——— */}
      <aside className="flex w-72 shrink-0 flex-col gap-3 overflow-y-auto rounded-md border border-neutral-200 bg-white p-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-700">Captages / forages</span>
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">{selected.size} sélectionnés</span>
        </div>

        <div className="flex items-center gap-2 rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-neutral-400">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 stroke-neutral-400" fill="none" strokeWidth="1.5">
            <circle cx="7" cy="7" r="4.5" />
            <line x1="10.5" y1="10.5" x2="14" y2="14" />
          </svg>
          Recherche (nom, commune, bassin versant)…
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          <span className="rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1 text-center text-[11px] text-neutral-600">Commune ▾</span>
          <span className="rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1 text-center text-[11px] text-neutral-600">Province ▾</span>
          <span className="rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1 text-center text-[11px] text-neutral-600">Bassins versants ▾</span>
        </div>

        <button onClick={onAssistedSelect} className="flex items-center gap-1.5 rounded-md border border-blue-500 bg-blue-50 px-2 py-1 text-left text-[11px] font-medium text-blue-700 hover:bg-blue-100">
          <Icon>
            <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
          </Icon>
          Sélection assistée — 10 captages les plus exposés
        </button>

        <div className="flex items-center justify-between border-b border-neutral-100 pb-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Liste</span>
          <span className="rounded border border-neutral-300 bg-white px-2 py-0.5 text-[10px] text-neutral-500">Trier : distance ▾</span>
        </div>

        <ul className="space-y-1">
          {CAPTAGES.map((c) => {
            const isSel = selected.has(c.id)
            return (
              <li key={c.id} className={`flex items-center gap-2 rounded-md border px-2 py-1.5 ${isSel ? 'border-blue-300 bg-blue-50' : 'border-neutral-200 bg-white'}`}>
                <button onClick={() => onToggleCaptage(c.id)} className="min-w-0 flex-1 text-left">
                  <span className="block truncate text-xs font-medium text-neutral-800">{c.name}</span>
                  <span className="block truncate text-[10px] text-neutral-400">{c.commune} · Bassin versant {c.bvaep}</span>
                </button>
                <span className="text-[10px] text-neutral-400">{c.dist} km</span>
                <button onClick={() => onToggleCaptage(c.id)} title="Retirer" aria-label={`Retirer ${c.name}`} className="text-neutral-300 hover:text-red-500">
                  <Icon>
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </Icon>
                </button>
              </li>
            )
          })}
        </ul>
      </aside>

      {/* ——— Centre : carte + barre de couches ——— */}
      <div className="relative min-w-0 flex-1 overflow-hidden rounded-md border border-neutral-200 bg-white">
        <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-1.5 border-b border-neutral-100 bg-white/95 p-2">
          <span className="rounded-md px-1.5 text-[11px] font-medium text-neutral-600">Carte des captages</span>
          {layers.map((l) => (
            <button
              key={l.key}
              onClick={() => setLayers((prev) => prev.map((x) => (x.key === l.key ? { ...x, on: !x.on } : x)))}
              className={`rounded-full border px-2 py-0.5 text-[10px] transition ${l.on ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-neutral-200 bg-white text-neutral-400'}`}
            >
              {l.label}
            </button>
          ))}
          <span className="ml-auto rounded-md border border-neutral-300 bg-white px-2 py-1 text-[11px] text-neutral-500">Période : 2016 — 2026 ▾</span>
        </div>
        <MapCanvas selectedKeys={selectedKeys} />
        <div className="absolute bottom-3 left-3 rounded-md border border-neutral-200 bg-white p-2 text-[11px] leading-relaxed text-neutral-500">
          <span className="mb-1 block font-semibold text-neutral-700">Légende</span>
          <span className="flex items-center gap-1.5"><span className="h-0 w-0 border-y-4 border-l-4 border-y-transparent border-l-neutral-400" /> Bassin versant</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Captage</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500" /> Captage sélectionné</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full border border-dashed border-neutral-500" /> Périmètre de protection</span>
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <span className="rounded border border-neutral-300 bg-white px-2 py-1 text-[11px] text-neutral-500">0 — 50 km</span>
          <span className="flex h-9 w-9 items-center justify-center rounded border border-neutral-300 bg-white text-xs font-bold text-neutral-600">N</span>
        </div>
        <div className="absolute right-3 top-12 flex flex-col gap-1">
          <span className="flex h-8 w-8 items-center justify-center rounded border border-neutral-300 bg-white text-sm font-bold text-neutral-600">+</span>
          <span className="flex h-8 w-8 items-center justify-center rounded border border-neutral-300 bg-white text-sm font-bold text-neutral-600">−</span>
        </div>
      </div>

      {/* ——— Colonne droite : catalogue des indicateurs ——— */}
      <aside className="flex w-80 shrink-0 flex-col gap-3 overflow-y-auto rounded-md border border-neutral-200 bg-white p-3">
        <div>
          <span className="text-xs font-semibold text-neutral-700">Catalogue d’indicateurs</span>
          <p className="mt-0.5 text-[10px] text-neutral-400">Ajouter un indicateur → sa page s’ouvre dans le menu « Indicateurs ».</p>
        </div>

        <div className="flex items-center gap-2 rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-neutral-400">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 stroke-neutral-400" fill="none" strokeWidth="1.5">
            <circle cx="7" cy="7" r="4.5" />
            <line x1="10.5" y1="10.5" x2="14" y2="14" />
          </svg>
          Rechercher un indicateur…
        </div>

        {(['ENJEUX', 'MENACES'] as const).map((fam) => (
          <div key={fam}>
            <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">{fam}</div>
            <div className="space-y-1.5">
              {CATALOGUE.filter((i) => i.family === fam).map((ind) => {
                const added = sessionIndicators.includes(ind.id)
                return (
                  <div key={ind.id} className={`rounded-md border p-2 ${added ? 'border-blue-300 bg-blue-50' : 'border-neutral-200 bg-white'}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="truncate text-xs font-medium text-neutral-800">{ind.code} · {ind.label}</div>
                        <div className="text-[10px] text-neutral-400">{ind.theme} · unité {ind.unit}</div>
                      </div>
                      <button
                        onClick={() => onToggleIndicator(ind.id)}
                        title={added ? 'Retirer de la session' : 'Ajouter à la session'}
                        aria-label={added ? 'Retirer' : 'Ajouter'}
                        className={added ? 'text-blue-600' : 'text-neutral-300 hover:text-blue-600'}
                      >
                        <Icon>
                          {added ? (
                            <>
                              <path d="M18 6 6 18" />
                              <path d="m6 6 12 12" />
                            </>
                          ) : (
                            <>
                              <path d="M12 5v14" />
                              <path d="M5 12h14" />
                            </>
                          )}
                        </Icon>
                      </button>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className={`text-[10px] font-medium ${added ? 'text-blue-600' : 'text-neutral-400'}`}>
                        {added ? 'Ajouté à la session' : 'Ajouter à la session'}
                      </span>
                      <button onClick={onOpenCatalogue} className="text-[10px] text-neutral-500 underline hover:text-blue-600">
                        Fiche & métadonnées
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <div className="mt-auto rounded-md border border-dashed border-neutral-300 bg-neutral-50 p-2 text-[11px] text-neutral-400">
          Favoris · fraîcheur &amp; qualité des données · compatibilité (AMC post-MVP) détaillées dans chaque fiche.
        </div>
      </aside>
    </div>
  )
}

/* ---------- Page indicateur (session) ---------- */

interface IndicateurPageProps {
  id: string
  selected: Set<string>
  onRemove: (id: string) => void
  onOpenFiche: () => void
}

function IndicateurPage({ id, selected, onRemove, onOpenFiche }: IndicateurPageProps) {
  const ind = catalogueById(id)!
  const captages = CAPTAGES.filter((c) => selected.has(c.id))
  const values = captages.map((c, i) => ({ c, v: 186 - i * 13 + (c.id.charCodeAt(3) % 5) * 6 }))

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2 rounded-md border border-neutral-200 bg-white p-3">
        <span className="text-sm font-semibold text-neutral-800">{ind.code} · {ind.label}</span>
        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] text-neutral-500">{ind.family} / {ind.theme}</span>
        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] text-neutral-500">unité {ind.unit}</span>
        <button onClick={onOpenFiche} className="ml-auto rounded border border-neutral-300 bg-white px-3 py-1 text-xs text-neutral-600 hover:bg-neutral-50">
          Fiche & métadonnées
        </button>
        <button onClick={() => onRemove(id)} className="rounded border border-red-200 bg-red-50 px-3 py-1 text-xs text-red-600 hover:bg-red-100">
          Retirer
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { k: 'Valeur sur la sélection', v: '1 240 ha' },
          { k: 'Tendance 10 ans', v: '+18 %' },
          { k: 'Captages concernés', v: `${captages.length} / ${selected.size}` },
          { k: 'Fraîcheur donnée', v: 'Il y a 7 j' },
        ].map((s) => (
          <div key={s.k} className="rounded-md border border-neutral-200 bg-white p-3">
            <span className="block text-[11px] uppercase tracking-wide text-neutral-400">{s.k}</span>
            <span className="mt-1 block text-xl font-semibold text-neutral-800">{s.v}</span>
          </div>
        ))}
      </div>

      <div className="grid flex-1 grid-cols-2 gap-4">
        <div className="flex flex-col rounded-md border border-neutral-200 bg-white p-3">
          <span className="mb-1 text-[11px] font-semibold text-neutral-600">Évolution annuelle — captages sélectionnés</span>
          <LineChart className="min-h-28 w-full flex-1" />
          <span className="flex justify-between text-[10px] text-neutral-400"><span>2016</span><span>2021</span><span>2026</span></span>
        </div>
        <div className="flex flex-col rounded-md border border-neutral-200 bg-white p-3">
          <span className="mb-1 text-[11px] font-semibold text-neutral-600">Comparaison inter-captages</span>
          <BarChart className="min-h-28 w-full flex-1" />
        </div>
      </div>

      {captages.length === 0 ? (
        <WireframeBlock label="Aucun captage sélectionné — sélectionnez des captages depuis la carte." className="min-h-24 w-full" />
      ) : (
        <div className="overflow-hidden rounded-md border border-neutral-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
              <tr>
                <th className="px-3 py-2 font-medium">Rang</th>
                <th className="px-3 py-2 font-medium">Captage</th>
                <th className="px-3 py-2 font-medium">Commune · Bassin versant</th>
                <th className="px-3 py-2 font-medium">Valeur ({ind.unit})</th>
                <th className="px-3 py-2 font-medium">Évolution 5 ans</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {values.map((r, i) => (
                <tr key={r.c.id} className="hover:bg-neutral-50">
                  <td className="px-3 py-2 text-neutral-400">#{i + 1}</td>
                  <td className="px-3 py-2 font-medium">{r.c.name}</td>
                  <td className="px-3 py-2 text-neutral-500">{r.c.commune} · Bassin versant {r.c.bvaep}</td>
                  <td className="px-3 py-2 font-medium">{r.v} {ind.unit}</td>
                  <td className="px-3 py-2">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${i < 2 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
                      {i < 2 ? `+${(i + 2) * 11} %` : `+${(i + 1) * 4} %`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

/* ---------- Vue portail public (option « 2 apps distinctes ») ---------- */

function PortailPublic({ onOpenExpert }: { onOpenExpert: () => void }) {
  return (
    <div className="flex h-screen flex-col bg-neutral-50 text-neutral-800">
      <header className="flex h-14 shrink-0 items-center gap-6 border-b border-neutral-200 bg-white px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-600 text-sm font-bold text-white">H</div>
          <div className="leading-tight">
            <div className="text-sm font-bold">HydroScope</div>
            <div className="text-[10px] text-neutral-400">Le portail de l’eau potable</div>
          </div>
        </div>
        <nav className="flex items-center gap-1 text-sm text-neutral-600">
          {['Accueil', 'Carte', 'Indicateurs', 'Fiches des territoires', 'À propos'].map((l) => (
            <span key={l} className={`rounded-md px-3 py-1.5 ${l === 'Accueil' ? 'bg-emerald-50 font-medium text-emerald-700' : 'hover:bg-neutral-100'}`}>
              {l}
            </span>
          ))}
        </nav>
        <button
          onClick={onOpenExpert}
          className="ml-auto rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
        >
          Espace experts →
        </button>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto">
        <section className="border-b border-neutral-200 bg-white px-6 py-8">
          <h1 className="max-w-2xl text-2xl font-bold leading-tight">
            La qualité de l’eau potable en Nouvelle-Calédonie, cartographiée et suivie dans le temps.
          </h1>
          <p className="mt-2 max-w-xl text-sm text-neutral-500">
            Bassins versants, points de captage, périmètres de protection : explorez les données publiques de votre territoire.
          </p>
          <div className="mt-4 flex w-full max-w-xl items-center gap-2 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-400">
            <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 stroke-neutral-400" fill="none" strokeWidth="1.5">
              <circle cx="7" cy="7" r="4.5" />
              <line x1="10.5" y1="10.5" x2="14" y2="14" />
            </svg>
            Rechercher une commune, un cours d’eau, un captage…
          </div>
        </section>

        <section className="grid grid-cols-4 gap-3 px-6 py-4">
          {[
            { k: 'Territoires suivis', v: '12 bassins versants' },
            { k: 'Points de captage', v: '~500' },
            { k: 'Périmètres de protection', v: '~250' },
            { k: 'Alertes actives', v: '3', warn: true },
          ].map((s) => (
            <div key={s.k} className="rounded-md border border-neutral-200 bg-white p-4">
              <span className="block text-[11px] uppercase tracking-wide text-neutral-400">{s.k}</span>
              <span className={`mt-1 block text-xl font-semibold ${s.warn ? 'text-amber-600' : 'text-neutral-800'}`}>{s.v}</span>
            </div>
          ))}
        </section>

        <section className="px-6 pb-6">
          <div className="relative h-72 overflow-hidden rounded-lg border border-neutral-200 bg-white">
            <MapCanvas showGrid={false} />
            <div className="absolute bottom-3 left-3 rounded-md border border-neutral-200 bg-white p-2 text-[11px] text-neutral-500">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Point de captage</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full border border-dashed border-neutral-500" /> Périmètre de protection</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex h-10 shrink-0 items-center justify-between border-t border-neutral-200 bg-white px-6 text-[11px] text-neutral-400">
        <span>HydroScope · Portail public — démonstration « 2 apps distinctes » (option 3)</span>
        <span>Données publiques · OEIL &amp; partenaires</span>
      </footer>
    </div>
  )
}

/* ---------- Stubs des autres vues ---------- */

function TableauStub() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3 rounded-md border border-neutral-200 bg-white p-3">
        <span className="text-xs font-semibold text-neutral-700">Territoire</span>
        <span className="rounded border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs text-neutral-600">Bassin versant du Nord</span>
        <span className="text-xs font-semibold text-neutral-700">Indicateur</span>
        <span className="rounded border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs text-neutral-600">Surface brûlée (ha)</span>
        <span className="text-xs font-semibold text-neutral-700">Période</span>
        <span className="rounded border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs text-neutral-600">2016 — 2026</span>
        <span className="ml-auto rounded border border-blue-500 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">Exporter</span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[
          { k: 'Valeur actuelle', v: '1 240 ha' },
          { k: 'Tendance 10 ans', v: '+18 %' },
          { k: 'Rang territorial', v: '#4 / 12' },
          { k: 'Fraîcheur donnée', v: 'Il y a 7 j' },
        ].map((s) => (
          <div key={s.k} className="rounded-md border border-neutral-200 bg-white p-3">
            <span className="block text-[11px] uppercase tracking-wide text-neutral-400">{s.k}</span>
            <span className="mt-1 block text-xl font-semibold text-neutral-800">{s.v}</span>
          </div>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-2 gap-4">
        <div className="flex flex-col rounded-md border border-neutral-200 bg-white p-3">
          <span className="mb-1 text-[11px] font-semibold text-neutral-600">Évolution annuelle</span>
          <LineChart className="min-h-28 w-full flex-1" />
        </div>
        <div className="flex flex-col rounded-md border border-neutral-200 bg-white p-3">
          <span className="mb-1 text-[11px] font-semibold text-neutral-600">Comparaison de périodes</span>
          <BarChart className="min-h-28 w-full flex-1" />
        </div>
      </div>
    </div>
  )
}

function FichesStub() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2">
        {['Commune', 'Bassin versant', 'Captage / Forage', 'Périmètre de protection', 'Indicateur'].map((t) => (
          <span key={t} className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs text-neutral-600">
            {t}
          </span>
        ))}
        <span className="ml-auto rounded border border-blue-500 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">Rapport PDF</span>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-4">
        <WireframeBlock label="Carte du périmètre" className="min-h-40 w-full" />
        <WireframeBlock label="Caractéristiques & unités de gestion" className="min-h-40 w-full" />
        <WireframeBlock label="Indicateurs associés" className="min-h-40 w-full" />
      </div>
      <WireframeBlock label="Visualisation des évolutions & comparaison descriptive entre unités" className="min-h-32 w-full" />
    </div>
  )
}

function ComparaisonStub() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded border border-blue-500 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">Bassin versant Nord</span>
        <span className="rounded border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs text-neutral-600">Bassin versant Sud</span>
        <span className="rounded border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs text-neutral-600">Bassin versant Centre</span>
        <span className="ml-auto rounded border border-neutral-300 bg-white px-3 py-1 text-xs text-neutral-500">Ajouter un territoire</span>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-4">
        <WireframeBlock label="Cartes comparatives côte à côte" className="min-h-48 w-full" />
        <div className="flex flex-col gap-4">
          <WireframeBlock label="Comparaison d’indicateurs (radar / barres)" className="min-h-32 w-full" />
          <WireframeBlock label="Séries temporelles superposées" className="min-h-32 w-full" />
        </div>
      </div>
    </div>
  )
}

function IndicateursStub() {
  const rows = [
    ['308', 'Autres IOTA', 'Nombre', 'oui'],
    ['500', 'BBR', 'Classe', 'oui'],
    ['200', 'Surface brûlée', 'ha', 'oui'],
    ['201', 'Surface érosion', 'ha', 'oui'],
    ['301', 'Zone d’exploitation minière', 'ha', 'oui'],
    ['105', 'Occupation sol (couvert végétal)', 'ha', 'oui'],
  ]
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="flex-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-400">Rechercher un indicateur…</span>
        <span className="rounded border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-600">Thématique</span>
        <span className="rounded border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-600">Unité</span>
        <span className="rounded border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-600">Actif</span>
      </div>
      <div className="overflow-hidden rounded-md border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-3 py-2 font-medium">ID</th>
              <th className="px-3 py-2 font-medium">Nom</th>
              <th className="px-3 py-2 font-medium">Unité</th>
              <th className="px-3 py-2 font-medium">Actif</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-neutral-700">
            {rows.map((r) => (
              <tr key={r[0]} className="hover:bg-neutral-50">
                <td className="px-3 py-2 text-neutral-500">{r[0]}</td>
                <td className="px-3 py-2 font-medium">{r[1]}</td>
                <td className="px-3 py-2 text-neutral-500">{r[2]}</td>
                <td className="px-3 py-2">
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {r[3]}
                  </span>
                </td>
                <td className="px-3 py-2 text-right text-xs text-blue-600">Fiche</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <span className="text-xs text-neutral-400">40 indicateurs · catalogue de fiches descriptives</span>
    </div>
  )
}

function CatalogueStub() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="flex-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-400">Rechercher un jeu de données…</span>
        <span className="rounded border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-600">Source / dérivé</span>
        <span className="rounded border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-600">Statut</span>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-4">
        {[
          ['Captages d’eau', 'GEOREP · DAVAR', 'Disponible'],
          ['Zones potentiellement brûlées (VIIRS)', 'GEOREP · OEIL', 'Disponible'],
          ['Occupation du sol (Dynamic World)', 'GEE API', 'Disponible'],
          ['Espèces envahissantes', 'ANCB', 'Pas d’API'],
          ['Surface brûlée (dérivé)', 'Pipeline dbt', 'Dérivé'],
          ['Pluviométrie — Météo France', 'GEOREP', 'Disponible'],
        ].map((d) => (
          <div key={d[0]} className="rounded-md border border-neutral-200 bg-white p-3">
            <span className="block text-sm font-medium text-neutral-800">{d[0]}</span>
            <span className="mt-1 block text-xs text-neutral-500">{d[1]}</span>
            <span className="mt-2 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">{d[2]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ImportStub() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="rounded border border-blue-500 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">+ Nouvel import</span>
        <span className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-600">Planifier</span>
        <span className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-600">Connecter une API</span>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <WireframeBlock label="Glisser-déposer un fichier (CSV, GeoJSON, Shapefile…)" className="min-h-36 w-full" />
          <WireframeBlock label="Paramètres de l’import (structure, fréquence, format)" className="min-h-28 w-full" />
        </div>
        <div className="flex flex-col gap-3">
          <span className="rounded-md border border-neutral-200 bg-white p-3 text-xs font-semibold text-neutral-600">Historique des imports</span>
          {[
            ['2026-08-01 06:00', 'Captages — GEOREP', 'Succès', 'emerald'],
            ['2026-07-31 06:00', 'VIIRS brûlé', 'Succès', 'emerald'],
            ['2026-07-30 12:30', 'MOS vectorisés', 'Échec', 'red'],
          ].map((row) => (
            <div key={row[1]} className="flex items-center justify-between rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs">
              <span className="text-neutral-500">{row[0]}</span>
              <span className="font-medium text-neutral-700">{row[1]}</span>
              <span className={`font-medium ${row[3] === 'red' ? 'text-red-600' : 'text-emerald-600'}`}>{row[2]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MonitoringStub() {
  const cards = [
    { t: 'Import récents', v: '128 / 132', s: '4 échecs' },
    { t: 'Connexions sources', v: '30 / 32', s: '2 alertes' },
    { t: 'Disponibilité 30 j', v: '99,2 %', s: 'Objectif ≥ 98 %' },
    { t: 'Temps de réponse', v: '1,4 s', s: '< 3 s' },
  ]
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="grid grid-cols-4 gap-3">
        {cards.map((c) => (
          <div key={c.t} className="rounded-md border border-neutral-200 bg-white p-3">
            <span className="block text-[11px] uppercase tracking-wide text-neutral-400">{c.t}</span>
            <span className="mt-1 block text-xl font-semibold text-neutral-800">{c.v}</span>
            <span className="text-xs text-neutral-500">{c.s}</span>
          </div>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-2 gap-4">
        <WireframeBlock label="Tableau de bord qualité des données (complétude, fraîcheur)" className="min-h-44 w-full" />
        <WireframeBlock label="Journal des traitements en arrière-plan" className="min-h-44 w-full" />
      </div>
    </div>
  )
}

function TracabiliteStub() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-neutral-700">Élément</span>
        <span className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-600">Surface brûlée</span>
        <span className="ml-auto rounded border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-600">Restaurer un état</span>
      </div>
      <WireframeBlock label="Parcours de la donnée — source → transformation → indicateur (graphe)" className="min-h-40 w-full" />
      <div className="grid flex-1 grid-cols-2 gap-4">
        <WireframeBlock label="Historique des versions (horodaté)" className="min-h-40 w-full" />
        <WireframeBlock label="Journal des actions utilisateurs" className="min-h-40 w-full" />
      </div>
    </div>
  )
}

function ReferentielsStub() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2">
        {['Bassins versants', 'Captages / Forages', 'Périmètres de protection', 'Grille d’analyse', 'Profils'].map((r) => (
          <span key={r} className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs text-neutral-600">
            {r}
          </span>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-3 gap-4">
        <WireframeBlock label="Liste des bassins versants (~50)" className="min-h-44 w-full" />
        <WireframeBlock label="Liste des captages (~500)" className="min-h-44 w-full" />
        <WireframeBlock label="Périmètres de protection (~250)" className="min-h-44 w-full" />
      </div>
    </div>
  )
}

function ConnexionStub() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-80 space-y-3 rounded-md border border-neutral-200 bg-white p-6 shadow-sm">
        <span className="block text-center text-sm font-semibold text-neutral-800">Connexion à HydroScope</span>
        <WireframeBlock label="Identifiant" className="h-9 w-full" />
        <WireframeBlock label="Mot de passe" className="h-9 w-full" />
        <span className="block rounded-md bg-blue-600 py-2 text-center text-sm font-medium text-white">Se connecter</span>
        <span className="block text-center text-xs text-neutral-400">SSO / annuaire institutionnel (intégration à confirmer)</span>
      </div>
    </div>
  )
}

const STUBS: Record<string, () => ReactElement> = {
  tableau: TableauStub,
  fiches: FichesStub,
  comparaison: ComparaisonStub,
  indicateurs: IndicateursStub,
  catalogue: CatalogueStub,
  import: ImportStub,
  monitoring: MonitoringStub,
  tracabilite: TracabiliteStub,
  referentiels: ReferentielsStub,
  connexion: ConnexionStub,
}

export default function App() {
  const [avance, setAvance] = useState(true)
  const [active, setActive] = useState('carte')
  const [iaMode, setIaMode] = useState<IAMode>('unifiee')
  const [collapsed, setCollapsed] = useState(false)
  const [selectedCaptages, setSelectedCaptages] = useState<Set<string>>(new Set(['C-001', 'C-003', 'C-006', 'C-009']))
  const [sessionIndicators, setSessionIndicators] = useState<string[]>(['ind:200'])

  if (iaMode === 'portail') {
    return <PortailPublic onOpenExpert={() => setIaMode('unifiee')} />
  }

  const toggleCaptage = (id: string) =>
    setSelectedCaptages((prev) => {
      const s = new Set(prev)
      if (s.has(id)) s.delete(id)
      else s.add(id)
      return s
    })

  const assistedSelect = () => setSelectedCaptages(new Set(['C-001', 'C-003', 'C-004', 'C-005', 'C-006', 'C-010']))

  const toggleIndicator = (id: string) =>
    setSessionIndicators((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const removeIndicator = (id: string) => {
    setSessionIndicators((prev) => prev.filter((x) => x !== id))
    if (active === id) setActive('carte')
  }

  const indicatorGroup = {
    name: 'Indicateurs',
    views: sessionIndicators.map((id) => {
      const i = catalogueById(id)
      return {
        id,
        label: i ? `${i.code} · ${i.label}` : id,
        group: 'Indicateurs',
        expertOnly: false,
        desc: '',
        epic: 'EPIC 4 · 1bis',
        mvp: true,
      }
    }),
  }

  const visibleGroups = [GROUPS[0], indicatorGroup, ...GROUPS.slice(1)]
    .map((g) => ({ ...g, views: g.views.filter((v) => (avance ? true : !v.expertOnly)) }))
    .filter((g) => (g.name === 'Indicateurs' ? true : g.views.length > 0))

  const ind = active.startsWith('ind:') ? catalogueById(active) : undefined

  const current = ind
    ? {
        label: ind.label,
        group: 'Indicateurs',
        epic: 'EPIC 4 · 1bis',
        mvp: true,
        desc: `Indicateur « ${ind.label} » — famille ${ind.family} / ${ind.theme}, unité ${ind.unit}. Valeurs des ${selectedCaptages.size} captages sélectionnés de la session.`,
      }
    : VIEWS.find((v) => v.id === active)!

  const modeLabel = avance ? 'Avancé' : 'Standard'

  let content: ReactElement
  if (ind) {
    content = (
      <IndicateurPage id={ind.id} selected={selectedCaptages} onRemove={removeIndicator} onOpenFiche={() => setActive('indicateurs')} />
    )
  } else if (active === 'carte') {
    content = (
      <CarteView
        selected={selectedCaptages}
        onToggleCaptage={toggleCaptage}
        onAssistedSelect={assistedSelect}
        sessionIndicators={sessionIndicators}
        onToggleIndicator={toggleIndicator}
        onOpenCatalogue={() => setActive('indicateurs')}
      />
    )
  } else {
    const S = STUBS[active]
    content = <S />
  }

  return (
    <div className="flex h-screen flex-col bg-neutral-100 text-neutral-800">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-neutral-200 bg-white px-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-sm font-bold text-white">H</div>
          <div className="leading-tight">
            <div className="text-sm font-bold">HydroScope</div>
            <div className="text-[10px] text-neutral-400">Nouvelle-Calédonie · Eau potable</div>
          </div>
        </div>

        <div className="mx-auto flex items-center gap-2">
          <Toggle on={avance} onClick={() => setAvance((a) => !a)} label="Mode avancé" />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full border border-neutral-200 bg-neutral-50 p-0.5" title="Architecture d’information — comparer les 2 options">
            <button
              onClick={() => setIaMode('unifiee')}
              className={`rounded-full px-3 py-1 text-[11px] font-medium transition ${
                iaMode === 'unifiee' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              App unifiée
            </button>
            <button
              onClick={() => setIaMode('portail')}
              className={`rounded-full px-3 py-1 text-[11px] font-medium transition ${
                iaMode === 'portail' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Portail public
            </button>
          </div>
          <span className="hidden text-xs text-neutral-400 sm:block">{modeLabel} · OEIL</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-xs font-bold text-neutral-600">OE</div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <nav className={`shrink-0 overflow-y-auto border-r border-neutral-200 bg-white p-3 transition-all duration-150 ${collapsed ? 'w-14' : 'w-56'}`}>
          <button
            onClick={() => setCollapsed((c) => !c)}
            title={collapsed ? 'Déplier la navigation' : 'Replier la navigation'}
            aria-label={collapsed ? 'Déplier la navigation' : 'Replier la navigation'}
            className={`mb-3 flex items-center rounded-md border border-neutral-200 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-700 ${
              collapsed ? 'mx-auto h-8 w-8 justify-center' : 'w-full justify-between px-2 py-1.5'
            }`}
          >
            <span className={`text-[10px] font-semibold uppercase tracking-wider text-neutral-400 ${collapsed ? 'hidden' : ''}`}>
              Navigation
            </span>
            <Icon>
              <path d={collapsed ? 'm9 18 6-6-6-6' : 'm15 18-6-6 6-6'} />
            </Icon>
          </button>

          {visibleGroups.map((g) => (
            <div key={g.name} className="mb-4">
              {collapsed ? (
                <div className="mx-1.5 mb-1.5 border-t border-neutral-200" />
              ) : (
                <div className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">{g.name}</div>
              )}
              {g.name === 'Indicateurs' && g.views.length === 0 && !collapsed && (
                <div className="mb-1 rounded-md border border-dashed border-neutral-300 p-2 text-center text-[10px] text-neutral-400">
                  Aucun indicateur ajouté.
                  <br />
                  Ajoutez-les depuis le catalogue (carte).
                </div>
              )}
              {g.views.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActive(v.id)}
                  title={collapsed ? v.label : undefined}
                  className={`mb-0.5 flex w-full items-center rounded-md text-sm transition ${
                    collapsed ? 'justify-center py-2' : 'gap-2 px-2 py-1.5'
                  } ${active === v.id ? 'bg-blue-50 font-medium text-blue-700' : 'text-neutral-600 hover:bg-neutral-100'}`}
                >
                  {VIEW_ICONS[v.id] ?? VIEW_ICONS.indicateurs}
                  {!collapsed && <span className="truncate">{v.label}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <main className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-center gap-2 border-b border-neutral-200 bg-white px-5 py-2.5">
            <span className="text-xs text-neutral-400">{current.group}</span>
            <span className="text-xs text-neutral-300">/</span>
            <span className="text-sm font-semibold">{current.label}</span>
            <span className="ml-auto rounded border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] text-neutral-400">
              {current.epic} {current.mvp ? '· MVP' : ''}
            </span>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-5">
            <p className="mb-4 max-w-2xl text-sm leading-relaxed text-neutral-500">{current.desc}</p>
            <div className="h-[calc(100%-40px)]">{content}</div>
          </div>
        </main>
      </div>

      <footer className="flex h-9 shrink-0 items-center justify-between border-t border-neutral-200 bg-white px-4 text-[11px] text-neutral-400">
        <span>HydroScope · Wireframe I1 · Header &amp; sidebar — mode Avancé, sidebar repliable (rail d’icônes), 2 architectures IA</span>
        <span>Maquette Figma — itération 1/7</span>
      </footer>
    </div>
  )
}
