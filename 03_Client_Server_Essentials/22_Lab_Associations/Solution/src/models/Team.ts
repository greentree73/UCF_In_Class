import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface TeamAttributes {
  id: number;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TeamCreationAttributes extends Optional<TeamAttributes, 'id'> {}

class Team extends Model<TeamAttributes, TeamCreationAttributes> implements TeamAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      comment: 'Name of the superhero team'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: 'Description of the team and their mission'
    }
  },
  {
    sequelize,
    modelName: 'Team',
    tableName: 'teams'
  }
);

export default Team;
