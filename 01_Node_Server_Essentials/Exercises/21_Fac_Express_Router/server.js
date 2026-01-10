import express from 'express';
import usersRouter from './routes/users.js';
import productsRouter from './routes/products.js';
import postsRouter from './routes/posts.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

/**
 * MOUNT ROUTERS TO MAIN APP
 * This is where we attach the routers to specific paths
 * 
 * Each router is defined in its own file:
 * - routes/users.js
 * - routes/products.js
 * - routes/posts.js
 */
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/posts', postsRouter);

/**
 * HOME ROUTE
 * Serves documentation and testing interface
 */
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Express Router Introduction</title>
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
          font-size: 1.3em;
        }
        .section {
          background: #f8f9fa;
          border-left: 4px solid #667eea;
          padding: 20px;
          margin: 20px 0;
          border-radius: 6px;
        }
        .endpoint {
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 15px;
          margin: 10px 0;
          font-family: monospace;
        }
        .endpoint.get { border-left: 4px solid #28a745; }
        .endpoint.post { border-left: 4px solid #007bff; }
        .endpoint.put { border-left: 4px solid #ffc107; }
        .endpoint.delete { border-left: 4px solid #dc3545; }
        .method {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 3px;
          color: white;
          font-weight: bold;
          font-size: 12px;
          margin-right: 10px;
        }
        .method.get { background: #28a745; }
        .method.post { background: #007bff; }
        .method.put { background: #ffc107; }
        .method.delete { background: #dc3545; }
        .path { color: #333; font-size: 14px; }
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
        .code-block {
          background: #282c34;
          color: #abb2bf;
          padding: 15px;
          border-radius: 4px;
          overflow-x: auto;
          font-size: 12px;
          line-height: 1.5;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 Express Router Introduction</h1>
        <p>This application demonstrates how to organize routes using Express Router for modular, scalable applications.</p>

        <h2>📚 What is Express Router?</h2>
        <div class="section">
          <p>
            Express Router is a lightweight module that lets you define route handlers for a specific part of your application.
            Instead of defining all routes in one file, you can organize them into separate modules.
          </p>
          <div class="concept-box">
            <div class="concept-title">Key Benefit: Separation of Concerns</div>
            <p>Each router handles a specific resource (users, products, posts), making code more maintainable and scalable.</p>
          </div>
        </div>

        <h2>📋 Available Endpoints</h2>

        <h3 style="color: #666; font-size: 1.1em; margin: 20px 0 10px 0;">Users API (/api/users)</h3>
        <div class="endpoint get">
          <span class="method get">GET</span>
          <span class="path">/api/users</span> - Get all users
        </div>
        <div class="endpoint get">
          <span class="method get">GET</span>
          <span class="path">/api/users/:id</span> - Get user by ID
        </div>
        <div class="endpoint post">
          <span class="method post">POST</span>
          <span class="path">/api/users</span> - Create new user
        </div>
        <div class="endpoint put">
          <span class="method put">PUT</span>
          <span class="path">/api/users/:id</span> - Update user
        </div>
        <div class="endpoint delete">
          <span class="method delete">DELETE</span>
          <span class="path">/api/users/:id</span> - Delete user
        </div>

        <h3 style="color: #666; font-size: 1.1em; margin: 20px 0 10px 0;">Products API (/api/products)</h3>
        <div class="endpoint get">
          <span class="method get">GET</span>
          <span class="path">/api/products</span> - Get all products
        </div>
        <div class="endpoint get">
          <span class="method get">GET</span>
          <span class="path">/api/products/:id</span> - Get product by ID
        </div>
        <div class="endpoint post">
          <span class="method post">POST</span>
          <span class="path">/api/products</span> - Create new product
        </div>

        <h3 style="color: #666; font-size: 1.1em; margin: 20px 0 10px 0;">Posts API (/api/posts)</h3>
        <div class="endpoint get">
          <span class="method get">GET</span>
          <span class="path">/api/posts</span> - Get all posts
        </div>
        <div class="endpoint get">
          <span class="method get">GET</span>
          <span class="path">/api/posts/:id</span> - Get post by ID with comments
        </div>
        <div class="endpoint post">
          <span class="method post">POST</span>
          <span class="path">/api/posts</span> - Create new post
        </div>

        <h2>💡 Core Concepts</h2>

        <div class="section">
          <h3>1. Creating a Router</h3>
          <div class="code-block">
const router = express.Router();
          </div>
          <p style="margin-top: 10px;">Creates a new router instance that acts like a mini app for handling routes.</p>
        </div>

        <div class="section">
          <h3>2. Defining Routes on a Router</h3>
          <div class="code-block">
// Routes are defined on the router, not the app
router.get('/', (req, res) => {
  res.json({ users: [...] });
});

router.post('/', (req, res) => {
  res.json({ message: 'User created' });
});
          </div>
        </div>

        <div class="section">
          <h3>3. Mounting the Router</h3>
          <div class="code-block">
// Attach the router to a path on the main app
app.use('/api/users', router);
          </div>
          <p style="margin-top: 10px;">Now all routes in the router are prefixed with <code>/api/users</code></p>
        </div>

        <div class="section">
          <h3>4. Router-Level Middleware</h3>
          <div class="code-block">
// Middleware that applies only to this router
router.use((req, res, next) => {
  console.log('Logging only posts requests');
  next();
});
          </div>
          <p style="margin-top: 10px;">Middleware defined on a router only applies to that router's routes.</p>
        </div>

        <h2>🎯 Benefits of Express Router</h2>
        <div class="section">
          <ul style="margin-left: 20px; line-height: 1.8;">
            <li><strong>Organization:</strong> Keep related routes in separate files</li>
            <li><strong>Reusability:</strong> Routes can be mounted at different paths</li>
            <li><strong>Scoped Middleware:</strong> Apply middleware to only certain routes</li>
            <li><strong>Scalability:</strong> Easier to manage large applications</li>
            <li><strong>Maintenance:</strong> Changes to one resource don't affect others</li>
          </ul>
        </div>

        <h2>📁 File Structure</h2>
        <div class="code-block" style="margin: 15px 0;">
21_Fac_Express_Router/
├── server.js           # Main entry point (imports routers)
├── routes/
│   ├── users.js       # User routes
│   ├── products.js    # Product routes
│   └── posts.js       # Post routes (with middleware)
└── package.json
        </div>

        <h2>🧪 Testing</h2>
        <div class="section">
          <p>Try these commands in your terminal:</p>
          <div class="code-block" style="margin-top: 10px;">
# Get all users
curl http://localhost:3000/api/users

# Get a specific user
curl http://localhost:3000/api/users/1

# Get all products
curl http://localhost:3000/api/products

# Get all posts (with logging)
curl http://localhost:3000/api/posts
          </div>
        </div>

        <h2>✅ Learning Outcomes</h2>
        <ul style="margin-left: 20px; line-height: 1.8;">
          <li>Understand when and why to use Express Router</li>
          <li>Create new router instances</li>
          <li>Define routes on a router</li>
          <li>Mount routers to specific paths</li>
          <li>Apply middleware at router level</li>
          <li>Organize routes for scalable applications</li>
          <li>Import and require router modules</li>
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
    path: req.path,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log('');
  console.log('📚 Available Routers:');
  console.log('   /api/users     - User management (routes/users.js)');
  console.log('   /api/products  - Product catalog (routes/products.js)');
  console.log('   /api/posts     - Blog posts (routes/posts.js)');
  console.log('');
});

/**
 * HOME ROUTE
 * Serves documentation and testing interface
 */
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Express Router Introduction</title>
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
          font-size: 1.3em;
        }
        .section {
          background: #f8f9fa;
          border-left: 4px solid #667eea;
          padding: 20px;
          margin: 20px 0;
          border-radius: 6px;
        }
        .endpoint {
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 15px;
          margin: 10px 0;
          font-family: monospace;
        }
        .endpoint.get { border-left: 4px solid #28a745; }
        .endpoint.post { border-left: 4px solid #007bff; }
        .endpoint.put { border-left: 4px solid #ffc107; }
        .endpoint.delete { border-left: 4px solid #dc3545; }
        .method {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 3px;
          color: white;
          font-weight: bold;
          font-size: 12px;
          margin-right: 10px;
        }
        .method.get { background: #28a745; }
        .method.post { background: #007bff; }
        .method.put { background: #ffc107; }
        .method.delete { background: #dc3545; }
        .path { color: #333; font-size: 14px; }
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
        .code-block {
          background: #282c34;
          color: #abb2bf;
          padding: 15px;
          border-radius: 4px;
          overflow-x: auto;
          font-size: 12px;
          line-height: 1.5;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 Express Router Introduction</h1>
        <p>This application demonstrates how to organize routes using Express Router for modular, scalable applications.</p>

        <h2>📚 What is Express Router?</h2>
        <div class="section">
          <p>
            Express Router is a lightweight module that lets you define route handlers for a specific part of your application.
            Instead of defining all routes in one file, you can organize them into separate modules.
          </p>
          <div class="concept-box">
            <div class="concept-title">Key Benefit: Separation of Concerns</div>
            <p>Each router handles a specific resource (users, products, posts), making code more maintainable and scalable.</p>
          </div>
        </div>

        <h2>📋 Available Endpoints</h2>

        <h3 style="color: #666; font-size: 1.1em; margin: 20px 0 10px 0;">Users API (/api/users)</h3>
        <div class="endpoint get">
          <span class="method get">GET</span>
          <span class="path">/api/users</span> - Get all users
        </div>
        <div class="endpoint get">
          <span class="method get">GET</span>
          <span class="path">/api/users/:id</span> - Get user by ID
        </div>
        <div class="endpoint post">
          <span class="method post">POST</span>
          <span class="path">/api/users</span> - Create new user
        </div>
        <div class="endpoint put">
          <span class="method put">PUT</span>
          <span class="path">/api/users/:id</span> - Update user
        </div>
        <div class="endpoint delete">
          <span class="method delete">DELETE</span>
          <span class="path">/api/users/:id</span> - Delete user
        </div>

        <h3 style="color: #666; font-size: 1.1em; margin: 20px 0 10px 0;">Products API (/api/products)</h3>
        <div class="endpoint get">
          <span class="method get">GET</span>
          <span class="path">/api/products</span> - Get all products
        </div>
        <div class="endpoint get">
          <span class="method get">GET</span>
          <span class="path">/api/products/:id</span> - Get product by ID
        </div>
        <div class="endpoint post">
          <span class="method post">POST</span>
          <span class="path">/api/products</span> - Create new product
        </div>

        <h3 style="color: #666; font-size: 1.1em; margin: 20px 0 10px 0;">Posts API (/api/posts)</h3>
        <div class="endpoint get">
          <span class="method get">GET</span>
          <span class="path">/api/posts</span> - Get all posts
        </div>
        <div class="endpoint get">
          <span class="method get">GET</span>
          <span class="path">/api/posts/:id</span> - Get post by ID with comments
        </div>
        <div class="endpoint post">
          <span class="method post">POST</span>
          <span class="path">/api/posts</span> - Create new post
        </div>

        <h2>💡 Core Concepts</h2>

        <div class="section">
          <h3>1. Creating a Router</h3>
          <div class="code-block">
const usersRouter = express.Router();
          </div>
          <p style="margin-top: 10px;">Creates a new router instance that acts like a mini app for handling routes.</p>
        </div>

        <div class="section">
          <h3>2. Defining Routes on a Router</h3>
          <div class="code-block">
// Routes are defined on the router, not the app
usersRouter.get('/', (req, res) => {
  res.json({ users: [...] });
});

usersRouter.post('/', (req, res) => {
  res.json({ message: 'User created' });
});
          </div>
        </div>

        <div class="section">
          <h3>3. Mounting the Router</h3>
          <div class="code-block">
// Attach the router to a path on the main app
app.use('/api/users', usersRouter);
          </div>
          <p style="margin-top: 10px;">Now all routes in <code>usersRouter</code> are prefixed with <code>/api/users</code></p>
        </div>

        <div class="section">
          <h3>4. Router-Level Middleware</h3>
          <div class="code-block">
// Middleware that applies only to this router
postsRouter.use((req, res, next) => {
  console.log('Logging only posts requests');
  next();
});
          </div>
          <p style="margin-top: 10px;">Middleware defined on a router only applies to that router's routes.</p>
        </div>

        <h2>🎯 Benefits of Express Router</h2>
        <div class="section">
          <ul style="margin-left: 20px; line-height: 1.8;">
            <li><strong>Organization:</strong> Keep related routes in separate files</li>
            <li><strong>Reusability:</strong> Routes can be mounted at different paths</li>
            <li><strong>Scoped Middleware:</strong> Apply middleware to only certain routes</li>
            <li><strong>Scalability:</strong> Easier to manage large applications</li>
            <li><strong>Maintenance:</strong> Changes to one resource don't affect others</li>
          </ul>
        </div>

        <h2>📁 Recommended File Structure</h2>
        <div class="code-block" style="margin: 15px 0;">
project/
├── server.js           # Main entry point
├── routes/
│   ├── users.js       # User routes
│   ├── products.js    # Product routes
│   └── posts.js       # Post routes
└── package.json
        </div>

        <h2>🧪 Testing</h2>
        <div class="section">
          <p>Try these commands in your terminal:</p>
          <div class="code-block" style="margin-top: 10px;">
# Get all users
curl http://localhost:3000/api/users

# Get a specific user
curl http://localhost:3000/api/users/1

# Get all products
curl http://localhost:3000/api/products

# Get all posts (with logging)
curl http://localhost:3000/api/posts
          </div>
        </div>

        <h2>✅ Learning Outcomes</h2>
        <ul style="margin-left: 20px; line-height: 1.8;">
          <li>Understand when and why to use Express Router</li>
          <li>Create new router instances</li>
          <li>Define routes on a router</li>
          <li>Mount routers to specific paths</li>
          <li>Apply middleware at router level</li>
          <li>Organize routes for scalable applications</li>
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
    path: req.path,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log('');
  console.log('📚 Available Routers:');
  console.log('   /api/users     - User management');
  console.log('   /api/products  - Product catalog');
  console.log('   /api/posts     - Blog posts');
  console.log('');
});
