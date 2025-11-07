import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/api.js'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState(() => localStorage.getItem('ara:login:email') || '')
  const [password, setPassword] = useState(() => localStorage.getItem('ara:login:rememberPassword') === '1' ? (localStorage.getItem('ara:login:password') || '') : '')
  const [error, setError] = useState('')
  const [remember, setRemember] = useState(() => localStorage.getItem('ara:login:remember') === '1')
  const [rememberPassword, setRememberPassword] = useState(() => localStorage.getItem('ara:login:rememberPassword') === '1')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please provide email and password')
      return
    }
    if (remember) localStorage.setItem('ara:login:email', email)
    else localStorage.removeItem('ara:login:email')
    localStorage.setItem('ara:login:remember', remember ? '1' : '0')
    if (rememberPassword) {
      localStorage.setItem('ara:login:password', password)
    } else {
      localStorage.removeItem('ara:login:password')
    }
    localStorage.setItem('ara:login:rememberPassword', rememberPassword ? '1' : '0')
    try {
      const res = await login({ email, password })
      if (res.user) {
        onLogin(res.user)
        navigate('/')
      } else {
        setError(res.error || 'Login failed')
      }
    } catch (err) {
      setError('Login failed')
    }
  }

  useEffect(() => {
    if (!remember) return
    localStorage.setItem('ara:login:email', email)
  }, [email, remember])

  useEffect(() => {
    if (!rememberPassword) return
    localStorage.setItem('ara:login:password', password)
  }, [password, rememberPassword])

  return (
    <div className="mx-auto max-w-5xl pt-16 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-md gradient-bg" />
            <div className="text-2xl font-bold text-heading">Welcome back</div>
          </div>
          <form className="space-y-4" onSubmit={submit}>
            {error && <div className="text-rose-600 text-sm">{error}</div>}
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input id="email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <input id="password" type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-secondary inline-flex items-center gap-2">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember email
                </label>
                <label className="text-sm text-secondary inline-flex items-center gap-2">
                  <input type="checkbox" checked={rememberPassword} onChange={(e) => setRememberPassword(e.target.checked)} /> Remember password (stores locally)
                </label>
              </div>
              <button className="btn btn-primary" type="submit">Login</button>
            </div>
            <div className="text-sm text-tertiary">No account? <Link className="text-accent underline" to="/signup">Sign up</Link></div>
          </form>
        </div>
        <div className="hidden md:block">
          <div className="card p-8 h-full flex flex-col justify-center bg-gradient-to-br from-red-50 to-white">
            <div className="text-3xl font-semibold text-heading mb-3">Agentic Research Assistant</div>
            <p className="text-secondary">Streamline grant discovery, manage projects, and collaborate with your team—all in one elegant workspace.</p>
            <ul className="mt-6 space-y-2 text-secondary">
              <li>• Smart profiles and team directory</li>
              <li>• Project and publication tracking</li>
              <li>• Insights, notifications, integrations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
