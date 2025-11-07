import { Router } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/User.js'
import { LoginLog } from '../models/LoginLog.js'

const router = Router()

router.post('/signup', async (req, res) => {
  const { name, email, password, affiliation } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' })
  }
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({ name, email, passwordHash, affiliation })
    await user.save()
    res.status(201).json({
      message: 'User created successfully',
      user: { id: user._id, name: user.name, email: user.email, affiliation: user.affiliation }
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }
  try {
    const user = await User.findOne({ email })
    if (!user) {
      await LoginLog.create({ email, success: false, ip: req.ip, userAgent: req.get('user-agent') })
      return res.status(400).json({ error: 'Invalid credentials' })
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      await LoginLog.create({ userId: user._id, email, success: false, ip: req.ip, userAgent: req.get('user-agent') })
      return res.status(400).json({ error: 'Invalid credentials' })
    }
    await LoginLog.create({ userId: user._id, email, success: true, ip: req.ip, userAgent: req.get('user-agent') })
    res.json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
