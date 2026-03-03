# Facilitator: Cypress REST Testing with `cy.request()`

## Learning Goals

By the end of this facilitator lesson, students should be able to:

- Install Cypress in a Node project
- Explain when to use `cy.request()` for API testing
- Write basic Cypress tests for Express.js routes
- Run tests in headless mode for quick validation

---

## Intro: Why `cy.request()`?

`cy.request()` sends an HTTP request directly to your API. It does not need a browser UI page to be loaded first.

This makes it ideal for beginner REST testing because students can focus on:

1. Status codes (`200`, `404`, etc.)
2. Response body structure
3. API behavior

---

## Step-by-Step: Install Cypress

From the project folder:

```bash
npm install
npm install -D cypress start-server-and-test
```

What these packages do:

- `cypress`: test runner and API testing library
- `start-server-and-test`: starts Express and waits for it before running Cypress

---

## Project Files for This Demo

- `src/app.js` → Express routes
- `src/server.js` → server startup
- `cypress.config.js` → Cypress configuration
- `cypress/e2e/routes.cy.js` → tests using `cy.request()`

---

## Key Example: `cy.request()` Route Test

```javascript
it('GET /health returns status ok', () => {
  cy.request('/health').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.status).to.eq('ok');
  });
});
```

What this checks:

- API endpoint responds successfully
- JSON body includes expected values

---

## Run the Demo

```bash
npm test
```

This command will:

1. Start the Express server
2. Wait for `http://localhost:3000`
3. Run Cypress tests in headless mode

---

## Suggested Facilitation Flow (15 minutes)

1. **Set context (2 minutes)**
  - Ask: "How do we test backend routes without clicking through UI pages?"
  - Explain that `cy.request()` sends HTTP requests directly to the API.
  - Clarify this lesson focuses on route behavior (status + response data).

2. **Review project structure (2 minutes)**
  - Open `src/app.js` and point out testable routes.
  - Open `cypress/e2e/routes.cy.js` and map one test to one route.
  - Explain how assertions validate both status code and JSON payload.

3. **Explain `cy.request()` test anatomy (3 minutes)**
  - URL: endpoint being tested.
  - Response object: `status` and `body`.
  - Assertions: verify expected API contract.
  - Mention that this runs fast because it skips browser UI navigation.

4. **Run live demo locally (3 minutes)**
  - Run `npm install`.
  - Run `npm test`.
  - Walk through output showing passing spec and assertions.
  - Tie each passing test back to specific route behavior.

5. **Demonstrate failure and debugging (3 minutes)**
  - Temporarily change a route response (for example, status value).
  - Re-run `npm test` and show failure output.
  - Read the assertion message and identify mismatch quickly.

6. **Fix and confirm confidence (2 minutes)**
  - Revert/fix the route.
  - Re-run `npm test`.
  - Reinforce: automated API tests catch regressions early.

---

## Debrief Questions

- Why is `cy.request()` useful for backend route testing?
- What types of bugs can status/body assertions catch?
- Why automate route checks instead of testing manually every time?
