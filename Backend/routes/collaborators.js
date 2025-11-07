import { Router } from 'express'
import { Profile } from '../models/Profile.js'

const router = Router()

router.get('/suggestions', async (_req, res) => {
  const list = await Profile.find().limit(6)
  res.json(list)
})

export default router
