import { GraphQLError } from 'graphql';
import { BookModel } from './models/book.js';

type CreateBookInput = {
  title: string;
  author: string;
  releaseYear: number;
  slug: string;
};

type UpdateBookInput = {
  title?: string;
  author?: string;
  releaseYear?: number;
};

export const resolvers = {
  Query: {
    books: async () => {
      return BookModel.find().sort({ createdAt: -1 });
    },
    book: async (_parent: unknown, args: { id: string }) => {
      return BookModel.findById(args.id);
    },
  },
  Mutation: {
    createBook: async (_parent: unknown, args: { input: CreateBookInput }) => {
      return BookModel.create(args.input);
    },
    updateBook: async (
      _parent: unknown,
      args: { id: string; input: UpdateBookInput },
    ) => {
      const updated = await BookModel.findByIdAndUpdate(args.id, args.input, {
        new: true,
        runValidators: true,
      });

      if (!updated) {
        throw new GraphQLError('Book not found', {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      }

      return updated;
    },
  },
};
