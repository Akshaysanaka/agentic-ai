// CrewAI integration module using MongoDB Atlas
import { Profile } from '../models/Profile.js'
import { Grant } from '../models/Grant.js'

export async function getCrewAISuggestions(profile) {
  try {
    const { expertise = [], affiliation = '' } = profile || {}

    // Find collaborators with similar expertise
    const collaborators = await Profile.find({
      expertise: { $in: expertise },
      name: { $ne: profile?.name || '' } // Exclude self
    }).limit(5).select('name expertise affiliation')

    // Find relevant grants based on expertise
    const grants = await Grant.find({
      domain: { $in: expertise }
    }).limit(5).select('title domain agency')

    return {
      collaborators: collaborators.map(c => ({
        name: c.name,
        match: 0.8 + Math.random() * 0.2 // Mock match score
      })),
      grants: grants.map(g => ({
        id: g._id.toString(),
        title: g.title,
        score: 0.7 + Math.random() * 0.3 // Mock score
      }))
    }
  } catch (error) {
    console.error('Error in getCrewAISuggestions:', error)
    return {
      collaborators: [],
      grants: []
    }
  }
}
