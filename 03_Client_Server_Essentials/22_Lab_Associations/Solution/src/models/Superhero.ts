import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface SuperheroAttributes {
  id: number;
  name: string;
  alias: string;
  powerLevel: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface SuperheroCreationAttributes extends Optional<SuperheroAttributes, 'id'> {}

class Superhero extends Model<SuperheroAttributes, SuperheroCreationAttributes> implements SuperheroAttributes {
  public id!: number;
  public name!: string;
  public alias!: string;
  public powerLevel!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Superhero.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: 'Real name of the superhero'
    },
    alias: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: 'Superhero alias/codename'
    },
    powerLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 50,
      validate: {
        min: 1,
        max: 100
      },
      comment: 'Overall power rating (1-100)'
    }
  },
  {
    sequelize,
    modelName: 'Superhero',
    tableName: 'superheroes'
  }
);

export default Superhero;
