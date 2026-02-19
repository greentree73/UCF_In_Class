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
    description: 'A computer programmer discovers reality is a simulation.',
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
    isPopular: true
  },
  {
    movieId: 'movie-002',
    title: 'Blade Runner 2049',
    director: 'Denis Villeneuve',
    releaseYear: 2017,
    genre: 'Sci-Fi',
    rating: 8.0,
    duration: 164,
    description: 'A young blade runner discovers a secret that could plunge society into chaos.',
    cast: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas'],
    isPopular: true
  },
  {
    movieId: 'movie-003',
    title: 'Her',
    director: 'Spike Jonze',
    releaseYear: 2013,
    genre: 'Drama',
    rating: 8.0,
    duration: 126,
    description: 'A man develops a relationship with an AI operating system.',
    cast: ['Joaquin Phoenix', 'Scarlett Johansson', 'Amy Adams'],
    isPopular: true
  },
  {
    movieId: 'movie-004',
    title: 'Ex Machina',
    director: 'Alex Garland',
    releaseYear: 2014,
    genre: 'Thriller',
    rating: 7.7,
    duration: 108,
    description: 'A young programmer tests an AI by conducting a Turing test.',
    cast: ['Domhnall Gleeson', 'Alicia Vikander', 'Oscar Isaac'],
    isPopular: false
  },
  {
    movieId: 'movie-005',
    title: 'Ready Player One',
    director: 'Steven Spielberg',
    releaseYear: 2018,
    genre: 'Action',
    rating: 7.4,
    duration: 140,
    description: 'Gunter Wade Watts searches for an easter egg in a virtual reality world.',
    cast: ['Tye Sheridan', 'Olivia Cooke', 'Ben Mendelsohn'],
    isPopular: true
  },
  {
    movieId: 'movie-006',
    title: 'The Social Network',
    director: 'David Fincher',
    releaseYear: 2010,
    genre: 'Drama',
    rating: 7.7,
    duration: 120,
    description: 'The story of Facebook\\'s creation and the lawsuits that followed.',
    cast: ['Jesse Eisenberg', 'Andrew Garfield', 'Justin Timberlake'],
    isPopular: true
  },
  {
    movieId: 'movie-007',
    title: 'Tron: Legacy',
    director: 'Joseph Kosinski',
    releaseYear: 2010,
    genre: 'Action',
    rating: 6.8,
    duration: 125,
    description: 'Sam Flynn enters a digital world to find his missing father.',
    cast: ['Garrett Hedlund', 'Jeff Bridges', 'Olivia Wilde'],
    isPopular: false
  },
  {
    movieId: 'movie-008',
    title: 'Minority Report',
    director: 'Steven Spielberg',
    releaseYear: 2002,
    genre: 'Thriller',
    rating: 7.6,
    duration: 145,
    description: 'In a future where crimes are predicted, a cop becomes a fugitive.',
    cast: ['Tom Cruise', 'Colin Farrell', 'Samantha Morton'],
    isPopular: true
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
    console.log('🎬 Database seeded successfully with movies!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}