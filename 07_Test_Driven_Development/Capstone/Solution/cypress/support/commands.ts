type GraphQLRequestBody = {
  query: string;
  variables?: Record<string, unknown>;
};

type GraphqlVariables = Record<string, unknown>;
type GraphqlOptions = Record<string, unknown>;

declare global {
  namespace Cypress {
    interface Chainable {
      env(key: string): Chainable<any>;
      env(keys: string[]): Chainable<Record<string, any>>;

      gql<T = unknown>(
        query: string,
        variables?: GraphqlVariables,
        options?: GraphqlOptions,
      ): Chainable<Response<T>>;
    }
  }
}

Cypress.Commands.add(
  'gql',
  <T = unknown>(
    query: string,
    variables: GraphqlVariables = {},
    options: GraphqlOptions = {},
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
