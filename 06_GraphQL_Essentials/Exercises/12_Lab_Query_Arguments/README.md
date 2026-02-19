# 🎬 Query Arguments Lab (Movies)

Practice GraphQL Query Arguments by building a movie database API with advanced filtering capabilities.

**Estimated time:** 20-25 minutes

## 🎯 Goal

Build a GraphQL server that demonstrates query arguments using a movie database. Students will implement queries to search movies by title, release year, and genre.

## 📋 User Story

**AS A** movie enthusiast  
**I WANT** to query a movie database with flexible filters  
**SO THAT** I can find movies by title, release year, and genre

## 🏗️ Acceptance Criteria

**GIVEN** a GraphQL server with a movie database  
**WHEN** I send queries with different arguments  
**THEN** I should receive filtered results based on:

- ✅ **Required arguments:** Find specific movie by ID
- ✅ **Optional arguments:** Limit results with defaults  
- ✅ **Multiple filters:** Search by release year and genre
- ✅ **String matching:** Find movies by partial title match
- ✅ **Array arguments:** Filter by multiple genres

## 📁 Folders

- **Starter/**: Partial implementation with TODOs for student completion
- **Solution/**: Complete working implementation for reference

## 🧪 Query Examples to Implement

```graphql
# Required argument - find movie by ID
query {
  movie(id: "movie-001") {
    id
    title
    director
    releaseYear
  }
}

# Optional arguments with defaults
query {
  movies(limit: 5) {
    title
    releaseYear
  }
}

# Multiple filter arguments
query {
  moviesByFilters(
    releaseYear: 2010
    genre: "Action"
    minRating: 8.0
  ) {
    title
    director
    releaseYear
    genre
    rating
  }
}

# String search with partial matching
query {
  moviesByTitle(title: "Matrix") {
    title
    releaseYear
    director
  }
}
```

## 💡 Learning Focus

- Required vs optional arguments
- Default values in GraphQL schemas
- Multiple argument filtering
- String matching with MongoDB regex
- Array argument handling
- Error handling in resolvers

## 🚀 Getting Started

1. Choose **Starter/** for guided practice with TODOs
2. Choose **Solution/** to see the complete implementation
3. Follow the README in your chosen folder

Good luck! 🎉