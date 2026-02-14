# 🧩 Workshop: Book Club Hub API (Starter)

## 📘 Workshop Overview

Build a mini API for a book club platform where members host and join discussion sessions.

You will create:

- Mongoose models
- Express controllers
- Express routes
- At least one route that uses `populate()`

## 🎯 Goal

As a book club coordinator,
I want to view discussion sessions with host and attendee details,
so that I can manage club activity from one API.

## 🏗️ What You Need to Build

### 1) Models (in `src/models`)

- `MEMBER.ts`
  - `name` (string, required)
  - `email` (string, required)
  - `favoriteGenre` (string)
- `DISCUSSION.ts`
  - `title` (string, required)
  - `bookTitle` (string, required)
  - `scheduledDate` (date, required)
  - `host` (ObjectId ref `Member`, required)
  - `attendees` (array of ObjectId ref `Member`)

### 2) Controllers (in `src/controllers`)

- `createMember`
- `getAllMembers`
- `createDiscussion`
- `getAllDiscussions`
- `getDiscussionsWithPopulation` → must populate `host` and `attendees`

### 3) Routes (in `src/routes`)

- `/members`
  - `POST /members`
  - `GET /members`
- `/discussions`
  - `POST /discussions`
  - `GET /discussions`
  - `GET /discussions/populated`

## 🚀 Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## ✅ Checkoff

- Models compile and use refs correctly
- CRUD endpoints for members/discussions work
- Populate endpoint returns member details instead of only ObjectIds
