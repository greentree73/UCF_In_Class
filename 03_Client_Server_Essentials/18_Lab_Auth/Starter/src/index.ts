import express from 'express'
import dotenv from 'dotenv'
import { sequelize } from './models'
import authRoutes from './routes/auth'
import protectedRoutes from './routes/protected'

dotenv.config()

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 4000

// ========================================
// Middleware
// ========================================

app.use(express.json())

// ========================================
// Routes
// ========================================

// Public routes (no authentication required)
app.use('/api/auth', authRoutes)

// Protected routes (authentication required)
app.use('/api', protectedRoutes)

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    message: 'JWT Authentication Demo API',
    version: '1.0.0',
    endpoints: {
      public: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login'
      },
      protected: {
        profile: 'GET /api/profile',
        updateProfile: 'PUT /api/profile',
        users: 'GET /api/users',
        userById: 'GET /api/users/:id'
      }
    }
  })
})

// ========================================
// Start Server
// ========================================

async function start() {
  try {
    await sequelize.authenticate()
    console.log('✓ Database connection established successfully.')
    
    await sequelize.sync({ force: true })
    console.log('✓ Database synchronized.')
    
    app.listen(port, () => {
      console.log(`\n🚀 Server running on http://localhost:${port}`)
      console.log(`\n🔐 JWT Authentication Demo`)
      
      console.log(`\n📋 Public Routes:`)
      console.log(`   POST   /api/auth/register  - Create new account`)
      console.log(`   POST   /api/auth/login     - Login and get JWT`)
      
      console.log(`\n🔒 Protected Routes (Require Token):`)
      console.log(`   GET    /api/profile        - Get your profile`)
      console.log(`   PUT    /api/profile        - Update your profile`)
      console.log(`   GET    /api/users          - List all users`)
      console.log(`   GET    /api/users/:id      - Get user by ID`)
      
      console.log(`\n💡 Usage:`)
      console.log(`   1. Register: POST /api/auth/register`)
      console.log(`   2. Login:    POST /api/auth/login (get token)`)
      console.log(`   3. Use:      Add header "Authorization: Bearer <token>"`)
      
      console.log(`\n📚 See README.md for examples!\n`)
    })
  } catch (err) {
    console.error('❌ Unable to start server:', err)
    process.exit(1)
  }
}

start()
