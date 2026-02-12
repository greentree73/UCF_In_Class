# 🎯 Lab Solution: MongoDB Node Driver - Products API

## Solution Overview

This solution demonstrates how to build Express API routes that interact with MongoDB using the official MongoDB Node.js driver. The implementation shows proper patterns for querying collections, handling ObjectIds, and managing database connections.

## 🔧 Key Implementation Details

### Step 1 Solution: GET /products Route

**Approach:** Query all products from the database with a limit to prevent overwhelming responses.

**Code Implementation:**
```typescript
app.get('/products', async (req, res) => {
  try {
    // Connect to the database and fetch products
    const db = await connect();
    // We limit to 100 products for simplicity
    // Querying the 'products' collection and converting the cursor to an array for easier handling.
    const docs = await db.collection('products').find().limit(100).toArray();
    // Send the retrieved documents as a JSON response to the client.
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching products' });
  }
});
```

**Key Concepts:**
- **Database Connection**: Uses the singleton `connect()` function to get a database instance
- **Collection Access**: `db.collection('products')` accesses the products collection
- **Query Chain**: `.find()` returns a cursor, `.limit(100)` restricts results, `.toArray()` converts to array
- **Async/Await**: All database operations use `await` for asynchronous handling
- **Error Handling**: Try/catch block captures errors and returns 500 status

### Step 2 Solution: GET /products/:id Route

**Approach:** Retrieve a single product by converting the URL parameter to a MongoDB ObjectId and querying with `findOne()`.

**Code Implementation:**
```typescript
app.get('/products/:id', async (req, res) => {
  try {
    // Connect to the database and fetch a single product by its ID
    const db = await connect();
    const id = req.params.id;
    // We use ObjectId to convert the string ID from the URL into a MongoDB ObjectId type for querying.
    // The 'findOne' method is used to retrieve a single document that matches the specified criteria (in this case, the _id field).
    const doc = await db.collection('products').findOne({ _id: new ObjectId(id) } as any);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid id or error' });
  }
});
```

**Key Concepts:**
- **URL Parameters**: `req.params.id` extracts the id from the URL path
- **ObjectId Conversion**: `new ObjectId(id)` converts the string to MongoDB's ObjectId type
- **Single Document Query**: `findOne({ _id: new ObjectId(id) })` retrieves one matching document
- **404 Handling**: Checks if `doc` is null and returns appropriate 404 response
- **Error Handling**: Invalid ObjectId format triggers catch block with 400 status

## 💡 Learning Points

### 1. MongoDB Connection Pattern
The solution uses a **singleton pattern** for database connections:
```typescript
let client: MongoClient;
async function connect() {
  if (!client) {
    client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log('Connected to MongoDB at', MONGO_URL);
  }
  return client.db(DB_NAME);
}
```
This ensures only one connection is created and reused across all requests, improving performance.

### 2. Cursor Methods
MongoDB queries return **cursors**, not arrays:
- `.find()` - Returns a cursor to iterate over results
- `.limit(n)` - Restricts cursor to n documents
- `.toArray()` - Converts entire cursor to JavaScript array

### 3. ObjectId Usage
MongoDB's `_id` field is a special **ObjectId** type:
- Not a string, though it looks like one
- Must use `new ObjectId(string)` to convert for queries
- Invalid format throws an error (handled in catch block)

### 4. Error Handling Strategies
Different routes use different error status codes:
- **500 Internal Server Error**: Database connection or query issues (GET /products)
- **400 Bad Request**: Invalid input like malformed ObjectId (GET /products/:id)
- **404 Not Found**: Valid request but resource doesn't exist (GET /products/:id)

### 5. TypeScript Compatibility
The `as any` cast is needed because TypeScript's type system doesn't perfectly align with MongoDB's flexible document structure. This is a common pattern in MongoDB Node.js driver usage with TypeScript.

## 🔍 Code Walkthrough

### Complete Application Flow

1. **Application Setup**:
   - Import dependencies (express, mongodb driver, dotenv)
   - Configure environment variables for database connection
   - Create Express app and enable JSON parsing

2. **Connection Management**:
   - Define singleton connect function
   - Lazy initialization (connects on first request)
   - Reuses connection for all subsequent requests

3. **Routes**:
   - **GET /**: Health check endpoint
   - **GET /products**: List all products (limited to 100)
   - **GET /products/:id**: Get single product by ID
   - **POST /products/seed**: Seed sample data

4. **Server Lifecycle**:
   - Start server on specified PORT
   - Handle SIGINT (Ctrl+C) gracefully
   - Close MongoDB connection on shutdown

## 🧪 Testing the Solution

### 1. Seed the Database
```bash
curl -X POST http://localhost:3000/products/seed
```
Expected response shows 3 inserted products with their IDs.

### 2. Get All Products
```bash
curl http://localhost:3000/products
```
Returns array of all products.

### 3. Get Single Product
```bash
# Use an ID from step 2
curl http://localhost:3000/products/65c3f7a9b8d4e2f1a3c5d6e7
```
Returns single product object.

### 4. Test Error Cases
```bash
# Invalid ID format
curl http://localhost:3000/products/invalid
# Returns: {"message": "Invalid id or error"}

# Valid format but non-existent ID
curl http://localhost:3000/products/507f1f77bcf86cd799439011
# Returns: {"message": "Not found"}
```

## 🚀 Best Practices Demonstrated

1. **Singleton Connection**: Reuse database connection instead of creating new ones
2. **Error Boundaries**: Proper try/catch blocks around database operations
3. **Async/Await**: Clean asynchronous code without callback hell
4. **Type Safety**: TypeScript for compile-time error checking
5. **Environment Variables**: Configuration through .env file
6. **Graceful Shutdown**: Close connections when server stops
7. **HTTP Status Codes**: Appropriate codes for different error scenarios
8. **Limit Queries**: Prevent overwhelming responses with .limit()

## 📚 Additional Resources

- [MongoDB Node.js Driver Documentation](https://www.mongodb.com/docs/drivers/node/current/) - Official driver docs
- [CRUD Operations Guide](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/) - Complete CRUD reference
- [Connection Pooling](https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/#connection-pooling) - Understanding connection management
- [ObjectId Documentation](https://www.mongodb.com/docs/manual/reference/method/ObjectId/) - Deep dive into ObjectIds

## 🎓 What You've Learned

After reviewing this solution, you should understand:
- ✅ How to connect to MongoDB using the Node.js driver
- ✅ The difference between `.find()` and `.findOne()`
- ✅ How to work with MongoDB cursors and convert them to arrays
- ✅ Why and how to use ObjectId for document IDs
- ✅ Proper error handling patterns for database operations
- ✅ Singleton pattern for database connection management
- ✅ How to use environment variables for configuration
- ✅ Appropriate HTTP status codes for different scenarios

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
