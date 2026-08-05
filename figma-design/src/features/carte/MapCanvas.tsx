import { useMemo, useState } from 'react'
import { BVAEPS, BVAEP_POLYGONS, UNITES_GESTIONES, CAPTAGE_POINTS, catalogueById } from '@/data/hydroscope'
import { valueForBvaep, valueForUnite } from '@/data/values'
import type { DataType, UnitMode } from '@/types/domain'
import type { BasemapId, LayerDef } from './hooks/useLayers'

export interface MapCanvasProps {
  showGrid?: boolean
  selectedKeys?: string[]
  activeIndicator?: string | null
  unitMode?: UnitMode
  selectedBvaeps?: Set<string>
  layers?: LayerDef[]
  basemap?: BasemapId
  h3Mode?: boolean
}

const QUALITE_COLORS: Record<number, string> = {
  0: '#9ca3af',
  1: '#10b981',
  2: '#f59e0b',
  3: '#ef4444',
}

const QUALITE_LABELS: Record<number, string> = {
  0: 'Indéterminé',
  1: 'Bon',
  2: 'Dégradé',
  3: 'Critique',
}

const BV_FILLS: Record<number, string> = {
  0: 'rgba(148, 163, 184, 0.35)',
  1: 'rgba(16, 185, 129, 0.45)',
  2: 'rgba(245, 158, 11, 0.45)',
  3: 'rgba(239, 68, 68, 0.5)',
}

const SOURCE_FILLS: Record<string, string> = {
  'ind:200': 'rgba(239, 68, 68, 0.18)',
  'ind:201': 'rgba(146, 64, 14, 0.16)',
  'ind:301': 'rgba(100, 116, 139, 0.2)',
  'ind:105': 'rgba(16, 185, 129, 0.16)',
  'ind:308': 'rgba(99, 102, 241, 0.16)',
  'ind:500': 'rgba(59, 130, 246, 0.14)',
}

const BASEMAPS: Record<BasemapId, { ocean: string; land: string; landStroke: string; grid: string }> = {
  carto: { ocean: '#eef2f6', land: '#f4f4f5', landStroke: '#a1a1aa', grid: '#e5e7eb' },
  satellite: { ocean: '#7f1d1d', land: '#3f2d20', landStroke: '#57534e', grid: 'rgba(255,255,255,0.04)' },
  terrain: { ocean: '#dbeafe', land: '#ecfccb', landStroke: '#a8a29e', grid: 'rgba(180,160,120,0.15)' },
}

// ─── H3 hex grid math ────────────────────────────────────────────────────────
const H3_R = 16
const H3_W = Math.sqrt(3) * H3_R
const H3_OX = 60
const H3_OY = 108
const H3_ROWS = 7
const H3_COLS = 16

function hexCenter(q: number, r: number): [number, number] {
  const cx = H3_OX + q * H3_W + (r % 2 === 1 ? H3_W / 2 : 0)
  const cy = H3_OY + r * H3_R * 1.5
  return [cx, cy]
}

function hexPts(cx: number, cy: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = Math.PI / 6 + (Math.PI / 3) * i
    return `${(cx + H3_R * Math.cos(a)).toFixed(1)},${(cy + H3_R * Math.sin(a)).toFixed(1)}`
  }).join(' ')
}

function symbolFor(value: number, datatype: DataType) {
  if (datatype === 'stock') return { r: Math.min(11, 4 + value / 120), fill: '#3b82f6' }
  if (datatype === 'mixte') {
    const cls = value % 4
    return { r: Math.min(11, 4 + value / 120), fill: QUALITE_COLORS[cls] }
  }
  const cls = value % 4
  return { r: 5, fill: QUALITE_COLORS[cls] }
}

function bvaepClass(indId: string | null, bvId: string) {
  if (!indId) return 0
  const ind = catalogueById(indId)
  const val = valueForBvaep(indId, bvId)
  if (ind && ind.datatype === 'qualite') return val % 4
  return Math.min(3, Math.floor(val / 300))
}

function h3Class(indId: string | null, q: number, r: number): number {
  const ind = catalogueById(indId)
  const noise = ((q * 13 + r * 7 + q * r * 7) % 41) - 20
  if (ind && ind.datatype === 'qualite') return Math.abs((q * 3 + r * 5) % 4)
  const raw = 80 + q * 12 + r * 18 + noise
  return Math.max(0, Math.min(3, Math.floor(raw / 180)))
}

function h3Value(indId: string, q: number, r: number): number {
  const noise = ((q * 31 + r * 47 + q * r * 13) % 61) - 30
  return Math.max(0, 120 + q * 14 + r * 22 + noise)
}

interface HoverInfo {
  x: number
  y: number
  nature: string
  name: string
  value: string | null
  rows: Array<[string, string]>
}

interface HoveredHex {
  q: number
  r: number
  x: number
  y: number
  cls: number
  value: number
}

