import express from 'express';
import dotenv from 'dotenv';

// Load environment variables from .env file
// This MUST be the first thing you do!
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(express.json());

/**
 * IMPORTANT: Environment Variables
 * 
 * Environment variables are loaded from the .env file
 * Access them using process.env.VARIABLE_NAME
 * 
 * Examples:
 * - process.env.PORT        → 3000
 * - process.env.NODE_ENV    → 'development'
 * - process.env.API_KEY     → 'sk_test_1234567890abcdef'
 * - process.env.DB_HOST     → 'localhost'
 */

/**
 * CONFIGURATION EXAMPLE
 * Organize your env vars into a config object
 */
const config = {
  // Server
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'myapp_dev',
    user: process.env.DB_USER || 'developer',
    password: process.env.DB_PASSWORD || 'password',
  },
  
  // API Keys (sensitive - never hardcode!)
  apiKey: process.env.API_KEY,
  weatherApiKey: process.env.WEATHER_API_KEY,
  githubToken: process.env.GITHUB_TOKEN,
  
  // Feature Flags
  debugMode: process.env.DEBUG_MODE === 'true',
  logLevel: process.env.LOG_LEVEL || 'info',
  enableCache: process.env.ENABLE_CACHE === 'true',
  
  // URLs
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  externalApiUrl: process.env.EXTERNAL_API_URL,
};

// Log configuration (useful during development)
if (config.debugMode) {
  console.log('📋 Configuration loaded:');
  console.log('   Environment:', config.nodeEnv);
  console.log('   Port:', config.port);
  console.log('   Database:', config.database.host);
  console.log('   Debug Mode:', config.debugMode);
  console.log('   Log Level:', config.logLevel);
}

