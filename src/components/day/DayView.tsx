import type { StudyDay } from '../../data/types'
import { useProgress } from '../../hooks/useProgress'
import { TaskCard } from './TaskCard'
import { ProgressRing } from '../ui/ProgressRing'

const PHASE_CONFIG = {
  1: { label: 'Phase 1 — Foundation', bg: 'bg-amber-100', text: 'text-amber-800' },
  2: { label: 'Phase 2 — Builder', bg: 'bg-blue-100', text: 'text-blue-800' },
  3: { label: 'Phase 3 — TCF Sprint', bg: 'bg-violet-100', text: 'text-violet-800' },
} as const

interface DayViewProps {
  dayData: StudyDay
}

export function DayView({ dayData }: DayViewProps) {
  const { toggleTask, toggleDay, markAllTasksInDay, isTaskComplete, isDayComplete, getDayCompletionRatio } = useProgress()

  const ratio = getDayCompletionRatio(dayData)
  const dayComplete = isDayComplete(dayData.id)
  const allTasksDone = dayData.tasks.every((t) => isTaskComplete(t.id))
  const phaseConfig = PHASE_CONFIG[dayData.phase]

  return (
    <div className="mx-auto w-full max-w-lg px-4 pb-24 pt-4">
      <div className="mb-5 flex items-start gap-4">
        <ProgressRing
          ratio={ratio}
          size={56}
          strokeWidth={5}
          color={dayComplete ? '#22C55E' : '#2B4ECC'}
        />
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${phaseConfig.bg} ${phaseConfig.text}`}>
              {phaseConfig.label}
            </span>
            <span className="text-xs text-gray-500">Week {dayData.week} · {dayData.dayName}</span>
          </div>
          <h1 className="text-xl font-bold leading-tight text-navy">{dayData.focus}</h1>
          <p className="mt-0.5 text-sm text-gray-500">{dayData.totalMinutes} min · {dayData.tasks.length} tasks</p>
        </div>
      </div>

      {dayComplete && (
        <div className="mb-4 flex items-center gap-2 rounded-2xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          <span>✓</span>
          <span>Day complete! Great work.</span>
          <button onClick={() => toggleDay(dayData.id)} className="ml-auto text-xs text-green-500 underline">
            Undo
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {dayData.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            completed={isTaskComplete(task.id)}
            onToggle={() => toggleTask(task.id)}
          />
        ))}
      </div>

      {!dayComplete && (
        <div className="mt-6">
          <button
            onClick={() => markAllTasksInDay(dayData)}
            className={`w-full rounded-2xl py-4 text-sm font-semibold transition-all ${
              allTasksDone
                ? 'bg-french-blue text-white shadow-lg shadow-blue-200 active:scale-95'
                : 'border-2 border-dashed border-gray-300 text-gray-400'
            }`}
            disabled={!allTasksDone}
          >
            {allTasksDone ? 'Mark Day Complete ✓' : `Complete all ${dayData.tasks.length} tasks to finish the day`}
          </button>
        </div>
      )}
    </div>
  )
}
