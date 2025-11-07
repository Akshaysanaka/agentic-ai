import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUsageSummary } from '../services/api.js'

export default function Dashboard() {
  const navigate = useNavigate()
  const [counts, setCounts] = useState({ people: 60, grants: 8, suggestions: 6 })
  const [usage, setUsage] = useState([])
  useEffect(() => {
    const rawUser = localStorage.getItem('ara:user')
    const user = rawUser ? JSON.parse(rawUser) : null
    if (!user) return
    getUsageSummary({ userId: user.id, days: 12 }).then(setUsage).catch(() => setUsage([]))
  }, [])
  const cards = [
    { label: 'Total People', value: counts.people },
    { label: 'Open Grants', value: counts.grants },
    { label: 'Suggested Collaborators', value: counts.suggestions },
  ]
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-heading">Dashboard</h1>
        <div className="text-sm text-tertiary">Overview of your workspace</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <div key={c.label} className="card p-6 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full gradient-bg opacity-20" />
            <div className="text-tertiary text-sm">{c.label}</div>
            <div className="mt-2 text-4xl font-extrabold text-accent">{c.value}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <div className="text-lg font-semibold text-primary">Activity</div>
            <div className="text-xs text-tertiary">Last 12 days</div>
          </div>
          {(() => {
            const chartHeight = 160 // px matches h-40
            const maxSeconds = Math.max(60, ...usage.map(u => u.seconds || 0))
            const peakMin = Math.round((Math.max(0, ...usage.map(u => u.seconds || 0))) / 60)
            const today = usage[usage.length - 1]
            const todayMin = today ? Math.round((today.seconds || 0) / 60) : 0
            return (
              <>
                <div className="flex items-center justify-end mb-2 text-xs text-tertiary">
                  <span className="mr-3">Peak: {peakMin} min</span>
                  <span>Today: {todayMin} min</span>
                </div>
                <div className="h-40 overflow-hidden grid grid-cols-12 gap-2 items-end">
                  {usage.length === 0 && Array.from({ length: 12 }).map((_, idx) => (
                    <div key={idx} className="bg-red-200/70 dark:bg-rose-900/40 rounded-md" style={{ height: `${Math.max(6, chartHeight * 0.1)}px` }} />
                  ))}
                  {usage.map((u, idx) => {
                    const h = Math.max(4, Math.min(chartHeight, Math.round(((u.seconds || 0) / maxSeconds) * chartHeight)))
                    return (
                      <div
                        key={u.date + idx}
                        className="bg-red-500/70 dark:bg-rose-500/60 rounded-md"
                        style={{ height: `${h}px` }}
                        title={`${u.date}: ${Math.round((u.seconds || 0)/60)} min`}
                      />
                    )
                  })}
                </div>
              </>
            )
          })()}
        </div>
        <div className="card p-6">
          <div className="text-lg font-semibold mb-3 text-primary">Shortcuts</div>
          <div className="space-y-2">
            <button className="btn btn-primary w-full" onClick={() => navigate('/projects')}>New Project</button>
            <button className="btn btn-secondary w-full" onClick={() => navigate('/collaborators')}>Invite Collaborator</button>
            <button className="btn btn-accent w-full" onClick={() => navigate('/grants')}>Browse Grants</button>
          </div>
        </div>
      </div>
    </div>
  )
}
