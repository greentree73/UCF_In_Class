import express from 'express'
import dotenv from 'dotenv'
import { sequelize } from './models'
import routes from './routes'

dotenv.config()

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 4000

app.use(express.json())
app.use('/api', routes)

async function start() {
  try {
    await sequelize.authenticate()
    console.log('✓ Database connection established successfully.')
    
    await sequelize.sync({ force: true })
    console.log('✓ Database synchronized.')
    
    app.listen(port, () => {
      console.log(`\n🚀 Server running on http://localhost:${port}`)
      console.log(`\n🔒 Validations Demo API Routes:`)
      console.log(`   GET    /api/users              - List all users`)
      console.log(`   POST   /api/users              - Create user (with validations)`)
      console.log(`   GET    /api/users/:id          - Get user by ID`)
      console.log(`   PUT    /api/users/:id          - Update user (with validations)`)
      console.log(`   POST   /api/users/validate     - Test validations without saving`)
      console.log(`   GET    /api/users/role/:role   - Get users by role`)
      
      console.log(`\n📋 Try these test cases:`)
      console.log(`\n   ✅ Valid user:`)
      console.log(`   curl -X POST http://localhost:${port}/api/users \\`)
      console.log(`     -H "Content-Type: application/json" \\`)
      console.log(`     -d '{"username":"johndoe","email":"john@example.com","age":25,"password":"SecurePass123","role":"user"}'`)
      
      console.log(`\n   ❌ Invalid email:`)
      console.log(`   curl -X POST http://localhost:${port}/api/users \\`)
      console.log(`     -H "Content-Type: application/json" \\`)
      console.log(`     -d '{"username":"johndoe","email":"not-an-email","age":25,"password":"SecurePass123","role":"user"}'`)
      
      console.log(`\n   ❌ Age too young:`)
      console.log(`   curl -X POST http://localhost:${port}/api/users \\`)
      console.log(`     -H "Content-Type: application/json" \\`)
      console.log(`     -d '{"username":"johndoe","email":"john@example.com","age":16,"password":"SecurePass123","role":"user"}'`)
      
      console.log(`\n   ❌ Weak password:`)
      console.log(`   curl -X POST http://localhost:${port}/api/users \\`)
      console.log(`     -H "Content-Type: application/json" \\`)
      console.log(`     -d '{"username":"johndoe","email":"john@example.com","age":25,"password":"weak","role":"user"}'`)
    })
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err)
    process.exit(1)
  }
}

start()
