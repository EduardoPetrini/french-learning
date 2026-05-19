import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { HomePage } from './pages/HomePage'
import { WeekPage } from './pages/WeekPage'
import { DayPage } from './pages/DayPage'

export default function App() {
  return (
    <BrowserRouter basename="/french-learning">
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/week/:weekNum" element={<WeekPage />} />
          <Route path="/day/:weekNum/:dayNum" element={<DayPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
