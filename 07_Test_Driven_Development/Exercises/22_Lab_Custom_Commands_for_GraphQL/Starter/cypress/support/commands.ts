// TODO (Discuss): Why do we create a shared GraphQL request body type instead of inline objects in every command?
type GraphQLRequestBody = {
  query: string;
  variables?: Record<string, unknown>;
};

// TODO (Discuss): Which cy.request options might we pass here (headers, auth, timeout) and why?
type GraphQLRequestOptions = Partial<Cypress.RequestOptions>;

type CreateBookInput = {
  title: string;
  author: string;
  releaseYear: number;
  slug: string;
};

// TODO (Discuss): Why is global Chainable augmentation important for TypeScript IntelliSense in Cypress specs?
declare global {
  namespace Cypress {
    interface Chainable {
      gql<T = unknown>(
        query: string,
        variables?: Record<string, unknown>,
        options?: GraphQLRequestOptions,
      ): Chainable<Response<T>>;
      createBook<T = unknown>(
        input: CreateBookInput,
        options?: GraphQLRequestOptions,
      ): Chainable<Response<T>>;
    }
  }
}

// TODO (Discuss): This is the low-level transport command. What repeated setup does this remove from every test?
Cypress.Commands.add(
  'gql',
  <T = unknown>(
    query: string,
    variables: Record<string, unknown> = {},
    options: GraphQLRequestOptions = {},
  ) => {
    // TODO (Discuss): GraphQL HTTP requests usually send query + variables together in one POST body.
    const body: GraphQLRequestBody = { query, variables };

    return cy.request<T>({
      method: 'POST',
      url: '/graphql',
      body,
      // TODO (Discuss): Why keep failOnStatusCode false when writing API tests?
      failOnStatusCode: false,
      ...options,
    });
  },
);

// TODO (Discuss): This is a domain-level command composed from cy.gql. Why is this easier to read in specs?
Cypress.Commands.add(
  'createBook',
  <T = unknown>(input: CreateBookInput, options: GraphQLRequestOptions = {}) => {
    const mutation = `
      mutation CreateBook($input: CreateBookInput!) {
        createBook(input: $input) {
          id
          title
          author
          releaseYear
          slug
        }
      }
    `;

    // TODO (Discuss): Why do we pass variables as { input } to match $input in the mutation signature?
    return cy.gql<T>(mutation, { input }, options);
  },
);

export {};
