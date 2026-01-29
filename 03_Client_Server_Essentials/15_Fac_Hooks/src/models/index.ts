/**
 * Models Index
 * 
 * Exports all models and the sequelize instance
 */

import { sequelize } from '../config/database'
import { User } from './user'

export { sequelize, User }
