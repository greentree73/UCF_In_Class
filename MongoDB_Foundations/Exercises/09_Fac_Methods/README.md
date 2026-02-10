# 📚 MongoDB Cursor Methods

## Overview

MongoDB cursors are powerful tools for efficiently working with query results. Instead of loading all documents into memory at once, cursors allow you to iterate through results one document at a time, apply transformations, and implement pagination—all while optimizing memory usage and performance.

## What is a Cursor?

A **cursor** is a pointer to the result set of a query. When you call `find()` in MongoDB, you don't immediately get all the documents—instead, you get a cursor that you can use to retrieve documents as needed.

```typescript
// find() returns a cursor, NOT an array
const cursor = db.collection('posts').find();

// You must process the cursor to get documents
const documents = await cursor.toArray();
```

## Why Use Cursors?

### Memory Efficiency
Instead of loading thousands of documents into memory, cursors let you process one at a time.

### Performance
You can start processing results immediately without waiting for the entire query to complete.

### Flexibility
Chain multiple operations together (sort, limit, skip, project) before retrieving any data.

---

## Core Cursor Methods

### 🔄 Iteration Methods

#### `.toArray()`
Converts the entire cursor to an array. **Most commonly used** but loads all documents into memory.

```typescript
const posts = await db.collection('posts').find().toArray();
```

**When to use**: Small to medium result sets where you need all data at once

**⚠️ Caution**: Can cause memory issues with large datasets

---

#### `.forEach()`
Iterates through documents one at a time. Memory-efficient for large datasets.

```typescript
await cursor.forEach(doc => {
  console.log(doc.title);
});
```

**When to use**: Processing large datasets without loading everything into memory

---

#### `.next()` and `.hasNext()`
Manual iteration through cursor results.

```typescript
while (await cursor.hasNext()) {
  const doc = await cursor.next();
  // Process document
}
await cursor.close(); // Always close when done!
```

**When to use**: When you need fine-grained control over iteration or conditional processing

---

### 🔧 Transformation Methods

#### `.sort()`
Orders results by one or more fields.

```typescript
// Sort by views descending, then by title ascending
const posts = await db.collection('posts')
  .find()
  .sort({ 'metadata.views': -1, title: 1 })
  .toArray();
```

**Values**: `1` = ascending, `-1` = descending

---

#### `.limit()`
Restricts the number of documents returned.

```typescript
const topPosts = await db.collection('posts')
  .find()
  .limit(10)
  .toArray();
```

**When to use**: Fetching top N results or implementing pagination

---

#### `.skip()`
Skips a specified number of documents. Commonly used with `.limit()` for pagination.

```typescript
// Page 2, with 10 items per page
const page2 = await db.collection('posts')
  .find()
  .skip(10)
  .limit(10)
  .toArray();
```

**⚠️ Performance Note**: Skip becomes slower with large skip values

---

#### `.project()`
Selects which fields to include or exclude in results.

```typescript
// Only return title and author, exclude _id
const posts = await db.collection('posts')
  .find()
  .project({ 
    title: 1, 
    'author.username': 1,
    _id: 0 
  })
  .toArray();
```

**When to use**: Reducing data transfer and improving performance by fetching only needed fields

---

### 📊 Aggregation Methods

#### `.countDocuments()`
Returns the number of documents matching the query.

```typescript
const total = await db.collection('posts').countDocuments();
const featured = await db.collection('posts').countDocuments({ 
  'metadata.featured': true 
});
```

**When to use**: Getting totals for pagination or statistics

---

## Method Chaining

One of the most powerful features of cursors is the ability to **chain methods together**:

```typescript
const results = await db.collection('posts')
  .find({ category: 'Tutorial' })      // Filter
  .sort({ 'metadata.views': -1 })      // Sort by popularity
  .skip(10)                             // Skip first 10 (pagination)
  .limit(5)                             // Return next 5
  .project({ title: 1, author: 1 })    // Select specific fields
  .toArray();                           // Execute and convert to array
```

**Order matters**: The MongoDB driver optimizes the execution, but generally:
1. Filter (`find`)
2. Sort (`sort`)
3. Skip (`skip`)
4. Limit (`limit`)
5. Project (`project`)
6. Execute (`toArray`, `forEach`, etc.)

---

## Pagination Pattern

Implementing pagination is a common use case for cursors:

```typescript
const page = 2;
const pageSize = 10;
const skip = (page - 1) * pageSize;

const total = await db.collection('posts').countDocuments();
const posts = await db.collection('posts')
  .find()
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(pageSize)
  .toArray();

const response = {
  page,
  pageSize,
  total,
  totalPages: Math.ceil(total / pageSize),
  data: posts
};
```

---

## Best Practices

### ✅ Do

- **Always close cursors** when using manual iteration (`cursor.close()`)
- **Use `.limit()`** when you only need a subset of results
- **Use `.project()`** to fetch only necessary fields
- **Use `.forEach()`** or streaming for large datasets to avoid memory issues
- **Chain methods** for cleaner, more readable code

### ❌ Don't

