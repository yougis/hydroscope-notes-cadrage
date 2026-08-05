import { useState } from 'react'
import { Eye, EyeOff, Layers } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { BVAEPS, CAPTAGES, communes, communesIntersectingBvaep, provinces, captagesOfBvaep, catalogueById } from '@/data/hydroscope'
import { valueForBvaep, valueForCaptage } from '@/data/values'
import type { BvaepDef, CaptageDef, UnitMode } from '@/types/domain'
import { PanelSection } from './PanelSection'
import type { LayerDef } from '../hooks/useLayers'

export interface CaptageSelectorProps {
  unitMode: UnitMode
  onSetMode: (m: UnitMode) => void
  selectedUnites: Set<string>
  onToggleUnite: (id: string) => void
  selectedBvaeps: Set<string>
  onToggleBvaep: (id: string) => void
  onApplyUnites: (ids: string[]) => void
  onApplyBvaeps: (ids: string[]) => void
  onClearUnites: () => void
  onClearBvaeps: () => void
  activeIndicator: string | null
  layers: LayerDef[]
  onToggleLayer: (key: string) => void
}

type SortKey = 'distance' | 'nom'
type PresetKind = 'plus-exposes' | 'moins-exposes' | 'plus-proches' | 'plus-eloignes'

const PRESET_LABELS: Array<{ kind: PresetKind; label: string }> = [
  { kind: 'plus-exposes', label: 'Les 10 plus exposés' },
  { kind: 'moins-exposes', label: 'Les 10 moins exposés' },
  { kind: 'plus-proches', label: 'Les 10 plus proches' },
  { kind: 'plus-eloignes', label: 'Les 10 plus éloignés' },
]

const LAYER_COLORS: Record<string, string> = {
  bv: '#94a3b8',
  capt: '#3b82f6',
  ppe: '#94a3b8',
  risque: '#ef4444',
  source: '#10b981',
}

function avgDistOfBvaep(bv: BvaepDef) {
  const caps = captagesOfBvaep(bv.id)
  return caps.length ? caps.reduce((s, c) => s + c.dist, 0) / caps.length : 0
}

