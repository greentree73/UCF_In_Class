# 🎬 GraphQL Resolvers Lab (Movies)

Practice GraphQL Resolvers by implementing query and field resolvers for a movie database API.

**Estimated time:** 25-30 minutes

## 🎯 Goal

Build GraphQL resolvers that demonstrate both database queries and computed field logic using a technology movies database.

## 📋 User Story

**AS A** movie database developer  
**I WANT** to implement GraphQL resolvers  
**SO THAT** I can fetch movies and compute additional field data dynamically

## 🏗️ Acceptance Criteria

**GIVEN** a GraphQL server with a movie database  
**WHEN** I implement the resolver functions  
**THEN** I should have working:

- ✅ **Query Resolvers:** Fetch movies from database with error handling
- ✅ **Field Resolvers:** Compute derived data (popularity, age, summary)
- ✅ **Argument Handling:** Resolvers that process query arguments
- ✅ **Data Transformation:** Format and derive new fields from existing data
- ✅ **Console Logging:** Visibility into resolver execution

## 📁 Folders

- **Starter/**: Partial implementation with TODOs for resolver completion
- **Solution/**: Complete working implementation for reference

## 🧪 Resolver Patterns to Implement

### Query Resolvers (Data Fetching)
```graphql
query {
  movies {
    title
    director
    releaseYear
  }
}

query {
  movie(id: "movie-001") {
    title
    genre
    rating
  }
}
```

### Field Resolvers (Computed Data)
```graphql
query {
  movies {
    title
    releaseYear
    movieAge        # ← Computed from current year
    isBlockbuster   # ← Based on rating threshold
    shortDescription # ← Truncated description
  }
}
```

## 💡 Learning Focus

- **Resolver Function Patterns:** Query vs Field resolvers
- **Database Integration:** Async/await with MongoDB
- **Error Handling:** Try-catch in resolvers
- **Computed Fields:** Business logic in field resolvers
- **Data Transformation:** Formatting and deriving data
- **Resolver Arguments:** Handling query parameters

## 🚀 Getting Started

1. Choose **Starter/** for guided practice with TODOs
2. Choose **Solution/** to see the complete implementation  
3. Follow the README in your chosen folder

Good luck implementing your resolvers! 🎉