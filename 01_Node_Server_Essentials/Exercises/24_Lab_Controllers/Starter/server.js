import express from 'express';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

/**
 * SAMPLE DATA
 */
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

let products = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Mouse', price: 29.99 },
];

/**
 * TODO: EXTRACT THIS LOGIC INTO controllers/usersController.js
 * 
 * Create a new folder: controllers/
 * Create a new file: controllers/usersController.js
 * 
 * Export these functions from the controller:
 * - getAllUsers
 * - getUserById
 * - createUser
 * - updateUser
 * - deleteUser
 * 
 * Then import them here and use them in the routes below
 */

// GET all users
app.get('/api/users', (req, res) => {
  try {
    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single user
app.get('/api/users/:id', (req, res) => {
  try {
    const { id } = req.params;
    const user = users.find(u => u.id == id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// CREATE user
app.post('/api/users', (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required',
      });
    }

    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name,
      email,
    };
    users.push(newUser);

    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// UPDATE user
app.put('/api/users/:id', (req, res) => {
  try {
    const { id } = req.params;
    const user = users.find(u => u.id == id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  try {
    const { id } = req.params;
    const index = users.findIndex(u => u.id == id);

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const deletedUser = users.splice(index, 1)[0];
    res.json({ success: true, data: deletedUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * TODO: EXTRACT THIS LOGIC INTO controllers/productsController.js
 * 
 * Create a new file: controllers/productsController.js
 * 
 * Export these functions from the controller:
 * - getAllProducts
 * - getProductById
 * - createProduct
 * - updateProduct
 * 
 * Then import them here and use them in the routes below
 */

// GET all products
app.get('/api/products', (req, res) => {
  try {
    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single product
app.get('/api/products/:id', (req, res) => {
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
});

// CREATE product
app.post('/api/products', (req, res) => {
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
});

// UPDATE product
app.put('/api/products/:id', (req, res) => {
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
});

/**
 * HOME ROUTE
 */
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Lab 24: Controllers Activity</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { max-width: 900px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; }
        .task { background: #e3f2fd; border-left: 4px solid #2196F3; padding: 20px; margin: 20px 0; border-radius: 4px; }
        .code { background: #f0f0f0; padding: 10px; border-radius: 4px; font-family: monospace; margin: 10px 0; }
        .endpoint { background: white; border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 4px; }
        .method { display: inline-block; padding: 4px 10px; border-radius: 3px; color: white; font-weight: bold; font-size: 11px; margin-right: 10px; }
        .get { background: #4CAF50; }
        .post { background: #2196F3; }
        .put { background: #ff9800; }
        .delete { background: #f44336; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🎯 Lab 24: Extract Controllers Activity</h1>
        
        <div class="task">
          <h3>Your Challenge:</h3>
          <p><strong>Move the business logic from server.js into separate controller files.</strong></p>
          
          <h4>Steps:</h4>
          <ol>
            <li><strong>Create:</strong> <code>controllers/</code> folder</li>
            <li><strong>Create:</strong> <code>controllers/usersController.js</code> with user logic</li>
            <li><strong>Create:</strong> <code>controllers/productsController.js</code> with product logic</li>
            <li><strong>Import:</strong> Controller functions into server.js</li>
            <li><strong>Replace:</strong> Route handlers with controller function calls</li>
          </ol>
        </div>

        <h3>📋 Current Endpoints (Don't change these):</h3>
        
        <h4>Users:</h4>
        <div class="endpoint">
          <span class="method get">GET</span> /api/users - Get all users
        </div>
        <div class="endpoint">
          <span class="method get">GET</span> /api/users/:id - Get single user
        </div>
        <div class="endpoint">
          <span class="method post">POST</span> /api/users - Create user
        </div>
        <div class="endpoint">
          <span class="method put">PUT</span> /api/users/:id - Update user
        </div>
        <div class="endpoint">
          <span class="method delete">DELETE</span> /api/users/:id - Delete user
        </div>

        <h4>Products:</h4>
        <div class="endpoint">
          <span class="method get">GET</span> /api/products - Get all products
        </div>
        <div class="endpoint">
          <span class="method get">GET</span> /api/products/:id - Get single product
        </div>
        <div class="endpoint">
          <span class="method post">POST</span> /api/products - Create product
        </div>
        <div class="endpoint">
          <span class="method put">PUT</span> /api/products/:id - Update product
        </div>

        <h3>💡 Tips:</h3>
        <ul>
          <li>Copy the route handler logic (the function body) into the controller</li>
          <li>Keep the data arrays in server.js or move them to controllers (your choice)</li>
          <li>Export functions as named exports: <code>export const functionName = (req, res) => { ... };</code></li>
          <li>Import them in server.js: <code>import { func1, func2 } from './controllers/usersController.js';</code></li>
          <li>Replace the route handlers: <code>app.get('/path', functionName);</code></li>
        </ul>

        <h3>✅ Success Criteria:</h3>
        <ul>
          <li>✓ All user logic in controllers/usersController.js</li>
          <li>✓ All product logic in controllers/productsController.js</li>
          <li>✓ server.js imports and uses the controllers</li>
          <li>✓ All 9 endpoints still work correctly</li>
          <li>✓ Error handling preserved</li>
        </ul>

        <h3>🧪 Testing:</h3>
        <div class="code">
# Get users
curl http://localhost:3000/api/users

# Create user
curl -X POST http://localhost:3000/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Charlie","email":"charlie@example.com"}'

# Get products
curl http://localhost:3000/api/products
        </div>
      </div>
    </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Lab 24 Server running at http://localhost:${PORT}`);
  console.log('');
  console.log('📝 Activity: Extract the logic into controllers/usersController.js and controllers/productsController.js');
  console.log('');
});
