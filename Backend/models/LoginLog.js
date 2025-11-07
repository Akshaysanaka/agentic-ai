import mongoose from '../db.js'

const LoginLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  email: { type: String, index: true },
  success: { type: Boolean, default: false },
  ip: { type: String },
  userAgent: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export const LoginLog = mongoose.models.LoginLog || mongoose.model('LoginLog', LoginLogSchema)


