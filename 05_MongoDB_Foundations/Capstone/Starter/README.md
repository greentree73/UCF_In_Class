# 📅 Event Planner API - Capstone Project

## 🎯 Project Overview

Build a **RESTful API for managing events** using Express, MongoDB, and Mongoose. This productivity-focused application allows users to create, view, update, and delete events (like meetups, conferences, or personal schedules) with features like filtering by date or category.

This project mirrors real-world applications like Google Calendar or Eventbrite backends and teaches critical skills like date handling, MongoDB querying, schema validation, and proper MVC architecture.

---

## 🏗️ Project Structure

Your completed project should follow this structure:

```
event-planner-api/
├── src/
│   ├── config/
│   │   └── db.ts              # Database connection
│   ├── models/
│   │   ├── index.ts           # Export all models
│   │   └── Event.ts           # Event schema & model
│   ├── controllers/
│   │   └── eventController.ts # Business logic for events
│   ├── routes/
│   │   └── eventRoutes.ts     # API route definitions
│   └── app.ts                 # Express app setup & server
├── .env.example               # Environment variable template
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📋 Requirements

### Event Model Schema

Create a Mongoose schema in `models/Event.ts` with the following fields:

| Field | Type | Constraints |
|-------|------|-------------|
| `title` | String | Required, trimmed |
| `description` | String | Optional, trimmed |
| `date` | Date | Required (event date/time) |
| `location` | String | Optional, trimmed |
| `category` | String | Enum: ['Meeting', 'Conference', 'Personal', 'Workshop', 'Other'], default: 'Other' |
| `attendees` | String[] | Array of attendee names or emails |
| `createdAt` | Date | Auto-generated timestamp |
| `updatedAt` | Date | Auto-updated on save |

**Validation Rules:**
- Title is required and cannot be empty
- Date must be a valid Date object
- Category must be one of the enum values
- Include a pre-save hook to update `updatedAt` timestamp

---

## 🛤️ API Routes

Implement the following RESTful endpoints:

### 1. **GET /api/events**
- **Description**: Retrieve all events or filter by query parameters
- **Query Parameters**:
  - `category` (optional) - Filter by event category (e.g., `?category=Meeting`)
  - `date` (optional) - Filter events on or after this date (e.g., `?date=2025-10-05`)
- **Response**: Array of event objects
- **Example**: `GET http://localhost:3000/api/events?category=Workshop`

### 2. **GET /api/events/:id**
- **Description**: Get a single event by MongoDB ObjectId
- **Path Parameter**: `:id` (MongoDB ObjectId)
- **Response**: Single event object or 404 if not found
- **Example**: `GET http://localhost:3000/api/events/66f8b1234567890abcde`

### 3. **POST /api/events**
- **Description**: Create a new event
- **Request Body** (JSON):
  ```json
  {
    "title": "Team Sync Meeting",
    "description": "Weekly team standup",
    "date": "2025-10-10T10:00:00Z",
    "location": "Zoom",
    "category": "Meeting",
    "attendees": ["alice@example.com", "bob@example.com"]
  }
  ```
- **Response**: Created event object with 201 status
- **Validation**: Ensure required fields are present

### 4. **PUT /api/events/:id**
- **Description**: Update an existing event
- **Path Parameter**: `:id` (MongoDB ObjectId)
- **Request Body**: JSON with fields to update
- **Response**: Updated event object or 404 if not found
- **Example**: Update event category or add attendees

### 5. **DELETE /api/events/:id**
- **Description**: Delete an event
- **Path Parameter**: `:id` (MongoDB ObjectId)
- **Response**: Success message or 404 if not found
- **Example**: `DELETE http://localhost:3000/api/events/66f8b1234567890abcde`

---

## 🔧 Technical Requirements

### 1. **Database Connection** (`config/db.ts`)
- Use Mongoose to connect to MongoDB
- Load connection string from environment variables
- Export `connectDB()` and `closeDB()` functions
- Include proper error handling

### 2. **MVC Architecture**
- **Models**: Define Mongoose schemas and models
- **Controllers**: Handle business logic and database operations
- **Routes**: Define API endpoints and map to controllers
- **Config**: Manage database connection and configuration

### 3. **TypeScript**
- Use proper TypeScript interfaces for Event types
- Type all function parameters and return values
- Export types alongside models

### 4. **Error Handling**
- Return appropriate HTTP status codes (200, 201, 400, 404, 500)
- Provide meaningful error messages
- Handle validation errors from Mongoose
- Handle invalid MongoDB ObjectIds

### 5. **Environment Variables**
- Use `dotenv` for configuration
- Required variables: `MONGO_URL`, `MONGO_DB`, `PORT`
- Provide `.env.example` template

---

## 🚀 Getting Started

### Installation

1. **Initialize the project:**
   ```bash
   npm init -y
   ```

2. **Install dependencies:**
   ```bash
   npm install express mongoose dotenv
   npm install -D typescript tsx @types/express @types/node
   ```

