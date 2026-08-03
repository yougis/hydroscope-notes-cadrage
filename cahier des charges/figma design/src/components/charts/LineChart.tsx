export function LineChart({ className = '' }: { className?: string }) {
  const pts = '0,72 40,64 80,68 120,50 160,54 200,38 240,44 280,30 320,34 360,20'
  return (
    <svg viewBox="0 0 360 80" className={className} preserveAspectRatio="none" role="img" aria-label="Graphique d’évolution">
      <rect width="360" height="80" fill="#fafafa" />
      {[20, 40, 60].map((y) => (
        <line key={y} x1="0" y1={y} x2="360" y2={y} stroke="#ececec" strokeWidth="1" />
      ))}
      <polyline points={pts} fill="none" stroke="#3b82f6" strokeWidth="2" />
      <circle cx="360" cy="20" r="3" fill="#3b82f6" />
    </svg>
  )
}