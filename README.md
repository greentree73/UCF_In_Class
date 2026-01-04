
# Welcome to Split Stack: Backend Developer Track

## What is Split Stack?

**Split Stack** is a comprehensive software engineering program designed to transform you into a successful **backend developer** using modern technology stacks. This program focuses on the **Node.js API ecosystem**—the most in-demand skillset for building scalable, production-ready web applications.

Over this program, you'll learn everything needed to:
- ✅ Build robust REST APIs with Node.js and Express
- ✅ Design and manage relational databases with PostgreSQL
- ✅ Implement authentication and authorization
- ✅ Create efficient data models and schemas
- ✅ Deploy applications to production
- ✅ Write testable, maintainable code
- ✅ Follow industry best practices

---

## Program Overview

### Track Structure

This program is divided into **10 comprehensive modules**, each building on the previous one:

```
┌─────────────────────────────────────────────────────────────┐
│          SPLIT STACK: BACKEND DEVELOPER TRACK               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Module 1: Node Server Essentials                          │
│  ├─ HTTP & REST Fundamentals                              │
│  ├─ Node.js Basics                                        │
│  ├─ Express.js Server Setup                               │
│  ├─ Routing & Middleware                                  │
│  └─ Deployment Basics                                     │
│                                                             │
│  Module 2: Database Foundations                            │
│  ├─ Relational Database Concepts                          │
│  ├─ PostgreSQL Setup                                      │
│  ├─ SQL Fundamentals (CRUD)                              │
│  ├─ Filtering, Sorting & Pagination                       │
│  ├─ Data Types & Constraints                              │
│  ├─ Primary & Foreign Keys                                │
│  ├─ JOINs (INNER, LEFT, RIGHT, FULL)                     │
│  └─ Aggregations & Grouping                               │
│                                                             │
│  Module 3: Client-Server Integration                       │
│  ├─ ORM Fundamentals (Sequelize)                          │
│  ├─ Model Definition                                      │
│  ├─ Associations                                          │
│  ├─ CRUD Operations                                       │
│  └─ Error Handling                                        │
│                                                             │
│  Module 4: Building Real Projects                          │
│  ├─ Full-Stack Architecture                               │
│  ├─ RESTful API Design                                    │
│  ├─ Database Integration                                  │
│  ├─ Validation & Error Handling                           │
│  └─ Capstone Project                                      │
│                                                             │
│  Module 5: MongoDB & NoSQL                                │
│  ├─ Document Databases                                    │
│  ├─ MongoDB Basics                                        │
│  ├─ Schema Design                                         │
│  └─ CRUD Operations                                       │
│                                                             │
│  Module 6: GraphQL Essentials                             │
│  ├─ GraphQL Concepts                                      │
│  ├─ Query & Mutation Design                               │
│  ├─ Schema Definition                                     │
│  └─ Implementation with Node.js                           │
│                                                             │
│  Module 7: Test-Driven Development                        │
│  ├─ Testing Frameworks (Jest)                             │
│  ├─ Unit Testing                                          │
│  ├─ Integration Testing                                   │
│  └─ TDD Best Practices                                    │
│                                                             │
│  Module 8: DevOps & Pipeline                              │
│  ├─ CI/CD Concepts                                        │
│  ├─ Git & Version Control                                 │
│  ├─ Deployment Strategies                                 │
│  └─ Monitoring & Logging                                  │
│                                                             │
│  Module 9: Python Fundamentals                            │
│  ├─ Python Basics                                         │
│  ├─ Data Structures                                       │
│  ├─ File I/O                                              │
│  └─ OOP in Python                                         │
│                                                             │
│  Module 10: Advanced OOP & Design Patterns                │
│  ├─ Object-Oriented Programming                           │
│  ├─ SOLID Principles                                      │
│  ├─ Design Patterns                                       │
│  └─ Architecture Best Practices                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Your Learning Path

### Phase 1: Foundations (Modules 1-2)
**Goal:** Understand how web servers work and master database fundamentals

- Learn Node.js and HTTP concepts
- Set up Express servers
- Master SQL and relational databases
- Understand data relationships

### Phase 2: Integration (Modules 3-4)
**Goal:** Connect servers to databases and build real applications

- Learn ORM patterns (Sequelize)
- Build CRUD APIs
- Handle errors and validation
- Build a complete capstone project

### Phase 3: Expansion (Modules 5-6)
**Goal:** Explore alternative database and API paradigms

- MongoDB and NoSQL
- GraphQL APIs
- Flexibility in modern architecture

### Phase 4: Professional Skills (Modules 7-10)
**Goal:** Write production-ready code and manage applications

- Test-Driven Development
- DevOps and CI/CD
- Python for backend scripting
- Advanced architecture patterns

---

## Required Tools & Setup

Before you begin, you'll need to install these essential tools. Don't worry—they're all **free** and have excellent documentation!

### 1. Node.js (REQUIRED)

**What it is:** JavaScript runtime that lets you run JavaScript on servers (not just browsers)

**Why you need it:** All your API code will run on Node.js

**Install:**
- Go to https://nodejs.org/
- Download the **LTS (Long Term Support)** version
- Follow the installer for your operating system
- Verify installation by opening a terminal and running:
  ```bash
  node --version
  npm --version
  ```
- Both should return version numbers

**What you get:**
- `node` - Runs JavaScript files
- `npm` - Package manager for installing libraries

---

### 2. PostgreSQL (REQUIRED)

**What it is:** A powerful, open-source relational database

**Why you need it:** You'll store all your application data here

**Install:**
- Go to https://www.postgresql.org/download/
- Download the installer for your operating system
- During installation, set a password for the `postgres` user (remember this!)
- Accept all default settings
- Verify installation by opening a terminal and running:
  ```bash
  psql --version
  ```
- It should return the PostgreSQL version

**What you get:**
- `psql` - Command-line interface for databases
- `PostgreSQL Server` - The database engine

---

### 3. DBeaver (HIGHLY RECOMMENDED)

**What it is:** A visual database management tool

**Why you need it:** Makes writing and testing SQL queries much easier

**Install:**
- Go to https://dbeaver.io/download/
- Download **DBeaver Community Edition** (free version)
- Follow the installer for your operating system
- Launch DBeaver

**Features:**
- Visual query builder
- Database browser
- SQL syntax highlighting
- Query execution
- Result visualization

**Getting Started:**
1. Open DBeaver
2. Right-click "Databases" → "New Database Connection"
3. Choose PostgreSQL
4. Enter connection details:
   - **Host:** localhost
   - **Port:** 5432
   - **Database:** postgres
   - **Username:** postgres
   - **Password:** (the one you set during installation)
5. Click "Test Connection"
6. Click "Finish"

---

### 4. Postman (HIGHLY RECOMMENDED)

**What it is:** A tool for testing and debugging APIs

**Why you need it:** You'll make HTTP requests to your APIs and see the responses

**Install:**
- Go to https://www.postman.com/downloads/
- Download the version for your operating system
- Follow the installer
- Create a free account (or skip to continue as guest)

**Features:**
- Send GET, POST, PUT, DELETE requests
- Set headers and request bodies
- Save requests in collections
- View response data
- Automate API testing

**Getting Started:**
1. Open Postman
2. Click "Create a request"
3. Change method to GET
4. Enter URL: `https://jsonplaceholder.typicode.com/posts/1`
5. Click "Send"
6. You should see JSON data in the response

