export interface LineChartProps {
  className?: string
  series?: number[][]
  labels?: string[]
  threshold?: number
  thresholdLabel?: string
  showMarkers?: boolean
  thresholdColor?: string
}

export function LineChart({
  className = '',
  series,
  labels = ['2016', '2018', '2021', '2023', '2026'],
  threshold,
  thresholdLabel,
  showMarkers = false,
  thresholdColor = '#ef4444',
}: LineChartProps) {
  const n = labels.length
  const w = 360
  const h = 80
  const pad = 6
  let paths: string[] = []
  let allVals: number[] = []
  if (series && series.length) {
    allVals = series.flat()
    const min = Math.min(...allVals)
    const max = Math.max(...allVals)
    const span = max - min || 1
    const pts = (vals: number[]) =>
      vals
        .map((v, i) => {
          const x = pad + (i / (n - 1)) * (w - pad * 2)
          const y = pad + ((max - v) / span) * (h - pad * 2)
          return `${i === 0 ? 'M' : 'L'}${x},${y}`
        })
        .join(' ')
    paths = series.map((vals) => pts(vals))
  } else {
    paths = ['M6,72 L96,64 L186,50 L276,30 L354,20']
  }

  const thresholdY = threshold !== undefined && allVals.length
    ? pad + ((Math.max(...allVals) - threshold) / (Math.max(...allVals) - Math.min(...allVals) || 1)) * (h - pad * 2)
    : null

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none" role="img" aria-label="Graphique d'évolution">
      <rect width={w} height={h} fill="#fafafa" />
      {[20, 40, 60].map((y) => (
        <line key={y} x1="0" y1={y} x2={w} y2={y} stroke="#ececec" strokeWidth="1" />
      ))}
      {thresholdY !== null && (
        <>
          <line x1={pad} y1={thresholdY} x2={w - pad} y2={thresholdY} stroke={thresholdColor} strokeWidth="1" strokeDasharray="4,3" />
          {thresholdLabel && (
            <text x={w - pad - 4} y={thresholdY - 4} fontSize="9" fill={thresholdColor} textAnchor="end" fontWeight="500">{thresholdLabel}</text>
          )}
        </>
      )}
      {paths.map((p, i) => (
        <polyline key={i} points={p} fill="none" stroke={i === 0 ? '#3b82f6' : '#93c5fd'} strokeWidth="2" />
      ))}
      {showMarkers && series && series[0] && (
        <g>
          {series[0].map((v, i) => {
            const max = Math.max(...allVals)
            const min = Math.min(...allVals)
            const span = max - min || 1
            const x = pad + (i / (n - 1)) * (w - pad * 2)
            const y = pad + ((max - v) / span) * (h - pad * 2)
            return (
              <circle key={i} cx={x} cy={y} r={4} fill="#3b82f6" stroke="#fff" strokeWidth="2" />
            )
          })}
        </g>
      )}
    </svg>
  )
}