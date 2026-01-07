# Express Routing Fundamentals

## Overview

Express.js routing is the mechanism that determines how an application responds to client requests for specific endpoints. An endpoint is defined by a URL path and a specific HTTP method (GET, POST, PUT, DELETE, etc.).

## Key Concepts

### 1. **Route Parameters**
Dynamic segments in URLs that capture values from the URL path.
- **Syntax**: `/users/:id` where `:id` is a parameter
- **Access**: `req.params.id` in your route handler

### 2. **Query Strings**
Optional key-value pairs appended to URLs for filtering, searching, or configuration.
- **Syntax**: `/search?q=javascript&limit=10`
- **Access**: `req.query.q` and `req.query.limit` in your route handler

### 3. **HTTP Methods**
Different methods represent different actions:
- **GET**: Retrieve data
- **POST**: Create new data
- **PUT**: Update existing data
- **DELETE**: Remove data

### 4. **RESTful Routing Patterns**
A standard convention for organizing routes that represent resources:

| HTTP Method | Route Pattern | Purpose | Example |
|-------------|---------------|---------|---------|
| GET | `/users` | Get all users | List all users |
| GET | `/users/:id` | Get specific user | Get user with ID 123 |
| POST | `/users` | Create new user | Add new user |
| PUT | `/users/:id` | Update user | Update user 123 |
| DELETE | `/users/:id` | Delete user | Delete user 123 |



### 5. **RESTful Resource Routes**
```typescript
// Users resource
app.get('/users', getAllUsers);           // GET all users
app.get('/users/:id', getUserById);       // GET specific user
app.post('/users', createUser);           // CREATE new user
app.put('/users/:id', updateUser);        // UPDATE user
app.delete('/users/:id', deleteUser);     // DELETE user
```

## Route Testing Examples

Once the server is running, test these endpoints:

### Basic Routes
- `GET http://localhost:3000/` - Home page
- `GET http://localhost:3000/about` - About page

### Route Parameters
- `GET http://localhost:3000/users/123` - Get user with ID 123
- `GET http://localhost:3000/users/456/posts/789` - Get post 789 from user 456

### Query Strings
- `GET http://localhost:3000/search?q=javascript` - Search for "javascript"
- `GET http://localhost:3000/search?q=node&limit=5&sort=date` - Search with filters

### RESTful Routes (Users Resource)
- `GET http://localhost:3000/users` - List all users
- `GET http://localhost:3000/users/1` - Get user 1
- `POST http://localhost:3000/users` - Create user (requires JSON body)
- `PUT http://localhost:3000/users/1` - Update user 1 (requires JSON body)
- `DELETE http://localhost:3000/users/1` - Delete user 1

## Advanced Routing Concepts

### 1. **Route Patterns**
```typescript
// Wildcards
app.get('/files/*', handler);          // Matches /files/anything/here

// Optional parameters
app.get('/posts/:year/:month?', handler); // Month is optional

// Regular expressions
app.get(/.*fly$/, handler);            // Matches anything ending with 'fly'
```

### 2. **Route Handlers**
```typescript
// Multiple handlers
app.get('/protected', authenticate, authorize, handler);

// Next function for control flow
app.get('/example', (req, res, next) => {
  if (condition) {
    next(); // Continue to next handler
  } else {
    res.status(400).json({ error: 'Bad request' });
  }
});
```

### 3. **Router Module**
```typescript
import { Router } from 'express';
const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);

app.use('/users', userRouter);
```

## Best Practices

### 1. **URL Design**
- Use nouns for resources (`/users`, not `/getUsers`)
- Use HTTP methods to indicate actions
- Be consistent with naming conventions
- Use plural nouns for collections (`/users`, not `/user`)

### 2. **Parameter Validation**
```typescript
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  // Continue with valid ID
});
```

### 3. **Query String Handling**
```typescript
app.get('/search', (req, res) => {
  const {
    q = '',                    // Default empty string
    limit = 10,               // Default limit
    page = 1,                 // Default page
    sort = 'name'             // Default sort
  } = req.query;
  
  // Validate and use parameters
});
```

### 4. **Error Handling**
```typescript
app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error); // Pass to error handler
  }
});
```

## Common Routing Patterns

### 1. **Nested Resources**
```typescript
// Comments belonging to posts
app.get('/posts/:postId/comments', getPostComments);
app.post('/posts/:postId/comments', createPostComment);
```

### 2. **Action Routes**
```typescript
// Special actions on resources
app.post('/users/:id/activate', activateUser);
app.post('/users/:id/deactivate', deactivateUser);
```

### 3. **API Versioning**
```typescript
// Version in URL
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);
```

## Learning Objectives

By the end of this lesson, you should understand:
- How to define routes with different HTTP methods
- How to extract and use route parameters
- How to handle query strings in requests
- RESTful routing conventions and best practices
- How to organize routes for scalable applications
- Parameter validation and error handling techniques

## Resources

- [Express Routing Guide](https://expressjs.com/en/guide/routing.html)
- [REST API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

---

**Next Steps**: After mastering routing fundamentals, explore middleware, request body parsing, authentication, and database integration.