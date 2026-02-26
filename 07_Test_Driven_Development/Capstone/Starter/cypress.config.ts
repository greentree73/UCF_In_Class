import { defineConfig } from 'cypress';
import mongoose from 'mongoose';
import { RecipeModel } from './src/models/recipe';

type SeedRecipeInput = {
  title: string;
  cuisine: string;
  prepTimeMinutes: number;
  difficulty: string;
  slug: string;
  ingredients: string[];
};

const withDb = async <T>(callback: () => Promise<T>) => {
  const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/tdd_week07_capstone_starter';

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri);
  }

  return callback();
};

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on) {
      on('task', {
        async 'db:clearRecipes'() {
          return withDb(async () => {
            await RecipeModel.deleteMany({});
            return null;
          });
        },
        async 'db:seedRecipes'(recipes: SeedRecipeInput[]) {
          return withDb(async () => {
            const inserted = await RecipeModel.insertMany(recipes, { ordered: true });
            return inserted.map((recipe) => ({
              _id: String(recipe._id),
              title: recipe.title,
              cuisine: recipe.cuisine,
              prepTimeMinutes: recipe.prepTimeMinutes,
              difficulty: recipe.difficulty,
              slug: recipe.slug,
              ingredients: recipe.ingredients,
            }));
          });
        },
        async 'db:getRecipeById'(id: string) {
          return withDb(async () => {
            const recipe = await RecipeModel.findById(id).lean();
            if (!recipe) {
              return null;
            }

            return {
              ...recipe,
              _id: String(recipe._id),
            };
          });
        },
      });
    },
  },
});
