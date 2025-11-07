import { Router } from 'express'
import { semanticSearchLangChain } from '../agents/langchainAgent.js'
import { getCrewAISuggestions } from '../agents/crewAIAgent.js'
import { Profile } from '../models/Profile.js'
import { Grant } from '../models/Grant.js'

const router = Router()

router.post('/langchain/search', async (req, res) => {
  const { query } = req.body || {}
  const results = await semanticSearchLangChain(query || '')
  res.json({ query, results })
})

router.post('/crewai/suggest', async (req, res) => {
  const { profile } = req.body || {}
  const suggestions = await getCrewAISuggestions(profile || {})
  res.json(suggestions)
})

router.post('/chat', async (req, res) => {
  const { query } = req.body || {}
  if (!query) return res.status(400).json({ error: 'Query is required' })

  const q = String(query).toLowerCase()
  const isAimlQuery = /\b(ai|ml|aiml|machine\s*learning|artificial\s*intelligence)\b/.test(q) && /\b(who|people|person|done|did|owner|authors?)\b/.test(q)
  const aboutMatch = /\babout\s+(.+)/i.exec(query || '')

  if (isAimlQuery) {
    try {
      const textRegex = new RegExp('(ai|ml|machine learning|artificial intelligence)', 'i')
      const profiles = await Profile.find({
        $or: [
          { expertise: { $in: [/AI/i, /ML/i, /AI\/ML/i, /Machine Learning/i, /Artificial Intelligence/i] } },
          { 'projects.title': textRegex },
          { 'projects.description': textRegex },
        ],
      })
        .select('name email affiliation projects')
        .limit(15)

      if (!profiles || profiles.length === 0) {
        return res.json({ response: 'I could not find people with AI/ML projects in the database.' })
      }

      const lines = profiles.map((p) => {
        const aiProjects = (p.projects || []).filter(pr => textRegex.test(pr.title || '') || textRegex.test(pr.description || ''))
        const topTitles = aiProjects.slice(0, 2).map(pr => pr.title || 'Untitled Project')
        const parts = [
          `• ${p.name}${p.affiliation ? ` — ${p.affiliation}` : ''}${p.location ? `, ${p.location}` : ''}`,
          p.expertise?.length ? `  Expertise: ${(p.expertise || []).slice(0, 5).join(', ')}` : null,
          p.email ? `  Email: ${p.email}` : null,
          topTitles.length ? `  Projects: ${topTitles.join(' | ')}` : null,
        ].filter(Boolean)
        return parts.join('\n')
      })

      const header = 'People who have worked on AI/ML projects:'
      return res.json({ response: [header, '', ...lines].join('\n\n') })
    } catch (e) {
      // fall through to mock when DB fails
    }
  }

  // Person lookup: "about <name>" -> summarize profile
  if (aboutMatch && aboutMatch[1]) {
    try {
      const nameQuery = aboutMatch[1].trim()
      // Try exact match first, then partial match
      let profiles = await Profile.find({ 
        $or: [
          { name: { $regex: `^${nameQuery}$`, $options: 'i' } },
          { name: { $regex: nameQuery, $options: 'i' } },
          { email: { $regex: nameQuery, $options: 'i' } }
        ]
      }).limit(5)
      
      if (!profiles || profiles.length === 0) {
        return res.json({ 
          response: `I couldn't find a profile for "${nameQuery}".\n\nTo add profiles to the database, you can:\n1. Use the seed endpoint: POST /api/seed/profiles\n2. Create profiles through the Profile page\n3. Ask me about other people who might be in the database.` 
        })
      }
      const lines = profiles.map((p) => {
        const expertise = (p.expertise || []).slice(0, 5).join(', ')
        const proj = (p.projects || [])
          .slice(0, 2)
          .map((pr) => `${pr.title || 'Untitled'}${pr.description ? ` — ${String(pr.description).slice(0, 90)}...` : ''}`)
        return [
          `• ${p.name}${p.affiliation ? ` (${p.affiliation})` : ''}`,
          p.email ? `  Email: ${p.email}` : null,
          expertise ? `  Expertise: ${expertise}` : null,
          proj.length ? `  Projects: ${proj.join(' | ')}` : null,
        ]
          .filter(Boolean)
          .join('\n')
      })
      const header = 'Here is what I found:'
      return res.json({ response: [header, ...lines].join('\n') })
    } catch (e) {
      // continue to fallback
    }
  }

  // General question handler - search across profiles, grants, projects, publications, and analytics
  try {
    const searchTerm = String(query).toLowerCase()

    // Search profiles
    const profileResults = await Profile.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
        { affiliation: { $regex: searchTerm, $options: 'i' } },
        { expertise: { $in: [new RegExp(searchTerm, 'i')] } },
        { 'projects.title': { $regex: searchTerm, $options: 'i' } },
        { 'projects.description': { $regex: searchTerm, $options: 'i' } },
      ],
    })
      .select('name email affiliation expertise location projects')
      .limit(10)

    // Search grants
    const grantResults = await Grant.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { domain: { $regex: searchTerm, $options: 'i' } },
        { agency: { $regex: searchTerm, $options: 'i' } },
      ],
    }).select('title domain agency').limit(10)

    // Search projects (mock data for now)
    const projectResults = [
      { id: 'p1', title: 'Agentic Research Assistant', status: 'Active' },
      { id: 'p2', title: 'Collaborator Recommender', status: 'Planned' },
    ].filter(p => p.title.toLowerCase().includes(searchTerm) || p.status.toLowerCase().includes(searchTerm))

    // Search publications (mock data for now)
    const publicationResults = [
      { id: 'pub1', title: 'RAG with LangChain', venue: 'NeurIPS Workshops 2024' },
      { id: 'pub2', title: 'CrewAI for Collaboration', venue: 'AAAI 2025' },
    ].filter(p => p.title.toLowerCase().includes(searchTerm) || p.venue.toLowerCase().includes(searchTerm))

    // Search analytics summary
    const analyticsResults = { people: 60, grants: 8, suggestions: 6 }
    const analyticsMatches = Object.keys(analyticsResults).filter(key => key.includes(searchTerm))

    if ((profileResults && profileResults.length > 0) || (grantResults && grantResults.length > 0) ||
        projectResults.length > 0 || publicationResults.length > 0 || analyticsMatches.length > 0) {
      const profileBlocks = (profileResults || []).slice(0, 5).map((p) => {
        const exp = (p.expertise || []).slice(0, 5).join(', ')
        const projTitles = (p.projects || []).slice(0, 2).map(pr => pr.title || 'Untitled')
        const parts = [
          `• ${p.name}${p.affiliation ? ` — ${p.affiliation}` : ''}${p.location ? `, ${p.location}` : ''}`,
          p.email ? `  Email: ${p.email}` : null,
          exp ? `  Expertise: ${exp}` : null,
          projTitles.length ? `  Projects: ${projTitles.join(' | ')}` : null,
        ].filter(Boolean)
        return parts.join('\n')
      })
      const grantLines = (grantResults || []).slice(0, 5).map((g) => `• ${g.title}${g.agency ? ` — ${g.agency}` : ''}${g.domain ? ` [${g.domain}]` : ''}`)
      const projectLines = projectResults.slice(0, 5).map((p) => `• ${p.title} (${p.status})`)
      const publicationLines = publicationResults.slice(0, 5).map((p) => `• ${p.title} — ${p.venue}`)
      const analyticsLines = analyticsMatches.map((key) => `• ${key}: ${analyticsResults[key]}`)

      const parts = []
      if (profileBlocks.length) parts.push(`Profiles related to "${query}":\n\n${profileBlocks.join('\n\n')}${(profileResults?.length || 0) > 5 ? '\n\n...and more' : ''}`)
      if (grantLines.length) parts.push(`Grants related to "${query}":\n${grantLines.join('\n')}${(grantResults?.length || 0) > 5 ? '\n...and more' : ''}`)
      if (projectLines.length) parts.push(`Projects related to "${query}":\n${projectLines.join('\n')}`)
      if (publicationLines.length) parts.push(`Publications related to "${query}":\n${publicationLines.join('\n')}`)
      if (analyticsLines.length) parts.push(`Analytics related to "${query}":\n${analyticsLines.join('\n')}`)
      return res.json({ response: parts.join('\n\n') })
    }
  } catch (e) {
    // Continue to fallback
  }

  // Fallback: Provide helpful general response
  const helpfulResponses = {
    'help': 'I can help you find information about people, projects, grants, publications, analytics, and more. Try asking:\n• "Who worked on AI/ML projects?"\n• "Tell me about [person name]"\n• "What projects are available?"\n• "Show me grants"\n• "What publications do we have?"\n• "Show me analytics"',
    'hello': 'Hello! I\'m your AI assistant. I can help you find information about people, projects, grants, publications, analytics, and research data. What would you like to know?',
    'projects': 'I can help you find projects. Try asking about specific topics like "AI projects" or "who worked on [topic]"',
    'grants': 'I can help you find grants. You can browse grants in the Grants section or ask me about specific grant topics.',
    'publications': 'I can help you find publications. Try asking about specific topics or venues.',
    'analytics': 'I can show you analytics about the application, including user statistics and usage data.',
  }

  const lowerQuery = String(query).toLowerCase().trim()
  for (const [key, value] of Object.entries(helpfulResponses)) {
    if (lowerQuery.includes(key)) {
      return res.json({ response: value })
    }
  }

  // Final fallback: Try one more profile search with better formatting
  try {
    const searchTerm = String(query).toLowerCase()
    const finalProfiles = await Profile.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
        { affiliation: { $regex: searchTerm, $options: 'i' } },
        { expertise: { $in: [new RegExp(searchTerm, 'i')] } },
        { 'projects.title': { $regex: searchTerm, $options: 'i' } },
        { 'projects.description': { $regex: searchTerm, $options: 'i' } },
      ],
    })
      .select('name email affiliation expertise location projects')
      .limit(10)

    if (finalProfiles && finalProfiles.length > 0) {
      const profileBlocks = finalProfiles.slice(0, 5).map((p) => {
        const exp = (p.expertise || []).slice(0, 5).join(', ')
        const projTitles = (p.projects || []).slice(0, 2).map(pr => pr.title || 'Untitled')
        const parts = [
          `• ${p.name}${p.affiliation ? ` — ${p.affiliation}` : ''}${p.location ? `, ${p.location}` : ''}`,
          p.email ? `  Email: ${p.email}` : null,
          exp ? `  Expertise: ${exp}` : null,
          projTitles.length ? `  Projects: ${projTitles.join(' | ')}` : null,
        ].filter(Boolean)
        return parts.join('\n')
      })
      return res.json({ 
        response: `I found ${finalProfiles.length} matching profile(s):\n\n${profileBlocks.join('\n\n')}${finalProfiles.length > 5 ? '\n\n...and more' : ''}` 
      })
    }
  } catch (e) {
    // Continue to mock fallback
  }

  // Final fallback: mock response
  const results = await semanticSearchLangChain(query)
  const response = `I understand you're asking about "${query}". Here's what I found:\n${results.map(r => `• ${r.doc}`).join('\n')}\n\nYou can also ask me:\n• About specific people (e.g., "about John Smith")\n• Who worked on specific topics (e.g., "who did AI projects")\n• General questions about the application`
  res.json({ response })
})

export default router
