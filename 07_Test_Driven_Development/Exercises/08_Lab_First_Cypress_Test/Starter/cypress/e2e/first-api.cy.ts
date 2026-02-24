describe("First Cypress API test", () => {
  it("checks that the health endpoint returns 200", () => {
    // cy.request sends an HTTP request directly to the API (no browser UI interaction needed).
    // Because baseUrl is configured in Cypress, "/health" resolves to "<baseUrl>/health".
    cy.request("/health").then((response) => {
      // Cypress gives us the full HTTP response object so we can assert status/body/headers.
      expect(response.status).to.eq(200);
    });
  });
});
