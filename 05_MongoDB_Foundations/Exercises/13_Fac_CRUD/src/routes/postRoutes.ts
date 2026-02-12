import { Router } from 'express';
import * as postController from '../controllers/postController';

const router = Router();

// ============================================
// QUERY ROUTES (Must come BEFORE /:id route)
// ============================================

// Get published posts only
router.get('/filter/published', postController.getPublishedPosts);

// Get posts by a specific author
router.get('/author/:author', postController.getPostsByAuthor);

// Get posts by a specific tag
router.get('/tag/:tag', postController.getPostsByTag);

// ============================================
// CRUD ROUTES
// ============================================

// CREATE - Create a new post
router.post('/', postController.createPost);

// READ - Get all posts
router.get('/', postController.getAllPosts);

// READ - Get a single post by ID (Must come AFTER specific routes)
router.get('/:id', postController.getPostById);

// UPDATE - Update a post by ID
router.put('/:id', postController.updatePost);

// DELETE - Delete a post by ID
router.delete('/:id', postController.deletePost);

export default router;
