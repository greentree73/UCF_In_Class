import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/database'

interface TaskAttributes {
  id: number
  title: string
  description: string
  completed: boolean
  dueDate: Date
  createdAt?: Date
  updatedAt?: Date
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id' | 'completed'> {}

export class Task
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes
{
  public id!: number;
  public title!: string;
  public description!: string;
  public completed!: boolean;
  public dueDate!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // ========================================
  // TODO: Implement Instance Method
  // ========================================
  // Method Name: isOverdue
  // Return Type: boolean
  //
  // Purpose: Check if the task is past its due date and not completed
  //
  // Instructions:
  // 1. Check if the task is NOT completed
  // 2. Check if the dueDate is before the current date
  // 3. Return true only if BOTH conditions are met
  //
  // Hint: Use new Date() to get the current date
  // Hint: Compare dates like: this.dueDate < new Date()
  // ========================================

  // Your code here

  public isOverdue(): boolean {
    // Your code here
    if (!this.completed && this.dueDate < new Date()) {
      return true;
    } else {
      return false;
    }
  }

  public getStatus(): string {
    if (this.completed) {
      return "Completed";
    }
    if (this.isOverdue()) {
      return "Overdue";
    }
    return "Pending";
  }
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'tasks',
    sequelize,
    timestamps: true,
  }
)

export default Task
