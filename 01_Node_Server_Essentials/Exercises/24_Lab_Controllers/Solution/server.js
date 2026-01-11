import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from './controllers/usersController.js';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
} from './controllers/productsController.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

/**
 * USER ROUTES
 * All logic is now in controllers/usersController.js
 */
app.get('/api/users', getAllUsers);
app.get('/api/users/:id', getUserById);
app.post('/api/users', createUser);
app.put('/api/users/:id', updateUser);
app.delete('/api/users/:id', deleteUser);

/**
 * PRODUCT ROUTES
 * All logic is now in controllers/productsController.js
 */
app.get('/api/products', getAllProducts);
app.get('/api/products/:id', getProductById);
app.post('/api/products', createProduct);
app.put('/api/products/:id', updateProduct);

/**
 * HOME ROUTE
 */
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Lab 24: Controllers Solution</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { max-width: 900px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; }
        .success { background: #c8e6c9; border-left: 4px solid #4CAF50; padding: 20px; margin: 20px 0; border-radius: 4px; }
        .code { background: #f0f0f0; padding: 10px; border-radius: 4px; font-family: monospace; margin: 10px 0; overflow-x: auto; }
        h3 { color: #555; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>✅ Lab 24 Solution: Controllers Extracted</h1>
        
        <div class="success">
          <h3>✓ Refactoring Complete!</h3>
          <p>All business logic has been successfully extracted into controller files.</p>
        </div>

        <h3>📁 What Changed:</h3>
        <ul>
          <li><strong>Before:</strong> All 9 route handlers with inline logic in server.js</li>
          <li><strong>After:</strong> Clean routes that call controller functions</li>
        </ul>

        <h3>📂 File Structure:</h3>
        <div class="code">
24_Lab_Controllers/Solution/
├── controllers/
│   ├── usersController.js     ← User logic here
│   └── productsController.js  ← Product logic here
├── server.js                  ← Clean routes only
├── package.json
└── README.md
        </div>

        <h3>🔄 Key Changes in server.js:</h3>
        <div class="code">
// Import controller functions
import { getAllUsers, getUserById, createUser, ... } from './controllers/usersController.js';
import { getAllProducts, getProductById, ... } from './controllers/productsController.js';

// Routes are now one-liners:
app.get('/api/users', getAllUsers);
app.get('/api/users/:id', getUserById);
app.post('/api/users', createUser);
// etc...
        </div>

        <h3>📊 Benefits of This Refactoring:</h3>
        <ul>
          <li>✓ <strong>Cleaner Routes:</strong> Each route is now just one line</li>
          <li>✓ <strong>Organized Code:</strong> Logic grouped by resource (users, products)</li>
          <li>✓ <strong>Reusable Logic:</strong> Controller functions can be used by multiple routes</li>
          <li>✓ <strong>Easier Testing:</strong> Can test controller functions independently</li>
          <li>✓ <strong>Scalable:</strong> Easy to add more endpoints</li>
        </ul>

        <h3>📋 Endpoints (Still Work the Same):</h3>
        <h4>Users:</h4>
        <ul>
          <li>GET /api/users - Get all users</li>
          <li>GET /api/users/:id - Get one user</li>
          <li>POST /api/users - Create user</li>
          <li>PUT /api/users/:id - Update user</li>
          <li>DELETE /api/users/:id - Delete user</li>
        </ul>

        <h4>Products:</h4>
        <ul>
          <li>GET /api/products - Get all products</li>
          <li>GET /api/products/:id - Get one product</li>
          <li>POST /api/products - Create product</li>
          <li>PUT /api/products/:id - Update product</li>
        </ul>

        <h3>💡 What You Learned:</h3>
        <ul>
          <li>✓ How to extract logic into controller files</li>
          <li>✓ How to use named exports (export const)</li>
          <li>✓ How to import controller functions</li>
          <li>✓ How to keep routes clean and simple</li>
          <li>✓ How to maintain error handling in controllers</li>
          <li>✓ The benefits of separation of concerns</li>
        </ul>

        <h3>📚 Next Progression:</h3>
        <p>Now that you understand controllers, the next step is to add routers to organize routes better:</p>
        <div class="code">
// routes/users.js
import express from 'express';
import { getAllUsers, getUserById, ... } from '../controllers/usersController.js';

const router = express.Router();
router.get('/', getAllUsers);
router.get('/:id', getUserById);
// ...
export default router;

// server.js
import usersRouter from './routes/users.js';
app.use('/api/users', usersRouter);
        </div>
      </div>
    </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Lab 24 Solution running at http://localhost:${PORT}`);
  console.log('');
  console.log('📁 Architecture:');
  console.log('   Controllers: Contain business logic');
  console.log('   Routes: Simple mappings to controller functions');
  console.log('');
});
