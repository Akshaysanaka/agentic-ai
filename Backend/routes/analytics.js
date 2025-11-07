import { Router } from 'express'
import { SearchLog } from '../models/SearchLog.js'
import { UsageStat } from '../models/UsageStat.js'

const router = Router()

router.get('/summary', async (_req, res) => {
  res.json({ people: 60, grants: 8, suggestions: 6 })
})

export default router

// Save search log (autosave of search details)
router.post('/searchlog', async (req, res) => {
  const { userId, query, response } = req.body || {}
  if (!query) return res.status(400).json({ error: 'query required' })
  try {
    const doc = await SearchLog.create({ userId, query, response })
    res.status(201).json({ id: doc._id })
  } catch (e) {
    res.status(500).json({ error: 'failed to save' })
  }
})

// Recent searches for a user
router.get('/searchlog', async (req, res) => {
  const { userId, limit = 20 } = req.query || {}
  const filter = userId ? { userId } : {}
  const list = await SearchLog.find(filter).sort({ createdAt: -1 }).limit(Number(limit))
  res.json(list)
})

// Track usage seconds and page views
router.post('/usage', async (req, res) => {
  const { userId, seconds = 0, page } = req.body || {}
  if (!userId || !seconds) return res.status(400).json({ error: 'userId and seconds required' })
  const today = new Date()
  const ymd = today.toISOString().slice(0, 10)
  try {
    const doc = await UsageStat.findOneAndUpdate(
      { userId, date: ymd },
      {
        $inc: {
          seconds: Number(seconds),
          ...(page ? { [`pageViews.${page}`]: 1 } : {}),
        },
        $set: { updatedAt: new Date() },
      },
      { new: true, upsert: true }
    )
    res.json({ ok: true, seconds: doc.seconds })
  } catch (e) {
    res.status(500).json({ error: 'failed to update usage' })
  }
})

// Usage summary last N days
router.get('/usage/summary', async (req, res) => {
  const { userId, days = 12 } = req.query || {}
  if (!userId) return res.status(400).json({ error: 'userId required' })
  const n = Math.min(Number(days) || 12, 60)
  const end = new Date()
  const start = new Date(end)
  start.setDate(end.getDate() - n + 1)
  const startYmd = start.toISOString().slice(0, 10)
  const list = await UsageStat.find({ userId, date: { $gte: startYmd } }).sort({ date: 1 })
  res.json(list)
})
