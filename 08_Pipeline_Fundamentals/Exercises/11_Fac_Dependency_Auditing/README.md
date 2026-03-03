# Facilitator: Dependency Auditing in CI (`npm audit` + Snyk)

## Learning Goals

By the end of this lesson, students should be able to:

- Explain why dependency auditing matters in CI
- Use `npm audit` to detect vulnerable packages
- Use Snyk in CI to scan dependencies on pull requests
- Run a simple Express + GraphQL + Mongoose API and validate behavior with Cypress

---

## Intro: Why Dependency Auditing?

Most apps depend on many third-party packages. A security issue in one package can affect your app even if your own code is correct.

- `npm audit` checks vulnerabilities using npm advisory data
- Snyk adds additional vulnerability intelligence and PR-friendly reporting

In CI, these become security gates that can block risky merges.

---

## Step-by-Step Setup

### 1) Install dependencies

```bash
npm install
npm install -D eslint prettier cypress start-server-and-test snyk
```

### 2) Add scripts to `package.json`

```json
{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "audit": "npm audit --audit-level=high",
    "cy:run": "cypress run",
    "test": "start-server-and-test start http://localhost:3000 cy:run",
    "snyk:test": "snyk test"
  }
}
```

### 3) Configure GitHub secrets

In your repository settings:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add `SNYK_TOKEN` with your Snyk API token

### 4) Add CI workflow

Create `.github/workflows/security-audit.yml`:

```yaml
name: Dependency Security Checks

on:
  pull_request:
    branches: [main]

jobs:
  security-audit:
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

      - name: Lint code
        run: npm run lint

      - name: Check formatting
        run: npm run format:check

      - name: Run npm audit
        run: npm run audit

      - name: Run Cypress tests
        run: npm test

      - name: Run Snyk scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          command: test
```

---

## Demo Stack Included

This facilitator exercise includes a very introductory API with comments in code:

- **Express** app for routing
- **GraphQL** endpoint at `/graphql`
- **Mongoose** model for schema validation
- **Cypress** tests using `cy.request()` for REST + GraphQL checks

### Run locally

```bash
npm install
npm run lint
npm run format:check
npm run audit
npm test
```

---

## Suggested Facilitation Flow (15 minutes)

1. **Define software supply-chain risk (2 minutes)**
  - Explain that modern apps depend on many external packages, directly and transitively.
  - Define **software supply-chain risk** as “security risk introduced by dependencies your project installs.”
  - Clarify that secure application code can still be vulnerable if a dependency is vulnerable.

2. **Explain security scan types before running commands (2 minutes)**
  - Define **vulnerability severity** levels: low, moderate, high, critical.
  - Explain why this activity uses `npm audit --audit-level=high` (focus on higher-risk findings first).
  - Define a **security gate** as an automated check that must pass before merge.

3. **Run `npm run audit` and interpret output (2 minutes)**
  - Run the command and read the summary with students.
  - Point out package name, vulnerable range, and recommended remediation.
  - Explain that “0 vulnerabilities” is still useful evidence in CI logs.

4. **Connect app behavior checks to security checks (3 minutes)**
  - Walk through API surface quickly: REST routes, GraphQL endpoint, Mongoose validation layer.
  - Explain why we still run Cypress: security scans do not replace functional validation.
  - Define **defense in depth** here as multiple checks (lint + format + audit + tests) in one pipeline.

5. **Break down pipeline stages in `.github/workflows/security-audit.yml` (3 minutes)**
  - `lint` and `format:check`: code hygiene gate.
  - `audit`: dependency vulnerability gate from npm advisories.
  - `test`: runtime behavior gate using Cypress.
  - Snyk step: additional third-party vulnerability intelligence and reporting.
  - Define **shift-left security** as running security checks earlier (on PRs, before merge).

6. **Explain secrets and PR enforcement (3 minutes)**
  - Show where `SNYK_TOKEN` is configured and why secrets are required for external scanners.
  - Open a PR and show how failing checks block merge readiness.
  - Reinforce final concept: merge decisions should include both app correctness and dependency risk posture.

---

## Reference Links

- npm audit: <https://docs.npmjs.com/cli/v10/commands/npm-audit>
- Snyk CLI: <https://docs.snyk.io/snyk-cli/commands/test>
- Snyk GitHub Action: <https://github.com/snyk/actions>
- GitHub Actions Workflow Syntax: <https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions>
- express-graphql: <https://github.com/graphql/express-graphql>
- Mongoose Models: <https://mongoosejs.com/docs/models.html>
- Cypress `cy.request`: <https://docs.cypress.io/api/commands/request>
