# Express Router for Organization

## Technology Introduction
- **Express Router**: Modular route organization
- **Concept**: Separating concerns, route modules, middleware scope

## Overview

As your Express application grows, putting all routes in one file becomes unmaintainable. Express Router lets you organize routes into separate modules, each handling a specific resource or feature.

## Quick Start

```bash
npm install
npm start
```

Visit `http://localhost:3000` to see the interactive documentation.

## What is Express Router?

Express Router is a mini-application that can perform middleware and routing. It's perfect for organizing routes into logical groups.

### Without Router (Bad)
```javascript
// ❌ All routes in one file - messy and hard to maintain
const app = express();

app.get('/api/users', (req, res) => { /* ... */ });
app.get('/api/users/:id', (req, res) => { /* ... */ });
app.post('/api/users', (req, res) => { /* ... */ });

app.get('/api/products', (req, res) => { /* ... */ });
app.get('/api/products/:id', (req, res) => { /* ... */ });
app.post('/api/products', (req, res) => { /* ... */ });

app.get('/api/posts', (req, res) => { /* ... */ });
app.get('/api/posts/:id', (req, res) => { /* ... */ });
```

### With Router (Good)
```javascript
// ✅ Organized with routers - clean and scalable
const usersRouter = express.Router();
const productsRouter = express.Router();
const postsRouter = express.Router();

// Define routes on each router
usersRouter.get('/', (req, res) => { /* ... */ });
usersRouter.get('/:id', (req, res) => { /* ... */ });
usersRouter.post('/', (req, res) => { /* ... */ });

productsRouter.get('/', (req, res) => { /* ... */ });
productsRouter.get('/:id', (req, res) => { /* ... */ });
productsRouter.post('/', (req, res) => { /* ... */ });

// Mount them on the app
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/posts', postsRouter);
```

## Core Concepts

### 1. Creating a Router

```javascript
import express from 'express';

const usersRouter = express.Router();
```

A router is created just like we create a mini app. It can have:
- Routes (GET, POST, PUT, DELETE)
- Middleware
- Parameters
- Error handlers

### 2. Defining Routes on a Router

```javascript
// GET route
usersRouter.get('/', (req, res) => {
  res.json({ users: [...] });
});

// GET with parameter
usersRouter.get('/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ user: {...} });
});

// POST route
usersRouter.post('/', (req, res) => {
  res.status(201).json({ message: 'User created' });
});

// PUT route
usersRouter.put('/:id', (req, res) => {
  res.json({ message: 'User updated' });
});

// DELETE route
usersRouter.delete('/:id', (req, res) => {
  res.json({ message: 'User deleted' });
});
```

**Important**: Routes defined on a router use relative paths! They're relative to where the router is mounted.

### 3. Mounting a Router

```javascript
const app = express();

// Mount the router at a specific path
app.use('/api/users', usersRouter);
```

Now all routes in `usersRouter` are prefixed with `/api/users`:
- `GET /api/users` → `usersRouter.get('/')`
- `GET /api/users/1` → `usersRouter.get('/:id')`
- `POST /api/users` → `usersRouter.post('/')`
- `PUT /api/users/1` → `usersRouter.put('/:id')`
- `DELETE /api/users/1` → `usersRouter.delete('/:id')`

### 4. Router-Level Middleware

Middleware can be applied to specific routers:

```javascript
const postsRouter = express.Router();

// Middleware that applies ONLY to postsRouter
postsRouter.use((req, res, next) => {
  console.log(`[POSTS] ${req.method} request to ${req.originalUrl}`);
  next();
});

postsRouter.get('/', (req, res) => {
  // Logging middleware will run before this
  res.json({ posts: [...] });
});
```

This middleware only runs for routes in this specific router!

## Architecture Example

### Current File Structure
```
21_Fac_Express_Router/
├── server.js           # Main entry point (imports and mounts routers)
├── routes/
│   ├── users.js       # User routes (5 CRUD operations)
│   ├── products.js    # Product routes (3 operations)
│   └── posts.js       # Post routes with middleware
├── package.json
└── README.md
```

### How Routes Are Organized

Each router is a separate module that exports its own `express.Router()` instance.

#### routes/users.js
```javascript
import express from 'express';

const router = express.Router();

// GET /api/users - all routes are relative to where it's mounted
router.get('/', (req, res) => {
  res.json({ users: [...] });
});

router.get('/:id', (req, res) => {
  res.json({ user: {...} });
});

router.post('/', (req, res) => {
  res.json({ message: 'User created' });
});

router.put('/:id', (req, res) => {
  res.json({ message: 'User updated' });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'User deleted' });
});

export default router;
```

#### routes/products.js
```javascript
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ products: [...] });
});

router.get('/:id', (req, res) => {
  res.json({ product: {...} });
});

router.post('/', (req, res) => {
  res.json({ message: 'Product created' });
});

export default router;
```

#### routes/posts.js
```javascript
import express from 'express';

const router = express.Router();

// Router-level middleware - applies to all posts routes
router.use((req, res, next) => {
  console.log(`[POSTS] ${req.method} request to ${req.originalUrl}`);
  next();
});

router.get('/', (req, res) => {
  res.json({ posts: [...] });
});

router.get('/:id', (req, res) => {
  res.json({ post: {...} });
});

router.post('/', (req, res) => {
  res.json({ message: 'Post created' });
});

export default router;
```

