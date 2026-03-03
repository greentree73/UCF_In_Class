# Solution: Trunk-Based Development with GitHub Branch Protection

## Completed Workflow

This solution demonstrates the expected end state for the lab.

---

## 1) Repository Created

- Repository name: `tbd-branch-protection-lab`
- Default branch: `main`
- README initialized in GitHub

---

## 2) Branch Protection Rule Applied to `main`

In **Settings → Branches → Add rule**, the following were configured:

- Branch name pattern: `main`
- **Require a pull request before merging**: Enabled
- **Require approvals**: Enabled (`1` approval)
- **Require status checks to pass before merging**: Enabled
- **Do not allow bypassing the above settings**: Enabled

Expected behavior:

- Direct pushes to `main` are rejected by GitHub.
- Changes must flow through a feature branch + pull request.

---

## 3) Direct Push Attempt to `main` (Expected Failure)

Commands:

```bash
git clone <YOUR_REPO_URL>
cd tbd-branch-protection-lab
git branch
echo "Direct push test from main branch." >> README.md
git add README.md
git commit -m "Test direct push to main"
git push origin main
```

Expected result:

- Push is rejected with a GitHub protected branch error.

---

## 4) Feature Branch + Pull Request (Expected Success)

Commands:

```bash
git checkout -b feature/first-pr-workflow
echo "Feature branch update for pull request workflow." >> README.md
git add README.md
git commit -m "Add update from feature branch"
git push -u origin feature/first-pr-workflow
```

GitHub steps:

1. Click **Compare & pull request** for `feature/first-pr-workflow`.
2. Create PR targeting `main`.
3. Obtain required approval/checks (per class setup).
4. Merge PR into `main`.

Expected result:

- Pull request is merged.
- `main` is updated through PR workflow.

---

## 5) Final Verification

Commands:

```bash
git checkout main
git pull origin main
```

Expected final state:

- `README.md` contains both lines:
  - `Direct push test from main branch.`
  - `Feature branch update for pull request workflow.`
- GitHub PR status is **Merged**.

---

## Reflection Answer Key (Sample)

1. **Why avoid direct pushes to `main`?**  
   It protects the stable branch from unreviewed changes and reduces accidental breakage.

2. **How do pull requests help collaboration?**  
   PRs provide a review checkpoint, discussion space, and visibility before code is merged.

3. **What does branch protection prevent?**  
   It prevents accidental direct commits to `main` and enforces team quality gates.
