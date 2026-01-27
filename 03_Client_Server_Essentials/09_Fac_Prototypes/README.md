# Introduction to Sequelize Instance Methods (Prototypes)

## What are Instance Methods?

**Instance methods** are custom functions that you can add to your Sequelize models. These methods are available on each individual record (instance) retrieved from the database, allowing you to encapsulate business logic directly within your model.

Think of instance methods as behaviors that belong to a specific record. For example, a `User` instance might have a method to check if their account is active, format their display name, or calculate their membership duration.

## Why Use Instance Methods?

Instance methods help you:

1. **Encapsulate Logic**: Keep business logic close to the data it operates on
2. **Code Reusability**: Write the logic once, use it everywhere you work with that model
3. **Cleaner Controllers**: Keep your route handlers focused on request/response, not business logic
4. **Better Testing**: Test business logic independently from routes and controllers
5. **Self-Documenting Code**: Methods reveal what operations are possible on your data

### Real-World Examples

```javascript
// Without instance methods - logic scattered in routes
router.get('/users/:id/display-name', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  const displayName = `${user.username} (${user.email})`
  res.json({ displayName })
})

// With instance methods - clean and reusable
router.get('/users/:id/display-name', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  res.json({ displayName: user.getDisplayName() })
})
```

## Instance Methods vs Class Methods

It's important to understand the difference:

- **Instance Methods**: Called on a specific record/instance
  - Example: `user.getDisplayName()` - operates on one user
  - Access instance data via `this.username`, `this.email`, etc.

- **Class Methods**: Called on the model itself (covered in a future lesson)
  - Example: `User.findActiveUsers()` - operates on all users
  - Typically return multiple records or perform aggregate operations

## How to Define Instance Methods in Sequelize

There are several ways to add instance methods to your Sequelize models:

### Method 1: Direct Method Definition (Used in This Exercise)

```typescript
export class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number
  public username!: string
  public email!: string
  
  // Instance method defined directly in the class
  public getDisplayName(): string {
    return `${this.username} (${this.email})`
  }
}
```

### Method 2: Using instanceMethods Option

```typescript
User.init(
  { /* attributes */ },
  {
    sequelize,
    instanceMethods: {
      getDisplayName() {
        return `${this.username} (${this.email})`
      }
    }
  }
)
```

### Method 3: Adding to Prototype (Legacy)

```typescript
User.prototype.getDisplayName = function() {
  return `${this.username} (${this.email})`
}
```

## Common Use Cases for Instance Methods

1. **Formatting Data**
   - `user.getFullName()` - Combine first and last name
   - `product.getFormattedPrice()` - Format price with currency symbol

2. **Computed Properties**
   - `user.isActive()` - Check if account is active based on multiple fields
   - `subscription.daysRemaining()` - Calculate remaining days

3. **Data Transformations**
   - `user.toPublicJSON()` - Return user data without sensitive fields
   - `article.getExcerpt(length)` - Generate a truncated preview

4. **Validation and Checks**
   - `user.canEditPost(post)` - Check user permissions
   - `order.isEligibleForDiscount()` - Check discount eligibility

## This Exercise

In this demonstration, you'll see how to:

1. Define instance methods in a Sequelize model
2. Use instance methods in your routes
3. Leverage instance methods to keep your code clean and maintainable

We'll create a simple `User` model with several instance methods:
- `getDisplayName()` - Format username with email
- `getAccountAge()` - Calculate how long the account has existed
- `toPublicJSON()` - Return user data without sensitive information

## Project Structure

```
09_Fac_Prototypes/
├── src/
│   ├── index.ts           # Main application entry point
│   ├── config/
│   │   └── database.ts    # Database configuration
│   ├── models/
│   │   ├── index.ts       # Model exports
│   │   └── user.ts        # User model with instance methods
│   └── routes/
│       └── index.ts       # API routes demonstrating instance methods
├── db_setup/
│   └── adventure.sql      # Database schema
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. Navigate to this directory:
   ```bash
   cd 09_Fac_Prototypes
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

5. Test the routes:
   ```bash
   # Create a user
   curl -X POST http://localhost:4000/api/users \
     -H "Content-Type: application/json" \
     -d '{"username":"johndoe","email":"john@example.com"}'

   # Get user with display name
   curl http://localhost:4000/api/users/1/display

   # Get user's public profile
   curl http://localhost:4000/api/users/1/public

   # Get user's account age
   curl http://localhost:4000/api/users/1/account-age
   ```

## Key Takeaways

- Instance methods encapsulate business logic within your models
- They make your code more maintainable and testable
- Use `this` to access instance properties within instance methods
- Instance methods are called on individual records, not the model class
- They help keep your route handlers clean and focused

## Next Steps

After understanding instance methods, you'll learn about:
- **Class Methods**: Methods that operate on the entire model
- **Hooks**: Lifecycle methods that run automatically
- **Associations**: Relationships between models

Practice adding your own instance methods to models in future exercises!
