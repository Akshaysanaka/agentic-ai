import React, { useEffect, useMemo, useState } from 'react'
import { getGrants } from '../services/api.js'

export default function Grants() {
  const [domain, setDomain] = useState(() => localStorage.getItem('ara:grants:domain') || 'All')
  const [saved, setSaved] = useState(() => {
    const raw = localStorage.getItem('ara:savedGrants')
    return raw ? JSON.parse(raw) : []
  })
  const [list, setList] = useState([])

  const domains = useMemo(() => ['All', 'AI/ML', 'Energy', 'Bio', 'Security', 'Environment', 'Physics'], [])

  useEffect(() => {
    getGrants(domain).then(setList).catch(() => setList([]))
  }, [domain])

  useEffect(() => {
    localStorage.setItem('ara:savedGrants', JSON.stringify(saved))
  }, [saved])

  useEffect(() => {
    localStorage.setItem('ara:grants:domain', domain)
  }, [domain])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Grants</h1>
        <select className="input max-w-xs" value={domain} onChange={(e) => setDomain(e.target.value)}>
          {domains.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map(g => (
          <div key={g._id || g.id} className="card p-4">
            <div className="font-semibold">{g.title}</div>
            <div className="text-sm text-tertiary">{g.agency} • {g.domain}</div>
            <div className="mt-3 flex gap-2">
              <button className="btn btn-accent" onClick={() => setSaved(Array.from(new Set([...saved, g._id || g.id])))}>Save</button>
              <button className="btn btn-secondary" onClick={() => alert('Apply flow would start here')}>Apply</button>
            </div>
          </div>
        ))}
      </div>
      <div className="card p-4">
        <div className="font-semibold mb-2">Saved Grants ({saved.length})</div>
        <div className="flex flex-wrap gap-2 text-sm">
          {saved.map(id => <span key={id} className="rounded-md border border-slate-300 bg-white px-3 py-1">{id}</span>)}
        </div>
      </div>
    </div>
  )
}
