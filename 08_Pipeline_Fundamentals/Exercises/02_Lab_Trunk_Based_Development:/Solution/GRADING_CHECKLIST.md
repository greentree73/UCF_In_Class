# Facilitator Grading Checklist: Trunk-Based Development Lab

Use this checklist to quickly verify each student completed the required workflow.

Student Name: ____________________  
Date: ____________________

---

## A. Repository Setup (2 pts)

- [ ] (1 pt) Student created a new GitHub repo for the lab.
- [ ] (1 pt) Default branch is `main`.

Notes:

---

## B. Branch Protection Configuration (4 pts)

- [ ] (1 pt) Rule targets branch pattern `main`.
- [ ] (1 pt) **Require a pull request before merging** is enabled.
- [ ] (1 pt) **Require approvals** is enabled (minimum 1).
- [ ] (1 pt) **Do not allow bypassing the above settings** is enabled.

Notes:

---

## C. Direct Push Test to `main` (3 pts)

- [ ] (1 pt) Student made a local commit on `main`.
- [ ] (1 pt) Student attempted `git push origin main`.
- [ ] (1 pt) Push was rejected due to branch protection.

Evidence accepted:

- terminal screenshot/output, or
- instructor observes live test.

Notes:

---

## D. Feature Branch + PR Workflow (6 pts)

- [ ] (1 pt) Student created a feature branch (`feature/...`).
- [ ] (1 pt) Student committed change on feature branch.
- [ ] (1 pt) Student pushed feature branch to origin.
- [ ] (1 pt) Student opened PR targeting `main`.
- [ ] (1 pt) Required review/check conditions were met.
- [ ] (1 pt) PR was merged into `main`.

Notes:

---

## E. Final Verification & Understanding (5 pts)

- [ ] (2 pts) Student pulled latest `main` and verified merged content locally.
- [ ] (1 pt) Student explains why direct pushes to `main` are blocked.
- [ ] (1 pt) Student explains why PR review helps quality.
- [ ] (1 pt) Student describes one issue branch protection prevents.

Notes:

---

## Score Summary

- Section A: ____ / 2
- Section B: ____ / 4
- Section C: ____ / 3
- Section D: ____ / 6
- Section E: ____ / 5

Total: ____ / 20

Suggested rubric:

- 18–20: Exceeds expectations
- 14–17: Meets expectations
- 10–13: Developing
- 0–9: Needs support
