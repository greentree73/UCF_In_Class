# 🗄️ Introduction to ORMs and Sequelize

## 🎯 Learning Targets

By the end of this activity, you will understand:
- What an ORM is and why it's essential for modern backend development
- The benefits of using Sequelize with TypeScript
- How to install and configure Sequelize in a Node.js project
- The folder structure for organizing database code
- How to connect your Express app to a database using Sequelize

---

## 🤔 What is an ORM?

**ORM** stands for **Object-Relational Mapping**. It's a programming technique that allows you to interact with your database using object-oriented code instead of writing raw SQL queries.

### 🌉 The Bridge Analogy

Think of an ORM as a **translator** between two different worlds:
- **Your Application**: JavaScript/TypeScript objects and classes
- **Your Database**: Tables, rows, and SQL queries

Without an ORM, you'd write SQL like this:
```sql
SELECT * FROM users WHERE age > 18;
INSERT INTO users (name, email) VALUES ('Knightro', 'knight@ucf.edu');
```

With an ORM, you write JavaScript/TypeScript like this:
```typescript
const users = await User.findAll({ where: { age: { [Op.gt]: 18 } } });
const user = await User.create({ name: 'Knightro', email: 'knight@ucf.edu' });
```

---

## 🎁 Why Use an ORM?

### 1. **Type Safety with TypeScript**
- Get compile-time errors instead of runtime database errors
- Auto-completion and IntelliSense for database operations
- Clear interface definitions for your data models

### 2. **Database Agnostic**
- Write once, run on PostgreSQL, MySQL, SQLite, or SQL Server
- Switch databases by changing configuration, not code
- Perfect for development (SQLite) → production (PostgreSQL) workflows

### 3. **Security Built-In**
- Automatic protection against SQL injection attacks
- Parameterized queries handled automatically
- Input validation at the model level

### 4. **Developer Productivity**
- Less boilerplate code
- Built-in features: migrations, validations, associations
- Powerful query builder with readable syntax

### 5. **Maintainability**
- Models serve as documentation for your database schema
- Version control for database changes (migrations)
- Easier to test and mock database operations

---

## 📦 What is Sequelize?

**Sequelize** is the most popular ORM for Node.js. It's a promise-based library that provides:

- **Model Definition**: Define database tables as TypeScript classes
- **Associations**: Easily create relationships (one-to-many, many-to-many)
- **Migrations**: Version control for your database schema
- **Validations**: Built-in and custom data validation
- **Query Interface**: Powerful and readable query building
- **Transaction Support**: Ensure data integrity for complex operations

### 🏆 Why Sequelize?

- **Mature & Stable**: Been around since 2010, used by thousands of companies
- **Great TypeScript Support**: First-class TypeScript integration
- **Active Community**: Extensive documentation and community support
- **Feature-Rich**: Everything you need for complex database operations

---

## 🔧 Installing Sequelize

### Step 1: Install Core Packages

```bash
# Install Sequelize
npm install sequelize

# Install database driver (choose based on your database)
npm install sqlite3          # SQLite (great for development)
npm install pg pg-hstore     # PostgreSQL (production-ready)
npm install mysql2           # MySQL
```

**For this exercise, we're using SQLite** - it's file-based and requires no setup, perfect for learning!

### Step 2: Install TypeScript Support

```bash
# Install TypeScript and type definitions
npm install --save-dev typescript @types/node

# Install development tools
npm install --save-dev ts-node-dev
```

### Step 3: Install Environment Variables

```bash
# For managing configuration
npm install dotenv
```

---

## 📁 New Project Structure

When adding Sequelize to an Express + TypeScript project, organize your code like this:

```
my-express-app/
├── src/
│   ├── config/
│   │   └── database.ts          # 🔌 Database connection setup
│   ├── models/
│   │   ├── index.ts             # 📚 Export all models
│   │   └── user.ts              # 👤 User model definition
│   ├── routes/
│   │   └── index.ts             # 🛣️ API route handlers
│   └── index.ts                 # 🚀 Server entry point
├── db/
│   └── database.sqlite          # 💾 SQLite database file (generated)
├── .env.example                 # 📝 Environment variable template
├── .env                         # 🔐 Your environment variables (git-ignored)
├── .gitignore                   # 🚫 Files to ignore
├── package.json                 # 📦 Dependencies
└── tsconfig.json                # ⚙️ TypeScript configuration
```