/**
 * ROUTES
 */

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Exercise 25: Environment Variables</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 20px;
        }
        .container {
          max-width: 1100px;
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
        .concept-box {
          background: #e3f2fd;
          border-left: 4px solid #2196F3;
          padding: 15px;
          margin: 15px 0;
          border-radius: 4px;
        }
        .warning-box {
          background: #fff3e0;
          border-left: 4px solid #ff9800;
          padding: 15px;
          margin: 15px 0;
          border-radius: 4px;
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
          margin: 10px 0;
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
        code {
          background: #f0f0f0;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: monospace;
        }
        ul { margin-left: 20px; line-height: 1.8; }
        li { margin: 10px 0; }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        th {
          background: #667eea;
          color: white;
        }
        .status-info {
          background: #c8e6c9;
          border-left: 4px solid #4CAF50;
          padding: 15px;
          margin: 15px 0;
          border-radius: 4px;
        }
        .status-info strong {
          color: #2e7d32;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🔑 Exercise 25: Environment Variables & dotenv</h1>
        
        <div class="status-info">
          <strong>✅ Current Status:</strong> Server is running with environment variables loaded from .env file
        </div>

        <h2>📚 What are Environment Variables?</h2>
        <div class="section">
          <p>Environment variables are key-value pairs that configure how your application behaves. They're separate from your code and allow you to:</p>
          <ul>
            <li>Keep secrets out of version control</li>
            <li>Have different settings for dev/test/production</li>
            <li>Configure without changing code</li>
            <li>Share configuration without exposing secrets</li>
          </ul>
        </div>

        <h2>🛡️ Why Use Environment Variables?</h2>
        <div class="section">
          <table>
            <tr>
              <th>Problem</th>
              <th>Solution</th>
            </tr>
            <tr>
              <td>❌ API keys in code</td>
              <td>✅ Store in .env file</td>
            </tr>
            <tr>
              <td>❌ Same config for all environments</td>
              <td>✅ Different .env per environment</td>
            </tr>
            <tr>
              <td>❌ Passwords visible in git</td>
              <td>✅ Add .env to .gitignore</td>
            </tr>
            <tr>
              <td>❌ Hard to change deployment settings</td>
              <td>✅ Change environment variables</td>
            </tr>
          </table>
        </div>

        <h2>🔧 Setup: Install dotenv</h2>
        <div class="code-block">
npm install dotenv
        </div>

        <h2>📝 Create .env File</h2>
        <div class="section">
          <p>Create a file named <code>.env</code> in your project root:</p>
          <div class="code-block">
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=admin
DB_PASSWORD=secret123

# API Keys
API_KEY=sk_test_abc123
WEATHER_API_KEY=xyz789

# URLs
API_BASE_URL=http://localhost:3000
          </div>
        </div>

        <h2>🚀 Load in Your Server</h2>
        <div class="section">
          <p>At the very top of your server.js file:</p>
          <div class="code-block">
import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

// Now you can access them:
const PORT = process.env.PORT;
const DB_HOST = process.env.DB_HOST;
const API_KEY = process.env.API_KEY;
          </div>
        </div>

        <h2>📊 Current Environment Values</h2>
        <div class="section">
          <p>These values are loaded from your .env file:</p>
          <div class="endpoint">
            <strong>Server Configuration:</strong><br>
            PORT: <code>${process.env.PORT}</code><br>
            NODE_ENV: <code>${process.env.NODE_ENV}</code><br>
          </div>
          <div class="endpoint">
            <strong>Database Configuration:</strong><br>
            DB_HOST: <code>${process.env.DB_HOST}</code><br>
            DB_PORT: <code>${process.env.DB_PORT}</code><br>
            DB_NAME: <code>${process.env.DB_NAME}</code><br>
            DB_USER: <code>${process.env.DB_USER}</code><br>
          </div>
          <div class="endpoint">
            <strong>Feature Flags:</strong><br>
            DEBUG_MODE: <code>${process.env.DEBUG_MODE}</code><br>
            LOG_LEVEL: <code>${process.env.LOG_LEVEL}</code><br>
            ENABLE_CACHE: <code>${process.env.ENABLE_CACHE}</code><br>
          </div>
        </div>

        <h2>📋 Available Endpoints</h2>
        <div class="endpoint">
          <span class="method get">GET</span> <code>/</code> - This page
        </div>
        <div class="endpoint">
          <span class="method get">GET</span> <code>/api/config</code> - View non-sensitive config
        </div>
        <div class="endpoint">
          <span class="method get">GET</span> <code>/api/environment</code> - View current environment
        </div>

        <h2>🔒 Security Best Practices</h2>
        <div class="warning-box">
          <strong>⚠️ CRITICAL: Never commit .env to git!</strong><br>
          Always add .env to your .gitignore file
        </div>

        <div class="section">
          <h3>Do's ✅</h3>
          <ul>
            <li>✅ Store secrets in .env file</li>
            <li>✅ Add .env to .gitignore</li>
            <li>✅ Commit .env.example with template</li>
            <li>✅ Use different keys for each environment</li>
            <li>✅ Load environment variables at startup</li>
            <li>✅ Use meaningful variable names</li>
            <li>✅ Document your variables</li>
          </ul>
        </div>

        <div class="section">
          <h3>Don'ts ❌</h3>
          <ul>
            <li>❌ Commit real API keys to git</li>
            <li>❌ Hardcode passwords in code</li>
            <li>❌ Log sensitive values</li>
            <li>❌ Store .env in public directories</li>
            <li>❌ Share .env files via email</li>
            <li>❌ Use same key for all environments</li>
            <li>❌ Commit .env to version control</li>
          </ul>
        </div>

        <h2>📚 Common Environment Variables</h2>
        <div class="section">
          <table>
            <tr>
              <th>Variable</th>
              <th>Purpose</th>
              <th>Example</th>
            </tr>
            <tr>
              <td>PORT</td>
              <td>Server port</td>
              <td>3000</td>
            </tr>
            <tr>
              <td>NODE_ENV</td>
              <td>Environment (dev/test/prod)</td>
              <td>development</td>
            </tr>
            <tr>
              <td>DATABASE_URL</td>
              <td>Database connection</td>
              <td>postgresql://localhost/db</td>
            </tr>
            <tr>
              <td>API_KEY</td>
              <td>API authentication</td>
              <td>sk_test_abc123</td>
            </tr>
            <tr>
              <td>CORS_ORIGIN</td>
              <td>CORS allowed origin</td>
              <td>http://localhost:3000</td>
            </tr>
            <tr>
              <td>LOG_LEVEL</td>
              <td>Logging verbosity</td>
              <td>debug/info/warn/error</td>
            </tr>
          </table>
        </div>

        <h2>🎯 Pattern: Configuration Object</h2>
        <div class="section">
          <p>Best practice: Create a config object instead of using process.env everywhere:</p>
          <div class="code-block">
// ✅ Good pattern
const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
  },
  apiKey: process.env.API_KEY,
};

// Use it consistently
app.listen(config.port);
          </div>
        </div>

        <h2>🌍 Development vs Production</h2>
        <div class="section">
          <p>Use different .env files for different environments:</p>
          <div class="code-block">
# .env (development)
NODE_ENV=development
DEBUG_MODE=true
API_BASE_URL=http://localhost:3000

# .env.production (production)
NODE_ENV=production
DEBUG_MODE=false
API_BASE_URL=https://api.example.com
          </div>

          <div class="concept-box">
            <strong>Loading different env files:</strong><br>
            <code>dotenv.config({ path: \`.env.\${process.env.NODE_ENV}\` });</code>
          </div>
        </div>

        <h2>📝 .gitignore Setup</h2>
        <div class="section">
          <p>Add this to your .gitignore file:</p>
          <div class="code-block">
# Environment variables (keep secrets out of git!)
.env
.env.local
.env.*.local

# But commit the template:
# .env.example (DO commit this!)
          </div>
        </div>

        <h2>💡 Common Use Cases</h2>
        <div class="section">
          <h3>1. Conditional Features (Feature Flags)</h3>
          <div class="code-block">
if (process.env.ENABLE_CACHE === 'true') {
  // Enable caching
}
          </div>

          <h3>2. Different Behavior by Environment</h3>
          <div class="code-block">
if (process.env.NODE_ENV === 'production') {
  // Use stricter validation
  // Use monitoring/logging
} else {
  // Use debug output
}
          </div>

          <h3>3. Database Connection</h3>
          <div class="code-block">
const dbUrl = \`postgresql://\${process.env.DB_USER}:\${process.env.DB_PASSWORD}@\${process.env.DB_HOST}/\${process.env.DB_NAME}\`;
          </div>

          <h3>4. API Configuration</h3>
          <div class="code-block">
const apiConfig = {
  baseURL: process.env.API_BASE_URL,
  timeout: process.env.API_TIMEOUT || 5000,
  headers: {
    'Authorization': \`Bearer \${process.env.API_KEY}\`,
  },
};
          </div>
        </div>

        <h2>⚠️ Troubleshooting</h2>
        <div class="section">
          <h3>Problem: Environment variables are undefined</h3>
          <div class="code-block">
// ✅ Make sure dotenv.config() is at the TOP
import dotenv from 'dotenv';
dotenv.config();  // Before anything else!

// ❌ Wrong - dotenv after other imports
import express from 'express';
import dotenv from 'dotenv';
          </div>

          <h3>Problem: Changes to .env not taking effect</h3>
          <ul>
            <li>Restart your Node.js server</li>
            <li>Clear Node's module cache</li>
            <li>Make sure .env file is in root directory</li>
          </ul>

          <h3>Problem: Can't find .env file</h3>
          <div class="code-block">
// Specify the path explicitly
dotenv.config({ path: './.env' });

// Or use absolute path
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });
          </div>
        </div>

        <h2>✅ Learning Outcomes</h2>
        <ul>
          <li>✅ Understand purpose of environment variables</li>
          <li>✅ Install and configure dotenv package</li>
          <li>✅ Load environment variables into your app</li>
          <li>✅ Organize configuration in a config object</li>
          <li>✅ Keep secrets out of version control</li>
          <li>✅ Set up .gitignore properly</li>
          <li>✅ Use environment variables in Express routes</li>
          <li>✅ Implement security best practices</li>
        </ul>
      </div>
    </body>
    </html>
  `);
});

