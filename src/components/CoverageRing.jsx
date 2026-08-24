export default function CoverageRing({ percent = 0, size = 96, stroke = 10, label, light = false }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (Math.min(100, Math.max(0, percent)) / 100) * c

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="none"
          className={light ? 'text-white/20' : 'text-brand-100'}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className={`transition-[stroke-dashoffset] duration-700 ease-out ${light ? 'text-white' : 'text-brand-500'}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-xl font-extrabold ${light ? 'text-white' : 'text-brand-900'}`}>{Math.round(percent)}%</span>
        {label && (
          <span className={`text-[10px] font-medium leading-tight text-center px-2 ${light ? 'text-white/70' : 'text-brand-900/50'}`}>
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
