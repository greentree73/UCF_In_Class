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
      console.log(`\n📝 Task Manager API Routes:`)
      console.log(`   GET    /api/tasks              - List all tasks`)
      console.log(`   POST   /api/tasks              - Create a new task`)
      console.log(`   GET    /api/tasks/:id          - Get task by ID`)
      console.log(`   GET    /api/tasks/:id/status   - Get task status`)
      console.log(`   GET    /api/tasks/:id/overdue  - Check if overdue`)
    })
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err)
    process.exit(1)
  }
}

start()
