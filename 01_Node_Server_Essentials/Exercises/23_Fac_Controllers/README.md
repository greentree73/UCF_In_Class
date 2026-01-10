# Exercise 23: Controllers in Express

## Overview

This exercise introduces the **Controller Pattern** - a fundamental architectural approach for separating business logic from routing. Controllers help keep your code organized, reusable, and maintainable as applications grow.

**Key Principle:** Routes should be thin (just mapping URLs to functions), and controllers should contain the actual business logic.

## What You'll Learn

- ✅ Understand the Controller pattern and why it matters
- ✅ Separate routing logic from business logic
- ✅ Create and export multiple controller functions
- ✅ Import controllers into routes
- ✅ Implement error handling in controllers
- ✅ Organize code for scalability

## The Problem: Mixed Concerns

Before controllers, developers would put all logic in routes:

```javascript
// ❌ BAD: Logic mixed with routing
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json({ success: true, data: user });
});

router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Required fields' });
  }
  const user = { id: users.length + 1, name, email };
  users.push(user);
  res.status(201).json({ data: user });
});
```

**Problems:**
- Routes become long and hard to read
- Logic is scattered and hard to find
- Can't reuse logic in other routes
- Difficult to test individual functions

## The Solution: Controllers

Controllers extract the business logic into separate functions:

```javascript
// ✅ GOOD: Separated concerns
router.get('/:id', getUserById);
router.post('/', createUser);

// Logic is in controllers/usersController.js
export const getUserById = (req, res) => {
  // Business logic here
};

export const createUser = (req, res) => {
  // Business logic here
};
```

**Benefits:**
- Routes are clean and readable
- Business logic is organized and reusable
- Easy to test functions independently
- Scales well as app grows
- Clear separation of concerns

## File Structure

```
23_Fac_Controllers/
├── server.js                    # Main entry point
├── routes/
│   ├── users.js                # User routes (imports user controller)
│   └── products.js             # Product routes (imports product controller)
├── controllers/
│   ├── usersController.js       # User business logic
│   └── productsController.js    # Product business logic
├── package.json
└── README.md
```

## Architecture Pattern

```
HTTP Request → Routes → Controllers → Business Logic → Response
```

**Each layer:**
- **Routes:** Define which HTTP method + path maps to which controller function
- **Controllers:** Handle request processing, validation, data manipulation, and response formatting
- **Business Logic:** The actual work (finding data, creating data, validating, etc.)

## Controllers Explained

### controllers/usersController.js

A controller file exports multiple handler functions with proper error handling and validation.

**Key patterns:**
- Each function is exported separately (named exports)
- Try-catch error handling
- Input validation
- Consistent response format
- HTTP status codes

### controllers/productsController.js

Products controller with some specialized endpoints:

**Features:**
- Query filtering (e.g., `?inStock=true`)
- Specialized endpoints (PATCH for stock updates)
- Same error handling patterns

## Routes Explained

### routes/users.js

Routes are incredibly simple - just mapping HTTP methods to controller functions:

```javascript
import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/usersController.js';

const router = express.Router();

// Route → Controller mapping
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
```

**Key Points:**
- Import the controller functions at the top
- Each route is one line: `router.method(path, controllerFunction)`
- Routes are now super readable
- All the logic is in the controllers

### routes/products.js

Products routes work the same way with 4 endpoints mapped to controller functions.

**Note:** The PATCH route shows how specialized endpoints work - they can be routed to specific controller functions.

## Main Server File

The server.js file is very clean and organized:

1. Imports routers
2. Sets up middleware (express.json)
3. Mounts routers at base paths
4. Includes home page with documentation
5. 404 handler for undefined routes
6. Error handling middleware
7. Starts listening on PORT 3000

**Notice:** All the business logic is in the controllers! The server is just gluing things together.

## Controller Patterns

### Pattern 1: Try-Catch Error Handling

Every controller function should handle errors:

```javascript
export const getData = (req, res) => {
  try {
    // Business logic
    const data = processData();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
```

### Pattern 2: Input Validation

Validate before processing:

