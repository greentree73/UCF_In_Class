import { Router } from 'express'
import { User } from '../models'

const router = Router()

// Health check
router.get('/', (_req, res) => {
  res.json({ status: 'ok' })
})

// List users
router.get('/users', async (_req, res) => {
  const users = await User.findAll()
  res.json(users)
})

// Create user
router.post('/users', async (req, res) => {
  const { username, email } = req.body
  const user = await User.create({ username, email })
  res.status(201).json(user)
})

export default router
