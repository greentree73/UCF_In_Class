type GraphQLRequestBody = {
  query: string;
  variables?: Record<string, unknown>;
};

type GraphQLRequestOptions = Partial<Cypress.RequestOptions>;

type CreateBookInput = {
  title: string;
  author: string;
  releaseYear: number;
  slug: string;
};

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

    return cy.gql<T>(mutation, { input }, options);
  },
);

export {};
