import { useNavigate } from 'react-router-dom'
import { getWeekData } from '../../data/studyPlan'
import { useProgress } from '../../hooks/useProgress'
import { ProgressRing } from '../ui/ProgressRing'

const PHASE_COLORS = {
  1: { ring: '#F59E0B', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Ph. 1', text: 'text-amber-700' },
  2: { ring: '#2B4ECC', bg: 'bg-blue-50', border: 'border-blue-200', label: 'Ph. 2', text: 'text-blue-700' },
  3: { ring: '#7C3AED', bg: 'bg-violet-50', border: 'border-violet-200', label: 'Ph. 3', text: 'text-violet-700' },
} as const

const WEEKS = Array.from({ length: 16 }, (_, i) => i + 1)

export function WeekGrid() {
  const navigate = useNavigate()
  const { getWeekCompletionRatio } = useProgress()

  return (
    <div className="mx-auto w-full max-w-lg px-4 pb-24 pt-6">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-french-blue">TCF Canada</p>
        <h1 className="mt-1 text-3xl font-bold leading-tight text-navy">16-Week French Plan</h1>
        <p className="mt-1 text-sm text-gray-500">Zero → NCLC 5 · Portuguese/English speakers</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {WEEKS.map((w) => {
          const days = getWeekData(w)
          const phase = days[0]?.phase ?? 1
          const ratio = getWeekCompletionRatio(days)
          const colors = PHASE_COLORS[phase]
          const done = ratio === 1

          return (
            <button
              key={w}
              onClick={() => navigate(`/week/${w}`)}
              className={`flex flex-col items-center gap-2 rounded-2xl border p-3 text-center transition-all active:scale-95 hover:shadow-md ${colors.bg} ${colors.border}`}
            >
              <span className={`text-[10px] font-semibold uppercase tracking-wide ${colors.text}`}>
                {colors.label}
              </span>
              <div className="relative">
                <ProgressRing
                  ratio={ratio}
                  size={40}
                  strokeWidth={4}
                  color={done ? '#22C55E' : colors.ring}
                  trackColor={done ? '#BBF7D0' : '#E5E7EB'}
                />
                {done && (
                  <span className="absolute inset-0 flex items-center justify-center text-xs text-green-500">✓</span>
                )}
              </div>
              <span className="text-sm font-bold text-navy">W{w}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-6 flex gap-4 rounded-2xl bg-white border border-gray-100 p-4">
        {([1, 2, 3] as const).map((p) => {
          const c = PHASE_COLORS[p]
          const label = p === 1 ? 'Foundation' : p === 2 ? 'Builder' : 'TCF Sprint'
          const weeks = p === 1 ? '1–4' : p === 2 ? '5–10' : '11–16'
          return (
            <div key={p} className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${p === 1 ? 'bg-amber-400' : p === 2 ? 'bg-french-blue' : 'bg-violet-500'}`} />
              <span className="text-xs text-gray-600">
                <span className={`font-semibold ${c.text}`}>{label}</span>
                <br />
                <span className="text-gray-400">Wks {weeks}</span>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

