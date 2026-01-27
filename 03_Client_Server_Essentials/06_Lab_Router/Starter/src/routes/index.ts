import { Router } from 'express'
import { User } from '../models'

const router = Router()

// Health check
router.get('/', (_req, res) => {
  res.json({ status: 'ok' })
})

// ===== USER ROUTES =====
// TODO: Move these user routes to a separate userRoutes.ts file
// Then import and use them in this file

// List all users
router.get('/users', async (_req, res) => {
  const users = await User.findAll()
  res.json(users)
})

// Create a new user
router.post('/users', async (req, res) => {
  const { username, email } = req.body
  const user = await User.create({ username, email })
  res.status(201).json(user)
})

// Get a single user by ID
router.get('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  res.json(user)
})

export default router
