// This spec is assembled in three layers:
// 1) `before(...)` logs in and captures role-based tokens,
// 2) each `it(...)` executes one auth scenario,
// 3) assertions verify GraphQL `data`/`errors` response behavior.
// Mocha BDD structure used by Cypress: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests

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

describe('Authentication and authorization', () => {
  // Shared token state for this suite.
  // Values are set once in `before(...)` and reused in authorization tests.
  let studentToken = '';
  let adminToken = '';

  before(() => {
    // `before(...)` runs once before all tests in this suite.
    // Hook docs: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Hooks
    const loginMutation = `
      mutation Login($role: String!) {
        login(role: $role) {
          token
          user {
            id
            name
            role
          }
        }
      }
    `;

    // This first call logs in as a student and stores the token for later authorization checks.
    // `cy.gql(...)` is a custom command defined in `cypress/support/commands.ts`.
    // Custom commands docs: https://docs.cypress.io/api/cypress-api/custom-commands
    // Under the hood it uses `cy.request(...)`: https://docs.cypress.io/api/commands/request
    cy.gql<GraphQLResponse<{ login: { token: string } }>>(loginMutation, { role: 'student' }).then((response) => {
      // `.then(...)` receives the previous command's subject (the HTTP response).
      // Then docs: https://docs.cypress.io/api/commands/then
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.be.undefined;
      studentToken = response.body.data?.login.token ?? '';
      expect(studentToken).to.not.equal('');
    });

    // This second call logs in as an admin and stores a separate token for admin-only access tests.
    cy.gql<GraphQLResponse<{ login: { token: string } }>>(loginMutation, { role: 'admin' }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.be.undefined;
      adminToken = response.body.data?.login.token ?? '';
      expect(adminToken).to.not.equal('');
    });
  });

  it('returns UNAUTHENTICATED when querying me without Authorization header', () => {
    // `it(...)` defines a single scenario with clear arrange/act/assert flow.
    const meQuery = `
      query Me {
        me {
          id
          name
          role
        }
      }
    `;

    // No headers are passed here, so the request is intentionally unauthenticated.
    cy.gql<GraphQLResponse>(meQuery).then((response) => {
      // GraphQL commonly keeps HTTP transport at 200 and reports resolver failures in `errors`.
      // GraphQL response format: https://graphql.org/learn/response/
      expect(response.status).to.eq(200);
      expect(response.body.data).to.be.null;
      expect(response.body.errors).to.have.length(1);
      expect(response.body.errors?.[0].message).to.include('Authentication required');
      expect(response.body.errors?.[0].extensions?.code).to.eq('UNAUTHENTICATED');
    });
  });

  it('returns FORBIDDEN when student token calls adminDashboard', () => {
    const adminDashboardQuery = `
      query AdminDashboard {
        adminDashboard
      }
    `;

    // `options.headers.Authorization` adds the Bearer token to simulate an authenticated request.
    // Request headers docs: https://docs.cypress.io/api/commands/request#Options
    cy.gql<GraphQLResponse>(
      adminDashboardQuery,
      {},
      {
        headers: {
          Authorization: `Bearer ${studentToken}`,
        },
      },
    ).then((response) => {
      // Student is authenticated but lacks required admin role, so we expect `FORBIDDEN`.
      expect(response.status).to.eq(200);
      expect(response.body.data).to.be.null;
      expect(response.body.errors).to.have.length(1);
      expect(response.body.errors?.[0].message).to.include('Insufficient permissions');
      expect(response.body.errors?.[0].extensions?.code).to.eq('FORBIDDEN');
    });
  });

  it('returns dashboard data when admin token calls adminDashboard', () => {
    const adminDashboardQuery = `
      query AdminDashboard {
        adminDashboard
      }
    `;

    // This request uses the admin token, so resolver authorization should pass.
    // This final test contrasts with prior failure cases by asserting successful `data` shape.
    cy.gql<GraphQLResponse<{ adminDashboard: string }>>(
      adminDashboardQuery,
      {},
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      },
    ).then((response) => {
      // Happy path: no errors array and data contains the protected field result.
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.be.undefined;
      expect(response.body.data?.adminDashboard).to.include('Admin-only analytics');
    });
  });
});
