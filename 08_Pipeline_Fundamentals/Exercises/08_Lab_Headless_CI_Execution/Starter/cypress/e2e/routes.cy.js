describe('Headless CI starter route tests', () => {
  it('GET / returns welcome message', () => {
    cy.request('/').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Welcome to the headless CI starter API');
    });
  });

  it('GET /health returns expected health payload', () => {
    cy.request('/health').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('ok');
      expect(response.body.environment).to.eq('ci-demo');
    });
  });

  it('GET /api/items returns two items', () => {
    cy.request('/api/items').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.items).to.have.length(2);
      expect(response.body.items[1].name).to.eq('Fix failing test');
    });
  });
});
