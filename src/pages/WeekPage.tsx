import { useParams, Navigate } from 'react-router-dom'
import { getWeekData } from '../data/studyPlan'
import { WeekView } from '../components/week/WeekView'

export function WeekPage() {
  const { weekNum } = useParams<{ weekNum: string }>()
  const w = Number(weekNum)

  if (!weekNum || isNaN(w) || w < 1 || w > 16) {
    return <Navigate to="/" replace />
  }

  const days = getWeekData(w)

  return <WeekView weekNum={w} days={days} />
}
