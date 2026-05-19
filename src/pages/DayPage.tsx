import { useParams, Navigate } from 'react-router-dom'
import { getDayData } from '../data/studyPlan'
import { DayView } from '../components/day/DayView'

export function DayPage() {
  const { weekNum, dayNum } = useParams<{ weekNum: string; dayNum: string }>()
  const w = Number(weekNum)
  const d = Number(dayNum)

  if (!weekNum || !dayNum || isNaN(w) || isNaN(d)) {
    return <Navigate to="/" replace />
  }

  const dayData = getDayData(w, d)

  if (!dayData) {
    return <Navigate to={`/week/${w}`} replace />
  }

  return <DayView dayData={dayData} />
}
