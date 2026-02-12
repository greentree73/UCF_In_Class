# 🏛️ Mongoose ODM Introduction

Learn how to use **Mongoose**, a powerful Object Document Mapper (ODM) for MongoDB that provides schema validation, type casting, query building, and more! This exercise demonstrates best practices for structuring a Mongoose application using the Hackhaven database.

## 📚 What is Mongoose?

Mongoose is an Object Document Mapper (ODM) library for MongoDB and Node.js. It provides a schema-based solution to model your application data, making it easier to work with MongoDB in a structured way.

### Why Use Mongoose?

**Without Mongoose (Native Driver):**
```javascript
// Plain MongoDB - no structure, no validation
const post = {
  titel: 'My Post',  // Typo! No validation to catch this
  content: '',       // Empty content allowed
  viewz: -50,        // Negative views allowed
  author: 123        // Wrong data type
};
await db.collection('posts').insertOne(post);
```

**With Mongoose:**
```typescript
import { Post } from './models';

// Mongoose - structured, validated, safe
const post = new Post({
  title: 'My Post',   // ✅ Correct spelling enforced by schema
  content: '',        // ❌ Error! Content minlength validation
  views: -50,         // ❌ Error! Must be >= 0
  author: 123         // ❌ Error! Must be a string
});
await post.save(); // Validation happens automatically
```

---

## 🏗️ Project Structure

This project follows best practices for modular Mongoose applications:

```
11_Fac_Mongoose/
├── src/
│   ├── config/
│   │   └── db.ts          # Database connection & lifecycle
│   ├── models/
│   │   ├── index.ts       # Central export point
│   │   └── POST.ts        # Post schema & model definition
│   └── app.ts             # Express routes & business logic
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

### File Responsibilities

**`src/config/db.ts`** - Database connection management
- `connectDB()` - Establishes MongoDB connection
- `closeDB()` - Gracefully closes connection
- Environment variable configuration

**`src/models/POST.ts`** - Post model definition
- `IPost` interface - TypeScript type definitions
- `postSchema` - Mongoose schema with validation
- `Post` model - Export for use in routes

**`src/models/index.ts`** - Centralized exports
- Single import point for all models
- Cleaner imports: `import { Post } from './models'`

**`src/app.ts`** - Application logic
- Express route handlers
- CRUD operations using Post model
- Query demonstrations

---

## 🎯 Core Concepts

### 1. Schema

A Schema defines the structure and validation rules for documents:

```typescript
// src/models/POST.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  author: string;
  tags: string[];
  published: boolean;
  views: number;
  createdAt: Date;
  updatedAt?: Date;
}

const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [10, 'Content must be at least 10 characters']
  },
  author: {
    type: String,
    required: true,
    default: 'Anonymous'
  },
  tags: {
    type: [String],
    default: []
  },
  published: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0,
    min: [0, 'Views cannot be negative']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});
```

### 2. Model

A Model is a class created from a Schema that allows database interaction:

```typescript
// Create the model
export const Post = mongoose.model<IPost>('Post', postSchema);

// Use in other files
import { Post } from './models';
const posts = await Post.find();
```

### 3. Document

A Document is an instance of a Model, representing a single database record:

```typescript
const post = new Post({ 
  title: 'Hello Hackhaven',
  content: 'Welcome to our community!',
  author: 'Alice',
  tags: ['welcome'],
  published: true
});

await post.save(); // Saves to database
```

---

## 🔧 Basic Operations

### Create (INSERT)

```typescript
import { Post } from './models';

// Method 1: Create instance and save
const post = new Post({
  title: 'Getting Started with Mongoose',
  content: 'This is a comprehensive guide to Mongoose ODM...',
  author: 'Alice',
  tags: ['tutorial', 'mongoose', 'mongodb'],
  published: true
});
await post.save();

// Method 2: Create directly
const post2 = await Post.create({
  title: 'Another Post',
  content: 'More content here...',
  author: 'Bob'
});
```

### Read (FIND)

```typescript
import { Post } from './models';

// Find all posts
const posts = await Post.find();

// Find by ID
const post = await Post.findById('507f1f77bcf86cd799439011');

// Find with conditions
const publishedPosts = await Post.find({ published: true });

// Find with query chaining
const recentPosts = await Post
  .find({ published: true })
  .sort({ createdAt: -1 })
  .limit(10);
```

### Update (UPDATE)

```typescript
import { Post } from './models';

// Find and update (returns updated document)
const post = await Post.findByIdAndUpdate(
  '507f1f77bcf86cd799439011',
  { 
    published: true,
    updatedAt: Date.now()
  },
  { 
    new: true,           // Return updated document
    runValidators: true  // Run schema validation
  }
);

// Update many documents
await Post.updateMany(
  { author: 'Alice' },
  { published: true }
);
```

### Delete (DELETE)

```typescript
import { Post } from './models';

// Find and delete
const post = await Post.findByIdAndDelete('507f1f77bcf86cd799439011');

// Delete many documents
await Post.deleteMany({ published: false });
```

---

## 🔍 Querying

### Query Chaining

```typescript
import { Post } from './models';

const posts = await Post
  .find({ published: true })
  .sort({ createdAt: -1 })
  .limit(10)
  .select('title author createdAt');
```

### Query Operators

```typescript
import { Post } from './models';

// Comparison operators
const popularPosts = await Post.find({ views: { $gte: 1000 } });

// Logical operators
const posts = await Post.find({
  $or: [
    { published: true },
    { author: 'Admin' }
  ]
});

