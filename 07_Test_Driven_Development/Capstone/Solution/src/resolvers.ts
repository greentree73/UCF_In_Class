import { GraphQLError } from 'graphql';
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

const notFoundError = () =>
  new GraphQLError('Recipe not found', {
    extensions: {
      code: 'NOT_FOUND',
    },
  });

export const resolvers = {
  Query: {
    recipes: async () => {
      return RecipeModel.find().sort({ createdAt: -1 });
    },
    recipe: async (_parent: unknown, args: { id: string }) => {
      return RecipeModel.findById(args.id);
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
      const updated = await RecipeModel.findByIdAndUpdate(args.id, args.input, {
        new: true,
        runValidators: true,
      });

      if (!updated) {
        throw notFoundError();
      }

      return updated;
    },
    deleteRecipe: async (_parent: unknown, args: { id: string }) => {
      const deleted = await RecipeModel.findByIdAndDelete(args.id);

      if (!deleted) {
        throw notFoundError();
      }

      return deleted;
    },
  },
};
