// GraphQL request payload shape: https://graphql.org/learn/serving-over-http/#post-request-and-body
type GraphQLRequestBody = {
  query: string;
  variables?: Record<string, unknown>;
};

// Allows callers to pass any supported cy.request options (headers, auth, timeout, etc).
// Cypress request options: https://docs.cypress.io/api/commands/request
type GraphQLRequestOptions = Partial<Cypress.RequestOptions>;

// Strongly-typed input contract for our createBook mutation helper.
type CreateBookInput = {
  title: string;
  author: string;
  releaseYear: number;
  slug: string;
};

// Type augmentation makes custom commands available in IntelliSense and type checking.
// Cypress custom command typing: https://docs.cypress.io/app/tooling/typescript-support#Types-for-Custom-Commands
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

// Register a reusable low-level GraphQL command.
// Cypress custom commands API: https://docs.cypress.io/api/cypress-api/custom-commands
Cypress.Commands.add(
  'gql',
  <T = unknown>(
    query: string,
    variables: Record<string, unknown> = {},
    options: GraphQLRequestOptions = {},
  ) => {
    // Build a standard GraphQL POST body so specs only focus on query + variables.
    const body: GraphQLRequestBody = { query, variables };

    // Send the GraphQL request to /graphql.
    // failOnStatusCode: false keeps responses available for assertion even on non-2xx transport errors.
    return cy.request<T>({
      method: 'POST',
      url: '/graphql',
      body,
      failOnStatusCode: false,
      ...options,
    });
  },
);

// Register a higher-level domain command that composes cy.gql.
// This keeps test specs readable by hiding mutation boilerplate.
Cypress.Commands.add(
  'createBook',
  <T = unknown>(input: CreateBookInput, options: GraphQLRequestOptions = {}) => {
    // Mutation document used by this helper.
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

    // Delegate to the low-level command and pass GraphQL variables as { input }.
    return cy.gql<T>(mutation, { input }, options);
  },
);

export {};
