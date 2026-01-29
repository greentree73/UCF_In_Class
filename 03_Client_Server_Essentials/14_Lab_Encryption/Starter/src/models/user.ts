import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/database'

// ========================================
// TypeScript Interfaces for Type Safety
// ========================================

/**
 * Defines all attributes that a User has in the database
 */
interface UserAttributes {
  id: number
  username: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

/**
 * Defines which attributes are optional when creating a new User
 * (id is auto-generated, so it's optional during creation)
 */
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// ========================================
// User Model
// ========================================

/**
 * User model for storing user information.
 * 
 * Note: Password hashing is handled in the route layer, not in the model.
 * This demonstrates an alternative approach where business logic (hashing)
 * is kept in the controller/route layer rather than in lifecycle hooks.
 */
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number
  public username!: string
  public email!: string
  public password!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

// ========================================
// Model Initialization
// ========================================

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Username is required'
        },
        notEmpty: {
          msg: 'Username cannot be empty'
        },
        len: {
          args: [3, 20],
          msg: 'Username must be between 3 and 20 characters'
        },
      }
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true, // Ensures no duplicate emails
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Email cannot be empty'
        },
        isEmail: {
          msg: 'Must be a valid email address'
        }
      }
    },

    /**
     * Password Field
     * 
     * IMPORTANT: This field will store the HASHED password, never the plain text!
     * The hashing happens in the route layer before saving to the database.
     * 
     * Security note: We store hashes that look like:
     * "$2b$10$XZTjE.../abcdefghijklmnopqrstuvwxyz..."
     * 
     * This includes:
     * - $2b$ = bcrypt algorithm identifier
     * - 10 = cost factor (number of hashing rounds)
     * - Next 22 chars = the salt (random data)
     * - Remaining chars = the actual hash
     */
    password: {
      type: DataTypes.STRING(255), // Hashes are longer than plain passwords
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: 'Password cannot be empty'
        },
      }
    },
  },
  {
    tableName: 'users',
    sequelize,
    timestamps: true,
  }
)

export default User
