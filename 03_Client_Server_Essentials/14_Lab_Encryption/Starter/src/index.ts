import express from 'express'
import dotenv from 'dotenv'
import { sequelize } from './models'
import routes from './routes'

// Load environment variables from .env file
dotenv.config()

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 4000

// Middleware to parse JSON request bodies
app.use(express.json())

// Mount all routes under /api
app.use('/api', routes)

/**
 * Start the server
 * 
 * This function:
 * 1. Connects to the database
 * 2. Syncs database models (creates tables if they don't exist)
 * 3. Starts the Express server
 */
async function start() {
  try {
    // Test database connection
    await sequelize.authenticate()
    console.log('✓ Database connection established successfully.')
    
    // Sync database (create tables)
    // force: true drops existing tables and recreates them
    // Change to { force: false } in production to preserve data
    await sequelize.sync({ force: false })
    console.log('✓ Database synchronized.')
    
    // Start listening for requests
    app.listen(port, () => {
      console.log(`\n🚀 Server running on http://localhost:${port}`)
      console.log(`\n🔐 Password Encryption Demo API Routes:`)
      console.log(`\n   Authentication:`)
      console.log(`   POST   /api/users              - Register new user (password auto-hashed)`)
      console.log(`   POST   /api/login              - Login (password comparison)`)
      
      console.log(`\n   User Management:`)
      console.log(`   GET    /api/users              - List all users (passwords excluded)`)
      console.log(`   GET    /api/users/:id          - Get user by ID`)
      console.log(`   PUT    /api/users/:id          - Update user info`)
      console.log(`   PUT    /api/users/:id/password - Change user password`)
      console.log(`   DELETE /api/users/:id          - Delete user`)
      
      console.log(`\n📋 Try these example requests:`)
      
      console.log(`\n   1️⃣  Register a new user:`)
      console.log(`   curl -X POST http://localhost:${port}/api/users \\`)
      console.log(`     -H "Content-Type: application/json" \\`)
      console.log(`     -d '{"username":"alice","email":"alice@example.com","password":"SecurePass123"}'`)
      
      console.log(`\n   2️⃣  Login with the user:`)
      console.log(`   curl -X POST http://localhost:${port}/api/login \\`)
      console.log(`     -H "Content-Type: application/json" \\`)
      console.log(`     -d '{"email":"alice@example.com","password":"SecurePass123"}'`)
      
      console.log(`\n   3️⃣  Try logging in with wrong password (should fail):`)
      console.log(`   curl -X POST http://localhost:${port}/api/login \\`)
      console.log(`     -H "Content-Type: application/json" \\`)
      console.log(`     -d '{"email":"alice@example.com","password":"WrongPassword"}'`)
      
      console.log(`\n   4️⃣  Get all users (notice passwords are not returned):`)
      console.log(`   curl http://localhost:${port}/api/users`)
      
      console.log(`\n   5️⃣  Change password (replace :id with user ID from step 1):`)
      console.log(`   curl -X PUT http://localhost:${port}/api/users/1/password \\`)
      console.log(`     -H "Content-Type: application/json" \\`)
      console.log(`     -d '{"currentPassword":"SecurePass123","newPassword":"NewSecurePass456"}'`)
      
      console.log(`\n🔒 Security Features:`)
      console.log(`   ✓ Passwords are automatically hashed using bcrypt`)
      console.log(`   ✓ Plain-text passwords never stored in database`)
      console.log(`   ✓ Password comparison uses bcrypt.compare()`)
      console.log(`   ✓ Passwords never sent in API responses`)
      console.log(`   ✓ Salt rounds: ${process.env.BCRYPT_SALT_ROUNDS || '10'}`)
      
      console.log(`\n💡 Open the database file to verify passwords are hashed!`)
      console.log(`   You'll see hashes like: $2b$10$XZTjE... instead of plain text\n`)
    })
  } catch (err) {
    console.error('❌ Unable to start server:', err)
    process.exit(1)
  }
}

start()