/**
 * API ENDPOINTS
 */

// GET /api/config - View non-sensitive configuration
app.get('/api/config', (req, res) => {
  const safeConfig = {
    port: config.port,
    nodeEnv: config.nodeEnv,
    debugMode: config.debugMode,
    logLevel: config.logLevel,
    apiBaseUrl: config.apiBaseUrl,
    corsOrigin: config.corsOrigin,
    database: {
      host: config.database.host,
      port: config.database.port,
      name: config.database.name,
      // NOTE: We never return passwords or sensitive data!
    },
  };

  res.json({
    success: true,
    message: 'Configuration (non-sensitive values only)',
    data: safeConfig,
  });
});

// GET /api/environment - View current environment
app.get('/api/environment', (req, res) => {
  const environment = {
    nodeEnv: process.env.NODE_ENV,
    platform: process.platform,
    nodeVersion: process.version,
    port: process.env.PORT,
    debug: process.env.DEBUG_MODE === 'true',
  };

  res.json({
    success: true,
    message: 'Current environment information',
    data: environment,
  });
});

/**
 * HOME - Testing endpoint
 */
app.get('/test-env', (req, res) => {
  // This route shows how to access individual env vars
  res.json({
    success: true,
    message: 'Testing environment variables',
    data: {
      port: process.env.PORT,
      nodeEnv: process.env.NODE_ENV,
      apiKey: process.env.API_KEY ? '***HIDDEN***' : 'NOT SET',
      dbHost: process.env.DB_HOST,
      debugMode: process.env.DEBUG_MODE,
    },
  });
});

/**
 * START SERVER
 */
app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════╗');
  console.log('║   Exercise 25: Environment Variables    ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`📝 Environment: ${NODE_ENV}`);
  console.log(`🔧 Debug Mode: ${config.debugMode ? 'ON' : 'OFF'}`);
  console.log('');
  console.log('📚 Endpoints:');
  console.log('   GET  /                    → Documentation');
  console.log('   GET  /api/config          → View configuration');
  console.log('   GET  /api/environment     → View environment info');
  console.log('   GET  /test-env            → Test env variables');
  console.log('');
  console.log('📖 Check the .env file to see all available variables');
  console.log('');
});
