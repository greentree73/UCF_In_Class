# Exploring API Calls



## 🎯 Objective

Explore how to examine network requests using browser developer tools. You'll learn to inspect API data and understand the request-response cycle. You'll learn to inspect API data.

------

## 📋 Instructions## 



###  Run the Project

1. Open `index.html` in your web browser (double-click the file)This directory contains a pre-built TypeScript project that fetches data from an API.

2. Open Developer Tools (F12 or right-click → Inspect)

3. Go to the **Network** tab in Developer Tools1. Install dependencies:

4. Click the "Fetch Post Data" button on the webpage   ```bash

5. Watch both:   npm install

   - The formatted output on the webpage   ```

   - The network request details in the Developer Tools

2. Build the project:

### Option B: Run TypeScript Project   ```bash

1. Install dependencies:   npm run build

   ```bash   ```

   npm install

   ```3. Start the project:

   ```bash

2. Build the project:   npm start

   ```bash   ```

   npm run build

   ```4. **Observe the console output** - You should see API data being fetched and displayed



3. Start the project:---

   ```bash

   npm start## 🔍 Browser Developer Tools Exercise

   ```

### Part A: Examine Console Output

4. **Observe the console output** - You should see API data being fetched and displayed1. Open `src/main.ts` in your code editor

2. Look at the code structure and identify:

---   - The API endpoint being called

   - The TypeScript interface defining the data structure

## 🔍 Browser Developer Tools Exercise   - How the response is handled and displayed



### Part A: Examine the Web Interface### Part B: Network Tab Investigation

1. Look at the webpage interface and understand:1. Open your browser and navigate to [JSONPlaceholder website](https://jsonplaceholder.typicode.com/)

   - The clean, user-friendly display of API data2. Open Developer Tools (F12 or right-click → Inspect)

   - How the button triggers the API call3. Go to the **Network** tab

   - The real-time logging of the response4. Click on one of the example API links on the website (like "posts/1")

5. In the Network tab, find the API request and examine:

### Part B: Network Tab Investigation   - **Request URL**: What endpoint was called?

With the webpage open and Developer Tools → Network tab visible:   - **Request Method**: GET, POST, etc.

   - **Status Code**: Was it successful (200)?

1. **Clear the Network tab** (click the clear button or refresh)   - **Response Headers**: What content-type was returned?

2. **Click "Fetch Post Data"** and immediately observe:   - **Response Data**: Click on "Response" tab to see the JSON data

   - **New request appears** in the Network tab

   - **Request details**:### Part C: Console Comparison

     - Name: `1` (the endpoint)1. Compare the data you see in the browser's Network tab with the output from running our TypeScript project

     - Status: `200` (success)2. Notice how our code processes and displays the same data structure

     - Type: `fetch`

     - Size: Response size in bytes---

     - Time: How long the request took

## 🔍 Discussion Questions

3. **Click on the network request** to examine:After completing the lab, be ready to discuss:

   - **Headers tab**: Request URL, method (GET), status code

   - **Response tab**: Raw JSON data from the API1. **What information did you see in the Network tab that wasn't visible in our console output?**

   - **Preview tab**: Formatted view of the JSON2. **How does the raw JSON response compare to how our TypeScript code displays it?**

   - **Timing tab**: Breakdown of request phases3. **What happens in the Network tab when you visit an invalid API endpoint?**

4. **What's the difference between viewing API data in the browser vs. in a Node.js application?**

### Part C: Compare Output Formats

1. **Raw API Response** (Network tab → Response): See the original JSON---

2. **Formatted Display** (webpage): See how JavaScript processes and displays the data

3. **TypeScript Code** (`src/main.ts`): See how the same logic works in Node.js## � Optional Exploration

If you finish early, try these investigations:

---

1. **Test Different Endpoints**: 

## 🔍 Discussion Questions   - Visit `https://jsonplaceholder.typicode.com/posts` (all posts)

After completing the lab, be ready to discuss:   - Visit `https://jsonplaceholder.typicode.com/users/1` (single user)

   - Compare the data structures

1. **What differences do you notice between the raw JSON in the Network tab and the formatted display on the webpage?**

2. **How long did the API request take? (Check the Network tab timing)**2. **Social Media APIs**:

3. **What happens in the Network tab when you click the button multiple times quickly?**   - Go to Twitter, Instagram, or Facebook

4. **Why might you want to see both the raw API response AND a formatted display?**   - Open Network tab and scroll through your feed

   - Look for API calls (usually contain `/api/` or return JSON)

---   - Examine what data these real applications are fetching



## 🚀 Optional Exploration3. **Error Handling**:

If you finish early, try these investigations:   - Try visiting `https://jsonplaceholder.typicode.com/posts/999`

   - Look at the Network tab - what status code do you get?

1. **Modify the HTML**:   - How does this compare to our TypeScript error handling?

   - Change the API endpoint in the JavaScript (try `/posts/2` or `/users/1`)

   - Run the page again and compare the different data structures---



2. **Test Error Handling**:## ✅ Success Criteria

   - Edit the HTML file and change the URL to an invalid endpoint- [ ] Successfully ran the TypeScript project and saw console output

   - See how both the webpage and Network tab handle the error- [ ] Used browser Developer Tools to examine network requests

- [ ] Identified the structure of API responses in the Network tab

3. **Real-World APIs**:- [ ] Can explain the difference between raw API responses and processed data

   - Visit social media sites with Network tab open- [ ] Understands how to use Network tab to debug API issues
   - Look for API calls and compare their structure to our simple example

4. **Performance Analysis**:
   - Use the Network tab to measure how fast different APIs respond
   - Compare JSONPlaceholder with other public APIs

---

## ✅ Success Criteria
- [ ] Successfully opened the HTML page and saw the interface
- [ ] Used Developer Tools Network tab to examine API requests
- [ ] Compared raw JSON responses with formatted displays
- [ ] Can explain what information is available in the Network tab
- [ ] Understands the relationship between frontend display and API data