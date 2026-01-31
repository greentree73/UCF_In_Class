import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface GuildAttributes {
  id: number;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface GuildCreationAttributes extends Optional<GuildAttributes, 'id'> {}

class Guild extends Model<GuildAttributes, GuildCreationAttributes> implements GuildAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Guild.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Guild',
    tableName: 'guilds'
  }
);

export default Guild;