- Don't use `.toArray()` on potentially large result sets without `.limit()`
- Don't forget to handle cursor exhaustion when using `.next()`
- Don't use large `.skip()` values (use cursor-based pagination instead for large datasets)
- Don't mix multiple iteration methods on the same cursor

---

## API Endpoints in This Exercise

| Endpoint | Cursor Method(s) | Description |
|----------|------------------|-------------|
| `POST /posts/seed` | - | Seeds sample data |
| `GET /cursor/toarray` | `.toArray()` | Basic array conversion |
| `GET /cursor/foreach` | `.forEach()` | Memory-efficient iteration |
| `GET /cursor/manual` | `.next()`, `.hasNext()` | Manual iteration |
| `GET /cursor/sort` | `.sort()` | Sorting results |
| `GET /cursor/paginate` | `.skip()`, `.limit()`, `.countDocuments()` | Pagination example |
| `GET /cursor/project` | `.project()` | Field selection |
| `GET /cursor/count` | `.countDocuments()` | Counting documents |
| `GET /cursor/stream` | `.forEach()` | Streaming response |
| `GET /cursor/complex` | Multiple chained methods | Complex query example |

---

## Running the Exercise

1. **Start MongoDB**:
   ```bash
   # Make sure MongoDB is running locally
   mongod
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm run dev
   ```

4. **Seed the database**:
   ```bash
   curl -X POST http://localhost:3000/posts/seed
   ```

5. **Try the cursor methods**:
   ```bash
   # Basic iteration
   curl http://localhost:3000/cursor/toarray
   curl http://localhost:3000/cursor/foreach
   curl http://localhost:3000/cursor/manual
   
   # Transformations
   curl http://localhost:3000/cursor/sort
   curl http://localhost:3000/cursor/project
   
   # Pagination (try different pages)
   curl "http://localhost:3000/cursor/paginate?page=1&pageSize=3"
   curl "http://localhost:3000/cursor/paginate?page=2&pageSize=3"
   
   # Counting
   curl http://localhost:3000/cursor/count
   
   # Complex chaining
   curl http://localhost:3000/cursor/complex
   ```

---

## MongoDB Documentation

### Official Cursor Method References

- **[Cursor Methods Overview](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/cursor/)** - Complete guide to working with cursors in Node.js
- **[Cursor API Reference](https://mongodb.github.io/node-mongodb-native/6.0/classes/FindCursor.html)** - Full API documentation for cursor methods
- **[Query Documents](https://www.mongodb.com/docs/manual/tutorial/query-documents/)** - MongoDB query documentation
- **[Cursor Methods (MongoDB Manual)](https://www.mongodb.com/docs/manual/reference/method/js-cursor/)** - Server-side cursor methods

### Specific Method Documentation

- [`.toArray()`](https://mongodb.github.io/node-mongodb-native/6.0/classes/FindCursor.html#toArray)
- [`.forEach()`](https://mongodb.github.io/node-mongodb-native/6.0/classes/FindCursor.html#forEach)
- [`.next()`](https://mongodb.github.io/node-mongodb-native/6.0/classes/FindCursor.html#next)
- [`.hasNext()`](https://mongodb.github.io/node-mongodb-native/6.0/classes/FindCursor.html#hasNext)
- [`.sort()`](https://mongodb.github.io/node-mongodb-native/6.0/classes/FindCursor.html#sort)
- [`.limit()`](https://mongodb.github.io/node-mongodb-native/6.0/classes/FindCursor.html#limit)
- [`.skip()`](https://mongodb.github.io/node-mongodb-native/6.0/classes/FindCursor.html#skip)
- [`.project()`](https://mongodb.github.io/node-mongodb-native/6.0/classes/FindCursor.html#project)
- [`.countDocuments()`](https://www.mongodb.com/docs/drivers/node/current/usage-examples/count/)

### Additional Resources

- **[Pagination Best Practices](https://www.mongodb.com/docs/manual/reference/method/cursor.skip/#pagination-example)** - Efficient pagination strategies
- **[Performance Optimization](https://www.mongodb.com/docs/manual/tutorial/optimize-query-performance-with-indexes-and-projections/)** - Optimizing queries with indexes and projections
- **[Streaming Query Results](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/cursor/#stream-api)** - Using Node.js streams with cursors

---

## Key Takeaways

1. **Cursors are lazy** - They don't execute until you iterate or call `.toArray()`
2. **Method chaining is powerful** - Build complex queries by chaining cursor methods
3. **Memory matters** - Use `.forEach()` or streaming for large datasets
4. **Pagination requires planning** - Combine `.skip()`, `.limit()`, and `.countDocuments()`
5. **Projection saves bandwidth** - Only fetch the fields you need
6. **Always close manual cursors** - Prevent resource leaks with `.close()`

---

## What's Next?

After mastering cursor methods, you'll be ready to explore:
- **Aggregation Pipeline** - Complex data transformations
- **Indexes** - Optimizing query performance
- **Change Streams** - Real-time data monitoring
- **Transactions** - ACID compliance in MongoDB
