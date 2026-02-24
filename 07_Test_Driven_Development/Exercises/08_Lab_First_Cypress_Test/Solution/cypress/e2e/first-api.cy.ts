describe("First Cypress API test", () => {
  it("checks that the health endpoint returns 200", () => {
    cy.request("/health").then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
