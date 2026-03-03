# Facilitator: Linting and Formatting in CI

## Learning Goals

By the end of this facilitator lesson, students should be able to:

- Explain the difference between linting and formatting
- Configure ESLint and Prettier in a Node project
- Add CI checks that fail when code style/quality rules are violated
- Understand how style gates keep `main` clean

---

## Intro: Why ESLint + Prettier in CI?

- **ESLint** catches code-quality problems (unused vars, risky patterns, etc.)
- **Prettier** enforces consistent code style automatically
- In CI, they become a quality gate on pull requests

Result: messy code is blocked before merge.

---

## Key Definitions for this lesson:

- **Linting**: static analysis that finds potential code problems before runtime (example: unused variables).  
  Docs: [ESLint Rules](https://eslint.org/docs/latest/rules/)
- **Formatting**: automatic code style normalization (quotes, semicolons, spacing, line wraps).  
  Docs: [Prettier Options](https://prettier.io/docs/options)
- **CI (Continuous Integration)**: automated checks that run when changes are proposed (push/PR), so quality is validated before merge.  
  Docs: [GitHub Actions Overview](https://docs.github.com/actions/learn-github-actions/understanding-github-actions)
- **Quality Gate**: required checks that must pass before a pull request can be merged.  
  Docs: [About Status Checks](https://docs.github.com/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks)

---

## Step-by-Step Setup

### 1) Install dependencies

```bash
npm install
npm install -D eslint prettier cypress start-server-and-test
```

### 2) Add scripts to `package.json`

```json
{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "cy:open": "cypress open",
    "cy:run": "cypress run",
    "test": "start-server-and-test start http://localhost:3000 cy:run"
  }
}
```

### 3) Add ESLint config

Create `.eslintrc.json`:

```json
{
  "env": {
    "node": true,
    "es2022": true
  },
  "extends": ["eslint:recommended"],
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "rules": {
    "no-unused-vars": "error"
  }
}
```

### 4) Add Prettier config

Create `.prettierrc.json`:

```json
{
  "singleQuote": true,
  "semi": true,
  "trailingComma": "none"
}
```

### 5) Add CI workflow

Create `.github/workflows/quality-checks.yml`:

```yaml
name: Quality Checks

on:
  pull_request:
    branches: [main]

jobs:
  lint-format-test:
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

      - name: Run tests
        run: npm test
```

---

## What This Does for Our Repo

- Every PR into `main` is checked automatically
- Lint failures block merge
- Formatting failures block merge
- Cypress route tests still run as a final quality check

---

## Demo API Included

This facilitator folder contains a very introductory Express API with comments in code and Cypress route tests using `cy.request()`.

### Run locally

```bash
npm install
npm run lint
npm run format:check
npm test
```

---

## Suggested Facilitation Flow (15 minutes)

1. **Define quality gate vocabulary (2 minutes)**
  - Define **linting** as static analysis for code-quality issues (for example, unused variables).
  - Define **formatting** as automatic style normalization (quotes, spacing, semicolons).
  - Define **quality gate** as a required check that must pass before merge.
  - Reference docs live:
    - [What is ESLint?](https://eslint.org/docs/latest/use/getting-started)
    - [What is Prettier?](https://prettier.io/docs/en/)

2. **Map files to responsibilities (3 minutes)**
  - Open `package.json`, `.eslintrc.json`, `.prettierrc.json`, and `cypress.config.js`.
  - Explain script purpose:
    - `lint` → code-quality rules
    - `format:check` → style conformance in CI
    - `test` → Cypress API behavior checks
  - Clarify why CI uses `format:check` instead of `format` (detect problems without rewriting files).

3. **Run baseline checks locally (3 minutes)**
  - Execute `npm run lint`, `npm run format:check`, and `npm test`.
  - Explain expected pass/fail signals for each command.
  - Reinforce local-first workflow to reduce noisy PR failures.

4. **Demonstrate failure and interpretation (3 minutes)**
  - Introduce a deliberate issue (unused variable or formatting mismatch).
  - Re-run checks and read the failure output with students.
  - Call out rule names and where to find docs:
    - [no-unused-vars](https://eslint.org/docs/latest/rules/no-unused-vars)

5. **Repair and validate (2 minutes)**
  - Fix the lint issue or run `npm run format`.
  - Re-run all checks to show green status.
  - Emphasize the loop: detect → fix → verify.

6. **Connect to CI enforcement (2 minutes)**
  - Open `.github/workflows/quality-checks.yml`.
  - Highlight trigger (`pull_request`) and step order (`lint` → `format:check` → `test`).
  - Reinforce merge policy: quality checks must pass before approval/merge.
  - Reference docs:
    - [Workflow syntax](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)
    - [actions/setup-node](https://github.com/actions/setup-node)

---

## Reference Links

- ESLint Getting Started: <https://eslint.org/docs/latest/use/getting-started>
- ESLint Rules Reference: <https://eslint.org/docs/latest/rules/>
- Prettier Docs: <https://prettier.io/docs/en/>
- Prettier CLI: <https://prettier.io/docs/cli>
- Cypress Docs: <https://docs.cypress.io>
- cy.request API: <https://docs.cypress.io/api/commands/request>
- GitHub Actions Overview: <https://docs.github.com/actions/learn-github-actions/understanding-github-actions>
- GitHub Workflow Syntax: <https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions>
