# Lab: Trunk-Based Development with GitHub Branch Protection

## Lab Overview

In this lab, you will create a new GitHub repository and configure branch protection on `main` so direct pushes are blocked.

Then you will prove the workflow by:

1. Attempting to push directly to `main` (should fail)
2. Creating a feature branch
3. Pushing that feature branch
4. Opening and merging a pull request into `main`

---

## Learning Objectives

By the end of this lab, you can:

- Create and configure a new repository on GitHub
- Add branch protection rules to `main`
- Explain why direct pushes to `main` should be blocked
- Use a feature branch and pull request workflow

---

## Prerequisites

- A GitHub account
- Git installed locally
- Terminal access

Verify Git is installed:

```bash
git --version
```

---

## Part 1: Create a New Repository on GitHub

1. Go to [github.com](https://github.com) and sign in.
2. Click **+** (top-right) → **New repository**.
3. Name the repository: `tbd-branch-protection-lab`.
4. Keep it **Public** (or Private if your class requires it).
5. Check **Add a README file**.
6. Click **Create repository**.

### TODO Checkpoint 1

- [ ] Repository created
- [ ] Default branch is `main`

---

## Part 2: Configure Branch Protection for `main`

1. In your new repo, click **Settings**.
2. In the left menu, click **Branches**.
3. Under **Branch protection rules**, click **Add rule**.
4. In **Branch name pattern**, enter `main`.
5. Enable these rules:
   - **Require a pull request before merging**
   - **Require approvals** (set to `1`)
   - **Require status checks to pass before merging**
6. Enable **Do not allow bypassing the above settings**.
7. Click **Create** / **Save changes**.

### TODO Checkpoint 2

- [ ] Branch protection rule exists for `main`
- [ ] Pull request required before merge
- [ ] At least 1 approval required

---

## Part 3: Clone Repository and Attempt Direct Push to `main`

1. Copy your repository URL from GitHub.
2. In terminal, run:

```bash
git clone <YOUR_REPO_URL>
cd tbd-branch-protection-lab
```

3. Confirm current branch:

```bash
git branch
```

4. Edit `README.md` and add one line, for example:

```markdown
Direct push test from main branch.
```

5. Commit and try to push:

```bash
git add README.md
git commit -m "Test direct push to main"
git push origin main
```

Expected result: GitHub rejects the push.

### TODO Checkpoint 3

- [ ] Commit created on local `main`
- [ ] `git push origin main` was rejected by GitHub

---

## Part 4: Use Feature Branch + Pull Request

1. Create and switch to a feature branch:

```bash
git checkout -b feature/first-pr-workflow
```

2. Add another line to `README.md`:

```markdown
Feature branch update for pull request workflow.
```

3. Commit and push:

```bash
git add README.md
git commit -m "Add update from feature branch"
git push -u origin feature/first-pr-workflow
```

4. Open GitHub and click **Compare & pull request**.
5. Create a pull request from `feature/first-pr-workflow` into `main`.
6. If your class has review partners, request one review.
7. Merge when requirements are satisfied.

### TODO Checkpoint 4

- [ ] Feature branch pushed to origin
- [ ] Pull request created
- [ ] Pull request merged into `main`

---

## Part 5: Verify Final State

1. Pull latest changes locally:

```bash
git checkout main
git pull origin main
```

2. Confirm `README.md` includes both updates.
3. On GitHub, confirm pull request shows **Merged**.

### TODO Checkpoint 5

- [ ] Local `main` updated
- [ ] PR marked as merged on GitHub
- [ ] You can explain why direct pushes to `main` are blocked

---

## Reflection Questions

Answer in 1–2 sentences each:

1. Why does trunk-based development discourage direct pushes to `main`?
2. How do pull requests improve team collaboration?
3. What problem can branch protection prevent on a team project?
