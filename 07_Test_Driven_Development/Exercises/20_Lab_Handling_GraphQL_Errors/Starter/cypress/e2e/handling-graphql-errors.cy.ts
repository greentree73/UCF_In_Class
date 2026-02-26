type GraphQLResponse<TData = unknown> = {
  data?: TData;
  errors?: Array<{
    message: string;
    extensions?: {
      code?: string;
      [key: string]: unknown;
    };
  }>;
};

describe('Handling GraphQL errors', () => {
  beforeEach(() => {
    cy.task('db:clearBooks');
  });

  it('returns GraphQL validation errors when createBook input fails Mongoose validation', () => {
    const createBookMutation = `
      mutation CreateBook($input: CreateBookInput!) {
        createBook(input: $input) {
          _id
          title
        }
      }
    `;

    // TODO: call cy.gql with invalid createBook input and assert:
    // - response.status is 200
    // - response.body.data is undefined
    // - response.body.errors has at least one item
    // - first error message includes 'validation failed'
  });

  it('returns NOT_FOUND GraphQL error when updateBook id does not exist', () => {
    const updateBookMutation = `
      mutation UpdateBook($id: ID!, $input: UpdateBookInput!) {
        updateBook(id: $id, input: $input) {
          _id
          title
        }
      }
    `;

    const validButMissingId = '64f8f10f2c77f4c2ec09a999';

    // TODO: call cy.gql with validButMissingId and assert:
    // - response.status is 200
    // - response.body.data is null
    // - response.body.errors has length 1
    // - first error message includes 'Book not found'
    // - first error extensions.code equals 'NOT_FOUND'
  });

  it('still returns successful data when inputs are valid', () => {
    const createdAtSuffix = Date.now();
    const seedBooks = [
      {
        title: `Lab 20 Seed ${createdAtSuffix}`,
        author: 'Instructor',
        releaseYear: 2020,
        slug: `lab-20-seed-${createdAtSuffix}`,
      },
    ];

    const booksQuery = `
      query Books {
        books {
          _id
          title
          author
          slug
        }
      }
    `;

    cy.task('db:seedBooks', seedBooks);

    cy.gql<GraphQLResponse<{ books: typeof seedBooks }>>(booksQuery).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.be.undefined;
      expect(response.body.data?.books).to.have.length(1);
      expect(response.body.data?.books[0].title).to.eq(seedBooks[0].title);
    });
  });
});
