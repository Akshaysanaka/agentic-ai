import React, { useMemo, useState } from 'react'
import people from '../data/mockPeople.js'

export default function People() {
  const [q, setQ] = useState('')
  const allExpertise = useMemo(() => Array.from(new Set(people.flatMap(p => p.expertise))), [])
  const [expert, setExpert] = useState('All')

  const list = people.filter(p => {
    const matchesQ = !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.email.toLowerCase().includes(q.toLowerCase())
    const matchesE = expert === 'All' || p.expertise.includes(expert)
    return matchesQ && matchesE
  })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">People</h1>
      <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
        <input className="input md:max-w-sm" placeholder="Search by name or email" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="input md:max-w-xs" value={expert} onChange={(e) => setExpert(e.target.value)}>
          <option>All</option>
          {allExpertise.map(e => <option key={e}>{e}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(p => (
          <div key={p.id} className="card p-4">
            <div className="font-semibold text-primary">{p.name}</div>
            <div className="text-sm text-tertiary">{p.email}</div>
            <div className="text-sm text-tertiary">{p.affiliation}</div>
            <div className="mt-2 flex gap-2 flex-wrap">
              {p.expertise.slice(0,3).map(x => <span key={x} className="rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-900 border border-amber-200">{x}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
