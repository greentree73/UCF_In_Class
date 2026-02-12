# 🛒 Lab: MongoDB Node Driver - Products API

## 🎯 Goal

Build Express API routes that interact with a MongoDB database using the official MongoDB Node.js driver. You will complete the implementation of two routes that retrieve product data from the EcommerceDB database.

## 📝 User Story

```
AS A backend developer
I WANT to query a MongoDB database using the Node.js driver
SO THAT I can build API endpoints that retrieve product information
```

## ⏱️ Estimated Time
15-20 minutes

## 🚀 Getting Started

### Prerequisites
- MongoDB installed and running on your machine
- Node.js and npm installed
- Basic understanding of Express.js and async/await

### Setup Instructions

1. **Start MongoDB** (if not already running):
   ```bash
   mongod
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Seed the database** with sample products:
   ```bash
   npm run dev
   ```
   Then make a POST request to seed data:
   ```bash
   curl -X POST http://localhost:3000/products/seed
   ```

4. **Complete the routes** in `app.ts` as described below

## 📝 Instructions

You will complete two routes in [app.ts](app.ts) that interact with the MongoDB `products` collection.

### Step 1: Complete the GET /products Route

**Goal:** Retrieve all products from the database (limited to 100)

**Your Task:**
- [ ] Connect to the database using the `connect()` function
- [ ] Query the `products` collection using `.find()`
- [ ] Limit results to 100 documents
- [ ] Convert the cursor to an array using `.toArray()`
- [ ] Send the array as a JSON response

**Code Location:** `app.ts`, lines ~31-44

**Expected Result:** 
- GET request to `http://localhost:3000/products` returns an array of all products
- Response includes `name`, `description`, `price`, `category`, `stock`, and `createdAt` fields

**Hints:**
- Use `db.collection('products')` to access the collection
- Chain `.find().limit(100).toArray()` to get all documents as an array
- Remember to `await` the async database operations
- Wrap your code in a try/catch block for error handling

**📚 MongoDB Docs:**
- [Collection.find()](https://www.mongodb.com/docs/drivers/node/current/usage-examples/find/) - Find multiple documents
- [Cursor.toArray()](https://mongodb.github.io/node-mongodb-native/6.3/classes/FindCursor.html#toArray) - Convert cursor to array
- [Cursor.limit()](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/limit/) - Limit number of results

### Step 2: Complete the GET /products/:id Route

**Goal:** Retrieve a single product by its MongoDB ObjectId

**Your Task:**
- [ ] Connect to the database using the `connect()` function
- [ ] Get the `id` parameter from the request URL
- [ ] Convert the string ID to a MongoDB ObjectId
- [ ] Query the collection using `.findOne()` with the ObjectId
- [ ] Handle the case when no product is found (return 404)
- [ ] Send the product document as a JSON response

**Code Location:** `app.ts`, lines ~47-62

**Expected Result:**
- GET request to `http://localhost:3000/products/:id` returns a single product
- Returns 404 with message "Not found" if the ID doesn't exist
- Returns 400 for invalid ID format

**Hints:**
- Use `new ObjectId(id)` to convert the string ID to MongoDB ObjectId format
- Use `findOne({ _id: new ObjectId(id) })` to find by ID
- Check if `doc` is null before sending response
- The `as any` cast is needed for TypeScript compatibility

**📚 MongoDB Docs:**
- [Collection.findOne()](https://www.mongodb.com/docs/drivers/node/current/usage-examples/findOne/) - Find a single document
- [ObjectId](https://www.mongodb.com/docs/manual/reference/method/ObjectId/) - MongoDB ObjectId reference
- [Query by _id](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/retrieve/#find-one-document) - Querying by document ID

## ✅ Testing Your Work

### Quick Checks:

1. **Test GET /products**:
   ```bash
   curl http://localhost:3000/products
   ```
   Should return an array with 3 products

2. **Test GET /products/:id**:
   ```bash
   # First, get an ID from the list of products
   # Then use it to get a single product
   curl http://localhost:3000/products/[PASTE_ID_HERE]
   ```
   Should return a single product object

3. **Test invalid ID**:
   ```bash
   curl http://localhost:3000/products/invalid-id
   ```
   Should return 400 error

4. **Test non-existent ID**:
   ```bash
   curl http://localhost:3000/products/507f1f77bcf86cd799439011
   ```
   Should return 404 "Not found"

### Expected Output Examples:

**GET /products** response:
```json
[
  {
    "_id": "65c3f7a9b8d4e2f1a3c5d6e7",
    "name": "Wireless Headphones",
    "description": "Noise-cancelling over-ear headphones",
    "price": 89.99,
    "category": "Electronics",
    "stock": 45,
    "createdAt": "2026-02-07T..."
  },
  // ... more products
]
```

**GET /products/:id** response:
```json
{
  "_id": "65c3f7a9b8d4e2f1a3c5d6e7",
  "name": "Wireless Headphones",
  "description": "Noise-cancelling over-ear headphones",
  "price": 89.99,
  "category": "Electronics",
  "stock": 45,
  "createdAt": "2026-02-07T..."
}
```

## 🐛 Troubleshooting

**Problem:** "MongoServerError: connect ECONNREFUSED"
**Solution:** Make sure MongoDB is running with `mongod` command

**Problem:** "Cannot read property 'db' of undefined"
**Solution:** Ensure you're calling `await connect()` before querying

**Problem:** "Argument passed in must be a string of 12 bytes or a string of 24 hex characters"
**Solution:** The ID format is invalid - make sure you're using `new ObjectId(id)` properly

**Problem:** No products returned from GET /products
**Solution:** Make sure you've seeded the database using POST /products/seed

## � Additional Resources

- [MongoDB Node.js Driver Documentation](https://www.mongodb.com/docs/drivers/node/current/) - Official driver docs
- [CRUD Operations Guide](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/) - Complete CRUD reference
- [MongoDB Query API](https://www.mongodb.com/docs/manual/tutorial/query-documents/) - Query syntax and operators
- [Connection Guide](https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/) - Connection best practices

## �🔍 What's Next?

After completing this exercise, you'll understand:
- How to connect to MongoDB using the Node.js driver
- How to query collections with `.find()` and `.findOne()`
- How to work with MongoDB ObjectIds
- How to handle errors in database operations

Next, you'll learn about more advanced MongoDB queries including filtering, sorting, and aggregation!
