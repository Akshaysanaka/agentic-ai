import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../services/api.js'

export default function Signup({ onSignup }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [affiliation, setAffiliation] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    if (!name || !email || !password) {
      setError('Please fill all required fields')
      return
    }
    try {
      const res = await signup({ name, email, affiliation, password })
      if (res.user) {
        onSignup(res.user)
        navigate('/')
      } else {
        setError(res.error || 'Signup failed')
      }
    } catch (err) {
      setError('Signup failed')
    }
  }

  return (
    <div className="mx-auto max-w-5xl pt-16 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="card p-8 order-2 md:order-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-md gradient-bg" />
            <div className="text-2xl font-bold text-heading">Create your account</div>
          </div>
          <form className="space-y-4" onSubmit={submit}>
            {error && <div className="text-rose-600 text-sm">{error}</div>}
            <div>
              <label className="label" htmlFor="name">Name</label>
              <input id="name" className="input" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input id="email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="affiliation">Affiliation</label>
              <input id="affiliation" className="input" value={affiliation} onChange={(e) => setAffiliation(e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <input id="password" type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="btn btn-primary w-full" type="submit">Create account</button>
            <div className="text-sm text-tertiary">Have an account? <Link className="text-accent underline" to="/login">Login</Link></div>
          </form>
        </div>
        <div className="order-1 md:order-2">
          <div className="card p-8 h-full flex flex-col justify-center bg-gradient-to-br from-red-50 to-white">
            <div className="text-3xl font-semibold text-heading mb-3">Join your research workspace</div>
            <p className="text-secondary">Profiles, projects, publications, analytics, and more—designed with a beautiful, modern interface.</p>
            <ul className="mt-6 space-y-2 text-secondary">
              <li>• Elegant UI with responsive layout</li>
              <li>• Secure accounts and MongoDB persistence</li>
              <li>• Collaboration-ready features</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
