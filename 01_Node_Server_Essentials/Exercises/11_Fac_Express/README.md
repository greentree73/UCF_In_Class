# Introduction to Express.js

## What is Express.js?

Express.js is a fast, unopinionated, and minimalist web framework for Node.js. It provides a robust set of features for building web and mobile applications, making it the most popular Node.js framework.

### Key Benefits of Express.js:
- **Lightweight & Fast**: Minimal overhead and excellent performance
- **Flexible**: Unopinionated framework that doesn't enforce strict conventions
- **Middleware Support**: Powerful middleware system for handling requests
- **Routing**: Easy-to-use routing system for organizing endpoints
- **Large Ecosystem**: Extensive community and plugin ecosystem

## Core Concepts

### 1. **Server Instance**
An Express application is essentially a series of middleware function calls that execute during the request-response cycle.

### 2. **Routes**
Routes define how an application responds to client requests to specific endpoints (URL paths + HTTP method).

### 3. **Middleware**
Functions that execute during the request-response cycle. They can:
- Execute code
- Modify request/response objects
- End the request-response cycle
- Call the next middleware in the stack

### 4. **Request & Response Objects**
- **Request (req)**: Contains information about the HTTP request
- **Response (res)**: Used to send HTTP responses back to the client

## Project Setup

This project demonstrates a basic Express.js server with TypeScript configuration.

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Setup
1. Navigate to this directory
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Visit: `http://localhost:3000`

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled JavaScript server

## Understanding the Code

### Basic Express Server Structure
```typescript
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Route Parameters
Express routes can include parameters, query strings, and more:
- **Path Parameters**: `/users/:id` - Access via `req.params.id`
- **Query Parameters**: `/search?name=john` - Access via `req.query.name`
- **Request Body**: POST data - Access via `req.body` (requires middleware)

## Exercise Routes

This project includes two demonstration routes:

### 1. **Home Route** - `GET /`
- Returns a welcome message
- Demonstrates basic JSON response

### 2. **About Route** - `GET /about`
- Returns information about the server
- Shows how to include dynamic data (timestamp, server info)

## Next Steps

After understanding this basic setup, you'll learn:
- **Middleware**: Custom middleware functions, error handling
- **Advanced Routing**: Route parameters, query strings, route handlers
- **Database Integration**: Connecting to databases (MongoDB, PostgreSQL)
- **Authentication**: JWT tokens, sessions, passport.js
- **Error Handling**: Global error handlers, async error catching
- **Testing**: Unit tests, integration tests with Jest/Supertest

## Common Express.js Patterns

### Middleware Pattern
```typescript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next(); // Pass control to next middleware
});
```

### Route Handler Pattern
```typescript
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId, message: `User ${userId} data` });
});
```

### Error Handling Pattern
```typescript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
```

## Resources

- [Express.js Official Documentation](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Node.js Documentation](https://nodejs.org/en/docs/)

---

**Learning Objective**: By the end of this exercise, you should understand how to set up a basic Express.js server with TypeScript and create simple GET routes that return JSON responses.