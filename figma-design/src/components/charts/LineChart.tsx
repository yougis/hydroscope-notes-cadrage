export interface LineChartProps {
  className?: string
  series?: number[][]
  labels?: string[]
}

export function LineChart({ className = '', series, labels = ['2016', '2018', '2021', '2023', '2026'] }: LineChartProps) {
  const n = labels.length
  const w = 360
  const h = 80
  const pad = 6
  let paths: string[] = []
  if (series && series.length) {
    const all = series.flat()
    const min = Math.min(...all)
    const max = Math.max(...all)
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

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none" role="img" aria-label="Graphique d’évolution">
      <rect width={w} height={h} fill="#fafafa" />
      {[20, 40, 60].map((y) => (
        <line key={y} x1="0" y1={y} x2={w} y2={y} stroke="#ececec" strokeWidth="1" />
      ))}
      {paths.map((p, i) => (
        <polyline key={i} points={p} fill="none" stroke={i === 0 ? '#3b82f6' : '#93c5fd'} strokeWidth="2" />
      ))}
    </svg>
  )
}