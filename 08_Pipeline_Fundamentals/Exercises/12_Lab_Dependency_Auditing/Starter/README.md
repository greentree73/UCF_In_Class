# Lab: Dependency Auditing with `npm audit` + Snyk (Starter)

## Objective

Add dependency security gates to CI while testing a simple Express + GraphQL + Mongoose API with Cypress.

You will:

1. Run dependency and API checks locally
2. Complete CI workflow steps for audit + Snyk
3. Open a pull request and verify checks run

---

## Step 1: Install dependencies

```bash
npm install
```

---

## Step 2: Run local checks

```bash
npm run lint
npm run format:check
npm run audit
npm test
```

Expected behavior:

- `npm run audit` completes (or reports vulnerabilities)
- Cypress tests run against REST + GraphQL routes

---

## Step 3: Complete pipeline workflow

Open `.github/workflows/security-audit.yml`.

Make sure these checks run on PRs to `main`:

1. `npm run lint`
2. `npm run format:check`
3. `npm run audit`
4. `npm test`
5. Snyk action with `SNYK_TOKEN`

Add repository secret:

- `SNYK_TOKEN`

---

## Step 4: Validate GraphQL behavior

Confirm Cypress tests include:

- GraphQL query for `books`
- GraphQL mutation `addBook`

These tests should pass with `npm test`.

---

## Step 5: Open PR and verify checks

1. Create feature branch.
2. Commit changes.
3. Push and open PR to `main`.
4. Confirm workflow checks run and pass.

---

## Completion Checklist

- [ ] `npm run lint` and `npm run format:check` are configured and run
- [ ] `npm run audit` is configured and runs
- [ ] Cypress API tests pass
- [ ] Snyk step is present in workflow
- [ ] `SNYK_TOKEN` documented/added
- [ ] PR checks are green
