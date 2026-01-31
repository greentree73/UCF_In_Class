# Introduction to Sequelize Associations: One-to-One

This project introduces **Sequelize associations** using a simple one-to-one relationship between **Authors** and **Books**. This is a foundational exercise before moving on to more complex associations (one-to-many, many-to-many) in later activities.

## 🎯 Learning Objectives

- Understand what Sequelize associations are and why they're important
- Learn how to define a **one-to-one** relationship between models
- Use `hasOne()` and `belongsTo()` methods to establish associations
- Query associated data using Sequelize's `include` option
- Organize model associations in a central `models/index.ts` file

## 📚 The Scenario: Authors and Books

In this simplified example, we're modeling a scenario where:
- Each **Author** can write one **Book** (one-to-one)
- Each **Book** is written by one **Author** (one-to-one)

**Note:** In reality, authors write multiple books (one-to-many), but we're starting simple to understand the basics of associations!

## 📁 Project Structure

```
19_Fac_Associations/
├── package.json
├── README.md
└── src/
    ├── index.ts              # Express server
    ├── seed.ts               # Seed data with famous coding books
    ├── config/
    │   └── connection.ts     # Database connection
    ├── models/
    │   ├── index.ts          # 🔑 Association definitions (KEY FILE!)
    │   ├── Author.ts         # Author model
    │   └── Book.ts           # Book model
    └── routes/
        └── api/
            ├── index.ts      # Combine all routes
            ├── authorRoutes.ts
            └── bookRoutes.ts
```

## 🔑 Understanding One-to-One Associations

### What is an Association?

An **association** is a relationship between two database tables. Instead of storing all data in one giant table, we split related data into separate tables and connect them using **foreign keys**.

### The One-to-One Relationship

```
┌─────────────────┐         ┌─────────────────┐
│    Authors      │         │      Books      │
├─────────────────┤         ├─────────────────┤
│ id (PK)         │────────>│ id (PK)         │
│ name            │         │ title           │
│ email           │         │ authorId (FK)   │
└─────────────────┘         │ isbn            │
                            │ publishedYear   │
                            └─────────────────┘
```

- **Primary Key (PK)**: Unique identifier for each row
- **Foreign Key (FK)**: References the primary key in another table
- The `authorId` in the Books table creates the link to Authors

### Sequelize Association Methods

```typescript
// In models/index.ts

// Author has one Book
Author.hasOne(Book, {
  foreignKey: 'authorId',
  onDelete: 'CASCADE'
});

// Book belongs to Author
Book.belongsTo(Author, {
  foreignKey: 'authorId'
});
```

**Key Concepts:**
- `hasOne()`: Defines the "owner" side of the relationship
- `belongsTo()`: Defines the side that contains the foreign key
- `foreignKey`: Specifies which column stores the reference
- `onDelete: 'CASCADE'`: If an author is deleted, their book is also deleted

## 🔍 Querying Associated Data

### Without Associations (Manual Join)
```typescript
// ❌ The hard way - manual queries
const author = await Author.findByPk(1);
const book = await Book.findOne({ where: { authorId: 1 } });
```

### With Associations (Include)
```typescript
// ✅ The easy way - Sequelize handles the join
const author = await Author.findByPk(1, {
  include: [Book]  // Automatically joins and includes the book
});

console.log(author.Book.title); // Access the associated book
```

### Eager Loading vs Lazy Loading

**Eager Loading** (recommended): Fetch related data in one query
```typescript
// Gets author AND book in ONE database query
const author = await Author.findByPk(1, { include: [Book] });
```

**Lazy Loading**: Fetch related data when needed
```typescript
// Gets author first
const author = await Author.findByPk(1);
// Then gets book in a SECOND query
const book = await author.getBook();
```

## 🚀 Running the Project

### Prerequisites
- PostgreSQL installed and running
- Node.js installed

### Setup

1. **Create the database:**
   ```bash
   psql -U postgres
   CREATE DATABASE books_db;
   \q
   ```

