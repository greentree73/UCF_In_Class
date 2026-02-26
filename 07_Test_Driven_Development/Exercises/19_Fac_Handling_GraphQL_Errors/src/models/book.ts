import mongoose, { InferSchemaType, model, Schema } from 'mongoose';

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [3, 'Title must be at least 3 characters'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    releaseYear: {
      type: Number,
      min: [1450, 'Release year must be after 1450'],
      max: [new Date().getFullYear() + 1, 'Release year is too far in the future'],
      required: [true, 'Release year is required'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  },
);

export type Book = InferSchemaType<typeof bookSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const BookModel = model('Book', bookSchema);
