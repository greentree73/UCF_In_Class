type BookRecord = {
  id?: unknown;
  _id?: unknown;
  title: string;
  author: string;
  slug: string;
};

type UpdateBookInput = {
  title?: string;
  author?: string;
};

type BookModelLike = {
  find: () => Promise<BookRecord[]>;
  findById: (id: string) => Promise<BookRecord | null>;
  create: (input: { title: string; author: string }) => Promise<BookRecord>;
  findByIdAndUpdate: (
    id: string,
    update: { title?: string; author?: string; slug?: string },
    options: { new: true; runValidators: true }
  ) => Promise<BookRecord | null>;
};

function toBookResponse(book: BookRecord) {
  return {
    id: String(book._id ?? book.id ?? ""),
    title: book.title,
    author: book.author,
    slug: book.slug
  };
}

function createSlug(title: string) {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function createResolvers(bookModel: BookModelLike) {
  return {
    Query: {
      health: () => "API is healthy",
      books: async () => {
        const books = await bookModel.find();
        return books.map(toBookResponse);
      },
      book: async (_: unknown, args: { id: string }) => {
        const book = await bookModel.findById(args.id);
        return book ? toBookResponse(book) : null;
      }
    },
    Mutation: {
      createBook: async (_: unknown, args: { input: { title: string; author: string } }) => {
        const created = await bookModel.create(args.input);
        return toBookResponse(created);
      },
      updateBook: async (_: unknown, args: { id: string; input: UpdateBookInput }) => {
        const update: { title?: string; author?: string; slug?: string } = {};

        if (typeof args.input.title === "string") {
          update.title = args.input.title;
          update.slug = createSlug(args.input.title);
        }

        if (typeof args.input.author === "string") {
          update.author = args.input.author;
        }

        const updated = await bookModel.findByIdAndUpdate(args.id, update, {
          new: true,
          runValidators: true
        });

        if (!updated) {
          throw new Error("Book not found");
        }

        return toBookResponse(updated);
      }
    }
  };
}
