import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface WeaponAttributes {
  id: number;
  name: string;
  type: string;
  damage: number;
  characterId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface WeaponCreationAttributes extends Optional<WeaponAttributes, 'id'> {}

class Weapon extends Model<WeaponAttributes, WeaponCreationAttributes> implements WeaponAttributes {
  public id!: number;
  public name!: string;
  public type!: string;
  public damage!: number;
  public characterId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Weapon.init(
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
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: 'Weapon type: Sword, Bow, Staff, Axe, etc.'
    },
    damage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        min: 1,
        max: 500
      }
    },
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'characters',
        key: 'id'
      },
      onDelete: 'CASCADE',
      comment: 'Foreign key to characters table'
    }
  },
  {
    sequelize,
    modelName: 'Weapon',
    tableName: 'weapons'
  }
);

export default Weapon;
