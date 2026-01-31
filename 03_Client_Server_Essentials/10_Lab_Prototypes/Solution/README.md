# Lab Solution: Implementing Custom Instance Methods

## Overview
This solution demonstrates the implementation of three instance methods for the Task model:
- `isOverdue()` - Checks if a task is past its due date
- `getStatus()` - Returns a human-readable status
- `markComplete()` - Marks a task as completed

## Implementation Details

### Method 1: isOverdue()
```typescript
public isOverdue(): boolean {
  return !this.completed && this.dueDate < new Date()
}
```
**Logic:**
- Returns `true` only when the task is NOT completed AND the due date has passed
- Uses `new Date()` to get the current date for comparison
- Short-circuits with `!this.completed` first for efficiency

### Method 2: getStatus()
```typescript
public getStatus(): string {
  if (this.completed) {
    return 'Completed'
  }
  if (this.isOverdue()) {
    return 'Overdue'
  }
  return 'Pending'
}
```
**Logic:**
- Checks completion first (highest priority)
- Reuses the `isOverdue()` method to maintain DRY principle
- Returns "Pending" as the default case

### Method 3: markComplete()
```typescript
public async markComplete(): Promise<Task> {
  this.completed = true
  await this.save()
  return this
}
```
**Logic:**
- Updates the `completed` property
- Persists changes to database with `save()`
- Returns the instance for method chaining
- Must be async because `save()` returns a Promise

## Key Learning Points

1. **Instance Methods Access Instance Data**: All methods use `this` to access properties like `this.completed` and `this.dueDate`

2. **Methods Can Call Other Methods**: `getStatus()` calls `this.isOverdue()` to avoid duplicating logic

3. **Async Methods for Database Operations**: `markComplete()` is async because it performs a database save operation

4. **Encapsulation of Business Logic**: These methods keep business rules in the model, not scattered throughout routes

## Testing the Solution

Run the server and test each endpoint:

```bash
# Create a task with a past due date (will be overdue)
curl -X POST http://localhost:4000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Overdue Task","description":"This is overdue","dueDate":"2026-01-01"}'

# Create a task with a future due date (will be pending)
curl -X POST http://localhost:4000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Future Task","description":"This is pending","dueDate":"2026-12-31"}'

# Check status of task 1 (should be Overdue)
curl http://localhost:4000/api/tasks/1/status

# Mark task 1 as complete
curl -X PATCH http://localhost:4000/api/tasks/1/complete

# Check status again (should now be Completed)
curl http://localhost:4000/api/tasks/1/status

# Get all overdue tasks
curl http://localhost:4000/api/tasks/filter/overdue
```

## Common Mistakes to Avoid

1. **Forgetting to make markComplete() async**
   ```typescript
   // ❌ Wrong
   public markComplete(): Promise<Task> {
     this.completed = true
     await this.save() // Error: await only works in async functions
     return this
   }
   
   // ✅ Correct
   public async markComplete(): Promise<Task> {
     this.completed = true
     await this.save()
     return this
   }
   ```

2. **Not using `this` to access instance properties**
   ```typescript
   // ❌ Wrong
   public isOverdue(): boolean {
     return !completed && dueDate < new Date() // Error: variables not defined
   }
   
   // ✅ Correct
   public isOverdue(): boolean {
     return !this.completed && this.dueDate < new Date()
   }
   ```

3. **Duplicating logic instead of reusing methods**
   ```typescript
   // ❌ Not ideal
   public getStatus(): string {
     if (this.completed) return 'Completed'
     if (!this.completed && this.dueDate < new Date()) return 'Overdue'
     return 'Pending'
   }
   
   // ✅ Better - reuses isOverdue()
   public getStatus(): string {
     if (this.completed) return 'Completed'
     if (this.isOverdue()) return 'Overdue'
     return 'Pending'
   }
   ```

## Extension Ideas

Want to practice more? Try implementing these additional methods:

1. **getDaysRemaining()**: Calculate days until due date
2. **getDaysOverdue()**: Calculate how many days past due
3. **canEdit()**: Prevent editing completed tasks
4. **getPriority()**: High/Medium/Low based on days remaining
5. **getCompletionRate()**: For a set of tasks, calculate completion percentage
