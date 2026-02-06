import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/connection.js';

// Define the attributes for the Author model
interface AuthorAttributes {
  id: number;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define which attributes are optional when creating a new Author
interface AuthorCreationAttributes extends Optional<AuthorAttributes, 'id'> {}

// Define the Author model class
class Author extends Model<AuthorAttributes, AuthorCreationAttributes> implements AuthorAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Author model
Author.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100],
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    tableName: 'authors',
    timestamps: true,
  }
);

export default Author;
