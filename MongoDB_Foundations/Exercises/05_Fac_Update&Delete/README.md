# Introduction to MongoDB Update and Delete Operations

## 🎯 Learning Objectives
By the end of this activity, you will understand:
- How to update single and multiple documents in MongoDB
- The difference between `updateOne()`, `updateMany()`, and `replaceOne()`
- How to use MongoDB update operators like `$set`, `$inc`, `$push`, and `$pull`
- How to delete documents using `deleteOne()` and `deleteMany()`
- Best practices for updating and deleting data safely
- How to return updated/deleted documents to verify operations

## 🤔 What Are Update and Delete Operations?

In MongoDB, **update operations** modify existing documents in a collection, while **delete operations** remove documents. Unlike SQL databases where you might UPDATE or DELETE rows in a table, MongoDB provides flexible methods that can target specific fields within documents or remove entire documents based on filter criteria.

Think of it like editing a digital notebook:
- **Update** is like crossing out a word and writing a new one, or adding a sticky note to a page
- **Delete** is like tearing out pages you no longer need

These operations are fundamental to maintaining data accuracy and managing your application's state over time.

## 🔧 Key Concepts

### 1. Update Operations Overview

MongoDB provides three main methods for updating documents:

**`updateOne(filter, update, options)`**
- Updates the **first document** that matches the filter
- Returns information about the operation (matched count, modified count)
- Use when you want to update a single, specific document

**`updateMany(filter, update, options)`**
- Updates **all documents** that match the filter
- Useful for bulk updates across multiple records
- Returns counts of matched and modified documents

**`replaceOne(filter, replacement, options)`**
- Completely **replaces** a document with a new one
- The `_id` field remains unchanged
- Use sparingly—typically `updateOne` with `$set` is safer

### 2. Update Operators

MongoDB uses special operators to modify fields without replacing entire documents:

| Operator | Purpose | Example |
|----------|---------|---------|
| `$set` | Set field value | `{ $set: { price: 29.99 } }` |
| `$unset` | Remove field | `{ $unset: { oldField: "" } }` |
| `$inc` | Increment number | `{ $inc: { stock: -1 } }` |
| `$push` | Add to array | `{ $push: { tags: "new" } }` |
| `$pull` | Remove from array | `{ $pull: { tags: "old" } }` |
| `$addToSet` | Add unique to array | `{ $addToSet: { tags: "unique" } }` |
| `$rename` | Rename field | `{ $rename: { oldName: "newName" } }` |

**Why use operators?** They allow surgical updates to specific fields without affecting the rest of the document, which is both safer and more efficient.

### 3. Delete Operations Overview

**`deleteOne(filter, options)`**
- Deletes the **first document** that matches the filter
- Returns the count of deleted documents (0 or 1)
- Safe for removing specific records

**`deleteMany(filter, options)`**
- Deletes **all documents** that match the filter
- Can remove many documents in one operation
- ⚠️ **Use carefully**—can delete more than intended!

**Empty filter `{}` danger:** Using `deleteMany({})` deletes ALL documents in the collection!

### 4. Return Options

Both update and delete operations have useful return options:

**`findOneAndUpdate(filter, update, options)`**
- Updates a document **and** returns it
- Options: `{ returnDocument: 'after' }` returns the updated version
- Useful when you need to see the result immediately

**`findOneAndDelete(filter, options)`**
- Deletes a document **and** returns the deleted document
- Helpful for logging or confirming what was removed

## 📊 Update Methods Comparison

### Before vs After: Traditional vs MongoDB Updates

**Traditional SQL Approach:**
```sql
-- Update entire row
UPDATE products 
SET name = 'New Name', price = 99.99, stock = 50 
WHERE id = 123;

-- Must specify all fields or risk losing data
```

**MongoDB Approach with $set:**
```javascript
// Update only specific fields
await collection.updateOne(
  { _id: new ObjectId(id) },
  { $set: { price: 99.99 } }  // Only price changes
);

// Other fields remain untouched
```

