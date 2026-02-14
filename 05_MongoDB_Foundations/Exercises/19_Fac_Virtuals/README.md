# 🔮 Mongoose Virtuals (Facilitator Intro)

## 📘 Introduction

**Virtuals** are computed properties that are not stored in MongoDB. They are derived from existing fields at runtime.

This Facilitator Exercise shows a basic setup using the **Hackhaven** database and a `POST` model.

## 🎯 Targets

By the end of this Session, students should understand:

- What virtuals are
- Why virtuals are useful for computed values
- That virtuals are not persisted in the database
- How to expose virtuals in API responses

## 💡 Why We Use Virtuals

Virtuals are helpful when you want:

- Cleaner response data without duplicating stored fields
- Computed values like summaries, counts, and formatted output
- No risk of stale derived data (because value is computed on demand)

## 🧪 Two Basic Examples in This Demo

In `src/models/POST.ts`:

1. `readingTimeMinutes` virtual
   - Computes estimated reading time from `body`
2. `titleWithAuthor` virtual
   - Combines `title` and `author` for display

## 📚 Documentation

- [Mongoose Virtuals Guide](https://mongoosejs.com/docs/tutorials/virtuals.html)
- [Mongoose API - Schema#virtual](https://mongoosejs.com/docs/api/schema.html#Schema.prototype.virtual())
- [Mongoose `toJSON` / `toObject` options](https://mongoosejs.com/docs/guide.html#toJSON)

## 🚀 Run the Demo

```bash
npm install
cp .env.example .env
npm run dev
```

Open:

- `http://localhost:3000/` for overview
- `http://localhost:3000/virtuals-demo` for both virtual examples

## 🧑‍🏫 Facilitator Speaking Script (5-7 Minutes)

### Minute 0-1: Set Context

- "Today we’re introducing **Mongoose virtuals** on our Hackhaven `POST` model."
- "A virtual is computed data, not persisted data."
- "Use virtuals when you want cleaner API responses without storing duplicate fields."

### Minute 1-3: Show the Model

In `src/models/POST.ts`, point out:

- `toJSON: { virtuals: true }` and `toObject: { virtuals: true }`
- `readingTimeMinutes` virtual (computed from body word count)
- `titleWithAuthor` virtual (display-friendly combined string)

Prompt students:

- "If we edit the post body, what should happen to reading time?"
- "Why is this safer than storing a `readingTime` field directly?"

### Minute 3-5: Run Demo Route

Call `GET /virtuals-demo` and narrate:

- Which fields are stored (`title`, `body`, `author`)
- Which fields are virtual (`readingTimeMinutes`, `titleWithAuthor`)
- How virtuals are returned in JSON due to schema options

### Minute 5-7: Wrap and Transition

- "Virtuals improve readability and avoid stale derived data."
- "They are great for formatting and computed presentation values."
- "Next we’ll apply a similar idea to relationship-focused data access patterns."

