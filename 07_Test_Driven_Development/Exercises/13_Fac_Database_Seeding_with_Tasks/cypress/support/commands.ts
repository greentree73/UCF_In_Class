type GraphqlVariables = Record<string, unknown>;

declare global {
  namespace Cypress {
    interface Chainable {
      env(key: string): Chainable<any>;
      env(keys: string[]): Chainable<Record<string, any>>;

      gql<TResponse = any>(
        query: string,
        variables?: GraphqlVariables,
        options?: Partial<RequestOptions>
      ): Chainable<Response<TResponse>>;
    }
  }
}

Cypress.Commands.add("gql", (query, variables = {}, options = {}) => {
  return cy.env(["apiPath"]).then((env) => {
    const { apiPath } = env as { apiPath: string };

    return cy.request({
      ...options,
      method: "POST",
      url: apiPath,
      body: {
        query,
        variables
      }
    });
  });
});

export {};
