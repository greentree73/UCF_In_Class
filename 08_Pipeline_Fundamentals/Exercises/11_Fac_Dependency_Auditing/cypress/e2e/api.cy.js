describe('Dependency auditing demo API', () => {
  it('GET / returns welcome message', () => {
    cy.request('/').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq(
        'Welcome to dependency auditing demo API'
      );
    });
  });

  it('GET /health returns security check metadata', () => {
    cy.request('/health').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('ok');
      expect(response.body.checks).to.deep.equal([
        'npm-audit',
        'snyk',
        'cypress'
      ]);
    });
  });

  it('POST /graphql query books returns list', () => {
    cy.request('POST', '/graphql', {
      query: '{ books { id title author } }'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.books.length).to.be.greaterThan(0);
    });
  });

  it('POST /graphql mutation addBook validates and returns created book', () => {
    cy.request('POST', '/graphql', {
      query:
        'mutation { addBook(title: "Secure CI", author: "Instructor") { id title author } }'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.addBook.title).to.eq('Secure CI');
      expect(response.body.data.addBook.author).to.eq('Instructor');
    });
  });
});
