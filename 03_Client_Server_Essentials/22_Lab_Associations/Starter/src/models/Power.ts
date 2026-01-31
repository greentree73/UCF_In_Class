import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface PowerAttributes {
  id: number;
  name: string;
  description: string;
  damage: number;
  superheroId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PowerCreationAttributes extends Optional<PowerAttributes, 'id'> {}

class Power extends Model<PowerAttributes, PowerCreationAttributes> implements PowerAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public damage!: number;
  public superheroId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Power.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: 'Name of the superpower'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: 'Description of what the power does'
    },
    damage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        min: 0,
        max: 500
      },
      comment: 'Damage rating of the power'
    },
    superheroId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'superheroes',
        key: 'id'
      },
      onDelete: 'CASCADE',
      comment: 'Foreign key to superheroes table'
    }
  },
  {
    sequelize,
    modelName: 'Power',
    tableName: 'powers'
  }
);

export default Power;
