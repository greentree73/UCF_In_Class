# Express Router Lab Activity

## Activity
Complete the character router file in the routes folder by implementing 2 REST endpoints.

## Quick Start

```bash
npm install
npm start
```

Visit `http://localhost:3000` to see the activity instructions.

## Your Task

You need to complete **`routes/characters.js`** by adding 2 endpoints to the router:

### Endpoint 1: Get All Characters
**Route**: `GET /api/characters`

Complete this endpoint in `routes/characters.js`:
```javascript
router.get('/', (req, res) => {
  // TODO: Return all characters with success message
  // Should return:
  // {
  //   success: true,
  //   message: "Characters retrieved",
  //   data: [array of characters]
  // }
});
```

### Endpoint 2: Get Character by ID
**Route**: `GET /api/characters/:id`

Complete this endpoint in `routes/characters.js`:
```javascript
router.get('/:id', (req, res) => {
  // TODO: Get the ID from req.params
  // TODO: Use find() to locate the character
  // TODO: Return the single character with success message
  // Should return:
  // {
  //   success: true,
  //   message: "Character retrieved",
  //   data: {character object}
  // }
});
```

## Sample Data

The `characters` array is already provided in `routes/characters.js`:

```javascript
const characters = [
  { id: 1, name: 'Luke Skywalker', universe: 'Star Wars' },
  { id: 2, name: 'Harry Potter', universe: 'Harry Potter' },
  { id: 3, name: 'Frodo Baggins', universe: 'Lord of the Rings' },
  { id: 4, name: 'Hermione Granger', universe: 'Harry Potter' },
  { id: 5, name: 'Gandalf', universe: 'Lord of the Rings' }
];
```

## Expected Responses

### GET /api/characters
```json
{
  "success": true,
  "message": "Characters retrieved",
  "data": [
    { "id": 1, "name": "Luke Skywalker", "universe": "Star Wars" },
    { "id": 2, "name": "Harry Potter", "universe": "Harry Potter" },
    { "id": 3, "name": "Frodo Baggins", "universe": "Lord of the Rings" },
    { "id": 4, "name": "Hermione Granger", "universe": "Harry Potter" },
    { "id": 5, "name": "Gandalf", "universe": "Lord of the Rings" }
  ]
}
```

### GET /api/characters/1
```json
{
  "success": true,
  "message": "Character retrieved",
  "data": {
    "id": 1,
    "name": "Luke Skywalker",
    "universe": "Star Wars"
  }
}
```

## Testing Your Implementation

Once you've completed both endpoints, test them:

```bash
# Test getting all characters
curl http://localhost:3000/api/characters

# Test getting specific characters
curl http://localhost:3000/api/characters/1
curl http://localhost:3000/api/characters/2
curl http://localhost:3000/api/characters/5
```

## File Structure

```
Starter/
├── server.js              # Already complete - mounts the router
├── package.json
├── routes/
│   └── characters.js      # ← YOU NEED TO COMPLETE THIS
└── README.md
```

## Helpful Tips

1. **Use router.get()**: Call `router.get()` just like you would `app.get()`
2. **Relative paths**: Routes on a router use relative paths (e.g., `'/'` not `'/api/characters/'`)
3. **Parameters**: Access route parameters with `req.params.id`
4. **Array.find()**: Use `characters.find(char => char.id == req.params.id)`
5. **JSON response**: Use `res.json()` to send JSON responses
6. **Consistent format**: Always return `{ success: true, message: "...", data: ... }`

## Checklist

Before you're done:
- [ ] Read the TODO comments in `routes/characters.js`
- [ ] Implement the GET / endpoint
- [ ] Implement the GET /:id endpoint
- [ ] Test both endpoints with curl
- [ ] Verify response format matches the examples
- [ ] Check that all 5 characters can be retrieved individually

## Learning Outcomes

After completing this activity, you'll understand:
- ✅ How to create routes on an express.Router()
- ✅ How to define route parameters (:id)
- ✅ How to access route parameters with req.params
- ✅ How to use array methods (find) to search data
- ✅ How routers are imported and mounted in server.js
- ✅ The purpose of modular route organization

## Getting Stuck?

Look at this example from the faculty lesson:

```javascript
// routes/users.js
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Users retrieved', data: users });
});

router.get('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  res.json({ success: true, message: 'User retrieved', data: user });
});
```

Your character router should follow the same pattern!
