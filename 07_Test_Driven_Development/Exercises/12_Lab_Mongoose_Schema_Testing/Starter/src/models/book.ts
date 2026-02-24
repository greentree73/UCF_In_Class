import { Schema, model, type InferSchemaType } from "mongoose";

// This schema is intentionally small so students can focus on setup concepts.
const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Middleware example: generate a stable slug from title before validation/save.
bookSchema.pre("validate", function generateSlug(next) {
  const title = this.get("title");

  if (typeof title === "string" && title.trim().length > 0) {
    const generatedSlug = title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    this.set("slug", generatedSlug);
  }

  next();
});

export type BookDocument = InferSchemaType<typeof bookSchema>;

// Mongoose model used by GraphQL resolvers.
export const BookModel = model("Book", bookSchema);
