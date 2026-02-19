import { Movie } from './models/Movie';

export const resolvers = {
  Query: {
    // TODO: Implement movies resolver - fetch all movies from database
    // - Add console logging to show resolver execution
    // - Sort by release year (newest first)
    // - Include try-catch error handling
    // movies: async () => {
    //   // Your implementation here
    // },

    // TODO: Implement movie resolver - find single movie by ID
    // - Accept id argument
    // - Use Movie.findOne with movieId field
    // - Add logging for found/not found cases
    // - Return null if not found
    // movie: async (_parent, args) => {
    //   // Your implementation here
    // },

    // TODO: Implement moviesByGenre resolver - filter by genre
    // - Accept genre argument
    // - Use case-insensitive search with regex
    // - Sort results by rating (highest first)
    // moviesByGenre: async (_parent, args) => {
    //   // Your implementation here
    // }
  },

  Movie: {
    // Field resolver: Map MongoDB movieId to GraphQL id
    id: (movie) => {
      return movie.movieId;
    },

    // TODO: Implement movieAge field resolver
    // - Calculate current year minus release year
    // - Add console logging to show calculation
    // - Return the age as an integer
    // movieAge: (movie) => {
    //   // Your implementation here
    // },

    // TODO: Implement isBlockbuster field resolver
    // - A movie is a blockbuster if rating >= 8.0
    // - Add console logging for the decision
    // - Return boolean
    // isBlockbuster: (movie) => {
    //   // Your implementation here
    // },

    // TODO: Implement shortDescription field resolver
    // - Truncate description to 150 characters
    // - Add "..." if truncated
    // - Add logging to show original vs shortened length
    // shortDescription: (movie) => {
    //   // Your implementation here
    // },

    // TODO: Implement profitMargin field resolver
    // - Calculate (boxOffice - budget) / budget * 100
    // - Handle case where budget is 0 (return 0)
    // - Round to 2 decimal places
    // - Add logging to show the calculation
    // profitMargin: (movie) => {
    //   // Your implementation here
    // }
  }
};