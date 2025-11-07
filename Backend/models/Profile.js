import mongoose from '../db.js'

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
})

const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  name: String,
  email: String,
  affiliation: String,
  expertise: [String],
  location: String,
  projects: [ProjectSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema)
