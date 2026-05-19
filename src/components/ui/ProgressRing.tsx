interface ProgressRingProps {
  ratio: number
  size?: number
  strokeWidth?: number
  color?: string
  trackColor?: string
}

export function ProgressRing({
  ratio,
  size = 48,
  strokeWidth = 4,
  color = '#2B4ECC',
  trackColor = '#E5E7EB',
}: ProgressRingProps) {
  const r = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - Math.min(1, Math.max(0, ratio)))

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.4s ease' }}
      />
    </svg>
  )
}
