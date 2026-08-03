export interface WireframeBlockProps {
  label: string
  className: string
}

export function WireframeBlock({ label, className }: WireframeBlockProps) {
  return (
    <div className={`flex items-center justify-center rounded-md border border-dashed border-neutral-300 bg-neutral-100 text-center text-xs font-medium text-neutral-400 ${className}`}>
      {label}
    </div>
  )
}