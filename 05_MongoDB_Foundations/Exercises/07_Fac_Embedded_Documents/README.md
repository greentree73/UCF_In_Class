# Introduction to MongoDB Embedded Documents

## 🎯 Learning Objectives
By the end of this activity, you will understand:
- What embedded documents are and when to use them
- The difference between embedded documents and references
- How to create documents with embedded subdocuments
- How to query and update nested fields within embedded documents
- Common patterns for working with embedded arrays of objects
- Best practices for document design with embedded data

## 🤔 What Are Embedded Documents?

**Embedded documents** (also called subdocuments or nested documents) are complete MongoDB documents stored inside other documents. They allow you to model complex, hierarchical data structures within a single document, taking advantage of MongoDB's flexible schema.

Think of it like a filing cabinet analogy:
- **Relational Database (SQL)**: You have multiple filing cabinets (tables) with index cards pointing between them
- **Embedded Documents**: You have one filing cabinet where each folder contains all related papers inside it

### Example Structure

```javascript
{
  _id: ObjectId("..."),
  title: "Introduction to MongoDB",
  body: "Learn how to use MongoDB...",
  category: "Tutorial",
  // Embedded document (single object)
  author: {
    username: "alice",
    email: "alice@hackhaven.dev",
    bio: "Database enthusiast"
  },
  // Embedded array of documents
  comments: [
    {
      text: "Great tutorial!",
      commenter: "bob",
      email: "bob@hackhaven.dev",
      date: ISODate("2026-01-20")
    },
    {
      text: "Very helpful!",
      commenter: "carol",
      email: "carol@hackhaven.dev",
      date: ISODate("2026-01-22")
    }
  ]
}
```

## 🔧 Key Concepts

### 1. Embedded Documents vs References

MongoDB offers two ways to model relationships:

**Embedded Documents (Denormalized):**
```javascript
// Everything in one document
{
  _id: 1,
  orderNumber: "ORD-001",
  customer: {
    name: "Alice",
    email: "alice@example.com"
  },
  items: [
    { product: "Laptop", quantity: 1, price: 999 }
  ]
}
```

**References (Normalized):**
```javascript
// Separate documents with references
// Orders collection
{
  _id: 1,
  orderNumber: "ORD-001",
  customerId: 123,  // Reference to customers collection
  itemIds: [456]    // References to items collection
}

// Customers collection
{
  _id: 123,
  name: "Alice",
  email: "alice@example.com"
}
```

| Aspect | Embedded Documents | References |
|--------|-------------------|------------|
| **Performance** | ✅ Single query retrieves all data | ❌ Multiple queries or $lookup needed |
| **Atomicity** | ✅ Updates are atomic | ❌ Multiple document updates required |
| **Duplication** | ❌ Data may be duplicated | ✅ No duplication |
| **Document Size** | ❌ Limited to 16MB per document | ✅ No limit across documents |
| **Use Case** | Data accessed together | Data accessed independently |

### 2. When to Use Embedded Documents

