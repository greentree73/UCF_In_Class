import express from 'express';
import usersRouter from './routes/users.js';
import productsRouter from './routes/products.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

/**
 * MOUNT ROUTERS WITH CONTROLLERS
 * 
 * The routers use controller functions to handle requests.
 * This separates concerns:
 * - routes/: Defines which URLs map to which functions
 * - controllers/: Contains the business logic
 */
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

/**
 * HOME ROUTE
 */
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Express Controllers Introduction</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 20px;
        }
        .container {
          max-width: 1000px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          padding: 40px;
        }
        h1 {
          color: #333;
          border-bottom: 3px solid #667eea;
          padding-bottom: 15px;
          margin-bottom: 30px;
        }
        h2 {
          color: #667eea;
          margin-top: 30px;
          margin-bottom: 15px;
        }
        .section {
          background: #f8f9fa;
          border-left: 4px solid #667eea;
          padding: 20px;
          margin: 20px 0;
          border-radius: 6px;
        }
        .comparison {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin: 20px 0;
        }
        .code-block {
          background: #282c34;
          color: #abb2bf;
          padding: 15px;
          border-radius: 4px;
          overflow-x: auto;
          font-size: 12px;
          line-height: 1.5;
          font-family: monospace;
        }
        .endpoint {
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 15px;
          margin: 10px 0;
        }
        .method {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 3px;
          color: white;
          font-weight: bold;
          font-size: 11px;
          margin-right: 10px;
        }
        .get { background: #28a745; }
        .post { background: #007bff; }
        .put { background: #ffc107; }
        .delete { background: #dc3545; }
        .patch { background: #6f42c1; }
        code {
          background: #f0f0f0;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: monospace;
        }
        .concept-box {
          background: #e7f3ff;
          border-left: 4px solid #2196F3;
          padding: 15px;
          margin: 15px 0;
          border-radius: 4px;
        }
        .concept-title {
          font-weight: bold;
          color: #1976D2;
          margin-bottom: 8px;
        }
        ul { margin-left: 20px; line-height: 1.8; }
        .file-tree {
          background: #f5f5f5;
          padding: 15px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 13px;
          line-height: 1.6;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🎯 Express Controllers Introduction</h1>
        <p>Learn how to use controllers to manage business logic separately from routes.</p>

        <h2>📚 What are Controllers?</h2>
        <div class="section">
          <p>Controllers are functions that handle the logic for your routes. Instead of putting all logic in your routes, you move it to controller functions.</p>
          <div class="concept-box">
            <div class="concept-title">Key Idea: Separation of Concerns</div>
            <p>
              <strong>Routes:</strong> Map HTTP methods to controller functions<br>
              <strong>Controllers:</strong> Contain the business logic
            </p>
          </div>
        </div>

        <h2>🔄 Without Controllers (Messy)</h2>
        <div class="code-block">
// ❌ BAD: Logic mixed with routing
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json({ success: true, data: user });
});

router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Required fields' });
  }
  const user = { id: users.length + 1, name, email };
  users.push(user);
  res.status(201).json({ data: user });
});
        </div>

        <h2>✨ With Controllers (Clean)</h2>
        <div class="code-block">
// ✅ GOOD: Separated concerns
router.get('/:id', getUserById);
router.post('/', createUser);

// Logic is in controllers:
// controllers/usersController.js
export const getUserById = (req, res) => { /* ... */ };
export const createUser = (req, res) => { /* ... */ };
        </div>

        <h2>📁 File Structure</h2>
        <div class="file-tree">
23_Fac_Controllers/
├── server.js           # Main entry point
├── routes/
│   ├── users.js       # User routes (imports user controller)
│   └── products.js    # Product routes (imports product controller)
├── controllers/
│   ├── usersController.js      # User business logic
│   └── productsController.js   # Product business logic
├── package.json
└── README.md
        </div>

        <h2>🎯 Benefits of Controllers</h2>
        <div class="section">
          <ul>
            <li><strong>Clean Routes:</strong> One line per route mapping</li>
            <li><strong>Reusable Logic:</strong> Call controllers from multiple routes</li>
            <li><strong>Easy Testing:</strong> Test controllers independently</li>
            <li><strong>Better Organization:</strong> Logic grouped by resource</li>
            <li><strong>Scalability:</strong> Large apps stay maintainable</li>
            <li><strong>Easier Debugging:</strong> Know exactly where logic is</li>
          </ul>
        </div>

        <h2>📝 Controller Structure</h2>
        <div class="code-block">
// Each controller is a collection of functions
// controllers/usersController.js

export const getAllUsers = (req, res) => {
  // Business logic here
  res.json({ data: users });
};

export const getUserById = (req, res) => {
  // Business logic here
  const user = users.find(u => u.id == req.params.id);
  res.json({ data: user });
};

export const createUser = (req, res) => {
  // Business logic here
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json({ data: newUser });
};
        </div>

        <h2>📝 Routes Using Controllers</h2>
        <div class="code-block">
// routes/users.js - very clean!
import { getAllUsers, getUserById, createUser } from '../controllers/usersController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);

export default router;
        </div>

        <h2>📋 Available Endpoints</h2>

        <h3 style="color: #666; font-size: 1.1em; margin: 20px 0 10px 0;">Users API</h3>
        <div class="endpoint">
          <span class="method get">GET</span> <code>/api/users</code> - Get all users
        </div>
        <div class="endpoint">
          <span class="method get">GET</span> <code>/api/users/:id</code> - Get user by ID
        </div>
        <div class="endpoint">
          <span class="method post">POST</span> <code>/api/users</code> - Create user
        </div>
        <div class="endpoint">
          <span class="method put">PUT</span> <code>/api/users/:id</code> - Update user
        </div>
        <div class="endpoint">
          <span class="method delete">DELETE</span> <code>/api/users/:id</code> - Delete user
        </div>

        <h3 style="color: #666; font-size: 1.1em; margin: 20px 0 10px 0;">Products API</h3>
        <div class="endpoint">
          <span class="method get">GET</span> <code>/api/products</code> - Get all products
        </div>
        <div class="endpoint">
          <span class="method get">GET</span> <code>/api/products/:id</code> - Get product by ID
        </div>
        <div class="endpoint">
          <span class="method post">POST</span> <code>/api/products</code> - Create product
        </div>
        <div class="endpoint">
          <span class="method patch">PATCH</span> <code>/api/products/:id/stock</code> - Update stock
        </div>

        <h2>💡 Controller Patterns</h2>

        <div class="section">
          <h3>Pattern 1: Simple CRUD</h3>
          <div class="code-block">
export const getAll = (req, res) => { /* ... */ };
export const getById = (req, res) => { /* ... */ };
export const create = (req, res) => { /* ... */ };
export const update = (req, res) => { /* ... */ };
export const delete = (req, res) => { /* ... */ };
          </div>
        </div>

        <div class="section">
          <h3>Pattern 2: With Error Handling</h3>
          <div class="code-block">
export const getById = (req, res) => {
  try {
    const { id } = req.params;
    const item = items.find(i => i.id == id);
    
    if (!item) {
      return res.status(404).json({ error: 'Not found' });
    }
    
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
          </div>
        </div>

        <div class="section">
          <h3>Pattern 3: With Validation</h3>
          <div class="code-block">
export const create = (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Validation
    if (!name || !email) {
      return res.status(400).json({ error: 'Required fields' });
    }
    
    // Business logic
    const newItem = { id: items.length + 1, name, email };
    items.push(newItem);
    
    res.status(201).json({ data: newItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
          </div>
        </div>

        <h2>🧪 Testing</h2>
        <div class="section">
          <p>Try these endpoints:</p>
          <div class="code-block" style="margin-top: 10px;">
# Get all users
curl http://localhost:3000/api/users

# Get specific user
curl http://localhost:3000/api/users/1

# Create user
curl -X POST http://localhost:3000/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"David","email":"david@example.com"}'

# Get all products
curl http://localhost:3000/api/products

# Update product stock
curl -X PATCH http://localhost:3000/api/products/1/stock \\
  -H "Content-Type: application/json" \\
  -d '{"inStock":false}'
          </div>
        </div>

        <h2>✅ Key Concepts</h2>
        <ul>
          <li><strong>Controllers:</strong> Export functions that handle requests</li>
          <li><strong>Routes:</strong> Map HTTP methods to controller functions</li>
          <li><strong>Separation:</strong> Logic in controllers, routing in routes</li>
          <li><strong>Error Handling:</strong> Controllers handle try-catch</li>
          <li><strong>Validation:</strong> Controllers validate input</li>
          <li><strong>Named Exports:</strong> Export each function individually</li>
        </ul>

        <h2>📚 Learning Outcomes</h2>
        <ul>
          <li>✅ Understand controller pattern and why it's useful</li>
          <li>✅ Create controller functions with business logic</li>
          <li>✅ Separate concerns: routes vs controllers</li>
          <li>✅ Implement error handling in controllers</li>
          <li>✅ Validate input in controllers</li>
          <li>✅ Use named exports for multiple functions</li>
          <li>✅ Import and use controllers in routes</li>
        </ul>
      </div>
    </body>
    </html>
  `);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    availableEndpoints: {
      users: 'GET /api/users',
      products: 'GET /api/products',
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log('');
  console.log('📚 Architecture:');
  console.log('   routes/ → controllers/ → business logic');
  console.log('');
  console.log('📋 API Endpoints:');
  console.log('   Users: GET/POST /api/users, GET/PUT/DELETE /api/users/:id');
  console.log('   Products: GET/POST /api/products, PATCH /api/products/:id/stock');
  console.log('');
});
