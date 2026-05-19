import { useState, useCallback } from 'react'
import type { StudyDay } from '../data/types'

interface Progress {
  completedTasks: string[]
  completedDays: string[]
}

const STORAGE_KEY = 'french-tcf-progress'

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { completedTasks: [], completedDays: [] }
    return JSON.parse(raw) as Progress
  } catch {
    return { completedTasks: [], completedDays: [] }
  }
}

function saveProgress(progress: Progress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(loadProgress)

  const toggleTask = useCallback((taskId: string) => {
    setProgress((prev) => {
      const isCompleted = prev.completedTasks.includes(taskId)
      const next: Progress = {
        ...prev,
        completedTasks: isCompleted
          ? prev.completedTasks.filter((id) => id !== taskId)
          : [...prev.completedTasks, taskId],
      }
      saveProgress(next)
      return next
    })
  }, [])

  const toggleDay = useCallback((dayId: string) => {
    setProgress((prev) => {
      const isCompleted = prev.completedDays.includes(dayId)
      const next: Progress = {
        ...prev,
        completedDays: isCompleted
          ? prev.completedDays.filter((id) => id !== dayId)
          : [...prev.completedDays, dayId],
      }
      saveProgress(next)
      return next
    })
  }, [])

  const markAllTasksInDay = useCallback((day: StudyDay) => {
    setProgress((prev) => {
      const taskIds = day.tasks.map((t) => t.id)
      const existing = new Set(prev.completedTasks)
      taskIds.forEach((id) => existing.add(id))
      const next: Progress = {
        completedTasks: Array.from(existing),
        completedDays: prev.completedDays.includes(day.id)
          ? prev.completedDays
          : [...prev.completedDays, day.id],
      }
      saveProgress(next)
      return next
    })
  }, [])

  const isTaskComplete = useCallback(
    (taskId: string) => progress.completedTasks.includes(taskId),
    [progress.completedTasks]
  )

  const isDayComplete = useCallback(
    (dayId: string) => progress.completedDays.includes(dayId),
    [progress.completedDays]
  )

  const getDayCompletionRatio = useCallback(
    (day: StudyDay): number => {
      if (day.tasks.length === 0) return 0
      const done = day.tasks.filter((t) => progress.completedTasks.includes(t.id)).length
      return done / day.tasks.length
    },
    [progress.completedTasks]
  )

  const getWeekCompletionRatio = useCallback(
    (days: StudyDay[]): number => {
      if (days.length === 0) return 0
      const totalTasks = days.reduce((sum, d) => sum + d.tasks.length, 0)
      if (totalTasks === 0) return 0
      const doneTasks = days.reduce(
        (sum, d) => sum + d.tasks.filter((t) => progress.completedTasks.includes(t.id)).length,
        0
      )
      return doneTasks / totalTasks
    },
    [progress.completedTasks]
  )

  return {
    progress,
    toggleTask,
    toggleDay,
    markAllTasksInDay,
    isTaskComplete,
    isDayComplete,
    getDayCompletionRatio,
    getWeekCompletionRatio,
  }
}