### server.js - Clean and Simple

```javascript
import express from 'express';
import usersRouter from './routes/users.js';
import productsRouter from './routes/products.js';
import postsRouter from './routes/posts.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Mount routers at specific paths
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/posts', postsRouter);

// Home route and error handling...
app.get('/', (req, res) => { /* ... */ });
app.use((req, res) => { /* 404 handler */ });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

**Key Benefits of This Structure**:
- ✅ **server.js is clean** - Only imports and mounts routers
- ✅ **Routes are organized** - Each resource has its own file
- ✅ **Easy to maintain** - Changes to users don't affect products
- ✅ **Scalable** - Add new routers without touching existing code
- ✅ **Clear separation** - Each file has one responsibility

## Benefits of Express Router

### 1. **Organization**
Routes are grouped by resource, making the codebase easier to navigate.

### 2. **Maintainability**
Changes to one resource don't affect others. Each file is focused and clear.

### 3. **Reusability**
The same router can be mounted at different paths:
```javascript
app.use('/api/users', usersRouter);
app.use('/admin/users', usersRouter);  // Same routes, different path!
```

### 4. **Scoped Middleware**
Apply middleware to only specific resources:
```javascript
// Admin middleware applies only to admin routes
adminRouter.use(requireAdmin);
app.use('/admin', adminRouter);
```

### 5. **Scalability**
As your app grows with dozens or hundreds of routes, organization becomes critical.

### 6. **Team Development**
Multiple developers can work on different routers without merge conflicts.

## Common Patterns

### Pattern 1: Simple Resource Router
```javascript
const resourceRouter = express.Router();

// CRUD operations
resourceRouter.get('/', getAll);              // List all
resourceRouter.get('/:id', getById);          // Get one
resourceRouter.post('/', create);             // Create
resourceRouter.put('/:id', update);           // Update
resourceRouter.delete('/:id', delete);        // Delete

export default resourceRouter;
```

### Pattern 2: Nested Routes
```javascript
const commentsRouter = express.Router({ mergeParams: true });

// Routes: /posts/:postId/comments
commentsRouter.get('/', getComments);
commentsRouter.post('/', createComment);
commentsRouter.put('/:id', updateComment);
commentsRouter.delete('/:id', deleteComment);

postsRouter.use('/:postId/comments', commentsRouter);
```

### Pattern 3: Router with Middleware
```javascript
const adminRouter = express.Router();

// Check authentication
adminRouter.use((req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
});

// Check authorization
adminRouter.use((req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized' });
  }
  next();
});

// All routes below have auth + admin checks
adminRouter.get('/users', getAllUsers);
adminRouter.delete('/users/:id', deleteUser);
```

## Testing the Routers

### Using curl
```bash
# Users
curl http://localhost:3000/api/users
curl http://localhost:3000/api/users/1
curl -X POST http://localhost:3000/api/users
curl -X PUT http://localhost:3000/api/users/1
curl -X DELETE http://localhost:3000/api/users/1

# Products
curl http://localhost:3000/api/products
curl http://localhost:3000/api/products/1

# Posts (shows router middleware logging)
curl http://localhost:3000/api/posts
curl http://localhost:3000/api/posts/1
```

### Using Postman
1. Create requests for each endpoint
2. Organize them in folders by router
3. Test different HTTP methods

### Using the Browser
Visit `http://localhost:3000` to see the interactive documentation and all endpoints.

## Router Methods

Routers support the same methods as the main app:

```javascript
router.get(path, callback)      // GET
router.post(path, callback)     // POST
router.put(path, callback)      // PUT
router.patch(path, callback)    // PATCH
router.delete(path, callback)   // DELETE
router.all(path, callback)      // All methods

// Router-level middleware
router.use(middleware)           // Apply middleware to all routes
router.use(path, middleware)     // Apply middleware to specific paths
```

## Advanced: Router Options

```javascript
// mergeParams allows nested routers to access parent params
const router = express.Router({ mergeParams: true });

// caseSensitive makes routes case-sensitive
const router = express.Router({ caseSensitive: true });

// strict requires trailing slash
const router = express.Router({ strict: true });

// Combine options
const router = express.Router({
  mergeParams: true,
  caseSensitive: false,
  strict: false
});
```

## Learning Outcomes

✅ Understand when to use Express Router  
✅ Create and define routes on a router  
✅ Mount routers to specific paths  
✅ Apply middleware at router level  
✅ Organize routes for scalable applications  
✅ Separate concerns across multiple files  
✅ Implement CRUD operations with routers  

## Next Steps: Modular File Structure

Convert this into a production-ready structure:

1. Create `routes/users.js` with user router
2. Create `routes/products.js` with product router
3. Create `routes/posts.js` with post router
4. Import and mount them in `server.js`
5. Add middleware for authentication
6. Add error handling

## Resources

- [Express Router Documentation](https://expressjs.com/en/api/router.html)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [RESTful API Design](https://restfulapi.net/)
- [CORS and Middleware](https://expressjs.com/en/guide/using-middleware.html)