export function CaptageSelector({
  unitMode,
  onSetMode,
  selectedUnites,
  onToggleUnite,
  selectedBvaeps,
  onToggleBvaep,
  onApplyUnites,
  onApplyBvaeps,
  onClearUnites,
  onClearBvaeps,
  activeIndicator,
  layers,
  onToggleLayer,
}: CaptageSelectorProps) {
  const isGestion = unitMode === 'gestion'

  const [query, setQuery] = useState('')
  const [communeFacets, setCommuneFacets] = useState<string[]>([])
  const [provinceFacets, setProvinceFacets] = useState<string[]>([])
  const [sortKey, setSortKey] = useState<SortKey>(isGestion ? 'distance' : 'nom')
  const [focused, setFocused] = useState(false)
  const [presetChip, setPresetChip] = useState<{ label: string; restore: () => void } | null>(null)

  const toggleCommune = (c: string) =>
    setCommuneFacets((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))
  const toggleProvince = (p: string) =>
    setProvinceFacets((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]))

  const communeOptions = isGestion ? communes() : [...new Set(BVAEPS.flatMap((b) => communesIntersectingBvaep(b.id)))].sort()
  const provinceOptions = provinces()

  const matchText = (t: string) => t.toLowerCase().includes(query.trim().toLowerCase())

  const filteredCaptages = CAPTAGES.filter(
    (c) =>
      (!query || matchText(`${c.name} ${c.commune} ${c.bvaep}`)) &&
      (communeFacets.length === 0 || communeFacets.includes(c.commune)) &&
      (provinceFacets.length === 0 || provinceFacets.includes(c.province)),
  )
  const filteredBvaeps = BVAEPS.filter(
    (b) =>
      (!query || matchText(`${b.name} ${b.province}`)) &&
      (communeFacets.length === 0 || communesIntersectingBvaep(b.id).some((c) => communeFacets.includes(c))) &&
      (provinceFacets.length === 0 || provinceFacets.includes(b.province)),
  )

  const visibleCaptages = [...filteredCaptages].sort((a, b) => (sortKey === 'nom' ? a.name.localeCompare(b.name) : a.dist - b.dist))
  const visibleBvaeps = [...filteredBvaeps].sort((a, b) => (sortKey === 'nom' ? a.name.localeCompare(b.name) : avgDistOfBvaep(a) - avgDistOfBvaep(b)))

  const suggestionCommunes = communes().filter((x) => query && x.toLowerCase().includes(query.toLowerCase())).slice(0, 4)
  const suggestionProvinces = provinces().filter((x) => query && x.toLowerCase().includes(query.toLowerCase())).slice(0, 4)

  const applyPreset = (kind: PresetKind) => {
    const indId = activeIndicator ?? 'ind:200'
    const label = PRESET_LABELS.find((p) => p.kind === kind)?.label ?? ''
    if (isGestion) {
      const prev = [...selectedUnites]
      const scored = visibleCaptages.map((c: CaptageDef) => {
        const base = kind === 'plus-proches' || kind === 'plus-eloignes' ? c.dist : valueForCaptage(indId, c.id)
        return { id: c.id, value: base }
      })
      const asc = kind === 'moins-exposes' || kind === 'plus-proches'
      scored.sort((a, b) => (asc ? a.value - b.value : b.value - a.value))
      onApplyUnites(scored.slice(0, 10).map((s) => s.id))
      setPresetChip({ label: `Preset : ${label}`, restore: () => onApplyUnites(prev) })
    } else {
      const prev = [...selectedBvaeps]
      const scored = visibleBvaeps.map((b: BvaepDef) => {
        const base = kind === 'plus-proches' || kind === 'plus-eloignes' ? avgDistOfBvaep(b) : valueForBvaep(indId, b.id)
        return { id: b.id, value: base }
      })
      const asc = kind === 'moins-exposes' || kind === 'plus-proches'
      scored.sort((a, b) => (asc ? a.value - b.value : b.value - a.value))
      onApplyBvaeps(scored.slice(0, 10).map((s) => s.id))
      setPresetChip({ label: `Preset : ${label}`, restore: () => onApplyBvaeps(prev) })
    }
  }

  const facets: Array<{ label: string; clear: () => void }> = []
  communeFacets.forEach((c) => facets.push({ label: `Commune : ${c}`, clear: () => toggleCommune(c) }))
  provinceFacets.forEach((p) => facets.push({ label: `Province : ${p}`, clear: () => toggleProvince(p) }))
  if (presetChip) facets.push({ label: presetChip.label, clear: () => { presetChip.restore(); setPresetChip(null) } })

  const sourceInd = activeIndicator ? catalogueById(activeIndicator) : undefined

  return (
    <aside className="flex w-72 shrink-0 flex-col gap-2 overflow-y-auto rounded-md border border-neutral-200 bg-white p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center rounded-md border border-neutral-200 bg-neutral-50 p-0.5">
          <button
            onClick={() => onSetMode('gestion')}
            className={`rounded px-2 py-0.5 text-[11px] font-medium transition ${isGestion ? 'bg-white text-blue-700 shadow-sm' : 'text-neutral-500'}`}
          >
            Unités de gestion
          </button>
          <button
            onClick={() => onSetMode('bvaep')}
            className={`rounded px-2 py-0.5 text-[11px] font-medium transition ${!isCaptage ? 'bg-white text-blue-700 shadow-sm' : 'text-neutral-500'}`}
          >
            Bassins versants
          </button>
        </div>
      </div>

      <PanelSection title="Filtres">
        <div className="flex items-center gap-2 rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-neutral-400">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 stroke-neutral-400" fill="none" strokeWidth="1.5">
            <circle cx="7" cy="7" r="4.5" />
            <line x1="10.5" y1="10.5" x2="14" y2="14" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 120)}
            placeholder="Recherche (nom, commune, bassin)…"
            className="w-full bg-transparent text-xs text-neutral-700 outline-none placeholder:text-neutral-400"
          />
        </div>

        {(focused || query) && (suggestionCommunes.length > 0 || suggestionProvinces.length > 0) && (
          <div className="overflow-hidden rounded-md border border-neutral-200 bg-white text-[11px] shadow-sm">
            {suggestionCommunes.map((c) => (
              <button
                key={c}
                onMouseDown={() => {
                  toggleCommune(c)
                  setQuery('')
                }}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-neutral-700 hover:bg-blue-50"
              >
                <span className="rounded bg-neutral-100 px-1 py-0.5 text-[9px] uppercase tracking-wide text-neutral-500">Commune</span>
                {c}
              </button>
            ))}
            {suggestionProvinces.map((p) => (
              <button
                key={p}
                onMouseDown={() => {
                  toggleProvince(p)
                  setQuery('')
                }}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-neutral-700 hover:bg-blue-50"
              >
                <span className="rounded bg-neutral-100 px-1 py-0.5 text-[9px] uppercase tracking-wide text-neutral-500">Province</span>
                {p}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-1.5">
          <select
            defaultValue=""
            onChange={(e) => {
              const v = e.target.value
              if (v) toggleCommune(v)
              e.target.value = ''
            }}
            className="rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1 text-[11px] text-neutral-600"
          >
            <option value="">Commune ▾ (ajout)</option>
            {communeOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            defaultValue=""
            onChange={(e) => {
              const v = e.target.value
              if (v) toggleProvince(v)
              e.target.value = ''
            }}
            className="rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1 text-[11px] text-neutral-600"
          >
            <option value="">Province ▾ (ajout)</option>
            {provinceOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {facets.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {facets.map((f) => (
              <button
                key={f.label}
                onClick={f.clear}
                className="flex items-center gap-1 rounded-full border border-blue-300 bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700 hover:bg-blue-100"
              >
                {f.label}
                <Icon>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </Icon>
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between gap-1.5">
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="flex-1 rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1 text-[11px] text-neutral-600"
          >
            <option value="distance">Tri : distance ▾</option>
            <option value="nom">Tri : nom ▾</option>
          </select>
          <select
            defaultValue=""
            onChange={(e) => {
              const kind = e.target.value as PresetKind
              if (kind) applyPreset(kind)
              e.target.value = ''
            }}
            className="flex-1 rounded-md border border-blue-400 bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-700"
          >
            <option value="">Top 10 ▾</option>
            {PRESET_LABELS.map((p) => (
              <option key={p.kind} value={p.kind}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </PanelSection>

      <PanelSection title="Sélection" badge={`${isGestion ? selectedUnites.size : selectedBvaeps.size} sélectionnés`}>
        {/* Unités de gestion */}
        {isGestion && (
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">Unités de gestion</span>
            {selectedUnites.size > 0 && (
              <button onClick={onClearUnites} className="text-[10px] font-medium text-neutral-400 hover:text-red-500">
                Vider
              </button>
            )}
          </div>
          <ul className="space-y-1">
            {visibleCaptages.map((c) => {
              const isSel = selectedUnites.has(c.id)
              return (
                <li key={c.id} className={`flex items-center gap-2 rounded-md border px-2 py-1.5 ${isSel ? 'border-blue-300 bg-blue-50' : 'border-neutral-200 bg-white'}`}>
                  <button onClick={() => onToggleUnite(c.id)} className="min-w-0 flex-1 text-left">
                    <span className="block truncate text-xs font-medium text-neutral-800">{c.name}</span>
                    <span className="block truncate text-[10px] text-neutral-400">{c.commune} · {c.dist} km</span>
                  </button>
                  <button onClick={() => onToggleUnite(c.id)} title="Retirer" aria-label={`Retirer ${c.name}`} className="text-neutral-300 hover:text-red-500">
                    <Icon>
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </Icon>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        )}

        {/* Bassins versants */}
        {!isGestion && (
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">Bassins versants</span>
            {selectedBvaeps.size > 0 && (
              <button onClick={onClearBvaeps} className="text-[10px] font-medium text-neutral-400 hover:text-red-500">
                Vider
              </button>
            )}
          </div>
          <ul className="space-y-1">
            {visibleBvaeps.map((b) => {
              const isSel = selectedBvaeps.has(b.id)
              return (
                <li key={b.id} className={`flex items-center gap-2 rounded-md border px-2 py-1.5 ${isSel ? 'border-emerald-300 bg-emerald-50' : 'border-neutral-200 bg-white'}`}>
                  <button onClick={() => onToggleBvaep(b.id)} className="min-w-0 flex-1 text-left">
                    <span className="block truncate text-xs font-medium text-neutral-800">{b.name}</span>
                    <span className="block truncate text-[10px] text-neutral-400">{b.province} · {b.captageRefs.length} captages</span>
                  </button>
                  <button onClick={() => onToggleBvaep(b.id)} title="Retirer" aria-label={`Retirer ${b.name}`} className="text-neutral-300 hover:text-red-500">
                    <Icon>
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </Icon>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        )}
      </PanelSection>

      <PanelSection title="Couches" icon={<Layers size={12} />}>
        {layers.map((l) => {
          const label = l.key === 'source' && sourceInd ? `Source · ${sourceInd.sourceLabel}` : l.label
          return (
            <button
              key={l.key}
              onClick={() => onToggleLayer(l.key)}
              className="flex w-full items-center gap-2 rounded px-1.5 py-1 text-left hover:bg-neutral-50"
            >
              <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: l.on ? LAYER_COLORS[l.key] ?? '#94a3b8' : '#d4d4d8' }} />
              <span className={`flex-1 text-[11px] ${l.on ? 'text-neutral-700' : 'text-neutral-400'}`}>{label}</span>
              {l.on ? <Eye size={11} className="text-neutral-300" /> : <EyeOff size={11} className="text-neutral-400" />}
            </button>
          )
        })}
      </PanelSection>

      <PanelSection title="Légende" defaultOpen={false}>
        {isGestion ? (
          <div className="space-y-1 text-[11px] text-neutral-500">
            <span className="flex items-center gap-1.5"><span className="h-0 w-0 border-y-4 border-l-4 border-y-transparent border-l-neutral-400" /> Bassin versant</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Unité de gestion</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500" /> Unité sélectionnée</span>
            {selectedUnites.size > 0 && (
              <span className="flex items-center gap-1.5"><span className="h-0 w-0 border-y-4 border-l-4 border-y-transparent border-l-amber-500" /> BV de l'unité sélectionnée</span>
            )}
          </div>
        ) : (
          <div className="space-y-1 text-[11px] text-neutral-500">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500/70" /> BV (classe indicateur)</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full border-2 border-amber-500" /> BV sélectionné</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-300" /> Unité de gestion</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Unité du BV sélectionné</span>
          </div>
        )}
        {sourceInd && (
          <span className="flex items-center gap-1.5 text-[11px] text-neutral-500"><span className="h-2 w-2 rounded-full bg-red-500/70" /> Couche source</span>
        )}
        <span className="flex items-center gap-1.5 text-[11px] text-neutral-500"><span className="h-2 w-2 rounded-full border border-dashed border-neutral-500" /> Périmètre de protection</span>
      </PanelSection>
    </aside>
  )
}
