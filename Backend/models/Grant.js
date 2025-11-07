import mongoose from '../db.js'

const GrantSchema = new mongoose.Schema({
  title: { type: String, required: true },
  domain: { type: String, index: true },
  agency: { type: String },
  description: { type: String },
  open: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
})

export const Grant = mongoose.models.Grant || mongoose.model('Grant', GrantSchema)
