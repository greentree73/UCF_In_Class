# 🎬 Movies Resolvers Lab - Starter

Practice implementing GraphQL resolvers by completing TODOs in this movie database project.

## 🎯 Your Mission

Complete the missing resolver implementations to create a fully functional movie GraphQL API with computed fields.

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

4. **Open GraphQL Playground:** `http://localhost:4014/graphql`

## 📝 TODO Tasks

### 1. Query Resolvers (src/resolvers.ts)

Complete these query resolvers that fetch data from the database:

#### `movies` resolver:
```typescript
movies: async () => {
  // Add console logging: "🔍 Query resolver: Fetching all movies..."
  // Use Movie.find() to get all movies
  // Sort by releaseYear descending: .sort({ releaseYear: -1 })
  // Add try-catch with error logging
  // Log success: "✅ Found X movies"
}
```

#### `movie` resolver:
```typescript
movie: async (_parent, args) => {
  // Log: "🔍 Query resolver: Fetching movie with ID: ${args.id}"
  // Use Movie.findOne({ movieId: args.id })
  // Log if not found vs found
  // Return null if not found
}
```

#### `moviesByGenre` resolver:
```typescript
moviesByGenre: async (_parent, args) => {
  // Log: "🔍 Filtering movies by genre: ${args.genre}"
  // Use Movie.find with case-insensitive regex: 
  // Movie.find({ genre: new RegExp(args.genre, 'i') })
  // Sort by rating descending
}
```

### 2. Field Resolvers (src/resolvers.ts)

Complete these field resolvers that compute derived data:

#### `movieAge` resolver:
```typescript
movieAge: (movie) => {
  // Calculate: new Date().getFullYear() - movie.releaseYear
  // Log: "📅 Computing age for '${movie.title}': ${age} years old"
  // Return the age as integer
}
```

#### `isBlockbuster` resolver:
```typescript
isBlockbuster: (movie) => {
  // A movie is blockbuster if rating >= 8.0
  // const isBlockbuster = movie.rating >= 8.0
  // Log: "🎬 ${movie.title} is ${isBlockbuster ? 'a blockbuster' : 'not a blockbuster'} (${movie.rating}/10)"
  // Return boolean
}
```

#### `shortDescription` resolver:
```typescript
shortDescription: (movie) => {
  // Truncate to 150 characters, add "..." if needed
  // const truncated = movie.description.length > 150 ? 
  //   movie.description.substring(0, 150) + '...' : movie.description
  // Log original vs final length
  // Return truncated string
}
```

#### `profitMargin` resolver:
```typescript
profitMargin: (movie) => {
  // Handle budget = 0 case (return 0)
  // Calculate: (boxOffice - budget) / budget * 100
  // Round to 2 decimal places: Math.round(margin * 100) / 100
  // Log the calculation for debugging
  // Return number
}
```

## 🧪 Test Your Implementation

Try these queries once completed:

```graphql
# Test basic query resolver
query {
  movies {
    title
    releaseYear
  }
}

# Test field resolvers with computed data
query {
  movies {
    title
    movieAge
    isBlockbuster
    shortDescription
    profitMargin
  }
}

# Test single movie query
query {
  movie(id: "movie-001") {
    title
    director
    movieAge
    isBlockbuster
  }
}

# Test genre filtering
query {
  moviesByGenre(genre: "Sci-Fi") {
    title
    genre
    rating
  }
}
```

## 💡 Hints

- **Console Logging**: Add descriptive logs to see resolver execution
- **Error Handling**: Use try-catch blocks in query resolvers
- **MongoDB Queries**: `Movie.find()`, `Movie.findOne()`, sorting with `.sort()`
- **Regex**: `new RegExp(searchTerm, 'i')` for case-insensitive matching
- **Field Access**: Use `movie.fieldName` to access database fields in field resolvers

## 🏆 Success Criteria

- [ ] All movies query works and shows console logs
- [ ] Single movie query finds specific movies by ID
- [ ] Genre filtering works with case-insensitive matching
- [ ] movieAge calculates correct ages from release year
- [ ] isBlockbuster correctly identifies rating >= 8.0
- [ ] shortDescription truncates long descriptions
- [ ] profitMargin calculates percentage with proper error handling

## 👀 Watch the Console!

As you implement resolvers, watch your terminal to see the logging output. This helps you understand when and how resolvers execute.

Need help? Check the Solution folder for the complete implementation!