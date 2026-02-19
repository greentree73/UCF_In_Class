import { Movie } from './models/Movie';

// TypeScript interfaces matching our GraphQL Input Types
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

let movieCounter = 0;

export const resolvers = {
  Query: {
    movies: async () => {
      console.log('🎬 Fetching all movies');
      return await Movie.find().sort({ releaseYear: -1 });
    },

    movie: async (_parent: unknown, args: { id: string }) => {
      console.log(`🔍 Fetching movie by ID: ${args.id}`);
      return await Movie.findById(args.id);
    },

    movieByMovieId: async (_parent: unknown, args: { movieId: string }) => {
      console.log(`🔍 Fetching movie by movieId: ${args.movieId}`);
      return await Movie.findOne({ movieId: args.movieId });
    },

    moviesByTitle: async (_parent: unknown, args: { title: string }) => {
      console.log(`🔍 Searching movies by title: "${args.title}"`);
      const movies = await Movie.find({ 
        title: new RegExp(args.title, 'i') 
      }).sort({ releaseYear: -1 });
      console.log(`📊 Found ${movies.length} movies matching title`);
      return movies;
    },

    moviesByYear: async (_parent: unknown, args: { year: number }) => {
      console.log(`🔍 Searching movies by year: ${args.year}`);
      const movies = await Movie.find({ 
        releaseYear: args.year 
      }).sort({ rating: -1 });
      console.log(`📊 Found ${movies.length} movies from ${args.year}`);
      return movies;
    },

    moviesByGenre: async (_parent: unknown, args: { genre: string }) => {
      console.log(`🔍 Searching movies by genre: "${args.genre}"`);
      const movies = await Movie.find({ 
        genre: new RegExp(args.genre, 'i') 
      }).sort({ releaseYear: -1 });
      console.log(`📊 Found ${movies.length} movies in ${args.genre} genre`);
      return movies;
    },
  },

  Mutation: {
    createMovie: async (_parent: unknown, args: { input: CreateMovieInput }) => {
      console.log('🏗️ Creating movie with Input Type');
      console.log('📦 Input received:', JSON.stringify(args.input, null, 2));

      // Generate unique movieId
      const existingMovies = await Movie.countDocuments();
      movieCounter = existingMovies;
      const movieId = `movie-${String(movieCounter + 1).padStart(3, '0')}`;

      const movie = new Movie({
        movieId,
        title: args.input.title,
        director: args.input.director,
        releaseYear: args.input.releaseYear,
        genre: args.input.genre,
        duration: args.input.duration,
        description: args.input.description,
        rating: args.input.rating || 0,
        cast: args.input.cast || [],
        budget: args.input.budget
      });

      const savedMovie = await movie.save();
      console.log(`✅ Created movie: ${savedMovie.title} (${savedMovie.movieId})`);
      return savedMovie;
    },

    updateMovie: async (_parent: unknown, args: { id: string; input: UpdateMovieInput }) => {
      console.log('🔧 Updating movie with Input Type');
      console.log(`📝 Updating movie ID: ${args.id}`);
      console.log('📦 Update input received:', JSON.stringify(args.input, null, 2));

      // Find existing movie
      const existingMovie = await Movie.findOne({ movieId: args.id });
      if (!existingMovie) {
        console.log(`❌ Movie not found: ${args.id}`);
        return null;
      }

      // Build update data object with only provided fields
      const updateData: Partial<UpdateMovieInput> = {};
      
      // Check each field in the input and only include if provided
      Object.keys(args.input).forEach(key => {
        const value = args.input[key as keyof UpdateMovieInput];
        if (value !== undefined) {
          (updateData as any)[key] = value;
        }
      });

      console.log('🔄 Fields being updated:', Object.keys(updateData));

      const updatedMovie = await Movie.findOneAndUpdate(
        { movieId: args.id },
        updateData,
        { new: true, runValidators: true }
      );

      if (updatedMovie) {
        console.log(`✅ Updated movie: ${updatedMovie.title} (${updatedMovie.movieId})`);
      }

      return updatedMovie;
    },

    deleteMovie: async (_parent: unknown, args: { id: string }) => {
      console.log(`🗑️ Deleting movie: ${args.id}`);
      
      const result = await Movie.deleteOne({ movieId: args.id });
      const success = result.deletedCount > 0;
      
      if (success) {
        console.log(`✅ Deleted movie: ${args.id}`);
      } else {
        console.log(`❌ Movie not found for deletion: ${args.id}`);
      }
      
      return success;
    },
  },
};