const { buildSchema } = require('graphql');
const Book = require('../models/book');

// In-memory storage keeps this demo runnable without database setup.
const books = [{ id: '1', title: 'CI Basics', author: 'Dev Team' }];

const schema = buildSchema(`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book!]!
    health: String!
  }

  type Mutation {
    addBook(title: String!, author: String!): Book!
  }
`);

const root = {
  books: () => books,
  health: () => 'ok',
  addBook: ({ title, author }) => {
    // Use Mongoose model validation even without a DB connection.
    const candidate = new Book({ title, author });
    const validationError = candidate.validateSync();

    if (validationError) {
      throw new Error('Invalid book payload');
    }

    const created = {
      id: String(books.length + 1),
      title,
      author
    };

    books.push(created);
    return created;
  }
};

module.exports = { schema, root };
