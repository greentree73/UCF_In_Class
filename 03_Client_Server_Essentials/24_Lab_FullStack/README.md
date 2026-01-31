# Lab: Full-Stack Code Analysis

## 🎯 Objective

In this lab, you will analyze the full-stack message board application from `21_Fac_FullStack` to understand how the client and server work together. You'll locate specific parts of the codebase and be prepared to explain how they function.

## 📋 Prerequisites

- Completed review of `21_Fac_FullStack` project
- Application running successfully (use `npm run start:dev`)
- Understanding of basic React, Express, and Sequelize concepts

## 🔍 Your Mission

Your task is to locate **5 critical parts** of the full-stack application and be ready to discuss how each one works. Use this README as your guide to find each section of code.

---

## Part 1: API Route Handlers (Server)

### Location
📂 `server/src/routes/messageRoutes.ts`

### What to Find
Locate the **two route handlers** that handle GET and POST requests.

### Questions to Answer
1. **How does the GET route retrieve messages from the database?**
   - What Sequelize method is used?
   - How are the messages sorted?
   - What happens if the database query fails?

2. **How does the POST route create a new message?**
   - What data is expected in the request body?
   - What validation is performed before saving?
   - What HTTP status code is returned on success?

### Discussion Points
- What is the purpose of `async/await` in these functions?
- Why do we use try/catch blocks?
- What does `res.json()` do?
- How would you add a DELETE route to remove a message?

---

## Part 2: Sequelize Model Definition (Server)

### Location
📂 `server/src/models/Message.ts`

### What to Find
Locate the **Message model definition** using Sequelize.

### Questions to Answer
1. **What fields are defined in the Message model?**
   - List all the fields and their data types
   - Which fields are auto-generated?
   - What validations are applied to the fields?

2. **How does Sequelize know how to create the database table?**
   - What is the `tableName` set to?
   - What does `timestamps: true` do?
   - What does `autoIncrement` mean for the `id` field?

### Discussion Points
- What is an ORM and why use it instead of raw SQL?
- What does `allowNull: false` enforce?
- How do the TypeScript interfaces relate to the Sequelize model?
- What would happen if you tried to create a message with a 100-character username?

---

## Part 3: React Component State Management (Client)

### Location
📂 `client/src/components/MessageBoard.tsx`

### What to Find
Locate the **state variables** declared with `useState` at the top of the component.

### Questions to Answer
1. **What state variables are being managed?**
   - List each `useState` declaration
   - What is the initial value of each state?
   - What TypeScript types are used?

2. **How is state updated throughout the component?**
   - When is `setMessages` called?
   - When is `setLoading` set to true vs false?
   - What triggers `setError` to be called?

### Discussion Points
- Why do we need state in React components?
- What happens when you call a state setter function?
- Why is `messages` typed as `Message[]`?
- How would you add a new state variable to track the number of likes on a message?

---

## Part 4: API Calls with Axios (Client)

### Location
📂 `client/src/components/MessageBoard.tsx`

### What to Find
Locate the **two functions** that make HTTP requests: `fetchMessages()` and the submit handler inside `handleSubmit()`.

### Questions to Answer
1. **How does the client fetch messages from the server?**
   - What HTTP method is used?
   - What is the complete URL being called?
   - What happens with the response data?

2. **How does the client send a new message to the server?**
   - What HTTP method is used?
   - What data is sent in the request body?
   - What happens after a successful POST?

### Discussion Points
- What is Axios and why use it instead of `fetch()`?
- Why is `async/await` used with these API calls?
- What happens in the `catch` block if the server is down?
- How would you modify the code to update an existing message (PUT request)?

---

## Part 5: Client-Server Connection Configuration

### Location (Multiple Files)
📂 `server/src/index.ts` - CORS configuration  
📂 `client/vite.config.ts` - Proxy configuration  
📂 Root `package.json` - Concurrently scripts

### What to Find
Locate the **CORS middleware**, **Vite proxy settings**, and **concurrently scripts**.

