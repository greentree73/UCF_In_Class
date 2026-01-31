import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/connection.js';

// Define the attributes for the Message model
interface MessageAttributes {
  id: number;
  username: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define which attributes are optional when creating a new Message
interface MessageCreationAttributes extends Optional<MessageAttributes, 'id'> {}

// Define the Message model class
class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  public id!: number;
  public username!: string;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Message model
Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50],
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    tableName: 'messages',
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

export default Message;
