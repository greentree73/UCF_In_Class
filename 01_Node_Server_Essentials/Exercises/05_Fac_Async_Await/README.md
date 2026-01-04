# Async/Await with Fetch

## 🎯 Learning Objectives
By the end of this activity, you will understand:
- What async/await is and why it makes code easier to read
- How async/await compares to Promises with .then()
- How to handle errors with try/catch instead of .catch()
- When to use async/await vs Promises
- How to write cleaner, more readable asynchronous code

---

## 🤔 What is Async/Await?

**Async/await** is a newer, cleaner way to write asynchronous code in JavaScript. Think of it as **"Promise syntax that looks like normal code"**.

### The Problem with Promise Chains
Remember those long Promise chains with `.then().then().catch()`? They can get messy:

```javascript
// Promise chain - can get confusing with multiple steps
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    setData(data)
  })
  .catch(error => {
    console.error('Error:', error)
    setError(error.message)
  })
```

### The Async/Await Solution
Async/await lets you write the same code but it looks like regular, step-by-step code:

```javascript
// Async/await - looks like normal code!
try {
  const response = await fetch(url)
  const data = await response.json()
  console.log(data)
  setData(data)
} catch (error) {
  console.error('Error:', error)
  setError(error.message)
}
```

---

## 🔑 Key Concepts

### 1. **The `async` Keyword**
- Put `async` before a function to make it asynchronous
- This tells JavaScript: "This function will do things that take time"

```javascript
// Regular function
function fetchData() {
  // This won't work - can't use await without async
}

// Async function
async function fetchData() {
  // Now we can use await inside here!
}
```

### 2. **The `await` Keyword**
- Put `await` before any Promise to "wait for it to finish"
- It's like saying "pause here until this is done, then continue"

```javascript
// Without await - this doesn't work as expected
const response = fetch(url)  // This is a Promise, not data!
console.log(response)        // This logs the Promise object, not the response

// With await - this works!
const response = await fetch(url)  // Wait for the network request to finish
console.log(response)              // This logs the actual Response object
```

### 3. **Error Handling with try/catch**
- Use `try/catch` instead of `.catch()` with async/await
- Put risky code in the `try` block
- Handle errors in the `catch` block

```javascript
try {
  // Code that might fail goes here
  const response = await fetch(url)
  const data = await response.json()
} catch (error) {
  // If anything above fails, handle it here
  console.error('Something went wrong:', error)
}
```

---

## 📊 Promises vs Async/Await Comparison

Let's see the same API call written both ways:

### Promise Chain Version:
```javascript
const fetchUser = () => {
  setLoading(true)
  
  fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      return response.json()
    })
    .then(userData => {
      console.log('User:', userData)
      setData(userData)
    })
    .catch(error => {
      console.error('Error:', error)
      setError(error.message)
    })
    .finally(() => {
      setLoading(false)
    })
}
```

### Async/Await Version:
```javascript
const fetchUser = async () => {
  setLoading(true)
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    
    const userData = await response.json()
    console.log('User:', userData)
    setData(userData)
    
  } catch (error) {
    console.error('Error:', error)
    setError(error.message)
  } finally {
    setLoading(false)
  }
}
```

### Which is Better?
- **Async/await**: Easier to read, looks like normal code, easier to debug
- **Promises**: Works in older browsers, good for understanding how Promises work

---

## 🛠️ Common Patterns

### 1. **Multiple API Calls in Sequence**
```javascript
// Get user, then get their posts
async function getUserAndPosts(userId) {
  try {
    // Step 1: Get the user
    const userResponse = await fetch(`/api/users/${userId}`)
    const user = await userResponse.json()
    
    // Step 2: Get their posts (using data from step 1)
    const postsResponse = await fetch(`/api/users/${userId}/posts`)
    const posts = await postsResponse.json()
    
    return { user, posts }
  } catch (error) {
    console.error('Failed to get user and posts:', error)
    throw error
  }
}
```

### 2. **Multiple API Calls in Parallel**
```javascript
// Get user and posts at the same time (faster!)
async function getUserAndPostsParallel(userId) {
  try {
    // Start both requests at the same time
    const userPromise = fetch(`/api/users/${userId}`)
    const postsPromise = fetch(`/api/users/${userId}/posts`)
    
    // Wait for both to finish
    const [userResponse, postsResponse] = await Promise.all([userPromise, postsPromise])
    
    // Process the responses
    const user = await userResponse.json()
    const posts = await postsResponse.json()
    
    return { user, posts }
  } catch (error) {
    console.error('Failed to get user and posts:', error)
    throw error
  }
}
```

### 3. **Error Handling for Different Types of Errors**
```javascript
async function fetchUserSafely(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`)
    
    // Handle HTTP errors
    if (response.status === 404) {
      throw new Error('User not found')
    }
    
    if (response.status === 500) {
      throw new Error('Server error - please try again later')
    }
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const user = await response.json()
    return user
    
  } catch (error) {
    // Handle network errors vs our custom errors
    if (error.message.includes('Failed to fetch')) {
      console.error('Network error - check your internet connection')
    } else {
      console.error('API error:', error.message)
    }
    throw error  // Re-throw so calling code can handle it too
  }
}
```

---

## ⚠️ Common Mistakes

### 1. **Forgetting `async` Keyword**
```javascript
// ❌ This won't work
function fetchData() {
  const response = await fetch(url)  // Error: await only works in async functions
}

// ✅ This works
async function fetchData() {
  const response = await fetch(url)  // Good!
}
```

### 2. **Not Using `await` When You Need It**
```javascript
// ❌ This doesn't wait
async function fetchData() {
  const response = fetch(url)        // This is still a Promise!
  const data = response.json()       // Error: response.json is not a function
}

// ✅ This waits properly
async function fetchData() {
  const response = await fetch(url)  // Wait for the response
  const data = await response.json() // Wait for JSON parsing
}
```

### 3. **Forgetting Error Handling**
```javascript
// ❌ No error handling - if fetch fails, your app might crash
async function fetchData() {
  const response = await fetch(url)
  const data = await response.json()
  return data
}

// ✅ Proper error handling
async function fetchData() {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch data:', error)
    throw error
  }
}
```

---

## 🎯 When to Use What?

### Use **Async/Await** when:
- You want code that's easy to read and debug
- You're doing multiple async operations in sequence
- You're working with modern JavaScript environments
- You want error handling that feels natural

### Use **Promises** when:
- You need to support older browsers
- You're learning how Promises work under the hood
- You have simple, single async operations
- You're working with libraries that return Promises

---

## 🔍 What's Next?

Now that you understand async/await, you can:
- Write cleaner API calls in your React components
- Handle complex async workflows more easily
- Debug async code more effectively
- Build more reliable error handling

In the next activity, we'll practice converting Promise chains to async/await and see how much cleaner the code becomes!
