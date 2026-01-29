import { Router } from 'express'
import { User } from '../models'

const router = Router()

// Health check
router.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Password Hashing with Hooks Lab' })
})

// ========================================
// Create User
// ========================================
/**
 * Creates a new user. The password will be hashed automatically
 * by the beforeCreate hook in the User model.
 */
router.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body
    
    // No manual hashing needed! The beforeCreate hook handles it.
    const user = await User.create({
      username,
      email,
      password, // Plain text password - will be hashed by hook
    })
    
    const { password: _, ...userWithoutPassword } = user.toJSON()
    
    res.status(201).json({
      message: 'User created successfully',
      user: userWithoutPassword
    })
    
  } catch (error: any) {
    console.error('Error creating user:', error.message)
    
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
    
    res.status(500).json({ error: 'Failed to create user' })
  }
})

// ========================================
// Login
// ========================================
/**
 * Authenticates a user by comparing passwords using the
 * comparePassword instance method.
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required'
      })
    }
    
    const user = await User.findOne({ where: { email } })
    
    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password'
      })
    }
    
    // Use the comparePassword instance method
    const isPasswordValid = await user.comparePassword(password)
    
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid email or password'
      })
    }
    
    const { password: _, ...userWithoutPassword } = user.toJSON()
    
    res.json({
      message: 'Login successful',
      user: userWithoutPassword
    })
    
  } catch (error: any) {
    console.error('Login error:', error.message)
    res.status(500).json({ error: 'Login failed' })
  }
})

// ========================================
// List Users
// ========================================
router.get('/users', async (_req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    })
    
    res.json({
      count: users.length,
      users
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// ========================================
// Get User by ID
// ========================================
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    })
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    res.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

// ========================================
// Update User Password
// ========================================
/**
 * Updates a user's password. The new password will be hashed
 * automatically by the beforeUpdate hook.
 */
router.put('/users/:id/password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: 'Both currentPassword and newPassword are required'
      })
    }
    
    if (newPassword.length < 8) {
      return res.status(400).json({
        error: 'New password must be at least 8 characters long'
      })
    }
    
    const user = await User.findByPk(req.params.id)
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword)
    
    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        error: 'Current password is incorrect'
      })
    }
    
    // Update with new password - beforeUpdate hook will hash it
    await user.update({ password: newPassword })
    
    res.json({
      message: 'Password updated successfully'
    })
    
  } catch (error: any) {
    console.error('Error updating password:', error)
    res.status(500).json({ error: 'Failed to update password' })
  }
})

// ========================================
// Delete User
// ========================================
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    const username = user.username
    await user.destroy()
    
    res.json({
      message: 'User deleted successfully',
      username
    })
    
  } catch (error) {
    console.error('Error deleting user:', error)
    res.status(500).json({ error: 'Failed to delete user' })
  }
})

export default router
