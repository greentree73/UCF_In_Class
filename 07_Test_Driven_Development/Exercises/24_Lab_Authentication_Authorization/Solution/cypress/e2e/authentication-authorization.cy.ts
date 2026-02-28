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
  let studentToken = '';
  let adminToken = '';

  before(() => {
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

    cy.gql<GraphQLResponse<{ login: { token: string } }>>(loginMutation, { role: 'student' }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.be.undefined;
      studentToken = response.body.data?.login.token ?? '';
      expect(studentToken).to.not.equal('');
    });

    cy.gql<GraphQLResponse<{ login: { token: string } }>>(loginMutation, { role: 'admin' }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.be.undefined;
      adminToken = response.body.data?.login.token ?? '';
      expect(adminToken).to.not.equal('');
    });
  });

  it('returns UNAUTHENTICATED when querying me without Authorization header', () => {
    const meQuery = `
      query Me {
        me {
          id
          name
          role
        }
      }
    `;

    cy.gql<GraphQLResponse>(meQuery).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.be.null;
      expect(response.body.errors).to.have.length(1);
      expect(response.body.errors?.[0].extensions?.code).to.eq('UNAUTHENTICATED');
    });
  });

  it('returns FORBIDDEN when student token calls adminDashboard', () => {
    const adminDashboardQuery = `
      query AdminDashboard {
        adminDashboard
      }
    `;

    cy.gql<GraphQLResponse>(
      adminDashboardQuery,
      {},
      {
        headers: {
          Authorization: `Bearer ${studentToken}`,
        },
      },
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.be.null;
      expect(response.body.errors).to.have.length(1);
      expect(response.body.errors?.[0].extensions?.code).to.eq('FORBIDDEN');
    });
  });

  it('returns dashboard data when admin token calls adminDashboard', () => {
    const adminDashboardQuery = `
      query AdminDashboard {
        adminDashboard
      }
    `;

    cy.gql<GraphQLResponse<{ adminDashboard: string }>>(
      adminDashboardQuery,
      {},
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      },
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.errors).to.be.undefined;
      expect(response.body.data?.adminDashboard).to.include('Admin-only analytics');
    });
  });
});
