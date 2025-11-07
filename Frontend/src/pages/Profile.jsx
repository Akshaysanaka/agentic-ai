import React, { useEffect, useState } from 'react'
import { getOrCreateMyProfile, saveProfileDescription } from '../services/api.js'

export default function Profile({ user }) {
  const [profile, setProfile] = useState(null)
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const p = await getOrCreateMyProfile({
          userId: user.id,
          name: user.name,
          email: user.email,
          affiliation: user.affiliation,
        })
        if (cancelled) return
        setProfile(p)
        setDescription(p?.projects?.[0]?.description || '')
      } catch (e) {
        // fallback: empty state
      }
    }
    load()
    return () => { cancelled = true }
  }, [user])

  const handleSave = async () => {
    if (!profile?._id) return
    setStatus('Saving...')
    try {
      await saveProfileDescription(profile._id, description)
      setStatus('Saved')
      setProfile({ ...profile, projects: [{ ...(profile.projects?.[0] || { title: 'Project 1' }), description }] })
    } catch (e) {
      setStatus('Failed to save')
    } finally {
      setTimeout(() => setStatus(''), 2000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Profile</h1>
        {status && <div className="text-sm text-red-700">{status}</div>}
      </div>
      <div className="card p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="text-xl font-semibold text-primary">{user?.name}</div>
            <div className="text-tertiary text-sm">{user?.email} • {profile?.affiliation || user?.affiliation}</div>
            <div className="text-tertiary text-sm">{profile?.location || ''}</div>
          </div>
          {profile?.expertise?.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {profile.expertise.map((x) => (
                <span key={x} className="rounded-full bg-red-50 px-3 py-1 text-xs text-red-800 border border-red-200">{x}</span>
              ))}
            </div>
          )}
        </div>
        <div>
          <label className="label" htmlFor="desc">Project description</label>
          <div className="rounded-md border border-red-200 overflow-hidden">
            <textarea
              id="desc"
              className="w-full px-3 py-3 min-h-[18rem] focus:outline-none font-mono whitespace-pre-wrap"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              aria-label="Project description editor"
              placeholder="Describe your current research project, goals, methods, and milestones..."
            />
            <div className="flex justify-end gap-2 border-t border-red-200 bg-red-50 px-3 py-2">
              <button className="btn btn-secondary" onClick={() => setDescription(profile?.projects?.[0]?.description || '')}>Reset</button>
              <button className="btn btn-primary" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
