# Lab Activity: Refactor Promises to Async/Await

## 🎯 Objective
Refactor the existing Promise-based `handleFetch` function to use modern async/await syntax. You'll learn how to make asynchronous code more readable and easier to debug while maintaining the same functionality.

---

## 📋 Instructions

### Step 1: Understand the Current Code
Before refactoring, examine the current `handleFetch` function in `src/App.tsx`. Notice:
- It uses `.then()` chains for handling async operations
- Error handling is done with `.catch()`
- Cleanup is handled with `.finally()`
- It handles both JSON and text responses
- It includes proper error messages and loading states

### Step 2: Refactor to Async/Await
Transform the `handleFetch` function by following these steps:

1. **Add the `async` keyword** to the function declaration
2. **Replace the first `.then()`** with `await` and assign to a variable
3. **Convert error handling** from `.catch()` to `try/catch` blocks
4. **Replace `.finally()`** with a `finally` block
5. **Handle the response processing** with proper await statements

### Step 3: Key Refactoring Points

#### Before (Promise Chain):
```javascript
const handleFetch = () => {
  fetch(url)
    .then(res => { /* handle response */ })
    .then(parsed => { /* handle data */ })
    .catch(e => { /* handle errors */ })
    .finally(() => { /* cleanup */ })
}
```

#### After (Async/Await):
```javascript
const handleFetch = async () => {
  try {
    const res = await fetch(url)
    // Handle response processing
    const parsed = await /* process response */
    // Handle success
  } catch (e) {
    // Handle errors
  } finally {
    // Cleanup
  }
}
```

### Step 4: Handle Response Processing
The trickiest part is converting the conditional response handling:

- **For JSON responses**: Use `await res.json()`
- **For text responses**: Use `await res.text()` then try to parse
- **For errors**: Check `res.ok` and throw errors that will be caught by your `catch` block

### Step 5: Test Your Refactored Code
1. Run the application: `npm run dev`
2. Test with the default D&D API URL
3. Test with an invalid URL to verify error handling
4. Test with different API endpoints
5. Verify that loading states work correctly

---

## 🔍 What to Focus On

### 1. **Function Signature Change**
- Add `async` keyword before the function
- The function will now return a `Promise<void>`

### 2. **Sequential Await Statements**
- Each async operation needs its own `await`
- Variables can be assigned directly from await expressions

### 3. **Error Handling**
- Move from `.catch()` to `try/catch` blocks
- Errors thrown anywhere in the `try` block will be caught
- Maintain the same error message format

### 4. **Conditional Logic**
- HTTP error checking (`!res.ok`) should throw an error
- Content-type checking should determine processing method
- Text parsing fallback should handle JSON parsing failures

---

## ✅ Success Criteria
- [ ] Function uses `async/await` instead of Promise chains
- [ ] Error handling uses `try/catch` instead of `.catch()`
- [ ] All original functionality is preserved
- [ ] Code is more readable and easier to follow
- [ ] Loading states work correctly
- [ ] Error messages display properly
- [ ] Both JSON and text responses are handled

---

## 🚀 Bonus Challenges
If you finish early, try these enhancements:

1. **Add response timing**: Measure how long the API call takes
2. **Add retry logic**: Automatically retry failed requests
3. **Add request cancellation**: Use AbortController to cancel requests
4. **Add request headers**: Send custom headers with the request

---

## 💡 Helpful Hints

### Common Mistakes to Avoid:
- **Forgetting `async`**: You can't use `await` without it
- **Missing `await`**: Each Promise needs to be awaited
- **Error handling**: Make sure thrown errors are caught
- **Response reading**: Don't forget to await `res.json()` and `res.text()`

### Debugging Tips:
- Use `console.log()` to check values at each step
- Browser DevTools will show cleaner stack traces with async/await
- Error messages should be more readable than with Promise chains

---

## 🎯 Key Learning Outcomes
After completing this lab, you should understand:
- How to convert Promise chains to async/await
- Why async/await makes code more readable
- How try/catch works with async operations
- When async/await is preferable to Promises
- How to maintain the same functionality while improving syntax