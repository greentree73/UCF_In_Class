# Lab Solution: Working with MongoDB Embedded Documents

## 🎯 Solution Overview

This solution demonstrates three essential patterns for working with embedded documents in MongoDB:

1. **Updating embedded subdocuments** - Replacing entire nested objects
2. **Removing from embedded arrays** - Using `$pull` to delete array elements
3. **Querying embedded fields** - Using dot notation to access nested data

## 📚 Learning Outcomes

By reviewing this solution, you should understand:
- How to use `$set` to update entire embedded subdocuments
- How to use `$pull` to remove elements from embedded arrays
- How to query nested fields using dot notation
- Proper error handling for embedded document operations
- When to use `matchedCount` vs `modifiedCount`

---

## 💡 Activity 1 Solution: Update Manufacturer Subdocument

### Route Implementation
```typescript
app.put('/products/:id/manufacturer', async (req, res) => {
  try {
    const db = await connect();
    const id = req.params.id;
    const { name, location, website, founded } = req.body;

    // Use updateOne with $set to replace the entire manufacturer subdocument
    const result = await db.collection('products').updateOne(
      { _id: new ObjectId(id) },  // Filter: find product by ID
      { 
        $set: { 
          manufacturer: {  // Replace entire manufacturer object
            name,
            location,
            website,
            founded
          }
        } 
      }
    );

    // Check if the product was found
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ 
      message: 'Manufacturer updated',
      modified: result.modifiedCount
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error updating manufacturer' });
  }
});
```

### Key Concepts

**$set Operator:**
- Updates or creates the specified fields
- Replaces the entire manufacturer object when you set it as a whole
- Leaves other product fields untouched

**Alternative Approach - Update Single Field:**
```typescript
// If you only wanted to update the location:
{ $set: { "manufacturer.location": "New Location" } }
```

**Result Properties:**
- `matchedCount`: Number of documents that matched the filter (0 or 1)
- `modifiedCount`: Number of documents actually modified (0 if data unchanged)

### Testing

```bash
# Get a product ID first
PRODUCT_ID=$(curl -s http://localhost:3000/products | jq -r '.[0]._id')

# Update the manufacturer
curl -X PUT http://localhost:3000/products/$PRODUCT_ID/manufacturer \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "NewTech Industries",
    "location": "Denver, CO",
    "website": "newtech.io",
    "founded": 2022
  }'

# Response:
# {"message":"Manufacturer updated","modified":1}

# Verify the update
curl http://localhost:3000/products/$PRODUCT_ID | jq '.manufacturer'
```

---

## 💡 Activity 2 Solution: Delete Review from Array

### Route Implementation

```typescript
app.delete('/products/:id/reviews/:reviewer', async (req, res) => {
  try {
    const db = await connect();
    const id = req.params.id;
    const reviewer = req.params.reviewer;

    // Use updateOne with $pull to remove matching reviews
    const result = await db.collection('products').updateOne(
      { _id: new ObjectId(id) },  // Filter: find product by ID
      { 
        $pull: { 
          reviews: { reviewer: reviewer }  // Remove reviews matching this reviewer
        } 
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ 
      message: `Review by ${reviewer} removed`,
      modified: result.modifiedCount
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error deleting review' });
  }
});
```

### Key Concepts

**$pull Operator:**
- Removes **all** array elements that match the condition
- Works with both simple values and complex object matching
- If no elements match, `modifiedCount` will be 0

**Array Element Matching:**
```typescript
// Simple value (removing from tags array):
{ $pull: { tags: "wireless" } }

// Object matching (what we use here):
{ $pull: { reviews: { reviewer: "alice" } } }

// Complex condition:
{ $pull: { reviews: { rating: { $lt: 3 } } } }  // Remove low-rated reviews
```

**Important Notes:**
- `$pull` removes ALL matching elements (if multiple reviews by same reviewer)
- `modifiedCount` is 0 if the reviewer has no reviews on this product
- The product itself is not deleted, only the array elements

### Testing

```bash
# Delete alice's review
curl -X DELETE http://localhost:3000/products/$PRODUCT_ID/reviews/alice

# Response:
# {"message":"Review by alice removed","modified":1}

# Verify the review is gone
curl http://localhost:3000/products/$PRODUCT_ID | jq '.reviews'

# Try deleting non-existent reviewer (will still return 200 but modified=0)
curl -X DELETE http://localhost:3000/products/$PRODUCT_ID/reviews/nonexistent
# {"message":"Review by nonexistent removed","modified":0}
```

