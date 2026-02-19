# 🎬 GraphQL Input Types Lab (Movies)

Practice GraphQL Input Types by implementing create and update mutations for a movie database API.

**Estimated time:** 30-35 minutes

## 🎯 Goal

Build GraphQL Input Types that demonstrate organized mutation arguments for creating and updating movies with proper validation and structure.

## 📋 User Story

**AS A** movie database developer  
**I WANT** to implement GraphQL Input Types for mutations  
**SO THAT** I can create and update movies with clean, organized input structures

## 🏗️ Acceptance Criteria

**GIVEN** a GraphQL server with a movie database  
**WHEN** I implement Input Types and mutations  
**THEN** I should have working:

- ✅ **Input Types:** Create and Update input structures for movies
- ✅ **Create Mutations:** Add new movies using structured input
- ✅ **Update Mutations:** Partial movie updates with optional fields
- ✅ **Query Operations:** Search movies by title, date, and genre
- ✅ **Input Validation:** Type safety and proper error handling

## 📁 Folders

- **Starter/**: Partial implementation with TODOs for Input Type completion
- **Solution/**: Complete working implementation for reference

## 🧪 Input Type Patterns to Implement

### Create Input Type
```graphql
input CreateMovieInput {
  title: String!
  director: String!
  releaseYear: Int!
  genre: String!
  rating: Float
  duration: Int!
  description: String!
  cast: [String!]
  budget: Float
}
```

### Update Input Type
```graphql
input UpdateMovieInput {
  title: String
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

### Example Mutations
```graphql
mutation {
  createMovie(input: {
    title: "The Matrix"
    director: "Lana Wachowski, Lilly Wachowski"
    releaseYear: 1999
    genre: "Sci-Fi"
    rating: 8.7
    duration: 136
    description: "A computer programmer discovers reality is a simulation."
    cast: ["Keanu Reeves", "Laurence Fishburne"]
    budget: 63000000
  }) {
    id
    title
    director
  }
}
```

## 💡 Learning Focus

- **Input Type Design:** Organizing related fields into logical structures
- **Required vs Optional:** When to use `!` for required fields
- **Mutation Patterns:** Create vs Update input type differences
- **Partial Updates:** Handling optional fields in update operations
- **Array Inputs:** Working with list fields like cast members
- **Input Validation:** Type system validation of complex inputs

## 🚀 Getting Started

1. Choose **Starter/** for guided practice with TODOs
2. Choose **Solution/** to see the complete implementation  
3. Follow the README in your chosen folder

Good luck implementing your Input Types! 🎉