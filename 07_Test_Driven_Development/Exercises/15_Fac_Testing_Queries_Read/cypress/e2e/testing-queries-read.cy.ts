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
    author: "Facilitator"
  },
  {
    title: "Find All Query Patterns",
    author: "Facilitator"
  },
  {
    title: "Find by ID Query Flow",
    author: "Facilitator"
  }
];

describe("Testing GraphQL read queries against live Mongoose data", () => {
  beforeEach(() => {
    // Reset and reseed before every test so each case starts from known data.
    // This keeps tests deterministic and avoids cross-test pollution.
    cy.task("db:clearBooks");
    cy.task("db:seedBooks", seedBooks);
  });

  it("Find All query returns every seeded record", () => {
    // Execute the list query exactly how a client would call the API.
    cy.gql(booksQuery).then((response) => {
      // Transport-level success: GraphQL endpoint responded correctly.
      expect(response.status).to.eq(200);

      // No resolver/schema errors are expected for this happy-path query.
      expect(response.body.errors).to.be.undefined;

      // Verify full dataset was returned from seeded collection.
      expect(response.body.data.books).to.have.length(3);

      // Map to titles for clear, readable inclusion assertions.
      const returnedTitles = response.body.data.books.map((book: { title: string }) => book.title);
      expect(returnedTitles).to.include("GraphQL Read Testing");
      expect(returnedTitles).to.include("Find All Query Patterns");
      expect(returnedTitles).to.include("Find by ID Query Flow");
    });
  });

  it("Find by ID query returns the specific requested record", () => {
    // Step 1: fetch all records so we can pick a real id from live data.
    // This avoids hard-coding ids and makes the test resilient across runs.
    cy.gql(booksQuery).then((allBooksResponse) => {
      const targetBook = allBooksResponse.body.data.books.find(
        (book: { title: string }) => book.title === "Find by ID Query Flow"
      );

      // Guard assertion: ensures we found the record we plan to query by id.
      expect(targetBook).to.exist;

      // Step 2: query by the selected id and assert exact record details.
      cy.gql(bookByIdQuery, { id: targetBook.id }).then((singleBookResponse) => {
        expect(singleBookResponse.status).to.eq(200);
        expect(singleBookResponse.body.errors).to.be.undefined;

        // Query should return one object, not a list.
        expect(singleBookResponse.body.data.book).to.exist;

        // Assert fields to prove the correct record was returned.
        expect(singleBookResponse.body.data.book.title).to.eq("Find by ID Query Flow");
        expect(singleBookResponse.body.data.book.author).to.eq("Facilitator");
      });
    });
  });
});
