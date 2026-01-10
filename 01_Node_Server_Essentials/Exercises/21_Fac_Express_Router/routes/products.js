import express from 'express';

const router = express.Router();

/**
 * PRODUCTS ROUTER
 * Handles all routes starting with /api/products
 */

// GET /api/products - List all products
router.get('/', (req, res) => {
  const products = [
    { id: 1, name: 'Laptop', price: 999.99 },
    { id: 2, name: 'Mouse', price: 29.99 },
    { id: 3, name: 'Keyboard', price: 79.99 },
  ];
  res.json({
    success: true,
    message: 'Products retrieved',
    data: products,
  });
});

// GET /api/products/:id - Get specific product
router.get('/:id', (req, res) => {
  const productId = req.params.id;
  res.json({
    success: true,
    message: `Retrieved product ${productId}`,
    data: { id: productId, name: 'Product Name', price: 99.99 },
  });
});

// POST /api/products - Create new product
router.post('/', (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Product created',
    data: { id: 4, name: 'New Product', price: 49.99 },
  });
});

export default router;
