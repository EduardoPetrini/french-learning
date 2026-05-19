import type { StudyDay } from '../../data/types'
import { DayTile } from './DayTile'

const PHASE_CONFIG = {
  1: { label: 'Phase 1 — Foundation', color: 'text-amber-700' },
  2: { label: 'Phase 2 — Builder', color: 'text-blue-700' },
  3: { label: 'Phase 3 — TCF Sprint', color: 'text-violet-700' },
} as const

interface WeekViewProps {
  weekNum: number
  days: StudyDay[]
}

export function WeekView({ weekNum, days }: WeekViewProps) {
  const phase = days[0]?.phase ?? 1
  const config = PHASE_CONFIG[phase]

  return (
    <div className="mx-auto w-full max-w-lg px-4 pb-24 pt-4">
      <div className="mb-4">
        <p className={`text-xs font-semibold uppercase tracking-wider ${config.color}`}>{config.label}</p>
        <h1 className="text-2xl font-bold text-navy">Week {weekNum}</h1>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {days.map((day) => (
          <DayTile key={day.id} day={day} />
        ))}
      </div>
    </div>
  )
}
