# 🎬 Movies Input Types Lab - Starter

Practice implementing GraphQL Input Types by completing TODOs in this movie database project.

## 🎯 Your Mission

Complete the missing Input Type definitions and mutation implementations to create a fully functional movie API with organized input structures.

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

4. **Open GraphQL Playground:** `http://localhost:4016/graphql`

## 📝 TODO Tasks

### 1. Define Input Types (src/schema.ts)

#### Complete CreateMovieInput:
```graphql
input CreateMovieInput {
  title: String!          # Required
  director: String!       # Required
  releaseYear: Int!       # Required
  genre: String!          # Required
  duration: Int!          # Required
  description: String!    # Required
  rating: Float           # Optional (0-10)
  cast: [String!]         # Optional array
  budget: Float           # Optional
}
```

#### Complete UpdateMovieInput:
```graphql
input UpdateMovieInput {
  # All fields optional for partial updates
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

#### Add Mutations to Query type:
```graphql
type Mutation {
  createMovie(input: CreateMovieInput!): Movie!
  updateMovie(id: ID!, input: UpdateMovieInput!): Movie
  deleteMovie(id: ID!): Boolean!
}
```

#### Add Search Queries:
```graphql
type Query {
  # Add these to existing Query type
  moviesByTitle(title: String!): [Movie!]!
  moviesByYear(year: Int!): [Movie!]!
  moviesByGenre(genre: String!): [Movie!]!
}
```

### 2. Define TypeScript Interfaces (src/resolvers.ts)

Match your GraphQL Input Types:
```typescript
interface CreateMovieInput {
  title: string;
  director: string;
  releaseYear: number;
  genre: string;
  duration: number;
  description: string;
  rating?: number;
  cast?: string[];
  budget?: number;
}

interface UpdateMovieInput {
  title?: string;
  director?: string;
  releaseYear?: number;
  genre?: string;
  rating?: number;
  duration?: number;
  description?: string;
  cast?: string[];
  budget?: number;
}
```

### 3. Implement Query Resolvers (src/resolvers.ts)

#### moviesByTitle:
```typescript
moviesByTitle: async (_parent: unknown, args: { title: string }) => {
  // Use Movie.find({ title: new RegExp(args.title, 'i') })
  // Case-insensitive partial matching
  // Sort by release year (newest first)
}
```

#### moviesByYear:
```typescript
moviesByYear: async (_parent: unknown, args: { year: number }) => {
  // Use Movie.find({ releaseYear: args.year })
  // Sort by rating (highest first)
}
```

#### moviesByGenre:
```typescript
moviesByGenre: async (_parent: unknown, args: { genre: string }) => {
  // Use Movie.find({ genre: new RegExp(args.genre, 'i') })
  // Case-insensitive matching
  // Sort by release year (newest first)
}
```

### 4. Implement Mutation Resolvers (src/resolvers.ts)

#### createMovie:
```typescript
createMovie: async (_parent: unknown, args: { input: CreateMovieInput }) => {
  // Log: "🏗️ Creating movie with Input Type"
  // Log: "📦 Input received:", JSON.stringify(args.input, null, 2)
  // Generate movieId: `movie-${String(count + 1).padStart(3, '0')}`
  // Create new Movie with input data
  // Set defaults: rating = args.input.rating || 0
  // Save and return movie
}
```

#### updateMovie:
```typescript
updateMovie: async (_parent: unknown, args: { id: string; input: UpdateMovieInput }) => {
  // Log: "🔧 Updating movie with Input Type"
  // Find existing movie by movieId
  // Build updateData object with only provided fields
  // Use Object.keys(args.input) to check what to update
  // Use findOneAndUpdate with { new: true }
  // Return updated movie or null
}
```

#### deleteMovie:
```typescript
deleteMovie: async (_parent: unknown, args: { id: string }) => {
  // Delete movie by movieId
  // Return result.deletedCount > 0
}
```

## 🧪 Test Your Implementation

Try these operations once completed:

### Create a New Movie
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
    director
    rating
  }
}
```

### Update a Movie (Partial)
```graphql
mutation {
  updateMovie(
    id: "movie-001"
    input: {
      rating: 9.0
      cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving"]
    }
  ) {
    id
    title
    rating
    cast
  }
}
```

### Search Movies
```graphql
query {
  moviesByTitle(title: "Matrix") {
    title
    releaseYear
  }
}

query {
  moviesByYear(year: 2017) {
    title
    director
  }
}

query {
  moviesByGenre(genre: "Sci-Fi") {
    title
    genre
    rating
  }
}
```

## 💡 Hints

- **Input Type Structure**: Group related fields logically
- **Required Fields**: Use `!` for fields that must be provided
- **Optional Fields**: Omit `!` for fields that have defaults or are optional
- **Partial Updates**: Check if field exists before adding to update object
- **Type Safety**: Match TypeScript interfaces exactly to GraphQL Input Types
- **Console Logging**: Add logs to see Input Type processing

## 🏆 Success Criteria

- [ ] CreateMovieInput and UpdateMovieInput defined properly
- [ ] All mutations use Input Types instead of individual arguments
- [ ] Search queries work with title, year, and genre filters
- [ ] createMovie works with both required and optional fields
- [ ] updateMovie handles partial updates correctly
- [ ] Console shows Input Type processing logs
- [ ] TypeScript interfaces match GraphQL Input Types

## 👀 Watch the Console!

As you implement your Input Types, watch your terminal to see the structured input processing. This helps you understand how Input Types organize complex data.

Need help? Check the Solution folder for the complete implementation!