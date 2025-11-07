import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import Collaborators from './pages/Collaborators.jsx'
import Grants from './pages/Grants.jsx'
import Insights from './pages/Insights.jsx'
import Settings from './pages/Settings.jsx'
import Projects from './pages/Projects.jsx'
import Publications from './pages/Publications.jsx'
import Notifications from './pages/Notifications.jsx'
import Team from './pages/Team.jsx'
import Analytics from './pages/Analytics.jsx'
import Integrations from './pages/Integrations.jsx'
import Admin from './pages/Admin.jsx'
import People from './pages/People.jsx'
import AIAgent from './pages/AIAgent.jsx'
import ChatWidget from './components/ChatWidget.jsx'

function useSession() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('ara:user')
    return raw ? JSON.parse(raw) : null
  })
  useEffect(() => {
    if (user) localStorage.setItem('ara:user', JSON.stringify(user))
    else localStorage.removeItem('ara:user')
  }, [user])
  return { user, setUser }
}

function AvatarMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        aria-label="User menu"
        className="flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-800"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">
          {user?.name?.[0] || 'U'}
        </span>
        <span className="hidden sm:block text-sm text-slate-800 dark:text-slate-100">{user?.name || 'User'}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 shadow-md">
          <div className="px-2 py-1 text-sm text-slate-600 dark:text-slate-300">{user?.email}</div>
          <button className="btn btn-accent w-full mt-2" onClick={onLogout}>Logout</button>
        </div>
      )}
    </div>
  )
}

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('ara:theme:dark', next ? '1' : '0')
  }
  return (
    <button
      onClick={toggle}
      className="h-9 w-9 rounded-md border border-red-200 text-red-700 hover:bg-red-50 flex items-center justify-center"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {dark ? '🌙' : '☀️'}
    </button>
  )
}

function AppLayout({ user, onLogout, children }) {
  const links = useMemo(() => [
    { to: '/', label: 'Dashboard' },
    { to: '/people', label: 'People' },
    { to: '/profile', label: 'Profile' },
    { to: '/collaborators', label: 'Collaborators' },
    { to: '/grants', label: 'Grants' },
    { to: '/insights', label: 'Insights' },
    { to: '/projects', label: 'Projects' },
    { to: '/publications', label: 'Publications' },
    { to: '/notifications', label: 'Notifications' },
    { to: '/team', label: 'Team' },
    { to: '/analytics', label: 'Analytics' },
    { to: '/integrations', label: 'Integrations' },
    { to: '/admin', label: 'Admin' },
    { to: '/settings', label: 'Settings' },
    { to: '/ai-agent', label: 'AI Agent' },
  ], [])

  const [sidebarOpen, setSidebarOpen] = useState(false)
  useEffect(() => {
    const saved = localStorage.getItem('ara:theme:dark') === '1'
    document.documentElement.classList.toggle('dark', saved)
  }, [])

  return (
    <div className="min-h-screen page-bg text-slate-900 dark:text-slate-100">
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/60 backdrop-blur border-b border-red-200/60 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-red-200 text-red-700 hover:bg-red-50"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label="Toggle navigation"
            >
              <span className="h-4 w-4">☰</span>
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-md gradient-bg shadow float" />
              <span className="text-lg font-bold" style={{ color: 'var(--text-heading)' }}>Agentic Research Assistant</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <AvatarMenu user={user} onLogout={onLogout} />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[260px_1fr] gap-6 px-4 py-6">
        <aside className={`card p-3 h-max md:sticky md:top-20 ${sidebarOpen ? '' : 'hidden md:block'}`}>
          <nav className="space-y-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `block rounded-md px-3 py-2 text-sm transition-colors ${isActive ? 'bg-red-600 text-white shadow' : 'text-secondary hover:bg-red-50 dark:hover:bg-slate-800/60'}`}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main>
          {children}
        </main>
      </div>

      <footer className="border-t border-red-200/60 bg-white/70 dark:bg-slate-900/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 text-sm text-tertiary">
          Prototype UI enhanced with Tailwind. Data persists via API/MongoDB.
        </div>
      </footer>
      <ChatWidget user={user} />
    </div>
  )
}

export default function App() {
  const { user, setUser } = useSession()
  const navigate = useNavigate()
  const lastPingRef = useRef(Date.now())

  const handleLogout = () => {
    setUser(null)
    navigate('/login')
  }

  // Usage tracker: ping every 15s while user is active
  useEffect(() => {
    if (!user) return
    let timer = setInterval(async () => {
      const now = Date.now()
      const deltaSec = Math.round((now - lastPingRef.current) / 1000)
      lastPingRef.current = now
      try {
        const path = window.location.pathname
        await fetch('/api/analytics/usage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, seconds: deltaSec, page: path })
        })
      } catch {}
    }, 15000)
    const onVis = () => { lastPingRef.current = Date.now() }
    document.addEventListener('visibilitychange', onVis)
    return () => { clearInterval(timer); document.removeEventListener('visibilitychange', onVis) }
  }, [user])

  return (
    <Routes>
      {!user ? (
        <>
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/signup" element={<Signup onSignup={setUser} />} />
          <Route path="*" element={<Login onLogin={setUser} />} />
        </>
      ) : (
        <Route
          path="/"
          element={
            <AppLayout user={user} onLogout={handleLogout}>
              <Dashboard />
            </AppLayout>
          }
        />
      )}
      {user && (
        <>
          <Route path="/people" element={<AppLayout user={user} onLogout={handleLogout}><People /></AppLayout>} />
          <Route path="/profile" element={<AppLayout user={user} onLogout={handleLogout}><Profile user={user} /></AppLayout>} />
          <Route path="/collaborators" element={<AppLayout user={user} onLogout={handleLogout}><Collaborators /></AppLayout>} />
          <Route path="/grants" element={<AppLayout user={user} onLogout={handleLogout}><Grants /></AppLayout>} />
          <Route path="/insights" element={<AppLayout user={user} onLogout={handleLogout}><Insights /></AppLayout>} />
          <Route path="/projects" element={<AppLayout user={user} onLogout={handleLogout}><Projects /></AppLayout>} />
          <Route path="/publications" element={<AppLayout user={user} onLogout={handleLogout}><Publications /></AppLayout>} />
          <Route path="/notifications" element={<AppLayout user={user} onLogout={handleLogout}><Notifications /></AppLayout>} />
          <Route path="/team" element={<AppLayout user={user} onLogout={handleLogout}><Team /></AppLayout>} />
          <Route path="/analytics" element={<AppLayout user={user} onLogout={handleLogout}><Analytics /></AppLayout>} />
          <Route path="/integrations" element={<AppLayout user={user} onLogout={handleLogout}><Integrations /></AppLayout>} />
          <Route path="/admin" element={<AppLayout user={user} onLogout={handleLogout}><Admin /></AppLayout>} />
          <Route path="/settings" element={<AppLayout user={user} onLogout={handleLogout}><Settings /></AppLayout>} />
          <Route path="/ai-agent" element={<AppLayout user={user} onLogout={handleLogout}><AIAgent /></AppLayout>} />
        </>
      )}
    </Routes>
  )
}
