# 🛍️ Mongoose Instance Methods Lab

## 📘 Lab Overview

In this lab, you'll implement **three instance methods** on the Product model to practice creating custom document-level functionality in Mongoose.

---

## 🎯 Learning Objectives

By completing this lab, you will:
- Implement async instance methods that modify and save documents
- Create synchronous instance methods for calculations
- Understand when to use `async/await` in instance methods
- Practice accessing document data with `this`
- Learn to add TypeScript type definitions for instance methods

---

## 🏗️ Project Structure

```
16_Lab_Instance_Methods/Starter/
├── src/
│   ├── config/
│   │   └── db.ts                  # Database connection
│   ├── models/
│   │   ├── index.ts               # Model exports
│   │   └── PRODUCT.ts             # Product model (INCOMPLETE)
│   ├── controllers/
│   │   └── productController.ts   # Uses instance methods
│   ├── routes/
│   │   └── productRoutes.ts       # Route definitions
│   └── app.ts                     # Express app
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

```bash
cp .env.example .env
```

### 3. Start MongoDB

Ensure MongoDB is running on `localhost:27017`

### 4. Run the Server

```bash
npm run dev
```

**Note:** The API won't work correctly until you complete the instance methods!

---

## 📋 Your Tasks

Complete **three instance methods** in [src/models/PRODUCT.ts](src/models/PRODUCT.ts):

### Task 1: `applyDiscount(percentage: number)`

**Purpose:** Reduce the product's price by a given percentage

**Type:** Async method (returns `Promise<IProduct>`)

**Requirements:**
1. Calculate discount amount: `price * (percentage / 100)`
2. Subtract discount from current price
3. Update `updatedAt` timestamp to current time
4. Save and return the updated product

**Example:**
```typescript
const product = await Product.findById(id);
await product.applyDiscount(20); // 20% discount
// If price was $100, it's now $80
```

---

### Task 2: `isLowStock()`

**Purpose:** Check if product quantity is below the low stock threshold (10 units)

**Type:** Synchronous method (returns `boolean`)

**Requirements:**
1. Return `true` if `quantity < 10`
2. Return `false` otherwise

**Example:**
```typescript
const product = await Product.findById(id);
if (product.isLowStock()) {
  console.log('Warning: Low stock!');
}
```

---

### Task 3: `restock(amount: number)`

**Purpose:** Add inventory to the product

**Type:** Async method (returns `Promise<IProduct>`)

**Requirements:**
1. Add `amount` to current `quantity`
2. Set `inStock` to `true`
3. Update `updatedAt` timestamp to current time
4. Save and return the updated product

**Example:**
```typescript
const product = await Product.findById(id);
await product.restock(50); // Add 50 units
```

---

## 💡 Implementation Hints

### Hint 1: Accessing Document Properties

Use `this` to access the document's fields:

```typescript
productSchema.methods.myMethod = function() {
	console.log(this.price);    // Current price
	console.log(this.quantity); // Current quantity
	this.price = 99.99;         // Update price
};
```

**Important:** Use `function()` not arrow functions `() =>`!

---

### Hint 2: Async vs Sync

```typescript
// Synchronous (no database operation)
productSchema.methods.isLowStock = function(): boolean {
	return this.quantity < 10;  // No await needed
};

// Asynchronous (saves to database)
productSchema.methods.restock = async function(amount: number): Promise<IProduct> {
	this.quantity += amount;
	return await this.save();  // Must await save()
};
```

---

### Hint 3: Saving Changes

```typescript
// After modifying fields, save the document
this.price = 50;
this.updatedAt = new Date();
return await this.save();  // Persists changes to MongoDB
```

---

### Hint 4: Current Timestamp

```typescript
this.updatedAt = new Date();  // Current date/time
```

---

## 🧪 Testing Your Implementation

### Step 1: Create a Product

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wireless Headphones",
    "description": "Premium noise-canceling wireless headphones with 30-hour battery life",
    "price": 150,
    "category": "Electronics",
    "quantity": 5
  }'
```

**Save the `_id` from the response!**

---

### Step 2: Test `applyDiscount()`

```bash
# Replace {id} with your product ID
curl -X PUT http://localhost:3000/products/{id}/discount \
  -H "Content-Type: application/json" \
  -d '{"percentage": 20}'
```

**Expected Response:**
```json
{
  "message": "20% discount applied successfully",
  "originalPrice": 150,
  "newPrice": 120,
  "discount": 30,
  "product": {
    "_id": "...",
    "price": 120
  }
}
```

**Verify:** Price reduced from $150 to $120 (20% off)

---

### Step 3: Test `isLowStock()`

```bash
curl http://localhost:3000/products/{id}/stock-check
```

