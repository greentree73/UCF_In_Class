import { Router } from 'express'
import { User } from '../models'
import { ValidationError } from 'sequelize'

const router = Router()

// Health check
router.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Validations Demo API' })
})

// List all users (without sensitive data)
router.get('/users', async (_req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // Don't send passwords
    })
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// Get user by ID
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
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

// ========================================
// Create User - Demonstrates Validation Error Handling
// ========================================
/**
 * This route demonstrates proper validation error handling.
 * When validations fail, Sequelize throws a ValidationError
 * containing details about all validation failures.
 */
router.post('/users', async (req, res) => {
  try {
    const { username, email, age, password, bio, role } = req.body
    
    // Attempt to create user - validations run automatically
    const user = await User.create({
      username,
      email,
      age,
      password,
      bio,
      role: role || 'user' // Default to 'user' if not provided
    })
    
    // If successful, return user without password
    const { password: _, ...userWithoutPassword } = user.toJSON()
    res.status(201).json(userWithoutPassword)
    
  } catch (error: any) {
    // Check if it's a validation error
    if (error.name === 'SequelizeValidationError') {
      // Extract validation error messages
      const validationErrors = error.errors.map((err: any) => ({
        field: err.path,
        message: err.message,
        value: err.value
      }))
      
      return res.status(400).json({
        error: 'Validation failed',
        details: validationErrors
      })
    }
    
    // Check if it's a unique constraint error (duplicate email)
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        error: 'Email already exists',
        details: 'A user with this email address is already registered'
      })
    }
    
    // Generic error response
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'Failed to create user' })
  }
})

// ========================================
// Update User - Also Validates on Update
// ========================================
/**
 * Validations also run when updating records.
 * This ensures data integrity throughout the record's lifecycle.
 */
router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    const { username, email, age, bio, role } = req.body
    
    // Update user - validations run automatically
    await user.update({
      username,
      email,
      age,
      bio,
      role
    })
    
    // Return updated user without password
    const { password: _, ...userWithoutPassword } = user.toJSON()
    res.json(userWithoutPassword)
    
  } catch (error: any) {
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map((err: any) => ({
        field: err.path,
        message: err.message,
        value: err.value
      }))
      
      return res.status(400).json({
        error: 'Validation failed',
        details: validationErrors
      })
    }
    
    console.error('Error updating user:', error)
    res.status(500).json({ error: 'Failed to update user' })
  }
})

// ========================================
// Test Validation Endpoint
// ========================================
/**
 * This endpoint lets you test validations without actually
 * creating a record. Useful for client-side validation feedback.
 */
router.post('/users/validate', async (req, res) => {
  try {
    // Build a user instance without saving
    const user = User.build(req.body)
    
    // Run validations manually
    await user.validate()
    
    // If we get here, validations passed
    res.json({
      valid: true,
      message: 'All validations passed'
    })
    
  } catch (error: any) {
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map((err: any) => ({
        field: err.path,
        message: err.message,
        value: err.value
      }))
      
      return res.status(400).json({
        valid: false,
        error: 'Validation failed',
        details: validationErrors
      })
    }
    
    res.status(500).json({ error: 'Validation check failed' })
  }
})

// ========================================
// Example: Get Users by Role
// ========================================
/**
 * This endpoint demonstrates that validations ensure
 * only valid roles exist in the database.
 */
router.get('/users/role/:role', async (req, res) => {
  try {
    const { role } = req.params
    
    const users = await User.findAll({
      where: { role },
      attributes: { exclude: ['password'] }
    })
    
    res.json({
      role,
      count: users.length,
      users
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

export default router
