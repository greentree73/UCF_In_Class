type BookRecord = {
  id?: unknown;
  _id?: unknown;
  title: string;
  author: string;
  slug: string;
};

type BookModelLike = {
  find: () => Promise<BookRecord[]>;
  create: (input: { title: string; author: string }) => Promise<BookRecord>;
};

// Mapping helper normalizes both _id and id for GraphQL response shape.
function toBookResponse(book: BookRecord) {
  return {
    id: String(book._id ?? book.id ?? ""),
    title: book.title,
    author: book.author,
    slug: book.slug
  };
}

// Factory pattern keeps resolver logic testable by injecting a mock model.
export function createResolvers(bookModel: BookModelLike) {
  return {
    Query: {
      health: () => "API is healthy",
      books: async () => {
        const books = await bookModel.find();
        return books.map(toBookResponse);
      }
    },
    Mutation: {
      createBook: async (_: unknown, args: { input: { title: string; author: string } }) => {
        const created = await bookModel.create(args.input);
        return toBookResponse(created);
      }
    }
  };
}