---

## System Requirements

### Minimum Specs
- **OS:** Windows, macOS, or Linux
- **RAM:** 4GB (8GB recommended)
- **Disk Space:** 2GB free
- **Internet:** Required for downloads and documentation

### Recommended Setup
- **OS:** macOS or Linux (easier for development)
- **RAM:** 8GB+
- **SSD:** Faster development experience
- **Terminal:** Git Bash (Windows), Terminal (macOS), or native shell (Linux)

---

## What You'll Build

Throughout this program, you'll create:

### Module 1: Node Servers
```javascript
// Simple HTTP server
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello, World!');
});
server.listen(3000);
```

### Module 2: Databases
```sql
-- Create tables and relationships
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  user_id INTEGER REFERENCES users(id)
);
```

### Module 3: APIs with Databases
```javascript
// REST API with Express & PostgreSQL
app.get('/api/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});
```

### Module 4: Full Applications
A complete blogging platform with:
- User authentication
- Post creation and management
- Comments system
- API documentation

### Module 7: Testing
```javascript
describe('User API', () => {
  test('GET /users returns all users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
```

---

## Program Structure

### Each Module Contains

**1. Facilitator Guides** (for instructors)
- Comprehensive explanations of concepts
- Teaching tips and tricks
- Real-world examples
- Assessment questions

**2. Student Workbooks** (for learners)
- Hands-on exercises
- Progressive difficulty
- Starter code
- Complete solutions
- Troubleshooting guides

**3. Labs & Projects**
- Practical application of concepts
- Buildable projects
- Real-world scenarios
- Capstone projects

### How to Use This Program

**For Self-Study:**
1. Read the facilitator guide for context
2. Complete the exercises in order
3. Reference solutions if stuck
4. Build side projects to reinforce learning

**For Classroom:**
1. Instructor presents concepts from guide
2. Students complete exercises together
3. Discuss solutions and real-world applications
4. Assign projects for deeper learning

---

## Success Tips

### 1. Install Everything First
Don't skip setup! Having all tools ready prevents frustration later.

### 2. Code Along, Don't Just Read
Type every example. Your fingers learn as much as your brain!

### 3. Experiment
Change variables, try different approaches, break things on purpose. This is how you learn.

