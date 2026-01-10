import express from 'express';

const router = express.Router();

/**
 * POSTS ROUTER
 * Handles all routes starting with /api/posts
 * Demonstrates router with middleware
 */

// Router-level middleware - applies to all routes in this router
router.use((req, res, next) => {
  console.log(`[POSTS] ${req.method} request to ${req.originalUrl}`);
  next();
});

// GET /api/posts - List all posts
router.get('/', (req, res) => {
  const posts = [
    { id: 1, title: 'First Post', author: 'Alice', views: 150 },
    { id: 2, title: 'Second Post', author: 'Bob', views: 200 },
  ];
  res.json({
    success: true,
    message: 'Posts retrieved',
    data: posts,
  });
});

// GET /api/posts/:id - Get specific post with comments
router.get('/:id', (req, res) => {
  const postId = req.params.id;
  res.json({
    success: true,
    message: `Retrieved post ${postId}`,
    data: {
      id: postId,
      title: 'Post Title',
      body: 'Post content here...',
      comments: [
        { id: 1, text: 'Great post!' },
        { id: 2, text: 'Thanks for sharing' },
      ],
    },
  });
});

// POST /api/posts - Create new post
router.post('/', (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Post created',
    data: { id: 3, title: 'New Post', author: 'Charlie' },
  });
});

export default router;
