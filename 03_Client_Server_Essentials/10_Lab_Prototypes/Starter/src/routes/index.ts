import { Router } from 'express'
import { Task } from '../models'

const router = Router()

// Health check
router.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Task Manager API' })
})

// List all tasks
router.get('/tasks', async (_req, res) => {
  try {
    const tasks = await Task.findAll()
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' })
  }
})

// Create a new task
router.post('/tasks', async (req, res) => {
  try {
    const { title, description, dueDate } = req.body
    const task = await Task.create({ title, description, dueDate })
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' })
  }
})

// Get task by ID
router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id)
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    
    res.json(task)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' })
  }
})

// ========================================
// Routes that use instance method
// ========================================

/**
 * Get task status
 * This route uses the getStatus() and isOverdue() instance methods
 */
router.get('/tasks/:id/status', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id)
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    
    // Calling instance methods
    res.json({
      taskId: task.id,
      title: task.title,
      status: task.getStatus(),
      isOverdue: task.isOverdue(),
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task status' })
  }
})

/**
 * Check if task is overdue
 * This route uses the isOverdue() instance method
 */


router.get('/tasks/:id/overdue', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id)
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    
    // Calling instance method
    const overdue = task.isOverdue()
    
    res.json({
      taskId: task.id,
      title: task.title,
      isOverdue: overdue,
      message: overdue 
        ? 'This task is overdue!' 
        : 'This task is on track.',
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to check overdue status' })
  }
})


export default router
