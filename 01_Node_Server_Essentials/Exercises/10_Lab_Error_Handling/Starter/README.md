# API Error Handling Lab


## Learning Objectives
- Implement proper error handling for API requests
- Use try-catch blocks effectively
- Display meaningful error messages to users
- Handle network errors and API failures gracefully

## Scenario
You're working on a D&D character reference app that fetches spell information from the D&D 5e API. The current code has broken error handling that causes the application to crash when the API is unavailable or returns an error. Your task is to fix the error handling to provide a better user experience.

## Setup Instructions
1. Navigate to the `Starter` directory
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to `http://localhost:5173`

## Current Problem
The application currently crashes when:
- The API is unavailable
- An invalid spell name is entered
- Network connectivity issues occur

## Your Task
Fix the error handling in `src/main.ts` to:

1. **Wrap API calls in try-catch blocks** - Prevent the application from crashing
2. **Handle different error scenarios** - Network errors, API errors, invalid responses
3. **Display user-friendly error messages** - Show meaningful feedback instead of technical errors
4. **Provide fallback content** - Display a default message when the API fails

## Testing Your Solution
Test your error handling by:
1. Entering an invalid spell name (e.g., "fakespell123")
2. Temporarily disconnecting your internet connection
3. Verifying the app doesn't crash and shows appropriate error messages

## Acceptance Criteria
- ✅ App doesn't crash on API errors
- ✅ User sees meaningful error messages
- ✅ Invalid spell names are handled gracefully
- ✅ Network errors are caught and displayed
- ✅ App remains functional after errors occur

## Hint
Look for the `fetchSpellData` function and the places where it's called. You'll need to:
- Add try-catch blocks around async operations
- Check response status codes
- Handle different types of errors appropriately
- Update the UI to show error states

## Time Management
- **1-2 minutes**: Understand the current code structure
- **2-3 minutes**: Implement try-catch blocks and error handling
- **1-2 minutes**: Test your implementation and refine error messages

Good luck! 🎲✨