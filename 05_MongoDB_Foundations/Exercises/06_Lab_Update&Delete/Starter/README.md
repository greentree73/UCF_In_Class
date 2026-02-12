# 🛠️ Lab: MongoDB Update & Delete Operations

## 🎯 Goal

Implement Express API routes that use MongoDB update and delete operations. You will complete three routes that modify and remove product data from the EcommerceDB database using the MongoDB Node.js driver.

## 📝 User Story

```
AS A backend developer
I WANT to update and delete documents in MongoDB
SO THAT I can maintain accurate product inventory and data
```

## ⏱️ Estimated Time
10-15 minutes

## 🚀 Getting Started

### Prerequisites
- MongoDB installed and running on your machine
- Node.js and npm installed
- Understanding of MongoDB CRUD operations
- Familiarity with update operators (`$set`, `$addToSet`, etc.)

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

4. **Complete the routes** in [app.ts](src/app.ts) as described below

## 📝 Instructions

You will complete three routes in [src/app.ts](src/app.ts) that perform update and delete operations on the MongoDB `products` collection.

### Step 1: Update a Product's Price and Stock

**Goal:** Update specific fields (price and stock) of a product using the `updateOne()` method

**Your Task:**
- [ ] Connect to the database using the `connect()` function
- [ ] Extract the `id` parameter from the request URL
- [ ] Get `price` and `stock` from the request body
- [ ] Use `updateOne()` with the `$set` operator to update the product
- [ ] Add an `updatedAt` timestamp field
- [ ] Check if a document was matched (return 404 if not found)
- [ ] Send a JSON response with operation counts

**Code Location:** `src/app.ts`, `PUT /products/:id` route (~89-112)

**Expected Result:**
- PUT request to `http://localhost:3000/products/:id` updates the product
- Returns matched and modified counts
- Returns 404 if product ID doesn't exist

**Hints:**
- Use `updateOne(filter, update)` where filter is `{ _id: new ObjectId(id) }`
- The update should be `{ $set: { price, stock, updatedAt: new Date() } }`
- Check `result.matchedCount` to see if a document was found
- Return `result.matchedCount` and `result.modifiedCount` in response

