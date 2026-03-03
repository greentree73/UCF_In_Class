describe('Starter lint/format API tests', () => {
  it('GET / returns welcome message', () => {
    cy.request('/').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Welcome to the starter lint/format API');
    });
  });

  it('GET /health returns status ok', () => {
    cy.request('/health').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('ok');
    });
  });
});
