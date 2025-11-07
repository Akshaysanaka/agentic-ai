import React from 'react'

export default function Admin() {
  const tasks = [
    { id: 'a1', label: 'Re-index embeddings' },
    { id: 'a2', label: 'Run bias audit' },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <div className="card p-6">
        {tasks.map(t => (
          <div key={t.id} className="flex items-center justify-between py-2 border-b last:border-0 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div className="text-black dark:text-white">{t.label}</div>
            <button className="btn btn-secondary">Run</button>
          </div>
        ))}
      </div>
    </div>
  )
}
