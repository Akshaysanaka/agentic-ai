import React from 'react'

export default function Integrations() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Integrations</h1>
      <div className="card p-6 space-y-2">
        <div className="font-medium">LangChain</div>
        <div className="text-sm text-tertiary">Add server-side key and expose `/api/langchain/search`.</div>
        <div className="font-medium mt-4">CrewAI</div>
        <div className="text-sm text-tertiary">Integrate CrewAI SDK on the server and expose `/api/crewai/suggest`.</div>
      </div>
    </div>
  )
}
