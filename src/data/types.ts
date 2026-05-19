export type TaskType = 'video' | 'podcast' | 'anki' | 'writing' | 'exercise' | 'external'

export type Phase = 1 | 2 | 3

export interface Task {
  id: string
  duration: number
  type: TaskType
  title: string
  description: string
  url?: string
  youtubeId?: string
}

export interface StudyDay {
  id: string
  week: number
  day: number
  dayName: string
  totalMinutes: number
  focus: string
  phase: Phase
  tasks: Task[]
}
