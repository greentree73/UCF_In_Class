import { Router } from 'express';
import {
	createPost,
	getAllPosts,
	getPostById,
	viewPost,
	getPostExcerpt,
	publishPost,
	addTagToPost,
	deletePost
} from '../controllers/postController';

const router = Router();

// Basic CRUD routes
router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.delete('/:id', deletePost);

// Routes that use instance methods
router.post('/:id/view', viewPost);           // Increment views
router.get('/:id/excerpt', getPostExcerpt);   // Get preview
router.put('/:id/publish', publishPost);      // Mark as published
router.post('/:id/tags', addTagToPost);       // Add a tag

export default router;
