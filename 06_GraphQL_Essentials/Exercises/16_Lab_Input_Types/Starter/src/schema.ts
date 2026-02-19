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
    budget: Float!
    boxOffice: Float!
  }

  # TODO: Define CreateMovieInput type
  # Include required fields: title, director, releaseYear, genre, duration, description
  # Include optional fields: rating, cast, budget
  # input CreateMovieInput {
  #   # Your input type definition here
  # }

  # TODO: Define UpdateMovieInput type  
  # All fields should be optional for partial updates
  # input UpdateMovieInput {
  #   # Your input type definition here
  # }

  type Query {
    # Basic queries for testing mutations
    movies: [Movie!]!
    movie(id: ID!): Movie
    
    # TODO: Add search queries using arguments (not Input Types)
    # moviesByTitle(title: String!): [Movie!]!
    # moviesByYear(year: Int!): [Movie!]!
    # moviesByGenre(genre: String!): [Movie!]!
  }

  type Mutation {
    # TODO: Add mutations using Input Types
    # createMovie(input: CreateMovieInput!): Movie!
    # updateMovie(id: ID!, input: UpdateMovieInput!): Movie
    # deleteMovie(id: ID!): Boolean!
  }
`;