### Questions to Answer
1. **How is CORS configured on the server?**
   - Find the `cors()` middleware in `server/src/index.ts`
   - What origin is allowed?
   - Why is CORS necessary?

2. **How does the Vite dev server proxy API requests?**
   - Find the proxy configuration in `client/vite.config.ts`
   - What requests are proxied to the backend?
   - Why use a proxy in development?

3. **How do both servers run simultaneously?**
   - Find the `start:dev` script in root `package.json`
   - What does `concurrently` do?
   - What does `wait-on tcp:4000` accomplish?

### Discussion Points
- What would happen if you removed the CORS middleware?
- Why do the client and server run on different ports?
- What is the advantage of using concurrently vs running two terminal windows?
- How would deployment work differently than development?

---

## 📝 Lab Activities

### Activity 1: Code Walkthrough (20 minutes)
In small groups, walk through each of the 5 parts above. Each person should:
1. Navigate to the file in VS Code
2. Explain what the code does
3. Share their answers to the questions

### Activity 2: Follow the Data Flow (15 minutes)
Trace what happens when a user submits a new message:
1. User clicks "Send Message" button → **Where does this start?**
2. Form submission is handled → **Which function runs?**
3. HTTP request is sent → **What URL and method?**
4. Server receives request → **Which route handler?**
5. Database is updated → **What Sequelize method?**
6. Response is sent back → **What data?**
7. Client updates UI → **How is state updated?**

Create a flowchart or numbered list showing this entire journey.

### Activity 3: Modification Challenge (15 minutes)
Discuss with your group how you would implement these features:

1. **Add a timestamp display** showing "Posted X minutes ago"
   - Which file would you modify?
   - What code would you change?

2. **Add a character counter** to the message textarea
   - Where would you add state?
   - How would you display it?

3. **Add a "Delete" button** for each message
   - What new route would you need?
   - What HTTP method?
   - How would you update the UI?

### Activity 4: Debugging Scenarios (10 minutes)
For each scenario, identify where you would look to debug:

1. **Messages aren't loading when the page first opens**
   - Which file contains the initial fetch?
   - What React hook triggers it?
   - How would you check if the server is responding?

2. **Form submits but new message doesn't appear in the list**
   - Check the POST request in Network tab
   - Check the state update after successful POST
   - Verify the database was updated

3. **Getting a CORS error in the browser console**
   - Where is CORS configured?
   - What origin should be allowed?
   - Is the server running?

---

## 🎓 Learning Outcomes

By completing this lab, you should be able to:

✅ Identify and explain the purpose of API route handlers  
✅ Understand how Sequelize models map to database tables  
✅ Explain React state management and hooks  
✅ Trace HTTP requests from client to server and back  
✅ Understand the development environment setup (CORS, proxy, concurrently)  
✅ Debug common full-stack application issues  

---

## 💡 Bonus Challenges

If you finish early, try to locate and explain:

1. **TypeScript Interfaces**: Find where the `Message` interface is defined in both client and server. Why is it defined in both places?

2. **Error Handling**: Count how many try/catch blocks exist in the codebase. Why is error handling important?

3. **Environment Variables**: Find where `.env` is used. What sensitive information is stored there?

4. **Database Connection**: Locate where the Sequelize connection is created and imported. How does it know which database to connect to?

5. **Vite Configuration**: Find all the Vite configuration options. What does `open: true` do?

---

## 📤 Deliverable

Be prepared to:
- Present one of the 5 parts to the class
- Answer questions about how it works
- Explain how you would modify it for a new feature
- Discuss what you learned about full-stack architecture

---

## 🆘 Need Help?

- Review the main README in `21_Fac_FullStack`
- Use VS Code's "Go to Definition" (Cmd+Click or Ctrl+Click)
- Check the browser's Network tab to see HTTP requests
- Look at the terminal output for server logs
- Ask your instructor or classmates!

**Good luck! 🚀**
