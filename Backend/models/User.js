import mongoose from '../db.js'

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  affiliation: { type: String },
  passwordHash: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export const User = mongoose.models.User || mongoose.model('User', UserSchema)