// Array operations
const tutorialPosts = await Post.find({ 
  tags: 'tutorial'  // Matches if array contains 'tutorial'
});

// Multiple tags using $in
const techPosts = await Post.find({
  tags: { $in: ['javascript', 'typescript', 'mongodb'] }
});
```

### Text Search

```typescript
import { Post } from './models';

// Regex search (case-insensitive)
const posts = await Post.find({
  title: { $regex: 'mongoose', $options: 'i' }
});

// Search in author field
const alicePosts = await Post.find({
  author: { $regex: '^Alice', $options: 'i' }
});
```

---

## ✅ Validation

### Built-in Validators

```typescript
const postSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [5, 'Title must be at least 5 characters'],
    maxlength: [200, 'Title cannot exceed 200 characters'],
    trim: true
  },
  views: {
    type: Number,
    min: [0, 'Views cannot be negative'],
    default: 0
  },
  author: {
    type: String,
    required: true,
    default: 'Anonymous',
    lowercase: true,
    trim: true
  }
});
```

### Custom Validators

```typescript
const postSchema = new Schema({
  tags: {
    type: [String],
    validate: {
      validator: function(tags: string[]) {
        return tags.length <= 5;
      },
      message: 'Cannot have more than 5 tags'
    }
  }
});
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

```bash
cp .env.example .env
# Ensure .env contains:
# MONGO_URL=mongodb://localhost:27017
# MONGO_DB=Hackhaven
# PORT=3000
```

### 3. Start the Server

```bash
npm run dev
```

### 4. Test the API

**Create a post:**
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Welcome to Hackhaven",
    "content": "This is our first post in the community!",
    "author": "Alice",
    "tags": ["welcome", "intro"],
    "published": true
  }'
```

**Get all posts:**
```bash
curl http://localhost:3000/posts
```

**Get published posts only:**
```bash
curl http://localhost:3000/posts/filter/published
```

**Get posts by author:**
```bash
curl http://localhost:3000/posts/author/Alice
```

**Search posts by tag:**
```bash
curl http://localhost:3000/posts/tag/welcome
```

---

## 📖 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| POST | `/posts` | Create new post |
| GET | `/posts` | Get all posts |
| GET | `/posts/:id` | Get post by ID |
| PUT | `/posts/:id` | Update post |
| DELETE | `/posts/:id` | Delete post |
| GET | `/posts/filter/published` | Get published posts |
| GET | `/posts/author/:author` | Get posts by author |
| GET | `/posts/tag/:tag` | Search posts by tag |

---

## 🆚 Mongoose vs Native Driver

| Feature | Native Driver | Mongoose |
|---------|---------------|----------|
| **Schema** | ❌ No structure | ✅ Defined structure |
| **Validation** | ❌ Manual | ✅ Automatic |
| **Type Casting** | ❌ Manual | ✅ Automatic |
| **Middleware** | ❌ Not available | ✅ Pre/post hooks |
| **Virtual Fields** | ❌ Not available | ✅ Supported |
| **Population** | ❌ Manual joins | ✅ Auto population |
| **Change Tracking** | ❌ Manual | ✅ Built-in |
| **Query Building** | ⚠️ Basic | ✅ Advanced chaining |

### When to Use Each

**Use Mongoose when:**
- You need data validation and structure
- Working with complex relationships
- Building production applications
- You want type safety with TypeScript
- You need middleware for business logic

**Use Native Driver when:**
- Building simple scripts or tools
- Performance is absolutely critical
- You need maximum flexibility
- Working with dynamic schemas
- Mongoose overhead is too heavy

---

## 🔑 Key Takeaways

✅ **Modular Structure** - Separate concerns (config, models, routes)

✅ **Schema Definition** - Define structure with validation rules

✅ **Type Safety** - Use TypeScript interfaces with Mongoose

✅ **Automatic Validation** - Mongoose validates before saving

✅ **Clean Imports** - Centralized exports via `models/index.ts`

✅ **Connection Management** - Separate database logic in `config/db.ts`

✅ **Query Builder** - Chainable methods for complex queries

✅ **Error Handling** - Built-in validation error messages

---

## 📚 Official Documentation

- **Mongoose Docs**: [mongoosejs.com](https://mongoosejs.com/)
- **Schemas**: [mongoosejs.com/docs/guide.html](https://mongoosejs.com/docs/guide.html)
- **Models**: [mongoosejs.com/docs/models.html](https://mongoosejs.com/docs/models.html)
- **Queries**: [mongoosejs.com/docs/queries.html](https://mongoosejs.com/docs/queries.html)
- **Validation**: [mongoosejs.com/docs/validation.html](https://mongoosejs.com/docs/validation.html)
- **Middleware**: [mongoosejs.com/docs/middleware.html](https://mongoosejs.com/docs/middleware.html)
- **TypeScript**: [mongoosejs.com/docs/typescript.html](https://mongoosejs.com/docs/typescript.html)

---

## 💡 Common Patterns

### Timestamps
```typescript
const postSchema = new Schema({
  // ... fields
}, { 
  timestamps: true  // Adds createdAt and updatedAt automatically
});
```

### Default Values
```typescript
author: {
  type: String,
  default: 'Anonymous'
}
```

### Required Fields
```typescript
title: {
  type: String,
  required: [true, 'Custom error message']
}
```

### Unique Fields
```typescript
email: {
  type: String,
  required: true,
  unique: true,  // Creates a unique index
  lowercase: true
}
```

---

**🎯 Ready to build structured, validated MongoDB applications with Mongoose!**
