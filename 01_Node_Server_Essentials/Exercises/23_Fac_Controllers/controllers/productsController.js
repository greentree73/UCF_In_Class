/**
 * PRODUCTS CONTROLLER
 * 
 * Another example of a controller managing business logic
 * for a different resource (products instead of users).
 */

// Sample data
const products = [
  { id: 1, name: 'Laptop', price: 999.99, inStock: true },
  { id: 2, name: 'Mouse', price: 29.99, inStock: true },
  { id: 3, name: 'Keyboard', price: 79.99, inStock: false },
  { id: 4, name: 'Monitor', price: 299.99, inStock: true },
];

/**
 * GET ALL PRODUCTS
 */
export const getAllProducts = (req, res) => {
  try {
    const { inStock } = req.query;

    // Filter by stock status if provided
    let filtered = products;
    if (inStock !== undefined) {
      const inStockValue = inStock === 'true';
      filtered = products.filter(p => p.inStock === inStockValue);
    }

    res.json({
      success: true,
      message: 'Products retrieved',
      count: filtered.length,
      data: filtered,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve products',
      message: error.message,
    });
  }
};

/**
 * GET PRODUCT BY ID
 */
export const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find(p => p.id == id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    res.json({
      success: true,
      message: 'Product retrieved',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve product',
      message: error.message,
    });
  }
};

/**
 * CREATE PRODUCT
 */
export const createProduct = (req, res) => {
  try {
    const { name, price, inStock = true } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        error: 'Name and price are required',
      });
    }

    const newProduct = {
      id: products.length + 1,
      name,
      price,
      inStock,
    };

    products.push(newProduct);

    res.status(201).json({
      success: true,
      message: 'Product created',
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create product',
      message: error.message,
    });
  }
};

/**
 * UPDATE PRODUCT STOCK
 * 
 * Specialized controller function that only updates stock status
 */
export const updateProductStock = (req, res) => {
  try {
    const { id } = req.params;
    const { inStock } = req.body;

    const product = products.find(p => p.id == id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    product.inStock = inStock;

    res.json({
      success: true,
      message: 'Product stock updated',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update product',
      message: error.message,
    });
  }
};
