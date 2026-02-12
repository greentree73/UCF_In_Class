# 🎯 Mongoose CRUD Operations with Routes & Controllers

Learn how to build a well-structured Express API with **Mongoose CRUD operations** using the **MVC (Model-View-Controller) pattern**. This exercise demonstrates best practices for organizing routes, controllers, and models in a scalable application.

---

## 📚 What You'll Learn

- **CRUD Operations** - Create, Read, Update, Delete with Mongoose
- **MVC Architecture** - Separation of concerns (Models, Controllers, Routes)
- **Express Router** - Modular route handling
- **Controller Functions** - Clean, reusable request handlers
- **Mongoose Methods** - `.save()`, `.find()`, `.findById()`, `.findByIdAndUpdate()`, `.findByIdAndDelete()`
- **Error Handling** - Proper HTTP status codes and error messages

---

## 🏗️ Project Structure

```
13_Fac_CRUD/
├── src/
│   ├── config/
│   │   └── db.ts              # Database connection
│   ├── models/
│   │   ├── index.ts           # Model exports
│   │   └── POST.ts            # Post schema & model
│   ├── controllers/
│   │   └── postController.ts  # CRUD logic (business layer)
│   ├── routes/
│   │   └── postRoutes.ts      # Route definitions
│   └── app.ts                 # Express app setup
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

### Architecture Overview

```
Request Flow:
Client → Routes → Controller → Model → Database
                      ↓
                  Response
```

**Separation of Concerns:**
- **Models** (`models/`) - Data structure and validation
- **Controllers** (`controllers/`) - Business logic and data processing
- **Routes** (`routes/`) - HTTP endpoint definitions
- **Config** (`config/`) - Database and app configuration

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

```bash
cp .env.example .env
```

Content of `.env`:
```env
MONGO_URL=mongodb://localhost:27017
MONGO_DB=Hackhaven
PORT=3000
```

### 3. Start MongoDB

Ensure MongoDB is running on `localhost:27017`

### 4. Run the Server

```bash
npm run dev
```

You should see:
```
✅ Connected to MongoDB: Hackhaven
🚀 Server running on port 3000
📝 API Documentation: http://localhost:3000
```

---

## 📋 CRUD Operations

### CREATE - Add a New Post

**Endpoint:** `POST /posts`

**Request Body:**
```json
{
  "title": "Introduction to Mongoose CRUD",
  "body": "This post explains how to perform CRUD operations using Mongoose with Express.",
  "author": "Jane Developer",
  "tags": ["mongoose", "mongodb", "nodejs"],
  "published": true
}
```

**cURL:**
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Introduction to Mongoose CRUD",
    "body": "This post explains how to perform CRUD operations using Mongoose with Express.",
    "author": "Jane Developer",
    "tags": ["mongoose", "mongodb", "nodejs"],
    "published": true
  }'
```

**Response:**
```json
{
  "message": "Post created successfully",
  "post": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Introduction to Mongoose CRUD",
    "body": "This post explains how to perform CRUD operations...",
    "author": "Jane Developer",
    "tags": ["mongoose", "mongodb", "nodejs"],
    "published": true,
    "views": 0,
    "createdAt": "2026-02-11T10:30:00.000Z"
  }
}
```

---

### READ - Get All Posts

**Endpoint:** `GET /posts`

**cURL:**
```bash
curl http://localhost:3000/posts
```

**Response:**
```json
{
  "count": 3,
  "posts": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "title": "Introduction to Mongoose CRUD",
      "author": "Jane Developer",
      ...
    },
    ...
  ]
}
```

---

### READ - Get Post by ID

**Endpoint:** `GET /posts/:id`

**cURL:**
```bash
curl http://localhost:3000/posts/65a1b2c3d4e5f6g7h8i9j0k1
```

**Response:**
```json
{
  "post": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Introduction to Mongoose CRUD",
    "body": "This post explains...",
    "author": "Jane Developer",
    "tags": ["mongoose", "mongodb", "nodejs"],
    "published": true,
    "views": 0,
    "createdAt": "2026-02-11T10:30:00.000Z"
  }
}
```

---

### UPDATE - Update a Post

**Endpoint:** `PUT /posts/:id`

**Request Body:**
```json
{
  "title": "Updated Title",
  "published": true,
  "views": 150
}
```

**cURL:**
```bash
curl -X PUT http://localhost:3000/posts/65a1b2c3d4e5f6g7h8i9j0k1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "published": true,
    "views": 150
  }'
```

**Response:**
```json
{
  "message": "Post updated successfully",
  "post": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Updated Title",
    "body": "This post explains...",
    "published": true,
    "views": 150,
    "updatedAt": "2026-02-11T11:00:00.000Z"
  }
}
```

**Important Options:**
- `{ new: true }` - Returns the updated document instead of the original
- `{ runValidators: true }` - Runs schema validation on the update

---

### DELETE - Remove a Post

**Endpoint:** `DELETE /posts/:id`

**cURL:**
```bash
curl -X DELETE http://localhost:3000/posts/65a1b2c3d4e5f6g7h8i9j0k1
```

**Response:**
```json
{
  "message": "Post deleted successfully",
  "post": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Introduction to Mongoose CRUD",
    ...
  }
}
```

---

## 🔍 Query Operations

### Get Published Posts

**Endpoint:** `GET /posts/filter/published`

**cURL:**
```bash
curl http://localhost:3000/posts/filter/published
```