---

## 💡 Activity 3 Solution: Query by Manufacturer Name

### Route Implementation

```typescript
app.get('/products/manufacturer/:name', async (req, res) => {
  try {
    const db = await connect();
    const manufacturerName = req.params.name;

    // Use find() with dot notation to query embedded fields
    const products = await db.collection('products').find({
      "manufacturer.name": manufacturerName  // Query nested field
    }).toArray();

    res.json({ 
      manufacturer: manufacturerName,
      count: products.length,
      products 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error querying products' });
  }
});
```

### Key Concepts

**Dot Notation:**
- Access nested fields using dots: `"parent.child"`
- **Quotes are required** around field paths containing dots
- Works for both queries and updates

**Query Examples:**
```typescript
// Query manufacturer name (what we use):
{ "manufacturer.name": "TechCorp" }

// Query manufacturer location:
{ "manufacturer.location": "San Francisco, CA" }

// Query specs field:
{ "specs.dpi": "1600" }

// Query review rating (matches if ANY review has rating 5):
{ "reviews.rating": 5 }

// Multiple nested levels:
{ "manufacturer.contact.email": "info@techcorp.com" }
```

**Without Quotes (Common Mistake):**
```typescript
// ❌ WRONG - This will fail
{ manufacturer.name: "TechCorp" }  // Syntax error

// ✅ CORRECT
{ "manufacturer.name": "TechCorp" }
```

### Testing

```bash
# Find all products by TechCorp
curl http://localhost:3000/products/manufacturer/TechCorp

# Response:
# {
#   "manufacturer": "TechCorp",
#   "count": 1,
#   "products": [ /* array of matching products */ ]
# }

# Find all products by GameGear
curl http://localhost:3000/products/manufacturer/GameGear

# Non-existent manufacturer (returns empty array)
curl http://localhost:3000/products/manufacturer/NonExistent
# {"manufacturer":"NonExistent","count":0,"products":[]}
```

---

## 🔧 Complete Testing Workflow

### 1. Start the Server

```bash
npm install
npm run dev
```

### 2. Seed the Database

```bash
curl -X POST http://localhost:3000/products/seed
```

### 3. Get a Product ID

```bash
# Store product ID for testing
export PRODUCT_ID=$(curl -s http://localhost:3000/products | jq -r '.[0]._id')
echo $PRODUCT_ID
```

### 4. Test All Three Activities

```bash
# Activity 1: Update manufacturer
curl -X PUT http://localhost:3000/products/$PRODUCT_ID/manufacturer \\
  -H "Content-Type: application/json" \\
  -d '{"name":"UpdatedCorp","location":"Boston, MA","website":"updated.com","founded":2023}'

# Activity 2: Delete a review
curl -X DELETE http://localhost:3000/products/$PRODUCT_ID/reviews/alice

# Activity 3: Query by manufacturer
curl http://localhost:3000/products/manufacturer/GameGear
```

### 5. Verify Changes

```bash
# Check the updated product
curl http://localhost:3000/products/$PRODUCT_ID | jq '.'

# Check manufacturer was updated
curl http://localhost:3000/products/$PRODUCT_ID | jq '.manufacturer'

# Check reviews array (alice's review should be gone)
curl http://localhost:3000/products/$PRODUCT_ID | jq '.reviews'
```

---

## 🎓 Advanced Patterns

### Pattern 1: Update Single Nested Field

Instead of replacing the entire manufacturer, update just one field:

```typescript
// Update only the location field
await db.collection('products').updateOne(
  { _id: new ObjectId(id) },
  { $set: { "manufacturer.location": "New York, NY" } }
);
```

### Pattern 2: Conditional Pull with Complex Criteria

Remove reviews based on multiple conditions:

```typescript
// Remove unverified low-rated reviews
await db.collection('products').updateOne(
  { _id: new ObjectId(id) },
  { 
    $pull: { 
      reviews: { 
        rating: { $lt: 3 },
        verified: false
      } 
    } 
  }
);
```

### Pattern 3: Query Multiple Nested Fields

Combine multiple dot notation queries:

```typescript
// Find expensive TechCorp products
await db.collection('products').find({
  "manufacturer.name": "TechCorp",
  "price": { $gt: 50 }
}).toArray();
```

