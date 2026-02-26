const booksQuery = `
  query Books {
    books {
      id
      title
      author
      slug
    }
  }
`;

const bookByIdQuery = `
  query BookById($id: ID!) {
    book(id: $id) {
      id
      title
      author
      slug
    }
  }
`;

const seedBooks = [
  {
    title: "GraphQL Read Testing",
    author: "Student"
  },
  {
    title: "Find All Query Patterns",
    author: "Student"
  },
  {
    title: "Find by ID Query Flow",
    author: "Student"
  }
];

describe("Testing GraphQL read queries against live Mongoose data", () => {
  beforeEach(() => {
    cy.task("db:clearBooks");
    cy.task("db:seedBooks", seedBooks);
  });

  it("TODO: Find All query returns every seeded record", () => {
    // TODO:
    // 1) Query all books with cy.gql(booksQuery).
    // 2) Assert response.status is 200.
    // 3) Assert response.body.errors is undefined.
    // 4) Assert response.body.data.books has length 3.
    // 5) Assert all seeded titles are included.
    throw new Error("TODO: Implement Find All query test");
  });

  it("TODO: Find by ID query returns one requested record", () => {
    // TODO:
    // 1) Query all books to find the id for "Find by ID Query Flow".
    // 2) Query bookByIdQuery with that id.
    // 3) Assert status is 200 and errors is undefined.
    // 4) Assert returned book has expected title and author.
    throw new Error("TODO: Implement Find by ID query test");
  });
});
