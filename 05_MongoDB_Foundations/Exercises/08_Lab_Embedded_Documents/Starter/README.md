# Lab: Working with MongoDB Embedded Documents

## 🎯 Goal

Build hands-on experience querying and updating embedded documents in MongoDB. You'll implement three routes that demonstrate key patterns for working with nested data structures.

## 📝 User Story

```
AS A backend developer working with MongoDB
I WANT to query and update embedded subdocuments within products
SO THAT I can efficiently manage complex nested data structures
```

## 🏗️ What You'll Build

You'll complete three routes in a product management API:

1. **Update Manufacturer** - Modify an embedded subdocument
2. **Delete Review** - Remove an item from an embedded array
3. **Query by Manufacturer** - Find products using dot notation on nested fields

### Product Document Structure

Each product contains embedded documents:

```javascript
{
  _id: ObjectId("..."),
  name: "Wireless Mouse",
  description: "Ergonomic wireless mouse",
  price: 24.99,
  category: "Electronics",
  stock: 150,
  tags: ["wireless", "mouse", "ergonomic"],
  
  // Embedded subdocument (single object)
  manufacturer: {
    name: "TechCorp",
    location: "San Francisco, CA",
    website: "techcorp.com",
    founded: 2010
  },
  
  // Embedded subdocument (single object)
  specs: {
    dpi: "1600",
    buttons: 5,
    battery: "AA",
    connectivity: "USB 2.4GHz"
  },
  
  // Embedded array of subdocuments
  reviews: [
    {
      rating: 5,
      comment: "Very comfortable!",
      reviewer: "alice",
      verified: true,
      date: ISODate("2026-01-10")
    }
  ],
  
  createdAt: ISODate("2026-02-07")
}
```

## 🚀 Getting Started

### 1. Setup MongoDB and Dependencies

```bash
# Make sure MongoDB is running
# Install dependencies
npm install

# Start the development server
npm run dev
```

### 2. Seed the Database

```bash
# Create sample products with embedded documents
curl -X POST http://localhost:3000/products/seed
```

### 3. Verify Products Exist

```bash
# List all products
curl http://localhost:3000/products
```

## 📋 Activities

### Activity 1: Update Manufacturer Subdocument

**Route:** `PUT /products/:id/manufacturer`

**Goal:** Update the entire manufacturer embedded subdocument for a product.

**Your Task:**
- [ ] Use `updateOne()` to find the product by `_id`
- [ ] Use `$set` operator to replace the manufacturer object
- [ ] Set the manufacturer to the new object from request body `{ name, location, website, founded }`
- [ ] Check if product was found (`matchedCount === 0` means not found)
- [ ] Return success message with `modifiedCount`

**Request Body:**
```json
{
  "name": "NewTech Corp",
  "location": "Boston, MA",
  "website": "newtech.com",
  "founded": 2020
}
```

**Expected Response:**
```json
{
  "message": "Manufacturer updated",
  "modified": 1
}
```

**Testing:**
```bash
# First, get a product ID from the seed data
curl http://localhost:3000/products

# Update manufacturer (replace <product_id> with actual ID)
curl -X PUT http://localhost:3000/products/<product_id>/manufacturer \
  -H "Content-Type: application/json" \
  -d '{"name":"NewTech Corp","location":"Boston, MA","website":"newtech.com","founded":2020}'

# Verify the update
curl http://localhost:3000/products/<product_id>
```

**Hints:**
- 💡 Use `$set` to update embedded documents: `{ $set: { manufacturer: { ...newData } } }`
- 💡 This replaces the entire manufacturer object with the new one
- 💡 Check `result.matchedCount` to see if the product was found
- 💡 Return 404 if no product matched the ID

---

### Activity 2: Delete Review from Array

**Route:** `DELETE /products/:id/reviews/:reviewer`

**Goal:** Remove a specific review from a product's reviews array by matching the reviewer name.

