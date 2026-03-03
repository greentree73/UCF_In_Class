# Headless Cypress CI Execution on Pull Requests

## Learning Goals

By the end of this facilitator lesson, students should be able to:

- Explain headless test execution in CI
- Configure a workflow to run on every pull request to `main`
- Run `cypress run` in a non-UI (headless) environment
- Validate Express routes using automated Cypress checks

---

## Intro: What Is Headless CI Execution?

Headless means tests run without opening a visible browser window.

In GitHub Actions, this is ideal because:

1. CI environments have no desktop UI
2. Tests run faster and more consistently
3. Pull requests get automatic pass/fail feedback

---

## Step-by-Step: Configure PR Pipeline for Headless Cypress

Create this file in your repository:

- `.github/workflows/cypress-pr.yml`

Use this workflow:

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

## What This Pipeline Does for Our Repo

- Triggers on every pull request into `main`
- Installs dependencies in a clean Linux runner
- Starts the Express API and runs Cypress headlessly
- Fails the PR check if any route test fails
- Helps prevent broken API changes from being merged

---

## Demo Project Included in This Folder

This facilitator demo includes:

- Intro Express API with commented routes
- Cypress route tests using `cy.request()`
- A workflow that runs tests for PRs

### Run Demo Locally

```bash
npm install
npm test
```

---

## Suggested Facilitation Flow (15 minutes)

1. **Set context (2 minutes)**
  - Ask: "What usually happens if a bug gets merged to `main`?"
  - Define headless CI as "automated tests running without a visible browser."
  - Connect to team workflow: every PR should prove code is safe before merge.

2. **Show the workflow file location (2 minutes)**
  - Open `.github/workflows/cypress-pr.yml` in the repo.
  - Point out that any YAML file in `.github/workflows` is discovered by GitHub Actions.
  - Explain that this file is part of the repo, so pipeline behavior is version-controlled.

3. **Explain trigger and job structure (3 minutes)**
  - Highlight `on: pull_request` and `branches: [main]`.
  - Explain: only PRs targeting `main` trigger this workflow.
  - Walk through `jobs -> cypress-tests -> runs-on: ubuntu-latest`.
  - Emphasize that CI runs on a fresh Linux machine each time.

4. **Explain each step in order (3 minutes)**
  - `actions/checkout`: gets your repo code onto the runner.
  - `actions/setup-node`: installs Node 20 consistently.
  - `npm ci`: clean dependency install from lockfile.
  - `npm test`: starts API and executes Cypress headlessly (`cypress run`).
  - Reinforce: if any test fails, the PR check fails.

5. **Run local baseline demo (2 minutes)**
  - In terminal run:
    - `npm install`
    - `npm test`
  - Show passing tests and map local output to what CI will do.

6. **Open PR and inspect checks (3 minutes)**
  - Push a small change on a feature branch.
  - Open PR into `main`.
  - Open the PR **Checks** tab and watch the workflow run.
  - Show green status for pass, and explain merge should wait for required checks.

---

## Debrief Questions

- Why run tests on every pull request?
- Why use headless mode in CI?
- What risks are reduced when PR checks are required?
