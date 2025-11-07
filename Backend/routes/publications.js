import { Router } from 'express'

const router = Router()

router.get('/', async (_req, res) => {
  const pubs = [
    { id: 'pub1', title: 'RAG with LangChain', venue: 'NeurIPS Workshops 2024' },
    { id: 'pub2', title: 'CrewAI for Collaboration', venue: 'AAAI 2025' },
  ]
  res.json(pubs)
})

export default router