```javascript
export const createItem = (req, res) => {
  try {
    const { name, value } = req.body;

    // Validate first
    if (!name || !value) {
      return res.status(400).json({
        success: false,
        error: 'Name and value are required',
      });
    }

    // Then process
    const item = { id: nextId++, name, value };
    items.push(item);

    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
```

### Pattern 3: Consistent Response Format

Always use the same response structure:

```javascript
// Success
res.json({
  success: true,
  message: 'Operation completed',
  data: result,
});

// Error
res.status(400).json({
  success: false,
  error: 'Something went wrong',
});
```

### Pattern 4: Reusable Functions

Controllers can call helper functions for common logic.

## Benefits of Controllers

| Aspect | Without Controllers | With Controllers |
|--------|-------------------|------------------|
| **File Size** | Huge, hard to read | Separate, organized files |
| **Logic Reuse** | Hard to reuse logic | Easy - just import function |
| **Testing** | Difficult to test | Easy - test functions separately |
| **Finding Code** | Have to search everywhere | Know exactly where to look |
| **Scaling** | Becomes harder with growth | Scales well |
| **Clarity** | Routes mixed with logic | Clear separation |

## Testing Endpoints

### Get all users
```bash
curl http://localhost:3000/api/users
```

### Get specific user
```bash
curl http://localhost:3000/api/users/1
```

### Create user
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"David","email":"david@example.com"}'
```

### Update user
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Updated","email":"alice2@example.com"}'
```

### Delete user
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

### Get all products
```bash
curl http://localhost:3000/api/products
```

### Filter products by stock
```bash
curl http://localhost:3000/api/products?inStock=true
```

### Create product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Monitor","price":299.99}'
```

### Update product stock
```bash
curl -X PATCH http://localhost:3000/api/products/1/stock \
  -H "Content-Type: application/json" \
  -d '{"inStock":false}'
```

## Setup & Running

### Install dependencies
```bash
npm install
```

### Start the server
```bash
npm start
```

The server will start on `http://localhost:3000`

Visit the home page to see documentation and testing examples!

## Key Concepts

### Named Exports
Controller files use named exports so routes can import specific functions:

```javascript
export const getAllUsers = (req, res) => { /* ... */ };
export const getUserById = (req, res) => { /* ... */ };
```

### Default Exports
Router files use default exports:

```javascript
export default router;
```

### Separation of Concerns
- **Controllers:** Know about business logic, data, validation
- **Routes:** Know about HTTP methods and paths
- **Server:** Knows about middleware, mounting, listening

## Common Mistakes

### ❌ Don't: Mixing logic in routes
```javascript
router.get('/:id', (req, res) => {
  // ❌ Don't put logic here
  const item = items.find(i => i.id == req.params.id);
  res.json(item);
});
```

### ✅ Do: Put logic in controllers
```javascript
// routes/items.js
router.get('/:id', getItemById);

// controllers/itemsController.js
export const getItemById = (req, res) => {
  const item = items.find(i => i.id == req.params.id);
  res.json(item);
};
```

## Learning Outcomes

After completing this exercise, you should understand:

- ✅ **Controller Pattern:** Why and how to use controllers
- ✅ **Separation of Concerns:** Keeping routing and logic separate
- ✅ **Named Exports:** Exporting multiple functions from modules
- ✅ **Error Handling:** Try-catch in controllers
- ✅ **Input Validation:** Validating before processing
- ✅ **Code Organization:** Scaling applications with many routes
- ✅ **Reusable Logic:** Creating functions that can be used by multiple routes

## Progression

This exercise builds on previous concepts:

1. **Exercise 19:** Server-side API calls with axios
2. **Exercise 21:** Express Router pattern
3. **Exercise 22:** Route parameters and method chains
4. **Exercise 23:** Controllers (this one) - Separating business logic

Controllers are the key to building large, maintainable Express applications!

## Next Steps

With controllers mastered, you're ready for:
- Databases (replacing in-memory arrays with real data storage)
- Authentication middleware (protecting routes)
- Advanced error handling and logging
- Testing frameworks (Jest, Mocha)
- API versioning (v1, v2 endpoints)
