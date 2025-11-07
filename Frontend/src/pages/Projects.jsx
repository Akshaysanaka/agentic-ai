import React from 'react'

export default function Projects() {
  const items = [
    { id: 'p1', title: 'Agentic Research Assistant', status: 'Active' },
    { id: 'p2', title: 'Collaborator Recommender', status: 'Planned' },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(p => (
          <div key={p.id} className="card p-4">
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm text-tertiary">{p.status}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
