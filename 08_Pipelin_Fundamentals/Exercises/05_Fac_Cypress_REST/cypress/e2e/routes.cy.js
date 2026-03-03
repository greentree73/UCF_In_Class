describe('Express API route tests with cy.request()', () => {
  it('GET / returns a welcome message', () => {
    cy.request('/').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Welcome to the Cypress REST demo API');
    });
  });

  it('GET /health returns status ok', () => {
    cy.request('/health').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('ok');
    });
  });

  it('GET /api/users returns a list of users', () => {
    cy.request('/api/users').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.users).to.have.length(2);
      expect(response.body.users[0].name).to.eq('Ada');
    });
  });
});
