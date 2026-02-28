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

    // TODO (Discuss): Why do we reset shared state before each test?
    cy.gql<GraphQLResponse<{ clearBooks: boolean }>>(clearBooksMutation).then((response) => {
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

    // TODO (Discuss): Why is typed response data useful for writing assertions quickly?
    cy.gql<GraphQLResponse<{ books: Book[] }>>(booksQuery).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.be.undefined;
      expect(response.body.data?.books).to.deep.equal([]);
    });
  });

  it('uses cy.createBook custom command to compose domain behavior', () => {
    const seededBook = {
      title: `Lab 22 Seed ${Date.now()}`,
      author: 'UCF Mentor',
      releaseYear: 2026,
      slug: `lab-22-seed-${Date.now()}`,
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

    // TODO (Discuss): Why is this command name more expressive than repeating mutation text in every test?
    cy.createBook<GraphQLResponse<{ createBook: Book }>>(seededBook).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.be.undefined;
      expect(response.body.data?.createBook.title).to.eq(seededBook.title);
    });

    // TODO (Discuss): Cypress command queue runs top-to-bottom. How does that guarantee reliable ordering here?
    cy.gql<GraphQLResponse<{ books: Book[] }>>(booksQuery).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.be.undefined;
      expect(response.body.data?.books).to.have.length(1);
      expect(response.body.data?.books[0].slug).to.eq(seededBook.slug);
    });
  });
});
