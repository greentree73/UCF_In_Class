import { RecipeModel } from './models/recipe';

type CreateRecipeInput = {
  title: string;
  cuisine: string;
  prepTimeMinutes: number;
  difficulty: string;
  slug: string;
  ingredients: string[];
};

type UpdateRecipeInput = {
  title?: string;
  cuisine?: string;
  prepTimeMinutes?: number;
  difficulty?: string;
  slug?: string;
  ingredients?: string[];
};

export const resolvers = {
  Query: {
    recipes: async () => {
      return RecipeModel.find();
    },
    recipe: async (_parent: unknown, _args: { id: string }) => {
      return null;
    },
  },
  Mutation: {
    createRecipe: async (_parent: unknown, args: { input: CreateRecipeInput }) => {
      return RecipeModel.create(args.input);
    },
    updateRecipe: async (
      _parent: unknown,
      args: { id: string; input: UpdateRecipeInput },
    ) => {
      return RecipeModel.findByIdAndUpdate(args.id, args.input, {
        new: true,
      });
    },
  },
};
