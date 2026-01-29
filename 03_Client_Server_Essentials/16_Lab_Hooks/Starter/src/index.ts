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
      console.log(`\n🪝 Password Hashing with Hooks Lab`)
      console.log(`\n📝 Your task: Implement password hashing in lifecycle hooks`)
      console.log(`   1. Add bcrypt import in src/models/user.ts`)
      console.log(`   2. Implement beforeCreate hook to hash passwords`)
      console.log(`   3. Implement beforeUpdate hook to hash password changes`)
      console.log(`   4. Implement comparePassword method for login`)
      
      console.log(`\n📋 Test Routes:`)
      console.log(`   POST   /api/users              - Create user`)
      console.log(`   POST   /api/login              - Login`)
      console.log(`   GET    /api/users              - List users`)
      console.log(`   PUT    /api/users/:id/password - Change password`)
      
      console.log(`\n💡 See README.md for detailed instructions!\n`)
    })
  } catch (err) {
    console.error('❌ Unable to start server:', err)
    process.exit(1)
  }
}

start()
