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
    console.log('Database connection has been established successfully.')
    await sequelize.sync({ force: false, alter: true  
     })
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`)
    })
  } catch (err) {
    console.error('Unable to connect to the database:', err)
    process.exit(1)
  }
}

start()
