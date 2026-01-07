import express, { Request, Response, NextFunction } from 'express';

// Create Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


// ============================================
// MOCK DATA FOR EXAMPLES
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  city: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  content: string;
}


const users: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 28, city: 'New York' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 34, city: 'Los Angeles' },
  { id: 3, name: 'Carol Davis', email: 'carol@example.com', age: 25, city: 'Chicago' },
  { id: 4, name: 'David Wilson', email: 'david@example.com', age: 31, city: 'Houston' },
  { id: 5, name: 'Eva Brown', email: 'eva@example.com', age: 29, city: 'Phoenix' }
];

const posts: Post[] = [
  { id: 1, userId: 1, title: 'Hello World', content: 'This is my first post!' },
  { id: 2, userId: 1, title: 'Express Tips', content: 'Some useful tips for Express.js' },
  { id: 3, userId: 2, title: 'Node.js Basics', content: 'Getting started with Node.js' },
  { id: 4, userId: 3, title: 'TypeScript with Express', content: 'How to use TypeScript in Express apps' },
];

// ============================================
// 1. BASIC ROUTES
// ============================================

/**
 * Home route - Basic GET route
 */
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: '🚀 Express Routing Fundamentals',
    description: 'Welcome to the Express.js routing tutorial!',
    availableEndpoints: [
      'GET / - This home page',
      'GET /about - About information',
      'GET /users - List all users',
      'GET /users/:id - Get specific user',
      'GET /search?q=term - Search with query string',
    ],
    timestamp: new Date().toISOString()
  });
});

/**
 * About route - Basic static route
 */
app.get('/about', (_req: Request, res: Response) => {
  res.json({
    project: 'Express Routing Fundamentals',
    version: '1.0.0',
    description: 'A comprehensive tutorial on Express.js routing patterns',
    topics: [
      'Route parameters',
      'Query strings',
      'HTTP methods',
      'RESTful patterns',
      'URL structure',
      'Parameter extraction'
    ],
    examples: {
      routeParameters: '/users/:id',
      queryStrings: '/search?q=term&limit=10',
      restfulPatterns: 'GET /users'
    }
  });
});

// ============================================
// 2. ROUTE PARAMETERS
// ============================================

/**
 * Single route parameter example
 * GET /users/:id
 */
app.get('/users/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  
  // Validate parameter
  if (isNaN(userId)) {
    return res.status(400).json({
      error: 'Invalid user ID',
      message: 'User ID must be a valid number',
      received: req.params.id
    });
  }
  
  // Find user
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({
      error: 'User not found',
      message: `No user found with ID ${userId}`,
      availableUsers: users.map(u => ({ id: u.id, name: u.name }))
    });
  }
  
  res.json({
    user: user,
    message: `Successfully retrieved user ${userId}`,
    routeInfo: {
      parameter: 'id',
      value: userId,
      originalValue: req.params.id
    }
  });
});




// ============================================
// 3. QUERY STRINGS
// ============================================

/**
 * Search with query string parameters
 * GET /search?q=term&limit=10&sort=name&city=Chicago
 */
app.get('/search', (req: Request, res: Response) => {
  const {
    q = '',                    // Search term
    limit = '10',              // Results limit
    sort = 'name',             // Sort field
    city                       // Filter by city
  } = req.query;
  
  // Convert and validate parameters
  const searchTerm = (q as string).toLowerCase();
  const resultLimit = Math.min(parseInt(limit as string) || 10, 50); // Max 50 results
  const sortField = sort as keyof User;
  
  // Filter users based on search criteria
  let filteredUsers = users.filter(user => {
    const matchesSearch = !searchTerm || 
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm);
    
    const matchesCity = !city || 
      user.city.toLowerCase() === (city as string).toLowerCase();
    
    return matchesSearch && matchesCity;
  });
  
  // Sort results
  if (['name', 'email', 'age', 'city'].includes(sortField)) {
    filteredUsers.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal);
      }
      return (aVal as number) - (bVal as number);
    });
  }
  
  // Limit results
  const paginatedUsers = filteredUsers.slice(0, resultLimit);
  
  res.json({
    results: paginatedUsers,
    metadata: {
      totalFound: filteredUsers.length,
      returned: paginatedUsers.length,
      searchCriteria: {
        query: searchTerm || null,
        city: city || null,
        sortBy: sortField,
        limit: resultLimit
      }
    },
    queryInfo: {
      originalQuery: req.query,
      availableFilters: ['q', 'limit', 'sort', 'city'],
      sortOptions: ['name', 'email', 'age', 'city']
    }
  });
});

// ============================================
// 4. RESTFUL ROUTES (USERS RESOURCE)
// ============================================

/**
 * GET /users - List all users (with optional pagination)
 */
