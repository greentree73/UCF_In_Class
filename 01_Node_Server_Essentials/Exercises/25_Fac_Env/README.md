# Exercise 25: Environment Variables & dotenv

## Overview

Learn how to use environment variables and the **dotenv** package to manage configuration, keep secrets secure, and handle different environments (development, testing, production).

## What You'll Learn

- ✅ Understand what environment variables are and why they're important
- ✅ Install and configure the dotenv package
- ✅ Create and manage .env files
- ✅ Access environment variables in Express
- ✅ Keep API keys and secrets secure
- ✅ Configure applications for different environments
- ✅ Follow security best practices

## The Problem: Hardcoded Configuration

### ❌ BAD: Secrets in Code
```javascript
const express = require('express');
const app = express();

// ❌ NEVER do this!
const API_KEY = 'sk_live_abc123xyz789';
const DB_PASSWORD = 'my_secret_password';
const PORT = 3000;

app.get('/api/data', (req, res) => {
  // Use the hardcoded key
});

app.listen(PORT);
```

**Problems:**
- API keys visible in code
- Keys committed to version control
- Everyone sees your secrets
- Can't easily change config for different environments
- Security risk if repository is leaked

## The Solution: Environment Variables

### ✅ GOOD: Using .env File
```javascript
import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

const API_KEY = process.env.API_KEY;
const DB_PASSWORD = process.env.DB_PASSWORD;
const PORT = process.env.PORT || 3000;

// Use these values throughout your app
```

**.env file:**
```
API_KEY=sk_live_abc123xyz789
DB_PASSWORD=my_secret_password
PORT=3000
```

**Benefits:**
- ✅ Secrets not in code
- ✅ Secrets not in version control
- ✅ Easy to change config per environment
- ✅ Can have different values in dev vs production
- ✅ Clear what configuration is needed

## What are Environment Variables?

Environment variables are key-value pairs that configure your application's behavior, separate from your code.

### Access in Node.js
```javascript
// Before dotenv
const PORT = 3000;

// With dotenv
const PORT = process.env.PORT;

// With default fallback
const PORT = process.env.PORT || 3000;
```

## Setup: Installing dotenv

### Step 1: Install Package
```bash
npm install dotenv
```

### Step 2: Create .env File
Create a file named `.env` in your project root:

```
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp_dev
DB_USER=developer
DB_PASSWORD=dev_password

# API Keys (secret - never commit!)
API_KEY=sk_test_1234567890
WEATHER_API_KEY=demo_key_xyz
GITHUB_TOKEN=ghp_abc123

# URLs
API_BASE_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000

# Feature Flags
DEBUG_MODE=true
ENABLE_CACHE=false
LOG_LEVEL=debug
```

### Step 3: Load in Server
At the very top of your `server.js`:

```javascript
import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

// Now you can use them
const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;
```

### Step 4: Add to .gitignore
Prevent .env from being committed:

```
# .gitignore
.env
.env.local
.env.*.local
```

But DO commit `.env.example` as a template.

## Common Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment type | `development`, `production` |
| `API_KEY` | API authentication | `sk_test_abc123` |
| `DATABASE_URL` | Database connection | `postgresql://localhost/db` |
| `DB_HOST` | Database host | `localhost` |
| `DB_USER` | Database username | `admin` |
| `DB_PASSWORD` | Database password | `secret123` |
| `CORS_ORIGIN` | CORS allowed origin | `http://localhost:3000` |
| `LOG_LEVEL` | Logging verbosity | `debug`, `info`, `warn`, `error` |
| `DEBUG_MODE` | Enable debug output | `true`, `false` |

## Best Practice: Configuration Object

Instead of using `process.env` everywhere, create a config object:

```javascript
import dotenv from 'dotenv';
dotenv.config();

// Configuration object
const config = {
  // Server
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'myapp',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  
  // API Configuration
  api: {
    key: process.env.API_KEY,
    baseUrl: process.env.API_BASE_URL,
  },
  
  // Feature Flags
  debug: process.env.DEBUG_MODE === 'true',
  cacheEnabled: process.env.ENABLE_CACHE === 'true',
  logLevel: process.env.LOG_LEVEL || 'info',
};

export default config;
```

Then use it consistently:

```javascript
app.listen(config.port, () => {
  console.log(`Server on port ${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`Debug: ${config.debug}`);
});
```

## Development vs Production

### Development Environment
`.env`:
```
NODE_ENV=development
PORT=3000
DEBUG_MODE=true
LOG_LEVEL=debug
DB_HOST=localhost
API_BASE_URL=http://localhost:3000
```

### Production Environment
`.env.production`:
```
NODE_ENV=production
PORT=8080
DEBUG_MODE=false
LOG_LEVEL=error
DB_HOST=prod-db.example.com
API_BASE_URL=https://api.example.com
```

### Loading Specific File
```javascript
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });
```

## Security Best Practices

### ✅ DO:
- ✅ Store secrets in .env file
- ✅ Add .env to .gitignore
- ✅ Commit .env.example as template
- ✅ Use different keys per environment
- ✅ Load variables at startup
- ✅ Use meaningful variable names
- ✅ Document what variables are needed
- ✅ Use type checking/validation
- ✅ Rotate secrets regularly
- ✅ Limit secret access permissions

### ❌ DON'T:
- ❌ Commit .env to version control
- ❌ Hardcode passwords in code
- ❌ Log sensitive values
- ❌ Send secrets in URLs
- ❌ Store secrets in comments
- ❌ Share .env files via email
- ❌ Use same key for all environments
- ❌ Commit real API keys to git
- ❌ Store secrets in client-side code
- ❌ Make .env publicly accessible

## Practical Examples

### Example 1: Conditional Features
```javascript
if (process.env.ENABLE_CACHE === 'true') {
  // Use caching middleware
  app.use(cacheMiddleware);
}

