export interface VigilanceGaugeProps {
  className?: string
  value: number
  niveau: 0 | 1 | 2 | 3
  label?: string
  threshold?: number
  thresholdLabel?: string
}

export function VigilanceGauge({ className = '', value, niveau, label = 'Niveau', threshold, thresholdLabel }: VigilanceGaugeProps) {
  const w = 280
  const h = 60
  const barH = 24
  const barY = 18
  const barW = w - 40
  const barX = 20

  const colors = ['#9ca3af', '#10b981', '#f59e0b', '#ef4444']
  const color = colors[niveau]

  const valueX = barX + Math.min(1, value / 100) * barW
  const thresholdX = threshold ? barX + Math.min(1, threshold / 100) * barW : null

  const gaugeDefs = (
    <defs>
      <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="33%" stopColor="#10b981" />
        <stop offset="33%" stopColor="#f59e0b" />
        <stop offset="66%" stopColor="#f59e0b" />
        <stop offset="66%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
    </defs>
  )

  const niveauLabels = ['Indéterminé', 'Bon', 'Dégradé', 'Critique']

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="xMidYMid meet" role="img" aria-label={`Jauge de vigilance : ${niveauLabels[niveau]}`}>
      {gaugeDefs}
      <rect width={w} height={h} fill="#fafafa" rx="4" />

      <rect x={barX} y={barY} width={barW} height={barH} rx={barH / 2} fill="url(#gaugeGrad)" />

      {threshold !== null && thresholdX !== null && (
        <line
          x1={thresholdX}
          y1={barY - 4}
          x2={thresholdX}
          y2={barY + barH + 4}
          stroke="#374151"
          strokeWidth="2"
          strokeDasharray="4,3"
        />
      )}

      <circle
        cx={valueX}
        cy={barY + barH / 2}
        r={10}
        fill={color}
        stroke="#fff"
        strokeWidth="2"
        filter="drop-shadow(0 1px 2px rgba(0,0,0,0.2))"
      />

      <g fontSize="10" fill="#6b7280" textAnchor="start" dominantBaseline="middle">
        <text x={barX} y={barY - 8} className="font-medium text-neutral-700">{label}</text>
        <text x={barX + barW + 8} y={barY + barH / 2} className="font-semibold" fill={color}>{niveauLabels[niveau]}</text>
        {thresholdLabel && thresholdX !== null && (
          <text x={thresholdX} y={barY - 10} className="text-[8px] text-neutral-500" textAnchor="middle">{thresholdLabel}</text>
        )}
      </g>
    </svg>
  )
}