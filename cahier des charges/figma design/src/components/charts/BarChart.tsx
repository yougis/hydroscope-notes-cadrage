export function BarChart({ className = '' }: { className?: string }) {
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