2. **Copy environment file:**
   ```bash
   cp .env.EXAMPLE .env
   ```
   Edit `.env` with your database credentials.

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Seed the database:**
   ```bash
   npm run seed
   ```
   This creates tables and adds famous coding books with their authors.

5. **Start the server:**
   ```bash
   npm run dev
   ```

### Testing the API

**Get all authors with their books:**
```bash
curl http://localhost:4000/api/authors
```

**Get a specific author with their book:**
```bash
curl http://localhost:4000/api/authors/1
```

**Get all books with their authors:**
```bash
curl http://localhost:4000/api/books
```

**Get a specific book with its author:**
```bash
curl http://localhost:4000/api/books/1
```

## 📖 Sample Data

The seed file includes famous programming books:

| Author | Book |
|--------|------|
| Robert C. Martin | Clean Code |
| Martin Fowler | Refactoring |
| Eric Matthes | Python Crash Course |
| Kyle Simpson | You Don't Know JS |
| Jon Duckett | JavaScript & jQuery |

## 🔬 Key Files to Study

### 1. `src/models/index.ts` - The Association Magic! ⭐

This is where the relationships are defined. Study this file carefully!

```typescript
// This file imports both models and defines their relationship
import Author from './Author.js';
import Book from './Book.js';

// Define the one-to-one association
Author.hasOne(Book, { foreignKey: 'authorId', onDelete: 'CASCADE' });
Book.belongsTo(Author, { foreignKey: 'authorId' });

// Export both models so they know about each other
export { Author, Book };
```

### 2. `src/models/Author.ts` and `src/models/Book.ts`

These define the table structure, just like before. The association is added separately in `index.ts`.

### 3. `src/routes/api/authorRoutes.ts`

Shows how to use `include` to fetch associated data:

```typescript
// Fetch author with their book
const author = await Author.findByPk(id, {
  include: [Book]  // Include the associated Book model
});
```

## 💡 Common Pitfalls & Tips

### ❌ Don't do this:
```typescript
// Defining association in the model file itself
class Author extends Model {
  // ...
}

Author.hasOne(Book); // ❌ Book might not be loaded yet!
```

### ✅ Do this:
```typescript
// Define associations in models/index.ts AFTER importing both models
import Author from './Author.js';
import Book from './Book.js';

Author.hasOne(Book);  // ✅ Both models are loaded
Book.belongsTo(Author);
```

### Important Notes:
1. **Always define associations AFTER model initialization**
2. **Both sides of the relationship need to be defined** (hasOne AND belongsTo)
3. **Use the same foreignKey name in both directions**
4. **Import models from `models/index.ts`** to ensure associations are set up

## 🎓 Understanding the Code Flow

1. **Server starts** (`src/index.ts`)
2. **Models are imported** from `models/index.ts`
3. **Associations are defined** (Author.hasOne, Book.belongsTo)
4. **Database syncs** - Sequelize creates tables with foreign keys
5. **Routes use models** with associations available

## 🔄 Next Steps: One-to-Many

This one-to-one relationship is simplified for learning. In the real world:
- Authors write **many** books (one-to-many)
- Books might have **many** authors (many-to-many)

You'll learn these more complex relationships in `21_Fac_Associations`!

## 📝 Practice Questions

1. What's the difference between `hasOne()` and `belongsTo()`?
2. Which model contains the foreign key in a one-to-one relationship?
3. What does `include: [Book]` do in a query?
4. Why do we define associations in `models/index.ts` instead of the model files?
5. What happens if you delete an author when `onDelete: 'CASCADE'` is set?

## 🛠️ Technologies Used

- **Express** - Web framework
- **Sequelize** - PostgreSQL ORM with associations
- **PostgreSQL** - Relational database
- **TypeScript** - Type safety
- **tsx** - TypeScript execution

---

**Ready to explore associations?** Run the seed command, start the server, and examine how the data is connected! 🚀
