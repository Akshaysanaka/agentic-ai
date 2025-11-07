import { Router } from 'express'
import { Grant } from '../models/Grant.js'

const router = Router()

router.get('/', async (req, res) => {
  const { domain } = req.query
  const filter = domain && domain !== 'All' ? { domain } : {}
  const list = await Grant.find(filter).limit(200)
  res.json(list)
})

router.post('/', async (req, res) => {
  const created = await Grant.create(req.body)
  res.status(201).json(created)
})

export default router
