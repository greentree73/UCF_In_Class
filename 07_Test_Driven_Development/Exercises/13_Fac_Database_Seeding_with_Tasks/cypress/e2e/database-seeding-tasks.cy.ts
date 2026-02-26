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
    title: "Seeding with Cypress Tasks",
    author: "Facilitator"
  },
  {
    title: "Clean Database Per Spec",
    author: "Facilitator"
  }
];

describe("Database seeding with Cypress tasks", () => {
  // beforeEach runs before every test in this describe block.
  // We reset DB state here so each test starts from a known baseline.
  beforeEach(() => {
    // cy.task executes Node-side code registered in cypress.config.ts.
    // This task removes all documents from the books collection.
    cy.task("db:clearBooks");

    // This task inserts our deterministic fixture data for the test.
    // Keeping seeding in a task avoids test-only API endpoints.
    cy.task("db:seedBooks", seedBooks);
  });

  it("returns the seeded records from MongoDB", () => {
    // cy.gql is a custom command that performs a POST request to /graphql.
    // It returns a Cypress chainable response object.
    cy.gql(booksQuery).then((response) => {
      // expect(...).to.eq(...) checks strict equality.
      // GraphQL requests should return HTTP 200 for successful transport.
      expect(response.status).to.eq(200);

      // to.be.undefined verifies no GraphQL runtime/validation errors were returned.
      expect(response.body.errors).to.be.undefined;

      // to.have.length(2) asserts exactly two records were returned.
      expect(response.body.data.books).to.have.length(2);

      const returnedTitles = response.body.data.books.map((book: { title: string }) => book.title);

      // to.include checks that an array contains a value.
      // We assert both seeded titles are present in the API response.
      expect(returnedTitles).to.include("Seeding with Cypress Tasks");
      expect(returnedTitles).to.include("Clean Database Per Spec");
    });
  });

  it("can clear the collection via task inside the test", () => {
    // A task can also be called inside a test when setup changes are test-specific.
    cy.task("db:clearBooks");

    cy.gql(booksQuery).then((response) => {
      // HTTP transport success.
      expect(response.status).to.eq(200);
      // No GraphQL errors returned.
      expect(response.body.errors).to.be.undefined;
      // After clearing, the books array should be empty.
      expect(response.body.data.books).to.have.length(0);
    });
  });
});
