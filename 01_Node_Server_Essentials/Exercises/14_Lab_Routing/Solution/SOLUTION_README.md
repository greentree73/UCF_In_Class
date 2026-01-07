# Express Routing Lab: Posts API - SOLUTION

## What Was Implemented

This solution demonstrates a complete RESTful API for managing blog posts with all CRUD operations and advanced filtering capabilities.

## Implemented Routes

### 1. **GET /posts** - List All Posts with Optional Filtering
**Implementation Highlights:**
- **Pagination Support**: `?page=1&limit=10` (default limit: 10, max: 50)
- **User Filtering**: `?userId=X` to get posts by specific user
- **Combined Query**: Supports both pagination and filtering together
- **Validation**: Validates user existence when filtering by userId
- **Author Information**: Includes author details when filtering by user

**Features:**
```typescript
// Handles both scenarios in one route:
// GET /posts - All posts with pagination
// GET /posts?userId=1 - Posts by user 1
// GET /posts?userId=1&page=2&limit=5 - User 1's posts, page 2, 5 per page
```

### 2. **GET /posts/:id** - Get Specific Post with Author
**Implementation Highlights:**
- **Parameter Validation**: Ensures ID is a valid number
- **Author Lookup**: Automatically includes author information
- **Error Handling**: 404 for non-existent posts, 400 for invalid IDs
- **Comprehensive Response**: Post data + author details

### 3. **POST /posts** - Create New Post
**Implementation Highlights:**
- **Field Validation**: Validates userId, title, and content are provided
- **User Verification**: Ensures the userId corresponds to an existing user
- **ID Generation**: Automatically generates sequential IDs
- **Data Integrity**: Trims whitespace from title and content
- **Author Context**: Returns created post with author information

### 4. **PUT /posts/:id** - Update Existing Post
**Implementation Highlights:**
- **Partial Updates**: Only updates provided fields (title and/or content)
- **Existence Check**: Validates post exists before updating
- **Change Tracking**: Returns list of fields that were modified
- **Author Information**: Includes author details in response

### 5. **DELETE /posts/:id** - Delete Post
**Implementation Highlights:**
- **Safe Deletion**: Validates post exists before deletion
- **Confirmation Response**: Returns deleted post information
- **Statistics**: Includes remaining post count
- **Author Context**: Shows who authored the deleted post

## Technical Implementation Details

### Route Organization
Routes are organized logically with clear separation of concerns:
```typescript
// All post routes grouped together in one section
// Clear documentation for each route
// Consistent error handling patterns
// Proper HTTP status codes
```

### Data Relationships
Proper handling of user-post relationships:
```typescript
// Posts reference users via userId
// Author information dynamically retrieved
// Validation ensures data integrity
// Foreign key constraints enforced
```

### Error Handling
Comprehensive error responses:
```typescript
// 400 - Bad Request (invalid parameters)
// 404 - Not Found (missing resources)
// 409 - Conflict (validation errors)
// 500 - Server Error (unexpected issues)
```

### Parameter Validation
Robust validation patterns:
```typescript
// Number validation for IDs
// Required field checking
// Type conversion and sanitization
// User existence verification
```

## API Usage Examples

### Basic Operations
```bash
# Get all posts
GET /posts

# Get posts with pagination
GET /posts?page=2&limit=3

# Get specific post
GET /posts/1

# Get posts by user
GET /posts?userId=1
```

### CRUD Operations
```bash
# Create new post
POST /posts
{
  "userId": 1,
  "title": "My New Post",
  "content": "This is the content."
}

# Update post (partial)
PUT /posts/1
{
  "title": "Updated Title"
}

# Delete post
DELETE /posts/1
```

## Response Examples

### GET /posts Response:
```json
{
  "posts": [...],
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

### GET /posts?userId=1 Response:
```json
{
  "posts": [...],
  "author": {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com"
  },
  "count": 2,
  "pagination": {...}
}
```

### GET /posts/:id Response:
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
    "email": "alice@example.com",
    "city": "New York"
  }
}
```

## Key Learning Outcomes

### RESTful Design Principles
- **Resource-based URLs**: `/posts` for the collection, `/posts/:id` for individual resources
- **HTTP Methods**: GET for reading, POST for creating, PUT for updating, DELETE for removing
- **Status Codes**: Proper use of 200, 201, 400, 404 status codes
- **Consistent Responses**: All endpoints return JSON with similar structure

### Advanced Routing Concepts
- **Query Parameter Handling**: Pagination, filtering, and sorting
- **Route Parameter Validation**: Type checking and existence validation
- **Combined Parameters**: Supporting both route and query parameters
- **Conditional Logic**: Different behavior based on query parameters

### Data Management Patterns
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Relationship Handling**: Managing foreign key relationships
- **Data Integrity**: Validation and constraint enforcement
- **Search and Filtering**: Dynamic data filtering based on criteria

### Error Handling Best Practices
- **Input Validation**: Comprehensive parameter and body validation
- **Meaningful Messages**: Clear error descriptions and suggestions
- **Consistent Format**: Standard error response structure
- **Appropriate Codes**: Correct HTTP status code usage

This solution provides a production-ready foundation for a blog post API with all essential features and best practices implemented.