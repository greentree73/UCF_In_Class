// `describe` comes from the Mocha test framework (bundled by Cypress).
// It groups related tests into a named suite shown in the Cypress runner.
describe("First Cypress API test", () => {
  // `it` also comes from Mocha and defines one individual test case.
  // The string is the human-readable test name.
  it("checks that the health endpoint returns 200", () => {
    // `cy` is the global Cypress command object.
    // `request` is a Cypress command that sends an HTTP request directly to the API.
    // `"/health"` is resolved against `baseUrl` from cypress.config.ts.
    cy.request("/health").then((response) => {
      // `then` receives the HTTP response object from the previous Cypress command.
      // `expect(...).to.eq(...)` comes from Chai assertions (included by Cypress).
      // Here we assert that the API returned HTTP status code 200.
      expect(response.status).to.eq(200);
    });
  });
});