**Your Task:**
- [ ] Use `updateOne()` to find the product by `_id`
- [ ] Use `$pull` operator to remove review(s) matching the reviewer
- [ ] Pull from the `reviews` array where `reviewer` matches the parameter
- [ ] Check if product was found (`matchedCount === 0` means not found)
- [ ] Return success message with `modifiedCount`

**Expected Response:**
```json
{
  "message": "Review by alice removed",
  "modified": 1
}
```

**Testing:**
```bash
# Delete alice's review (replace <product_id> with actual ID)
curl -X DELETE http://localhost:3000/products/<product_id>/reviews/alice

# Verify the review was removed
curl http://localhost:3000/products/<product_id>
```

**Hints:**
- 💡 Use `$pull` to remove from arrays: `{ $pull: { reviews: { reviewer: reviewerName } } }`
- 💡 `$pull` removes **all** array elements that match the condition
- 💡 The condition `{ reviewer: reviewerName }` matches any review object with that reviewer field
- 💡 `modifiedCount` will be 0 if the reviewer wasn't found in the array

---

### Activity 3: Query Products by Manufacturer Name

**Route:** `GET /products/manufacturer/:name`

**Goal:** Find all products made by a specific manufacturer using dot notation to query the embedded field.

**Your Task:**
- [ ] Use `find()` to query products collection
- [ ] Use **dot notation** to match `manufacturer.name` field
- [ ] Remember to put quotes around the field path: `"manufacturer.name"`
- [ ] Convert cursor to array with `.toArray()`
- [ ] Return products array with count

**Expected Response:**
```json
{
  "manufacturer": "TechCorp",
  "count": 2,
  "products": [
    { /* product 1 */ },
    { /* product 2 */ }
  ]
}
```

**Testing:**
```bash
# Find all products by TechCorp
curl http://localhost:3000/products/manufacturer/TechCorp

# Try another manufacturer
curl http://localhost:3000/products/manufacturer/GameGear
```

**Hints:**
- 💡 Use dot notation to access nested fields: `{ "manufacturer.name": manufacturerName }`
- 💡 **Quotes are required** around field paths containing dots
- 💡 This queries the `name` field inside the `manufacturer` subdocument
- 💡 Returns all products where the nested field matches

---

## ✅ Validation

After completing all three activities:

### Test Activity 1 (Update Manufacturer):
```bash
# Get a product ID
PRODUCT_ID=$(curl -s http://localhost:3000/products | jq -r '.[0]._id')

# Update the manufacturer
curl -X PUT http://localhost:3000/products/$PRODUCT_ID/manufacturer \
  -H "Content-Type: application/json" \
  -d '{"name":"UpdatedCorp","location":"Denver, CO","website":"updated.com","founded":2022}'

# Should see: {"message":"Manufacturer updated","modified":1}
```

### Test Activity 2 (Delete Review):
```bash
# Delete a review by reviewer name
curl -X DELETE http://localhost:3000/products/$PRODUCT_ID/reviews/alice

# Should see: {"message":"Review by alice removed","modified":1}

# Verify review is gone
curl http://localhost:3000/products/$PRODUCT_ID | jq '.reviews'
```

### Test Activity 3 (Query by Manufacturer):
```bash
# Query products by manufacturer
curl http://localhost:3000/products/manufacturer/TechCorp

# Should see: {"manufacturer":"TechCorp","count":N,"products":[...]}
```

## 🔍 Expected Results

When all activities are complete:

1. ✅ Updating manufacturer replaces the entire subdocument
2. ✅ Deleting reviews removes matching items from the array
3. ✅ Querying by manufacturer name returns all matching products
4. ✅ Proper error handling (404 for not found, 400 for invalid input)
5. ✅ All responses include appropriate status codes and messages

## 🐛 Troubleshooting

**Problem:** `matchedCount` is 0 when updating/deleting  
**Solution:** Check that you're using a valid ObjectId. The product might not exist.

