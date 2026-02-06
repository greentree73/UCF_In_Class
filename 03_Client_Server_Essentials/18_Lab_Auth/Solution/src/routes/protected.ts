import { Router } from 'express'
import { authenticateToken } from '../middleware/auth'
import { User } from '../models'

const router = Router()

// ========================================
// All routes in this file require authentication
// ========================================

/**
 * These routes demonstrate protected endpoints that require a valid JWT.
 * Clients must include: Authorization: Bearer <token>
 */

// ========================================
// Get Current User Profile
// ========================================

/**
 * GET /api/profile
 * 
 * Returns the authenticated user's profile information.
 */
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // req.user is populated by the authenticateToken middleware
    const user = await User.findByPk(req.user!.userId, {
      attributes: { exclude: ['password'] }
    })
    
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      })
    }
    
    res.json({
      message: 'Profile retrieved successfully',
      user: user.toJSON()
    })
    
  } catch (error: any) {
    console.error('Error fetching profile:', error.message)
    res.status(500).json({ error: 'Failed to fetch profile' })
  }
})

// ========================================
// Update Current User Profile
// ========================================

/**
 * PUT /api/profile
 * 
 * Updates the authenticated user's profile.
 */
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { username, email } = req.body
    
    const user = await User.findByPk(req.user!.userId)
    
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      })
    }
    
    // Update only provided fields
    if (username) user.username = username
    if (email) user.email = email
    
    await user.save()
    
    const { password: _, ...userWithoutPassword } = user.toJSON()
    
    res.json({
      message: 'Profile updated successfully',
      user: userWithoutPassword
    })
    
  } catch (error: any) {
    console.error('Error updating profile:', error.message)
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors.map((err: any) => ({
          field: err.path,
          message: err.message,
        }))
      })
    }
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        error: 'Email already exists'
      })
    }
    
    res.status(500).json({ error: 'Failed to update profile' })
  }
})

// ========================================
// List All Users
// ========================================

/**
 * GET /api/users
 * 
 * Returns a list of all users.
 */
router.get('/users', authenticateToken, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    })
    
    res.json({
      message: 'Users retrieved successfully',
      count: users.length,
      users: users.map(u => u.toJSON())
    })
    
  } catch (error: any) {
    console.error('Error fetching users:', error.message)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// ========================================
// Get User by ID
// ========================================

/**
 * GET /api/users/:id
 * 
 * Returns a specific user's information.
 */
router.get('/users/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    })
    
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      })
    }
    
    res.json({
      message: 'User retrieved successfully',
      user: user.toJSON()
    })
    
  } catch (error: any) {
    console.error('Error fetching user:', error.message)
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

export default router
