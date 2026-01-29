// Import what we need from Sequelize
import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/database'

// Define the shape of our Character data
interface CharacterAttributes {
  id: number
  name: string
  class: string
  level: number
}

// The 'id' is optional when creating because the database generates it
interface CharacterCreationAttributes extends Optional<CharacterAttributes, 'id'> {}

// Create the Character Model class
export class Character extends Model<CharacterAttributes, CharacterCreationAttributes> implements CharacterAttributes {
  // SOLUTION: Add the member definitions here
  // Each member represents a property that will exist on Character instances
  public id!: number      // Unique identifier for the character
  public name!: string    // Character's name
  public class!: string   // Character's class (e.g., "Warrior", "Mage")
  public level!: number   // Character's level
}

// Initialize the Character model
Character.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    class: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'characters',
    sequelize,
  }
)

export default Character
