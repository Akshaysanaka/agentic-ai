import mongoose from '../db.js'

const UsageStatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  date: { type: String, index: true }, // YYYY-MM-DD
  seconds: { type: Number, default: 0 },
  pageViews: { type: Map, of: Number, default: {} },
  details: { type: Map, of: String, default: {} },
  updatedAt: { type: Date, default: Date.now },
})

export const UsageStat = mongoose.models.UsageStat || mongoose.model('UsageStat', UsageStatSchema)


