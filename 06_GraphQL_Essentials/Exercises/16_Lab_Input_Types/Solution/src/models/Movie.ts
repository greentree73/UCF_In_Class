import mongoose, { Document, Schema } from 'mongoose';

interface IMovie extends Document {
  movieId: string;
  title: string;
  director: string;
  releaseYear: number;
  genre: string;
  duration: number;
  description: string;
  rating: number;
  cast: string[];
  budget?: number;
  boxOffice?: number;
}

const movieSchema = new Schema<IMovie>({
  movieId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  director: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  genre: { type: String, required: true },
  duration: { type: Number, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0, min: 0, max: 10 },
  cast: { type: [String], default: [] },
  budget: { type: Number },
  boxOffice: { type: Number }
}, { timestamps: true });

export const Movie = mongoose.model<IMovie>('Movie', movieSchema);
export type { IMovie };