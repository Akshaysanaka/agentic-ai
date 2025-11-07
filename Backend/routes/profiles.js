import { Router } from 'express'
import { Profile } from '../models/Profile.js'

const router = Router()

// Get or create profile for a given userId
router.get('/byUser/:userId', async (req, res) => {
  const { userId } = req.params
  if (!userId) return res.status(400).json({ error: 'userId required' })
  let doc = await Profile.findOne({ userId })
  if (!doc) {
    const { name, email, affiliation } = req.query || {}
    doc = await Profile.create({
      userId,
      name: name || 'New User',
      email: email || '',
      affiliation: affiliation || '',
      projects: [{ title: 'Project 1', description: '' }],
    })
  }
  res.json(doc)
})

router.get('/', async (_req, res) => {
  const list = await Profile.find().limit(200)
  res.json(list)
})

router.get('/:id', async (req, res) => {
  const one = await Profile.findById(req.params.id)
  if (!one) return res.status(404).json({ error: 'Not found' })
  res.json(one)
})

router.post('/', async (req, res) => {
  const doc = await Profile.create(req.body)
  res.status(201).json(doc)
})

router.post('/saveDescription', async (req, res) => {
  const { id, description } = req.body || {}
  if (!id) return res.status(400).json({ error: 'id required' })
  const doc = await Profile.findById(id)
  if (!doc) return res.status(404).json({ error: 'Not found' })
  doc.projects = [{ title: doc.projects?.[0]?.title || 'Project 1', description }]
  await doc.save()
  res.json({ ok: true })
})

export default router
