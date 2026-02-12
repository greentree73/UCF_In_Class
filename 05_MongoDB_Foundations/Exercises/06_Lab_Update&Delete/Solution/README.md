# 🎯 Lab Solution: MongoDB Update & Delete Operations

## Solution Overview

This solution demonstrates how to implement MongoDB update and delete operations using the Node.js driver. The implementation shows proper patterns for updating specific fields, managing arrays, and safely deleting documents.

## 🔧 Key Implementation Details

### Activity 1 Solution: Update Product Price and Stock

**Approach:** Use `updateOne()` with the `$set` operator to modify specific fields without affecting other document data.

**Code Implementation:**
```typescript
app.put('/products/:id', async (req, res) => {
  try {
    // Connect to the database using the connect() function
    const db = await connect();
    
    // Get the 'id' parameter from the request URL
    const id = req.params.id;
    
    // Get the 'price' and 'stock' from the request body
    const { price, stock } = req.body;
    
    // Use updateOne() to update the product
    const result = await db.collection('products').updateOne(
      { _id: new ObjectId(id) },  // Filter: find by ID
      { 
        $set: {  // $set operator: update only specified fields
          price, 
          stock,
          updatedAt: new Date()  // Add timestamp
        } 
      }
    );
    
    // Check if a document was matched
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Send response with operation counts
    res.json({ 
      message: 'Product updated',
      matched: result.matchedCount,
      modified: result.modifiedCount
    });
    
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error updating product' });
  }
});
```

**Key Concepts:**
- **`updateOne(filter, update)`**: Updates the first document matching the filter
- **`$set` Operator**: Only modifies specified fields, leaving others unchanged
- **`matchedCount`**: Indicates if a document was found (0 or 1)
- **`modifiedCount`**: Indicates if changes were made (0 if values unchanged)
- **`updatedAt` Field**: Best practice to track when modifications occur
- **404 Response**: Returns appropriate status when document doesn't exist

---

### Activity 2 Solution: Add Tag to Product

**Approach:** Use `updateOne()` with the `$addToSet` operator to add unique values to an array.

**Code Implementation:**
```typescript
app.post('/products/:id/tags', async (req, res) => {
  try {
    // Connect to the database
    const db = await connect();
    
    // Get the 'id' parameter from the URL
    const id = req.params.id;
    
    // Get the 'tag' from the request body
    const { tag } = req.body;
    
    // Use updateOne() with $addToSet operator
    const result = await db.collection('products').updateOne(
      { _id: new ObjectId(id) },
      { $addToSet: { tags: tag } }  // Only adds if not present
    );
    
    // Check if the product was found
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Send response
    res.json({ 
      message: 'Tag added',
      modified: result.modifiedCount  // Will be 0 if tag existed
    });
    
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error adding tag' });
  }
});
```

**Key Concepts:**
- **`$addToSet` Operator**: Adds value to array only if it doesn't already exist
- **Duplicate Prevention**: Automatically prevents duplicate tags
- **`modifiedCount = 0`**: Indicates tag already existed in array
- **Array Management**: No need to fetch, modify, and re-save the document

**Why `$addToSet` instead of `$push`?**
- `$push` always adds to array (allows duplicates)
- `$addToSet` ensures uniqueness automatically
- More efficient than manual duplicate checking

---

### Activity 3 Solution: Delete Product

**Approach:** Use `deleteOne()` to remove a single document by its ObjectId.

**Code Implementation:**
```typescript
app.delete('/products/:id', async (req, res) => {
  try {
    // Connect to the database
    const db = await connect();
    
    // Get the 'id' parameter from the URL
    const id = req.params.id;
    
    // Use deleteOne() to remove the product
    const result = await db.collection('products').deleteOne(
      { _id: new ObjectId(id) }
    );
    
    // Check if a document was deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Send success response
    res.json({ 
      message: 'Product deleted successfully',
      deletedCount: result.deletedCount
    });
    
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error deleting product' });
  }
});
```

**Key Concepts:**
- **`deleteOne(filter)`**: Removes first document matching the filter
- **`deletedCount`**: Returns 0 or 1 (number of documents deleted)
- **Safety**: Only deletes one document even if filter matches multiple
- **404 Handling**: Appropriate response when document doesn't exist

---

## 💡 Learning Points

### 1. Update Operations Best Practices

**Always use update operators:**
```typescript
// ❌ WRONG - Will fail
updateOne({ _id: id }, { price: 99.99 })

// ✅ CORRECT - Use $set operator
updateOne({ _id: id }, { $set: { price: 99.99 } })
```

**Add timestamps:**
```typescript
{ $set: { field: value, updatedAt: new Date() } }
```

### 2. Understanding Operation Results

**matchedCount vs modifiedCount:**
- **matchedCount**: How many documents matched the filter
- **modifiedCount**: How many were actually changed

