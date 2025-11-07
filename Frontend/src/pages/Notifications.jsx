import React from 'react'

export default function Notifications() {
  const notes = [
    { id: 'n1', text: 'Your profile was saved successfully' },
    { id: 'n2', text: 'New grant posted in AI/ML domain' },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Notifications</h1>
      <div className="card p-6">
        {notes.map(n => (
          <div key={n.id} className="py-2 border-b last:border-0 border-slate-200">{n.text}</div>
        ))}
      </div>
    </div>
  )
}