export function MapCanvas({
  showGrid = true,
  selectedKeys = [],
  activeIndicator = null,
  unitMode = 'gestion',
  selectedBvaeps = new Set(),
  layers = [],
  basemap = 'carto',
  h3Mode = false,
}: MapCanvasProps) {
  const bs = BASEMAPS[basemap]
  const ind = activeIndicator ? catalogueById(activeIndicator) : undefined
  const isGestion = unitMode === 'gestion'
  const selectedBvaepIds = new Set([...selectedBvaeps])
  const selectedCaptageIds = new Set([...selectedKeys])
  const on = (key: string) => (layers.find((l) => l.key === key)?.on ?? true)
  const [hover, setHover] = useState<HoverInfo | null>(null)
  const [hoveredHex, setHoveredHex] = useState<HoveredHex | null>(null)

  const hexCells = useMemo(() => {
    const cells: Array<{ q: number; r: number; x: number; y: number }> = []
    for (let r = 0; r < H3_ROWS; r++) {
      for (let q = 0; q < H3_COLS; q++) {
        const [x, y] = hexCenter(q, r)
        cells.push({ q, r, x, y })
      }
    }
    return cells
  }, [])

  const tooltip = hover ? (
    <foreignObject x={Math.min(Math.max(hover.x - 70, 8), 440)} y={hover.y - 60 < 8 ? hover.y + 12 : hover.y - 64} width="150" height="74">
      <div className="rounded border border-neutral-300 bg-white p-2 shadow-md">
        <div className="text-[9px] font-bold uppercase tracking-wide text-neutral-400">{hover.nature}</div>
        <div className="text-[11px] font-semibold text-neutral-800">{hover.name}</div>
        {hover.value && <div className="mt-0.5 text-[11px] font-medium text-blue-700">Valeur : {hover.value}</div>}
        {hover.rows.length > 0 && (
          <div className="mt-1 space-y-0.5 border-t border-neutral-100 pt-1">
            {hover.rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-2 text-[9px] text-neutral-500">
                <span>{k}</span>
                <span className="font-medium text-neutral-700">{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </foreignObject>
  ) : null

  return (
    <svg viewBox="0 0 600 420" className="h-full w-full" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Carte filaire de la Nouvelle-Calédonie">
      <rect x="0" y="0" width="600" height="420" fill={bs.ocean} />
      {showGrid && (
        <g stroke={bs.grid}>
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="420" strokeWidth="1" />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50} strokeWidth="1" />
          ))}
        </g>
      )}

      {ind && on('source') && (
        <polygon
          points="260,140 390,120 460,150 400,210 300,210"
          fill={SOURCE_FILLS[ind.id] ?? 'rgba(239,68,68,0.15)'}
          stroke={ind.datatype === 'qualite' ? '#3b82f6' : '#ef4444'}
          strokeWidth="1"
          strokeDasharray="5 4"
          onMouseEnter={() =>
            setHover({
              x: 360,
              y: 170,
              nature: 'Couche source',
              name: ind.sourceLabel,
              value: null,
              rows: [[ind.datatype, ind.theme], [ind.unit, ind.unit]],
            })
          }
          onMouseLeave={() => setHover(null)}
        />
      )}

      <polygon
        points="70,170 180,130 300,120 420,145 520,180 545,195 480,225 330,240 200,220 110,200 70,185"
        fill={bs.land}
        stroke={bs.landStroke}
        strokeWidth="1.5"
      />
      {basemap === 'satellite' && (
        <>
          <ellipse cx="545" cy="90" rx="26" ry="14" fill="rgba(74,222,128,0.35)" stroke={bs.landStroke} strokeWidth="1" />
          <ellipse cx="575" cy="120" rx="18" ry="10" fill="rgba(74,222,128,0.35)" stroke={bs.landStroke} strokeWidth="1" />
        </>
      )}
      {basemap !== 'satellite' && (
        <>
          <ellipse cx="545" cy="90" rx="26" ry="14" fill="#fafafa" stroke="#a1a1aa" strokeWidth="1" />
          <ellipse cx="575" cy="120" rx="18" ry="10" fill="#fafafa" stroke="#a1a1aa" strokeWidth="1" />
        </>
      )}

      {on('bv') &&
        BVAEPS.map((b) => {
          const cls = bvaepClass(activeIndicator, b.id)
          const hasSelectedCaptage = b.captageRefs.some((cid) => selectedCaptageIds.has(cid))
          const selBv = !isGestion && selectedBvaepIds.has(b.id)
          const liaBv = isGestion && hasSelectedCaptage
          const otherBv = !selBv && !liaBv
          const fill = isGestion
            ? liaBv
              ? 'rgba(148, 163, 184, 0.22)'
              : 'none'
            : selBv
              ? BV_FILLS[cls]
              : otherBv
                ? 'rgba(148, 163, 184, 0.1)'
                : BV_FILLS[cls]
          const stroke = selBv ? '#f59e0b' : liaBv ? '#94a3b8' : '#94a3b8'
          const strokeWidth = selBv ? 2.5 : 1.5
          const strokeDasharray = selBv || liaBv ? undefined : '6 4'
          const opacity = selBv ? 1 : liaBv ? 0.95 : otherBv ? 0.5 : 0.95
          return (
            <polygon
              key={b.id}
              points={BVAEP_POLYGONS[b.id]}
              fill={fill}
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              opacity={opacity}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() =>
                setHover({
                  x: 260,
                  y: 180,
                  nature: 'Bassin versant',
                  name: b.name,
                  value: ind ? `${valueForBvaep(ind.id, b.id).toLocaleString('fr-FR')} ${ind.unit}` : null,
                  rows: [
                    ['Province', b.province],
                    ['Unités', `${b.captageRefs.length}`],
                    ['Secteur', b.sector],
                  ],
                })
              }
              onMouseLeave={() => setHover(null)}
            />
          )
        })}

      {on('ppe') && (
        <>
          <circle cx="180" cy="165" r="22" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3" />
          <circle cx="390" cy="175" r="26" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3" />
        </>
      )}

      {on('capt') &&
        CAPTAGE_POINTS.map((p) => {
          const inSelectedBv = BVAEPS.some((b) => selectedBvaepIds.has(b.id) && b.captageRefs.includes(p.key))
          const selCap = isGestion ? selectedKeys.includes(p.key) : false
          const liaCap = isGestion ? false : inSelectedBv
          const grayed = !selCap && !liaCap
          const cActive = UNITES_GESTIONES.find((c) => c.id === p.key)
          const { r, fill } = ind ? symbolFor(valueForCaptage(ind.id, p.key), ind.datatype) : { r: 4.5, fill: '#3b82f6' }
          const stroke = selCap ? '#f59e0b' : '#fff'
          const strokeWidth = selCap ? 2 : 1.5
          const opacity = selCap ? 1 : liaCap ? 0.9 : 0.2
          const radius = selCap ? Math.max(r, 6) : r
          return (
            <g key={p.key}>
              <circle
                cx={p.x}
                cy={p.y}
                r={radius}
                fill={grayed ? '#9ca3af' : fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                opacity={opacity}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() =>
                  setHover({
                    x: p.x,
                    y: p.y,
                    nature: 'Unité de gestion',
                    name: cActive?.name ?? p.key,
                    value: ind ? `${valueForCaptage(ind.id, p.key).toLocaleString('fr-FR')} ${ind.unit}` : null,
                    rows: [
                      ['Commune', cActive?.commune ?? '—'],
                      ['Province', cActive?.province ?? '—'],
                      ['Distance', cActive ? `${cActive.dist} km` : '—'],
                    ],
                  })
                }
                onMouseLeave={() => setHover(null)}
              />
            </g>
          )
        })}

      {h3Mode && ind && (
        <g>
          {hexCells.map(({ q, r, x, y }) => {
            const cls = h3Class(ind.id, q, r)
            const val = h3Value(ind.id, q, r)
            const isHovered = hoveredHex?.q === q && hoveredHex?.r === r
            const color = QUALITE_COLORS[cls]
            return (
              <polygon
                key={`${q}-${r}`}
                points={hexPts(x, y)}
                fill={color}
                fillOpacity={isHovered ? 0.82 : 0.42}
                stroke={isHovered ? color : cls === 0 ? 'rgba(148,163,184,0.4)' : color}
                strokeWidth={isHovered ? 1.5 : 0.8}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredHex({ q, r, x, y, cls, value: val })}
                onMouseLeave={() => setHoveredHex(null)}
              />
            )
          })}
        </g>
      )}

      {h3Mode && ind && hoveredHex && (() => {
        const { q, r, x, y, cls, value } = hoveredHex
        const tx = x + 12 > 460 ? x - 152 : x + 12
        const ty = y - 62 < 6 ? y + 14 : y - 62
        return (
          <foreignObject x={tx} y={ty} width="140" height="64" style={{ overflow: 'visible' }}>
            <div className="rounded border border-neutral-300 bg-white p-2 shadow-lg">
              <div className="font-mono text-[10px] font-semibold text-blue-700">
                H3 [{q},{r}]
              </div>
              <div className="font-mono text-lg font-semibold leading-none text-neutral-800">
                {value.toLocaleString('fr-FR')} {ind.unit}
              </div>
              <div className="text-[11px] font-medium" style={{ color: QUALITE_COLORS[cls] }}>
                Niveau {cls + 1} · {QUALITE_LABELS[cls]}
              </div>
            </div>
          </foreignObject>
        )
      })()}

      {h3Mode && ind && hoveredHex && (
        <foreignObject x="8" y="396" width="360" height="22" style={{ overflow: 'visible' }}>
          <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-700">
            <span>↗ H3 [{hoveredHex.q},{hoveredHex.r}]</span>
            <span style={{ color: QUALITE_COLORS[hoveredHex.cls] }}>
              {hoveredHex.value.toLocaleString('fr-FR')} {ind.unit}
            </span>
          </div>
        </foreignObject>
      )}

      {on('risque') && basemap === 'carto' && (
        <ellipse cx="350" cy="185" rx="30" ry="16" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
      )}

      {basemap === 'satellite' && (
        <rect x="0" y="0" width="600" height="420" fill="rgba(0,0,0,0.22)" pointerEvents="none" />
      )}
      {tooltip}
    </svg>
  )
}