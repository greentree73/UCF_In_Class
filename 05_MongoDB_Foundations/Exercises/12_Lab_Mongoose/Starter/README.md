# 🛍️ Mongoose ODM Lab - Introduction to Mongoose

## 📘 Lab Overview

In this lab exercise, you'll learn the fundamentals of **Mongoose**, an Object Document Mapper (ODM) for MongoDB. This is a **discussion and code documentation activity** where you'll analyze working Mongoose code and add explanatory comments to demonstrate your understanding.

**No coding required!** All the code is already complete and functional. Your task is to read through the code, understand what it does, and fill in the TODO comments with clear explanations.

---

## 🎯 Learning Objectives

By the end of this lab, you will be able to:
- Explain what Mongoose is and why it's used instead of the native MongoDB driver
- Understand TypeScript interfaces and Mongoose schemas
- Describe how schema validation works in Mongoose
- Explain database connection and lifecycle management
- Understand basic Mongoose operations: creating and querying documents
- Recognize different Mongoose query methods and their purposes

---

## 📂 Project Structure

```
12_Lab_Mongoose/Starter/
├── src/
│   ├── config/
│   │   └── db.ts          # Database connection (COMPLETE - add TODO comments)
│   ├── models/
│   │   ├── index.ts       # Central export point (COMPLETE - add TODO comments)
│   │   └── PRODUCT.ts     # Product schema & model (COMPLETE - add TODO comments)
│   └── app.ts             # Mongoose demo script (COMPLETE - add TODO comments)
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

The `.env` file should contain:
```
MONGO_URL=mongodb://localhost:27017
MONGO_DB=Ecommerce
PORT=3000
```

### 3. Ensure MongoDB is Running

Make sure your MongoDB server is running locally on port 27017, or update the `MONGO_URL` in your `.env` file to point to your MongoDB instance.

---

---

## 📋 Lab Instructions

This lab is divided into **two parts**: a **group discussion activity** and an **individual commenting activity**.

### Part 1: Group Code Discussion (15-20 minutes)

Form small groups (2-4 people) and review the code together. Discuss the following:

#### Discussion Questions:

1. **Database Connection (`src/config/db.ts`)**
   - What is the purpose of the `connectDB()` function?
   - Why do we need the `closeDB()` function?
   - What happens if the database connection fails?
   - Why do we use `process.exit(1)` on connection error?
   - Why use environment variables for connection settings?

2. **Product Model (`src/models/PRODUCT.ts`)**
   - What is the difference between the `IProduct` interface and the `productSchema`?
   - Why do we need both TypeScript types and Mongoose schemas?
   - What validation rules are in place for products?
   - How does Mongoose automatically create a collection name from the model name?
   - What happens if you try to save a product without a required field?

3. **Model Exports (`src/models/index.ts`)**
   - Why do we create a central export point for models?
   - What are the benefits of this pattern as the application grows?

4. **Mongoose Demo (`src/app.ts`)**
   - What's the difference between `new Product()` + `.save()` vs `Product.create()`?
   - How does `Product.find()` differ from `Product.findOne()`?
   - What does `Product.findById()` do?
   - How do MongoDB query operators like `$lt` and `$gte` work?
   - Why do we need error handling with `.catch()`?

### Part 2: Add Explanatory Comments (20-25 minutes)

After discussing the code, **add your own comments** to explain what the code does. Look for all the `TODO:` comments in the files and replace them with your explanations.

#### Files to Comment:

1. **`src/config/db.ts`** - Explain database connection concepts
2. **`src/models/PRODUCT.ts`** - Explain schemas, interfaces, and validation
3. **`src/models/index.ts`** - Explain the export pattern
4. **`src/app.ts`** - Explain Mongoose operations (create, find, findOne, findById)

**Writing Good Comments:**
- Be concise but clear
- Explain *why* something is done, not just *what* it does
- Use proper technical terminology
- Think about what a beginner would need to know

---

## 🧪 Running the Demo

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

The `.env` file should contain:
```
MONGO_URL=mongodb://localhost:27017
MONGO_DB=Ecommerce
PORT=3000
```

### 3. Ensure MongoDB is Running

Make sure your MongoDB server is running locally on port 27017.

### 4. Run the Mongoose Demo

```bash
npm run dev
```

**Expected Output:**

```
✅ Connected to MongoDB: Ecommerce

📦 Creating sample products...
✅ Laptop saved: Gaming Laptop
✅ Mouse created: Wireless Mouse
✅ Keyboard created: Mechanical Keyboard

🔍 Querying products...
Found 3 products

Products under $100: 2
  - Wireless Mouse: $29.99
  - Mechanical Keyboard: $89.99

💰 Most expensive: Gaming Laptop - $1299.99

🔎 Found by ID: Gaming Laptop

✨ Mongoose demo complete!
✅ MongoDB connection closed
```

---

## ✅ What the Demo Does

This simple script demonstrates core Mongoose concepts:

1. **Connects to MongoDB** using Mongoose
2. **Creates product documents** using two different methods:
   - `new Product()` + `.save()`
   - `Product.create()`
3. **Queries products** using various methods:
   - `find()` - Get all products
   - `find({ filter })` - Get filtered products
   - `findOne()` - Get single product by criteria
   - `findById()` - Get product by ID
4. **Closes the connection** gracefully
```bash
curl -X DELETE http://localhost:3000/products/<product_id>
```

#### Query In-Stock Products (GET)
```bash
curl http://localhost:3000/products/filter/instock
```

#### Query by Category (GET)
```bash
curl http://localhost:3000/products/category/Electronics
```

#### Query by Max Price (GET)
```bash
curl http://localhost:3000/products/price/100
```

---

## 🤔 Reflection Questions

After completing the lab, discuss:

1. **Mongoose vs Native Driver:**
   - What advantages does Mongoose provide over the native MongoDB driver?
   - In what scenarios might you prefer one over the other?

2. **Schema Validation:**
   - How does schema validation work in Mongoose?
   - What happens if you try to save invalid data?
   - When does validation occur?

3. **TypeScript Integration:**
   - How does TypeScript improve the developer experience when working with Mongoose?
   - What's the difference between TypeScript interfaces and Mongoose schemas?
   - Why do we need both?

4. **Mongoose Methods:**
   - When would you use `find()` vs `findOne()` vs `findById()`?
   - What are the pros and cons of using `.save()` vs `.create()`?

---

## 🎓 Key Takeaways

- **Mongoose provides structure** to MongoDB through schemas and models
- **Validation happens automatically** when you save documents
- **Type safety** comes from TypeScript interfaces (compile-time) and schemas (runtime)
- **Multiple query methods** exist for different use cases
- **Database connections** must be opened and closed properly
- **Default values and validators** make data more consistent

---

## 📚 Additional Resources

- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
- [Mongoose Schemas](https://mongoosejs.com/docs/guide.html)
- [Mongoose Validation](https://mongoosejs.com/docs/validation.html)
- [Mongoose Queries](https://mongoosejs.com/docs/queries.html)
- [TypeScript with Mongoose](https://mongoosejs.com/docs/typescript.html)

---

## ✨ Solution

Once you've completed the lab and added all your comments, compare your explanations with the provided solution in the `../Solution` folder. Don't peek until you've given it your best effort! 💪
