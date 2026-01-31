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

// ========================================
// TODO: Implement UPDATE Route
// ========================================
// Route: PUT /users/:id
// Purpose: Update an existing user by ID
//
// Steps to complete:
// 1. Extract the 'id' parameter from the request
// 2. Find the user in the database with the matching id
// 3. Update the user's properties with data from req.body
// 4. Return the updated user with a 200 status code
// 5. If the user is not found, return a 404 status with an error message
//
// Hint: Use User.findByPk(id) to find the user
// Hint: Use user.update(data) to update the user
// ========================================

// Your code here

// Update user
router.put('/users/:id', async (req, res) => {
  try {
    // Extract the id from request parameters
    const { id } = req.params
    
    // Find the user by primary key
    const user = await User.findByPk(id)
    
    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    // Update user with data from request body
    const { username, email } = req.body
    await user.update({ username, email })
    
    // Return the updated user
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' })
  }
})


// ========================================
// TODO: Implement DELETE Route
// ========================================
// Route: DELETE /users/:id
// Purpose: Delete a user by ID
//
// Steps to complete:
// 1. Extract the 'id' parameter from the request
// 2. Find the user in the database with the matching id
// 3. Delete the user from the database
// 4. Return a success message with a 200 status code
// 5. If the user is not found, return a 404 status with an error message
//
// Hint: Use User.findByPk(id) to find the user
// Hint: Use user.destroy() to delete the user
// ========================================

// Your code here
router.delete('/users/:id', async (req, res) => {
  try {
    // Extract the id from request parameters
    const { id } = req.params
    
    // Find the user by primary key
    const user = await User.findByPk(id)
    
    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    // Delete the user
    await user.destroy()
    
    // Return success message
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' })
  }
});



export default router
