const createBookMutation = `
  mutation CreateBook($input: CreateBookInput!) {
    createBook(input: $input) {
      id
      title
      author
      slug
    }
  }
`;

const updateBookMutation = `
  mutation UpdateBook($id: ID!, $input: UpdateBookInput!) {
    updateBook(id: $id, input: $input) {
      id
      title
      author
      slug
    }
  }
`;

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

const seedBooks = [
  {
    title: "Original Mutation Title",
    author: "Student"
  }
];

describe("Testing GraphQL write mutations against API response and DB state", () => {
  beforeEach(() => {
    cy.task("db:clearBooks");
  });

  it("TODO: Create mutation persists data and returns expected GraphQL payload", () => {
    // TODO:
    // 1) Execute createBook mutation with a unique title.
    // 2) Assert response.status is 200 and errors is undefined.
    // 3) Assert response createBook fields (title/author/slug).
    // 4) Call cy.task("db:getBookById", createdId).
    // 5) Assert DB values match GraphQL response values.
    throw new Error("TODO: Implement Create mutation test");
  });

  it("TODO: Update mutation changes stored data and DB reflects same values", () => {
    // TODO:
    // 1) Seed a book with cy.task("db:seedBooks", seedBooks).
    // 2) Query books to get the seeded id.
    // 3) Execute updateBook mutation for that id.
    // 4) Assert GraphQL response has updated title/author/slug.
    // 5) Assert cy.task("db:getBookById", id) returns matching updated values.
    throw new Error("TODO: Implement Update mutation test");
  });
});
