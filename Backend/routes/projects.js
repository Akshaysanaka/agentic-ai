import { Router } from 'express'

const router = Router()

router.get('/', async (_req, res) => {
  res.json([
    { id: 'p1', title: 'Agentic Research Assistant', status: 'Active' },
    { id: 'p2', title: 'Collaborator Recommender', status: 'Planned' },
  ])
})

export default router