### Pattern 4: Update Array Element by Position

Update a specific review using the positional `$` operator:

```typescript
// Mark alice's review as verified
await db.collection('products').updateOne(
  { 
    _id: new ObjectId(id),
    "reviews.reviewer": "alice"  // Must query array to use $
  },
  { 
    $set: { 
      "reviews.$.verified": true  // $ refers to matched element
    } 
  }
);
```

---

## ⚠️ Common Pitfalls & Solutions

### Pitfall 1: Forgetting Quotes in Dot Notation

```typescript
// ❌ WRONG - Syntax error
{ manufacturer.name: "TechCorp" }

// ✅ CORRECT
{ "manufacturer.name": "TechCorp" }
```

### Pitfall 2: Replacing vs Updating

```typescript
// ❌ LOSES OTHER FIELDS - This removes location, website, founded
{ $set: { manufacturer: { name: "NewCorp" } } }

// ✅ UPDATES ONE FIELD - Other fields remain
{ $set: { "manufacturer.name": "NewCorp" } }

// ✅ REPLACES ENTIRE OBJECT - Explicitly set all fields
{ $set: { manufacturer: { name, location, website, founded } } }
```

### Pitfall 3: Not Checking matchedCount

```typescript
// ❌ Doesn't handle missing product
const result = await db.collection('products').updateOne(/*...*/);
res.json({ modified: result.modifiedCount });

// ✅ Proper error handling
if (result.matchedCount === 0) {
  return res.status(404).json({ message: 'Product not found' });
}
```

### Pitfall 4: $pull with Wrong Condition

```typescript
// ❌ WRONG - This tries to match entire review object
{ $pull: { reviews: reviewer } }

// ✅ CORRECT - Match the reviewer field within review objects
{ $pull: { reviews: { reviewer: reviewer } } }
```

---

## 📊 Understanding Update Results

### UpdateResult Properties

```typescript
{
  acknowledged: true,      // Operation was acknowledged by server
  matchedCount: 1,         // Number of documents matching the filter
  modifiedCount: 1,        // Number of documents actually modified
  upsertedCount: 0,        // Number of documents inserted (with upsert)
  upsertedId: null        // _id of upserted document
}
```

### When modifiedCount is 0

```typescript
// Scenario 1: Product not found
matchedCount: 0, modifiedCount: 0  // Return 404

// Scenario 2: Data unchanged
matchedCount: 1, modifiedCount: 0  // Data was identical, still success

// Scenario 3: Reviewer not in array
matchedCount: 1, modifiedCount: 0  // No matching review to pull
```

---

## 🔍 MongoDB Documentation References

### Operations Used
- [updateOne()](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne/)
- [find()](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/)
- [$set operator](https://www.mongodb.com/docs/manual/reference/operator/update/set/)
- [$pull operator](https://www.mongodb.com/docs/manual/reference/operator/update/pull/)

### Concepts
- [Dot Notation](https://www.mongodb.com/docs/manual/core/document/#dot-notation)
- [Update Embedded Documents](https://www.mongodb.com/docs/manual/tutorial/update-documents/#update-embedded-documents)
- [Query Embedded Documents](https://www.mongodb.com/docs/manual/tutorial/query-embedded-documents/)
- [Positional $ Operator](https://www.mongodb.com/docs/manual/reference/operator/update/positional/)

---

## ✅ Solution Checklist

- [x] Activity 1: Update manufacturer subdocument with `$set`
- [x] Activity 2: Delete review from array with `$pull`
- [x] Activity 3: Query by embedded field using dot notation
- [x] Proper error handling (404 for not found)
- [x] Return appropriate status codes
- [x] Include helpful response messages
- [x] Check `matchedCount` before returning success
- [x] Use meaningful variable names
- [x] Add explanatory comments

---

## 🚀 Next Steps

After understanding this solution, explore:

1. **Aggregation Pipeline** - Complex queries with `$match`, `$project`, `$unwind`
2. **Array Operators** - `$push`, `$addToSet`, `$pop`, `$slice`
3. **Positional Operators** - Update specific array elements with `$`, `$[]`, `$[<identifier>]`
4. **Indexing Embedded Fields** - Create indexes on `"manufacturer.name"` for faster queries
5. **Validation** - Use JSON Schema to enforce embedded document structure
