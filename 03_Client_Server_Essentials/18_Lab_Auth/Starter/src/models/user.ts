import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/database'
import bcrypt from 'bcrypt'

// ========================================
// TypeScript Interfaces
// ========================================

interface UserAttributes {
  id: number
  username: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// ========================================
// User Model
// ========================================

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number
  public username!: string
  public email!: string
  public password!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  /**
   * Instance method to compare a plain-text password with the hashed password.
   * Used during login to verify credentials.
   */
  async comparePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password)
  }
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
      unique: true,
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
        len: {
          args: [8, 100],
          msg: 'Password must be at least 8 characters long'
        }
      }
    },
  },
  {
    tableName: 'users',
    sequelize,
    timestamps: true,
    
    // ========================================
    // Lifecycle Hooks - Password Hashing
    // ========================================
    
    hooks: {
      /**
       * beforeCreate Hook
       * Automatically hashes the password before creating a new user
       */
      beforeCreate: async (user: User) => {
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10')
        user.password = await bcrypt.hash(user.password, saltRounds)
      },

      /**
       * beforeUpdate Hook
       * Hashes the password only if it was changed
       */
      beforeUpdate: async (user: User) => {
        if (user.changed('password')) {
          const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10')
          user.password = await bcrypt.hash(user.password, saltRounds)
        }
      },
    },
  }
)

export default User
