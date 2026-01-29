import { Router } from 'express'
import { User } from '../models'


const router = Router()

// ========================================
// Health Check Route
// ========================================
router.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Password Encryption Demo API' })
})

// ========================================
// Register New User (Create)
// ========================================
/**
 * Creates a new user with an encrypted password.
 * is route demonstrates password hashing in the controller/route layer.
 * The password is hashed HERE before being passed to the model for saving.
 * 
 * POST /api/users
 * Body: { username, email, password }
 */
router.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body
    
    console.log(`📝 Attempting to create user: ${username}`)
    console.log(`⚠️  Received password (plain text): ${password}`)
    
    // ========================================
    // HASH THE PASSWORD IN THE ROUTE
    // ========================================
    
    // Validate password length before hashing
    if (!password || password.length < 8) {
      return res.status(400).json({
        error: 'Validation failed',
        details: [{ field: 'password', message: 'Password must be at least 8 characters long' }]
      })
    }
    
    // Get the number of salt rounds from environment or use default
    
    
    // Hash the password using bcrypt
    // bcrypt.hash() does two things:
    // 1. Generate a random salt
    // 2. Hash the password with that salt
    
    
    console.log(`🔒 Password hashed in route layer`)
    console.log(`   Plain text: ${password}`)
    console.log(`   Hashed: ${hashedPassword.substring(0, 30)}...`)
    
    // ========================================
    // CREATE USER WITH HASHED PASSWORD
    // ========================================
    
    // Create the user with the HASHED password
    // Note: We're passing the hashed password to the model, not the plain text
    const user = await User.create({
      username,
      email,
      password, // Pass the hashed password, not the plain text
    })
    
    console.log(`✅ User created with hashed password`)
    
    // IMPORTANT: Never return the password (even though it's hashed)
    // Use destructuring to exclude the password from the response
    const { password: _, ...userWithoutPassword } = user.toJSON()
    
    res.status(201).json({
      message: 'User created successfully',
      user: userWithoutPassword
    })
    
  } catch (error: any) {
    console.error('❌ Error creating user:', error.message)
    
    // Handle validation errors
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
    
    // Handle duplicate email
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        error: 'Email already exists',
        message: 'A user with this email address is already registered'
      })
    }
    
    res.status(500).json({ error: 'Failed to create user' })
  }
})

// ========================================
// Login Route (Authenticate User)
// ========================================
/**
 * Authenticates a user by comparing the provided password with the stored hash.
 * 
 * This demonstrates how to verify passwords without ever storing or
 * comparing plain text using bcrypt directly in the route.
 * 
 * POST /api/login
 * Body: { email, password }
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    console.log(`🔐 Login attempt for email: ${email}`)
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required'
      })
    }
    
    // Find the user by email
    const user = await User.findOne({ where: { email } })
    
    if (!user) {
      // User not found - use generic message to avoid revealing
      // whether the email exists (security best practice)
      console.log(`❌ Login failed: User not found`)
      return res.status(401).json({
        error: 'Invalid email or password'
      })
    }
    
    console.log(`👤 User found: ${user.username}`)
    console.log(`🔍 Comparing password with hash...`)
    
    // ========================================
    // COMPARE PASSWORD IN THE ROUTE
    // ========================================
    
    // Compare the provided password with the stored hash using bcrypt
    // bcrypt.compare() hashes the provided password with the same salt
    // that's embedded in the stored hash, then compares the results
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
      console.log(`❌ Login failed: Invalid password`)
      return res.status(401).json({
        error: 'Invalid email or password'
      })
    }
    
    console.log(`✅ Login successful for ${user.username}`)
    
    // Password is correct - return user data (without password)
    const { password: _, ...userWithoutPassword } = user.toJSON()
    
    res.json({
      message: 'Login successful',
      user: userWithoutPassword
    })
    
  } catch (error: any) {
    console.error('❌ Login error:', error.message)
    res.status(500).json({ error: 'Login failed' })
  }
})

// ========================================
// List All Users (Read)
// ========================================
/**
 * Returns all users WITHOUT their passwords.
 * 
 * SECURITY NOTE: We exclude the password field from the response
 * even though it's hashed. Passwords should never be sent to clients.
 * 
 * GET /api/users
 */
router.get('/users', async (_req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // Don't send passwords!
    })
    
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
// Get User by ID (Read)
// ========================================
/**
 * Returns a single user by ID (without password).
 * 
 * GET /api/users/:id
 */
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
    console.error('❌ Error fetching user:', error)
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

// ========================================
// Update User Password (Update)
// ========================================
/**
 * Updates a user's password.
 * 
 * The password hashing happens in this route before updating the user.
 * 
 * PUT /api/users/:id/password
 * Body: { currentPassword, newPassword }
 */
router.put('/users/:id/password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    
    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: 'Both currentPassword and newPassword are required'
      })
    }
    
    // Validate new password length
    if (newPassword.length < 8) {
      return res.status(400).json({
        error: 'New password must be at least 8 characters long'
      })
    }
    
    // Find the user
    const user = await User.findByPk(req.params.id)
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    console.log(`🔐 Password change attempt for user: ${user.username}`)
    
    // ========================================
    // VERIFY CURRENT PASSWORD IN THE ROUTE
    // ========================================
    
    // Compare the current password with the stored hash using bcrypt
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
    
    if (!isCurrentPasswordValid) {
      console.log(`❌ Password change failed: Invalid current password`)
      return res.status(401).json({
        error: 'Current password is incorrect'
      })
    }
    
    // ========================================
    // HASH NEW PASSWORD IN THE ROUTE
    // ========================================
    
    // Get the number of salt rounds from environment or use default
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10')
    
    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds)
    
    console.log(`🔒 New password hashed in route layer`)
    
    // Update the password with the hashed version
    await user.update({ password: hashedNewPassword })
    
    console.log(`✅ Password updated successfully for ${user.username}`)
    
    res.json({
      message: 'Password updated successfully'
    })
    
  } catch (error: any) {
    console.error('❌ Error updating password:', error)
    
    // Handle validation errors
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
    
    res.status(500).json({ error: 'Failed to update password' })
  }
})

// ========================================
// Update User Info (Update)
// ========================================
/**
 * Updates a user's username or email (not password).
 * Use the /users/:id/password route to change passwords.
 * 
 * PUT /api/users/:id
 * Body: { username?, email? }
 */
router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    const { username, email } = req.body
    
    // Update user (excluding password for security)
    await user.update({
      ...(username && { username }),
      ...(email && { email }),
    })
    
    console.log(`✅ User updated: ${user.username}`)
    
    // Return updated user without password
    const { password: _, ...userWithoutPassword } = user.toJSON()
    res.json({
      message: 'User updated successfully',
      user: userWithoutPassword
    })
    
  } catch (error: any) {
    console.error('❌ Error updating user:', error)
    
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
// Delete User (Delete)
// ========================================
/**
 * Deletes a user from the database.
 * 
 * DELETE /api/users/:id
 */
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    const username = user.username
    await user.destroy()
    
    console.log(`🗑️  User deleted: ${username}`)
    
    res.json({
      message: 'User deleted successfully'
    })
    
  } catch (error) {
    console.error('❌ Error deleting user:', error)
    res.status(500).json({ error: 'Failed to delete user' })
  }
})

export default router
