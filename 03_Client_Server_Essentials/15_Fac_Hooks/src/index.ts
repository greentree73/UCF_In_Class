import express from 'express'
import dotenv from 'dotenv'
import { sequelize } from './models'
import routes from './routes'

// Load environment variables
dotenv.config()

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 4000

// Middleware
app.use(express.json())

// Mount routes
app.use('/api', routes)

/**
 * Start the server
 */
async function start() {
  try {
    // Connect to database
    await sequelize.authenticate()
    console.log('✓ Database connection established successfully.')
    
    // Sync database (recreate tables)
    await sequelize.sync({ force: true })
    console.log('✓ Database synchronized.')
    
    // Start listening
    app.listen(port, () => {
      console.log(`\n🚀 Server running on http://localhost:${port}`)
      console.log(`\n🪝 Lifecycle Hooks Demo API`)
      console.log(`\n📋 Available Routes:`)
      console.log(`   GET    /api/users              - List all users`)
      console.log(`   GET    /api/users/:id          - Get user by ID`)
      console.log(`   POST   /api/users              - Create user (watch hooks fire!)`)
      console.log(`   PUT    /api/users/:id          - Update user (watch hooks fire!)`)
      console.log(`   DELETE /api/users/:id          - Delete user (watch hooks fire!)`)
      
      console.log(`\n📝 Example: Create a user and watch the hooks execute`)
      console.log(`   curl -X POST http://localhost:${port}/api/users \\`)
      console.log(`     -H "Content-Type: application/json" \\`)
      console.log(`     -d '{"username":"Alice Smith","email":"ALICE@EXAMPLE.COM"}'`)
      
      console.log(`\n🔍 Notice how:`)
      console.log(`   • beforeValidate formats "Alice Smith" → "alice smith"`)
      console.log(`   • beforeValidate formats "ALICE@EXAMPLE.COM" → "alice@example.com"`)
      console.log(`   • beforeCreate sets default role to "user"`)
      console.log(`   • beforeCreate sets lastModified timestamp`)
      console.log(`   • afterCreate logs the created user details`)
      
      console.log(`\n🔄 Try updating the user:`)
      console.log(`   curl -X PUT http://localhost:${port}/api/users/1 \\`)
      console.log(`     -H "Content-Type: application/json" \\`)
      console.log(`     -d '{"email":"newemail@example.com","role":"admin"}'`)
      
      console.log(`\n👀 Watch the console to see all hooks fire in sequence!\n`)
    })
  } catch (err) {
    console.error('❌ Unable to start server:', err)
    process.exit(1)
  }
}

start()