The MongoDB approach is more flexible and safer—you modify only what you intend to change.

## 🛠️ Common Patterns and Examples

### Pattern 1: Update a Single Field

```javascript
// Update the price of a specific product
app.put('/products/:id/price', async (req, res) => {
  const db = await connect();
  const { price } = req.body;
  
  const result = await db.collection('products').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { price: price, updatedAt: new Date() } }
  );
  
  res.json({ 
    matched: result.matchedCount,
    modified: result.modifiedCount 
  });
});
```

**What's happening:**
- Filter finds the product by ID
- `$set` updates only the price and updatedAt fields
- Returns counts to confirm the operation

### Pattern 2: Increment/Decrement Values

```javascript
// Decrease stock when item is purchased
app.post('/products/:id/purchase', async (req, res) => {
  const db = await connect();
  const { quantity } = req.body;
  
  const result = await db.collection('products').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $inc: { stock: -quantity } }  // Decrements stock
  );
  
  res.json({ success: result.modifiedCount > 0 });
});
```

**Why `$inc`?**
- Atomic operation—no race conditions
- Cleaner than fetching, calculating, and re-saving
- Works with negative numbers for decrement

### Pattern 3: Array Manipulation

```javascript
// Add a tag to a product
app.post('/products/:id/tags', async (req, res) => {
  const db = await connect();
  const { tag } = req.body;
  
  const result = await db.collection('products').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $addToSet: { tags: tag } }  // Only adds if not present
  );
  
  res.json({ modified: result.modifiedCount });
});

// Remove a tag from a product
app.delete('/products/:id/tags/:tag', async (req, res) => {
  const db = await connect();
  
  const result = await db.collection('products').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $pull: { tags: req.params.tag } }  // Removes all instances
  );
  
  res.json({ modified: result.modifiedCount });
});
```

**Array operators:**
- `$push`: Always adds (allows duplicates)
- `$addToSet`: Adds only if value doesn't exist
- `$pull`: Removes all matching values

### Pattern 4: Update and Return Document

```javascript
// Update product and return the updated version
app.put('/products/:id', async (req, res) => {
  const db = await connect();
  const { name, price, stock } = req.body;
  
  const updated = await db.collection('products').findOneAndUpdate(
    { _id: new ObjectId(req.params.id) },
    { $set: { name, price, stock, updatedAt: new Date() } },
    { returnDocument: 'after' }  // Return updated document
  );
  
  if (!updated) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  res.json(updated);
});
```

**Why use `findOneAndUpdate`?**
- Single database round-trip
- Immediately see the updated data
- Useful for APIs that need to return the modified resource

### Pattern 5: Delete Single Document

```javascript
// Delete a specific product
app.delete('/products/:id', async (req, res) => {
  const db = await connect();
  
  const result = await db.collection('products').deleteOne(
    { _id: new ObjectId(req.params.id) }
  );
  
  if (result.deletedCount === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  res.json({ message: 'Product deleted', deletedCount: 1 });
});
```

### Pattern 6: Bulk Delete with Criteria

```javascript
// Delete all out-of-stock products
app.delete('/products/cleanup/out-of-stock', async (req, res) => {
  const db = await connect();
  
  const result = await db.collection('products').deleteMany(
    { stock: 0 }  // Filter for out-of-stock items
  );
  
  res.json({ 
    message: `Deleted ${result.deletedCount} out-of-stock products`,
    deletedCount: result.deletedCount 
  });
});
```

**⚠️ Caution:** Always test your filter! A mistake could delete important data.

## ⚠️ Common Mistakes

### Mistake 1: Forgetting the Update Operator

```javascript
// ❌ WRONG - This will fail
await collection.updateOne(
  { _id: id },
  { price: 99.99 }  // Missing $set operator
);

// ✅ CORRECT
await collection.updateOne(
  { _id: id },
  { $set: { price: 99.99 } }
);
```

**Why it matters:** MongoDB requires update operators to know what kind of modification to make.

