import { defineConfig } from 'cypress';
import mongoose from 'mongoose';
import { BookModel } from './src/models/book.js';

type SeedBookInput = {
  title: string;
  author: string;
  releaseYear: number;
  slug: string;
};

const withDb = async <T>(callback: () => Promise<T>) => {
  const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/tdd_lab_20_starter';

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
        async 'db:clearBooks'() {
          return withDb(async () => {
            await BookModel.deleteMany({});
            return null;
          });
        },
        async 'db:seedBooks'(books: SeedBookInput[]) {
          return withDb(async () => {
            const inserted = await BookModel.insertMany(books, { ordered: true });
            return inserted.map((book) => ({
              _id: String(book._id),
              title: book.title,
              author: book.author,
              releaseYear: book.releaseYear,
              slug: book.slug,
            }));
          });
        },
      });
    },
  },
});