if (process.env.DEBUG_MODE === 'true') {
  // Use detailed logging
  app.use(detailedLogger);
}
```

### Example 2: Database Connection
```javascript
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'myapp',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const connection = await db.connect(dbConfig);
```

### Example 3: API Configuration
```javascript
const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: process.env.API_TIMEOUT || 5000,
  headers: {
    'Authorization': `Bearer ${process.env.API_KEY}`,
    'User-Agent': 'MyApp/1.0',
  },
});
```

### Example 4: Email Configuration
```javascript
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});
```

### Example 5: CORS Configuration
```javascript
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
```

## Testing Endpoints

### View Configuration
```bash
curl http://localhost:3000/api/config
```

### View Environment Info
```bash
curl http://localhost:3000/api/environment
```

### Test Environment Variables
```bash
curl http://localhost:3000/test-env
```

## Troubleshooting

### Problem: Environment variables are undefined
**Solution:** Make sure `dotenv.config()` is at the TOP of your file, before any other imports.

```javascript
// ✅ Correct
import dotenv from 'dotenv';
dotenv.config();  // FIRST
import express from 'express';

// ❌ Wrong
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();  // Too late!
```

### Problem: Changes to .env not taking effect
**Solution:** 
- Restart your Node.js server
- Stop any nodemon watchers
- Make sure the .env file is in the root directory

### Problem: Can't find .env file
**Solution:** Specify the path explicitly:

```javascript
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });
```

### Problem: Secrets showing in logs
**Solution:** Never log sensitive values:

```javascript
// ❌ Wrong
console.log('API Key:', process.env.API_KEY);

// ✅ Right
console.log('API Key: ***HIDDEN***');
console.log('Using API key:', process.env.API_KEY ? '(configured)' : '(not set)');
```

## .env vs .env.example

### .env (Keep Private)
- Contains REAL secrets
- Never commit to git
- Local development only
- Add to .gitignore

### .env.example (Share)
- Template showing required variables
- Commit to git
- Help developers set up their environment
- Use fake/dummy values

Example:
```
# .env.example
PORT=3000
NODE_ENV=development
API_KEY=sk_test_your_key_here
DB_PASSWORD=your_password_here
```

## File Structure

```
25_Fac_Env/
├── .env                 # Local config (don't commit)
├── .env.example        # Template (commit this)
├── .gitignore          # Exclude .env
├── server.js           # Express app
├── package.json        # Dependencies
└── README.md           # Documentation
```

## Key Takeaways

1. **Never hardcode secrets** - Use environment variables instead
2. **Load early** - Call `dotenv.config()` at the very top
3. **Add to .gitignore** - Prevent .env from being committed
4. **Use .env.example** - Help others configure their environment
5. **Organize in config object** - Use a consistent config pattern
6. **Different values per environment** - dev, test, production
7. **Never log secrets** - Be careful what you output
8. **Validate required variables** - Check that needed vars are set
9. **Use defaults wisely** - Sensible fallbacks for non-critical vars
10. **Document your variables** - Add comments explaining each var

## Learning Outcomes

After completing this exercise, you should:

- ✅ Understand why environment variables are critical
- ✅ Know how to install and use dotenv
- ✅ Create and manage .env files
- ✅ Access environment variables in your code
- ✅ Organize configuration in a reusable config object
- ✅ Keep secrets out of version control
- ✅ Configure applications for different environments
- ✅ Follow security best practices
- ✅ Troubleshoot environment variable issues

## Next Steps

Now that you understand environment variables:

1. **Add validation** - Check that required env vars exist
2. **Use schema validation** - Validate variable types
3. **Add more environments** - .env.test, .env.staging
4. **Implement secrets management** - Use AWS Secrets Manager, HashiCorp Vault
5. **Monitor secrets access** - Track who accesses what
6. **Rotate secrets regularly** - Change keys periodically
7. **Add environment-specific logic** - Different behavior per environment

## Resources

- [dotenv npm package](https://www.npmjs.com/package/dotenv)
- [Environment Variables Best Practices](https://12factor.net/config)
- [Node.js process.env documentation](https://nodejs.org/en/knowledge/file-system/how-to-read-and-write-files-in-nodejs/)
- [OWASP: Secrets Management](https://owasp.org/www-community/attacks/Secret_management)

---

**Remember:** Environment variables are how you keep your application secure and configurable for any environment!
