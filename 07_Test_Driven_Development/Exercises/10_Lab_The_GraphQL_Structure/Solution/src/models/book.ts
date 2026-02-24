import { Schema, model, type InferSchemaType } from "mongoose";

// This schema is intentionally small so students can focus on setup concepts.
const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

export type BookDocument = InferSchemaType<typeof bookSchema>;

// Mongoose model used by GraphQL resolvers.
export const BookModel = model("Book", bookSchema);
