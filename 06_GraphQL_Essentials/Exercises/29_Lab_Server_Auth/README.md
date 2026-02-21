# 🧪 Lab: Apollo Server Auth Context Bug Fix

Build a minimal full-stack auth app with **register**, **login**, and **current user (`me`)** display.

In Starter, there is a resolver signature bug that prevents authenticated user info from appearing in the UI.

**Estimated time:** 7-10 minutes

## 🎯 Goal

Practice debugging Apollo Server context usage by fixing a broken `me` resolver parameter order.

## 📁 Folders

- **Starter/**: Student version with intentional bug
- **Solution/**: Completed reference version

## ✅ Results

By the end of this Lab, students can:

- Register and login to receive JWT tokens
- Send auth tokens in Apollo Client requests
- Use `context.user` in resolvers for identity-aware queries
- Diagnose and fix resolver argument order bugs
