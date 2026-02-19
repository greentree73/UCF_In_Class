# 🎬 Movies Query Arguments Lab - Starter

Practice implementing GraphQL Query Arguments by completing TODOs in this movie database project.

## 🎯 Your Mission

Complete the missing query implementations to create a flexible movie search API.

## 🔧 Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start MongoDB** (make sure it's running on localhost:27017)

3. **Run the server:**
   ```bash
   npm run dev
   ```

4. **Open GraphQL Playground:** `http://localhost:4012/graphql`

## 📝 TODO Tasks

### 1. Complete the Schema (src/schema.ts)

Uncomment and implement these queries in the `type Query` block:

```graphql
# Required argument - find movie by ID
movie(id: ID!): Movie

# Optional argument with default limit
movies(limit: Int = 10): [Movie!]!

# Multiple filtering arguments
moviesByFilters(
  director: String
  releaseYear: Int
  genre: String
  minRating: Float
): [Movie!]!

# String search for title matching
moviesByTitle(title: String!): [Movie!]!
```

### 2. Implement Resolvers (src/resolvers.ts)

Complete each resolver function:

#### `movie` resolver:
- Find a single movie using `Movie.findOne({ movieId: args.id })`
- Handle the case where movie is not found

#### `movies` resolver:
- Use the limit argument (default to 10 if not provided)
- Sort by release year (newest first): `.sort({ releaseYear: -1 })`

#### `moviesByFilters` resolver:
- Create a filter object based on provided arguments
- Use case-insensitive matching for director and genre with `new RegExp(value, 'i')`
- Use `$gte` operator for minRating: `{ rating: { $gte: minRating } }`
- Filter by exact match for releaseYear

#### `moviesByTitle` resolver:
- Use regex for partial, case-insensitive matching
- Pattern: `Movie.find({ title: new RegExp(args.title, 'i') })`

## 🧪 Test Your Implementation

Try these queries once completed:

```graphql
# Test required argument
query {
  movie(id: "movie-001") {
    title
    director
    releaseYear
  }
}

# Test optional argument with default
query {
  movies {
    title
    releaseYear
  }
}

# Test multiple filters
query {
  moviesByFilters(
    genre: "Sci-Fi"
    minRating: 8.0
  ) {
    title
    genre
    rating
  }
}

# Test string search
query {
  moviesByTitle(title: "Matrix") {
    title
    releaseYear
  }
}
```

## 💡 Hints

- **MongoDB Operators**: Use `$gte`, `$lte`, `$in` for numeric/array filtering
- **Regex Matching**: `new RegExp(searchTerm, 'i')` for case-insensitive search
- **Error Handling**: Wrap database calls in try-catch blocks
- **Default Values**: Use `args.limit || 10` for optional arguments

## 🏆 Success Criteria

- [ ] All 4 queries work without errors
- [ ] `movie` query finds specific movies by ID
- [ ] `movies` query respects limit argument and defaults
- [ ] `moviesByFilters` handles multiple optional filters
- [ ] `moviesByTitle` finds movies with partial title matches

Need help? Check the Solution folder for the complete implementation!