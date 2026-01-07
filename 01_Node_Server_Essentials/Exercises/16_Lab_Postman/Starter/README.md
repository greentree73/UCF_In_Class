# 📮 Lab: Create a Postman Collection for Express API

## 🎯 Lab Objective

In this lab, you will use Postman to create a comprehensive collection for testing the Express API server. You'll organize requests into logical groups and test all CRUD operations for users and posts.

## 📋 Prerequisites

- ✅ Postman installed and account created
- ✅ Understanding of HTTP methods (GET, POST, PUT, DELETE)
- ✅ Basic knowledge of JSON format
- ✅ Completed previous Express routing exercises

## 🚀 Getting Started

### Step 1: Start the Express Server

```bash
# Navigate to the project directory
cd /path/to/16_Lab_Postman/Starter

# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

**Verify the server is running:**
- Open browser to `http://localhost:3000`
- You should see the API home page with available endpoints

### Step 2: Open Postman

1. Launch Postman application
2. Sign in to your account
3. Create a new workspace (optional but recommended)

## 📁 Task 1: Create Your Collection

### Create New Collection

1. Click **"New"** → **"Collection"**
2. Name it: **"Express API - Users & Posts"**
3. Add description: **"Complete CRUD operations for users and posts API"**
4. Click **"Create"**

### Set Up Environment Variables

1. Click the **Environment** dropdown (top-right)
2. Select **"Manage Environments"**
3. Click **"Add"**
4. Environment name: **"Local Development"**
5. Add variable:
   - **Variable:** `base_url`
   - **Initial Value:** `http://localhost:3000`
   - **Current Value:** `http://localhost:3000`
6. Click **"Add"** then **"Close"**
7. Select **"Local Development"** from environment dropdown

## 📂 Task 2: Organize with Folders

Create the following folder structure in your collection:

### Create Folders

1. Right-click your collection → **"Add Folder"**
2. Create these folders:
   - **"1. Basic Routes"**
   - **"2. User Management"** 
   - **"3. Posts CRUD"**
   - **"4. Advanced Queries"**
   - **"5. Error Testing"**

## 🔧 Task 3: Build Requests by Category

### Folder 1: Basic Routes

Create these requests in the **"1. Basic Routes"** folder:

#### Request 1: Home Page
- **Name:** `Get Home Page`
- **Method:** `GET`
- **URL:** `{{base_url}}/`
- **Description:** `Test the home route and see available endpoints`

#### Request 2: About Page
- **Name:** `Get About Info`
- **Method:** `GET`
- **URL:** `{{base_url}}/about`
- **Description:** `Get project information and routing examples`

### Folder 2: User Management

Create these requests in the **"2. User Management"** folder:

#### Request 1: Get All Users
- **Name:** `Get All Users`
- **Method:** `GET`
- **URL:** `{{base_url}}/users`
- **Description:** `Retrieve all users with default pagination`

#### Request 2: Get Users with Pagination
- **Name:** `Get Users (Paginated)`
- **Method:** `GET`
- **URL:** `{{base_url}}/users?page=1&limit=3&sort=name`
- **Description:** `Test pagination and sorting parameters`

#### Request 3: Get Specific User
- **Name:** `Get User by ID`
- **Method:** `GET`
- **URL:** `{{base_url}}/users/1`
- **Description:** `Retrieve a specific user by their ID`

#### Request 4: Search Users
- **Name:** `Search Users`
- **Method:** `GET`
- **URL:** `{{base_url}}/search?q=alice&limit=5`
- **Description:** `Search users by name or email`

### Folder 3: Posts CRUD

Create these requests in the **"3. Posts CRUD"** folder:

#### Request 1: Get All Posts
- **Name:** `Get All Posts`
- **Method:** `GET`
- **URL:** `{{base_url}}/posts`
- **Description:** `Retrieve all posts with default pagination`

#### Request 2: Get Posts with Pagination
- **Name:** `Get Posts (Paginated)`
- **Method:** `GET`
- **URL:** `{{base_url}}/posts?page=1&limit=2`
- **Description:** `Test posts pagination`

#### Request 3: Get Posts by User
- **Name:** `Get Posts by User`
- **Method:** `GET`
- **URL:** `{{base_url}}/posts?userId=1`
- **Description:** `Filter posts by specific user ID`

#### Request 4: Get Specific Post
- **Name:** `Get Post by ID`
- **Method:** `GET`
- **URL:** `{{base_url}}/posts/1`
- **Description:** `Retrieve a specific post with author information`

#### Request 5: Create New Post
- **Name:** `Create Post`
- **Method:** `POST`
- **URL:** `{{base_url}}/posts`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "userId": 1,
  "title": "My Test Post",
  "content": "This is a test post created via Postman. It demonstrates the POST endpoint for creating new blog posts in our Express API."
}
```
- **Description:** `Create a new blog post`

#### Request 6: Update Post
- **Name:** `Update Post`
- **Method:** `PUT`
- **URL:** `{{base_url}}/posts/1`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "title": "Updated Post Title",
  "content": "This post content has been updated using the PUT endpoint."
}
```
- **Description:** `Update an existing post (partial update)`

#### Request 7: Delete Post
- **Name:** `Delete Post`
- **Method:** `DELETE`
- **URL:** `{{base_url}}/posts/4`
- **Description:** `Delete a post by ID`

### Folder 4: Advanced Queries

Create these requests in the **"4. Advanced Queries"** folder:

#### Request 1: Search with Multiple Filters
- **Name:** `Advanced User Search`
- **Method:** `GET`
- **URL:** `{{base_url}}/search?q=a&city=New York&sort=age&limit=5`
- **Description:** `Search users with multiple filter criteria`

