import React, { useState } from 'react'
import { crewaiSuggest, langchainSearch } from '../services/api.js'

export default function Settings() {
  const [semantic, setSemantic] = useState(() => localStorage.getItem('ara:semantic') === 'true')
  const [crewai, setCrewai] = useState(() => localStorage.getItem('ara:crewai') === 'true')
  const [out, setOut] = useState('')

  const save = () => {
    localStorage.setItem('ara:semantic', String(semantic))
    localStorage.setItem('ara:crewai', String(crewai))
    setOut('Saved')
    setTimeout(() => setOut(''), 1500)
  }

  const runSemanticSearch = async () => {
    const data = await langchainSearch('LLM evaluation datasets')
    setOut('LangChain mock response: ' + JSON.stringify(data.results?.[0]))
  }

  const runCrewAi = async () => {
    const data = await crewaiSuggest({ id: 'demo' })
    setOut('CrewAI mock response: ' + JSON.stringify(data.collaborators?.[0]))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-primary">Enable Semantic Search (LangChain)</div>
        <div className="text-sm text-tertiary">Toggle prototype semantic search.</div>
          </div>
          <input type="checkbox" className="h-5 w-5" checked={semantic} onChange={(e) => setSemantic(e.target.checked)} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-primary">Enable CrewAI Recommendations</div>
        <div className="text-sm text-tertiary">Prototyping collaborator/grant suggestions.</div>
          </div>
          <input type="checkbox" className="h-5 w-5" checked={crewai} onChange={(e) => setCrewai(e.target.checked)} />
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary text-primary" onClick={save}>Save</button>
          <button className="btn btn-secondary text-primary" onClick={runSemanticSearch} disabled={!semantic}>Test LangChain</button>
          <button className="btn btn-accent text-primary" onClick={runCrewAi} disabled={!crewai}>Test CrewAI</button>
        </div>
        {out && <div className="text-sm text-teal-700">{out}</div>}
      </div>
    </div>
  )
}
