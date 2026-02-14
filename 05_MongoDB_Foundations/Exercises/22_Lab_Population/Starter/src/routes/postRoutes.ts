import { Router } from 'express';
import {
	seedData,
	getAllPosts,
	getPostById,
	getPostsWithPopulatedAuthors,
	getPostsWithPopulatedCommentAuthors
} from '../controllers/postController';

const router = Router();

router.post('/seed', seedData);
router.get('/', getAllPosts);
router.get('/populated-authors', getPostsWithPopulatedAuthors);

// TODO: Add route for populated comment authors
// router.get('/populated-comment-authors', getPostsWithPopulatedCommentAuthors);

router.get('/:id', getPostById);

export default router;
