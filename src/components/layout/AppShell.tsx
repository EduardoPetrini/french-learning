import { Outlet, useNavigate, useLocation } from 'react-router-dom'

export function AppShell() {
  const navigate = useNavigate()
  const location = useLocation()

  const isHome = location.pathname === '/'
  const isWeek = location.pathname.startsWith('/week')
  const isDay = location.pathname.startsWith('/day')

  const showBack = isWeek || isDay

  const getBackPath = () => {
    if (isDay) {
      const parts = location.pathname.split('/')
      return `/week/${parts[2]}`
    }
    return '/'
  }

  return (
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 z-10 flex h-14 items-center border-b border-gray-100 bg-cream/90 px-4 backdrop-blur-sm">
        {showBack ? (
          <button
            onClick={() => navigate(getBackPath())}
            className="flex items-center gap-1 text-sm font-medium text-french-blue"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
        ) : (
          <span className="text-sm font-bold tracking-tight text-navy">
            🇫🇷 French TCF
          </span>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-10 border-t border-gray-100 bg-cream/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-lg justify-around">
          <NavButton
            label="Home"
            active={isHome}
            onClick={() => navigate('/')}
            icon={
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            }
          />
        </div>
      </nav>
    </div>
  )
}

interface NavButtonProps {
  label: string
  active: boolean
  onClick: () => void
  icon: React.ReactNode
}

function NavButton({ label, active, onClick, icon }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-6 py-3 text-xs font-medium transition-colors ${
        active ? 'text-french-blue' : 'text-gray-400'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}
