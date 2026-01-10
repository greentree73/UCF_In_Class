# Server-Side API Calls Lab

## Activity
Create server endpoints that fetch data from external APIs

## Implementation
Build a proxy API that makes server-side requests to external services

## Quick Start

```bash
npm install
npm start
```

Visit `http://localhost:3000` in your browser.

## Your Task

Complete the two TODO sections in `server.js`:

### Endpoint 1: Weather Data
**Route**: `GET /api/weather/:city`

Make a server-side API call to the Weather API and return:
- Temperature
- Weather condition
- Humidity

**Hint**: You'll need to sign up for a free API key at [weatherapi.com](https://www.weatherapi.com/)

**Example**:
```
GET /api/weather/london
```

### Endpoint 2: GitHub User Data
**Route**: `GET /api/github/:username`

Make a server-side API call to GitHub's public API and return:
- User name
- Bio
- Public repositories count
- Followers count

**Bonus**: GitHub doesn't require authentication for basic requests!

**Example**:
```
GET /api/github/torvalds
```

## What You'll Learn

✅ Making HTTP requests from a Node.js server  
✅ Using axios for API calls  
✅ Error handling with try/catch  
✅ Processing external API responses  
✅ Building API proxy patterns  

## Bonus Challenges

1. **Add response caching** - Store API responses to reduce unnecessary calls
2. **Input validation** - Validate the city/username before making requests
3. **Request logging** - Add console logs to track API requests
4. **Timeout handling** - Add timeout configuration to axios requests

## Testing Your Implementation

Once you've implemented both endpoints, test them:

**Using curl**:
```bash
curl http://localhost:3000/api/weather/tokyo
curl http://localhost:3000/api/github/guido
```

**Using the browser**:
Visit the routes directly in your browser address bar.

## Key Concepts

### Server as Proxy
Instead of the browser making API calls directly, your server acts as a middleman:
```
Browser → Your Server → External API
```

### Benefits
- **Security**: Hide API keys on the server
- **CORS**: Avoid cross-origin issues
- **Data Control**: Transform/filter responses
- **Rate Limiting**: Control API usage

### Using Axios

```javascript
// Simple GET request
const response = await axios.get(url);

// With query parameters
const response = await axios.get(url, {
  params: { key: 'value' }
});

// Error handling
try {
  const response = await axios.get(url);
  res.json(response.data);
} catch (error) {
  res.status(500).json({ error: error.message });
}
```

## Expected Output Format

**Weather endpoint should return**:
```json
{
  "success": true,
  "city": "London",
  "temperature": 15,
  "condition": "Partly cloudy",
  "humidity": 72
}
```

**GitHub endpoint should return**:
```json
{
  "success": true,
  "username": "torvalds",
  "name": "Linus Torvalds",
  "bio": "...",
  "public_repos": 5,
  "followers": 250000
}
```