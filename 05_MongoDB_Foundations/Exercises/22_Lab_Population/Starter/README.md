# 🔗 Lab: Populate Comment Authors

## 📘 Lab Overview

In this lab, you will complete one missing population feature using the Hackhaven `POST` model.

Completed for you:

- Models
- Config
- Most controllers
- Most routes

You only need to complete:

1. One controller: `getPostsWithPopulatedCommentAuthors`
2. One route: `GET /posts/populated-comment-authors`

## 🎯 Goal

As a reader,
I want to see each comment with the commenter username,
so that post discussions are easier to follow.

## 🚀 Run

```bash
npm install
cp .env.example .env
npm run dev
```

## 📋 Tasks

### Task 1: Complete controller

File: `src/controllers/postController.ts`

Requirements:

- Query posts from `Post`
- Populate nested `comments.user`
- Select commenter `username`
- Return response with posts

Expected populate call pattern:

```ts
Post.find().populate('comments.user', 'username')
```

### Task 2: Add route

File: `src/routes/postRoutes.ts`

Add:

```ts
router.get('/populated-comment-authors', getPostsWithPopulatedCommentAuthors);
```

## 🧪 Test Endpoints

1. Seed sample data

```bash
curl -X POST http://localhost:3000/posts/seed
```

2. Working example (already done)

```bash
curl http://localhost:3000/posts/populated-authors
```

3. Your task endpoint

```bash
curl http://localhost:3000/posts/populated-comment-authors
```

## ✅ Facilitator Checkoff Rubric

- Route `GET /posts/populated-comment-authors` is added
- Controller uses `populate('comments.user', 'username')`
- Response returns posts with populated comment user data
- Existing routes/controllers still work
