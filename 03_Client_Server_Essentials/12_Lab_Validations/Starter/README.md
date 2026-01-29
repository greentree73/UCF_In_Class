# Lab: Testing Validations with Postman

## Objective
In this lab, you will create a **Postman collection** to test all the validations in a pre-built User API. You will NOT write any code - instead, you'll learn how to systematically test validation rules by creating requests that both pass and fail validations.

## Learning Goals
- Understand how to test API validations using Postman
- Learn to create comprehensive test cases for success and failure scenarios
- Practice reading validation error responses
- Build a reusable Postman collection for API testing
- Understand the difference between validation errors and other types of errors

## Scenario
A development team has built a User Management API with comprehensive validations. Your job as a QA tester is to verify that all validations work correctly by creating a Postman collection that tests every validation rule.

## Prerequisites
- Postman installed on your computer ([Download here](https://www.postman.com/downloads/))
- Basic understanding of HTTP methods (GET, POST, PUT)
- Familiarity with JSON format

## Setup

1. **Navigate to the Starter folder:**
   ```bash
   cd 12_Lab_Validations/Starter
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```
   
   The server should start on `http://localhost:4000`

5. **Verify the server is running:**
   - Open Postman
   - Create a GET request to `http://localhost:4000/api/`
   - You should see: `{"status":"ok","message":"Validations Demo API"}`

## Understanding the Validations

Before creating tests, review the validation rules in the User model:

### Username Validations
- ✅ Required (cannot be null or empty)
- ✅ Must be 3-20 characters long
- ✅ Must be alphanumeric only (letters and numbers)

### Email Validations
- ✅ Required (cannot be null or empty)
- ✅ Must be a valid email format
- ✅ Must be unique (no duplicate emails)

### Age Validations
- ✅ Required (cannot be null)
- ✅ Must be a whole number (integer)
- ✅ Must be positive (0 or greater)
- ✅ Must be realistic (max 120)
- ✅ Must be at least 18 (custom business rule)

### Password Validations
- ✅ Required (cannot be null or empty)
- ✅ Must be at least 8 characters
- ✅ Must contain at least one uppercase letter
- ✅ Must contain at least one lowercase letter
- ✅ Must contain at least one number

### Bio Validations
- ✅ Optional (can be omitted)
- ✅ Maximum 500 characters if provided

### Role Validations
- ✅ Required
- ✅ Must be one of: "user", "admin", or "moderator"
- ✅ Defaults to "user" if not provided

## Your Task: Create a Postman Collection

### Step 1: Create a New Collection

1. Open Postman
2. Click "Collections" in the left sidebar
3. Click "New Collection" or the "+" button
4. Name it: **"User Validation Tests"**
5. Add a description: "Testing all validation rules for the User API"

### Step 2: Set Up Collection Variables

1. Click on your collection
2. Go to the "Variables" tab
3. Add a variable:
   - Variable: `baseUrl`
   - Initial Value: `http://localhost:4000/api`
   - Current Value: `http://localhost:4000/api`

Now you can use `{{baseUrl}}` in all your requests!

### Step 3: Create Request Folders

Organize your tests into folders within the collection:

1. **01 - Successful Requests** (tests that should work)
2. **02 - Username Validation Failures** (tests that should fail)
3. **03 - Email Validation Failures**
4. **04 - Age Validation Failures**
5. **05 - Password Validation Failures**
6. **06 - Bio Validation Failures**
7. **07 - Role Validation Failures**
8. **08 - Multiple Validation Failures**

### Step 4: Create Test Requests

For each folder, create the requests specified below. Each request should include:
- Request name
- HTTP method
- URL
- Body (for POST/PUT requests)
- Expected response status code (in the request description)

---

## Folder 1: Successful Requests

These requests should all succeed (return 201 Created).

### Request 1: Create Valid User
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body (JSON):**
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "age": 25,
    "password": "SecurePass123",
    "role": "user"
  }
  ```
- **Expected:** 201 Created
- **Save the user ID from the response for later tests!**

### Request 2: Create Admin User with Bio
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body (JSON):**
  ```json
  {
    "username": "adminuser",
    "email": "admin@example.com",
    "age": 30,
    "password": "AdminPass456",
    "bio": "I am an administrator of this system",
    "role": "admin"
  }
  ```
- **Expected:** 201 Created

### Request 3: Create User with Minimal Info (Bio Optional)
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body (JSON):**
  ```json
  {
    "username": "janedoe",
    "email": "jane@example.com",
    "age": 22,
    "password": "MyPassword789"
  }
  ```
- **Expected:** 201 Created (role should default to "user")

### Request 4: Get All Users
- **Method:** GET
- **URL:** `{{baseUrl}}/users`
- **Expected:** 200 OK with array of users

### Request 5: Get User by ID
- **Method:** GET
- **URL:** `{{baseUrl}}/users/1`
- **Expected:** 200 OK with user object

---

## Folder 2: Username Validation Failures

All requests in this folder should return 400 Bad Request with validation errors.

### Request 1: Username Too Short
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "ab",
    "email": "short@example.com",
    "age": 25,
    "password": "ValidPass123"
  }
  ```
- **Expected Error:** "Username must be between 3 and 20 characters"

### Request 2: Username Too Long
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "thisusernameiswaytoolongandexceedslimit",
    "email": "long@example.com",
    "age": 25,
    "password": "ValidPass123"
  }
  ```
- **Expected Error:** "Username must be between 3 and 20 characters"

### Request 3: Username with Special Characters
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "user@name!",
    "email": "special@example.com",
    "age": 25,
    "password": "ValidPass123"
  }
  ```
