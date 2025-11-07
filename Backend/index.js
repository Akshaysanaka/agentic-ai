import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectMongo } from './db.js'
import profilesRoute from './routes/profiles.js'
import grantsRoute from './routes/grants.js'
import collaboratorsRoute from './routes/collaborators.js'
import agentsRoute from './routes/agents.js'
import publicationsRoute from './routes/publications.js'
import notificationsRoute from './routes/notifications.js'
import analyticsRoute from './routes/analytics.js'
import adminRoute from './routes/admin.js'
import projectsRoute from './routes/projects.js'
import integrationsRoute from './routes/integrations.js'
import authRoute from './routes/auth.js'
import seedRoute from './routes/seed.js'
import { Profile } from './models/Profile.js'
import { Grant } from './models/Grant.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/profiles', profilesRoute)
app.use('/api/grants', grantsRoute)
app.use('/api/collaborators', collaboratorsRoute)
app.use('/api', agentsRoute)
app.use('/api/publications', publicationsRoute)
app.use('/api/notifications', notificationsRoute)
app.use('/api/analytics', analyticsRoute)
app.use('/api/admin', adminRoute)
app.use('/api/projects', projectsRoute)
app.use('/api/integrations', integrationsRoute)
app.use('/api/auth', authRoute)
app.use('/api/seed', seedRoute)

const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://akshaysanaka07_db_user:HZMvpmlJrQlHDpWJ@cluster0.vl01zdp.mongodb.net/?appName=Cluster0'

connectMongo(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    // Ensure key profiles exist (helps AI answers)
    const keyProfiles = [
      { name: 'Aarav Sharma', email: 'aarav.sharma@iitb.ac.in', affiliation: 'IIT Bombay', expertise: ['AI/ML', 'Systems'], location: 'Mumbai, India', projects: [{ title: 'AI Research Project', description: 'Advanced machine learning research in neural networks and deep learning applications focused on real-world deployments.' }] },
      { name: 'Aditi Rao', email: 'aditi.rao@iisc.ac.in', affiliation: 'IISc Bangalore', expertise: ['Bio', 'NLP'], location: 'Bengaluru, India', projects: [{ title: 'Bioinformatics NLP', description: 'Natural language processing for biological data analysis.' }] },
      { name: 'Ananya Mukherjee', email: 'ananya.mukherjee@iitb.ac.in', affiliation: 'IIT Bombay', expertise: ['AI/ML', 'NLP', 'IR'], location: 'Mumbai, India', projects: [{ title: 'Agentic Research Assistant', description: 'Intelligent research assistant system using AI and NLP for information retrieval.' }] },
    ]
    Promise.all(
      keyProfiles.map(async (p) => {
        const found = await Profile.findOne({ email: p.email })
        if (!found) {
          await Profile.create(p)
          console.log(`Seeded profile: ${p.name}`)
        }
      })
    ).catch(() => {})
    // Ensure at least a couple of grants exist
    Grant.findOne({ title: 'AI for Social Good' })
      .then(async (g) => {
        if (!g) {
          await Grant.create([
            { title: 'AI for Social Good', domain: 'AI/ML', agency: 'Global Research Foundation', description: 'Funding for AI projects with positive societal impact.' },
            { title: 'Energy Efficient Systems', domain: 'Energy', agency: 'National Science Council', description: 'Grants for research on low-power and sustainable systems.' },
          ])
          console.log('Seeded example grants')
        }
      })
      .catch(() => {})
    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Failed to connect MongoDB', err)
    process.exit(1)
  })
