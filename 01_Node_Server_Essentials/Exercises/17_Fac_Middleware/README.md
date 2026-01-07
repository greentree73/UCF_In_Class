# Understanding Express Middleware

## What is Middleware?

Middleware are functions that execute during the **request-response cycle**. They process incoming requests, modify them, and either pass control to the next middleware or send a response back to the client.

Think of middleware like a **production line assembly** - each worker (middleware) does their job and passes the item along to the next worker. If something is wrong, they can reject the item before it reaches the next station.

### Key Concepts:
- **Middleware is a function** that takes `(req, res, next)` parameters
- **Order matters** - middleware executes in the order it's defined
- **Call `next()`** to pass control to the next middleware/route handler
- **Don't call `next()`** if you want to end the request and send a response
- **Middleware runs for ALL routes** (unless specified otherwise)

## Three Types of Middleware

### 1. Built-in Middleware
Provided by Express out of the box:
- `express.json()` - Parse JSON request bodies
- `express.text()` - Parse text request bodies
- `express.urlencoded()` - Parse URL-encoded form data
- `express.static()` - Serve static files

### 2. Custom Global Middleware
Your own functions that run for every request:
```typescript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next(); // Pass to next middleware
});
```

### 3. Route-Specific Middleware
Middleware applied to individual routes:
```typescript
app.get('/admin', checkAdminAuth, (req, res) => {
  // Only runs if checkAdminAuth calls next()
});
```

## The Request-Response Cycle

```
Client Request
      ↓
[Middleware 1] → calls next() → continues
      ↓
[Middleware 2] → calls next() → continues
      ↓
[Route Handler] → sends response
      ↓
Client receives response
```

## Project Structure

```
17_Fac_Middleware/
├── src/
│   └── server.ts          # Main application with all middleware examples
├── package.json           # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Setup
1. Navigate to this directory
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Server runs on: `http://localhost:3000`

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled JavaScript server
- `npm run clean` - Delete the dist folder

## Understanding the Code

### SECTION 1: Built-in Middleware
```typescript
app.use(express.json());           // Parse JSON bodies
app.use(express.text());           // Parse text bodies
app.use(express.urlencoded({...})); // Parse form data
```

These prepare the request body for use in route handlers.

### SECTION 2: Custom Global Middleware

**Middleware 1 - Request Logger:**
- Logs every request with timestamp, method, and path
- Useful for debugging and monitoring
- Calls `next()` to continue to next middleware

**Middleware 2 - Request ID Generator:**
- Adds a unique ID to each request
- Demonstrates attaching data to the request object
- Useful for tracking requests through logs

**Middleware 3 - Authentication Check:**
- Checks for Authorization header
- In real apps, validates JWT tokens or sessions
- Could block the request or let it continue

**Middleware 4 - Performance Monitor:**
- Tracks how long each request takes
- Uses `res.on('finish')` event listener
- Demonstrates listening to response events

### SECTION 3: Route-Specific Middleware

The `adminMiddleware` function:
- Only runs for routes that specify it
- Checks for `X-Admin-Key` header
- Either allows the request or returns 403 Forbidden
- Example: `app.get('/admin', adminMiddleware, handler)`

### SECTION 4: Routes

Six example routes demonstrating different concepts:

