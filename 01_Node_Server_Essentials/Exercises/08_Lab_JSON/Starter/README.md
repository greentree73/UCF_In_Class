# Lab: JSON Parsing Basics

## 🎯 Objective
Learn to parse JSON responses from APIs and extract specific data from complex nested structures using a simple React app.

## 🔧 What You'll Build
A simple JSON data explorer that:
- Fetches data from real APIs (D&D monsters, weather, etc.)
- Parses JSON responses automatically 
- Extracts and displays specific information from nested objects
- Shows both raw JSON and formatted user-friendly data

## 📋 Prerequisites
- Basic understanding of JavaScript objects and arrays
- Familiarity with React basics (components, state)
- Understanding of what APIs and JSON are

## ⏱️ Estimated Time
30-45 minutes

## � Getting Started

### Setup Instructions
1. Navigate to the `Starter` folder
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Open your browser to the URL shown (usually http://localhost:5173)
5. Open browser Developer Tools (F12) to see console output

## 📝 Instructions

### Step 1: Understand the Existing Code
**Goal:** Explore how the app currently fetches and displays raw JSON data.

**Your Task:**
- [ ] Look at the existing `App.tsx` - notice how it fetches data
- [ ] Try the default API (D&D Dragon) and examine the JSON structure
- [ ] Check the browser console to see the logged data
- [ ] Try different APIs like `https://jsonplaceholder.typicode.com/users/1`

**Expected Result:** You understand how fetch() gets JSON and displays it

**Hint:** The raw JSON is shown in the gray box - this is what we'll parse and format

### Step 2: Extract Basic Information
**Goal:** Create a function to extract specific data from the monster JSON.

**Your Task:**
- [ ] Find the `// TODO: Add data extraction logic here` comment in `App.tsx`
- [ ] Create a function called `extractMonsterInfo()` that takes the data
- [ ] Extract the monster's name, hit points, and armor class
- [ ] Display this info in a user-friendly format above the raw JSON

**Code Location:** Look for the TODO comment in the JSX return section

**Expected Result:** You should see "Name: Ancient Black Dragon, HP: 367, AC: 22" above the JSON

**Hint:** Use `data.name`, `data.hit_points`, and `data.armor_class` to access the properties

### Step 3: Handle Arrays and Nested Objects  
**Goal:** Extract more complex data like damage resistances and special abilities.

**Your Task:**
- [ ] Extract the `damage_resistances` array and display as a comma-separated list
- [ ] Get the first special ability's name and description
- [ ] Handle cases where these might not exist (use conditional rendering)

**Expected Result:** Display resistances like "acid, lightning, thunder" and first ability info

**Hint:** Use `data.damage_resistances?.join(', ')` and `data.special_abilities?.[0]`

### Step 4: Create a User Information Parser
**Goal:** Parse user data from a different API to practice with different JSON structures.

**Your Task:**
- [ ] Add a button to fetch from `https://jsonplaceholder.typicode.com/users/1`
- [ ] Create a `extractUserInfo()` function for user data
- [ ] Extract name, email, city, and company name
- [ ] Display in a clean format

**Expected Result:** Show "Leanne Graham from Gwenborough works at Romaguera-Crona"

**Hint:** User data has nested objects like `address.city` and `company.name`

### Step 5: Add Error Handling for Missing Data
**Goal:** Make your code robust by handling missing or unexpected data.

**Your Task:**
- [ ] Add checks for when expected data doesn't exist
- [ ] Display "Unknown" or default values when data is missing
- [ ] Test with a broken URL to see how errors are handled

**Expected Result:** App doesn't crash when data is missing or malformed

**Hint:** Use the optional chaining operator `?.` and logical OR `||` for defaults

## ✅ Testing Your Work

### Quick Checks:
- [ ] Default D&D API shows formatted monster info above raw JSON
- [ ] User API button works and shows formatted user info  
- [ ] App handles missing data gracefully (no crashes)
- [ ] Console shows logged data for debugging
- [ ] Raw JSON is still visible for comparison

### Expected Output:
Your app should display:
- **Monster Info:** "Ancient Black Dragon - HP: 367, AC: 22, Resistances: acid, lightning, thunder"
- **User Info:** "Leanne Graham from Gwenborough works at Romaguera-Crona"  
- **Raw JSON:** Still visible in the gray box for reference

### Troubleshooting:

**Problem:** "Cannot read property of undefined" errors
**Solution:** Use optional chaining (`?.`) when accessing nested properties

**Problem:** Data doesn't appear after clicking fetch
**Solution:** Check browser console for errors and verify the API URL is correct

**Problem:** App crashes when switching between APIs  
**Solution:** Add conditional checks before trying to access data properties

## 🚀 Extension Challenges (Optional)

### Challenge 1: Add More APIs
**Difficulty:** ⭐ (Easy)
**Goal:** Add preset buttons for different APIs (weather, jokes, quotes)
**Hint:** Create an array of API objects with name and URL properties

## 🔍 What's Next?

After mastering JSON parsing basics, you're ready for:
- **Express.js APIs**: Building your own APIs that return JSON
- **Database Integration**: Converting database results to JSON responses  
- **Advanced State Management**: Using React hooks for complex data flows
- **TypeScript**: Adding type safety to your JSON parsing

Great job learning the fundamentals of JSON parsing! This is a core skill for any web developer.

## 📚 Additional Resources

- [JSON.parse() Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
- [JavaScript Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- [React State Hook](https://react.dev/reference/react/useState)
- [D&D 5e API Documentation](https://www.dnd5eapi.co/docs/)

## 🚀 Getting Started

### Setup Instructions
1. Navigate to the `Starter` folder
2. Run `npm install` to install TypeScript, Vite, and dependencies
3. Run `npm run dev` to start the Vite development server with TypeScript compilation
4. Open your browser to the URL shown (usually http://localhost:5173)
5. Open browser Developer Tools (F12) to see console output and TypeScript compilation

### Project Structure
```
08_Lab_JSON/
├── Starter/
│   ├── README.md           # This file
│   ├── package.json        # Vite + TypeScript configuration
│   ├── tsconfig.json       # TypeScript configuration
│   ├── index.html          # Main HTML file
│   ├── src/
│   │   ├── main.ts         # TypeScript entry point (TODO items)
│   │   ├── weather.ts      # Weather API functions with types (TODO items)
│   │   ├── types.ts        # TypeScript interfaces and types (TODO items)
│   │   ├── utils.ts        # Utility functions with TypeScript (TODO items)
│   │   └── style.css       # Styling
│   └── vite.config.ts      # Vite configuration
└── Solution/              # Complete working TypeScript version
```

## 📝 Instructions

### Step 1: Define TypeScript Interfaces for Weather Data
**Goal:** Create proper TypeScript interfaces to ensure type safety for weather API responses.

**Your Task:**
- [ ] Open `src/types.ts` and examine the sample JSON response structure
- [ ] Define `WeatherResponse` interface for the main API response
- [ ] Create `CurrentWeather` interface for current weather data
- [ ] Define `ForecastDay` interface for forecast entries
- [ ] Add proper optional properties using `?` for data that might be missing

**Code Location:** `src/types.ts` - Complete the interface definitions

**Expected Result:** TypeScript compiler should validate your interface structure with no errors

**Hint:** Use `number`, `string`, `array`, and optional properties (`property?: type`) for proper typing

### Step 2: Implement Type-Safe JSON Parsing Function
**Goal:** Create a function that safely parses and validates API responses with TypeScript.

**Your Task:**
- [ ] Complete the `parseWeatherData()` function in `src/weather.ts`
- [ ] Use type guards to validate the incoming JSON structure
- [ ] Extract current temperature, condition, and humidity with proper typing
- [ ] Extract today's high/low temperatures using TypeScript null checking
- [ ] Return a typed object that matches your interfaces

**Code Location:** `src/weather.ts` function `parseWeatherData()`

**Expected Result:** Console should show "Weather data parsed successfully" with properly typed data object

**Hint:** Use type assertions (`as WeatherResponse`) and optional chaining (`?.`) for safe property access

### Step 3: Add TypeScript Error Handling and Custom Error Types
**Goal:** Create custom error classes and robust error handling with TypeScript.

**Your Task:**
- [ ] Define custom error classes in `src/types.ts` (WeatherApiError, ParseError, etc.)
- [ ] Add try/catch blocks with proper error typing in `src/weather.ts`
- [ ] Handle cases where API returns error responses with typed error objects
- [ ] Create user-friendly error messages with TypeScript string unions
- [ ] Test with invalid city names and network failures

**Code Location:** `src/weather.ts` function `fetchWeatherData()` and `src/types.ts` error types

**Expected Result:** App gracefully handles errors without TypeScript compilation errors

**Hint:** Use `instanceof` for error type checking and union types for error message categories

### Step 4: Display Formatted Data with TypeScript DOM Manipulation
**Goal:** Take parsed, typed JSON data and display it in the UI with full type safety.

**Your Task:**
- [ ] Complete the `displayWeatherData()` function in `src/main.ts`
- [ ] Use TypeScript DOM typing for element selection and manipulation
- [ ] Show current temperature and conditions with proper type checking
- [ ] Display forecast information using typed array methods
- [ ] Format data for readability using typed utility functions

**Code Location:** `src/main.ts` function `displayWeatherData()`

**Expected Result:** Weather information appears on the webpage with no TypeScript errors

**Hint:** Use `HTMLElement` types and null checking for DOM elements

### Step 5: Implement Type-Safe Search Functionality
**Goal:** Create search functionality with full TypeScript validation and error handling.

**Your Task:**
- [ ] Complete the `handleCitySearch()` function in `src/main.ts`
- [ ] Add TypeScript event typing for form submissions
- [ ] Implement input validation with TypeScript guards
- [ ] Call the weather API with proper async/await typing
- [ ] Update the display with strongly typed data
- [ ] Show loading states using TypeScript boolean flags

**Code Location:** `src/main.ts` function `handleCitySearch()`

**Expected Result:** Users can search for any city with full TypeScript type safety and validation

**Hint:** Use `Event` types, `HTMLFormElement` casting, and proper `Promise` typing

## ✅ Testing Your Work

### Quick Checks:
- [ ] App compiles without TypeScript errors (`npm run build`)
- [ ] Default city weather data displays correctly with type safety
- [ ] Temperature shows with proper units and TypeScript formatting
- [ ] Search functionality works with TypeScript validation
- [ ] Error messages appear for invalid city names with typed errors
- [ ] Loading states are visible with proper TypeScript boolean handling
- [ ] All interfaces are properly used throughout the codebase

### Expected Output:
Your TypeScript app should display:
- Current temperature and weather condition with type safety
- Today's high/low temperatures using typed properties
- 3-day forecast with properly typed forecast data
- Search box that accepts city names with TypeScript validation
- Appropriate error messages with custom error types

### Troubleshooting:

**Problem:** TypeScript compilation errors about missing properties
**Solution:** Check your interface definitions and use optional properties (`?`) for data that might be undefined

**Problem:** Type errors with DOM manipulation
**Solution:** Use proper TypeScript DOM types like `HTMLElement | null` and null checking

**Problem:** API calls fail with TypeScript async errors
**Solution:** Ensure proper `Promise` typing and async/await syntax with error handling

**Problem:** Data doesn't update after search with type errors
**Solution:** Verify your typed interfaces match the actual API response structure

## 🚀 Extension Challenges (Optional)

### Challenge 1: Add Weather Icons with TypeScript Enums
**Difficulty:** ⭐⭐ (Medium)
**Goal:** Create TypeScript enums for weather conditions and icon mapping
**Hint:** Use `enum WeatherCondition` and type-safe icon mapping functions

### Challenge 2: Implement Generic API Response Handler
**Difficulty:** ⭐⭐⭐ (Hard)
**Goal:** Create a generic TypeScript function that can handle different API response types
**Hint:** Use TypeScript generics `<T>` and type guards for validation

### Challenge 3: Add TypeScript Decorator for Caching
**Difficulty:** ⭐⭐⭐ (Hard)
**Goal:** Implement caching using TypeScript decorators for API responses
**Hint:** Use method decorators and Map typing for cache storage

### Challenge 4: Local Storage with TypeScript Validation
**Difficulty:** ⭐⭐ (Medium)
**Goal:** Add recent searches with full TypeScript validation
**Hint:** Create typed interfaces for localStorage data and validation functions

### Challenge 5: Real-time Updates with TypeScript Observables
**Difficulty:** ⭐⭐⭐ (Hard)
**Goal:** Implement auto-refresh using TypeScript and observables pattern
**Hint:** Use typed intervals and observable patterns with proper cleanup

## 🔍 What's Next?

After mastering TypeScript JSON manipulation, you're ready for:
- **Express.js with TypeScript**: Building type-safe server-side APIs
- **TypeScript Request/Response**: Handling typed JSON data in Express routes
- **Database Integration**: Using TypeScript with ORMs like Prisma or TypeORM
- **API Design**: Creating well-structured, typed JSON APIs for frontend consumption

Great job working with TypeScript and real-world JSON data! This type safety will prevent many runtime errors in production applications.

## 📚 Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Official TypeScript documentation
- [Vite TypeScript Guide](https://vitejs.dev/guide/features.html#typescript) - Using TypeScript with Vite
- [TypeScript DOM Types](https://github.com/microsoft/TypeScript/lib/lib.dom.d.ts) - DOM typing reference
- [JSON Schema TypeScript](https://github.com/ThomasAribart/json-schema-to-ts) - Generate types from JSON schemas
- [TypeScript Error Handling](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) - Advanced error handling patterns

## 📝 Instructions

### Step 1: Understanding the JSON Structure
**Goal:** Examine the weather API response structure and identify key data points.

**Your Task:**
- [ ] Open `src/weather.js` and examine the sample JSON response
- [ ] Identify the current temperature location in the JSON
- [ ] Find where the weather description is stored
- [ ] Locate the forecast array structure

**Code Location:** `src/weather.js` lines 5-25

**Expected Result:** Understanding of how to navigate the nested JSON structure

**Hint:** Look for patterns like `data.current.temperature` and `data.forecast[0].weather`

### Step 2: Implement JSON Parsing Function
**Goal:** Create a function that extracts specific data from the API response.

**Your Task:**
- [ ] Complete the `parseWeatherData()` function in `src/weather.js`
- [ ] Extract current temperature, condition, and humidity
- [ ] Extract today's high/low temperatures
- [ ] Return a clean object with only the needed data

**Code Location:** `src/weather.js` function `parseWeatherData()`

**Expected Result:** Console should show "Weather data parsed successfully" with clean data object

**Hint:** Use dot notation and optional chaining (`?.`) for safe property access

### Step 3: Handle API Errors and Invalid JSON
**Goal:** Add robust error handling for API failures and malformed JSON.

**Your Task:**
- [ ] Add try/catch blocks around JSON parsing in `src/weather.js`
- [ ] Handle cases where API returns error responses
- [ ] Create user-friendly error messages
- [ ] Test with invalid city names

**Code Location:** `src/weather.js` function `fetchWeatherData()`

**Expected Result:** App gracefully handles errors without crashing

**Hint:** Check for `response.ok` before parsing JSON and always use try/catch with `JSON.parse()`

### Step 4: Display Formatted Data in the UI
**Goal:** Take parsed JSON data and display it in a user-friendly format.

**Your Task:**
- [ ] Complete the `displayWeatherData()` function in `src/main.js`
- [ ] Show current temperature and conditions
- [ ] Display forecast information
- [ ] Format data for readability (e.g., "72°F" instead of "72")

**Code Location:** `src/main.js` function `displayWeatherData()`

**Expected Result:** Weather information appears on the webpage in an attractive format

**Hint:** Use template literals for string formatting and consider adding weather icons

### Step 5: Implement Search Functionality
**Goal:** Allow users to search for different cities and update the display.

**Your Task:**
- [ ] Complete the `handleCitySearch()` function in `src/main.js`
- [ ] Get user input from the search form
- [ ] Call the weather API with the new city
- [ ] Update the display with new data
- [ ] Show loading states during API calls

**Code Location:** `src/main.js` function `handleCitySearch()`

**Expected Result:** Users can search for any city and see updated weather data

**Hint:** Remember to show loading indicators and handle empty/invalid inputs

## ✅ Testing Your Work

### Quick Checks:
- [ ] App loads without console errors
- [ ] Default city weather data displays correctly
- [ ] Temperature shows with proper units (°F or °C)
- [ ] Search functionality works for different cities
- [ ] Error messages appear for invalid city names
- [ ] Loading states are visible during API calls

### Expected Output:
Your app should display:
- Current temperature and weather condition
- Today's high/low temperatures
- 3-day forecast with conditions
- Search box that accepts city names
- Appropriate error messages for failed requests

### Troubleshooting:

**Problem:** "Cannot read property of undefined" errors
**Solution:** Check your JSON path navigation - use optional chaining (`?.`) and verify the API response structure

**Problem:** API calls fail with CORS errors
**Solution:** Make sure you're using the provided weather API endpoint that supports CORS

**Problem:** Data doesn't update after search
**Solution:** Verify you're calling `displayWeatherData()` after successfully fetching new data

**Problem:** App shows "undefined°F" or similar
**Solution:** Check that your data parsing function handles missing values with fallbacks

## 🚀 Extension Challenges (Optional)

### Challenge 1: Add Weather Icons
**Difficulty:** ⭐⭐ (Medium)
**Goal:** Display appropriate weather icons based on conditions
**Hint:** Use the `weather.main` property to map to icon classes or image files

### Challenge 2: 7-Day Forecast
**Difficulty:** ⭐⭐ (Medium)
**Goal:** Extend the forecast to show a full week instead of 3 days
**Hint:** Modify the JSON parsing to handle more forecast entries and update the UI layout

### Challenge 3: Weather Map Integration
**Difficulty:** ⭐⭐⭐ (Hard)
**Goal:** Add a map showing the searched location
**Hint:** Use the coordinates from the weather API response with a mapping service

### Challenge 4: Local Storage for Recent Searches
**Difficulty:** ⭐⭐ (Medium)
**Goal:** Remember user's recent city searches
**Hint:** Use `localStorage` to save/retrieve JSON arrays of recent searches

### Challenge 5: Real-time Updates
**Difficulty:** ⭐⭐⭐ (Hard)
**Goal:** Automatically refresh weather data every 10 minutes
**Hint:** Use `setInterval()` and be mindful of API rate limits

## 🔍 What's Next?

After mastering JSON manipulation in this weather app, you're ready for:
- **Express.js Fundamentals**: Building server-side APIs that return JSON
- **Request Body Parsing**: Handling JSON data sent to your server
- **Database Integration**: Converting database results to JSON responses
- **API Design**: Creating well-structured JSON APIs for frontend consumption

Great job working with real-world JSON data! This skill is essential for modern web development where APIs are everywhere.

## 📚 Additional Resources

- [JSON.parse() Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
- [Working with APIs Guide](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction)
- [Weather API Documentation](https://openweathermap.org/api) (if using OpenWeatherMap)
- [JavaScript Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)