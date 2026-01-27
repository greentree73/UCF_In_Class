# Introduction to Express Routers with Sequelize

## What is a Router?

A **router** is like a traffic director for your web server. When someone visits your website or app, the router decides which code should handle their request.

Think of it like a receptionist at a building:
- Someone asks "Where's the cafeteria?" → Router sends them to the cafeteria route
- Someone asks "Where's the main office?" → Router sends them to the office route

In Express, a router listens for different URLs and methods (GET, POST, etc.) and runs the right code for each one.

## The Role of the Router in Server-Side Logic

Routers sit between the user's request and your application's logic:

```
User Request → Router → Model (Database) → Router → Response to User
```

The router's job is to:
1. **Receive** incoming requests (like GET /users or POST /users)
2. **Decide** what to do based on the URL and method
3. **Call** the right model methods to get or save data
4. **Send** the response back to the user

## Why Separate Routers?

Instead of putting all your routes in one big file, we organize them by feature:
- User routes handle user-related requests
- Product routes handle product requests
- Order routes handle order requests

This keeps our code:
- **Organized**: Easy to find what you need
- **Maintainable**: Changes don't affect unrelated code
- **Readable**: Each file has a clear purpose

## Combining Express Routes with Sequelize Models

This is where everything comes together! Here's how it works:

### 1. The Router Receives a Request
```typescript
router.get('/users', async (req, res) => {
  // A GET request to /users arrived
})
```

### 2. The Router Uses the Model to Talk to the Database
```typescript
router.get('/users', async (req, res) => {
  const users = await User.findAll()  // Ask the User model for all users
})
```

### 3. The Router Sends the Data Back
```typescript
router.get('/users', async (req, res) => {
  const users = await User.findAll()
  res.json(users)  // Send the users back as JSON
})
```

## Common Route Patterns

Here are the typical routes you'll create:

| Method | URL | Purpose | Model Method |
|--------|-----|---------|-------------|
| GET | `/users` | Get all users | `User.findAll()` |
| GET | `/users/:id` | Get one user | `User.findByPk(id)` |
| POST | `/users` | Create a user | `User.create(data)` |
| PUT | `/users/:id` | Update a user | `User.update(data)` |
| DELETE | `/users/:id` | Delete a user | `User.destroy()` |

## Why This Matters

Before routers and models, you had to:
- Write raw SQL queries
- Mix database code with request handling
- Repeat the same patterns over and over

Now with Express routers + Sequelize models:
- Routes are clean and focused
- Models handle all database complexity
- Code is reusable and easy to test

## What You'll Learn

In this exercise, you'll see how to:
- Create Express routes
- Use Sequelize models in your routes
- Handle different HTTP methods (GET, POST)
- Send JSON responses back to users

Let's look at the code!
