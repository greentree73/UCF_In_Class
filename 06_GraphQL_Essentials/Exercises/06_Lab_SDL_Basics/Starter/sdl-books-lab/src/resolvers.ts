import { BOOKS, IBook } from './models/BOOKS';

type CreateBookInput = {
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  inStock: boolean;
};

export const resolvers = {
  Query: {
    books: () => BOOKS,
    book: (_parent: unknown, args: { id: string }) => {
      return BOOKS.find((book) => book.id === args.id) || null;
    }
  },
  Mutation: {
    createBook: (_parent: unknown, args: { input: CreateBookInput }) => {
      const nextNumber = String(BOOKS.length + 1).padStart(3, '0');

      const newBook: IBook = {
        id: `book-${nextNumber}`,
        ...args.input,
        createdAt: new Date().toISOString()
      };

      BOOKS.push(newBook);
      return newBook;
    }
  }
};
