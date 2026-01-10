import express from 'express';

const router = express.Router();

/**
 * USERS ROUTER
 * Handles all routes starting with /api/users
 */

// GET /api/users - List all users
router.get('/', (req, res) => {
  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
  ];
  res.json({
    success: true,
    message: 'Users retrieved',
    data: users,
  });
});

// GET /api/users/:id - Get specific user
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  res.json({
    success: true,
    message: `Retrieved user ${userId}`,
    data: { id: userId, name: 'User Name', email: 'user@example.com' },
  });
});

// POST /api/users - Create new user
router.post('/', (req, res) => {
  res.status(201).json({
    success: true,
    message: 'User created',
    data: { id: 4, name: 'New User', email: 'newuser@example.com' },
  });
});

// PUT /api/users/:id - Update user
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  res.json({
    success: true,
    message: `Updated user ${userId}`,
    data: { id: userId, name: 'Updated Name' },
  });
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  res.json({
    success: true,
    message: `Deleted user ${userId}`,
  });
});

export default router;
