describe('Dependency auditing starter API', () => {
  it('GET / returns welcome message', () => {
    cy.request('/').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq(
        'Welcome to dependency auditing starter API'
      );
    });
  });

  it('POST /graphql query books works', () => {
    cy.request('POST', '/graphql', {
      query: '{ books { id title author } }'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.books.length).to.be.greaterThan(0);
    });
  });

  it('POST /graphql mutation addBook works', () => {
    cy.request('POST', '/graphql', {
      query:
        'mutation { addBook(title: "Audit Gates", author: "Student") { id title author } }'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.addBook.title).to.eq('Audit Gates');
    });
  });
});