3. **Set up TypeScript:**
   ```bash
   npx tsc --init
   ```

4. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection details
   ```

5. **Update package.json scripts:**
   ```json
   {
     "scripts": {
       "dev": "tsx watch src/app.ts",
       "build": "tsc",
       "start": "node dist/app.js"
     }
   }
   ```

### Development

```bash
npm run dev
```

Server should start on `http://localhost:3000`

---

## 🧪 Testing with Postman

Create a Postman collection to test all endpoints:

### Test Case 1: Create Event
```
POST http://localhost:3000/api/events
Content-Type: application/json

{
  "title": "Node.js Workshop",
  "description": "Learn advanced Node.js concepts",
  "date": "2026-03-15T14:00:00Z",
  "location": "UCF Engineering Building",
  "category": "Workshop",
  "attendees": ["student1@ucf.edu", "student2@ucf.edu"]
}
```

### Test Case 2: Get All Events
```
GET http://localhost:3000/api/events
```

### Test Case 3: Filter by Category
```
GET http://localhost:3000/api/events?category=Workshop
```

### Test Case 4: Filter by Date
```
GET http://localhost:3000/api/events?date=2026-03-01
```

### Test Case 5: Get Event by ID
```
GET http://localhost:3000/api/events/{event_id}
```

### Test Case 6: Update Event
```
PUT http://localhost:3000/api/events/{event_id}
Content-Type: application/json

{
  "location": "Online - Zoom Link",
  "attendees": ["student1@ucf.edu", "student2@ucf.edu", "student3@ucf.edu"]
}
```

### Test Case 7: Delete Event
```
DELETE http://localhost:3000/api/events/{event_id}
```

### Edge Cases to Test
- Invalid event ID (should return 404)
- Missing required fields (should return 400)
- Invalid category value (should return 400)
- Invalid date format (should return 400)

---

## 💡 Implementation Tips

### Date Handling
```typescript
// Filtering events on or after a specific date
const dateFilter = req.query.date 
  ? { date: { $gte: new Date(req.query.date as string) } }
  : {};
```

### Query Building
```typescript
// Combine multiple filters
const filters: any = {};
if (req.query.category) {
  filters.category = req.query.category;
}
if (req.query.date) {
  filters.date = { $gte: new Date(req.query.date as string) };
}
const events = await Event.find(filters);
```

### Validation
```typescript
// Check if ID is valid MongoDB ObjectId
import mongoose from 'mongoose';

if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({ message: 'Invalid event ID' });
}
```

### Pre-save Hook
```typescript
// Update timestamp automatically
eventSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});
```

---

## 🎓 Learning Outcomes

By completing this project, you will:

✅ Build a complete RESTful API with Express and MongoDB

✅ Implement proper MVC architecture in TypeScript

✅ Create Mongoose schemas with validation and middleware

✅ Handle date-based queries and filtering

✅ Implement CRUD operations with proper error handling

✅ Structure a production-ready Node.js application

✅ Test APIs using Postman or similar tools

✅ Work with environment variables and configuration

---

## 🌟 Bonus Challenges

Once you complete the core requirements, try these enhancements:

1. **Pagination** - Add `page` and `limit` query parameters
   ```
   GET /api/events?page=2&limit=10
   ```

2. **Sorting** - Allow sorting by date or title
   ```
   GET /api/events?sort=date&order=asc
   ```

3. **Upcoming Events Route** - Get only future events
   ```
   GET /api/events/upcoming
   ```

4. **Search by Title** - Text search functionality
   ```
   GET /api/events?search=workshop
   ```

5. **Attendee Count** - Add virtual field for attendee count

6. **Input Validation** - Use `express-validator` for robust validation

7. **Recurring Events** - Add support for events that repeat

8. **Export Events** - Generate CSV or JSON export

---

## 📚 Resources

- **Mongoose Documentation**: [mongoosejs.com](https://mongoosejs.com/)
- **Express Documentation**: [expressjs.com](https://expressjs.com/)
- **MongoDB Query Operators**: [mongodb.com/docs/manual/reference/operator/query/](https://docs.mongodb.com/manual/reference/operator/query/)
- **TypeScript Handbook**: [typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
- **Date Handling in JavaScript**: [MDN Date Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

---

## ✅ Submission Checklist

Before submitting, ensure:

- [ ] All 5 CRUD endpoints are implemented and working
- [ ] Filtering by category and date works correctly
- [ ] Error handling returns appropriate status codes
- [ ] Code follows MVC architecture (Models, Controllers, Routes, Config)
- [ ] TypeScript is used throughout with proper types
- [ ] Environment variables are used for configuration
- [ ] `.env` is in `.gitignore` (not committed)
- [ ] `.env.example` is provided
- [ ] README.md includes setup and testing instructions
- [ ] All Postman tests pass successfully
- [ ] Code is clean, commented, and well-organized

---

**Good luck building your Event Planner API! 🚀**
