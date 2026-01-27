import { Router } from 'express'
import { User } from '../models'

const router = Router()

// Health check
router.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Instance Methods Demo API' })
})

// List all users (standard route without instance methods)
router.get('/users', async (_req, res) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const { username, email } = req.body
    const user = await User.create({ username, email })
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' })
  }
})

// ========================================
// Routes Demonstrating Instance Methods
// ========================================

/**
 * Get user's display name
 * 
 * This route demonstrates the getDisplayName() instance method.
 * Instead of formatting the name in the route, we delegate this
 * logic to the model where it can be reused.
 */
router.get('/users/:id/display', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    // Using instance method to get formatted display name
    res.json({ 
      displayName: user.getDisplayName(),
      method: 'getDisplayName()'
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

/**
 * Get user's account age
 * 
 * This route demonstrates the getAccountAge() instance method.
 * The calculation logic is in the model, keeping the route clean.
 */
router.get('/users/:id/account-age', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    // Using instance method to calculate account age
    const age = user.getAccountAge()
    const isNew = user.isNewAccount()
    
    res.json({ 
      accountAgeDays: age,
      isNewAccount: isNew,
      message: isNew ? 'Welcome, new user!' : 'Thanks for being with us!',
      method: 'getAccountAge() and isNewAccount()'
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

/**
 * Get user's public profile
 * 
 * This route demonstrates the toPublicJSON() instance method.
 * This is particularly useful for controlling what data is exposed
 * in API responses, hiding sensitive information.
 */
router.get('/users/:id/public', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    // Using instance method to get sanitized public data
    res.json({ 
      user: user.toPublicJSON(),
      method: 'toPublicJSON()'
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

/**
 * Get all users with their public profiles
 * 
 * This demonstrates using instance methods on multiple records.
 * Each user instance can call its own instance methods.
 */
router.get('/users/public/all', async (_req, res) => {
  try {
    const users = await User.findAll()
    
    // Map over all users and call toPublicJSON() on each
    const publicUsers = users.map(user => user.toPublicJSON())
    
    res.json({ 
      users: publicUsers,
      count: publicUsers.length,
      method: 'toPublicJSON() called on each user'
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

/**
 * Get new users (accounts created in the last 7 days)
 * 
 * This demonstrates using instance methods for filtering logic.
 * The business rule "what makes an account new" is in the model.
 */
router.get('/users/new/list', async (_req, res) => {
  try {
    const allUsers = await User.findAll()
    
    // Filter using the isNewAccount() instance method
    const newUsers = allUsers.filter(user => user.isNewAccount())
    
    res.json({ 
      newUsers: newUsers.map(user => ({
        username: user.username,
        accountAge: user.getAccountAge(),
        displayName: user.getDisplayName()
      })),
      count: newUsers.length,
      method: 'isNewAccount() used for filtering'
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch new users' })
  }
})

export default router
