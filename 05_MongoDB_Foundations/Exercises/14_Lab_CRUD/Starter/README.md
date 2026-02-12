# 🛒 Mongoose CRUD Lab - Product Management

## 📘 Lab Overview

In this lab, you'll practice implementing Mongoose CRUD operations with a focus on the **`findOneAndUpdate()`** method. You'll complete a controller function that finds and updates a product based on a category parameter.

---

## 🎯 Learning Objectives

By completing this lab, you will:
- Understand the difference between `findByIdAndUpdate()` and `findOneAndUpdate()`
- Learn how to find documents by field values (not just by `_id`)
- Practice updating the first matching document
- Implement proper error handling for update operations
- Work with route parameters and request bodies

---

## 🏗️ Project Structure

```
14_Lab_CRUD/Starter/
├── src/
│   ├── config/
│   │   └── db.ts                  # Database connection
│   ├── models/
│   │   ├── index.ts               # Model exports
│   │   └── PRODUCT.ts             # Product schema
│   ├── controllers/
│   │   └── productController.ts   # CRUD logic (INCOMPLETE)
│   ├── routes/
│   │   └── productRoutes.ts       # Route definitions
│   └── app.ts                     # Express app setup
├── package.json
├── tsconfig.json
└── .env.example
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

---

## 📋 Your Task

### Complete the `updateProductByCategory` Controller

**Location:** `src/controllers/productController.ts`

**Objective:** Implement a controller function that:
1. Finds the **first** product that matches the category from `req.params.category`
2. Updates its `name` field using the value from `req.body.name`
3. Sets the `updatedAt` field to the current timestamp
4. Returns the **updated** document (not the original)
5. Runs schema validators during the update
6. Handles the case where no product is found (return 404)
7. Handles any errors appropriately (return 400)

### Function Signature

```typescript
export const updateProductByCategory = async (req: Request, res: Response): Promise<void> => {
	try {
		// TODO: Your implementation here
	} catch (err: any) {
		res.status(400).json({ 
			message: 'Error updating product by category',
			error: err.message 
		});
	}
};
```

---

## 💡 Hints

### Understanding `findOneAndUpdate()`

```typescript
Model.findOneAndUpdate(
	filter,    // Object with search criteria
	update,    // Object with fields to update
	options    // Configuration options
)
```

**Key Differences:**
- `findByIdAndUpdate()` - Find by `_id` only
- `findOneAndUpdate()` - Find by **any field(s)**

### Example Structure

```typescript
const result = await Product.findOneAndUpdate(
	{ /* filter criteria */ },
	{ /* update fields */ },
	{ /* options */ }
);
```

### Required Options

```typescript
{
	new: true,          // Return updated document
	runValidators: true // Run schema validation
}
```

### Getting Values from Request

```typescript
req.params.category  // Category from URL: /category/:category
req.body.name        // Name from request body
Date.now()          // Current timestamp
```

---

## 🧪 Testing Your Implementation

### Step 1: Create Test Products

```bash
# Create a product in Electronics category
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Old Laptop",
    "description": "Outdated laptop model",
    "price": 500,
    "category": "Electronics",
    "quantity": 10
  }'

# Create another product in Electronics category
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Old Monitor",
    "description": "Outdated monitor model",
    "price": 200,
    "category": "Electronics",
    "quantity": 5
  }'
```

### Step 2: Test Your Update Function

```bash
# Update the first Electronics product name
curl -X PUT http://localhost:3000/products/category/Electronics/update \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Gaming Laptop"
  }'
```

**Expected Response:**
```json
{
  "message": "Product updated successfully",
  "product": {
    "_id": "...",
    "name": "New Gaming Laptop",  // ✅ Updated
    "description": "Outdated laptop model",
    "price": 500,
    "category": "Electronics",
    "quantity": 10,
    "updatedAt": "2026-02-11T15:30:00.000Z"  // ✅ Updated
  }
}
```

### Step 3: Verify Only First Product Was Updated

```bash
# Get all Electronics products
curl http://localhost:3000/products/category/Electronics
```

You should see:
- First product: `"name": "New Gaming Laptop"` ✅ Updated
- Second product: `"name": "Old Monitor"` ❌ Not updated

### Step 4: Test Error Cases

**Test 404 - Category Not Found:**
```bash
curl -X PUT http://localhost:3000/products/category/NonExistent/update \
  -H "Content-Type: application/json" \
  -d '{"name": "Test"}'
```

**Expected:** 404 error with message about category not found

**Test Validation - Name Too Long:**
```bash
curl -X PUT http://localhost:3000/products/category/Electronics/update \
  -H "Content-Type: application/json" \
  -d '{
    "name": "This is an extremely long product name that exceeds the maximum allowed length of 100 characters and should fail validation"
  }'
```

**Expected:** 400 error about name length

---

## 🎓 Key Concepts

### `findOneAndUpdate()` Explained

```typescript
await Product.findOneAndUpdate(
	// 1️⃣ FILTER: What to find
	{ category: 'Electronics' },
	
	// 2️⃣ UPDATE: What to change
	{ 
		name: 'New Name',
		updatedAt: Date.now()
	},
	
	// 3️⃣ OPTIONS: How to behave
	{ 
		new: true,           // Return updated doc (default is original)
		runValidators: true  // Validate against schema
	}
);
```

### Why Use `findOneAndUpdate()`?

| Scenario | Best Method |
|----------|-------------|
| Update by `_id` | `findByIdAndUpdate()` |
| Update by other field | `findOneAndUpdate()` |
| Update multiple docs | `updateMany()` |
| Update first match | `findOneAndUpdate()` ✅ |

### Important: First Match Only

```typescript
// Database has 3 Electronics products
// findOneAndUpdate only affects the FIRST one it finds
```

To update all products in a category, you'd use `updateMany()` instead.

---

## ✅ Checklist

Before considering your implementation complete, verify:

- [ ] Function uses `Product.findOneAndUpdate()`
- [ ] Filter searches by `category` field
- [ ] Updates both `name` and `updatedAt` fields
- [ ] Uses `{ new: true }` option
- [ ] Uses `{ runValidators: true }` option
- [ ] Returns 404 if no product found
- [ ] Returns 400 on errors
- [ ] Returns success response with updated product

---

## 🤔 Reflection Questions

After completing the lab:

1. **What's the difference between `findByIdAndUpdate()` and `findOneAndUpdate()`?**
   - When would you use each?

2. **What does `{ new: true }` do?**
   - What would happen without it?

3. **Why is `runValidators` important?**
   - What could go wrong without it?

4. **How does Mongoose decide which document is "first"?**
   - How can you control this?

---

## 🏆 Bonus Challenges

If you finish early, try:

1. **Add Query Parameters:**
   - Allow sorting which product gets updated first
   - Example: `/category/Electronics/update?sort=price`

2. **Update Multiple Fields:**
   - Allow updating name, price, and quantity together
   - Validate all fields properly

3. **Add a Counter:**
   - Track how many times a product has been updated
   - Increment this counter on each update

4. **Return Original and Updated:**
   - Return both versions in the response
   - Compare what changed

---

## 📚 Resources

- [Mongoose findOneAndUpdate()](https://mongoosejs.com/docs/api/model.html#model_Model-findOneAndUpdate)
- [Mongoose Query Options](https://mongoosejs.com/docs/api/query.html#query_Query-setOptions)
- [Update Validators](https://mongoosejs.com/docs/validation.html#update-validators)

---

## ✨ Solution

Once you've completed the implementation, compare your code with the solution in the `../Solution` folder. Try to complete it on your own first! 💪