**📚 MongoDB Docs:**
- [updateOne()](https://www.mongodb.com/docs/drivers/node/current/usage-examples/updateOne/) - Update single document
- [$set Operator](https://www.mongodb.com/docs/manual/reference/operator/update/set/) - Set field values
- [Update Operators Reference](https://www.mongodb.com/docs/manual/reference/operator/update/) - All update operators

---

### Step 2: Add a Tag to a Product

**Goal:** Add a tag to a product's tags array using the `$addToSet` operator

**Your Task:**
- [ ] Connect to the database
- [ ] Extract the `id` parameter from the URL
- [ ] Get the `tag` value from the request body
- [ ] Use `updateOne()` with the `$addToSet` operator
- [ ] Check if the product was found (matchedCount)
- [ ] Send a JSON response with success message and modified count

**Code Location:** `src/app.ts`, `POST /products/:id/tags` route (~114-136)

**Expected Result:**
- POST request to `http://localhost:3000/products/:id/tags` adds a tag
- Tags are unique (no duplicates allowed)
- Returns modified count (0 if tag already existed)

**Hints:**
- Use `$addToSet` instead of `$push` to prevent duplicate tags
- The update should be `{ $addToSet: { tags: tag } }`
- If the tag already exists, `modifiedCount` will be 0
- Still return success even if tag already existed

**📚 MongoDB Docs:**
- [Array Update Operators](https://www.mongodb.com/docs/manual/reference/operator/update-array/) - Array modification operators
- [$addToSet Operator](https://www.mongodb.com/docs/manual/reference/operator/update/addToSet/) - Add unique values to array
- [$push Operator](https://www.mongodb.com/docs/manual/reference/operator/update/push/) - Add values to array (allows duplicates)

---

### Step 3: Delete a Product

**Goal:** Remove a product from the database using the `deleteOne()` method

**Your Task:**
- [ ] Connect to the database
- [ ] Extract the `id` parameter from the URL
- [ ] Use `deleteOne()` to remove the product by its ObjectId
- [ ] Check if a document was deleted (deletedCount)
- [ ] Return 404 if no document was deleted
- [ ] Send a JSON response with success message and deleted count

**Code Location:** `src/app.ts`, `DELETE /products/:id` route (~141-159)

**Expected Result:**
- DELETE request to `http://localhost:3000/products/:id` removes the product
- Returns deletedCount: 1 on success
- Returns 404 if product doesn't exist

**Hints:**
- Use `deleteOne({ _id: new ObjectId(id) })`
- Check `result.deletedCount` to see if a document was deleted
- deletedCount will be 0 if no matching document was found
- Return 404 if `deletedCount === 0`

**📚 MongoDB Docs:**
- [deleteOne()](https://www.mongodb.com/docs/drivers/node/current/usage-examples/deleteOne/) - Delete single document
- [deleteMany()](https://www.mongodb.com/docs/drivers/node/current/usage-examples/deleteMany/) - Delete multiple documents
- [Delete Operations Guide](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/write-operations/delete/) - Complete delete reference

---

## ✅ Testing Your Work

### Quick Checks:

**1. Seed the database first:**
```bash
curl -X POST http://localhost:3000/products/seed
```

**2. Get all products to find an ID:**
```bash
curl http://localhost:3000/products
```

**3. Test Update Product (Step 1):**
```bash
# Replace <PRODUCT_ID> with an actual ID from step 2
curl -X PUT http://localhost:3000/products/<PRODUCT_ID> \
  -H "Content-Type: application/json" \
  -d '{"price": 99.99, "stock": 50}'
```
Expected response:
```json
{
  "message": "Product updated",
  "matched": 1,
  "modified": 1
}
```

**4. Test Add Tag (Step 2):**
```bash
curl -X POST http://localhost:3000/products/<PRODUCT_ID>/tags \
  -H "Content-Type: application/json" \
  -d '{"tag": "featured"}'
```
Expected response:
```json
{
  "message": "Tag added",
  "modified": 1
}
```

Try adding the same tag again - modifiedCount should be 0:
```bash
curl -X POST http://localhost:3000/products/<PRODUCT_ID>/tags \
  -H "Content-Type: application/json" \
  -d '{"tag": "featured"}'
```
Expected response:
```json
{
  "message": "Tag added",
  "modified": 0
}
```

**5. Test Delete Product (Step 3):**
```bash
curl -X DELETE http://localhost:3000/products/<PRODUCT_ID>
```
Expected response:
```json
{
  "message": "Product deleted successfully",
  "deletedCount": 1
}
```

Test with non-existent ID:
```bash
curl -X DELETE http://localhost:3000/products/507f1f77bcf86cd799439011
```
Expected response (404):
```json
{
  "message": "Product not found"
}
```

---

## 🐛 Troubleshooting

**Problem:** "MongoServerError: connect ECONNREFUSED"
**Solution:** Make sure MongoDB is running with `mongod` command

**Problem:** "Cannot read property 'matchedCount' of undefined"
**Solution:** Ensure you're storing the result of `updateOne()` in a variable

**Problem:** "modifiedCount is 0 even though I updated"
**Solution:** If the values are already the same, MongoDB won't modify the document

**Problem:** "Tag is being added multiple times"
**Solution:** Make sure you're using `$addToSet` instead of `$push`

**Problem:** All tests return 404
**Solution:** Re-seed the database - you may have deleted all products

---

## 💡 Key Concepts Review

### Update Operators
- **`$set`**: Sets the value of a field (creates it if it doesn't exist)
- **`$addToSet`**: Adds value to array only if it doesn't already exist
- **`$push`**: Adds value to array (allows duplicates)
- **`$inc`**: Increments a numeric field
- **`$unset`**: Removes a field from a document

### Operation Results
- **`matchedCount`**: Number of documents that matched the filter
- **`modifiedCount`**: Number of documents actually modified
- **`deletedCount`**: Number of documents deleted

### Why matchedCount ≠ modifiedCount?
A document can match the filter but not be modified if:
- The new values are identical to the existing values
- Using `$addToSet` with a value that already exists in the array
- The update operator doesn't result in any changes

---

## 🔍 What's Next?

After completing this exercise, you'll understand:
- How to update specific fields without affecting others using `$set`
- The difference between `$push` and `$addToSet` for arrays
- How to safely delete documents with `deleteOne()`
- How to interpret operation result counts
- Best practices for updating and deleting data

Next, you'll learn about:
- Advanced MongoDB queries with filtering and sorting
- Aggregation pipelines for complex data transformations
- Indexing for query performance
- Transactions for multi-document operations

---

## 📚 Additional Resources

- [MongoDB CRUD Operations](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/) - Complete CRUD guide
- [Update Operators](https://www.mongodb.com/docs/manual/reference/operator/update/) - All update operators reference
- [Delete Operations](https://www.mongodb.com/docs/manual/tutorial/remove-documents/) - Delete operations guide
- [Working with Arrays](https://www.mongodb.com/docs/manual/tutorial/update-documents-with-aggregation-pipeline/#std-label-update-documents-with-aggregation-pipeline) - Array manipulation patterns
- [MongoDB Node.js Driver API](https://mongodb.github.io/node-mongodb-native/6.3/) - Complete driver API reference