### Mistake 2: Using replaceOne Instead of updateOne

```javascript
// ❌ WRONG - Replaces entire document, losing other fields
await collection.replaceOne(
  { _id: id },
  { price: 99.99 }  // Now document only has _id and price!
);

// ✅ CORRECT - Updates only specified fields
await collection.updateOne(
  { _id: id },
  { $set: { price: 99.99 } }
);
```

### Mistake 3: Deleting Without Proper Filter

```javascript
// ❌ DANGER - Deletes ALL documents!
await collection.deleteMany({});

// ✅ CORRECT - Specific filter
await collection.deleteMany({ status: 'archived' });
```

**Best practice:** Always use specific filters and test on sample data first.

### Mistake 4: Not Checking Operation Results

```javascript
// ❌ WRONG - Assumes success without checking
await collection.updateOne({ _id: id }, { $set: { price: 99.99 } });
res.json({ message: 'Updated' });  // Was it really?

// ✅ CORRECT - Verify the operation
const result = await collection.updateOne(
  { _id: id }, 
  { $set: { price: 99.99 } }
);

if (result.matchedCount === 0) {
  return res.status(404).json({ message: 'Not found' });
}

res.json({ message: 'Updated', modified: result.modifiedCount });
```

## 🎯 When to Use Each Operation

### Use `updateOne()` when:
- ✅ Updating a specific document by ID
- ✅ Changing one or a few fields
- ✅ You need to know if the update succeeded

### Use `updateMany()` when:
- ✅ Bulk updates across multiple documents
- ✅ Applying the same change to many records (e.g., price increase)
- ✅ You have a clear filter that targets the right documents

### Use `findOneAndUpdate()` when:
- ✅ You need the updated document immediately
- ✅ Building APIs that return the modified resource
- ✅ Implementing optimistic locking patterns

### Use `deleteOne()` when:
- ✅ Removing a specific document by ID
- ✅ You want to ensure only one document is deleted
- ✅ Safety is a priority

### Use `deleteMany()` when:
- ✅ Cleaning up multiple documents matching criteria
- ✅ Bulk deletions (e.g., clearing old logs)
- ⚠️ **Always** test your filter first!

## 💡 Best Practices

1. **Always use update operators** (`$set`, `$inc`, etc.) rather than replacement
2. **Check operation results** (matchedCount, modifiedCount, deletedCount)
3. **Use `findOneAndUpdate/Delete`** when you need the document returned
4. **Add `updatedAt` timestamps** to track when documents change
5. **Test delete filters carefully** before running in production
6. **Use specific filters** instead of broad ones
7. **Consider soft deletes** (setting a `deleted: true` flag) for important data
8. **Validate input** before updating to prevent invalid data

## 🔍 What's Next?

Now that you understand update and delete operations, you're ready to:
- Practice these operations in a hands-on lab
- Learn about MongoDB aggregation for complex queries
- Explore transactions for multi-document operations
- Implement complete CRUD APIs with proper error handling

## 📚 MongoDB Documentation

- [updateOne()](https://www.mongodb.com/docs/drivers/node/current/usage-examples/updateOne/) - Update single document
- [updateMany()](https://www.mongodb.com/docs/drivers/node/current/usage-examples/updateMany/) - Update multiple documents
- [Update Operators](https://www.mongodb.com/docs/manual/reference/operator/update/) - Complete operator reference
- [deleteOne()](https://www.mongodb.com/docs/drivers/node/current/usage-examples/deleteOne/) - Delete single document
- [deleteMany()](https://www.mongodb.com/docs/drivers/node/current/usage-examples/deleteMany/) - Delete multiple documents
- [findOneAndUpdate()](https://www.mongodb.com/docs/drivers/node/current/usage-examples/findOneAndUpdate/) - Update and return document
- [findOneAndDelete()](https://www.mongodb.com/docs/drivers/node/current/usage-examples/findOneAndDelete/) - Delete and return document
