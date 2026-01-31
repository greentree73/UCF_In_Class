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

export class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number
  public title!: string
  public description!: string
  public completed!: boolean
  public dueDate!: Date
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  /**
   * Instance Method 1: Check if task is overdue
   * 
   * Returns true if the task is not completed and the due date has passed.
   * This is useful for identifying tasks that need immediate attention.
   * 
   * @returns true if task is overdue, false otherwise
   */
  public isOverdue(): boolean {
    return !this.completed && this.dueDate < new Date()
  }

  /**
   * Instance Method 2: Get human-readable status
   * 
   * Returns a status string based on the task's state.
   * This method demonstrates how instance methods can call other instance methods.
   * 
   * @returns "Completed", "Overdue", or "Pending"
   */
  public getStatus(): string {
    if (this.completed) {
      return 'Completed'
    }
    if (this.isOverdue()) {
      return 'Overdue'
    }
    return 'Pending'
  }

  /**
   * Instance Method 3: Mark task as complete
   * 
   * Sets the completed flag to true and saves the change to the database.
   * This is an async method because it performs a database operation.
   * 
   * @returns Promise resolving to the updated task instance
   */
  public async markComplete(): Promise<Task> {
    this.completed = true
    await this.save()
    return this
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
