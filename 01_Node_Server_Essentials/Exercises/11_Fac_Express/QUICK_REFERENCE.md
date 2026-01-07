# Express.js Quick Reference

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Visit your app
# http://localhost:3000
```

## 📋 Key Concepts

### Basic Server Structure
```typescript
import express from 'express';
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Route Types
- `app.get()` - Handle GET requests
- `app.post()` - Handle POST requests  
- `app.put()` - Handle PUT requests
- `app.delete()` - Handle DELETE requests
- `app.use()` - Middleware for all methods

### Request Object (req)
- `req.params` - URL parameters (/users/:id)
- `req.query` - Query strings (?name=value)
- `req.body` - Request body (POST data)
- `req.headers` - HTTP headers

### Response Object (res)
- `res.json()` - Send JSON response
- `res.send()` - Send text response
- `res.status()` - Set status code
- `res.redirect()` - Redirect request

## 🛠️ Common Patterns

### Middleware
```typescript
app.use((req, res, next) => {
  console.log('Request received');
  next(); // Important: call next()
});
```

### Route with Parameters
```typescript
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  res.json({ userId: id });
});
```

### Error Handling
```typescript
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server Error' });
});
```

## 📁 Project Structure
```
src/
├── server.ts       # Main server file
└── examples.ts     # Additional examples
package.json        # Dependencies
tsconfig.json       # TypeScript config
```

## 🎯 Learning Path
1. ✅ Basic server setup
2. ✅ Routes and responses  
3. → Middleware functions
4. → Route parameters
5. → Request body handling
6. → Error handling
7. → Database integration