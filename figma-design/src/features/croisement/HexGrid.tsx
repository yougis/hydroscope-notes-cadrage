import { useMemo, useState } from 'react'
import type { HexCellSpec } from './spatial'

export interface HexCellView {
  spec: HexCellSpec
  color: string
  values: Array<[string, number]> // [label indicateur, valeur brute]
}

export interface HexGridProps {
  cells: HexCellView[]
  className?: string
}

const W = 800
const H = 540
const PAD = 24

/** Projection équirectangulaire simple des anneaux WGS84 vers la grille SVG. */
function project(ring: Array<[number, number]>, bbox: { minLon: number; maxLon: number; minLat: number; maxLat: number }) {
  const { minLon, maxLon, minLat, maxLat } = bbox
  const lonSpan = maxLon - minLon || 1
  const latSpan = maxLat - minLat || 1
  return ring.map(([lon, lat]) => {
    const x = PAD + ((lon - minLon) / lonSpan) * (W - PAD * 2)
    const y = PAD + ((maxLat - lat) / latSpan) * (H - PAD * 2)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
}

export function HexGrid({ cells, className }: HexGridProps) {
  const [hover, setHover] = useState<HexCellView | null>(null)

  const bbox = useMemo(() => {
    const lons = cells.flatMap((c) => c.spec.ring.map((p) => p[0]))
    const lats = cells.flatMap((c) => c.spec.ring.map((p) => p[1]))
    return {
      minLon: Math.min(...lons),
      maxLon: Math.max(...lons),
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats),
    }
  }, [cells])

  return (
    <div className={`relative ${className ?? ''}`}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-full w-full"
        role="img"
        aria-label="Agrégation des indicateurs par hexagones H3"
      >
        <rect x="0" y="0" width={W} height={H} fill="#f6f6f4" />
        {cells.map((c) => (
          <polygon
            key={c.spec.cell}
            points={project(c.spec.ring, bbox).join(' ')}
            fill={c.color}
            stroke="#ffffff"
            strokeWidth="0.75"
            strokeLinejoin="round"
            onMouseEnter={() => setHover(c)}
            onMouseLeave={() => setHover(null)}
            className="cursor-crosshair transition-opacity hover:opacity-80"
          />
        ))}
      </svg>

      {hover && (
        <div
          className="pointer-events-none absolute z-10 max-w-[16rem] rounded-md border border-neutral-200 bg-white p-2 text-[11px] text-neutral-700 shadow-md"
          style={{ left: '50%', top: '0.5rem' }}
        >
          <div className="mb-1 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: hover.color }} />
            <span className="font-medium">Cellule {hover.spec.cell}</span>
          </div>
          {hover.values.map(([label, v]) => (
            <div key={label} className="flex items-center justify-between gap-3 text-[10px] text-neutral-500">
              <span className="truncate">{label}</span>
              <span className="font-semibold tabular-nums text-neutral-700">{v.toLocaleString('fr-FR')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
