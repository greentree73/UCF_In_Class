describe('Linting/formatting facilitator API tests', () => {
  it('GET / returns welcome message', () => {
    cy.request('/').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq(
        'Welcome to the linting/formatting CI demo API'
      );
    });
  });

  it('GET /health returns quality check metadata', () => {
    cy.request('/health').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('ok');
      expect(response.body.checks).to.deep.equal(['lint', 'format', 'cypress']);
    });
  });
});
