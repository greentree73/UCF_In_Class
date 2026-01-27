# Lab: CRUD Operations - Update and Delete Routes

## Objective
In this lab, you will complete a RESTful API by implementing **UPDATE** and **DELETE** routes for managing a simple resource. You'll build on existing GET and POST routes to create a fully functional CRUD application.

## Prerequisites
- Understanding of Express.js routing
- Knowledge of HTTP methods (GET, POST, PUT, DELETE)
- Familiarity with request parameters and body parsing

## Setup
1. Navigate to the `Starter` folder
2. Install dependencies: `npm install`
3. Review the existing code in `router.js`

## Current State
The router currently has:
- ✅ GET route to fetch all items
- ✅ POST route to create a new item
- ❌ PUT route to update an item (incomplete)
- ❌ DELETE route to remove an item (incomplete)

## Your Tasks

### Task 1: Implement the UPDATE Route
Complete the PUT route at `/api/items/:id`

**Requirements:**
1. Extract the `id` parameter from the request
2. Find the item in the array with the matching id
3. Update the item's properties with data from `req.body`
4. Return the updated item with a 200 status code
5. If the item is not found, return a 404 status with an appropriate message

**Hint:** Use `array.findIndex()` to locate the item

### Task 2: Implement the DELETE Route
Complete the DELETE route at `/api/items/:id`

**Requirements:**
1. Extract the `id` parameter from the request
2. Find the item in the array with the matching id
3. Remove the item from the array
4. Return a success message with a 200 status code
5. If the item is not found, return a 404 status with an appropriate message

**Hint:** Use `array.splice()` to remove the item

## Testing Your Routes

### Test UPDATE (PUT)
```bash
curl -X PUT http://localhost:3000/api/items/1 \
    -H "Content-Type: application/json" \
    -d '{"name":"Updated Item","description":"Updated description"}'
```

### Test DELETE
```bash
curl -X DELETE http://localhost:3000/api/items/1
```

Or use Postman/Thunder Client for testing.

## Expected Responses

### Successful UPDATE (200)
```json
{
    "id": 1,
    "name": "Updated Item",
    "description": "Updated description"
}
```

### Successful DELETE (200)
```json
{
    "message": "Item deleted successfully"
}
```

### Item Not Found (404)
```json
{
    "error": "Item not found"
}
```

## Bonus Challenge
- Add validation to ensure required fields are present in the UPDATE request
- Prevent deletion of the last item in the array
- Add timestamps to track when items were last updated

## Need Help?
Check the `Solution` folder for a complete implementation and detailed explanation.