**Features:**
- Filters posts where `published: true`
- Sorts by newest first (`.sort({ createdAt: -1 })`)
- Limits to 10 results (`.limit(10)`)

---

### Get Posts by Author

**Endpoint:** `GET /posts/author/:author`

**cURL:**
```bash
curl http://localhost:3000/posts/author/Jane%20Developer
```

---

### Get Posts by Tag

**Endpoint:** `GET /posts/tag/:tag`

**cURL:**
```bash
curl http://localhost:3000/posts/tag/mongoose
```

**Note:** Searches within the `tags` array - Mongoose automatically handles array queries.

---

## 🎓 Key Concepts

### 1. Controller Functions

Controllers contain the **business logic** for each operation:

```typescript
export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();
    res.status(201).json({ message: 'Post created successfully', post: savedPost });
  } catch (err: any) {
    res.status(400).json({ message: 'Error creating post', error: err.message });
  }
};
```

**Benefits:**
- Clean, testable code
- Reusable logic
- Easy to maintain
- Proper error handling

---

### 2. Route Definitions

Routes map **HTTP methods and paths** to controller functions:

```typescript
router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
```

**Route Order Matters!**
```typescript
// ✅ Correct order
router.get('/filter/published', ...);  // Specific route first
router.get('/:id', ...);                // Dynamic route last

// ❌ Wrong order
router.get('/:id', ...);                // Would match '/filter/published'
router.get('/filter/published', ...);  // Would never be reached!
```

---

### 3. Mongoose CRUD Methods

| Operation | Method | Description |
|-----------|--------|-------------|
| **Create** | `new Model()` + `.save()` | Two-step creation |
| **Create** | `Model.create()` | One-step creation |
| **Read** | `Model.find()` | Get all or filtered docs |
| **Read** | `Model.findById()` | Get by `_id` |
| **Read** | `Model.findOne()` | Get first match |
| **Update** | `Model.findByIdAndUpdate()` | Find and update by `_id` |
| **Delete** | `Model.findByIdAndDelete()` | Find and delete by `_id` |

---

### 4. HTTP Status Codes

| Code | Meaning | When to Use |
|------|---------|-------------|
| **200** | OK | Successful GET, PUT, DELETE |
| **201** | Created | Successful POST (new resource) |
| **400** | Bad Request | Validation errors, invalid data |
| **404** | Not Found | Resource doesn't exist |
| **500** | Server Error | Unexpected errors |

---

## 🧪 Testing the API

### Test Validation

**Missing Required Field:**
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{"body": "Missing title field"}'
```

**Expected:** `400` error - "Title is required"

---

**Body Too Short:**
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test",
    "body": "Short"
  }'
```

**Expected:** `400` error - "Body must be at least 10 characters"

---

### Test CRUD Workflow

```bash
# 1. Create a post
POST_ID=$(curl -s -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Post",
    "body": "This is a test post for CRUD operations.",
    "author": "Tester"
  }' | jq -r '.post._id')

# 2. Read the post
curl http://localhost:3000/posts/$POST_ID

# 3. Update the post
curl -X PUT http://localhost:3000/posts/$POST_ID \
  -H "Content-Type: application/json" \
  -d '{"published": true}'

# 4. Delete the post
curl -X DELETE http://localhost:3000/posts/$POST_ID
```

---

## 💡 Best Practices

### 1. Always Use Try-Catch

```typescript
export const someController = async (req: Request, res: Response): Promise<void> => {
  try {
    // Your logic here
  } catch (err: any) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
};
```

### 2. Return Appropriate Status Codes

```typescript
// Created
res.status(201).json({ ... });

// Not Found
res.status(404).json({ message: 'Not found' });

// Validation Error
res.status(400).json({ message: 'Invalid data' });
```

### 3. Use Async/Await

```typescript
// ✅ Clean and readable
const post = await Post.findById(id);

// ❌ Avoid callback hell
Post.findById(id, (err, post) => { ... });
```

### 4. Validate Input

Let Mongoose handle validation through schemas rather than manual checks.

### 5. Type Your Controllers

```typescript
import { Request, Response } from 'express';

export const myController = async (req: Request, res: Response): Promise<void> => {
  // TypeScript provides type safety
};
```

---

## 🎯 Learning Checkpoints

After working through this exercise, you should be able to:

✅ Explain the MVC pattern and its benefits  
✅ Create controllers with CRUD operations  
✅ Set up Express routes and mount them  
✅ Use Mongoose methods for database operations  
✅ Handle errors properly with try-catch  
✅ Return appropriate HTTP status codes  
✅ Understand route ordering and dynamic routes  
✅ Query documents with filters and sorting  

---

## 📚 Additional Resources

- [Express Routing Guide](https://expressjs.com/en/guide/routing.html)
- [Mongoose CRUD Operations](https://mongoosejs.com/docs/queries.html)
- [RESTful API Design](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

---

## 🏆 Next Steps

Once you're comfortable with this exercise:

1. Add more query methods (search by keyword, date range, etc.)
2. Implement pagination for large result sets
3. Add request validation middleware
4. Create additional models (User, Comment, etc.)
5. Implement relationships between models
6. Add authentication and authorization

---

## 🎓 Key Takeaways

- **Separation of concerns** makes code more maintainable
- **Controllers** handle business logic
- **Routes** define API endpoints
- **Models** enforce data structure
- **Mongoose methods** simplify database operations
- **Error handling** is essential for robust APIs
- **Route order** matters when using dynamic parameters
