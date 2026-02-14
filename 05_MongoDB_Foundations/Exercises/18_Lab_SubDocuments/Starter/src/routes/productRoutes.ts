import { Router } from 'express';
import {
	createProduct,
	getAllProducts,
	getProductById,
	getReviews,
	addReview,
	deleteProduct
} from '../controllers/productController';

const router = Router();

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/:id/reviews', getReviews);

// TODO: Add the missing route for creating a review subdocument
// router.post('/:id/reviews', addReview);

router.delete('/:id', deleteProduct);

export default router;