- **Expected Error:** "Username can only contain letters and numbers"

### Request 4: Missing Username
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "email": "nousername@example.com",
    "age": 25,
    "password": "ValidPass123"
  }
  ```
- **Expected Error:** "Username is required"

### Request 5: Empty Username
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "",
    "email": "empty@example.com",
    "age": 25,
    "password": "ValidPass123"
  }
  ```
- **Expected Error:** "Username cannot be empty"

---

## Folder 3: Email Validation Failures

### Request 1: Invalid Email Format (No @)
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "testuser",
    "email": "notanemail",
    "age": 25,
    "password": "ValidPass123"
  }
  ```
- **Expected Error:** "Must be a valid email address"

### Request 2: Invalid Email Format (No Domain)
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "testuser",
    "email": "user@",
    "age": 25,
    "password": "ValidPass123"
  }
  ```
- **Expected Error:** "Must be a valid email address"

### Request 3: Missing Email
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "testuser",
    "age": 25,
    "password": "ValidPass123"
  }
  ```
- **Expected Error:** "Email is required"

### Request 4: Empty Email
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "testuser",
    "email": "",
    "age": 25,
    "password": "ValidPass123"
  }
  ```
- **Expected Error:** "Email cannot be empty"

### Request 5: Duplicate Email
**Note:** First create a user, then try to create another with the same email.
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "anotheruser",
    "email": "john@example.com",
    "age": 28,
    "password": "ValidPass123"
  }
  ```
- **Expected:** 409 Conflict (different from validation error!)
- **Expected Error:** "Email already exists"

---

## Folder 4: Age Validation Failures

### Request 1: Age Too Young (Under 18)
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "teenager",
    "email": "teen@example.com",
    "age": 16,
    "password": "ValidPass123"
  }
  ```
- **Expected Error:** "User must be at least 18 years old"

### Request 2: Negative Age
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "negativeage",
    "email": "negative@example.com",
    "age": -5,
    "password": "ValidPass123"
  }
  ```
- **Expected Error:** "Age must be a positive number"

### Request 3: Age Too High (Over 120)
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "olduser",
    "email": "old@example.com",
    "age": 150,
    "password": "ValidPass123"
  }
  ```
- **Expected Error:** "Age must be realistic (max 120)"

### Request 4: Age as String
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "stringage",
    "email": "string@example.com",
    "age": "twenty-five",
    "password": "ValidPass123"
  }
  ```
- **Expected Error:** "Age must be a whole number"

### Request 5: Age as Decimal
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "decimalage",
    "email": "decimal@example.com",
    "age": 25.5,
    "password": "ValidPass123"
  }
  ```
- **Expected Error:** "Age must be a whole number"

### Request 6: Missing Age
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "noage",
    "email": "noage@example.com",
    "password": "ValidPass123"
  }
  ```
- **Expected Error:** "Age is required"

---

## Folder 5: Password Validation Failures

### Request 1: Password Too Short
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "shortpass",
    "email": "shortpass@example.com",
    "age": 25,
    "password": "Short1"
  }
  ```
- **Expected Error:** "Password must be at least 8 characters long"

### Request 2: Password Without Uppercase
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "noupper",
    "email": "noupper@example.com",
    "age": 25,
    "password": "lowercase123"
  }
  ```
- **Expected Error:** "Password must contain at least one uppercase letter"

### Request 3: Password Without Lowercase
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "nolower",
    "email": "nolower@example.com",
    "age": 25,
    "password": "UPPERCASE123"
  }
  ```
- **Expected Error:** "Password must contain at least one lowercase letter"