**When matchedCount = 1 but modifiedCount = 0:**
- Document was found but values were already the same
- Using `$addToSet` with existing value
- No actual changes needed

### 3. Array Operations

**Choosing the right operator:**
```typescript
// Add unique values only
{ $addToSet: { tags: 'featured' } }

// Add even if duplicate
{ $push: { tags: 'featured' } }

// Remove all instances
{ $pull: { tags: 'featured' } }
```

### 4. Error Handling Patterns

**Check operation results:**
```typescript
if (result.matchedCount === 0) {
  return res.status(404).json({ message: 'Not found' });
}
```

**Different error codes for different scenarios:**
- **404**: Document not found
- **400**: Bad request (invalid ObjectId, validation errors)
- **500**: Server/database errors

---

## 🧪 Testing the Solution

### 1. Seed the Database
```bash
curl -X POST http://localhost:3000/products/seed
```

### 2. Get Products and Copy an ID
```bash
curl http://localhost:3000/products
```

### 3. Test Update Product
```bash
curl -X PUT http://localhost:3000/products/<PRODUCT_ID> \
  -H "Content-Type: application/json" \
  -d '{"price": 99.99, "stock": 50}'
```

**Expected Response:**
```json
{
  "message": "Product updated",
  "matched": 1,
  "modified": 1
}
```

### 4. Test Add Tag
```bash
curl -X POST http://localhost:3000/products/<PRODUCT_ID>/tags \
  -H "Content-Type: application/json" \
  -d '{"tag": "featured"}'
```

**Expected Response (first time):**
```json
{
  "message": "Tag added",
  "modified": 1
}
```

**Expected Response (duplicate):**
```json
{
  "message": "Tag added",
  "modified": 0
}
```

### 5. Test Delete Product
```bash
curl -X DELETE http://localhost:3000/products/<PRODUCT_ID>
```

**Expected Response:**
```json
{
  "message": "Product deleted successfully",
  "deletedCount": 1
}
```

---

## 🚀 Best Practices Demonstrated

1. **Use Update Operators**: Always use `$set`, `$addToSet`, etc. instead of replacement
2. **Validate Results**: Check `matchedCount` and `deletedCount` before responding
3. **Appropriate Status Codes**: 404 for not found, 400 for bad requests
4. **Timestamp Tracking**: Add `updatedAt` field on modifications
5. **Array Management**: Use `$addToSet` for unique values
6. **Error Handling**: Comprehensive try/catch blocks
7. **Type Safety**: Use `ObjectId` for MongoDB IDs
8. **Response Clarity**: Include operation counts in responses

---

## 📚 MongoDB Operations Summary

### Update Operations
| Method | Purpose | When to Use |
|--------|---------|-------------|
| `updateOne()` | Update single document | Modify specific record by ID |
| `updateMany()` | Update multiple documents | Bulk updates across many records |
| `findOneAndUpdate()` | Update and return document | Need updated document immediately |

### Update Operators
| Operator | Purpose | Example |
|----------|---------|---------|
| `$set` | Set field value | `{ $set: { price: 99.99 } }` |
| `$addToSet` | Add unique to array | `{ $addToSet: { tags: 'new' } }` |
| `$push` | Add to array (allows duplicates) | `{ $push: { items: item } }` |
| `$pull` | Remove from array | `{ $pull: { tags: 'old' } }` |
| `$inc` | Increment number | `{ $inc: { stock: -1 } }` |

### Delete Operations
| Method | Purpose | When to Use |
|--------|---------|-------------|
| `deleteOne()` | Delete single document | Remove specific record safely |
| `deleteMany()` | Delete multiple documents | Bulk deletions with filter |
| `findOneAndDelete()` | Delete and return document | Need deleted document data |

---

## 🎓 What You've Learned

After reviewing this solution, you should understand:
- ✅ How to use `updateOne()` with the `$set` operator
- ✅ The difference between `$push` and `$addToSet` for arrays
- ✅ Why `matchedCount` can differ from `modifiedCount`
- ✅ How to safely delete documents with `deleteOne()`
- ✅ Proper error handling for update/delete operations
- ✅ When to return 404 vs 400 status codes
- ✅ Best practices for tracking document changes
- ✅ How to interpret MongoDB operation results

---

## 📚 Additional Resources

- [MongoDB Update Operations](https://www.mongodb.com/docs/manual/tutorial/update-documents/) - Official update guide
- [Update Operators Reference](https://www.mongodb.com/docs/manual/reference/operator/update/) - Complete operator list
- [Delete Operations](https://www.mongodb.com/docs/manual/tutorial/remove-documents/) - Delete operations guide
- [Array Update Operators](https://www.mongodb.com/docs/manual/reference/operator/update-array/) - Working with arrays
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/6.3/) - Complete driver API

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
