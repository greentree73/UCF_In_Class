import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/database'

interface UserAttributes {
  id: number
  username: string
  email: string
  age: number
  password: string
  bio?: string
  role: string
  createdAt?: Date
  updatedAt?: Date
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'bio'> {}

/**
 * User model with comprehensive validations
 * 
 * This model demonstrates various types of validations:
 * - Built-in validators (email, length, numeric ranges)
 * - Custom validators (password strength, age restrictions)
 * - Multiple validators on a single field
 * - Optional vs required fields
 */
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number
  public username!: string
  public email!: string
  public age!: number
  public password!: string
  public bio!: string
  public role!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    
    // ========================================
    // Username Field - String Length Validation
    // ========================================
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        // Ensure the field is not null
        notNull: {
          msg: 'Username is required'
        },
        // Ensure the field is not an empty string
        notEmpty: {
          msg: 'Username cannot be empty'
        },
        // Length must be between 3 and 20 characters
        len: {
          args: [3, 20],
          msg: 'Username must be between 3 and 20 characters'
        },
        // Only letters, numbers, and underscores allowed
        isAlphanumeric: {
          msg: 'Username can only contain letters and numbers'
        }
      }
    },

    // ========================================
    // Email Field - Format Validation
    // ========================================
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true, // Database constraint
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Email cannot be empty'
        },
        // Built-in email format validator
        isEmail: {
          msg: 'Must be a valid email address'
        }
      }
    },

    // ========================================
    // Age Field - Numeric Range Validation
    // ========================================
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Age is required'
        },
        // Must be a number
        isInt: {
          msg: 'Age must be a whole number'
        },
        // Minimum value validation
        min: {
          args: [0],
          msg: 'Age must be a positive number'
        },
        // Maximum value validation
        max: {
          args: [120],
          msg: 'Age must be realistic (max 120)'
        },
        // Custom validator for business rule
        isOldEnough(value: number) {
          if (value < 18) {
            throw new Error('User must be at least 18 years old')
          }
        }
      }
    },

    // ========================================
    // Password Field - Custom Validation
    // ========================================
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: 'Password cannot be empty'
        },
        // Custom validator for password strength
        isStrongPassword(value: string) {
          // Minimum length check
          if (value.length < 8) {
            throw new Error('Password must be at least 8 characters long')
          }
          // Must contain uppercase letter
          if (!/[A-Z]/.test(value)) {
            throw new Error('Password must contain at least one uppercase letter')
          }
          // Must contain lowercase letter
          if (!/[a-z]/.test(value)) {
            throw new Error('Password must contain at least one lowercase letter')
          }
          // Must contain a number
          if (!/[0-9]/.test(value)) {
            throw new Error('Password must contain at least one number')
          }
        }
      }
    },

    // ========================================
    // Bio Field - Optional with Max Length
    // ========================================
    bio: {
      type: DataTypes.TEXT,
      allowNull: true, // This field is optional
      validate: {
        // Length validation - max 500 characters
        len: {
          args: [0, 500],
          msg: 'Bio cannot exceed 500 characters'
        }
      }
    },

    // ========================================
    // Role Field - Enum Validation
    // ========================================
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'user',
      validate: {
        // Value must be in the specified list
        isIn: {
          args: [['user', 'admin', 'moderator']],
          msg: 'Role must be one of: user, admin, moderator'
        }
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
