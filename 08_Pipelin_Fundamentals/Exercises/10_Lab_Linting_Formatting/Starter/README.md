# Lab: ESLint + Prettier CI Quality Gate (Starter)

## Objective

Integrate ESLint and Prettier into your pipeline so messy code is blocked in pull requests.

You will:

1. Fix starter lint and formatting issues
2. Run lint/format/Cypress tests locally
3. Configure PR workflow checks
4. Verify quality checks in a pull request

---

## Step 1: Install Dependencies

```bash
npm install
```

---

## Step 2: Run Quality Commands

Run these commands:

```bash
npm run lint
npm run format:check
npm test
```

Expected starter behavior:

- `lint` should fail due to a starter issue
- `format:check` may fail due to starter formatting
- `test` should run Cypress route checks

---

## Step 3: Fix Code Quality Issues

Open `src/app.js` and:

1. Remove the unused variable.
2. Format the file so Prettier check passes.
3. Keep route behavior unchanged.

Tip:

```bash
npm run format
```

---

## Step 4: Re-run Checks

```bash
npm run lint
npm run format:check
npm test
```

All commands should pass.

---

## Step 5: Configure CI on PR

Verify or create `.github/workflows/quality-checks.yml` with steps for:

- `npm run lint`
- `npm run format:check`
- `npm test` (Cypress headless)

Trigger:

- Pull requests to `main`

---

## Step 6: Validate in GitHub

1. Create a feature branch.
2. Commit your fixes.
3. Push and open a PR to `main`.
4. Confirm **Quality Checks** workflow passes.

---

## Completion Checklist

- [ ] Lint passes
- [ ] Format check passes
- [ ] Cypress tests pass
- [ ] PR workflow is configured
- [ ] PR checks are green
