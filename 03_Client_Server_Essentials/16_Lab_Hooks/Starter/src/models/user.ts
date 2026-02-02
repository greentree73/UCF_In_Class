import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/database'

// TODO: Import bcrypt library here
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
   * 
   * This method is used during login to verify if the provided password
   * matches the stored hashed password.
   * 
   * @param plainPassword - The password to check (from login attempt)
   * @returns Promise<boolean> - true if passwords match, false otherwise
   */
  async comparePassword(plainPassword: string): Promise<boolean> {
    // TODO: Compare the plain password with the hashed password
    // Use bcrypt.compare() to check if they match
    // Return true if they match, false otherwise
    
    return false // Replace this with actual comparison
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
    // LIFECYCLE HOOKS - YOUR TASK!
    // ========================================
    
    hooks: {
      /**
       * beforeCreate Hook
       * 
       * This hook runs BEFORE a new user is inserted into the database.
       * Use it to hash the password before saving.
       */
      beforeCreate: async (user: User) => {
        // TODO: Hash the password before creating the user
        // 1. Get salt rounds from environment (or default to 10)
        // 2. Hash the user.password using bcrypt
        // 3. Replace user.password with the hashed version
        // In the model
        // Get salt rounds from environment or use default
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10')
  
       // Hash the password
       const hashedPassword = await bcrypt.hash(user.password, saltRounds)
  
        // Replace the plain password with the hash
        user.password = hashedPassword
  
        console.log(`🔒 Password hashed in beforeCreate hook`)
      },
        
      

      /**
       * beforeUpdate Hook
       * 
       * This hook runs BEFORE an existing user is updated in the database.
       * Use it to hash the password if it was changed.
       * 
       * IMPORTANT: Only hash if the password was actually modified!
       * Otherwise, you'll be hashing an already-hashed password.
       */
      beforeUpdate: async (user: User) => {
        // TODO: Hash the password if it was changed
        // 1. Check if password field was modified using user.changed('password')
        // 2. If changed, hash the new password
        // 3. Replace user.password with the hashed version
         // Only hash if the password was actually changed
         // Only hash if the password was actually changed
         if (user.changed('password')) {
          const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10')
          const hashedPassword = await bcrypt.hash(user.password, saltRounds)
          user.password = hashedPassword
    
          console.log(`🔒 Password hashed in beforeUpdate hook`)
         }
       },
  }
  }
)

export default User
