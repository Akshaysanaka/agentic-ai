const API = import.meta.env.VITE_API_BASE_URL || 'https://agentic-backend.onrender.com/api'

export async function getProfiles() {
  const res = await fetch(`${API}/profiles`)
  return res.json()
}

export async function getProfile(id) {
  const res = await fetch(`${API}/profiles/${id}`)
  return res.json()
}

export async function saveProfileDescription(id, description) {
  const res = await fetch(`${API}/profiles/saveDescription`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, description })
  })
  return res.json()
}

export async function getGrants(domain = 'All') {
  const params = new URLSearchParams()
  if (domain && domain !== 'All') params.set('domain', domain)
  const res = await fetch(`${API}/grants?${params}`)
  return res.json()
}

export async function langchainSearch(query) {
  const res = await fetch(`${API}/langchain/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  })
  return res.json()
}

export async function crewaiSuggest(profile) {
  const res = await fetch(`${API}/crewai/suggest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile })
  })
  return res.json()
}

export async function signup(data) {
  const res = await fetch(`${API}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function login(data) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function getOrCreateMyProfile({ userId, name, email, affiliation }) {
  const params = new URLSearchParams()
  if (name) params.set('name', name)
  if (email) params.set('email', email)
  if (affiliation) params.set('affiliation', affiliation)
  const res = await fetch(`${API}/profiles/byUser/${userId}?${params.toString()}`)
  return res.json()
}

export async function saveSearchLog({ userId, query, response }) {
  const res = await fetch(`${API}/analytics/searchlog`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, query, response })
  })
  return res.json()
}

export async function postUsage({ userId, seconds, page }) {
  const res = await fetch(`${API}/analytics/usage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, seconds, page })
  })
  return res.json()
}

export async function getUsageSummary({ userId, days = 12 }) {
  const params = new URLSearchParams({ userId, days: String(days) })
  const res = await fetch(`${API}/analytics/usage/summary?${params.toString()}`)
  return res.json()
}