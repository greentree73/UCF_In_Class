# Facilitator Guide: Introduction to GitHub Workflows (Node + Express)

## Objective

Introduce GitHub Actions workflows using a simple Node + Express API and an automated CI pipeline.

By the end of this facilitation, learners should understand:

1. What a GitHub workflow is
2. Why teams run tests in CI on every push and pull request
3. How `actions/setup-node` prepares the runner environment
4. How to read workflow results in the Actions tab

---

## What This Facilitator Example Includes

- A complete API in `src/app.js` with:
  - `GET /`
  - `GET /health`
- Tests in `test/app.test.js`
- CI workflow in `.github/workflows/ci.yml`

This folder is intentionally complete (not a student starter).

---

## Prerequisites

- GitHub account
- Git installed locally
- Node.js 20+

---

## Step 1: Run the Project Locally

From this folder, run:

```bash
npm install
npm test
```

Expected result: tests pass locally.

Optional API run:

```bash
npm run dev
```

Then open `http://localhost:3000/health` to verify the health endpoint.

---

## Step 2: Create or Use a GitHub Repository

1. Create a new repository on GitHub.com (or use an existing teaching repo).
2. Push this folder to GitHub.
3. Confirm files are visible in the repo, including `.github/workflows/ci.yml`.

---

## Step 3: Explain the Workflow File Line-by-Line

Open `.github/workflows/ci.yml` and walk through each section:

- `name`: display name in Actions UI
- `on`: workflow triggers (`push` and `pull_request` to `main`)
- `jobs.test`: defines one CI job
- `runs-on: ubuntu-latest`: runner OS
- `actions/checkout@v4`: checks out repo code
- `actions/setup-node@v4`: installs Node 20 and enables npm cache
- `npm ci`: clean install from lockfile
- `npm test`: executes test suite

Point out that inline comments in the YAML describe each step so learners can connect syntax to purpose.

---

## Step 4: Trigger a Workflow Run (Push Event)

1. Make a small commit on `main` (for demonstration).
2. Push to GitHub.
3. Open the **Actions** tab.
4. Select the newest run named **Node CI**.
5. Open the `test` job and show each step status.

Facilitator talking points:

- Green check = all steps passed
- Red X = pipeline failed and blocks confidence in merge
- CI gives a consistent environment independent of local machine setup

---

## Step 5: Trigger a Workflow Run (Pull Request Event)

1. Create a new branch (example: `feature/readme-touchup`).
2. Make a small change and push.
3. Open a pull request into `main`.
4. Show the PR checks panel and the linked `Node CI` run.

Facilitator talking points:

- PR checks help catch issues before merge
- Reviewers can trust that tests were re-run in CI
- This reduces broken `main` risk

---

## Suggested Facilitation Flow (Step-by-Step)

1. Define key terms: workflow, event trigger, runner, job, step.
2. Run local tests so learners see baseline behavior.
3. Open `ci.yml` and explain each block in order.
4. Push a commit and observe the run in Actions.
5. Open a PR and compare PR-triggered run behavior.
6. Debrief why CI belongs in every team workflow.

---

## Common Troubleshooting

- **No workflow run appears**: confirm file path is exactly `.github/workflows/ci.yml`.
- **Workflow exists but does not trigger**: confirm branch target is `main`.
- **`npm ci` fails**: ensure `package-lock.json` exists and is committed.
- **Tests fail in CI only**: compare Node version and environment assumptions.

---

## Key Takeaways

- GitHub Workflows automate quality checks.
- `actions/setup-node` ensures a known Node runtime in CI.
- Running tests on push + PR improves stability and collaboration.
