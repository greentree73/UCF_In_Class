import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/adventure'

export const sequelize = new Sequelize(databaseUrl, {
  logging: false,
  host: 'localhost',
  dialect: 'postgres',
  dialectOptions: {
    decibimalNumbers: true,
  },  
})

export default sequelize
