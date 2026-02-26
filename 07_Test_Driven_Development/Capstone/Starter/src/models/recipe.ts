import mongoose, { InferSchemaType, model, Schema } from 'mongoose';

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    cuisine: {
      type: String,
      trim: true,
    },
    prepTimeMinutes: {
      type: Number,
    },
    difficulty: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    ingredients: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export type Recipe = InferSchemaType<typeof recipeSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const RecipeModel = model('Recipe', recipeSchema);
