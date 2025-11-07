import React from 'react'

export default function Insights() {
  const metrics = [
    { label: 'People', value: 60, desc: 'Total researchers in dataset' },
    { label: 'Grants', value: 8, desc: 'Open grants available' },
    { label: 'Suggestions', value: 6, desc: 'Initial collaborator suggestions' },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Insights</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map(m => (
          <div key={m.label} className="card p-6">
            <div className="text-tertiary text-sm">{m.desc}</div>
            <div className="mt-2 text-3xl font-bold text-emerald-700">{m.value}</div>
            <div className="text-slate-700">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
