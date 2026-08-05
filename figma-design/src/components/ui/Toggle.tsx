export interface ToggleProps {
  on: boolean
  onClick: () => void
  label: string
}

export function Toggle({ on, onClick, label }: ToggleProps) {
  return (
    <label className="flex cursor-pointer select-none items-center gap-2">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={onClick}
        className={`relative h-4 w-7 rounded-full transition ${on ? 'bg-blue-600' : 'bg-neutral-300'}`}
      >
        <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${on ? 'left-3.5' : 'left-0.5'}`} />
      </button>
      <span className="text-xs text-neutral-600">{label}</span>
    </label>
  )
}