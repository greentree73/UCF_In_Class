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
    
    // Sync database (force: true will drop existing tables)
    await sequelize.sync({ force: true })
    console.log('✓ Database synchronized.')
    
    app.listen(port, () => {
      console.log(`\n🚀 Server running on http://localhost:${port}`)
      console.log(`\n📚 Instance Methods Demo Routes:`)
      console.log(`   GET  /api/users                - List all users`)
      console.log(`   POST /api/users                - Create a new user`)
      console.log(`   GET  /api/users/:id/display    - Get user display name`)
      console.log(`   GET  /api/users/:id/account-age - Get account age`)
      console.log(`   GET  /api/users/:id/public     - Get public profile`)
      console.log(`   GET  /api/users/public/all     - Get all public profiles`)
      console.log(`   GET  /api/users/new/list       - Get new users`)
    })
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err)
    process.exit(1)
  }
}

start()
