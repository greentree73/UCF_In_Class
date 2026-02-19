import { Movie } from './models/Movie';

const seedData = [
  {
    movieId: 'movie-001',
    title: 'The Matrix',
    director: 'Lana Wachowski, Lilly Wachowski',
    releaseYear: 1999,
    genre: 'Sci-Fi',
    rating: 8.7,
    duration: 136,
    description: 'A computer programmer discovers that reality as he knows it is actually a simulated reality called the Matrix created by machines to subdue the human population.',
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
    budget: 63000000,
    boxOffice: 467200000
  },
  {
    movieId: 'movie-002',
    title: 'Blade Runner 2049',
    director: 'Denis Villeneuve',
    releaseYear: 2017,
    genre: 'Sci-Fi',
    rating: 8.0,
    duration: 164,
    description: 'A young blade runner\'s discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who\'s been missing for thirty years.',
    cast: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas'],
    budget: 150000000,
    boxOffice: 259300000
  },
  {
    movieId: 'movie-003',
    title: 'Her',
    director: 'Spike Jonze',
    releaseYear: 2013,
    genre: 'Drama',
    rating: 8.0,
    duration: 126,
    description: 'In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.',
    cast: ['Joaquin Phoenix', 'Scarlett Johansson', 'Amy Adams'],
    budget: 23000000,
    boxOffice: 48100000
  }
];

export async function seedDatabase() {
  try {
    // Check if data already exists
    const existingMovies = await Movie.countDocuments();
    
    if (existingMovies > 0) {
      console.log('🎬 Database already seeded, skipping...');
      return;
    }

    // Insert seed data
    await Movie.insertMany(seedData);
    console.log('🎬 Database seeded successfully with technology movies!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}