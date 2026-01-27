import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/database'

interface UserAttributes {
  id: number
  username: string
  email: string
  createdAt?: Date
  updatedAt?: Date
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

/**
 * User model with instance methods
 * 
 * Instance methods are custom functions that can be called on individual user records.
 * They encapsulate business logic and make your code more maintainable.
 */
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number
  public username!: string
  public email!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  /**
   * Instance Method 1: Get Display Name
   * 
   * Returns a formatted display name combining username and email.
   * This is useful when you want to show user information in a friendly format.
   * 
   * @returns Formatted display name
   * 
   * Example usage:
   *   const user = await User.findByPk(1)
   *   console.log(user.getDisplayName()) // "johndoe (john@example.com)"
   */
  public getDisplayName(): string {
    return `${this.username} (${this.email})`
  }

  /**
   * Instance Method 2: Get Account Age
   * 
   * Calculates how many days the account has existed.
   * This demonstrates how instance methods can perform calculations
   * based on the instance's data.
   * 
   * @returns Number of days since account creation
   * 
   * Example usage:
   *   const user = await User.findByPk(1)
   *   console.log(`Account is ${user.getAccountAge()} days old`)
   */
  public getAccountAge(): number {
    const now = new Date()
    const created = new Date(this.createdAt)
    const diffTime = Math.abs(now.getTime() - created.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  /**
   * Instance Method 3: To Public JSON
   * 
   * Returns a sanitized version of the user object without sensitive data.
   * This is a common pattern for API responses where you want to control
   * exactly what data is exposed to clients.
   * 
   * Note: In a real application, you might exclude fields like password hashes,
   * internal IDs, or other sensitive information.
   * 
   * @returns Public user data
   * 
   * Example usage:
   *   const user = await User.findByPk(1)
   *   res.json(user.toPublicJSON())
   */
  public toPublicJSON(): object {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      accountAge: this.getAccountAge(),
      displayName: this.getDisplayName(),
    }
  }

  /**
   * Instance Method 4: Is New Account
   * 
   * Checks if the account was created within the last 7 days.
   * This demonstrates how instance methods can implement business rules.
   * 
   * @returns True if account is less than 7 days old
   * 
   * Example usage:
   *   const user = await User.findByPk(1)
   *   if (user.isNewAccount()) {
   *     console.log('Welcome, new user!')
   *   }
   */
  public isNewAccount(): boolean {
    return this.getAccountAge() <= 7
  }
}

// Initialize the User model with its schema
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
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize,
    timestamps: true, // Enables createdAt and updatedAt
  }
)

export default User
