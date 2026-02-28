type Book = {
  id: string;
  title: string;
  author: string;
  releaseYear: number;
  slug: string;
};

type GraphQLResponse<TData = unknown> = {
  data?: TData;
  errors?: Array<{
    message: string;
  }>;
};

describe('Custom Commands for GraphQL', () => {
  beforeEach(() => {
    const clearBooksMutation = `
      mutation ClearBooks {
        clearBooks
      }
    `;

    // `cy.gql(...)` is our custom command that wraps `cy.request(...)`.
    // This removes repeated HTTP boilerplate from every GraphQL test.
    cy.gql<GraphQLResponse<{ clearBooks: boolean }>>(clearBooksMutation).then((response) => {
      // `.then(...)` receives the Cypress command subject from the previous chain link.
      // Here the subject is the HTTP response returned by `cy.request`.
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.be.undefined;
      expect(response.body.data?.clearBooks).to.eq(true);
    });
  });

  it('uses cy.gql to run a query with no repeated request setup', () => {
    const booksQuery = `
      query Books {
        books {
          id
          title
        }
      }
    `;

    // Generic type syntax `<GraphQLResponse<...>>` gives us typed access to `response.body.data`.
    // This helps students understand expected payload shape while writing assertions.
    cy.gql<GraphQLResponse<{ books: Book[] }>>(booksQuery).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.be.undefined;
      expect(response.body.data?.books).to.deep.equal([]);
    });
  });

  it('uses cy.createBook custom command to compose domain behavior', () => {
    const seededBook = {
      title: `Fac 21 Seed ${Date.now()}`,
      author: 'UCF Facilitator',
      releaseYear: 2026,
      slug: `fac-21-seed-${Date.now()}`,
    };

    const booksQuery = `
      query Books {
        books {
          id
          title
          author
          releaseYear
          slug
        }
      }
    `;

    // `cy.createBook(...)` is a higher-level custom command built on top of `cy.gql(...)`.
    // This demonstrates command composition: reusable helpers calling other helpers.
    cy.createBook<GraphQLResponse<{ createBook: Book }>>(seededBook).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.be.undefined;
      expect(response.body.data?.createBook.title).to.eq(seededBook.title);
    });

    // Cypress queues commands in order, so this query runs after `cy.createBook(...)` completes.
    // That command queue behavior is why we can rely on data created above in this next assertion.
    cy.gql<GraphQLResponse<{ books: Book[] }>>(booksQuery).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.be.undefined;
      expect(response.body.data?.books).to.have.length(1);
      expect(response.body.data?.books[0].slug).to.eq(seededBook.slug);
    });
  });

  it('passes variables through cy.gql to keep operations dynamic', () => {
    const createBookMutation = `
      mutation CreateBook($input: CreateBookInput!) {
        createBook(input: $input) {
          id
          title
          author
        }
      }
    `;

    const variables = {
      input: {
        title: 'GraphQL with Custom Commands',
        author: 'Knightro',
        releaseYear: 2026,
        slug: 'graphql-custom-commands',
      },
    };

    // The second argument to `cy.gql(query, variables)` maps to GraphQL `$variables`.
    // This mirrors how GraphQL clients send parameterized operations in production apps.
    cy.gql<GraphQLResponse<{ createBook: Book }>>(createBookMutation, variables).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.be.undefined;
      expect(response.body.data?.createBook.author).to.eq('Knightro');
    });
  });
});
