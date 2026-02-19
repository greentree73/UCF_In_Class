import mongoose from 'mongoose';
import { Movie } from './models/Movie';

const movieData = [
  {
    movieId: 'movie-001',
    title: 'The Matrix',
    director: 'The Wachowskis',
    releaseYear: 1999,
    genre: 'Sci-Fi',
    duration: 136,
    description: 'A computer programmer discovers reality is a simulation.',
    rating: 8.7,
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
    budget: 63000000,
    boxOffice: 467200000
  },
  {
    movieId: 'movie-002',
    title: 'Inception',
    director: 'Christopher Nolan',
    releaseYear: 2010,
    genre: 'Sci-Fi',
    duration: 148,
    description: 'A thief enters dreams to plant an idea.',
    rating: 8.8,
    cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy'],
    budget: 160000000,
    boxOffice: 836800000
  },
  {
    movieId: 'movie-003',
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    releaseYear: 2008,
    genre: 'Action',
    duration: 152,
    description: 'Batman faces the Joker in Gotham City.',
    rating: 9.0,
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    budget: 185000000,
    boxOffice: 1005000000
  },
  {
    movieId: 'movie-004',
    title: 'Blade Runner 2049',
    director: 'Denis Villeneuve',
    releaseYear: 2017,
    genre: 'Sci-Fi',
    duration: 164,
    description: 'A young blade runner uncovers a secret that could plunge society into chaos.',
    rating: 8.0,
    cast: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas'],
    budget: 150000000,
    boxOffice: 259200000
  },
  {
    movieId: 'movie-005',
    title: 'Mad Max: Fury Road',
    director: 'George Miller',
    releaseYear: 2015,
    genre: 'Action',
    duration: 120,
    description: 'In a post-apocalyptic wasteland, Max teams up with Furiosa.',
    rating: 8.1,
    cast: ['Tom Hardy', 'Charlize Theron', 'Nicholas Hoult'],
    budget: 150000000,
    boxOffice: 375000000
  },
  {
    movieId: 'movie-006',
    title: 'Dune',
    director: 'Denis Villeneuve',
    releaseYear: 2021,
    genre: 'Sci-Fi',
    duration: 155,
    description: 'Paul Atreides leads a rebellion on the desert planet Arrakis.',
    rating: 8.0,
    cast: ['Timothée Chalamet', 'Rebecca Ferguson', 'Oscar Isaac'],
    budget: 165000000,
    boxOffice: 400000000
  }
];

async function seedDatabase() {
  try {
    // Clear existing movies
    await Movie.deleteMany({});
    console.log('🗑️ Cleared existing movies');

    // Insert new movie data
    await Movie.insertMany(movieData);
    console.log('🎬 Seeded movie database!');
    console.log(`📊 Inserted ${movieData.length} movies`);

    // Log the movies for verification
    movieData.forEach(movie => {
      console.log(`  • ${movie.title} (${movie.releaseYear}) - ${movie.genre}`);
    });

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

// Auto-seed when this file is imported
seedDatabase();