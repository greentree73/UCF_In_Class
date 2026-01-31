import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface CharacterAttributes {
  id: number;
  name: string;
  class: string;
  level: number;
  health: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CharacterCreationAttributes extends Optional<CharacterAttributes, 'id'> {}

class Character extends Model<CharacterAttributes, CharacterCreationAttributes> implements CharacterAttributes {
  public id!: number;
  public name!: string;
  public class!: string;
  public level!: number;
  public health!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Character.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    class: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: 'Character class: Warrior, Mage, Rogue, etc.'
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 100
      }
    },
    health: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
      validate: {
        min: 0,
        max: 1000
      }
    }
  },
  {
    sequelize,
    modelName: 'Character',
    tableName: 'characters'
  }
);

export default Character;
