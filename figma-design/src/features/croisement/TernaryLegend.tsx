import { useMemo } from 'react'
import { CHANNEL_COLORS } from './ternary'

export interface TernaryLegendProps {
  labels: string[] // jusqu'à 3 libellés d'indicateurs (par ordre de canal R, G, B)
  size?: number
}

interface Pt {
  x: number
  y: number
}

/** Triangle additif subdivisé en maillage fin : couleur = mix barycentrique des 3 canaux. */
export function TernaryLegend({ labels, size = 150 }: TernaryLegendProps) {
  const N = 14
  const S = size
  const Ht = (S * Math.sqrt(3)) / 2

  const geom = useMemo(() => {
    const top: Pt = { x: S / 2, y: 0 } // R
    const bl: Pt = { x: 0, y: Ht } // G
    const br: Pt = { x: S, y: Ht } // B
    const toPt = (i: number, j: number): Pt => {
      const wR = 1 - (i + j) / N
      const wG = i / N
      const wB = j / N
      return {
        x: wR * top.x + wG * bl.x + wB * br.x,
        y: wR * top.y + wG * bl.y + wB * br.y,
      }
    }
    const colorAt = (i: number, j: number): string => {
      const wR = 1 - (i + j) / N
      const wG = i / N
      const wB = j / N
      const r = Math.round(wR * 255)
      const g = Math.round(wG * 255)
      const b = Math.round(wB * 255)
      return `rgb(${r},${g},${b})`
    }
    const tris: Array<{ pts: Pt[]; fill: string }> = []
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N - i; j++) {
        const a = toPt(i, j)
        const b = toPt(i + 1, j)
        const c = toPt(i, j + 1)
        const fill = colorAt(i + 0.5, j + 0.5)
        tris.push({ pts: [a, b, c], fill })
        if (i + 1 + j < N) {
          const d = toPt(i + 1, j + 1)
          tris.push({ pts: [b, d, c], fill })
        }
      }
    }
    return { top, bl, br, tris }
  }, [N, S, Ht])

  const vertices: Array<{ p: Pt; color: string; label: string }> = [
    { p: geom.top, color: CHANNEL_COLORS[0], label: labels[0] ?? '—' },
    { p: geom.bl, color: CHANNEL_COLORS[1], label: labels[1] ?? '—' },
    { p: geom.br, color: CHANNEL_COLORS[2], label: labels[2] ?? '—' },
  ]

  return (
    <div className="flex flex-col items-center">
      <svg viewBox={`-8 -20 ${S + 16} ${Ht + 52}`} width={S} height={Ht + 52} aria-label="Légende triangle des indicateurs">
        {geom.tris.map((t, idx) => (
          <polygon key={idx} points={t.pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')} fill={t.fill} stroke="rgba(0,0,0,0.03)" strokeWidth="0.3" />
        ))}
        {vertices.map((v, idx) => (
          <g key={idx}>
            <circle cx={v.p.x} cy={v.p.y} r="3.5" fill={v.color} stroke="#fff" strokeWidth="1" />
            <text x={v.p.x} y={v.p.y + (idx === 0 ? -6 : 16)} textAnchor="middle" fontSize="9" fill="#444" className="font-medium">
              {v.label}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-1 max-w-[14rem] text-center text-[10px] text-neutral-400">
        Couleur = mélange des {Math.min(labels.filter(Boolean).length, 3)} indicateurs · centre = mélange des trois.
      </p>
    </div>
  )
}
