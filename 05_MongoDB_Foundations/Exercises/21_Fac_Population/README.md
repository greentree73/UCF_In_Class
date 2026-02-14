# 🔗 Mongoose Population (Basic Intro)

## 📘 Introduction

**Population** in Mongoose replaces stored ObjectId references with the related document data.

Instead of only getting IDs back, `populate()` lets us load connected data in one query flow.

### Why We Use Population

- Keep collections normalized (store references, not duplicated full objects)
- Fetch related records when needed
- Build cleaner API responses with connected data

This basic intro uses the **Hackhaven** database with a `POST` model.

## 🎯 Targets

- Understand what population is
- See why references + populate are useful
- Run two basic population examples with `POST`

## 🧪 Code Examples in `src/app.ts`

1. **Populate post author**
   - `Post.find().populate('author', 'username role')`
2. **Populate comment authors**
   - `Post.find().populate('comments.user', 'username')`

## 📚 Documentation

- [Mongoose Populate Guide](https://mongoosejs.com/docs/populate.html)
- [Mongoose Populate API](https://mongoosejs.com/docs/api/query.html#Query.prototype.populate())
- [Mongoose SchemaType ref](https://mongoosejs.com/docs/schematypes.html#refs)

## 🚀 Run

```bash
npm install
cp .env.example .env
npm run dev
```

Open:

- `http://localhost:3000/` overview
- `http://localhost:3000/populate-author` example 1
- `http://localhost:3000/populate-comment-authors` example 2
