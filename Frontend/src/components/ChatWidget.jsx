import React, { useEffect, useRef, useState } from 'react'
import { saveSearchLog } from '../services/api.js'

export default function ChatWidget({ user }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(() => {
    const raw = localStorage.getItem('ara:chatw:messages')
    return raw ? JSON.parse(raw) : []
  })
  const [input, setInput] = useState(() => localStorage.getItem('ara:chatw:draft') || '')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  useEffect(() => { localStorage.setItem('ara:chatw:draft', input) }, [input])
  useEffect(() => { localStorage.setItem('ara:chatw:messages', JSON.stringify(messages)) }, [messages])
  useEffect(() => { if (open && endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' }) }, [messages, open])

  const send = async () => {
    if (!input.trim()) return
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage.content })
      })
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }
      
      const data = await response.json()
      const aiMessage = { role: 'ai', content: data.response || 'Sorry, I couldn\'t process that.' }
      setMessages(prev => [...prev, aiMessage])
      try { await saveSearchLog({ userId: user?.id, query: userMessage.content, response: aiMessage.content }) } catch {}
    } catch (error) {
      console.error('Chat widget error:', error)
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: `Error: ${error.message || 'Unable to connect to AI agent. Please make sure the backend is running on port 5000.'}` 
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed left-4 bottom-4 z-50">
      {!open && (
        <button
          className="h-12 w-12 rounded-full gradient-bg shadow-lg text-white text-xl flex items-center justify-center"
          aria-label="Open chat"
          onClick={() => setOpen(true)}
        >
          ✨
        </button>
      )}
      {open && (
        <div className="card w-[360px] max-w-[95vw] h-[480px] flex flex-col shadow-2xl">
          <div className="flex items-center justify-between px-3 py-2 border-b border-red-200/50">
            <div className="text-sm font-semibold">AI Assistant</div>
            <button className="text-sm text-accent" onClick={() => setOpen(false)}>Close</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 bg-red-50/40 dark:bg-slate-900/40">
            {messages.length === 0 && (
              <div className="text-sm text-tertiary">Ask about the app, projects, grants, or ML/AI topics.</div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`mb-2 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block max-w-[80%] rounded-md px-3 py-2 text-sm shadow ${m.role === 'user' ? 'bg-red-600 text-white' : 'bg-white dark:bg-slate-900/70 border border-red-200 dark:border-slate-700 text-primary dark:text-slate-100'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && <div className="text-left text-sm text-tertiary">Thinking…</div>}
            <div ref={endRef} />
          </div>
          <div className="p-3 border-t border-red-200/50 flex gap-2">
            <input
              className="input flex-1"
              placeholder="Type your question…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
            />
            <button className="btn btn-primary" onClick={send} disabled={loading}>Send</button>
          </div>
        </div>
      )}
    </div>
  )
}


