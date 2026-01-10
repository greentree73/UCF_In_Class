import express from 'express';

const router = express.Router();

/**
 * CHARACTER ROUTER - SOLUTION
 * 
 * This router handles all character-related requests at /api/characters
 */

// Sample data
const characters = [
  { id: 1, name: 'Luke Skywalker', universe: 'Star Wars' },
  { id: 2, name: 'Harry Potter', universe: 'Harry Potter' },
  { id: 3, name: 'Frodo Baggins', universe: 'Lord of the Rings' },
  { id: 4, name: 'Hermione Granger', universe: 'Harry Potter' },
  { id: 5, name: 'Gandalf', universe: 'Lord of the Rings' }
];

/**
 * SOLUTION 1: GET / - Get all characters
 * 
 * Endpoint: GET /api/characters
 * Response: Array of all characters
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Characters retrieved',
    data: characters
  });
});

/**
 * SOLUTION 2: GET /:id - Get specific character by ID
 * 
 * Endpoint: GET /api/characters/:id
 * Response: Single character object
 * 
 * Key concepts:
 * - req.params.id gets the ID from the URL
 * - array.find() searches for the character
 * - == compares the ID (works with string or number)
 */
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const character = characters.find(c => c.id == id);
  
  res.json({
    success: true,
    message: 'Character retrieved',
    data: character
  });
});

export default router;
