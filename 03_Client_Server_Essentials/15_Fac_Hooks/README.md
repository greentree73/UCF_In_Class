# Introduction to Sequelize Lifecycle Hooks

## What are Lifecycle Hooks?

**Lifecycle hooks** (also called model hooks) are functions that Sequelize automatically calls at specific points in a model's lifecycle. Think of them as event listeners that run before or after certain database operations.

Imagine you're creating a new user. The lifecycle looks like this:

```
You call User.create() 
    ↓
beforeValidate hook runs
    ↓
Validation happens
    ↓
afterValidate hook runs
    ↓
beforeCreate hook runs
    ↓
Database INSERT happens
    ↓
afterCreate hook runs
    ↓
User is returned to you
```

At each step, you can insert custom logic to run automatically!

## Why Use Hooks?

Hooks help you:

1. **Automate repetitive tasks** - Format data, set defaults, log events
2. **Keep code DRY** - Write logic once in the model, not in every route
3. **Ensure consistency** - Data transformations happen automatically
4. **Centralize business logic** - Keep related code close to the model
5. **Add side effects** - Send emails, update related records, etc.

### Example: Without vs With Hooks

```javascript
// ❌ Without hooks - you have to remember to format usernames everywhere
router.post('/users', async (req, res) => {
  const { username, email } = req.body
  const formattedUsername = username.toLowerCase().trim() // Manual formatting
  await User.create({ username: formattedUsername, email })
})

router.put('/users/:id', async (req, res) => {
  const { username } = req.body
  const formattedUsername = username.toLowerCase().trim() // Repeated code!
  await user.update({ username: formattedUsername })
})

// ✅ With hooks - formatting happens automatically
// In the User model:
hooks: {
  beforeSave: (user) => {
    if (user.username) {
      user.username = user.username.toLowerCase().trim()
    }
  }
}

// Now in routes - no manual formatting needed!
router.post('/users', async (req, res) => {
  await User.create(req.body) // Username automatically formatted!
})
```

## Types of Hooks

Sequelize provides hooks for many lifecycle events:

### Creation Hooks
- **`beforeValidate`** - Before validation runs
- **`afterValidate`** - After validation passes
- **`beforeCreate`** - Before INSERT into database
- **`afterCreate`** - After INSERT completes

### Update Hooks
- **`beforeUpdate`** - Before UPDATE in database
- **`afterUpdate`** - After UPDATE completes
- **`beforeSave`** - Before CREATE or UPDATE (runs for both)
- **`afterSave`** - After CREATE or UPDATE (runs for both)

### Deletion Hooks
- **`beforeDestroy`** - Before DELETE from database
- **`afterDestroy`** - After DELETE completes

### Other Hooks
- **`beforeFind`** - Before SELECT query
- **`afterFind`** - After SELECT query

## Hook Syntax

Hooks are defined in the model's `init()` method:

```typescript
User.init(
  {
    // Field definitions here
    username: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  {
    tableName: 'users',
    sequelize,
    
    // Hooks are defined here
    hooks: {
      // beforeCreate runs before a new record is inserted
      beforeCreate: (user: User) => {
        console.log('About to create a new user!')
        // Modify the user object here if needed
      },
      
      // afterCreate runs after the record is inserted
      afterCreate: (user: User) => {
        console.log(`User ${user.username} was created!`)
        // Can't modify the user, but can do side effects
      },
    }
  }
)
```

## Common Use Cases for Hooks

### 1. Data Formatting/Normalization

```typescript
beforeSave: (user: User) => {
  // Always store emails in lowercase
  if (user.email) {
    user.email = user.email.toLowerCase()
  }
  
  // Trim whitespace from usernames
  if (user.username) {
    user.username = user.username.trim()
  }
}
```

### 2. Setting Default Values

```typescript
beforeCreate: (user: User) => {
  // Set registration date if not provided
  if (!user.registeredAt) {
    user.registeredAt = new Date()
  }
  
  // Generate a unique identifier
  if (!user.publicId) {
    user.publicId = generateUniqueId()
  }
}
```

### 3. Logging and Auditing

```typescript
afterCreate: (user: User) => {
  console.log(`New user created: ${user.username} at ${new Date()}`)
  // Could also write to an audit log table
}

afterUpdate: (user: User) => {
  console.log(`User ${user.username} was updated`)
  // Track what changed
}
```

### 4. Cascading Operations

```typescript
afterDestroy: async (user: User) => {
  // Delete user's posts when user is deleted
  await Post.destroy({ where: { userId: user.id } })
  console.log(`Deleted all posts for user ${user.username}`)
}
```

### 5. Data Validation Beyond Field Types

```typescript
beforeCreate: (user: User) => {
  // Ensure username doesn't contain special characters
  if (user.username && /[^a-zA-Z0-9_]/.test(user.username)) {
    throw new Error('Username can only contain letters, numbers, and underscores')
  }
}
```

## Async Hooks

Hooks can be asynchronous if you need to perform async operations:

```typescript
hooks: {
  beforeCreate: async (user: User) => {
    // Check if username is taken in an external service
    const isTaken = await checkExternalService(user.username)
    if (isTaken) {
      throw new Error('Username taken in external system')
    }
  }
}
```

## beforeSave vs beforeCreate vs beforeUpdate

It's important to understand the difference:

- **`beforeCreate`** - Only runs when creating **new** records
- **`beforeUpdate`** - Only runs when **updating** existing records
- **`beforeSave`** - Runs for **both** create and update operations

```typescript
hooks: {
  beforeCreate: (user: User) => {
    console.log('Creating a new user') // Only on create
  },
  
  beforeUpdate: (user: User) => {
    console.log('Updating existing user') // Only on update
  },
  
  beforeSave: (user: User) => {
    console.log('Saving user (create or update)') // Runs for both!
  }
}
```

## Checking What Changed in Update Hooks

In update hooks, you can check which fields were modified:

```typescript
beforeUpdate: (user: User) => {
  // Check if email was changed
  if (user.changed('email')) {
    console.log(`Email changed from ${user.previous('email')} to ${user.email}`)
    // Maybe send a confirmation email?
  }
  
  // Get all changed fields
  const changedFields = user.changed()
  console.log('Changed fields:', changedFields)
}
```

## Best Practices

### ✅ DO:
- Use hooks for data transformations that should **always** happen
- Use hooks for logging and auditing
- Keep hooks simple and focused
- Use descriptive names if using named hook functions

### ❌ DON'T:
- Use hooks for complex business logic (use services instead)
- Make external API calls in hooks (can slow down operations)
- Throw errors in `after*` hooks (record is already saved)
- Modify data in `after*` hooks (changes won't be saved)

## Hook Execution Order

When creating a record, hooks run in this order:

1. `beforeValidate`
2. Validation occurs
3. `afterValidate`
4. `beforeCreate`
5. `beforeSave`
6. Database INSERT
7. `afterCreate`
8. `afterSave`

When updating a record:

1. `beforeValidate`
2. Validation occurs
3. `afterValidate`
4. `beforeUpdate`
5. `beforeSave`
6. Database UPDATE
7. `afterUpdate`
8. `afterSave`

## Getting Started

In this exercise, we'll create a simple User model with hooks that:
- Format usernames to lowercase automatically
- Log when users are created or updated
- Set a default role if none is provided
- Track the last modified time

This demonstrates the power of hooks to keep your code clean and consistent!

Let's dive in and see hooks in action!