1. **GET /** - Home route showing available endpoints
2. **GET /about** - Server information
3. **POST /echo** - Accept and echo back JSON data
4. **GET /data** - Return sample data array
5. **GET /admin** - Protected route (requires admin middleware + header)
6. **GET /profile/:username** - Dynamic parameter and query string handling

### SECTION 5: Error Handling Middleware

**404 Handler:**
- Catches requests that don't match any route
- Must be defined AFTER all other routes
- Returns 404 status with error message

**Global Error Handler:**
- Catches errors from route handlers
- Identified by 4 parameters: `(err, req, res, next)`
- Must be defined AFTER all other middleware and routes

## Testing with cURL

Here are some commands to test the server:

```bash
# 1. Get home route
curl http://localhost:3000/

# 2. Get about page
curl http://localhost:3000/about

# 3. Echo JSON data (POST)
curl -X POST http://localhost:3000/echo \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello Middleware!"}'

# 4. Get data
curl http://localhost:3000/data

# 5. Access admin route WITHOUT proper header (should fail)
curl http://localhost:3000/admin

# 6. Access admin route WITH proper header (should succeed)
curl http://localhost:3000/admin \
  -H "X-Admin-Key: secret-admin-key-123"

# 7. Get profile with parameters
curl http://localhost:3000/profile/john?includeEmail=true

# 8. Try non-existent route (404)
curl http://localhost:3000/not-found
```

## Testing with Postman

1. Create a new request
2. Set method and URL (e.g., `GET http://localhost:3000/admin`)
3. For admin route, add header: `X-Admin-Key: secret-admin-key-123`
4. Send the request
5. Check the response in the body and console logs

## Important Middleware Concepts

### Order Matters! 🎯
```typescript
// CORRECT ORDER
app.use(express.json());      // Parse body first
app.use(requestLogger);       // Log requests second
app.get('/route', handler);   // Routes last

// WRONG ORDER - won't work as expected
app.get('/route', handler);
app.use(express.json());      // This middleware won't run before route!
```

### The `next()` Function
```typescript
// ✅ Correct - calls next() to continue
app.use((req, res, next) => {
  console.log('Processing request');
  next(); // Continues to next middleware/route
});

// ❌ Wrong - doesn't call next(), request hangs
app.use((req, res, next) => {
  console.log('Processing request');
  // No next() call - request never completes!
});

// ✅ Correct - sends response, doesn't call next()
app.use((req, res, next) => {
  if (!authorized) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});
```

### Attaching Data to Request
```typescript
app.use((req, res, next) => {
  (req as any).userId = 123; // Attach custom property
  next();
});

app.get('/profile', (req, res) => {
  console.log((req as any).userId); // Access it later
});
```

## Common Middleware Patterns

### 1. Logging Middleware
```typescript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

### 2. Authentication Middleware
```typescript
app.use((req, res, next) => {
  const token = req.get('Authorization');
  if (!token) return res.status(401).json({ error: 'No token' });
  // Validate token...
  next();
});
```

### 3. Route-Specific Middleware
```typescript
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

app.delete('/users/:id', isAdmin, (req, res) => {
  // Delete user...
});
```

### 4. Error Handling Middleware
```typescript
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});
```

## Learning Objectives

By the end of this exercise, you should understand:
- ✅ What middleware is and why it's useful
- ✅ The difference between global and route-specific middleware
- ✅ How the request-response cycle works with middleware
- ✅ When to call `next()` and when not to
- ✅ How to attach data to the request object
- ✅ Common middleware patterns (logging, auth, error handling)
- ✅ Why middleware order matters
- ✅ Built-in Express middleware vs custom middleware

## Next Steps

After mastering middleware, you'll learn:
- **Advanced Middleware**: Conditional middleware, middleware chaining
- **Error Handling**: Comprehensive error handling strategies
- **Authentication**: JWT tokens, session management, Passport.js
- **Routing**: Express Router for organizing routes
- **Database Integration**: Connecting to MongoDB, PostgreSQL
- **Testing**: Testing middleware with Jest and Supertest

## Resources

- [Express.js Official Documentation - Middleware](https://expressjs.com/en/guide/using-middleware.html)
- [Express.js Error Handling](https://expressjs.com/en/guide/error-handling.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Node.js Documentation](https://nodejs.org/en/docs/)

## Common Mistakes to Avoid ⚠️

1. **Forgetting to call `next()`** - Request will hang
2. **Defining error handler with 3 parameters** - Express won't recognize it
3. **Defining route handler after catch-all middleware** - Route won't be reached
4. **Not catching async errors** - Use `next(error)` in try/catch blocks
5. **Type issues with custom properties** - Cast with `(req as any)`

---

**Created By**: Student Workbook - Express.js Course
**Last Updated**: January 2026
**Difficulty Level**: Intermediate
