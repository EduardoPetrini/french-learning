import { useNavigate } from 'react-router-dom'
import type { StudyDay } from '../../data/types'
import { useProgress } from '../../hooks/useProgress'
import { ProgressRing } from '../ui/ProgressRing'

interface DayTileProps {
  day: StudyDay
}

const DAY_ABBR = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function DayTile({ day }: DayTileProps) {
  const navigate = useNavigate()
  const { getDayCompletionRatio, isDayComplete } = useProgress()

  const ratio = getDayCompletionRatio(day)
  const complete = isDayComplete(day.id)

  return (
    <button
      onClick={() => navigate(`/day/${day.week}/${day.day}`)}
      className="flex w-full flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-white p-3 text-center transition-all active:scale-95 hover:border-french-blue hover:shadow-md"
    >
      <span className="text-xs font-medium text-gray-500">{DAY_ABBR[day.day - 1]}</span>
      <div className="relative">
        <ProgressRing
          ratio={ratio}
          size={44}
          strokeWidth={4}
          color={complete ? '#22C55E' : '#2B4ECC'}
        />
        {complete && (
          <span className="absolute inset-0 flex items-center justify-center text-sm text-green-500">✓</span>
        )}
      </div>
      <span className="line-clamp-2 text-xs leading-tight text-gray-600">{day.focus}</span>
      <span className="text-xs text-gray-400">{day.totalMinutes}m</span>
    </button>
  )
}
