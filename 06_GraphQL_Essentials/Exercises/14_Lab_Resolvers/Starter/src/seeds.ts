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
  },
  {
    movieId: 'movie-004',
    title: 'Ex Machina',
    director: 'Alex Garland',
    releaseYear: 2014,
    genre: 'Thriller',
    rating: 7.7,
    duration: 108,
    description: 'A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a breathtaking humanoid AI.',
    cast: ['Domhnall Gleeson', 'Alicia Vikander', 'Oscar Isaac'],
    budget: 15000000,
    boxOffice: 37400000
  },
  {
    movieId: 'movie-005',
    title: 'Ready Player One',
    director: 'Steven Spielberg',
    releaseYear: 2018,
    genre: 'Action',
    rating: 7.4,
    duration: 140,
    description: 'When the creator of a virtual reality world called the OASIS dies, he releases a video in which he challenges all OASIS users to find his Easter Egg.',
    cast: ['Tye Sheridan', 'Olivia Cooke', 'Ben Mendelsohn'],
    budget: 175000000,
    boxOffice: 582200000
  },
  {
    movieId: 'movie-006',
    title: 'The Social Network',
    director: 'David Fincher',
    releaseYear: 2010,
    genre: 'Drama',
    rating: 7.7,
    duration: 120,
    description: 'Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, but is later sued by two brothers who claimed he stole their idea.',
    cast: ['Jesse Eisenberg', 'Andrew Garfield', 'Justin Timberlake'],
    budget: 40000000,
    boxOffice: 224900000
  },
  {
    movieId: 'movie-007',
    title: 'Minority Report',
    director: 'Steven Spielberg',
    releaseYear: 2002,
    genre: 'Thriller',
    rating: 7.6,
    duration: 145,
    description: 'In a future where a special police unit is able to arrest murderers before they commit their crimes, an officer from that unit is himself accused of a future murder.',
    cast: ['Tom Cruise', 'Colin Farrell', 'Samantha Morton'],
    budget: 102000000,
    boxOffice: 358400000
  },
  {
    movieId: 'movie-008',
    title: 'Ghost in the Shell',
    director: 'Rupert Sanders',
    releaseYear: 2017,
    genre: 'Action',
    rating: 6.3,
    duration: 107,
    description: 'In the near future, Major Mira Killian is the first of her kind: A human saved from a terrible crash, who is cyber-enhanced to be a perfect soldier devoted to stopping dangerous criminals.',
    cast: ['Scarlett Johansson', 'Pilou Asbæk', 'Takeshi Kitano'],
    budget: 110000000,
    boxOffice: 169800000
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