### Request 4: Password Without Number
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "nonumber",
    "email": "nonumber@example.com",
    "age": 25,
    "password": "NoNumbers"
  }
  ```
- **Expected Error:** "Password must contain at least one number"

### Request 5: Missing Password
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "nopassword",
    "email": "nopass@example.com",
    "age": 25
  }
  ```
- **Expected Error:** "Password is required"

### Request 6: Empty Password
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "emptypass",
    "email": "emptypass@example.com",
    "age": 25,
    "password": ""
  }
  ```
- **Expected Error:** "Password cannot be empty"

---

## Folder 6: Bio Validation Failures

### Request 1: Bio Too Long (Over 500 Characters)
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "longbio",
    "email": "longbio@example.com",
    "age": 25,
    "password": "ValidPass123",
    "bio": "This is a very long bio that exceeds the maximum length allowed. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Additional text to make this exceed 500 characters total for testing purposes only."
  }
  ```
- **Expected Error:** "Bio cannot exceed 500 characters"

---

## Folder 7: Role Validation Failures

### Request 1: Invalid Role
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "invalidrole",
    "email": "invalidrole@example.com",
    "age": 25,
    "password": "ValidPass123",
    "role": "superuser"
  }
  ```
- **Expected Error:** "Role must be one of: user, admin, moderator"

### Request 2: Role as Number
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "rolenumber",
    "email": "rolenumber@example.com",
    "age": 25,
    "password": "ValidPass123",
    "role": 1
  }
  ```
- **Expected Error:** "Role must be one of: user, admin, moderator"

---

## Folder 8: Multiple Validation Failures

These tests show that multiple validations can fail at once.

### Request 1: Multiple Field Failures
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "ab",
    "email": "invalid-email",
    "age": 15,
    "password": "weak"
  }
  ```
- **Expected:** Multiple errors in the response (username too short, invalid email, age too young, weak password)

### Request 2: All Fields Invalid
- **Method:** POST
- **URL:** `{{baseUrl}}/users`
- **Body:**
  ```json
  {
    "username": "",
    "email": "",
    "age": -1,
    "password": "",
    "role": "invalid"
  }
  ```
- **Expected:** Errors for all fields

---

## Bonus Tasks

### Task 1: Test Update Validations
Create requests to test that validations also work when updating users (PUT method).

### Task 2: Test the Validate Endpoint
Create requests for `POST {{baseUrl}}/users/validate` to test validation without creating users.

### Task 3: Add Postman Tests
Add actual test scripts to your requests to automatically verify responses:

```javascript
// Example test script for a validation failure
pm.test("Status code is 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Response contains validation error", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.error).to.eql("Validation failed");
});
```

### Task 4: Export Your Collection
1. Right-click your collection
2. Click "Export"
3. Save as `User_Validation_Tests.json`
4. Submit this file with your assignment

---

## Success Criteria

Your Postman collection should:
- [ ] Be organized into clear folders
- [ ] Have descriptive names for each request
- [ ] Test at least 40 different scenarios
- [ ] Cover all validation rules mentioned in the model
- [ ] Include both successful and failing test cases
- [ ] Use the collection variable `{{baseUrl}}`
- [ ] Have clear descriptions of expected results

## Tips for Success

1. **Run Successful Tests First:** Create a few valid users before testing failures
2. **Read Error Messages:** The API returns helpful error messages - make sure they match what you expect
3. **Test One Thing at a Time:** Each request should test one specific validation
4. **Save Your Collection:** Save frequently so you don't lose work
5. **Use Folders:** Organization makes it easier to run specific groups of tests
6. **Document Your Findings:** Add descriptions to requests noting interesting behaviors

## Common Issues

**Server not responding?**
- Make sure the server is running (`npm run dev`)
- Check that you're using the correct port (4000)
- Verify the baseUrl variable is set correctly

**Getting different error messages?**
- Read the actual error returned by the API
- Compare with the validation rules in the model
- Some validations may trigger before others

**Tests passing when they should fail?**
- Double-check your request body JSON syntax
- Make sure you're using the correct HTTP method
- Verify required fields are actually being sent

## Learning Outcomes

After completing this lab, you will:
- ✅ Understand how to systematically test API validations
- ✅ Know how to use Postman for API testing
- ✅ Recognize the difference between validation errors (400), unique constraint errors (409), and server errors (500)
- ✅ Be able to create comprehensive test collections
- ✅ Understand common validation patterns in web applications

## Next Steps

After mastering validation testing with Postman:
- Learn about automated API testing with tools like Jest or Mocha
- Explore Postman's testing scripts for automated validation
- Study integration testing strategies
- Practice testing your own APIs as you build them

Good luck, and happy testing! 🧪
