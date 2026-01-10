import express from 'express';
import charactersRouter from './routes/characters.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/characters', charactersRouter);

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Express Router Lab - Solution</title>
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
          border-bottom: 3px solid #28a745;
          padding-bottom: 15px;
          margin-bottom: 30px;
        }
        .section {
          background: #d4edda;
          border-left: 4px solid #28a745;
          padding: 20px;
          margin: 20px 0;
          border-radius: 6px;
        }
        .endpoint {
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 15px;
          margin: 15px 0;
          font-family: monospace;
          border-left: 4px solid #28a745;
        }
        .method {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 3px;
          color: white;
          background: #28a745;
          font-weight: bold;
          font-size: 11px;
          margin-right: 10px;
        }
        code {
          background: #f0f0f0;
          padding: 2px 6px;
          border-radius: 3px;
        }
        .code-block {
          background: #f0f0f0;
          padding: 15px;
          border-radius: 4px;
          overflow-x: auto;
          font-family: monospace;
          font-size: 12px;
          margin: 10px 0;
        }
        ul { margin-left: 20px; line-height: 1.8; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>✅ Express Router Lab - Solution</h1>
        
        <div class="section">
          <h2>Endpoints Implemented</h2>
          <p>Both endpoints have been successfully implemented in routes/characters.js</p>
        </div>

        <div class="section">
          <h2>Endpoint 1: Get All Characters</h2>
          <div class="endpoint">
            <span class="method">GET</span> <code>/api/characters</code>
          </div>
          <div class="code-block">
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Characters retrieved',
    data: characters
  });
});
          </div>
        </div>

        <div class="section">
          <h2>Endpoint 2: Get Character by ID</h2>
          <div class="endpoint">
            <span class="method">GET</span> <code>/api/characters/:id</code>
          </div>
          <div class="code-block">
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const character = characters.find(c => c.id == id);
  
  res.json({
    success: true,
    message: 'Character retrieved',
    data: character
  });
});
          </div>
        </div>

        <div class="section">
          <h2>Test the Endpoints</h2>
          <div class="code-block">
# Get all characters
curl http://localhost:3000/api/characters

# Get specific characters
curl http://localhost:3000/api/characters/1
curl http://localhost:3000/api/characters/3
curl http://localhost:3000/api/characters/5
          </div>
        </div>

        <div class="section">
          <h2>Key Concepts Used</h2>
          <ul>
            <li><strong>router.get()</strong> - Define GET routes on the router</li>
            <li><strong>req.params.id</strong> - Access route parameter from URL</li>
            <li><strong>Array.find()</strong> - Search for item in array</li>
            <li><strong>res.json()</strong> - Send JSON response</li>
            <li><strong>Consistent format</strong> - All responses have success, message, and data</li>
          </ul>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log('');
  console.log('📚 Solution implemented:');
  console.log('   GET /api/characters - Get all characters');
  console.log('   GET /api/characters/:id - Get character by ID');
  console.log('');
});
