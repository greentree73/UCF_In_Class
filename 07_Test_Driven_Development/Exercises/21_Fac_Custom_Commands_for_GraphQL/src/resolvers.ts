import { clearBooks, createBook, listBooks } from './store.js';
import type { CreateBookInput } from './types.js';

export const resolvers = {
  Query: {
    books: () => {
      return listBooks();
    },
  },
  Mutation: {
    createBook: (_parent: unknown, args: { input: CreateBookInput }) => {
      return createBook(args.input);
    },
    clearBooks: () => {
      return clearBooks();
    },
  },
};
