import { Router } from "express";
import { User } from "../models";

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.findAll()
  res.json(users)
})

// Create a new user
router.post('/', async (req, res) => {
  const { username, email } = req.body
  const user = await User.create({ username, email })
  res.status(201).json(user)
})

// Get a single user by ID
router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  res.json(user)
})

 export default router;