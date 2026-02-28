type GraphQLRequestBody = {
  query: string;
  variables?: Record<string, unknown>;
};

type GraphQLRequestOptions = Partial<Cypress.RequestOptions>;

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

Cypress.Commands.add(
  'gql',
  <T = unknown>(
    query: string,
    variables: Record<string, unknown> = {},
    options: GraphQLRequestOptions = {},
  ) => {
    const body: GraphQLRequestBody = { query, variables };

    return cy.request<T>({
      method: 'POST',
      url: '/graphql',
      body,
      failOnStatusCode: false,
      ...options,
    });
  },
);

export {};
