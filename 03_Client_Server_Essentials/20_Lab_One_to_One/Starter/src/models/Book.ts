import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/connection.js';

// Define the attributes for the Book model
interface BookAttributes {
  id: number;
  title: string;
  isbn: string;
  publishedYear?: number;
  authorId: number; // Foreign key to Author
  createdAt?: Date;
  updatedAt?: Date;
}

// Define which attributes are optional when creating a new Book
interface BookCreationAttributes extends Optional<BookAttributes, 'id' | 'publishedYear'> {}

// Define the Book model class
class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
  public id!: number;
  public title!: string;
  public isbn!: string;
  public publishedYear!: number;
  public authorId!: number; // Foreign key
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Book model
Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    isbn: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    publishedYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1900,
        max: new Date().getFullYear() + 1,
      },
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'authors',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'books',
    timestamps: true,
  }
);

export default Book;
