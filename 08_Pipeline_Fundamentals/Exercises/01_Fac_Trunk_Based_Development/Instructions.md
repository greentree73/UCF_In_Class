# Trunk-Based Development (Intro)

## Learning Goals

By the end of this facilitator exercise, students should be able to:

- Explain trunk-based development.
- Configure GitHub branch protection rules for `main`.
- Understand why teams use pull requests instead of direct pushes to `main`.
- Test branch protection behavior directly against GitHub.

## What is Trunk-Based Development?

Trunk-based development means everyone integrates work into one main branch (usually `main`) frequently.

For beginners:

- `main` is always the most stable code.
- Developers make short-lived feature branches.
- Changes are reviewed in pull requests.
- Direct pushes to `main` are blocked.

This keeps code quality high and reduces painful merge conflicts.

---

## Facilitator Setup (Before Class)

Use your own GitHub account and a repository you can administer.

1. Sign in at [github.com](https://github.com).
2. Create or choose a repository with default branch `main`.
3. Confirm you can open **Settings** for that repository.

---

## Step-by-Step: Configure Branch Protection on GitHub.com

Use these steps on a GitHub repository you own or can administer.

1. Open your repository page on GitHub.
2. Click the **Settings** tab.
3. In the left sidebar, click **Branches**.
4. In **Branch protection rules**, click **Add rule**.
5. In **Branch name pattern**, type `main`.
6. Under **Protect matching branches**, check:
    - **Require a pull request before merging**
    - **Require approvals** and set approvals to `1`
    - **Require status checks to pass before merging**
7. Expand **Require a pull request before merging** and enable:
    - **Require approval of the most recent reviewable push** (recommended)
8. Enable **Do not allow bypassing the above settings**.
9. (If visible) Enable **Restrict who can push to matching branches** and leave only approved maintainers.
10. Click **Create** (or **Save changes**).

### Result

After this is enabled, GitHub rejects direct pushes to `main` for users who are not allowed to bypass rules. Developers must open a pull request from a feature branch.

---

## Live Demonstration on GitHub (Facilitator)

Use this quick demonstration to show students the rule working on a real repository.

### Part A: Attempt a direct push to `main` (should fail)

1. Clone the repository locally.
2. Ensure you are on `main`.
3. Make a tiny change (for example, add one line to `README.md`).
4. Commit the change.
5. Run `git push origin main`.
6. Show students the GitHub rejection message.

### Part B: Use a feature branch + pull request (should succeed)

1. Create a branch: `git checkout -b feature/demo-branch-protection`
2. Make a tiny change and commit.
3. Push branch: `git push -u origin feature/demo-branch-protection`
4. Open GitHub and click **Compare & pull request**.
5. Create the pull request into `main`.
6. Show that merge is blocked until required approvals/checks are met.
7. Complete the required approval/checks.
8. Merge the pull request.

### Talking point while demoing

“Direct pushes to `main` are blocked, but collaboration through branches and pull requests is allowed and safer.”

---

## Common Beginner Mistakes (and fixes)

- **Mistake:** Pushing from `main` out of habit.  
   **Fix:** `git checkout -b feature/<short-name>` before coding.
- **Mistake:** Forgetting to publish branch to origin.  
   **Fix:** `git push -u origin <branch-name>`.
- **Mistake:** Opening PR into wrong base branch.  
   **Fix:** Confirm PR is `feature/...` → `main`.

---

## Suggested Facilitation Flow (10-15 minutes)

1. Define trunk-based development in plain language.
2. Walk through branch protection setup on GitHub.com.
3. Attempt direct push to `main` and show failure.
4. Push a feature branch and open a pull request.
5. Reinforce: feature branch → PR → review/checks → merge to `main`.

---

## Transition to Lab

Next, students will do this themselves in a new repository:

1. Create a new GitHub repo.
2. Add branch protection to `main`.
3. Attempt a direct push to `main` and observe rejection.
4. Create a feature branch and push changes.
5. Open a pull request and merge into `main`.

---

## Debrief Questions

- Why block direct pushes to `main`?
- Why require pull requests?
- What happens if teams work on long-lived branches?
- How do status checks improve confidence before merge?
