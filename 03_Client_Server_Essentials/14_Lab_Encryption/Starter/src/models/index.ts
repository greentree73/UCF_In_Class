/**
 * Models Index
 * 
 * This file exports all models and the sequelize instance
 * for easy importing throughout the application.
 * 
 * Usage in other files:
 *   import { User, sequelize } from './models'
 */

import { sequelize } from '../config/database'
import { User } from './user'

export { sequelize, User }
