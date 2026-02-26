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
    author: "Student"
  },
  {
    title: "Clean Database Per Spec",
    author: "Student"
  }
];

describe("Database seeding with Cypress tasks", () => {
  beforeEach(() => {
    cy.task("db:clearBooks");
    cy.task("db:seedBooks", seedBooks);
  });

  it("TODO: returns the seeded records from MongoDB", () => {
    // TODO:
    // 1) Call cy.gql with booksQuery.
    // 2) Assert response.status is 200.
    // 3) Assert response.body.errors is undefined.
    // 4) Assert response.body.data.books length is 2.
    // 5) Assert both seeded titles are included in returned titles.
    throw new Error("TODO: Implement Test 1");
  });

  it("TODO: can clear the collection via task and verify empty results", () => {
    // TODO:
    // 1) Call cy.task("db:clearBooks").
    // 2) Query books again with cy.gql(booksQuery).
    // 3) Assert status is 200 and errors is undefined.
    // 4) Assert books length is 0.
    throw new Error("TODO: Implement Test 2");
  });
});
