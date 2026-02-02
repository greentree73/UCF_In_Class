import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

export const sequelize = new Sequelize({
  dialect: (process.env.DB_DIALECT as any) || 'sqlite',
  storage: process.env.DB_STORAGE || './database.sqlite',
  logging: true,
})
