# Express Router Lab - Solution

## Overview
This is the completed solution for the Express Router lab activity. Students should implement routes/characters.js with the two endpoints shown below.

## Solution Files

### routes/characters.js - SOLUTION

```javascript
import express from 'express';

const router = express.Router();

const characters = [
  { id: 1, name: 'Luke Skywalker', universe: 'Star Wars' },
  { id: 2, name: 'Harry Potter', universe: 'Harry Potter' },
  { id: 3, name: 'Frodo Baggins', universe: 'Lord of the Rings' },
  { id: 4, name: 'Hermione Granger', universe: 'Harry Potter' },
  { id: 5, name: 'Gandalf', universe: 'Lord of the Rings' }
];

// ENDPOINT 1: Get all characters
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Characters retrieved',
    data: characters
  });
});

// ENDPOINT 2: Get character by ID
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
```

## Key Teaching Points

### Endpoint 1: GET /api/characters
- Simple route definition using `router.get('/', ...)`
- Returns entire array of characters
- Uses consistent response format with `success`, `message`, and `data` fields

### Endpoint 2: GET /api/characters/:id
- Route with parameter: `router.get('/:id', ...)`
- Accesses parameter with `req.params.id`
- Uses `Array.find()` method to search: `characters.find(c => c.id == id)`
- Returns single object (the found character)

## Testing

```bash
# Get all characters
curl http://localhost:3000/api/characters

# Get specific character
curl http://localhost:3000/api/characters/1
curl http://localhost:3000/api/characters/3
curl http://localhost:3000/api/characters/5
```

## Common Student Mistakes to Watch For

1. **Forgetting export default**: Students must export the router: `export default router;`

2. **Wrong path in route**: Should be `'/'` not `'/api/characters/'` because the path is relative to where it's mounted

3. **Incorrect Array.find()**: 
   - ❌ `characters.find(c => c.id === parseInt(req.params.id))`
   - ✅ `characters.find(c => c.id == req.params.id)`

4. **Missing response fields**: Response should always have `success`, `message`, and `data`

5. **Not accessing params correctly**: 
   - ❌ `req.body.id`
   - ✅ `req.params.id`

## Expected Test Results

### GET /api/characters
Returns all 5 characters in an array

### GET /api/characters/1
```json
{
  "success": true,
  "message": "Character retrieved",
  "data": {
    "id": 1,
    "name": "Luke Skywalker",
    "universe": "Star Wars"
  }
}
```

### GET /api/characters/2
```json
{
  "success": true,
  "message": "Character retrieved",
  "data": {
    "id": 2,
    "name": "Harry Potter",
    "universe": "Harry Potter"
  }
}
```

## Learning Outcomes

Students should demonstrate understanding of:
- ✅ Creating routes on express.Router()
- ✅ Route parameters and req.params
- ✅ Array methods (find)
- ✅ Modular router organization
- ✅ Consistent API response format
