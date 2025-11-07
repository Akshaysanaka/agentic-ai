import { Router } from 'express'

const router = Router()

router.post('/task', async (req, res) => {
  const { name } = req.body || {}
  res.json({ ok: true, task: name || 'unknown', queuedAt: new Date().toISOString() })
})

export default router
