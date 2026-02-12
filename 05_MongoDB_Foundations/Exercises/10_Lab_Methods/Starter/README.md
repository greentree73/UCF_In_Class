# 🛒 Lab: MongoDB Cursor Methods

## 🎯 Goal

Practice using MongoDB cursor methods to query and manipulate data from an e-commerce product database. You'll implement three routes that use `.sort()`, `.project()`, and `.countDocuments()` to handle common database operations.

## 🔧 What You'll Build

An Express API for an e-commerce application that:
- Sorts products by price
- Returns specific product fields to optimize data transfer
- Counts products by category

## ⏱️ Estimated Time

**10-15 minutes**

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start MongoDB
Make sure MongoDB is running locally:
```bash
mongod
```

### 3. Start the Development Server
```bash
npm run dev
```

### 4. Seed the Database
Load sample product data:
```bash
curl -X POST http://localhost:3000/products/seed
```

You should see a confirmation that 12 products were inserted.

### 5. Test the Working Endpoint
Verify the server is running:
```bash
curl http://localhost:3000/products
```

This endpoint is already complete and should return all products.

---

## 📝 Your Tasks

You need to complete **three routes** in [src/app.ts](src/app.ts#L216-L295). Each route has TODO comments with detailed instructions.

### ✅ Task 1: Sort Products by Price

**Route:** `GET /products/sort`

**Goal:** Return all products sorted by price from lowest to highest.

**What You Need to Do:**
1. Query the `products` collection using `db.collection('products').find()`
2. Chain the `.sort()` method to sort by the `price` field
3. Use `1` for ascending order (lowest to highest price)
4. Convert the cursor to an array using `.toArray()`
5. Replace the empty array with your complete query

**Code Location:** Lines 216-230 in [src/app.ts](src/app.ts)

**Syntax Reference:**
```typescript
.sort({ fieldName: 1 })  // 1 = ascending, -1 = descending
```

**Test Your Work:**
```bash
curl http://localhost:3000/products/sort
```

**Expected Result:** Products ordered from cheapest ($24.99 - Water Bottle) to most expensive ($299.99 - Office Chair)

**📚 Documentation:** 
- [`.sort()` method](https://mongodb.github.io/node-mongodb-native/6.0/classes/FindCursor.html#sort)
- [Sort Examples](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/sort/)

---

### ✅ Task 2: Project Specific Fields

**Route:** `GET /products/fields`

**Goal:** Return only the `name`, `price`, and `rating` fields for each product (exclude `_id`).

**What You Need to Do:**
1. Query the `products` collection using `db.collection('products').find()`
2. Chain the `.project()` method with an object specifying which fields to include
3. Set `name: 1`, `price: 1`, and `rating: 1` to include these fields
4. Set `_id: 0` to exclude the `_id` field
5. Limit results to 10 products using `.limit(10)`
6. Convert to an array using `.toArray()`
7. Replace the empty array with your complete query

**Code Location:** Lines 243-257 in [src/app.ts](src/app.ts)

**Syntax Reference:**
```typescript
.project({ 
  field1: 1,      // Include this field
  field2: 1,      // Include this field
  _id: 0          // Exclude _id
})
```

**Test Your Work:**
```bash
curl http://localhost:3000/products/fields
```

**Expected Result:** Each product should only have `name`, `price`, and `rating` fields (no `_id`, `description`, `category`, etc.)

**📚 Documentation:**
- [`.project()` method](https://mongodb.github.io/node-mongodb-native/6.0/classes/FindCursor.html#project)
- [Project Fields Examples](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/project/)

---

### ✅ Task 3: Count Products by Category

**Route:** `GET /products/count/:category`

**Goal:** Return the number of products in a specific category.

**What You Need to Do:**
1. Use `db.collection('products').countDocuments()` 
2. Pass a filter object as the argument: `{ category: category }`
3. The `category` variable comes from `req.params.category`
4. Store the result in a variable called `count`
5. Replace `const count = 0;` with your query using `await`

**Code Location:** Lines 270-284 in [src/app.ts](src/app.ts)

**Syntax Reference:**
```typescript
const count = await collection.countDocuments({ fieldName: value });
```

**Test Your Work:**
```bash
# Count Electronics products
curl http://localhost:3000/products/count/Electronics

# Count Furniture products
curl http://localhost:3000/products/count/Furniture

# Count Sports & Outdoors products
curl "http://localhost:3000/products/count/Sports%20%26%20Outdoors"
```

**Expected Results:**
- Electronics: 5 products
- Furniture: 2 products
- Sports & Outdoors: 2 products
- Home & Kitchen: 2 products
- Bags & Luggage: 1 product

**📚 Documentation:**
- [`.countDocuments()` method](https://www.mongodb.com/docs/drivers/node/current/usage-examples/count/)
- [Count Documents Guide](https://www.mongodb.com/docs/manual/reference/method/db.collection.countDocuments/)

---

## 🧪 Testing All Routes

After completing all three tasks, test each route:

```bash
# Test sorting
curl http://localhost:3000/products/sort

# Test projection
curl http://localhost:3000/products/fields

# Test counting
curl http://localhost:3000/products/count/Electronics
```

---

## 💡 Hints & Tips

### General Pattern
All MongoDB cursor operations follow this pattern:
```typescript
const results = await db.collection('collectionName')
  .find(filterObject)       // Optional: add filter criteria
  .cursorMethod()            // Add cursor methods (.sort, .limit, etc.)
  .toArray();                // Execute and convert to array
```

### Common Mistakes

**❌ Forgetting `await`:**
```typescript
// Wrong - returns a Promise
const products = db.collection('products').find().toArray();

// Correct - awaits the Promise
const products = await db.collection('products').find().toArray();
```

**❌ Wrong sort order:**
```typescript
// Wrong - sorts highest to lowest
.sort({ price: -1 })

// Correct - sorts lowest to highest
.sort({ price: 1 })
```

**❌ Including fields incorrectly:**
```typescript
// Wrong - this excludes the field
.project({ name: 0 })

// Correct - this includes the field
.project({ name: 1 })
```

**❌ Forgetting to pass filter object:**
```typescript
// Wrong - counts all documents
const count = await db.collection('products').countDocuments();

// Correct - counts documents matching filter
const count = await db.collection('products').countDocuments({ category: 'Electronics' });
```

### Need More Help?

- Review the completed `/products` route (lines 203-213) as an example
- Check the TODO comments in each route for step-by-step guidance
- The MongoDB documentation links above have additional examples

---

## 📚 MongoDB Cursor Methods Reference

### Core Methods Used in This Lab

| Method | Purpose | Syntax | Example |
|--------|---------|--------|---------|
| `.sort()` | Order results by field(s) | `.sort({ field: 1 })` | `.sort({ price: 1 })` |
| `.project()` | Select specific fields | `.project({ field: 1 })` | `.project({ name: 1, _id: 0 })` |
| `.countDocuments()` | Count matching documents | `.countDocuments(filter)` | `.countDocuments({ category: 'Electronics' })` |
| `.limit()` | Limit number of results | `.limit(n)` | `.limit(10)` |
| `.toArray()` | Execute query and return array | `.toArray()` | `.find().toArray()` |

### Additional Cursor Methods

| Method | Purpose | Documentation |
|--------|---------|---------------|
| `.skip()` | Skip first N documents | [skip()](https://mongodb.github.io/node-mongodb-native/6.0/classes/FindCursor.html#skip) |
| `.forEach()` | Iterate through results | [forEach()](https://mongodb.github.io/node-mongodb-native/6.0/classes/FindCursor.html#forEach) |
| `.next()` | Get next document | [next()](https://mongodb.github.io/node-mongodb-native/6.0/classes/FindCursor.html#next) |
| `.hasNext()` | Check if more documents exist | [hasNext()](https://mongodb.github.io/node-mongodb-native/6.0/classes/FindCursor.html#hasNext) |

---

## 🔗 Official Documentation Links

### MongoDB Node.js Driver
- **[Cursor Methods Overview](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/cursor/)** - Complete guide to cursors
- **[FindCursor API Reference](https://mongodb.github.io/node-mongodb-native/6.0/classes/FindCursor.html)** - Full API documentation

### Specific Methods
- **[sort()](https://mongodb.github.io/node-mongodb-native/6.0/classes/FindCursor.html#sort)** - Sort method API
- **[Sorting Guide](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/sort/)** - Sorting examples and patterns
- **[project()](https://mongodb.github.io/node-mongodb-native/6.0/classes/FindCursor.html#project)** - Project method API
- **[Projection Guide](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/project/)** - Field selection examples
- **[countDocuments()](https://www.mongodb.com/docs/drivers/node/current/usage-examples/count/)** - Counting documents guide
- **[Count API Reference](https://www.mongodb.com/docs/manual/reference/method/db.collection.countDocuments/)** - MongoDB Manual

### General MongoDB Concepts
- **[Query Documents](https://www.mongodb.com/docs/manual/tutorial/query-documents/)** - Query syntax
- **[CRUD Operations](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/)** - Complete CRUD guide
- **[Method Chaining](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/cursor/#modify-cursor-behavior)** - How to chain cursor methods

---

## 🏆 Bonus Challenges

Once you've completed all three tasks, try these additional challenges:

### Challenge 1: Multi-Field Sort
Modify the sort route to sort by `category` (ascending) and then by `price` (descending) within each category.

**Hint:** 
```typescript
.sort({ category: 1, price: -1 })
```

### Challenge 2: Pagination
Create a new route `GET /products/page/:pageNum` that returns 5 products per page using `.skip()` and `.limit()`.

**Hint:**
```typescript
const page = parseInt(req.params.pageNum);
const skip = (page - 1) * 5;
.skip(skip).limit(5)
```

### Challenge 3: In-Stock Filter
Modify the sort route to only return products where `inStock: true`.

**Hint:**
```typescript
.find({ inStock: true })
```

### Challenge 4: Combined Query
Create a route that returns only `name` and `price` for Electronics products, sorted by price, limited to 3 items.

**Hint:** Chain `.find()`, `.project()`, `.sort()`, and `.limit()` together.

---

## ✅ Completion Checklist

Before moving on, make sure you can:

- [ ] Sort products by price using `.sort()`
- [ ] Project specific fields using `.project()`
- [ ] Count documents by category using `.countDocuments()`
- [ ] Understand the difference between ascending (1) and descending (-1) sort order
- [ ] Know how to include/exclude fields in projections
- [ ] Chain multiple cursor methods together
- [ ] Test all routes using curl or a REST client

---

## 🎓 What You've Learned

After completing this lab, you now know how to:

✅ Use `.sort()` to order query results  
✅ Use `.project()` to optimize data transfer by selecting only needed fields  
✅ Use `.countDocuments()` to count documents matching specific criteria  
✅ Chain cursor methods together for complex queries  
✅ Work with MongoDB collections in a Node.js/Express application  
✅ Test API endpoints using curl commands

---

## 🚀 Next Steps

Now that you're comfortable with cursor methods, you're ready to explore:
- **Aggregation Pipeline** - Complex data transformations and analytics
- **Indexes** - Optimizing query performance
- **Pagination Patterns** - Handling large datasets efficiently
- **Compound Queries** - Combining multiple filters and cursor methods

Great work! 🎉
