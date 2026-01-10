import express from 'express';

const router = express.Router();

/**
 * CHARACTER ROUTER
 * 
 * TODO: Complete this router by adding 2 endpoints:
 * 
 * 1. GET / - Return all characters
 *    - Should return a JSON object with:
 *      { success: true, message: "...", data: [...] }
 * 
 * 2. GET /:id - Return a specific character by ID
 *    - Should return a JSON object with:
 *      { success: true, message: "...", data: {...} }
 * 
 * Use this sample data:
 * const characters = [
 *   { id: 1, name: 'Luke Skywalker', universe: 'Star Wars' },
 *   { id: 2, name: 'Harry Potter', universe: 'Harry Potter' },
 *   { id: 3, name: 'Frodo Baggins', universe: 'Lord of the Rings' },
 *   { id: 4, name: 'Hermione Granger', universe: 'Harry Potter' },
 *   { id: 5, name: 'Gandalf', universe: 'Lord of the Rings' }
 * ];
 */

// Sample data - use this in your endpoints
const characters = [
  { id: 1, name: 'Luke Skywalker', universe: 'Star Wars' },
  { id: 2, name: 'Harry Potter', universe: 'Harry Potter' },
  { id: 3, name: 'Frodo Baggins', universe: 'Lord of the Rings' },
  { id: 4, name: 'Hermione Granger', universe: 'Harry Potter' },
  { id: 5, name: 'Gandalf', universe: 'Lord of the Rings' }
];

// TODO: Add GET / endpoint
// - Get all characters
// - Return success: true, message, and data array
// Your code here:


// TODO: Add GET /:id endpoint
// - Get a specific character by ID from params
// - Return success: true, message, and the character object
// - Hint: use find() to search the array
// Your code here:


export default router;
