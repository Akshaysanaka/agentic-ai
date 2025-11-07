import React from 'react'

export default function Publications() {
  const pubs = [
    { id: 'pub1', title: 'RAG with LangChain', venue: 'NeurIPS Workshops 2024' },
    { id: 'pub2', title: 'CrewAI for Collaboration', venue: 'AAAI 2025' },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Publications</h1>
      <div className="card p-6">
        <ul className="list-disc ml-6">
          {pubs.map(p => (
            <li key={p.id} className="mb-1">
            <span className="font-medium text-primary">{p.title}</span> — <span className="text-tertiary">{p.venue}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
