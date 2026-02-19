import { Movie } from './models/Movie';

interface MovieFilters {
  director?: string;
  releaseYear?: number;
  genre?: string;
  minRating?: number;
}

export const resolvers = {
  Query: {
    // Find a single movie by movieId - required argument
    movie: async (_parent: unknown, args: { id: string }) => {
      try {
        return await Movie.findOne({ movieId: args.id });
      } catch (error) {
        console.error('Error fetching movie:', error);
        return null;
      }
    },

    // Get movies with optional limit - default to 10
    movies: async (_parent: unknown, args: { limit?: number }) => {
      try {
        const limit = args.limit || 10;
        return await Movie.find().limit(limit).sort({ releaseYear: -1 });
      } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
      }
    },

    // Filter movies by multiple optional arguments
    moviesByFilters: async (_parent: unknown, args: MovieFilters) => {
      try {
        const filter: any = {};
        
        if (args.director) {
          filter.director = new RegExp(args.director, 'i');
        }
        
        if (args.releaseYear) {
          filter.releaseYear = args.releaseYear;
        }
        
        if (args.genre) {
          filter.genre = new RegExp(args.genre, 'i');
        }
        
        if (args.minRating) {
          filter.rating = { $gte: args.minRating };
        }
        
        return await Movie.find(filter).sort({ releaseYear: -1 });
      } catch (error) {
        console.error('Error filtering movies:', error);
        return [];
      }
    },

    // Search movies by partial title matching
    moviesByTitle: async (_parent: unknown, args: { title: string }) => {
      try {
        return await Movie.find({
          title: new RegExp(args.title, 'i')
        }).sort({ releaseYear: -1 });
      } catch (error) {
        console.error('Error searching movies by title:', error);
        return [];
      }
    }
  },
  
  Movie: {
    // Map MongoDB movieId to GraphQL id field
    id: (movie: any) => movie.movieId
  }
};