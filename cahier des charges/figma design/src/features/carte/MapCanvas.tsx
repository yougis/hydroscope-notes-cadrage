import { CAPTAGE_POINTS } from '@/data/hydroscope'

export interface MapCanvasProps {
  showGrid?: boolean
  selectedKeys?: string[]
}

export function MapCanvas({ showGrid = true, selectedKeys = [] }: MapCanvasProps) {
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

      <polygon
        points="70,170 180,130 300,120 420,145 520,180 545,195 480,225 330,235 200,220 110,200 70,185"
        fill="#f4f4f5"
        stroke="#a1a1aa"
        strokeWidth="1.5"
      />
      <ellipse cx="545" cy="90" rx="26" ry="14" fill="#fafafa" stroke="#a1a1aa" strokeWidth="1" />
      <ellipse cx="575" cy="120" rx="18" ry="10" fill="#fafafa" stroke="#a1a1aa" strokeWidth="1" />

      <polygon points="100,160 200,120 260,150 210,200 130,195" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 4" />
      <polygon points="230,170 340,130 410,160 360,215 250,215" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 4" />
      <polygon points="400,150 520,175 510,215 420,200" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 4" />

      <circle cx="180" cy="165" r="22" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx="330" cy="175" r="26" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3" />

      {CAPTAGE_POINTS.map((p) => {
        const sel = selectedKeys.includes(p.key)
        return (
          <g key={p.key}>
            <circle cx={p.x} cy={p.y} r={sel ? 6 : 4.5} fill={sel ? '#f59e0b' : '#3b82f6'} stroke="#fff" strokeWidth={sel ? 2 : 1.5} />
          </g>
        )
      })}

      <ellipse cx="350" cy="160" rx="30" ry="16" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  )
}