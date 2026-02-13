import { Router } from 'express';
import * as productController from '../controllers/productController';

const router = Router();

// ============================================
// QUERY ROUTES (Must come BEFORE /:id route)
// ============================================

// Get in-stock products
router.get('/filter/instock', productController.getInStockProducts);

// Get products by category
router.get('/category/:category', productController.getProductsByCategory);

// TODO: Add route for updating product by category
// This route should:
// - Use PUT method
// - Match the pattern /category/:category/update
// - Call productController.updateProductByCategory
router.put('/category/:category/update', productController.updateProductByCategory);

// ============================================
// CRUD ROUTES
// ============================================

// CREATE - Create a new product
router.post('/', productController.createProduct);

// READ - Get all products
router.get('/', productController.getAllProducts);

// READ - Get a single product by ID (Must come AFTER specific routes)
router.get('/:id', productController.getProductById);

// UPDATE - Update a product by ID
router.put('/:id', productController.updateProduct);

// DELETE - Delete a product by ID
router.delete('/:id', productController.deleteProduct);

export default router;
