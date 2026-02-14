import { Router } from 'express';
import {
	createPost,
	getAllPosts,
	getPostById,
	deletePost,
	addComment,
	getComments,
	getCommentById,
	updateComment,
	deleteComment
} from '../controllers/postController';

const router = Router();

// Post routes
router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.delete('/:id', deletePost);

// Subdocument (Comment) routes
// Pattern: /posts/:id/comments
router.post('/:id/comments', addComment);           // Add comment to post
router.get('/:id/comments', getComments);           // Get all comments for post
router.get('/:id/comments/:commentId', getCommentById);  // Get specific comment
router.put('/:id/comments/:commentId', updateComment);   // Update specific comment
router.delete('/:id/comments/:commentId', deleteComment); // Delete specific comment

export default router;
