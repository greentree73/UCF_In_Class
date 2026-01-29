# Introduction to Sequelize Model Validations

## What are Model Validations?

**Validations** are rules that ensure your data meets specific requirements before it's saved to the database. They act as gatekeepers, preventing invalid or incomplete data from entering your database.

Think of validations like form validation on a website - you want to make sure users enter a valid email address, their password is strong enough, and required fields aren't left empty. Model validations do the same thing at the database level.

## Why Use Validations?

Validations help you:

1. **Maintain Data Quality**: Ensure all data meets your business rules
2. **Catch Errors Early**: Identify problems before they reach the database
3. **Provide User Feedback**: Return clear error messages to users
4. **Prevent Database Errors**: Avoid constraint violations and data corruption
5. **Centralize Business Logic**: Keep validation rules in one place - the model

### Example: Without vs With Validations

```javascript
// Without validations - this could save invalid data
await User.create({ 
  email: 'not-an-email',  // Invalid email format
  age: -5,                // Negative age
  username: ''            // Empty username
})
// Data might be saved with errors!

// With validations - errors are caught
try {
  await User.create({ 
    email: 'not-an-email',
    age: -5,
    username: ''
  })
} catch (error) {
  console.log(error.message)
  // "Validation error: Invalid email format, Age must be positive, Username cannot be empty"
}
```

## Types of Validations in Sequelize

Sequelize offers two main types of validations:

### 1. Built-in Validators

Sequelize provides many ready-to-use validators:

- **`notNull`**: Field cannot be null
- **`notEmpty`**: Field cannot be an empty string
- **`isEmail`**: Must be a valid email format
- **`isUrl`**: Must be a valid URL
- **`isNumeric`**: Must contain only numbers
- **`isAlpha`**: Must contain only letters
- **`isAlphanumeric`**: Must contain only letters and numbers
- **`len: [min, max]`**: String length must be within range
- **`min`**: Number must be at least this value
- **`max`**: Number cannot exceed this value
- **`isIn`**: Value must be in a specific list

### 2. Custom Validators

You can write your own validation logic for specific business rules:

```typescript
validate: {
  isOldEnough(value: number) {
    if (value < 18) {
      throw new Error('User must be at least 18 years old')
    }
  }
}
```

## How to Add Validations to a Model

Validations are defined in the model's `init()` method, within each field's configuration:

```typescript
User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Email is required' },
        notEmpty: { msg: 'Email cannot be empty' },
        isEmail: { msg: 'Must be a valid email address' }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        min: { args: [0], msg: 'Age must be positive' },
        max: { args: [120], msg: 'Age must be realistic' }
      }
    }
  },
  { sequelize }
)
```

## Validation vs Constraints

It's important to understand the difference:

| Feature | Validations | Constraints |
|---------|-------------|-------------|
| **Where** | Application level (Sequelize) | Database level (SQL) |
| **When** | Before save operation | During database insert/update |
| **Error Messages** | Customizable and clear | Generic database errors |
| **Examples** | Email format, custom rules | NOT NULL, UNIQUE, FOREIGN KEY |

**Best Practice**: Use both! Validations provide user-friendly errors, while constraints ensure data integrity at the database level.

## Common Validation Patterns

### Email Validation
```typescript
email: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
    isEmail: { msg: 'Must be a valid email address' }
  }
}
```

### String Length Validation
```typescript
username: {
  type: DataTypes.STRING,
  validate: {
    len: {
      args: [3, 20],
      msg: 'Username must be between 3 and 20 characters'
    }
  }
}
```

### Numeric Range Validation
```typescript
rating: {
  type: DataTypes.INTEGER,
  validate: {
    min: { args: [1], msg: 'Rating must be at least 1' },
    max: { args: [5], msg: 'Rating cannot exceed 5' }
  }
}
```

### Enum Validation (Specific Values)
```typescript
role: {
  type: DataTypes.STRING,
  validate: {
    isIn: {
      args: [['admin', 'user', 'moderator']],
      msg: 'Role must be admin, user, or moderator'
    }
  }
}
```

### Custom Business Logic
```typescript
password: {
  type: DataTypes.STRING,
  validate: {
    isStrongPassword(value: string) {
      if (value.length < 8) {
        throw new Error('Password must be at least 8 characters')
      }
      if (!/[A-Z]/.test(value)) {
        throw new Error('Password must contain an uppercase letter')
      }
      if (!/[0-9]/.test(value)) {
        throw new Error('Password must contain a number')
      }
    }
  }
}
```

## Handling Validation Errors

When validations fail, Sequelize throws a `ValidationError`:

```typescript
try {
  await User.create({ email: 'invalid-email' })
} catch (error) {
  if (error.name === 'SequelizeValidationError') {
    // Access individual validation errors
    error.errors.forEach(err => {
      console.log(`${err.path}: ${err.message}`)
    })
  }
}
```

### In Express Routes

```typescript
router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => ({
        field: err.path,
        message: err.message
      }))
      return res.status(400).json({ errors })
    }
    res.status(500).json({ error: 'Server error' })
  }
})
```

## This Exercise

In this demonstration, you'll see:

1. **Built-in Validators**: Email format, string length, numeric ranges
2. **Custom Validators**: Password strength, age restrictions
3. **Multiple Validators**: How to combine several validators on one field
4. **Error Handling**: How to catch and display validation errors
5. **Real-World Examples**: Practical validation patterns you'll use in projects

We'll create a `User` model with comprehensive validations:
- Email must be valid format
- Username must be 3-20 characters
- Age must be 18 or older
- Password must meet strength requirements
- Bio has a maximum length
- Role must be from allowed list

## Project Structure

```
11_Fac_Validations/
├── src/
│   ├── index.ts           # Main application
│   ├── config/
│   │   └── database.ts    # Database configuration
│   ├── models/
│   │   ├── index.ts       # Model exports
│   │   └── user.ts        # User model with validations
│   └── routes/
│       └── index.ts       # API routes
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. Navigate to this directory:
   ```bash
   cd 11_Fac_Validations
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Run the application:
   ```bash
   npm run dev
   ```

5. Test the validations:
   ```bash
   # This should succeed
   curl -X POST http://localhost:4000/api/users \
     -H "Content-Type: application/json" \
     -d '{"username":"johndoe","email":"john@example.com","age":25,"password":"SecurePass123","role":"user"}'

   # This should fail (invalid email)
   curl -X POST http://localhost:4000/api/users \
     -H "Content-Type: application/json" \
     -d '{"username":"johndoe","email":"not-an-email","age":25,"password":"SecurePass123","role":"user"}'

   # This should fail (age too young)
   curl -X POST http://localhost:4000/api/users \
     -H "Content-Type: application/json" \
     -d '{"username":"johndoe","email":"john@example.com","age":16,"password":"SecurePass123","role":"user"}'

   # This should fail (weak password)
   curl -X POST http://localhost:4000/api/users \
     -H "Content-Type: application/json" \
     -d '{"username":"johndoe","email":"john@example.com","age":25,"password":"weak","role":"user"}'
   ```

## Key Takeaways

- Validations protect your database from invalid data
- Sequelize provides many built-in validators for common cases
- Custom validators let you implement specific business rules
- Always provide clear, user-friendly error messages
- Validation errors return helpful information about what went wrong
- Use validations in combination with database constraints for best results

## Next Steps

After understanding validations, you'll learn about:
- **Model Hooks**: Automatic actions before/after database operations
- **Complex Validations**: Cross-field validations and async validators
- **Sanitization**: Cleaning data before saving
- **Custom Error Handling**: Building robust error response systems

Practice adding validations to all your models to ensure data quality!
