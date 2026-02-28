import mongoose, { InferSchemaType, model, Schema } from 'mongoose';

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [3, 'Title must be at least 3 characters'],
      trim: true,
    },
    cuisine: {
      type: String,
      required: [true, 'Cuisine is required'],
      trim: true,
    },
    prepTimeMinutes: {
      type: Number,
      required: [true, 'Prep time is required'],
      min: [5, 'Prep time must be at least 5 minutes'],
      max: [240, 'Prep time cannot exceed 240 minutes'],
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty is required'],
      enum: {
        values: ['Easy', 'Medium', 'Hard'],
        message: 'Difficulty must be Easy, Medium, or Hard',
      },
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    ingredients: {
      type: [
        {
          type: String,
          trim: true,
          minlength: [2, 'Each ingredient must be at least 2 characters'],
        },
      ],
      required: [true, 'Ingredients are required'],
      validate: {
        validator: (value: string[]) => Array.isArray(value) && value.length > 0,
        message: 'At least one ingredient is required',
      },
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
