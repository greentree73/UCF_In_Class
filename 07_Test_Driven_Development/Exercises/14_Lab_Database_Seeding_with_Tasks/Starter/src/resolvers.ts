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

function toBookResponse(book: BookRecord) {
  return {
    id: String(book._id ?? book.id ?? ""),
    title: book.title,
    author: book.author,
    slug: book.slug
  };
}

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
