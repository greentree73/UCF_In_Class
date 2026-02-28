// TODO (Discuss): This reusable shape models a GraphQL POST payload.
type GraphQLRequestBody = {
  query: string;
  variables?: Record<string, unknown>;
};

// TODO (Discuss): Why do we expose request options (like headers) instead of hard-coding them?
type GraphQLRequestOptions = Partial<Cypress.RequestOptions>;

// TODO (Discuss): Why is this TypeScript augmentation needed for custom commands in specs?
declare global {
  namespace Cypress {
    interface Chainable {
      gql<T = unknown>(
        query: string,
        variables?: Record<string, unknown>,
        options?: GraphQLRequestOptions,
      ): Chainable<Response<T>>;
    }
  }
}

// TODO (Discuss): This command centralizes GraphQL request setup used across all tests.
Cypress.Commands.add(
  'gql',
  <T = unknown>(
    query: string,
    variables: Record<string, unknown> = {},
    options: GraphQLRequestOptions = {},
  ) => {
    // TODO (Discuss): Why is the GraphQL body assembled here instead of every test case?
    const body: GraphQLRequestBody = { query, variables };

    return cy.request<T>({
      method: 'POST',
      url: '/graphql',
      body,
      // TODO (Discuss): Why keep this false when testing error responses?
      failOnStatusCode: false,
      ...options,
    });
  },
);

export {};
