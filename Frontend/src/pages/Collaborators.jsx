import React, { useEffect, useState } from 'react'
import people from '../data/mockPeople.js'

export default function Collaborators() {
  const [team, setTeam] = useState(() => {
    const raw = localStorage.getItem('ara:team')
    return raw ? JSON.parse(raw) : []
  })
  const [suggestions, setSuggestions] = useState(people.slice(0, 6))
  const [toast, setToast] = useState('')

  useEffect(() => {
    localStorage.setItem('ara:team', JSON.stringify(team))
  }, [team])

  const addToTeam = (p) => {
    if (team.find(t => t.id === p.id)) return
    setTeam([...team, p])
    setToast(`${p.name} added to team`)
    setTimeout(() => setToast(''), 1500)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Collaborator Suggestions</h1>
      {toast && <div className="text-sm text-emerald-700">{toast}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestions.map((p) => (
          <div key={p.id} className="card p-4">
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-tertiary">{p.affiliation}</div>
            <div className="mt-2 flex gap-2 flex-wrap">
              {p.expertise.slice(0, 3).map((x) => (
                <span key={x} className="rounded-full bg-teal-50 px-2 py-0.5 text-xs text-teal-800 border border-teal-200">{x}</span>
              ))}
            </div>
            <button className="btn btn-secondary mt-4 w-full" onClick={() => addToTeam(p)}>Add to Team</button>
          </div>
        ))}
      </div>
      <div className="card p-4">
        <div className="font-semibold mb-2">Your Team ({team.length})</div>
        <div className="flex flex-wrap gap-2">
          {team.map((m) => (
            <span key={m.id} className="rounded-md border border-slate-300 bg-slate-50 dark:bg-gray-900 px-3 py-1 text-sm text-black dark:text-white">{m.name}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
