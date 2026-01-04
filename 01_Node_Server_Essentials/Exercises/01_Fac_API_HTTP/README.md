# Introduction to APIs and HTTP

## 🎯 Learning Objectives
By the end of this activity, you will understand:
- What APIs are and why they're essential in modern web development
- The HTTP protocol and how it enables web communication
- Common HTTP methods and when to use them
- HTTP status codes and what they mean
- Basic REST principles for API design

---

## 📚 What is an API?

**API** stands for **Application Programming Interface**. Think of it as a waiter in a restaurant:
- **You (the client)** want to order food
- **The kitchen (the server)** can prepare food  
- **The waiter (the API)** takes your order, brings it to the kitchen, and delivers your food back to you

### Real-World Examples
- **Weather App**: Your phone requests weather data from a weather service
- **Social Media**: When you post a photo, your app sends it to the platform's servers
- **Online Shopping**: Checking product availability, processing payments

---

## 🌐 HTTP: The Language of the Web

**HTTP** (HyperText Transfer Protocol) is how computers talk to each other on the internet.

### The Request-Response Cycle
```
Client (Browser/App) ──── HTTP Request ────► Server
                     ◄──── HTTP Response ───┘
```

1. **Client** sends a request: "I want this data"
2. **Server** processes the request: "Let me find that for you"  
3. **Server** sends a response: "Here's your data" (or "Sorry, not found")

---

## 🔧 HTTP Methods (Verbs)

| Method | Purpose | Example |
|--------|---------|---------|
| `GET` | Retrieve data | Get user profile, fetch weather |
| `POST` | Create new data | Sign up user, create post |
| `PUT` | Update existing data | Update profile, edit post |
| `DELETE` | Remove data | Delete account, remove post |

---

## 📊 HTTP Status Codes

Status codes tell you how your request went:

### Success (2xx)
- **200 OK**: Request successful
- **201 Created**: New resource created successfully

### Client Errors (4xx)  
- **400 Bad Request**: Your request has invalid data
- **401 Unauthorized**: You need to log in first
- **404 Not Found**: The resource doesn't exist

### Server Errors (5xx)
- **500 Internal Server Error**: Something went wrong on the server
- **503 Service Unavailable**: Server is temporarily down

---

## 🏗️ REST Principles (Simplified)

**REST** (Representational State Transfer) is a set of guidelines for building APIs:

### 1. Use Clear URLs
```
✅ Good: GET /api/users/123
❌ Bad:  GET /api/getUserData?id=123&type=profile
```

### 2. Use HTTP Methods Correctly
```
GET    /api/posts      (get all posts)
GET    /api/posts/456  (get specific post)
POST   /api/posts      (create new post)
PUT    /api/posts/456  (update post)
DELETE /api/posts/456  (delete post)
```

### 3. Return Consistent JSON
All responses should follow the same structure for predictability.

---

## 🛠️ TypeScript Example

Check the TypeScript file in this directory to see a practical example:
- `src/example.ts` - Simple GET request with error handling

Run the example:
```bash
npm install
npm run build
npm start
```

---

## 🎯 Key Takeaways

1. **APIs are bridges** that allow different applications to communicate
2. **HTTP is the protocol** that powers web communication  
3. **HTTP methods** (GET, POST, PUT, DELETE) define what action you want to perform
4. **Status codes** tell you if your request succeeded or failed
5. **REST principles** help create predictable and easy-to-use APIs

---

## 🔍 What's Next?

In the next activity, we'll start making actual API calls using the JavaScript Fetch API to retrieve real data from public APIs!
