type GraphQLResponse<TData = unknown> = {
  data?: TData;
  errors?: Array<{
    message: string;
    extensions?: {
      // `extensions.code` is a GraphQL error classification value.
      // We use it for stable assertions (better than matching message text alone).
      code?: string;
      [key: string]: unknown;
    };
  }>;
};

type SeedBook = {
  title: string;
  author: string;
  releaseYear: number;
  slug: string;
};

describe('Handling GraphQL errors', () => {
  beforeEach(() => {
    // Keep tests deterministic by resetting the collection before each scenario.
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

    // In GraphQL, resolver/model validation failures usually return HTTP 200
    // with details inside `errors`, not a transport-level 4xx/5xx status.
    cy.gql<GraphQLResponse>(createBookMutation, {
      input: {
        title: 'No',
        author: '',
        releaseYear: 2024,
        slug: 'invalid-book-slug',
      },
    }).then((response) => {
      // Assert transport success first, then validate GraphQL error payload shape/content.
      expect(response.status).to.eq(200);
      expect(response.body.data).to.be.undefined;
      expect(response.body.errors).to.have.length.greaterThan(0);
      expect(response.body.errors?.[0].message).to.include('validation failed');
    });
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

    // This id is valid format but does not map to an existing document.
    // Resolver throws GraphQLError with `extensions.code = "NOT_FOUND"`.
    // Clients can branch on this code for consistent UX/handling logic.
    cy.gql<GraphQLResponse>(updateBookMutation, {
      id: validButMissingId,
      input: {
        title: 'Updated but missing',
      },
    }).then((response) => {
      // For resolver-thrown GraphQLError, data is null and errors contains the failure details.
      expect(response.status).to.eq(200);
      expect(response.body.data).to.be.null;
      expect(response.body.errors).to.have.length(1);
      expect(response.body.errors?.[0].message).to.include('Book not found');
      // `message` is human-readable, while `extensions.code` is machine-readable.
      // Prefer asserting both for clear intent and stronger test guarantees.
      expect(response.body.errors?.[0].extensions?.code).to.eq('NOT_FOUND');
    });
  });

  it('still returns successful data when inputs are valid', () => {
    const createdAtSuffix = Date.now();
    const seedBooks: SeedBook[] = [
      {
        title: `Fac 19 Seed ${createdAtSuffix}`,
        author: 'Instructor',
        releaseYear: 2020,
        slug: `fac-19-seed-${createdAtSuffix}`,
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

    // Contrast case: valid request should have data and no GraphQL errors array.
    cy.task('db:seedBooks', seedBooks);

    cy.gql<GraphQLResponse<{ books: SeedBook[] }>>(booksQuery).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.be.undefined;
      expect(response.body.data?.books).to.have.length(1);
      expect(response.body.data?.books[0].title).to.eq(seedBooks[0].title);
    });
  });
});
