# 🗂️ Mongoose Subdocuments

## 📘 Introduction

**Subdocuments** are documents embedded within other documents in MongoDB. With Mongoose, subdocuments allow you to nest schemas within schemas, making it easy to organize related data hierarchically.

### 🤔 What Are Subdocuments?

Subdocuments are:
- Documents nested inside a parent document
- Defined using Mongoose schemas
- Stored within arrays or as single nested objects
- Have their own middleware, validation, and methods
- Part of the parent document (no separate collection)

**Example:** A blog post with embedded comments is a perfect use case for subdocuments.

---

## 🎯 Learning Objectives

By the end of this session, you will understand:
- What subdocuments are and when to use them
- How to define subdocument schemas in Mongoose
- The difference between subdocuments and document references
- How to create, update, and delete subdocuments
- Best practices for working with embedded documents

---

## 📚 Key Documentation

**Essential Reading:**
- [Mongoose Subdocuments](https://mongoosejs.com/docs/subdocs.html) - Official subdocuments guide
- [Schema Types - Arrays](https://mongoosejs.com/docs/schematypes.html#arrays) - Array schema types
- [Mongoose Tutorials - Subdocuments](https://mongoosejs.com/docs/tutorials/subdocs.html) - Detailed tutorial

---

## 💡 Why Use Subdocuments?

### ✅ Benefits

1. **Data Locality** - Related data is stored together (faster reads)
2. **Atomic Operations** - Update parent and subdocuments in one operation
3. **Simpler Queries** - No joins needed (MongoDB doesn't do joins well)
4. **Natural Modeling** - Matches how we think about hierarchical data

### ⚠️ Considerations

1. **Document Size Limit** - MongoDB documents are limited to 16MB
2. **Not Shareable** - Subdocuments can't be referenced by other documents
3. **Duplication** - Same subdocument data may be duplicated across documents

---

## 🔍 Subdocuments vs References

| Aspect | Subdocuments | References |
|--------|-------------|-----------|
| **Storage** | Embedded in parent | Separate collection |
| **Queries** | Single query | Multiple queries (populate) |
| **Updates** | Atomic with parent | Separate operations |
| **Reusability** | Not reusable | Can be shared |
| **Best For** | One-to-few, tightly coupled | One-to-many, loosely coupled |

### 🤷 When to Choose Subdocuments?

**Use Subdocuments When:**
- Data is always accessed together (e.g., Post + Comments)
- One-to-few relationships (< 100 subdocuments)
- Data is specific to the parent (not shared)
- Atomicity is important

**Use References When:**
- One-to-many (potentially unbounded)
- Data might be accessed independently
- Same data referenced by multiple documents
- Document size could grow beyond 16MB

---

## 🛠️ Basic Subdocument Pattern

### Simple Example: Blog Post with Comments

```typescript
// 1. Define the subdocument schema
const commentSchema = new Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// 2. Embed in parent schema
const postSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  comments: [commentSchema]  // Array of subdocuments
});
```

**Result in MongoDB:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "My Blog Post",
  "body": "This is the post content...",
  "comments": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "author": "Alice",
      "text": "Great post!",
      "createdAt": "2026-02-13T10:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "author": "Bob",
      "text": "Thanks for sharing!",
      "createdAt": "2026-02-13T11:30:00.000Z"
    }
  ]
}
```

---

## 📝 Working with Subdocuments

### Creating Subdocuments

```typescript
// Method 1: Create with parent document
const post = new Post({
  title: 'My Post',
  body: 'Content here',
  comments: [
    { author: 'Alice', text: 'Great post!' }
  ]
});
await post.save();

// Method 2: Add to existing document
const post = await Post.findById(postId);
post.comments.push({ author: 'Bob', text: 'Thanks!' });
await post.save();
```

### Accessing Subdocuments

```typescript
const post = await Post.findById(postId);

// Access all subdocuments
console.log(post.comments); // Array of comment subdocuments

// Find specific subdocument by ID
const comment = post.comments.id(commentId);
console.log(comment.text);
```

### Updating Subdocuments

```typescript
const post = await Post.findById(postId);
const comment = post.comments.id(commentId);

// Modify the subdocument
comment.text = 'Updated comment text';
await post.save(); // Save parent to persist changes
```

### Deleting Subdocuments

```typescript
const post = await Post.findById(postId);

// Method 1: Using remove (deprecated but shown for reference)
const comment = post.comments.id(commentId);
comment.deleteOne();
await post.save();

// Method 2: Using pull (recommended)
post.comments.pull(commentId);
await post.save();

// Method 3: Filter array
post.comments = post.comments.filter(c => c._id.toString() !== commentId);
await post.save();
```

---

## 🎯 Subdocument IDs

Every subdocument automatically gets its own `_id` field:

```typescript
const post = await Post.findById(postId);
post.comments.push({ author: 'Alice', text: 'Hello' });
await post.save();

// Subdocument now has an _id
console.log(post.comments[0]._id); // ObjectId("...")
```

**Why?** The `_id` allows you to uniquely identify and manipulate individual subdocuments.

---

## ⚠️ Common Mistakes

### ❌ Mistake 1: Forgetting to Save Parent

```typescript
// BAD - Changes won't persist!
const post = await Post.findById(postId);
post.comments.push({ author: 'Alice', text: 'Comment' });
// Missing: await post.save();
```

```typescript
// GOOD - Save the parent document
const post = await Post.findById(postId);
post.comments.push({ author: 'Alice', text: 'Comment' });
await post.save(); // ✅
```

### ❌ Mistake 2: Treating Subdocuments Like Separate Collections

```typescript
// BAD - Can't query subdocuments directly
await Comment.find({ author: 'Alice' }); // ❌ Comment is not a model!

// GOOD - Query through parent
await Post.find({ 'comments.author': 'Alice' }); // ✅
```

### ❌ Mistake 3: Creating Unbounded Arrays

```typescript
// BAD - Could grow beyond 16MB limit
const postSchema = new Schema({
  title: String,
  comments: [commentSchema] // ⚠️ Unlimited comments!
});

// BETTER - Set a reasonable limit or use references
const postSchema = new Schema({
  title: String,
  comments: {
    type: [commentSchema],
    validate: [arrayLimit, '{PATH} exceeds limit of 100']
  }
});

function arrayLimit(val: any[]) {
  return val.length <= 100;
}
```

---

## 🎬 This Session's Demo

In the accompanying code, you'll see:

1. **Comment subdocument schema** embedded in the Post model
2. **Creating posts with comments** during document creation
3. **Adding comments** to existing posts
4. **Finding and updating** specific comments by ID
5. **Removing comments** from posts

---

## 🚀 Next Steps

After understanding subdocuments, you'll learn:
- **Virtuals** - Computed properties that aren't stored in MongoDB
- **Population** - Referencing documents in other collections
- **Document Middleware** - Hooks for subdocument lifecycle events

---

## 📖 Additional Resources

- [MongoDB Data Modeling](https://www.mongodb.com/docs/manual/core/data-modeling-introduction/)
- [6 Rules of Thumb for MongoDB Schema Design](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design)
- [Thinking in Documents](https://www.mongodb.com/blog/post/thinking-documents-part-1)
