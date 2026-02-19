export const typeDefs = `
  type Movie {
    id: ID!
    title: String!
    director: String!
    releaseYear: Int!
    genre: String!
    rating: Float!
    duration: Int!
    description: String!
    cast: [String!]!
    isPopular: Boolean!
  }

  type Query {
    # Required argument query to find a movie by ID
    movie(id: ID!): Movie
    
    # Optional argument query with default limit
    movies(limit: Int = 10): [Movie!]!
    
    # Multiple arguments query for complex filtering
    moviesByFilters(
      director: String
      releaseYear: Int
      genre: String
      minRating: Float
    ): [Movie!]!
    
    # String search query for title matching
    moviesByTitle(title: String!): [Movie!]!
  }
`;