✅ **Use embedded documents when:**
- Data is always accessed together (e.g., order with order items)
- The embedded data belongs to the parent (has a "contains" relationship)
- The embedded data is bounded (won't grow indefinitely)
- You need atomic updates (all data updates together or not at all)
- Read performance is critical

❌ **Use references when:**
- Data is accessed independently
- The relationship is many-to-many
- Embedded data would cause duplication across many documents
- Embedded data could grow unbounded (exceed 16MB limit)
- You need to update data that appears in many places

### 3. Types of Embedded Documents

**Single Embedded Document:**
```javascript
{
  title: "MongoDB Guide",
  metadata: {        // Single embedded object
    views: 1250,
    likes: 45,
    readTime: "5 min",
    featured: true
  }
}
```

**Array of Embedded Documents:**
```javascript
{
  title: "MongoDB Guide",
  comments: [        // Array of embedded documents
    { text: "Excellent!", commenter: "alice" },
    { text: "Very helpful", commenter: "bob" }
  ]
}
```

**Nested Embedded Documents:**
```javascript
{
  title: "MongoDB Guide",
  author: {
    profile: {       // Nested embedded document
      username: "alice",
      bio: "Database expert",
      joinedDate: ISODate("2025-01-15")
    },
    contact: "alice@hackhaven.dev"
  }
}
```

## 📊 Working with Embedded Documents

### Pattern 1: Creating Documents with Embedded Data

```javascript
// Insert a post with embedded author and comments
const post = {
  title: "Introduction to MongoDB Embedded Documents",
  body: "Learn how to model complex data structures...",
  category: "Tutorial",
  tags: ["mongodb", "database", "nosql"],
  author: {
    username: "alice",
    email: "alice@hackhaven.dev",
    bio: "Database enthusiast and MongoDB expert",
    joinedDate: new Date("2025-01-15")
  },
  comments: [
    {
      text: "Great tutorial! Very helpful.",
      commenter: "bob",
      email: "bob@hackhaven.dev",
      verified: true,
      date: new Date()
    }
  ],
  createdAt: new Date()
};

await db.collection('posts').insertOne(post);
```

**Key Points:**
- Embedded documents are just JavaScript objects nested within the parent
- Arrays can contain multiple embedded documents
- No special syntax needed - MongoDB handles the nesting automatically

### Pattern 2: Querying Embedded Fields

```javascript
// Query using dot notation for embedded fields
// Find posts by author username
const posts = await db.collection('posts').find({
  "author.username": "alice"
}).toArray();

// Find featured posts
const featured = await db.collection('posts').find({
  "metadata.featured": true
}).toArray();

// Find posts with comments by specific commenter
const bobComments = await db.collection('posts').find({
  "comments.commenter": "bob"
}).toArray();
```

**Key Points:**
- Use **dot notation** to access nested fields: `"parent.child"`
- Quotes are required around field names with dots
- Array queries match if ANY element matches

### Pattern 3: Updating Embedded Fields

**Update a single embedded field:**
```javascript
// Update author bio
await db.collection('posts').updateOne(
  { _id: postId },
  { $set: { "author.bio": "MongoDB expert and educator" } }
);
```

**Update entire embedded document:**
```javascript
// Replace entire author object
await db.collection('posts').updateOne(
  { _id: postId },
  { 
    $set: { 
      author: {
        username: "alice",
        email: "alice@hackhaven.dev",
        bio: "Full-stack developer",
        joinedDate: new Date("2025-01-15")
      }
    } 
  }
);
```

### Pattern 4: Adding to Embedded Arrays

```javascript
// Add a new comment to the comments array
await db.collection('posts').updateOne(
  { _id: postId },
  { 
    $push: { 
      comments: {
        text: "Thanks for sharing!",
        commenter: "carol",
        email: "carol@hackhaven.dev",
        verified: true,
        date: new Date()
      }
    } 
  }
);
```

**Array Operators:**
- `$push`: Add to array (allows duplicates)
- `$addToSet`: Add only if not present
- `$pull`: Remove matching elements
- `$pop`: Remove first or last element

### Pattern 5: Updating Embedded Array Elements

**Update specific array element by position:**
```javascript
// Update the first comment
await db.collection('posts').updateOne(
  { _id: postId },
  { $set: { "comments.0.text": "Updated comment" } }
);
```

**Update array element by matching condition (positional $ operator):**
```javascript
// Update comment by specific commenter
await db.collection('posts').updateOne(
  { _id: postId, "comments.commenter": "bob" },
  { $set: { "comments.$.verified": true } }
);
```

**The `$` positional operator:**
- Matches the first array element that satisfied the query condition
- Only updates that specific element
- Requires array field in query filter

### Pattern 6: Removing from Embedded Arrays

```javascript
// Remove a specific comment
await db.collection('posts').updateOne(
  { _id: postId },
  { 
    $pull: { 
      comments: { commenter: "bob" }
    } 
  }
);

// Remove all unverified comments
await db.collection('posts').updateOne(
  { _id: postId },
  { 
    $pull: { 
      comments: { verified: false }
    } 
  }
);
```

## ⚠️ Common Mistakes

### Mistake 1: Forgetting Quotes in Dot Notation

```javascript
// ❌ WRONG - Will fail
updateOne({ _id: id }, { $set: { author.username: "bob" } })

// ✅ CORRECT - Quotes required
updateOne({ _id: id }, { $set: { "author.username": "bob" } })
```

### Mistake 2: Replacing Instead of Updating

```javascript
// ❌ WRONG - This replaces the entire author, losing other fields
updateOne(
  { _id: id },
  { $set: { author: { username: "bob" } } }
  // This removes 'email', 'bio', and 'joinedDate' fields!
)

// ✅ CORRECT - Update only specific field
updateOne(
  { _id: id },
  { $set: { "author.username": "bob" } }
)
```

### Mistake 3: Not Using Positional Operator

```javascript
// ❌ WRONG - Updates ALL comments, not just bob's
updateOne(
  { _id: id },
  { $set: { "comments.verified": true } }
)

// ✅ CORRECT - Update only bob's comment
updateOne(
  { _id: id, "comments.commenter": "bob" },
  { $set: { "comments.$.verified": true } }
)
```

### Mistake 4: Unbounded Array Growth

```javascript
// ⚠️ DANGER - Comments could grow indefinitely!
// This could eventually exceed the 16MB document limit
$push: { comments: newComment }

// ✅ BETTER - Limit array size or use references for large collections
$push: { 
  comments: {
    $each: [newComment],
    $slice: -100  // Keep only last 100 comments
  }
}
```

## 🎯 When to Use Each Approach

### Use Embedded Documents For:

**1. One-to-One Relationships**
```javascript
{
  username: "alice",
  profile: {  // Embedded - always accessed with user
    bio: "Software developer",
    avatar: "alice.jpg",
    location: "Boston, MA"
  }
}
```

**2. One-to-Few Relationships**
```javascript
{
  title: "MongoDB Tutorial",
  comments: [  // Embedded - limited number, accessed together
    { text: "Great!", commenter: "bob" },
    { text: "Helpful", commenter: "carol" }
  ]
}
```

**3. Data That Belongs to Parent**
```javascript
{
  order: "ORD-001",
  items: [  // Embedded - order items belong to this order
    { product: "Mouse", quantity: 2, price: 25 },
    { product: "Keyboard", quantity: 1, price: 75 }
  ]
}
```

### Use References For:

**1. Many-to-Many Relationships**
```javascript
// Users and Groups - use references
{
  username: "alice",
  groupIds: [101, 102, 103]  // References
}
```

**2. Frequently Updated Data**
```javascript
// Post view count - frequently updated independently
{
  title: "MongoDB Guide",
  statsId: 456  // Reference to stats collection
}
```

**3. Large or Unbounded Data**
```javascript
// Blog posts - potentially thousands of comments
{
  title: "My thoughts...",
  commentIds: [...]  // References to separate comments collection
}
```

## 💡 Best Practices

1. **Design for your queries**: Embed data you access together
2. **Consider document size**: Stay well under 16MB limit
3. **Avoid deep nesting**: 2-3 levels max for readability
4. **Use dot notation carefully**: Always quote field paths
5. **Limit array growth**: Use $slice or references for unbounded data
6. **Index embedded fields**: You can create indexes on `"parent.child"` fields
7. **Think atomicity**: Embedded documents update atomically
8. **Prototype and test**: Document design is critical in MongoDB

## 🔍 What's Next?

After understanding embedded documents, you'll be ready to:
- Build complex data models with nested structures
- Design efficient schemas for your application needs
- Work with embedded arrays using advanced operators
- Combine embedded documents with references when appropriate
- Optimize queries using indexes on embedded fields

## 📚 MongoDB Documentation

- [Embedded Documents](https://www.mongodb.com/docs/manual/core/data-model-design/#embedded-data-models) - Data modeling with embedded documents
- [Dot Notation](https://www.mongodb.com/docs/manual/core/document/#dot-notation) - Accessing nested fields
- [Query Embedded Documents](https://www.mongodb.com/docs/manual/tutorial/query-embedded-documents/) - Querying nested data
- [Update Embedded Documents](https://www.mongodb.com/docs/manual/tutorial/update-documents/#update-embedded-documents) - Updating nested fields
- [Positional Operator $](https://www.mongodb.com/docs/manual/reference/operator/update/positional/) - Update array elements
- [Array Update Operators](https://www.mongodb.com/docs/manual/reference/operator/update-array/) - $push, $pull, $addToSet, etc.
- [Data Model Design](https://www.mongodb.com/docs/manual/core/data-model-design/) - Embedded vs referenced relationships
- [Document Size Limit](https://www.mongodb.com/docs/manual/reference/limits/#mongodb-limit-BSON-Document-Size) - 16MB document limit
