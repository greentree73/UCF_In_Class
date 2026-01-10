/**
 * Products Controller
 * Contains all business logic for product routes
 */

let products = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Mouse', price: 29.99 },
];

/**
 * GET all products
 */
export const getAllProducts = (req, res) => {
  try {
    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET single product by ID
 */
export const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find(p => p.id == id);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * CREATE new product
 */
export const createProduct = (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Name and price are required',
      });
    }

    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      name,
      price,
    };
    products.push(newProduct);

    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * UPDATE product
 */
export const updateProduct = (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find(p => p.id == id);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    if (req.body.name) product.name = req.body.name;
    if (req.body.price !== undefined) product.price = req.body.price;

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
