# Full-Stack Application Introduction

This project demonstrates how to build a complete full-stack application with a **React frontend** and **Express/Sequelize backend**, connected together using **concurrently** for development.

## 📁 Project Structure

```
21_Fac_FullStack/
├── package.json          # Root package.json with concurrently scripts
├── README.md            # This file
├── client/              # Frontend React application
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── index.html
│   └── src/
│       ├── main.tsx         # React app entry point
│       ├── App.tsx          # Root component
│       └── components/
│           └── MessageBoard.tsx  # Single component example
└── server/              # Backend Express API
    ├── package.json
    ├── tsconfig.json
    ├── db_setup/
    │   └── schema.sql      # Database schema
    └── src/
        ├── index.ts        # Express server entry point
        ├── config/
        │   └── connection.ts  # Database connection
        ├── models/
        │   └── Message.ts     # Sequelize model
        └── routes/
            └── messageRoutes.ts  # API endpoints
```

## 🛠️ Technologies Used

### Frontend (Client)
- **React** - JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast development server and build tool
- **Axios** - HTTP client for making API requests

### Backend (Server)
- **Express** - Web framework for Node.js
- **Sequelize** - ORM (Object-Relational Mapping) for PostgreSQL
- **PostgreSQL** - Relational database
- **TypeScript** - Type-safe JavaScript
- **tsx** - TypeScript execution for development

### Development Tools
- **concurrently** - Run multiple npm scripts simultaneously
- **wait-on** - Wait for server to be ready before starting client
- **CORS** - Enable cross-origin requests between client and server

## 🔄 How Client and Server Communicate

### The Communication Flow

```
┌─────────────┐          HTTP Request          ┌─────────────┐
│             │  ────────────────────────────>  │             │
│   Client    │      (axios.get/post)           │   Server    │
│ (React App) │                                 │  (Express)  │
│  Port 5173  │  <────────────────────────────  │  Port 4000  │
│             │         JSON Response           │             │
└─────────────┘                                 └─────────────┘
       │                                               │
       │                                               │
       v                                               v
 Browser DOM                                    PostgreSQL DB
  (UI Updates)                                  (Data Storage)
```

### Step-by-Step Process

1. **User Action**: User interacts with the React component (e.g., clicks a button)
2. **API Call**: React component uses Axios to send HTTP request to server
   ```typescript
   const response = await axios.get('http://localhost:4000/api/messages');
   ```
3. **Server Receives**: Express route handler receives the request
4. **Database Query**: Sequelize model queries PostgreSQL database
5. **Response Sent**: Server sends JSON data back to client
6. **State Update**: React component updates state with the data
7. **UI Re-render**: Component re-renders to display new data

### CORS (Cross-Origin Resource Sharing)

Since the client (port 5173) and server (port 4000) run on different ports, they are considered different "origins". CORS middleware on the server allows the client to make requests:

```typescript
// Server allows requests from client
app.use(cors({ origin: 'http://localhost:5173' }));
```

## 🚀 Running the Application

### Prerequisites
- Node.js installed
- PostgreSQL installed and running
- Database created (default: `fullstack_db`)

### Installation

```bash
# Install all dependencies (root, client, and server)
npm run install
```

### Development Mode (Recommended)

Run both client and server together with hot-reloading:

```bash
npm run start:dev
```

This command:
1. Starts the Express server on port 4000
2. Waits for the server to be ready
3. Starts the Vite dev server on port 5173
4. Both run concurrently and auto-reload on changes

### Individual Commands

```bash
# Run server only
npm run server:dev

# Run client only
npm run client:dev

# Build for production
npm run build

# Run production build
npm start
```

## 📋 Example: Message Board Application

This simple app demonstrates all the core concepts:

### Backend (2 Routes)

1. **GET /api/messages** - Retrieve all messages
   - Queries database using Sequelize
   - Returns JSON array of messages

2. **POST /api/messages** - Create a new message
   - Receives JSON body with message data
   - Saves to database using Sequelize
   - Returns created message

### Frontend (1 Component)

**MessageBoard Component**:
- Fetches messages when component mounts
- Displays list of messages
- Provides form to create new messages
- Updates UI when new message is added

### Database (1 Model)

**Message Model**:
```typescript
{
  id: number (auto-increment)
  username: string
  content: string
  createdAt: timestamp
}
```

## 🔑 Key Concepts Demonstrated

1. **RESTful API Design**: HTTP methods (GET, POST) for CRUD operations
2. **Client-Server Architecture**: Separation of concerns
3. **Asynchronous Communication**: Promises and async/await
4. **State Management**: React hooks (useState, useEffect)
5. **TypeScript Types**: Type safety across the stack
6. **Database ORM**: Sequelize models and queries
7. **Environment Configuration**: .env files for sensitive data
8. **Development Workflow**: Concurrently running services

## 📝 Next Steps

After understanding this simple example, you can:
- Add more models and relationships
- Implement authentication (JWT)
- Add more complex routes (PUT, DELETE)
- Create additional React components
- Add form validation
- Implement error handling
- Add loading states and better UX

## 🎓 Learning Objectives

By studying this project, you will understand:
- How to structure a full-stack TypeScript application
- How React components communicate with an Express API
- How Sequelize models interact with PostgreSQL
- How to use concurrently for efficient development
- The role of each technology in the stack
- Basic CRUD operations across the full stack

---

**Ready to build?** Follow the setup instructions above and explore the code in `client/src` and `server/src`!
