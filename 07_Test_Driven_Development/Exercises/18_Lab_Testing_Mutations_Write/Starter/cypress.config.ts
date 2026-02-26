import { defineConfig } from "cypress";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

type SeedBook = {
  title: string;
  author: string;
};

const fallbackMongoUri = "mongodb://127.0.0.1:27017/lab_testing_mutations_write_starter";
let connectPromise: Promise<typeof mongoose> | null = null;

async function ensureTaskDbConnection() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!connectPromise) {
    const mongoUri = process.env.MONGODB_URI ?? fallbackMongoUri;
    connectPromise = mongoose.connect(mongoUri);
  }

  await connectPromise;
}

function createSlug(title: string) {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: "http://localhost:4000",
    specPattern: "cypress/e2e/**/*.cy.ts",
    setupNodeEvents(on) {
      on("task", {
        async "db:clearBooks"() {
          await ensureTaskDbConnection();
          const result = await mongoose.connection.collection("books").deleteMany({});
          return { deletedCount: result.deletedCount ?? 0 };
        },
        async "db:seedBooks"(books: SeedBook[]) {
          await ensureTaskDbConnection();

          if (!Array.isArray(books)) {
            throw new Error("db:seedBooks expects an array of books");
          }

          const timestamp = Date.now();
          const seedDocs = books.map((book, index) => ({
            title: book.title,
            author: book.author,
            slug: `${createSlug(book.title)}-${timestamp}-${index}`,
            createdAt: new Date(),
            updatedAt: new Date()
          }));

          const result = await mongoose.connection.collection("books").insertMany(seedDocs);
          return { insertedCount: Object.keys(result.insertedIds).length };
        },
        async "db:getBookById"(id: string) {
          await ensureTaskDbConnection();

          const book = await mongoose.connection
            .collection("books")
            .findOne({ _id: new mongoose.Types.ObjectId(id) });

          if (!book) {
            return null;
          }

          return {
            id: String(book._id),
            title: book.title,
            author: book.author,
            slug: book.slug
          };
        }
      });
    }
  },
  env: {
    apiPath: "/graphql"
  }
});
