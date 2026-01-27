// Step 1: Import what we need from Sequelize
import { DataTypes, Model, Optional } from 'sequelize'
// Import our database connection
import { sequelize } from '../config/database'

// Step 2: Define the shape of our User data
// This interface describes all the fields a User has
interface UserAttributes {
  id: number        // Unique identifier for each user
  username: string  // The user's username
  email: string     // The user's email address
}

// Step 3: Define what's needed when creating a new user
// The 'id' field is optional because the database creates it automatically
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Step 4: Create the User Model class
// This class represents a User in our application
// It extends Sequelize's Model class to get all the database functionality
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  // These are the actual properties that each User instance will have
  // The '!' tells TypeScript "trust me, these will be set by Sequelize"
  public id!: number
  public username!: string
  public email!: string
}

// Step 5: Initialize the model - this is where we define the database structure
User.init(
  // First argument: Define each field and its rules
  {
    id: {
      type: DataTypes.INTEGER,      // This field stores whole numbers
      autoIncrement: true,           // Automatically increase by 1 for each new user
      primaryKey: true,              // This is the unique identifier for each user
    },
    username: {
      type: DataTypes.STRING(100),   // Text field, maximum 100 characters
      allowNull: false,              // This field is required (can't be empty)
    },
    email: {
      type: DataTypes.STRING(255),   // Text field, maximum 255 characters
      allowNull: false,              // This field is required (can't be empty)
    },
  },
  // Second argument: Model configuration
  {
    tableName: 'users',   // The name of the table in the database
    sequelize,            // The database connection to use
  }
)

// Export the model so we can use it in other files
export default User
