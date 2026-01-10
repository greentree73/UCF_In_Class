import express from 'express';
import charactersRouter from './routes/characters.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

/**
 * MOUNT ROUTERS
 * The characters router is mounted at /api/characters
 */
app.use('/api/characters', charactersRouter);

/**
 * HOME ROUTE
 */
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Express Router Lab</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 20px;
        }
        .container {
          max-width: 700px;
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
        .task {
          background: #f0f4ff;
          border-left: 4px solid #667eea;
          padding: 20px;
          margin: 20px 0;
          border-radius: 6px;
        }
        .task h2 {
          color: #667eea;
          font-size: 1.1em;
          margin-bottom: 10px;
        }
        .endpoint {
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 15px;
          margin: 15px 0;
          font-family: monospace;
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
        .method.get { background: #28a745; }
        code {
          background: #f0f0f0;
          padding: 2px 6px;
          border-radius: 3px;
        }
        .hint {
          background: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 15px;
          margin: 15px 0;
          border-radius: 4px;
          font-size: 14px;
        }
        .hint strong {
          color: #856404;
        }
        .data {
          background: #f8f9fa;
          padding: 10px;
          border-radius: 4px;
          font-size: 12px;
          margin: 10px 0;
          overflow-x: auto;
        }
        ul { margin-left: 20px; line-height: 1.8; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🎬 Express Router Lab Activity</h1>
        
        <div class="task">
          <h2>Your Task</h2>
          <p>Complete the <code>routes/characters.js</code> file by implementing 2 endpoints:</p>
          <ul>
            <li><strong>GET /api/characters</strong> - Return all characters</li>
            <li><strong>GET /api/characters/:id</strong> - Return a specific character by ID</li>
          </ul>
        </div>

        <div class="task">
          <h2>📋 Endpoint 1: Get All Characters</h2>
          <div class="endpoint">
            <span class="method get">GET</span> <code>/api/characters</code>
          </div>
          <p><strong>What to do:</strong></p>
          <ul>
            <li>Create a GET route on the router for the root path <code>'/'</code></li>
            <li>Return all characters from the array</li>
            <li>Response format:
              <div class="data">
{
  "success": true,
  "message": "Characters retrieved",
  "data": [
    { "id": 1, "name": "Luke Skywalker", "universe": "Star Wars" },
    { "id": 2, "name": "Harry Potter", "universe": "Harry Potter" },
    ...
  ]
}
              </div>
            </li>
          </ul>
          <div class="hint">
            <strong>💡 Hint:</strong> Use <code>router.get('/', (req, res) => { ... })</code>
          </div>
        </div>

        <div class="task">
          <h2>🔍 Endpoint 2: Get Character by ID</h2>
          <div class="endpoint">
            <span class="method get">GET</span> <code>/api/characters/:id</code>
          </div>
          <p><strong>What to do:</strong></p>
          <ul>
            <li>Create a GET route with an <code>:id</code> parameter</li>
            <li>Use <code>req.params.id</code> to get the ID from the URL</li>
            <li>Use the <code>find()</code> array method to locate the character</li>
            <li>Return the single character object
              <div class="data">
{
  "success": true,
  "message": "Character retrieved",
  "data": { "id": 1, "name": "Luke Skywalker", "universe": "Star Wars" }
}
              </div>
            </li>
          </ul>
          <div class="hint">
            <strong>💡 Hint:</strong> <code>characters.find(c => c.id == req.params.id)</code>
          </div>
        </div>

        <div class="task">
          <h2>🧪 Testing</h2>
          <p>Once you complete the endpoints, test them:</p>
          <div class="data">
# Test all characters
curl http://localhost:3000/api/characters

# Test specific character
curl http://localhost:3000/api/characters/1
curl http://localhost:3000/api/characters/3
          </div>
        </div>

        <div class="task" style="background: #d4edda; border-left-color: #28a745;">
          <h2>✅ Checklist</h2>
          <ul>
            <li>[ ] Created GET / endpoint in characters router</li>
            <li>[ ] Endpoint returns all characters with success message</li>
            <li>[ ] Created GET /:id endpoint in characters router</li>
            <li>[ ] Endpoint returns single character by ID</li>
            <li>[ ] Tested both endpoints with curl</li>
            <li>[ ] Checked response formats match examples</li>
          </ul>
        </div>
      </div>
    </body>
    </html>
  `);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: {
      getAll: 'GET /api/characters',
      getById: 'GET /api/characters/:id'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log('');
  console.log('📝 Your Task:');
  console.log('   Complete routes/characters.js with 2 endpoints:');
  console.log('   1. GET /api/characters - Get all characters');
  console.log('   2. GET /api/characters/:id - Get character by ID');
  console.log('');
  console.log('💻 Test with:');
  console.log('   curl http://localhost:3000/api/characters');
  console.log('   curl http://localhost:3000/api/characters/1');
  console.log('');
});
