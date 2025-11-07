import React, { useEffect, useState } from 'react'
import { saveSearchLog } from '../services/api.js'

export default function AIAgent({ user }) {
  const [messages, setMessages] = useState(() => {
    const raw = localStorage.getItem('ara:aiagent:messages')
    return raw ? JSON.parse(raw) : []
  })
  const [input, setInput] = useState(() => localStorage.getItem('ara:aiagent:draft') || '')
  const [loading, setLoading] = useState(false)

  // Autosave draft and transcript
  useEffect(() => {
    localStorage.setItem('ara:aiagent:draft', input)
  }, [input])
  useEffect(() => {
    localStorage.setItem('ara:aiagent:messages', JSON.stringify(messages))
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input }),
      })
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }
      
      const data = await response.json()
      const aiMessage = { role: 'ai', content: data.response || 'Sorry, I couldn\'t process that.' }
      setMessages(prev => [...prev, aiMessage])

      // Persist search interaction (autosave to MongoDB)
      try {
        await saveSearchLog({ userId: user?.id, query: userMessage.content, response: aiMessage.content })
      } catch {}
    } catch (error) {
      console.error('AI Agent error:', error)
      const errorMessage = { 
        role: 'ai', 
        content: `Error: ${error.message || 'Unable to connect to AI agent. Please make sure the backend is running on port 5000.'}` 
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-heading mb-6">AI Agent</h1>
      <div className="card p-8 shadow-xl">
        <div className="h-96 overflow-y-auto border border-red-200 rounded-lg p-6 mb-6 bg-red-50">
          {messages.length === 0 && (
            <p className="text-red-600 italic">Ask me anything about research, collaboration, or insights!</p>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block max-w-xs lg:max-w-md px-4 py-3 rounded-lg shadow-md ${msg.role === 'user' ? 'bg-red-600 text-white' : 'bg-white dark:bg-slate-900/70 text-primary dark:text-slate-100 border border-red-200 dark:border-slate-700'}`}>
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-left mb-4">
              <div className="inline-block px-4 py-3 rounded-lg bg-white dark:bg-slate-900/70 text-primary dark:text-slate-100 border border-red-200 dark:border-slate-700 shadow-md">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
            className="input flex-1 px-4 py-3 rounded-lg shadow-sm"
          />
          <button onClick={handleSend} disabled={loading} className="btn btn-primary px-6 py-3">
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
