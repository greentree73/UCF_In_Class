import { Router } from 'express';
import {
	createProduct,
	getAllProducts,
	getProductById,
	deleteProduct
} from '../controllers/productController';

const router = Router();

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.delete('/:id', deleteProduct);

export default router;
