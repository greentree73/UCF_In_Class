# Recipe Finder API - Solution

A complete Node.js/Express API server written in TypeScript that integrates with the Spoonacular API to search, discover, and retrieve recipe details.

## Features

- **Recipe Search**: Search for recipes by keyword with customizable result limits
- **Recipe Details**: Get comprehensive information about a specific recipe including ingredients and instructions
- **Random Recipes**: Get random recipe suggestions with optional tag filtering
- **Ingredient Search**: Search for ingredient information and nutritional facts
- **Error Handling**: Comprehensive error handling and validation
- **Environment Variables**: Secure API key management using .env files
- **TypeScript**: Fully typed for better development experience and error prevention

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Spoonacular API Key (free at https://spoonacular.com/food-api)

## Installation

1. Clone or navigate to this project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   SPOONACULAR_API_KEY=your_api_key_here
   PORT=3000
   NODE_ENV=development
   ```

4. Build the TypeScript:
   ```bash
   npm run build
   ```

## Running the Server

**Development (with auto-restart):**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### 1. Search Recipes
**GET** `/recipes/search`

Query Parameters:
- `query` (required): Search term (e.g., "pasta", "chicken")
- `number` (optional): Number of results to return (default: 10, max: 100)

Example:
```
GET http://localhost:3000/recipes/search?query=chicken&number=5
```

Response:
```json
{
  "results": [
    {
      "id": 595736,
      "title": "Chicken Parmesan",
      "image": "https://spoonacular.com/recipeImages/...",
      "imageType": "jpg"
    }
  ],
  "number": 5,
  "offset": 0,
  "totalResults": 4320
}
```

### 2. Get Recipe Details
**GET** `/recipes/:id`

Path Parameters:
- `id` (required): Recipe ID

Example:
```
GET http://localhost:3000/recipes/715538
```

Response:
```json
{
  "id": 715538,
  "title": "Homemade Gnocchi",
  "image": "https://spoonacular.com/recipeImages/...",
  "servings": 4,
  "readyInMinutes": 30,
  "sourceUrl": "https://...",
  "summary": "Recipe summary...",
  "extendedIngredients": [
    {
      "id": 20011,
      "name": "flour",
      "amount": 2.5,
      "unit": "cups"
    }
  ],
  "analyzedInstructions": [
    {
      "name": "",
      "steps": [
        {
          "number": 1,
          "step": "Mix the ingredients..."
        }
      ]
    }
  ]
}
```

### 3. Get Random Recipe
**GET** `/recipes/random`

Query Parameters:
- `tags` (optional): Comma-separated tags to filter by (e.g., "vegetarian,dessert")
- `number` (optional): Number of random recipes to return (default: 1)

Example:
```
GET http://localhost:3000/recipes/random?tags=vegetarian&number=1
```

### 4. Search Ingredients
**GET** `/recipes/ingredients`

Query Parameters:
- `query` (required): Ingredient search term (e.g., "apple", "tomato")
- `number` (optional): Number of results (default: 10)

Example:
```
GET http://localhost:3000/recipes/ingredients?query=apple&number=5
```

Response:
```json
{
  "results": [
    {
      "id": 9003,
      "name": "apple",
      "image": "apple.png"
    }
  ],
  "number": 5,
  "offset": 0
}
```

## Testing with Postman

1. Open Postman
2. Create a new GET request
3. Enter one of the URLs from the Examples above
4. Click "Send"
5. View the JSON response

**Recommended Testing Flow:**
1. Test `/recipes/search?query=pasta` - Basic search
2. Test `/recipes/715538` - Recipe details (use ID from search results)
3. Test `/recipes/random` - Random recipe
4. Test `/recipes/ingredients?query=tomato` - Ingredient search

## Project Structure

```
solution/
├── src/
│   ├── index.ts           # Main Express app entry point
│   ├── routes/
│   │   └── recipes.ts    # Recipe routes
│   ├── controllers/
│   │   └── recipeController.ts  # Route handlers
│   ├── services/
│   │   └── spoonacularService.ts  # API integration
│   ├── types/
│   │   └── recipes.ts    # TypeScript interfaces
│   └── utils/
│       └── errorHandler.ts  # Error handling utilities
├── dist/                  # Compiled JavaScript (generated)
├── .env                   # Environment variables (local)
├── .gitignore
├── tsconfig.json
├── package.json
└── README.md
```

## Key Concepts Demonstrated

- **TypeScript**: Strong typing with interfaces for API responses
- **Express.js**: RESTful API routing and middleware
- **Async/Await**: Handling asynchronous API calls
- **Error Handling**: Try-catch blocks and error middleware
- **Environment Variables**: Using dotenv for configuration
- **API Integration**: Making HTTP requests with axios
- **Response Formatting**: Transforming external API data for client consumption

## Troubleshooting

### "Cannot find module 'axios'"
Run `npm install` to install dependencies.

### API returns 401 Unauthorized
Check that your Spoonacular API key is correct in the `.env` file.

### CORS Errors
If accessing from a frontend, you may need to add CORS middleware. Add this to `index.ts`:
```typescript
import cors from 'cors';
app.use(cors());
```

Then install: `npm install cors` and `npm install --save-dev @types/cors`

### "Module not found: src/routes/recipes"
Ensure the directory structure matches the project structure above. Verify all imports are correct.

## Further Enhancements

Students can extend this project with:

1. **Input Validation**: Use express-validator to validate query parameters
2. **Rate Limiting**: Implement rate limiting to prevent API quota exhaustion
3. **Caching**: Add in-memory caching for frequently requested recipes
4. **Response Pagination**: Implement pagination for large result sets
5. **Filtering**: Add advanced filtering by cuisine, diet type, or allergens
6. **Authentication**: Add basic authentication if needed
7. **Logging**: Implement logging with Winston or Morgan
8. **Testing**: Add unit and integration tests with Jest
9. **Deployment**: Deploy to Render, Heroku, or Railway

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Spoonacular API Documentation](https://spoonacular.com/food-api)
- [Axios Documentation](https://axios-http.com/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## License

MIT