**Expected Response:**
```json
{
  "product": "Wireless Headphones",
  "quantity": 5,
  "isLowStock": true,
  "message": "⚠️ Warning: Only 5 units remaining!"
}
```

**Verify:** Should show `isLowStock: true` since quantity (5) is less than 10

---

### Step 4: Test `restock()`

```bash
curl -X PUT http://localhost:3000/products/{id}/restock \
  -H "Content-Type: application/json" \
  -d '{"amount": 20}'
```

**Expected Response:**
```json
{
  "message": "Product restocked successfully",
  "previousQuantity": 5,
  "newQuantity": 25,
  "added": 20,
  "product": {
    "_id": "...",
    "quantity": 25,
    "inStock": true
  }
}
```

**Verify:** Quantity increased from 5 to 25

---

### Step 5: Verify Low Stock is Now False

```bash
curl http://localhost:3000/products/{id}/stock-check
```

**Expected Response:**
```json
{
  "product": "Wireless Headphones",
  "quantity": 25,
  "isLowStock": false,
  "message": "✅ Stock level is adequate (25 units)"
}
```

**Verify:** Now shows `isLowStock: false` since quantity (25) is >= 10

---

## ✅ Completion Checklist

Before considering your implementation complete:

- [ ] `applyDiscount()` correctly calculates and applies percentage discount
- [ ] `applyDiscount()` updates `updatedAt` timestamp
- [ ] `applyDiscount()` saves and returns the updated product
- [ ] `isLowStock()` returns `true` when quantity < 10
- [ ] `isLowStock()` returns `false` when quantity >= 10
- [ ] `restock()` adds amount to current quantity
- [ ] `restock()` sets `inStock` to `true`
- [ ] `restock()` updates `updatedAt` timestamp
- [ ] `restock()` saves and returns the updated product
- [ ] All methods use `function()` syntax (not arrow functions)
- [ ] All async methods use `await` when calling `.save()`

---

## 🔑 Key Concepts

### Why Use Instance Methods?

**Without Instance Methods:**
```typescript
// Controller has business logic mixed in
export const applyDiscount = async (req, res) => {
	const product = await Product.findById(req.params.id);
	const discount = product.price * (percentage / 100);
	product.price = product.price - discount;
	product.updatedAt = new Date();
	await product.save();
	res.json({ product });
};
```

**With Instance Methods:**
```typescript
// Model contains the logic (separation of concerns)
productSchema.methods.applyDiscount = async function(percentage) {
	this.price = this.price - (this.price * percentage / 100);
	this.updatedAt = new Date();
	return await this.save();
};

// Controller is clean and focused
export const applyDiscount = async (req, res) => {
	const product = await Product.findById(req.params.id);
	await product.applyDiscount(req.body.percentage);
	res.json({ product });
};
```

**Benefits:**
- ✅ Reusable across different controllers
- ✅ Easier to test
- ✅ Cleaner code organization
- ✅ Logic lives with the data

---

### Regular Functions vs Arrow Functions

```typescript
// ❌ WRONG - Arrow function doesn't bind 'this'
productSchema.methods.applyDiscount = async (percentage) => {
	this.price = 100; // 'this' is undefined!
};

// ✅ CORRECT - Regular function binds 'this' to the document
productSchema.methods.applyDiscount = async function(percentage) {
	this.price = 100; // 'this' refers to the product document
};
```

---

## 🤔 Reflection Questions

After completing the lab:

1. **When should an instance method be async?**
   - When it performs async operations like `.save()`

2. **What does `this` refer to in an instance method?**
   - The specific document instance (e.g., a single product)

3. **Why use instance methods instead of putting logic in controllers?**
   - Separation of concerns, reusability, cleaner code

4. **Can instance methods accept parameters?**
   - Yes! See `applyDiscount(percentage)` and `restock(amount)`

---

## 🏆 Bonus Challenges

If you finish early, try adding these instance methods:

1. **`getDiscountedPrice(percentage: number): number`**
   - Return what the price would be with a discount (don't modify the actual price)
   - Synchronous method

2. **`isExpensive(): boolean`**
   - Return true if price > 1000
   - Synchronous method

3. **`markOutOfStock(): Promise<IProduct>`**
   - Set `quantity` to 0 and `inStock` to false
   - Async method

4. **`getStockStatus(): string`**
   - Return "Out of Stock", "Low Stock", or "In Stock" based on quantity
   - Synchronous method

---

## 📚 Resources

- [Mongoose Instance Methods](https://mongoosejs.com/docs/guide.html#methods)
- [TypeScript with Mongoose](https://mongoosejs.com/docs/typescript.html)
- [Understanding 'this' in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

---

## ✨ Solution

Once you've completed your implementation, compare your code with the solution in the `../Solution` folder. Try to solve it on your own first! 💪

---

Good luck! 🚀
