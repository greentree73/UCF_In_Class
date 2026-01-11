# Lab 24 Solution: Controllers

## Overview

This solution demonstrates how to refactor code by extracting business logic from routes into separate controller files.

## The Refactoring

### Before: All Logic in server.js
In the Starter version, all 9 route handlers contain their business logic inline:

```javascript
// ❌ Before - logic mixed with routing
app.get('/api/users/:id', (req, res) => {
  try {
    const { id } = req.params;
    const user = users.find(u => u.id == id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

This makes server.js long and hard to read.

### After: Logic in Controllers
In this solution, the logic is extracted into controller files:

```javascript
// ✅ After - clean routes
import { getUserById } from './controllers/usersController.js';

app.get('/api/users/:id', getUserById);
```

All the logic is in the controller:

```javascript
// controllers/usersController.js
export const getUserById = (req, res) => {
  try {
    const { id } = req.params;
    const user = users.find(u => u.id == id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
```

## File Structure

```
24_Lab_Controllers/Solution/
├── controllers/
│   ├── usersController.js
│   └── productsController.js
├── server.js
├── package.json
└── README.md
```

## Controllers Explained

### controllers/usersController.js

Contains 5 functions:

```javascript
// Get all users
export const getAllUsers = (req, res) => { ... };

// Get single user
export const getUserById = (req, res) => { ... };

// Create user
export const createUser = (req, res) => { ... };

// Update user
export const updateUser = (req, res) => { ... };

// Delete user
export const deleteUser = (req, res) => { ... };
```

**Key features:**
- Each function is exported as a named export
- All error handling with try-catch
- Data validation before processing
- Consistent JSON response format

### controllers/productsController.js

Contains 4 functions:

```javascript
export const getAllProducts = (req, res) => { ... };
export const getProductById = (req, res) => { ... };
export const createProduct = (req, res) => { ... };
export const updateProduct = (req, res) => { ... };
```

## server.js Refactored

The new server.js is very clean:

```javascript
import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from './controllers/usersController.js';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
} from './controllers/productsController.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// USER ROUTES
app.get('/api/users', getAllUsers);
app.get('/api/users/:id', getUserById);
app.post('/api/users', createUser);
app.put('/api/users/:id', updateUser);
app.delete('/api/users/:id', deleteUser);

// PRODUCT ROUTES
app.get('/api/products', getAllProducts);
app.get('/api/products/:id', getProductById);
app.post('/api/products', createProduct);
app.put('/api/products/:id', updateProduct);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

**Notice:**
- Each route is exactly one line
- Routes are organized by resource (users, products)
- All logic is imported from controllers
- No messy inline logic

## Comparison: Starter vs Solution

| Aspect | Starter | Solution |
|--------|---------|----------|
| **server.js size** | ~200 lines | ~60 lines |
| **Code clarity** | Routes mixed with logic | Clean separation |
| **Organization** | All in one file | Organized by resource |
| **Reusability** | Hard to reuse logic | Easy - just import |
| **Testing** | Hard to test routes | Easy - test controllers |
| **Maintainability** | Difficult with growth | Scales well |

## How to Use This Solution

### Run the server
```bash
npm install
npm start
```

### Test the endpoints
```bash
# Users
curl http://localhost:3000/api/users
curl http://localhost:3000/api/users/1
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Charlie","email":"charlie@example.com"}'

# Products
curl http://localhost:3000/api/products
curl http://localhost:3000/api/products/1
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Keyboard","price":79.99}'
```

## Key Refactoring Steps

### 1. Identify Logic Blocks
Look for similar logic that should be grouped together.

### 2. Create Controller File
Create a new file for each resource (users, products, etc.).

### 3. Extract Functions
Copy the route handler logic into separate controller functions.

### 4. Add Named Exports
Make sure each function is exported:
```javascript
export const functionName = (req, res) => { ... };
```

### 5. Import in server.js
Import the functions:
```javascript
import { func1, func2, func3 } from './controllers/resourceController.js';
```

### 6. Use in Routes
Replace the inline handlers with controller function calls:
```javascript
app.get('/api/resource', func1);
app.post('/api/resource', func2);
```

## Benefits Achieved

✅ **Separation of Concerns** - Routes handle routing, controllers handle logic  
✅ **Improved Readability** - server.js is now easy to understand at a glance  
✅ **Better Organization** - Related logic is grouped together  
✅ **Easier Testing** - Can test controller functions in isolation  
✅ **Reusability** - Controllers can be used by multiple routes  
✅ **Scalability** - Easy to add more routes and controllers  
✅ **Maintainability** - Clear where to find and modify logic  

## Common Patterns in Controllers

### Pattern 1: Validation
Always validate input before processing:

```javascript
export const createUser = (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required',
      });
    }

    // Process
    // ...
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
```

### Pattern 2: Error Handling
Always use try-catch and proper HTTP status codes:

```javascript
export const getUserById = (req, res) => {
  try {
    const user = users.find(u => u.id == req.params.id);

    if (!user) {
      // 404 - not found
      return res.status(404).json({ success: false, error: 'Not found' });
    }

    // 200 - success (implicit)
    res.json({ success: true, data: user });
  } catch (error) {
    // 500 - server error
    res.status(500).json({ success: false, error: error.message });
  }
};
```

### Pattern 3: Consistent Response Format
All responses follow the same structure:

```javascript
// Success
res.json({
  success: true,
  message: 'Operation completed',
  count: items.length,
  data: result,
});

// Error
res.status(400).json({
  success: false,
  error: 'Something went wrong',
});
```

## Next Steps

Now that you understand controllers, you can:

1. **Add Express Routers** - Organize routes into separate files too
2. **Add Databases** - Replace in-memory arrays with database queries
3. **Add Middleware** - Add authentication, validation, logging
4. **Add Error Handling** - Create centralized error handling
5. **Write Tests** - Test controllers independently
6. **Add Logging** - Log important events and errors

## Key Takeaways

- **Controllers contain business logic**
- **Routes are thin - just mappings**
- **Use named exports in controllers**
- **Import functions into routes**
- **Keep the same endpoint structure and behavior**
- **This is a critical architectural pattern for scaling applications**
