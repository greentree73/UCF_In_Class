import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/database'

// ========================================
// TypeScript Interfaces
// ========================================

/**
 * Defines all attributes that a User has in the database
 */
interface UserAttributes {
  id: number
  username: string
  email: string
  role: string
  lastModified?: Date
  createdAt?: Date
  updatedAt?: Date
}

/**
 * Defines which attributes are optional when creating a new User
 */
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'role' | 'lastModified'> {}

// ========================================
// User Model with Lifecycle Hooks
// ========================================

/**
 * User model that demonstrates Sequelize lifecycle hooks.
 * 
 * Hooks in this model:
 * - beforeValidate: Formats and normalizes data before validation
 * - beforeCreate: Sets default values and logs creation
 * - afterCreate: Logs successful creation
 * - beforeUpdate: Tracks modification time and logs updates
 * - afterUpdate: Logs successful update
 * - beforeSave: Runs for both create and update operations
 */
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number
  public username!: string
  public email!: string
  public role!: string
  public lastModified!: Date
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

// ========================================
// Model Initialization with Hooks
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

    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'user',
      validate: {
        isIn: {
          args: [['user', 'admin', 'moderator']],
          msg: 'Role must be one of: user, admin, moderator'
        }
      }
    },

    lastModified: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    sequelize,
    timestamps: true,
    
    // ========================================
    // LIFECYCLE HOOKS
    // ========================================
    
    hooks: {
      /**
       * beforeValidate Hook
       * 
       * Runs BEFORE validation occurs.
       * Perfect for normalizing/formatting data before it's validated.
       * 
       * Use case: Ensure consistent data format
       */
      beforeValidate: (user: User) => {
        console.log(`\n🔄 HOOK: beforeValidate for user: ${user.username || 'new user'}`)
        
        // Normalize username to lowercase and trim whitespace
        if (user.username) {
          const original = user.username
          user.username = user.username.toLowerCase().trim()
          
          if (original !== user.username) {
            console.log(`   ✏️  Formatted username: "${original}" → "${user.username}"`)
          }
        }
        
        // Normalize email to lowercase
        if (user.email) {
          const original = user.email
          user.email = user.email.toLowerCase().trim()
          
          if (original !== user.email) {
            console.log(`   ✏️  Formatted email: "${original}" → "${user.email}"`)
          }
        }
      },

      /**
       * beforeCreate Hook
       * 
       * Runs BEFORE a new record is inserted into the database.
       * Happens after validation passes.
       * 
       * Use case: Set default values, generate IDs, log actions
       */
      beforeCreate: (user: User) => {
        console.log(`\n📝 HOOK: beforeCreate`)
        console.log(`   Creating new user: ${user.username}`)
        
        // Set default role if not provided
        if (!user.role) {
          user.role = 'user'
          console.log(`   🎭 Setting default role: "user"`)
        }
        
        // Set initial lastModified timestamp
        user.lastModified = new Date()
        console.log(`   ⏰ Setting lastModified: ${user.lastModified}`)
      },

      /**
       * afterCreate Hook
       * 
       * Runs AFTER a new record is inserted into the database.
       * The record already has an ID at this point.
       * 
       * Use case: Logging, sending notifications, updating related records
       * 
       * Note: Don't modify the user object here - changes won't be saved!
       */
      afterCreate: (user: User) => {
        console.log(`\n✅ HOOK: afterCreate`)
        console.log(`   User created successfully!`)
        console.log(`   ID: ${user.id}`)
        console.log(`   Username: ${user.username}`)
        console.log(`   Email: ${user.email}`)
        console.log(`   Role: ${user.role}`)
        
        // This is where you might send a welcome email, create related records, etc.
        // For this demo, we just log it
      },

      /**
       * beforeUpdate Hook
       * 
       * Runs BEFORE an existing record is updated in the database.
       * 
       * Use case: Track what changed, update timestamps, log modifications
       */
      beforeUpdate: (user: User) => {
        console.log(`\n🔄 HOOK: beforeUpdate for user: ${user.username}`)
        
        // Update the lastModified timestamp
        user.lastModified = new Date()
        console.log(`   ⏰ Updated lastModified: ${user.lastModified}`)
        
        // Check what fields changed
        const changedFields = user.changed()
        if (changedFields) {
          console.log(`   📋 Changed fields:`, changedFields)
          
          // Log specific changes
          if (user.changed('email')) {
            console.log(`   📧 Email changed: ${user.previous('email')} → ${user.email}`)
          }
          if (user.changed('role')) {
            console.log(`   🎭 Role changed: ${user.previous('role')} → ${user.role}`)
          }
        }
      },

      /**
       * afterUpdate Hook
       * 
       * Runs AFTER an existing record is updated in the database.
       * 
       * Use case: Logging, notifications, cascade updates
       */
      afterUpdate: (user: User) => {
        console.log(`\n✅ HOOK: afterUpdate`)
        console.log(`   User ${user.username} (ID: ${user.id}) updated successfully!`)
      },

      /**
       * beforeSave Hook
       * 
       * Runs for BOTH create and update operations.
       * Runs after beforeCreate/beforeUpdate but before database operation.
       * 
       * Use case: Operations that should happen for both create and update
       */
      beforeSave: (user: User) => {
        console.log(`\n💾 HOOK: beforeSave (runs for both create and update)`)
        console.log(`   About to save user: ${user.username}`)
        
        // This hook is useful for operations that should happen
        // whether you're creating or updating a record
        // For example, ensuring data consistency
      },

      /**
       * beforeDestroy Hook
       * 
       * Runs BEFORE a record is deleted from the database.
       * 
       * Use case: Logging deletions, preventing deletion, cascade operations
       */
      beforeDestroy: (user: User) => {
        console.log(`\n🗑️  HOOK: beforeDestroy`)
        console.log(`   About to delete user: ${user.username} (ID: ${user.id})`)
        
        // You could prevent deletion by throwing an error:
        // if (user.role === 'admin') {
        //   throw new Error('Cannot delete admin users!')
        // }
      },

      /**
       * afterDestroy Hook
       * 
       * Runs AFTER a record is deleted from the database.
       * 
       * Use case: Cleanup, logging, cascade deletions
       */
      afterDestroy: (user: User) => {
        console.log(`\n✅ HOOK: afterDestroy`)
        console.log(`   User deleted: ${user.username}`)
        
        // This is where you might delete related records,
        // clean up files, send notifications, etc.
      },
    },
  }
)

export default User
