# Lab: Implementing Custom Instance Methods

## Objective
In this lab, you will implement **custom instance methods** on a Sequelize model to make pre-written API routes functional. This exercise will help you practice encapsulating business logic within your models.

## Scenario
You're building a task management API. The routes have already been written, but they're calling instance methods that don't exist yet. Your job is to implement these method in the `Task` model.

## Prerequisites
- Understanding of Sequelize models
- Knowledge of instance methods
- Familiarity with TypeScript classes

## Setup
1. Navigate to the `Starter` folder
2. Install dependencies: `npm install`
3. Create a `.env` file: `cp .env.example .env`
4. Review the routes in `src/routes/index.ts` to understand what methods are needed

## Current State
The application has:
- ✅ A `Task` model with basic attributes (id, title, description, completed, dueDate)
- ✅ Complete API routes that call instance methods
- ❌ Missing instance method implementations in the model

The routes are trying to call these methods:
- `task.isOverdue()` - Check if the task is past its due date

## Your Tasks

### Task 1: Implement `isOverdue()` Method
Add an instance method that checks if a task is overdue.

**Requirements:**
- Return `true` if the task is NOT completed AND the due date has passed
- Return `false` otherwise
- Compare the `dueDate` with the current date

**Hint:** 
```typescript
public isOverdue(): boolean {
  // Your code here
}
```


## Testing Your Implementation

1. Start the server:
   ```bash
   npm run dev
   ```

2. Create a task:
   ```bash
   curl -X POST http://localhost:4000/api/tasks \
     -H "Content-Type: application/json" \
     -d '{"title":"Learn Sequelize","description":"Complete the instance methods lab","dueDate":"2026-01-30"}'
   ```

3. Test the status endpoint:
   ```bash
   curl http://localhost:4000/api/tasks/1/status
   ```

4. Test the overdue check endpoint:
   ```bash
   curl http://localhost:4000/api/tasks/1/overdue
   ```
## Expected Responses

### Task Status (Pending)
```json
{
  "taskId": 1,
  "title": "Learn Sequelize",
  "status": "Pending",
  "isOverdue": false
}
```

### Task Status (Overdue) - if due date is in the past
```json
{
  "taskId": 1,
  "title": "Learn Sequelize",
  "status": "Overdue",
  "isOverdue": true
}
```

### Mark Complete
```json
{
  "message": "Task marked as complete",
  "task": {
    "id": 1,
    "title": "Learn Sequelize",
    "completed": true,
    "status": "Completed"
  }
}
```

## Success Criteria
- [ ] All routes return responses without errors
- [ ] `isOverdue()` correctly identifies overdue tasks
- [ ] `getStatus()` returns the correct status for each scenario
- [ ] `markComplete()` successfully updates the task in the database

## Tips
- Read the route handlers to understand exactly what each method should return
- Use `this` to access instance properties like `this.completed` and `this.dueDate`
- Remember that `markComplete()` is async because it saves to the database
- Test with different due dates (past, present, future) to verify your logic

## Need Help?
- Review the `09_Fac_Prototypes` example for instance method patterns
- Check the `Solution` folder for a complete implementation
- Remember: instance methods have access to `this` which refers to the current record

## Bonus Challenge
After completing the required methods, try adding:
- `task.getDaysRemaining()` - Calculate how many days until the due date
- `task.canEdit()` - Return false if task is completed, true otherwise
- `task.getPriority()` - Determine priority based on due date proximity
