import { Router } from 'express';
import {
	createProduct,
	getAllProducts,
	getProductById,
	applyDiscountToProduct,
	checkLowStock,
	restockProduct,
	deleteProduct
} from '../controllers/productController';

const router = Router();

// Basic CRUD routes
router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.delete('/:id', deleteProduct);

// Routes that use instance methods
router.put('/:id/discount', applyDiscountToProduct);  // Apply discount
router.get('/:id/stock-check', checkLowStock);        // Check low stock
router.put('/:id/restock', restockProduct);           // Restock product

export default router;