#### Request 2: File Path Example
- **Name:** `File Route Example`
- **Method:** `GET`
- **URL:** `{{base_url}}/files/documents/report.pdf`
- **Description:** `Test wildcard route handling`

#### Request 3: Optional Parameters
- **Name:** `Posts by Year/Month`
- **Method:** `GET`
- **URL:** `{{base_url}}/posts/2024/03`
- **Description:** `Test optional parameter routes`

### Folder 5: Error Testing

Create these requests in the **"5. Error Testing"** folder:

#### Request 1: Invalid Route
- **Name:** `Test 404 - Invalid Route`
- **Method:** `GET`
- **URL:** `{{base_url}}/invalid-endpoint`
- **Description:** `Test 404 error handling for non-existent routes`

#### Request 2: Invalid User ID
- **Name:** `Test 404 - Invalid User`
- **Method:** `GET`
- **URL:** `{{base_url}}/users/999`
- **Description:** `Test error handling for non-existent user`

#### Request 3: Invalid Post ID
- **Name:** `Test 404 - Invalid Post`
- **Method:** `GET`
- **URL:** `{{base_url}}/posts/999`
- **Description:** `Test error handling for non-existent post`

#### Request 4: Bad Request Data
- **Name:** `Test 400 - Invalid Post Data`
- **Method:** `POST`
- **URL:** `{{base_url}}/posts`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "title": "",
  "content": ""
}
```
- **Description:** `Test validation error handling with missing required fields`

#### Request 5: Invalid Parameter Type
- **Name:** `Test 400 - Invalid ID Format`
- **Method:** `GET`
- **URL:** `{{base_url}}/users/not-a-number`
- **Description:** `Test error handling for invalid parameter types`

## ✅ Task 4: Test Your Collection

### Testing Workflow

Follow this sequence to test your API:

1. **Start with Basic Routes**
   - Test Home Page
   - Test About Page

2. **User Management**
   - Get All Users
   - Get Users (Paginated) 
   - Get User by ID
   - Search Users

3. **Posts CRUD (Complete Flow)**
   - Get All Posts (note existing posts)
   - Create Post (save the returned ID)
   - Get Post by ID (use the new ID)
   - Update Post (use the same ID)
   - Get Post by ID (verify update)
   - Delete Post (use the same ID)
   - Get Post by ID (verify deletion - should get 404)

4. **Advanced Queries**
   - Test each advanced query
   - Experiment with different parameters

5. **Error Testing**
   - Test each error scenario
   - Verify appropriate status codes and error messages

### Validation Checklist

For each request, verify:
- ✅ **Status Code** - 200 OK, 201 Created, 404 Not Found, etc.
- ✅ **Response Time** - Should be under 500ms for local testing
- ✅ **Response Format** - Valid JSON structure
- ✅ **Data Accuracy** - Correct data returned
- ✅ **Error Messages** - Clear and helpful error responses

## 📊 Task 5: Document Your Results

### Add Request Descriptions

For each request, add detailed descriptions including:
- Purpose of the request
- Expected response format
- Required parameters
- Example use cases

### Save Response Examples

1. Send each request successfully
2. Right-click the response
3. Select **"Save Response"** → **"Save as Example"**
4. Add descriptive name for the example

## 🏆 Challenge Extensions

### Advanced Tasks (Optional)

1. **Environment Switching**
   - Create a "Production" environment
   - Set `base_url` to a different server
   - Practice switching between environments

2. **Request Chaining**
   - Create a post using POST
   - Use the returned ID in subsequent GET/PUT/DELETE requests
   - Practice dynamic variable usage

3. **Batch Testing**
   - Use Collection Runner to run all requests
   - Analyze results and timing
   - Identify any failing requests

4. **Team Collaboration**
   - Export your collection
   - Share with a classmate
   - Import their collection and test

## 📝 Deliverables

### What to Submit

1. **Postman Collection Export**
   - Export your collection as JSON
   - Include all folders and requests
   - Name file: `express-api-collection.json`

2. **Testing Report** (Create a simple text document)
   - List all endpoints tested
   - Note any issues encountered
   - Suggest improvements for the API
   - Include screenshots of successful requests

3. **Reflection Questions** (Answer in your report)
   - Which HTTP methods did you use and why?
   - What was the most challenging part of creating the collection?
   - How does Postman help with API development and testing?
   - What additional features would you add to this API?

## 🎯 Learning Outcomes

By completing this lab, you will:
- ✅ Understand how to organize API requests in Postman collections
- ✅ Practice all CRUD operations (Create, Read, Update, Delete)
- ✅ Learn to test different HTTP status codes and error scenarios  
- ✅ Experience working with query parameters and request bodies
- ✅ Develop skills for API testing and validation
- ✅ Understand the importance of proper API documentation

## 🆘 Troubleshooting

### Common Issues

**Server not responding:**
- Verify server is running with `npm run dev`
- Check the correct port (3000)
- Ensure no other services are using port 3000

**404 Errors:**
- Double-check URL paths for typos
- Verify the route exists in the server code
- Use environment variables instead of hardcoded URLs

**JSON Parsing Errors:**
- Ensure `Content-Type: application/json` header is set
- Validate JSON syntax in request bodies
- Check for trailing commas or syntax errors

**Variable Issues:**
- Verify environment is selected
- Check variable names match exactly (`{{base_url}}`)
- Ensure variables are saved in the correct environment

---

**Pro Tip:** Save your work frequently and use descriptive names for all requests. Good organization now will save time later when working on later projects! 🚀