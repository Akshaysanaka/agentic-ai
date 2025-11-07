import React from 'react'

export default function Team() {
  const savedTeam = JSON.parse(localStorage.getItem('ara:team') || '[]')
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Team</h1>
      <div className="card p-6">
        <div className="font-medium mb-2">Members ({savedTeam.length})</div>
        <div className="flex flex-wrap gap-2">
          {savedTeam.map(m => <span key={m.id} className="rounded-md border border-slate-300 bg-slate-50 dark:bg-gray-900 px-3 py-1 text-sm text-black dark:text-white">{m.name}</span>)}
        </div>
      </div>
    </div>
  )
}
