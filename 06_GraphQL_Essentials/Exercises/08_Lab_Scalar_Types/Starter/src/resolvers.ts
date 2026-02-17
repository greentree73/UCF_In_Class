import { BOOKS } from './models/BOOKS';

export const resolvers = {
  Query: {
    books: () => BOOKS,
    book: (_parent: unknown, args: { id: string }) => {
      return BOOKS.find((book) => book.id === args.id) || null;
    }
  },
  Mutation: {
    updateBookPrice: (_parent: unknown, args: { id: string; price: number }) => {
      const book = BOOKS.find((entry) => entry.id === args.id);
      if (!book) {
        return null;
      }

      book.price = args.price;
      return book;
    }
  }
};
