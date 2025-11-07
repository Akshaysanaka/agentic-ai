import { Router } from 'express'

const router = Router()

router.get('/', async (_req, res) => {
  res.json([
    { id: 'n1', text: 'Your profile was saved successfully' },
    { id: 'n2', text: 'New grant posted in AI/ML domain' },
  ])
})

export default router
