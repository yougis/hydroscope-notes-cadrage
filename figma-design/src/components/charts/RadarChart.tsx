export interface RadarAxis {
  name: string
  enjeux: number
  menaces: number
}

export interface RadarChartProps {
  className?: string
  axes: RadarAxis[]
  enjeuxLabel?: string
  menacesLabel?: string
}

export function RadarChart({ className = '', axes, enjeuxLabel = 'Enjeux', menacesLabel = 'Menaces' }: RadarChartProps) {
  if (!axes || axes.length === 0) return null

  const w = 240
  const h = 240
  const cx = w / 2
  const cy = h / 2
  const radius = 100
  const levels = 4

  const maxVal = Math.max(...axes.flatMap((a) => [a.enjeux, a.menaces]), 1)
  const scale = radius / (maxVal || 1)

  const angleOffset = -Math.PI / 2
  const angleStep = (2 * Math.PI) / axes.length

  const getPoint = (value: number, index: number) => {
    const angle = angleOffset + index * angleStep
    const r = value * scale
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  }

  const enjeuxPoints = axes.map((a, i) => getPoint(a.enjeux, i))
  const menacesPoints = axes.map((a, i) => getPoint(a.menaces, i))

  const polygonPath = (points: { x: number; y: number }[]) =>
    points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z'

  const levelPolygons = Array.from({ length: levels }, (_, i) => {
    const r = ((i + 1) / levels) * radius
    return axes.map((_, idx) => {
      const angle = angleOffset + idx * angleStep
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
    })
  })

  const axisLines = axes.map((_, i) => {
    const angle = angleOffset + i * angleStep
    return { x1: cx, y1: cy, x2: cx + radius * Math.cos(angle), y2: cy + radius * Math.sin(angle) }
  })

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="xMidYMid meet" role="img" aria-label="Radar Enjeux / Menaces">
      <defs>
        <linearGradient id="enjeuxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="menacesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <rect width={w} height={h} fill="#fafafa" />

      {levelPolygons.map((pts, i) => (
        <polygon key={i} points={polygonPath(pts)} fill="none" stroke="#e5e7eb" strokeWidth="1" />
      ))}

      {axisLines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#e5e7eb" strokeWidth="1" />
      ))}

      <polygon
        points={polygonPath(enjeuxPoints)}
        fill="url(#enjeuxGrad)"
        stroke="#10b981"
        strokeWidth="2"
      />

      <polygon
        points={polygonPath(menacesPoints)}
        fill="url(#menacesGrad)"
        stroke="#ef4444"
        strokeWidth="2"
      />

      {enjeuxPoints.map((p, i) => (
        <circle key={`e-${i}`} cx={p.x} cy={p.y} r="4" fill="#10b981" stroke="#fff" strokeWidth="2" />
      ))}

      {menacesPoints.map((p, i) => (
        <circle key={`m-${i}`} cx={p.x} cy={p.y} r="4" fill="#ef4444" stroke="#fff" strokeWidth="2" />
      ))}

      <g fontSize="10" fill="#6b7280" textAnchor="middle" dominantBaseline="middle">
        {axes.map((a, i) => {
          const angle = angleOffset + i * angleStep
          const labelRadius = radius + 18
          const x = cx + labelRadius * Math.cos(angle)
          const y = cy + labelRadius * Math.sin(angle)
          return <text key={i} x={x} y={y} className="font-medium">{a.name}</text>
        })}
      </g>

      <g fontSize="9" fill="#9ca3af">
        <text x={10} y={10} fill="#10b981">■ {enjeuxLabel}</text>
        <text x={10} y={22} fill="#ef4444">■ {menacesLabel}</text>
      </g>
    </svg>
  )
}