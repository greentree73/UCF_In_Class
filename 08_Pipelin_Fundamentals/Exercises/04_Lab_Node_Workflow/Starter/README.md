# Lab: Node Workflow with GitHub Actions (Starter)

## Objective

Complete a beginner Node + Express API and create a CI workflow file at `.github/workflows/ci.yml` using the official `actions/setup-node` action.

By the end of the lab, your workflow should run tests automatically on pushes and pull requests to `main`.

---

## What You Need to Complete

1. Finish the API route TODO in `src/app.js`
2. Create the GitHub Actions workflow in `.github/workflows/ci.yml`
3. Run tests locally and confirm they pass
4. Push to GitHub and verify Actions run successfully

---

## Step 1: Install and Run Tests Locally

```bash
npm install
npm test
```

You should see a failing test in Starter until you complete the TODO route.

### Checkpoint 1

- [ ] Dependencies installed
- [ ] You ran tests and observed the current status

---

## Step 2: Complete API TODOs

Open `src/app.js` and complete the TODO for `GET /health`.

Expected response shape:

```json
{
  "status": "ok",
  "service": "node-workflow-demo"
}
```

Run tests again:

```bash
npm test
```

### Checkpoint 2

- [ ] `GET /health` route implemented
- [ ] Local tests pass

---

## Step 3: Create CI Workflow on GitHub

1. Push your starter project to a GitHub repo.
2. On GitHub.com click **Add file** → **Create new file**.
3. Name the file `.github/workflows/ci.yml`.
4. Add this content:

```yaml
name: Node CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
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

      - name: Run tests
        run: npm test
```

5. Commit the file.
6. Open the **Actions** tab and verify the run.

### Checkpoint 3

- [ ] `.github/workflows/ci.yml` created on GitHub
- [ ] Workflow uses `actions/setup-node@v4`
- [ ] Workflow run completed successfully

---

## Step 4: Validate Pull Request Behavior

1. Create a feature branch.
2. Make a small code change.
3. Open a pull request into `main`.
4. Confirm CI runs on the pull request.

### Checkpoint 4

- [ ] PR opened
- [ ] CI run visible on PR
- [ ] PR checks are green

---

## Reflection

Answer in 1–2 sentences each:

1. Why do teams run tests in CI instead of only locally?
2. What role does `actions/setup-node` play in the workflow?
3. What risk is reduced when CI runs on pull requests?