app.get('/users', (req: Request, res: Response) => {
  const {
    page = '1',
    limit = '10',
    sort = 'id'
  } = req.query;
  
  const pageNum = Math.max(parseInt(page as string) || 1, 1);
  const limitNum = Math.min(parseInt(limit as string) || 10, 50);
  const sortField = sort as keyof User;
  
  // Sort users
  let sortedUsers = [...users];
  if (['id', 'name', 'email', 'age', 'city'].includes(sortField)) {
    sortedUsers.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal);
      }
      return (aVal as number) - (bVal as number);
    });
  }
  
  // Paginate
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginatedUsers = sortedUsers.slice(startIndex, endIndex);
  
  res.json({
    users: paginatedUsers,
    pagination: {
      currentPage: pageNum,
      itemsPerPage: limitNum,
      totalItems: users.length,
      totalPages: Math.ceil(users.length / limitNum),
      hasNext: endIndex < users.length,
      hasPrev: pageNum > 1
    },
    sort: sortField
  });
});


// ============================================
// 5. ADVANCED ROUTING EXAMPLES
// ============================================

/**
 * Wildcard route example
 * GET /files/*
 */
app.get('/files/*', (req: Request, res: Response) => {
  const filePath = req.params[0]; // Wildcard content
  
  res.json({
    message: 'File route accessed',
    requestedPath: filePath,
    fullUrl: req.url,
    note: 'This would typically serve static files or handle file operations'
  });
});

/**
 * Optional parameter example
 * GET /posts/:year/:month?
 */
app.get('/posts/:year/:month?', (req: Request, res: Response) => {
  const { year, month } = req.params;
  
  res.json({
    message: 'Posts by date',
    year: year,
    month: month || 'all months',
    example: 'Try /posts/2024 or /posts/2024/03',
    note: 'Month parameter is optional'
  });
});

// ============================================
// TODO: ADD POST ROUTES HERE
// ============================================
// Your task is to implement the following routes for blog posts:
//
// 1. GET /posts - List all posts (with optional pagination)
//    - Support query parameters: ?page=1&limit=10
//    - Return posts array with pagination metadata
//    - Default limit should be 10, max 50
//
// 2. GET /posts/:id - Get a specific post by ID
//    - Validate the ID parameter (must be a number)
//    - Return 404 if post not found
//    - Include author information from users array
//    - Return both post data and author details
//
// 3. Handle GET /posts with ?userId=X query parameter
//    - Filter posts by userId when userId query param is provided
//    - Validate that the user exists
//    - Return posts by that user + user info
//    - If no userId provided, return all posts (same as #1)
//
// 4. POST /posts - Create a new post
//    - Accept JSON body with: userId, title, content
//    - Validate all required fields are present
//    - Validate that userId corresponds to an existing user
//    - Generate new ID (max existing ID + 1)
//    - Add to posts array and return created post
//
// 5. PUT /posts/:id - Update an existing post
//    - Validate post ID parameter
//    - Check that post exists
//    - Update title and/or content (only if provided)
//    - Return updated post
//
// 6. DELETE /posts/:id - Delete a post
//    - Validate post ID parameter  
//    - Check that post exists
//    - Remove from posts array
//    - Return confirmation message
//
// IMPLEMENTATION TIPS:
// - Use the existing users and posts arrays defined above
// - Follow the same patterns used in the user routes
// - Remember to validate parameters and handle errors
// - Use appropriate HTTP status codes (200, 201, 400, 404)
// - Check the README.md for detailed requirements and examples
//
// START YOUR IMPLEMENTATION BELOW:




// END OF POST ROUTES SECTION

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler for undefined routes
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The endpoint ${req.method} ${req.originalUrl} does not exist`,
    availableRoutes: [
      'GET /',
      'GET /about',
      'GET /users',
      'GET /users/:id',
      'GET /users/:userId/posts/:postId',
      'GET /search?q=term',
      'POST /users',
      'PUT /users/:id',
      'DELETE /users/:id'
    ],
    timestamp: new Date().toISOString()
  });
});

// Global error handler Middleware
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Server Error:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong on the server',
    timestamp: new Date().toISOString()
  });
});

// ============================================
// SERVER STARTUP
// ============================================

app.listen(PORT, () => {
  console.log('🎯 Express Routing Fundamentals Server');
  console.log(`📍 Server running on http://localhost:${PORT}`);
  console.log(`🕒 Started at: ${new Date().toISOString()}`);
  console.log('\n📚 Available Routes:');
  console.log('   GET  /                           - Home page');
  console.log('   GET  /about                      - About information');
  console.log('   GET  /users                      - List all users');
  console.log('   GET  /users/:id                  - Get specific user');
  console.log('   GET  /search?q=term              - Search with query');
});

export default app;