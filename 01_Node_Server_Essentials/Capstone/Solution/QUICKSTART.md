# Quick Start Guide

## 1. Installation

```bash
# Navigate to the project directory
cd Student_Workbooks/01_Node_Server_Essentials/Capstone/Solution

# Install dependencies
npm install
```

## 2. Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Spoonacular API key:

```
SPOONACULAR_API_KEY=your_api_key_here
PORT=3000
NODE_ENV=development
```

**Get a free API key:**
1. Visit https://spoonacular.com/food-api
2. Sign up for a free account
3. Copy your API key from the dashboard
4. Paste it in the `.env` file

## 3. Build & Run

### Development (with hot reload):
```bash
npm run dev
```

### Production:
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

## 4. Test with Postman

1. Open Postman
2. Import the `Recipe_Finder_API.postman_collection.json` file
3. Select requests from the collection and click "Send"

### Quick Tests to Try:

1. **Search Recipes:**
   ```
   GET http://localhost:3000/recipes/search?query=chicken&number=5
   ```

2. **Get Recipe Details:**
   ```
   GET http://localhost:3000/recipes/715538
   ```

3. **Random Recipe:**
   ```
   GET http://localhost:3000/recipes/random
   ```

4. **Search Ingredients:**
   ```
   GET http://localhost:3000/recipes/ingredients?query=apple
   ```

## 5. Troubleshooting

### "Cannot find module 'axios'"
Make sure you ran `npm install` and all dependencies are installed.

### "Unauthorized: Invalid Spoonacular API key"
- Check that your API key is correct in the `.env` file
- Verify it's not expired
- Make sure NODE_ENV is not accidentally set to something that prevents .env loading

### "Module not found" errors
Ensure the directory structure matches:
```
Solution/
├── src/
│   ├── index.ts
│   ├── routes/recipes.ts
│   ├── controllers/recipeController.ts
│   ├── services/spoonacularService.ts
│   └── types/recipes.ts
├── package.json
├── tsconfig.json
└── .env
```

## 6. Code Structure Overview

- **`src/index.ts`** - Main Express app setup
- **`src/routes/recipes.ts`** - API route definitions
- **`src/controllers/recipeController.ts`** - Request handlers with validation
- **`src/services/spoonacularService.ts`** - Spoonacular API integration
- **`src/types/recipes.ts`** - TypeScript interfaces for type safety

## 7. Key Learning Points

This project demonstrates:
- **Express.js** - Building RESTful APIs
- **TypeScript** - Static typing for JavaScript
- **Async/Await** - Handling asynchronous operations
- **Environment Variables** - Secure configuration management
- **API Integration** - Making external API calls
- **Error Handling** - Try-catch blocks and error responses
- **Routing** - Organizing API endpoints
- **Middleware** - Request processing and logging

## 8. Next Steps

Once the basic API is working, try adding:
- Input validation with `express-validator`
- CORS support with `cors` package
- Response caching for frequently requested recipes
- Rate limiting to prevent API quota exhaustion
- Logging with Morgan middleware
- Unit tests with Jest
- Deployment to a hosting platform

See `README.md` for detailed documentation!