**Problem:** Dot notation query returns no results  
**Solution:** Make sure you have quotes around the field path: `"manufacturer.name"` not `manufacturer.name`

**Problem:** `$pull` doesn't remove the review  
**Solution:** Verify the reviewer name matches exactly. The condition must match an object in the array.

**Problem:** TypeError with `$set` or `$pull`  
**Solution:** Make sure you're using the correct syntax: `{ $set: { field: value } }` and `{ $pull: { array: { field: value } } }`

## 📚 MongoDB Documentation

Essential reading for these activities:

### Updating Embedded Documents
- [Update Embedded Documents](https://www.mongodb.com/docs/manual/tutorial/update-documents/#update-embedded-documents) - Complete guide to updating nested fields
- [$set Operator](https://www.mongodb.com/docs/manual/reference/operator/update/set/) - Set field values in documents
- [Dot Notation](https://www.mongodb.com/docs/manual/core/document/#dot-notation) - Accessing nested fields

### Working with Arrays
- [$pull Operator](https://www.mongodb.com/docs/manual/reference/operator/update/pull/) - Remove items from arrays
- [Update Arrays](https://www.mongodb.com/docs/manual/tutorial/update-documents/#update-arrays-in-a-document) - Array update patterns

### Querying Embedded Documents
- [Query Embedded Documents](https://www.mongodb.com/docs/manual/tutorial/query-embedded-documents/) - Query nested fields and arrays
- [Query on Embedded/Nested Documents](https://www.mongodb.com/docs/manual/tutorial/query-embedded-documents/#query-on-embedded-nested-documents) - Dot notation queries

### General Reference
- [updateOne()](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne/) - Update single document
- [find()](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/) - Query documents
- [Update Operators](https://www.mongodb.com/docs/manual/reference/operator/update/) - All update operators reference

## 💡 Key Concepts

### Dot Notation
- Access nested fields using dots: `"parent.child"`
- **Always use quotes** around field paths in MongoDB queries
- Works for both queries and updates

### $set Operator
- Updates or creates fields without affecting other fields
- Can replace entire embedded documents
- Syntax: `{ $set: { "field.path": value } }`

### $pull Operator  
- Removes all array elements matching a condition
- Works with simple values or complex objects
- Syntax: `{ $pull: { arrayField: matchCondition } }`

### Embedded Documents vs References
- **Embedded** = data stored within parent document (what we're using)
- **References** = storing IDs that point to other collections
- Embedded is faster for data accessed together
- References avoid duplication for shared data

## 🚀 Scratch Challenges (Optional)

### Challenge 1: Update Specific Spec Field ⭐⭐
Create a route that updates just ONE field in the specs subdocument without replacing the entire object.

**Route:** `PUT /products/:id/specs/dpi`  
**Hint:** Use dot notation with $set: `{ $set: { "specs.dpi": newValue } }`

### Challenge 2: Add Multiple Tags ⭐⭐
Create a route that adds multiple tags at once, ensuring no duplicates.

**Route:** `POST /products/:id/tags/batch`  
**Hint:** Use `$addToSet` with `$each` modifier

### Challenge 3: Find High-Rated Products ⭐⭐⭐
Create a route that finds products with at least one 5-star review.

**Route:** `GET /products/top-rated`  
**Hint:** Query embedded array with dot notation: `{ "reviews.rating": 5 }`

### Challenge 4: Update Review by Reviewer ⭐⭐⭐
Create a route that updates a specific review using the positional `$` operator.

**Route:** `PUT /products/:id/reviews/:reviewer/verify`  
**Hint:** Use positional operator: `{ $set: { "reviews.$.verified": true } }`

## ⏱️ Estimated Time

- Activity 1 (Update Manufacturer): 5-7 minutes
- Activity 2 (Delete Review): 5-7 minutes  
- Activity 3 (Query by Manufacturer): 5-7 minutes
- Testing & Validation: 5 minutes

**Total:** ~20-25 minutes
