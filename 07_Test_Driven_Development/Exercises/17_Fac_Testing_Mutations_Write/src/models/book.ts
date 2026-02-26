import { Schema, model, type InferSchemaType } from "mongoose";

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

export const BookModel = model("Book", bookSchema);
