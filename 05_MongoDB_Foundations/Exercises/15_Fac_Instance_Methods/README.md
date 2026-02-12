# 🎯 Mongoose Instance Methods

## 📘 Introduction

**Instance methods** are custom functions that you define on your Mongoose schema and call on individual document instances. They allow you to encapsulate document-specific logic directly on the model.

### 🤔 What Are Instance Methods?

Instance methods are functions that:
- Are defined on the schema using `schema.methods.functionName`
- Are called on **individual document instances** (not the Model itself)
- Have access to the document's data via `this`
- Can modify the document and save changes
- Help keep your code clean and reusable

---

## 🔍 Instance Methods vs Static Methods vs Query Helpers

| Type | Called On | Example | Purpose |
|------|-----------|---------|---------|
| **Instance Method** | Document instance | `post.publish()` | Operations on a single document |
| **Static Method** | Model | `Post.findByAuthor()` | Custom queries or operations |
| **Query Helper** | Query | `Post.find().byAuthor()` | Chainable query modifications |

**This exercise focuses on Instance Methods** ✅

---

## 💡 Why Use Instance Methods?

### ❌ Without Instance Methods

```typescript
// Controller code becomes cluttered
export const publishPost = async (req: Request, res: Response) => {
	const post = await Post.findById(req.params.id);
	post.published = true;
	post.updatedAt = new Date();
	await post.save();
	res.json({ post });
};

export const incrementViews = async (req: Request, res: Response) => {
	const post = await Post.findById(req.params.id);
	post.views += 1;
	await post.save();
	res.json({ post });
};
```

### ✅ With Instance Methods

```typescript
// Model (POST.ts)
postSchema.methods.publish = async function() {
	this.published = true;
	this.updatedAt = new Date();
	return await this.save();
};

postSchema.methods.incrementViews = async function() {
	this.views += 1;
	return await this.save();
};

// Controller (clean and readable!)
export const publishPost = async (req: Request, res: Response) => {
	const post = await Post.findById(req.params.id);
	await post.publish();
	res.json({ post });
};

export const viewPost = async (req: Request, res: Response) => {
	const post = await Post.findById(req.params.id);
	await post.incrementViews();
	res.json({ post });
};
```

**Benefits:**
- ✨ Cleaner controllers
- ♻️ Reusable logic
- 📦 Encapsulated behavior
- 🧪 Easier to test

---

## 🏗️ Project Structure

```
15_Fac_Instance_Methods/
├── src/
│   ├── config/
│   │   └── db.ts                  # Database connection
│   ├── models/
│   │   ├── index.ts               # Model exports
│   │   └── POST.ts                # Post model with instance methods
│   ├── controllers/
│   │   └── postController.ts      # Uses instance methods
│   ├── routes/
│   │   └── postRoutes.ts          # Route definitions
│   └── app.ts                     # Express app
├── package.json
└── tsconfig.json
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
```

### 3. Start MongoDB

Ensure MongoDB is running on `localhost:27017`

### 4. Run the Server

```bash
npm run dev
```

---

## 📚 Instance Methods in This Project

We've implemented **4 simple instance methods** on the Post model:

### 1. `incrementViews()` - Async Method

**Purpose:** Increment the view count when someone views the post

```typescript
postSchema.methods.incrementViews = async function(): Promise<IPost> {
	this.views += 1;
	return await this.save();
};
```

**Usage in Controller:**
```typescript
const post = await Post.findById(id);
await post.incrementViews();
```

---

### 2. `getExcerpt()` - Synchronous Method

**Purpose:** Get a shortened preview of the post body

```typescript
postSchema.methods.getExcerpt = function(length: number = 50): string {
	if (this.body.length <= length) {
		return this.body;
	}
	return this.body.substring(0, length) + '...';
};
```

**Usage in Controller:**
```typescript
const post = await Post.findById(id);
const preview = post.getExcerpt(100);
```

**Note:** This is synchronous - no `async/await` needed!

---

### 3. `publish()` - Async Method with Updates

**Purpose:** Mark post as published and update timestamp

```typescript
postSchema.methods.publish = async function(): Promise<IPost> {
	this.published = true;
	this.updatedAt = new Date();
	return await this.save();
};
```

**Usage in Controller:**
```typescript
const post = await Post.findById(id);
await post.publish();
```

---

### 4. `addTag()` - Async Method with Logic

**Purpose:** Add a tag only if it doesn't already exist

```typescript
postSchema.methods.addTag = async function(tag: string): Promise<IPost> {
	if (!this.tags.includes(tag)) {
		this.tags.push(tag);
		return await this.save();
	}
	return this;
};
```

**Usage in Controller:**
```typescript
const post = await Post.findById(id);
await post.addTag('javascript');
```

---

## 🧪 Testing Instance Methods

### Step 1: Create a Post

```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Understanding Mongoose Instance Methods",
    "body": "Instance methods are powerful features in Mongoose that allow you to add custom functionality to your document instances. They help keep your code clean and organized.",
    "author": "Jane Developer"
  }'
```

**Save the `_id` from the response!**

---

### Step 2: Test `incrementViews()`

```bash
# Replace {id} with your post ID
curl -X POST http://localhost:3000/posts/{id}/view
```

**Expected Response:**
```json
{
  "message": "Post viewed successfully",
  "views": 1,
  "post": {
    "_id": "...",
    "title": "Understanding Mongoose Instance Methods",
    "views": 1
  }
}
```

**Call it again and watch views increment to 2, 3, 4...**

