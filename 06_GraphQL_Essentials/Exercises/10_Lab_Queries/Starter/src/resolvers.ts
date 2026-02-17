import { BOOKS } from './models/BOOKS';

export const resolvers = {
  Query: {
    books: () => BOOKS,
    book: (_parent: unknown, args: { id: string }) => {
      return BOOKS.find((book) => book.id === args.id) || null;
    },
    booksByStock: (_parent: unknown, args: { inStock: boolean }) => {
      return BOOKS.filter((book) => book.inStock === args.inStock);
    }
  }
};
