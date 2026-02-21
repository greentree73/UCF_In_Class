# 🧪 Apollo MERN Lab: Architecture Discussion (Starter)

**Estimated time:** 7-10 minutes

## 🎯 Goal

Describe how the Starter codebase is wired together by discussing what each configuration file does and how requests flow from frontend to backend in a TypeScript backend project.

## 📋 User Story

**AS A** backend developer in training  
**I WANT** to explain the purpose of key setup files in an Apollo + MERN app  
**SO THAT** I can confidently run, debug, and extend full-stack GraphQL Exercises

## 🧭 Discussion Instructions

Work with your team and discuss each file below. For every file, answer:

1. What is this file responsible for?
2. Which script/setting matters most for local development?
3. How does this file connect to at least one other file in this Exercise?

## 📂 Files to Discuss

1. `package.json` (root)
2. `backend/package.json`
3. `frontend/package.json`
4. `frontend/vite.config.ts` *(client equivalent in this Exercise)*
5. `backend/src/server.ts`

## 🗣️ Prompt Guide

### 1) Root `package.json`
- Which scripts orchestrate both frontend and backend?
- Why is a single root command useful during development?

### 2) `backend/package.json`
- Which dependencies are required for GraphQL and Express integration?
- What is the difference between `dev`, `start`, `seed`, and `build` scripts in this TypeScript backend?

### 3) `frontend/package.json`
- Which dependencies power GraphQL queries from React?
- How do `dev`, `build`, and `preview` scripts support the workflow?

### 4) `frontend/vite.config.ts`
- What does the `/graphql` proxy do?
- How does proxying reduce local CORS friction?

### 5) `backend/src/server.ts`
- Where are Apollo Server and Express connected?
- Where is CORS configured?
- How does the app choose the MongoDB connection string?
- Which imports point to TypeScript backend modules?

## ✅ Results

By the end of this discussion, your team should be able to:

- Explain the role of all three `package.json` files
- Describe how frontend requests reach the GraphQL endpoint
- Identify where to change ports, scripts, and connection settings
- Trace the startup flow from `npm run dev` to a working `/graphql` API