---

### Step 3: Test `getExcerpt()`

```bash
curl http://localhost:3000/posts/{id}/excerpt
```

**Expected Response:**
```json
{
  "title": "Understanding Mongoose Instance Methods",
  "author": "Jane Developer",
  "excerpt": "Instance methods are powerful features in Mongoose that allow you to add custom functionality to your...",
  "fullLength": 147
}
```

---

### Step 4: Test `publish()`

```bash
curl -X PUT http://localhost:3000/posts/{id}/publish
```

**Expected Response:**
```json
{
  "message": "Post published successfully",
  "post": {
    "_id": "...",
    "published": true,
    "updatedAt": "2026-02-11T..."
  }
}
```

---

### Step 5: Test `addTag()`

```bash
# Add first tag
curl -X POST http://localhost:3000/posts/{id}/tags \
  -H "Content-Type: application/json" \
  -d '{"tag": "mongoose"}'

# Add second tag
curl -X POST http://localhost:3000/posts/{id}/tags \
  -H "Content-Type: application/json" \
  -d '{"tag": "tutorial"}'

# Try adding duplicate (won't be added)
curl -X POST http://localhost:3000/posts/{id}/tags \
  -H "Content-Type: application/json" \
  -d '{"tag": "mongoose"}'
```

**Expected Response:**
```json
{
  "message": "Tag added successfully",
  "tags": ["mongoose", "tutorial"],
  "post": {
    "tags": ["mongoose", "tutorial"]
  }
}
```

---

## 🔑 Key Concepts

### Using `this` in Instance Methods

```typescript
postSchema.methods.myMethod = function() {
	// ❌ DON'T use arrow functions!
	// Arrow functions don't bind 'this' correctly
	
	// ✅ Use regular function
	console.log(this.title);  // Access document properties
	this.views += 1;          // Modify document
};
```

**Critical:** Always use `function()` not `() =>` for instance methods!

---

### Async vs Sync Methods

```typescript
// Synchronous (no database changes)
postSchema.methods.getExcerpt = function(length: number): string {
	return this.body.substring(0, length);
};

// Asynchronous (saves to database)
postSchema.methods.incrementViews = async function(): Promise<IPost> {
	this.views += 1;
	return await this.save();  // Saves to DB
};
```

**Rule:** Use `async` if you're calling `.save()` or other async operations

---

### TypeScript Type Definitions

**Must add method signatures to interface:**

```typescript
export interface IPost extends Document {
	title: string;
	body: string;
	// ... other fields
	
	// Instance method declarations
	incrementViews(): Promise<IPost>;
	getExcerpt(length?: number): string;
	publish(): Promise<IPost>;
	addTag(tag: string): Promise<IPost>;
}
```

Without this, TypeScript won't recognize your methods!

---

## 📋 Common Patterns

### Pattern 1: Toggle Boolean

```typescript
postSchema.methods.togglePublished = async function() {
	this.published = !this.published;
	return await this.save();
};
```

---

### Pattern 2: Calculate Derived Value

```typescript
postSchema.methods.getReadTime = function(): number {
	const wordsPerMinute = 200;
	const wordCount = this.body.split(' ').length;
	return Math.ceil(wordCount / wordsPerMinute);
};
```

---

### Pattern 3: Conditional Update

```typescript
postSchema.methods.archive = async function() {
	if (this.published) {
		throw new Error('Cannot archive published posts');
	}
	this.archived = true;
	return await this.save();
};
```

---

### Pattern 4: Array Manipulation

```typescript
postSchema.methods.removeTag = async function(tag: string) {
	this.tags = this.tags.filter(t => t !== tag);
	return await this.save();
};
```

---

## 🎓 Learning Objectives

After exploring this project, you should understand:

- ✅ What instance methods are and when to use them
- ✅ How to define instance methods on Mongoose schemas
- ✅ The difference between sync and async instance methods
- ✅ Why to use `function()` instead of arrow functions
- ✅ How to add TypeScript types for instance methods
- ✅ How instance methods keep controllers clean
- ✅ Common patterns for instance method implementation

---

## 🤔 Reflection Questions

1. **When should you use an instance method vs a static method?**
   - Instance: Operations on a single document
   - Static: Custom queries or operations on the model

2. **Why can't we use arrow functions for instance methods?**
   - Arrow functions don't bind `this` to the document instance

3. **Do instance methods need to be async?**
   - Only if they perform async operations (like `.save()`)

4. **Can instance methods accept parameters?**
   - Yes! See `getExcerpt(length)` and `addTag(tag)`

---

## 🏆 Challenge Ideas

Try adding these instance methods on your own:

1. **`unpublish()`** - Set `published` to false
2. **`isRecent()`** - Return true if created in last 7 days
3. **`getWordCount()`** - Count words in the body
4. **`hasTag(tag)`** - Check if post has a specific tag
5. **`removeTags()`** - Clear all tags

---

## 📚 Additional Resources

- [Mongoose Instance Methods Docs](https://mongoosejs.com/docs/guide.html#methods)
- [TypeScript with Mongoose](https://mongoosejs.com/docs/typescript.html)
- [Document vs Model](https://mongoosejs.com/docs/documents.html)

---

## 🎯 Next Steps

After mastering instance methods, explore:
- **Static Methods** - Custom model-level functions
- **Virtual Properties** - Computed fields that aren't stored in DB
- **Middleware (Hooks)** - Pre/post save logic
- **Query Helpers** - Chainable query methods

---

Happy coding! 🚀
