# 🎬 Movies Input Types Lab - Complete Solution

This is the complete implementation of the Input Types lab showing all concepts in action.

## 🎯 What This Demonstrates

This solution showcases how GraphQL Input Types organize complex mutation arguments and provide better type safety and code organization.

## 🏗️ Key Implementation Details

### Input Type Definitions

#### CreateMovieInput
```graphql
input CreateMovieInput {
  title: String!          # Required fields for new movies
  director: String!
  releaseYear: Int!
  genre: String!
  duration: Int!
  description: String!
  rating: Float           # Optional fields with defaults
  cast: [String!]
  budget: Float
}
```

#### UpdateMovieInput
```graphql
input UpdateMovieInput {
  title: String           # All fields optional for partial updates
  director: String
  releaseYear: Int
  genre: String
  rating: Float
  duration: Int
  description: String
  cast: [String!]
  budget: Float
}
```

### Key Features Implemented

1. **Structured Input Arguments**:
   - Groups related fields logically
   - Clear separation between required and optional fields
   - Better than individual scalar arguments

2. **Type Safety**:
   - TypeScript interfaces match GraphQL Input Types exactly
   - Compile-time validation of argument structure
   - Runtime validation through GraphQL schema

3. **Partial Updates**:
   - UpdateMovieInput allows updating only specific fields
   - Dynamic update object construction
   - Only provided fields are updated in database

4. **Search Functionality**:
   - Case-insensitive title and genre searches
   - Year-based filtering with sorting
   - Multiple query patterns for different use cases

## 🧪 Test Operations

### Create with Input Type
```graphql
mutation {
  createMovie(input: {
    title: "Interstellar"
    director: "Christopher Nolan"
    releaseYear: 2014
    genre: "Sci-Fi"
    duration: 169
    description: "A team of explorers travel through a wormhole in space."
    rating: 8.6
    cast: ["Matthew McConaughey", "Anne Hathaway"]
    budget: 165000000
  }) {
    id
    title
    rating
  }
}
```

### Partial Update with Input Type
```graphql
mutation {
  updateMovie(
    id: "movie-001"
    input: {
      rating: 9.0
      cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving"]
    }
  ) {
    title
    rating
    cast
  }
}
```

### Search Operations
```graphql
# Find movies by title (case-insensitive partial match)
query {
  moviesByTitle(title: "Matrix") {
    title
    releaseYear
  }
}

# Find movies by release year (sorted by rating)
query {
  moviesByYear(year: 2017) {
    title
    director
    rating
  }
}

# Find movies by genre (case-insensitive)
query {
  moviesByGenre(genre: "Sci-Fi") {
    title
    genre
    rating
  }
}
```

## 🔍 Console Output

Watch the terminal to see Input Type processing:

```
🏗️ Creating movie with Input Type
📦 Input received: {
  "title": "Interstellar",
  "director": "Christopher Nolan",
  "releaseYear": 2014,
  "genre": "Sci-Fi",
  "duration": 169,
  "description": "A team of explorers travel through a wormhole in space.",
  "rating": 8.6,
  "cast": ["Matthew McConaughey", "Anne Hathaway"],
  "budget": 165000000
}
✅ Created movie: Interstellar (movie-007)
```

## 💡 Input Types vs Individual Arguments

### Before (Individual Arguments)
```graphql
# Messy, hard to manage
createMovie(
  title: "Movie Title"
  director: "Director Name"
  releaseYear: 2024
  genre: "Action"
  duration: 120
  description: "Description here"
  rating: 8.5
  cast: ["Actor 1", "Actor 2"]
  budget: 100000000
)
```

### After (Input Types)
```graphql
# Clean, organized, reusable
createMovie(input: {
  title: "Movie Title"
  director: "Director Name"
  releaseYear: 2024
  genre: "Action"
  duration: 120
  description: "Description here"
  rating: 8.5
  cast: ["Actor 1", "Actor 2"]
  budget: 100000000
})
```

## 🏆 Benefits Demonstrated

1. **Better Organization**: Related fields grouped together
2. **Type Safety**: Compile-time validation with TypeScript
3. **Reusability**: Input Types can be shared across multiple mutations
4. **Documentation**: Self-documenting API structure
5. **Partial Updates**: Easy to handle optional field updates
6. **Validation**: Schema-level validation of complex input structures

## 🚀 Run This Solution

```bash
npm install
npm run dev
```

Open `http://localhost:4016/graphql` and try the operations above!

The database auto-seeds with sample movies when the server starts.