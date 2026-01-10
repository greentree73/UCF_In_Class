# Lab 24: Controllers Activity

## Challenge

Move the business logic from `server.js` into separate controller files.

**Current State:** All logic is mixed into `server.js` with inline route handlers.

**Goal:** Extract the logic into `controllers/usersController.js` and `controllers/productsController.js`

## What You Need to Do

### Step 1: Create Controllers Folder
```bash
mkdir controllers
```

### Step 2: Create usersController.js
Create `controllers/usersController.js` and export these functions:
- `getAllUsers` - GET /api/users logic
- `getUserById` - GET /api/users/:id logic
- `createUser` - POST /api/users logic
- `updateUser` - PUT /api/users/:id logic
- `deleteUser` - DELETE /api/users/:id logic

**Template:**
```javascript
// controllers/usersController.js
export const getAllUsers = (req, res) => {
  // Copy the logic from server.js here
};

export const getUserById = (req, res) => {
  // Copy the logic from server.js here
};

// ... continue for other functions
```

### Step 3: Create productsController.js
Create `controllers/productsController.js` and export these functions:
- `getAllProducts` - GET /api/products logic
- `getProductById` - GET /api/products/:id logic
- `createProduct` - POST /api/products logic
- `updateProduct` - PUT /api/products/:id logic

### Step 4: Update server.js
1. Import the controller functions at the top
2. Replace route handlers with controller function calls

**Before:**
```javascript
app.get('/api/users', (req, res) => {
  // all the logic here
});
```

**After:**
```javascript
import { getAllUsers, getUserById, ... } from './controllers/usersController.js';

app.get('/api/users', getAllUsers);
app.get('/api/users/:id', getUserById);
// etc.
```

## Important Notes

- **Don't change the endpoint paths or HTTP methods** - keep them exactly as they are
- **Keep the data arrays** - either in server.js or move them to controllers (your choice)
- **Keep error handling** - make sure all try-catch blocks are preserved
- **Test everything** - make sure all endpoints still work after refactoring

## Testing

After completing the activity, test the endpoints:

```bash
# Get all users
curl http://localhost:3000/api/users

# Create a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"David","email":"david@example.com"}'

# Get products
curl http://localhost:3000/api/products

# Update a product
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Desktop Computer","price":1299.99}'
```

## Success Criteria

✅ All user logic extracted to `controllers/usersController.js`  
✅ All product logic extracted to `controllers/productsController.js`  
✅ Controllers are imported in `server.js`  
✅ Routes use controller functions  
✅ All 9 endpoints work correctly  
✅ Error handling is preserved  

## Hints

- Look at Exercise 23 (Fac_Controllers) for reference
- Use named exports in controllers
- Use named imports in server.js
- Keep the same response format
- Don't change the data structure or endpoints