# Express Routing Lab: Posts API

## Learning Objectives
- Implement RESTful routes for post data
- Practice route parameters and query strings
- Handle different HTTP methods for CRUD operations
- Understand resource relationships (users and posts)

## Activity Overview
You need to add API routes for managing blog posts. The server already has user routes implemented, and now you'll add the missing post routes to complete the API.

## Current Status
✅ **Already Implemented:**
- User routes (`/users`, `/users/:id`)
- Basic search functionality
- Mock data for users and posts

❌ **Missing (Your Task):**
- Post listing route
- Individual post retrieval  
- Posts filtered by user
- Post creation, updating, and deletion

## Your Task: Add Post Routes

You need to implement the following routes in `src/server.ts`:

### 1. **GET /posts** - List All Posts
**Purpose:** Return all blog posts with optional pagination
**Features to implement:**
- Return all posts in the posts array
- Support pagination with `?page=1&limit=10`
- Include post count and pagination metadata
- Sort posts by ID by default

**Example URLs:**
- `GET /posts` - Get all posts
- `GET /posts?page=1&limit=5` - Get first 5 posts
- `GET /posts?limit=3` - Get first 3 posts

**Expected Response Format:**
```json
{
  "posts": [
    {
      "id": 1,
      "userId": 1,
      "title": "Hello World",
      "content": "This is my first post!"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "itemsPerPage": 10,
    "totalItems": 4,
    "totalPages": 1,
    "hasNext": false,
    "hasPrev": false
  }
}
```

### 2. **GET /posts/:id** - Get Specific Post
**Purpose:** Retrieve a single post by its ID
**Features to implement:**
- Parse and validate the post ID parameter
- Return 404 if post doesn't exist
- Return 400 if ID is invalid (not a number)
- Include the post author information from users array

**Example URLs:**
- `GET /posts/1` - Get post with ID 1
- `GET /posts/999` - Should return 404

**Expected Response Format:**
```json
{
  "post": {
    "id": 1,
    "userId": 1,
    "title": "Hello World", 
    "content": "This is my first post!"
  },
  "author": {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com"
  }
}
```

### 3. **GET /posts?userId=:userId** - Filter Posts by User
**Purpose:** Get all posts written by a specific user
**Features to implement:**
- Use query parameter `userId` to filter posts
- Validate that the user exists
- Return empty array if user has no posts
- Include user information in response

**Example URLs:**
- `GET /posts?userId=1` - Get all posts by user 1
- `GET /posts?userId=999` - Should return error if user doesn't exist

**Expected Response Format:**
```json
{
  "posts": [
    {
      "id": 1,
      "userId": 1,
      "title": "Hello World",
      "content": "This is my first post!"
    }
  ],
  "author": {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com"
  },
  "count": 2
}
```

### 4. **POST /posts** - Create New Post
**Purpose:** Create a new blog post
**Features to implement:**
- Accept JSON body with title, content, and userId
- Validate required fields are present
- Validate that the user exists
- Generate new ID for the post
- Add post to the posts array
- Return the created post

**Request Body Format:**
```json
{
  "userId": 1,
  "title": "My New Post",
  "content": "This is the content of my new post."
}
```

**Expected Response Format:**
```json
{
  "message": "Post created successfully",
  "post": {
    "id": 5,
    "userId": 1,
    "title": "My New Post",
    "content": "This is the content of my new post."
  }
}
```

### 5. **PUT /posts/:id** - Update Post
**Purpose:** Update an existing post
**Features to implement:**
- Validate post ID parameter
- Check that post exists
- Update only provided fields (title, content)
- Return updated post

### 6. **DELETE /posts/:id** - Delete Post  
**Purpose:** Remove a post
**Features to implement:**
- Validate post ID parameter
- Check that post exists
- Remove post from array
- Return confirmation message

## Implementation Guide

### Step 1: Locate the TODO Comments
Look for the comment `// TODO: ADD POST ROUTES HERE` in `src/server.ts`

### Step 2: Route Structure Template
```typescript
app.get('/posts', (req: Request, res: Response) => {
  // Your implementation here
});

app.get('/posts/:id', (req: Request, res: Response) => {
  // Your implementation here
});

// Continue with other routes...
```

### Step 3: Helpful Code Patterns

**Parameter Validation:**
```typescript
const postId = parseInt(req.params.id);
if (isNaN(postId)) {
  return res.status(400).json({ error: 'Invalid post ID' });
}
```

**Finding Posts:**
```typescript
const post = posts.find(p => p.id === postId);
if (!post) {
  return res.status(404).json({ error: 'Post not found' });
}
```

**Query Parameter Handling:**
```typescript
const { userId, page = '1', limit = '10' } = req.query;
```

**Generating New IDs:**
```typescript
const newId = Math.max(...posts.map(p => p.id)) + 1;
```

## Testing Your Implementation

### Test URLs (after implementation):
1. `GET http://localhost:3000/posts`
2. `GET http://localhost:3000/posts/1`
3. `GET http://localhost:3000/posts?userId=1`
4. `POST http://localhost:3000/posts` (with JSON body)
5. `PUT http://localhost:3000/posts/1` (with JSON body)
6. `DELETE http://localhost:3000/posts/1`

### Test Data Available:
- **Users:** IDs 1-5 (Alice, Bob, Carol, David, Eva)
- **Posts:** IDs 1-4 (existing posts by Alice, Bob, and Carol)

## Success Criteria
- ✅ All 6 routes implemented and working
- ✅ Proper parameter validation and error handling
- ✅ Consistent JSON response format
- ✅ No server crashes on invalid requests
- ✅ Appropriate HTTP status codes (200, 201, 400, 404)
- ✅ Mock data relationships maintained (users and posts)

## Time Management Suggestions
- **5 minutes:** Study existing code and understand the patterns
- **5 minutes:** Implement GET routes (/posts, /posts/:id)
- **3 minutes:** Implement query filtering (/posts?userId=X)
- **5 minutes:** Implement POST route for creating posts
- **2 minutes:** Test all routes and fix any issues

Good luck! 🚀