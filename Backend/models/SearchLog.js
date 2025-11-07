import mongoose from '../db.js'

const SearchLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  query: { type: String, required: true },
  response: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export const SearchLog = mongoose.models.SearchLog || mongoose.model('SearchLog', SearchLogSchema)


