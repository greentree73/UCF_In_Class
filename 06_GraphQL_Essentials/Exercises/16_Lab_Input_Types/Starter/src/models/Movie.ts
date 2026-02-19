import mongoose, { Schema, Document } from 'mongoose';

export interface IMovie extends Document {
  movieId: string;
  title: string;
  director: string;
  releaseYear: number;
  genre: string;
  rating: number;
  duration: number;
  description: string;
  cast: string[];
  budget: number;
  boxOffice: number;
}

const MovieSchema: Schema = new Schema({
  movieId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  duration: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cast: {
    type: [String],
    default: []
  },
  budget: {
    type: Number,
    default: 0
  },
  boxOffice: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export const Movie = mongoose.model<IMovie>('Movie', MovieSchema);