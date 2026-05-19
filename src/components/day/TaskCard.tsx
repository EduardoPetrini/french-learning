import type { Task } from '../../data/types'
import { YoutubeEmbed } from '../ui/YoutubeEmbed'

const TYPE_CONFIG = {
  video: { label: 'Video', bg: 'bg-red-100', text: 'text-red-700', icon: '▶' },
  podcast: { label: 'Podcast', bg: 'bg-orange-100', text: 'text-orange-700', icon: '🎙' },
  anki: { label: 'Anki', bg: 'bg-purple-100', text: 'text-purple-700', icon: '🃏' },
  writing: { label: 'Writing', bg: 'bg-green-100', text: 'text-green-700', icon: '✍' },
  exercise: { label: 'Exercise', bg: 'bg-blue-100', text: 'text-blue-700', icon: '📝' },
  external: { label: 'External', bg: 'bg-yellow-100', text: 'text-yellow-700', icon: '🔗' },
} as const

interface TaskCardProps {
  task: Task
  completed: boolean
  onToggle: () => void
}

export function TaskCard({ task, completed, onToggle }: TaskCardProps) {
  const config = TYPE_CONFIG[task.type]

  return (
    <div
      className={`rounded-2xl border p-4 transition-all ${
        completed
          ? 'border-green-200 bg-green-50 opacity-80'
          : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={onToggle}
          aria-label={completed ? 'Mark incomplete' : 'Mark complete'}
          className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
            completed
              ? 'border-green-500 bg-green-500 text-white'
              : 'border-gray-300 bg-white hover:border-french-blue'
          }`}
        >
          {completed && (
            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${config.bg} ${config.text}`}>
              <span>{config.icon}</span>
              {config.label}
            </span>
            <span className="text-xs text-gray-500">{task.duration} min</span>
          </div>

          <h3 className={`mb-1 text-sm font-semibold leading-snug ${completed ? 'line-through text-gray-400' : 'text-navy'}`}>
            {task.title}
          </h3>

          <p className="whitespace-pre-line text-xs leading-relaxed text-gray-600">
            {task.description}
          </p>

          {task.youtubeId && !completed && (
            <div className="mt-3">
              <YoutubeEmbed videoId={task.youtubeId} title={task.title} />
            </div>
          )}

          {task.url && (
            <a
              href={task.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-french-blue hover:underline"
            >
              Open resource
              <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                <path d="M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V7M8 1h3m0 0v3M11 1L5.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
