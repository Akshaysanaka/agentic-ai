import React from 'react'

export default function Analytics() {
  const charts = [
    { id: 'c1', title: 'People by Expertise', desc: 'Distribution of expertise areas' },
    { id: 'c2', title: 'Grant Domains', desc: 'Open grants by domain' },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {charts.map(c => (
          <div key={c.id} className="card p-6">
            <div className="font-semibold">{c.title}</div>
            <div className="text-sm text-tertiary">{c.desc}</div>
            <div className="mt-4 h-32 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  )
}
