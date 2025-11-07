// LangChain integration module using MongoDB Atlas
import { Profile } from '../models/Profile.js'

export async function semanticSearchLangChain(query) {
  try {
    const lowerQuery = query.toLowerCase()
    const regex = new RegExp(lowerQuery, 'i')

    const matches = await Profile.find({
      $or: [
        { name: regex },
        { email: regex },
        { affiliation: regex },
        { location: regex },
        { expertise: { $in: [regex] } },
        { 'projects.title': regex },
        { 'projects.description': regex }
      ]
    }).limit(5).select('name email affiliation location expertise projects')

    if (matches.length === 0) {
      return [
        { doc: 'No matching information found for: ' + query, score: 0.5 },
      ]
    }

    return matches.map(person => ({
      doc: `${person.name} - ${person.affiliation}, ${person.location || 'Unknown'}. Expertise: ${(person.expertise || []).join(', ')}. Email: ${person.email}. Projects: ${(person.projects || []).map(p => p.title).join(', ')}`,
      score: 0.9
    }))
  } catch (error) {
    console.error('Error in semanticSearchLangChain:', error)
    return [
      { doc: 'Error searching database for: ' + query, score: 0.1 },
    ]
  }
}

export async function summarizeDocuments(docs) {
  // TODO: Replace with LLM summarization
  return 'Summary of ' + docs.length + ' docs.'
}
