# Lab: Headless Cypress CI on Pull Requests (Starter)

## Objective

Configure CI to run Cypress in headless mode on every pull request to `main`.

You will:

1. Complete a TODO route in the API
2. Add a PR workflow file in `.github/workflows/cypress-pr.yml`
3. Run tests locally
4. Open a PR and verify checks run in GitHub Actions

---

## Step 1: Install and Run Starter Tests

```bash
npm install
npm test
```

Expected starter behavior:

- One test should fail until you complete the TODO route.

---

## Step 2: Complete API TODO

Open `src/app.js` and complete `GET /api/items`.

Expected response:

```json
{
  "items": [
    { "id": 1, "name": "Monitor CI" },
    { "id": 2, "name": "Fix failing test" }
  ]
}
```

Run tests again:

```bash
npm test
```

---

## Step 3: Add PR Headless Pipeline

Create this file:

- `.github/workflows/cypress-pr.yml`

Use this content:

```yaml
name: Cypress PR Checks

on:
  pull_request:
    branches: [main]

jobs:
  cypress-tests:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run Cypress headless tests
        run: npm test
```

---

## Step 4: Validate in Pull Request

1. Create a feature branch.
2. Commit your completed changes.
3. Push the branch and open a PR into `main`.
4. Open the **Checks** tab on the PR.
5. Confirm the `Cypress PR Checks` workflow passes.

---

## Completion Checklist

- [ ] `GET /api/items` implemented
- [ ] Local `npm test` passes
- [ ] `cypress-pr.yml` created
- [ ] PR opened to `main`
- [ ] GitHub Action passes in PR checks