### 4. Use Official Documentation
- [Node.js Docs](https://nodejs.org/docs/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

### 5. Google Your Errors
When you hit an error, Google it! Error messages usually have solutions online.

### 6. Join Communities
- Node.js community forums
- PostgreSQL mailing lists
- Stack Overflow
- GitHub discussions

### 7. Build Projects
The best way to learn is by building. Take concepts and apply them!

### 8. Never Give Up
Every developer gets stuck. That's normal! Step back, take a break, approach it fresh.

---

## Curriculum at a Glance

| Module | Title | Duration | Focus |
|--------|-------|----------|-------|
| 1 | Node Server Essentials | 1 week | HTTP, Express, Servers |
| 2 | Database Foundations | 1 week | SQL, PostgreSQL, Relations |
| 3 | Client-Server Integration | 1 week | ORMs, Models, CRUD |
| 4 | Building Real Projects | 1 week | Full API Development |
| 5 | MongoDB & NoSQL | 1 week | Alternative databases |
| 6 | GraphQL Essentials | 1 week | Query language for APIs |
| 7 | Test-Driven Development | 1 week | Testing, Quality Assurance |
| 8 | DevOps & Pipeline | 1 week | Deployment, CI/CD |
| 9 | Python Fundamentals | 1 week | Python for backend |
| 10 | Advanced OOP & Patterns | 1 week | Architecture, Patterns |
| 11 | Building Real Projects | 1 week | Full Stack Development |
| 12 | Building Real Projects | 1 week | Full Stack Development |
| | **TOTAL** | **~12 weeks** | **Complete Backend Developer** |

---

## Key Technologies You'll Master

```
┌─────────────────────────────────────────────────────────┐
│           TECHNOLOGIES IN THIS PROGRAM                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  RUNTIME:        Node.js                               │
│  LANGUAGE:       JavaScript (ES6+)                      │
│  WEB FRAMEWORK:  Express.js                             │
│  DATABASE:       PostgreSQL, MongoDB                    │
│  ORM/ODM:        Sequelize, Mongoose                    │
│  API STYLE:      REST, GraphQL                          │
│  TESTING:        Jest, Supertest                        │
│  DEPLOYMENT:     Docker, Git, GitHub Actions            │
│  TOOLS:          Postman, DBeaver, VS Code              │
│  SCRIPTING:      Python                                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## What Employers Want

After completing this program, you'll have skills that employers are actively seeking:

✅ **Build APIs**
- Create REST endpoints
- Handle requests and responses
- Implement business logic

✅ **Design Databases**
- Create efficient schemas
- Define relationships
- Optimize queries

✅ **Write Clean Code**
- Maintainable code
- Follow best practices
- Document your work

✅ **Test Your Code**
- Write unit tests
- Integration tests
- Ensure reliability

✅ **Deploy Applications**
- Use version control
- CI/CD pipelines
- Production deployment

✅ **Problem Solving**
- Debug issues
- Optimize performance
- Handle edge cases

---

## Getting Started

### Next Steps

1. **Complete Installation**
   - [ ] Install Node.js
   - [ ] Install PostgreSQL
   - [ ] Install DBeaver
   - [ ] Install Postman
   - [ ] Verify all installations

2. **Review This README**
   - Understand the program structure
   - Know what tools you'll use
   - Get excited about what you'll build!

3. **Start Module 1**
   - Read the facilitator guide
   - Follow the exercises
   - Build your first Node.js server

4. **Join the Community**
   - Connect with other learners
   - Share your progress
   - Ask questions

---

## Support & Resources

### When You're Stuck

1. **Read the Troubleshooting Guide** in each module
2. **Check the Official Docs** (links provided in each lesson)
3. **Google the Error Message** (99% of errors have solutions online)
4. **Ask in Communities** (Stack Overflow, Reddit, Discord)
5. **Review the Solution Code** (but try to solve it first!)

### Learning Style

Everyone learns differently:
- **Visual Learners:** Use diagrams and videos
- **Hands-On Learners:** Start coding immediately
- **Reading/Writing:** Study documentation and examples
- **Auditory Learners:** Explain concepts out loud

Find what works for you and lean into it!

---

## Your Backend Developer Journey Starts Here

You're about to join thousands of developers who have built successful careers with these skills. The journey is challenging but incredibly rewarding.

**Remember:**
- Every expert was once a beginner
- Difficulty means you're learning
- Build projects, not just tutorials
- Help others along the way

Welcome to Split Stack. Let's build something amazing! 🚀

---

## Quick Links

**Installation Guides:**
- [Node.js Download](https://nodejs.org/)
- [PostgreSQL Download](https://www.postgresql.org/download/)
- [DBeaver Download](https://dbeaver.io/download/)
- [Postman Download](https://www.postman.com/downloads/)

**Learning Resources:**
- [Node.js Official Documentation](https://nodejs.org/docs/)
- [PostgreSQL Official Documentation](https://www.postgresql.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [Mozilla Developer Network](https://developer.mozilla.org/)

**Community:**
- [Stack Overflow](https://stackoverflow.com/)
- [Node.js Community](https://nodejs.org/en/community/)
- [PostgreSQL Mailing Lists](https://www.postgresql.org/community/)
- [GitHub Discussions](https://github.com/)

---

## License & Attribution

Split Stack is created for educational purposes. All content is licensed under University of Central Florida International License.



Welcome aboard! 🎓

