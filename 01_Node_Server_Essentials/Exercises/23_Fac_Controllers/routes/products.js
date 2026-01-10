import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductStock,
} from '../controllers/productsController.js';

const router = express.Router();

/**
 * PRODUCTS ROUTES
 * 
 * Same pattern as users routes.
 * Each route is just one line that calls a controller function.
 */

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.patch('/:id/stock', updateProductStock);

export default router;