### 📂 Folder Breakdown

#### `src/config/`
Contains database connection configuration. This is where you:
- Set up the Sequelize instance
- Define connection parameters (host, port, database name)
- Configure dialects (SQLite, PostgreSQL, etc.)

#### `src/models/`
Contains your database models (tables). Each file represents a table:
- Define table structure (columns, types)
- Add validations and constraints
- Set up relationships between tables

#### `src/routes/`
Contains API endpoints that use the models:
- CRUD operations (Create, Read, Update, Delete)
- Business logic
- Request/response handling

#### `db/`
Stores the SQLite database file (for development):
- Auto-generated when you run the app
- Contains all your data in development
- Ignored in git for production databases

---

## 🔌 Database Configuration

The `src/config/database.ts` file sets up your database connection:

```typescript
import { Sequelize } from 'sequelize';
import path from 'path';

const sequelize = new Sequelize({
  dialect: 'sqlite',                           // Database type
  storage: path.join(__dirname, '../../db/database.sqlite'), // File location
  logging: false,                              // Disable SQL logging (optional)
});

export { sequelize };
```

**Key Configuration Options:**
- `dialect`: The database type (sqlite, postgres, mysql, etc.)
- `storage`: File path for SQLite database
- `logging`: Set to `console.log` to see generated SQL queries (helpful for learning!)

---

## 🏗️ Creating Your First Model

Models define your database tables. Here's a `User` model in `src/models/user.ts`:

```typescript
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Define the attributes for a User
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// For creation, id is optional (auto-generated)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model
class User extends Model<UserAttributes, UserCreationAttributes> 
  implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

export { User };
```

---

## 🚀 Running the Application

### Quick Start

1. **Install dependencies**
```bash
npm install
```

2. **Copy environment variables**
```bash
cp .env.example .env
```

3. **Start the development server**
```bash
npm run dev
```

The server will run on the port defined in `.env` (default: 4000).

### What Happens When You Start?

1. **Database Connection**: Sequelize connects to your SQLite database
2. **Table Creation**: If tables don't exist, Sequelize creates them based on your models
3. **Server Start**: Express server starts listening for requests

You'll see output like:
```
Database connection has been established successfully.
Server listening on http://localhost:4000
```

---

## 🔍 Common Sequelize Operations

### Creating Records
```typescript
const user = await User.create({
  username: 'knightro',
  email: 'knightro@ucf.edu',
});
```

### Reading Records
```typescript
// Find all users
const users = await User.findAll();

// Find by primary key
const user = await User.findByPk(1);

// Find with conditions
const user = await User.findOne({ where: { username: 'knightro' } });
```

### Updating Records
```typescript
const user = await User.findByPk(1);
if (user) {
  user.email = 'new@ucf.edu';
  await user.save();
}
```

### Deleting Records
```typescript
const user = await User.findByPk(1);
if (user) {
  await user.destroy();
}
```

---

## 🎯 Key Takeaways

✅ **ORMs** translate between your code and your database  
✅ **Sequelize** is a powerful, TypeScript-friendly ORM for Node.js  
✅ **Type Safety** prevents errors and improves developer experience  
✅ **Organized Structure** keeps database code maintainable and scalable  
✅ **SQLite** is perfect for development and learning

---

## 🔗 Additional Resources

- [Sequelize Official Documentation](https://sequelize.org/)
- [Sequelize TypeScript Guide](https://sequelize.org/docs/v6/other-topics/typescript/)
- [SQL vs ORM Comparison](https://www.prisma.io/dataguide/types/relational/comparing-sql-query-builders-and-orms)

---

## 🏃 Next Steps

In the upcoming exercises, you'll:
1. Create your own models with relationships
2. Build RESTful API endpoints using Sequelize
3. Implement data validation and error handling
4. Learn about migrations for database version control
5. Practice advanced queries and associations

**Ready to dive deeper? Let's build something amazing! 🚀**
