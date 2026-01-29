import { Router } from 'express'
import { User } from '../models'

const router = Router()

// ========================================
// Health Check
// ========================================
router.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Lifecycle Hooks Demo API' })
})

// ========================================
// List All Users
// ========================================
/**
 * GET /api/users
 * Returns all users
 */
router.get('/users', async (_req, res) => {
  try {
    const users = await User.findAll()
    res.json({
      count: users.length,
      users
    })
  } catch (error) {
    console.error('❌ Error fetching users:', error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// ========================================
// Get User by ID
// ========================================
/**
 * GET /api/users/:id
 * Returns a single user
 */
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    res.json(user)
  } catch (error) {
    console.error('❌ Error fetching user:', error)
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

// ========================================
// Create User - Watch the Hooks Fire!
// ========================================
/**
 * POST /api/users
 * Creates a new user
 * 
 * This will trigger multiple hooks:
 * 1. beforeValidate - Formats username and email
 * 2. afterValidate - After validation passes
 * 3. beforeCreate - Sets default role and lastModified
 * 4. beforeSave - Generic save hook
 * 5. afterCreate - Logs the created user
 * 6. afterSave - Generic save hook
 */
router.post('/users', async (req, res) => {
  try {
    const { username, email, role } = req.body
    
    console.log('\n' + '='.repeat(60))
    console.log('🚀 Starting User Creation Process')
    console.log('='.repeat(60))
    console.log('Received data:', { username, email, role })
    
    // Create the user - watch the console for hook execution!
    const user = await User.create({
      username,
      email,
      role: role || undefined, // Let hook set default if not provided
    })
    
    console.log('\n' + '='.repeat(60))
    console.log('✨ User Creation Complete!')
    console.log('='.repeat(60) + '\n')
    
    res.status(201).json({
      message: 'User created successfully',
      user
    })
    
  } catch (error: any) {
    console.error('\n❌ Error creating user:', error.message)
    
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map((err: any) => ({
        field: err.path,
        message: err.message,
      }))
      
      return res.status(400).json({
        error: 'Validation failed',
        details: validationErrors
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
// Update User - More Hooks!
// ========================================
/**
 * PUT /api/users/:id
 * Updates an existing user
 * 
 * This will trigger:
 * 1. beforeValidate - Formats any updated fields
 * 2. beforeUpdate - Updates lastModified, logs changes
 * 3. beforeSave - Generic save hook
 * 4. afterUpdate - Logs successful update
 * 5. afterSave - Generic save hook
 */
router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    const { username, email, role } = req.body
    
    console.log('\n' + '='.repeat(60))
    console.log('🔄 Starting User Update Process')
    console.log('='.repeat(60))
    console.log('Current user:', user.toJSON())
    console.log('New data:', { username, email, role })
    
    // Update the user - watch the console for hook execution!
    await user.update({
      ...(username && { username }),
      ...(email && { email }),
      ...(role && { role }),
    })
    
    console.log('\n' + '='.repeat(60))
    console.log('✨ User Update Complete!')
    console.log('='.repeat(60) + '\n')
    
    res.json({
      message: 'User updated successfully',
      user
    })
    
  } catch (error: any) {
    console.error('\n❌ Error updating user:', error.message)
    
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map((err: any) => ({
        field: err.path,
        message: err.message,
      }))
      
      return res.status(400).json({
        error: 'Validation failed',
        details: validationErrors
      })
    }
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        error: 'Email already exists'
      })
    }
    
    res.status(500).json({ error: 'Failed to update user' })
  }
})

// ========================================
// Delete User - Destruction Hooks!
// ========================================
/**
 * DELETE /api/users/:id
 * Deletes a user
 * 
 * This will trigger:
 * 1. beforeDestroy - Logs deletion attempt
 * 2. afterDestroy - Logs successful deletion
 */
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    const username = user.username
    
    console.log('\n' + '='.repeat(60))
    console.log('🗑️  Starting User Deletion Process')
    console.log('='.repeat(60))
    
    // Delete the user - watch the console for hook execution!
    await user.destroy()
    
    console.log('\n' + '='.repeat(60))
    console.log('✨ User Deletion Complete!')
    console.log('='.repeat(60) + '\n')
    
    res.json({
      message: 'User deleted successfully',
      username
    })
    
  } catch (error) {
    console.error('\n❌ Error deleting user:', error)
    res.status(500).json({ error: 'Failed to delete user' })
  }
})

export default router
