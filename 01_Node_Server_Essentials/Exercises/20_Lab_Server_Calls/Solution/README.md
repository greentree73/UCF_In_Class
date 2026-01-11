# Server-Side API Calls Lab - SOLUTION

## Overview

This solution demonstrates how to build server-side API endpoints that act as proxies to external APIs. Instead of making API calls directly from the browser, the server makes the requests and returns formatted data to the client.

## What You'll Learn

✅ Making HTTP requests from Node.js servers  
✅ Using axios for API calls with error handling  
✅ Transforming external API responses  
✅ Input validation and error handling  
✅ Timeout management for external requests  
✅ Making multiple parallel API calls  

## Running the Solution

```bash
npm install
npm start
```

Visit `http://localhost:3000` to test all endpoints interactively!

## Solution Architecture

### Endpoint 1: Weather Proxy
**Route**: `GET /api/weather/:city`

```javascript
app.get('/api/weather/:city', async (req, res) => {
  try {
    // 1. Validate input
    if (!city || city.trim().length === 0) {
      return res.status(400).json({ error: 'City required' });
    }

    // 2. Make server-side API call
    const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
      params: { key: 'demo', q: city },
      timeout: 5000
    });

    // 3. Extract relevant data
    const weatherData = {
      success: true,
      city: response.data.location.name,
      temperature: response.data.current.temp_c,
      condition: response.data.current.condition.text,
      humidity: response.data.current.humidity,
    };

    // 4. Return to client
    res.json(weatherData);
  } catch (error) {
    // 5. Handle errors gracefully
    res.status(500).json({
      success: false,
      error: 'Failed to fetch weather data'
    });
  }
});
```

**Key Features**:
- ✅ Input validation
- ✅ Timeout handling (5 second limit)
- ✅ Error categorization (404 vs timeout vs server error)
- ✅ Data transformation (only return relevant fields)
- ✅ Consistent response format

**Example Request**:
```
GET /api/weather/London
```

**Example Response**:
```json
{
  "success": true,
  "city": "London",
  "country": "United Kingdom",
  "temperature": 8.5,
  "temperature_f": 47.3,
  "condition": "Partly cloudy",
  "humidity": 72,
  "wind_kph": 15.2,
  "feelslike_c": 6.8
}
```

---

### Endpoint 2: GitHub User Proxy
**Route**: `GET /api/github/:username`

```javascript
app.get('/api/github/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // GitHub requires User-Agent header
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: { 'User-Agent': 'Node.js-Server' },
        timeout: 5000
      }
    );

    // Extract relevant user data
    const userData = {
      success: true,
      username: response.data.login,
      name: response.data.name,
      bio: response.data.bio,
      company: response.data.company,
      public_repos: response.data.public_repos,
      followers: response.data.followers,
      created_at: response.data.created_at,
      profile_url: response.data.html_url,
    };

    res.json(userData);
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        error: 'GitHub user not found'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to fetch GitHub data'
    });
  }
});
```

**Key Features**:
- ✅ No authentication needed (public API)
- ✅ User-Agent header required by GitHub
- ✅ Specific error handling for 404s
- ✅ Null coalescing for optional fields (`||`)
- ✅ Returns profile URL for verification

**Example Request**:
```
GET /api/github/torvalds
```

**Example Response**:
```json
{
  "success": true,
  "username": "torvalds",
  "name": "Linus Torvalds",
  "bio": "Linux creator",
  "company": null,
  "location": "Portland, Oregon",
  "public_repos": 5,
  "followers": 250000,
  "following": 0,
  "created_at": "2011-09-03T13:28:57Z",
  "profile_url": "https://github.com/torvalds"
}
```

---

### Bonus: Combined API Calls
**Route**: `GET /api/combo/:city/:username`

```javascript
app.get('/api/combo/:city/:username', async (req, res) => {
  try {
    // Make both requests in parallel!
    const [weatherResponse, githubResponse] = await Promise.all([
      axios.get('https://api.weatherapi.com/v1/current.json', {
        params: { key: 'demo', q: city },
        timeout: 5000
      }),
      axios.get(`https://api.github.com/users/${username}`, {
        headers: { 'User-Agent': 'Node.js-Server' },
        timeout: 5000
      })
    ]);

    // Combine results
    res.json({
      success: true,
      weather: { /* ... */ },
      developer: { /* ... */ }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch combined data'
    });
  }
});
```

**Key Features**:
- ✅ `Promise.all()` for parallel requests (faster!)
- ✅ Single error handler for both requests
- ✅ Combines data from multiple sources
- ✅ Efficient network usage

---

## Implementation Patterns

### Pattern 1: Simple Proxy
```javascript
app.get('/api/endpoint', async (req, res) => {
  try {
    const response = await axios.get('https://external-api.com/data');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Pattern 2: Data Transformation
```javascript
app.get('/api/processed', async (req, res) => {
  try {
    const response = await axios.get('https://api.example.com/data');
    
    // Transform the data
    const processed = response.data.map(item => ({
      id: item.id,
      name: item.name.toUpperCase(),
      created: new Date(item.created_at).toLocaleDateString()
    }));
    
    res.json(processed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Pattern 3: Parallel Requests
```javascript
app.get('/api/combined', async (req, res) => {
  try {
    const [users, posts] = await Promise.all([
      axios.get('https://api.example.com/users'),
      axios.get('https://api.example.com/posts')
    ]);
    
    res.json({
      users: users.data,
      posts: posts.data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Pattern 4: Error Categorization
```javascript
app.get('/api/robust', async (req, res) => {
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    // Handle specific errors
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'Not found' });
    }
    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({ error: 'Request timeout' });
    }
    if (error.response?.status >= 500) {
      return res.status(503).json({ error: 'External API error' });
    }
    
    res.status(500).json({ error: 'Unknown error' });
  }
});
```

---

## Why Server-Side API Calls?

### 1. **Security**
- Keep API keys secret on the server
- Never expose credentials to the client

```javascript
// ✅ GOOD: API key on server
const apiKey = process.env.WEATHER_API_KEY;
const response = await axios.get(url, { params: { key: apiKey } });

// ❌ BAD: API key exposed to browser
fetch(`https://api.com/data?key=${apiKey}`);
```

### 2. **CORS Bypass**
- Server-to-server calls don't have CORS restrictions
- Avoid "No Access-Control-Allow-Origin" errors

### 3. **Data Control**
- Transform and filter data before sending to client
- Reduce payload size

```javascript
// Only send necessary fields
const processed = {
  id: data.id,
  name: data.name,
  // Skip password, internal fields, etc.
};
```

### 4. **Rate Limiting**
- Centralize API usage control
- Implement caching to reduce external calls

### 5. **Error Handling**
- Catch external API failures gracefully
- Return user-friendly error messages

---

## Testing

### Using the Web Interface
Visit `http://localhost:3000` for an interactive testing interface

### Using curl
```bash
# Test weather endpoint
curl http://localhost:3000/api/weather/tokyo

# Test GitHub endpoint
curl http://localhost:3000/api/github/guido

# Test combo endpoint
curl http://localhost:3000/api/combo/Seattle/gvanrossum
```

### Using Postman
1. Import the API endpoints
2. Test different cities and usernames
3. Try invalid inputs to see error handling

---

## Advanced Features in This Solution

### ✅ Input Validation
```javascript
if (!city || city.trim().length === 0) {
  return res.status(400).json({ error: 'City required' });
}
```

### ✅ Timeout Handling
```javascript
const response = await axios.get(url, { timeout: 5000 });
```

### ✅ Error Categorization
```javascript
if (error.response?.status === 404) { /* 404 error */ }
if (error.code === 'ECONNABORTED') { /* timeout */ }
if (error.response?.status >= 500) { /* server error */ }
```

### ✅ Consistent Response Format
```javascript
// Success
{ success: true, city: '...', temperature: 20, ... }

// Error
{ success: false, error: 'User message', message: 'Debug message' }
```

### ✅ User-Agent Headers
```javascript
// Required by GitHub API
headers: { 'User-Agent': 'Node.js-Server' }
```

### ✅ Parallel Requests
```javascript
// Both requests happen simultaneously
const [weather, github] = await Promise.all([req1, req2]);
```

---

## Learning Outcomes

After studying this solution, you should understand:

1. ✅ How servers act as API proxies
2. ✅ Axios syntax for GET requests with parameters
3. ✅ Try-catch error handling patterns
4. ✅ Specific error handling for different scenarios
5. ✅ Data transformation and extraction
6. ✅ Timeout and validation strategies
7. ✅ Parallel request patterns with Promise.all()
8. ✅ HTTP status codes (200, 400, 404, 500, 504)
9. ✅ Request headers and parameters
10. ✅ Interactive web UI for testing

---

## Next Steps

### Challenge 1: Add Caching
Store API responses temporarily to reduce external calls:
```javascript
const cache = {};

app.get('/api/weather/:city', async (req, res) => {
  const { city } = req.params;
  
  // Check cache first
  if (cache[city]) {
    console.log('Returning cached data');
    return res.json(cache[city]);
  }
  
  // ... make API call ...
  cache[city] = result;
  res.json(result);
});
```

### Challenge 2: Add Rate Limiting
Limit requests per IP address:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);
```

### Challenge 3: Environment Variables
Store API keys safely:
```javascript
// Create .env file
WEATHER_API_KEY=your_key_here
GITHUB_TOKEN=your_token_here

// Use in code
const apiKey = process.env.WEATHER_API_KEY;
```

### Challenge 4: Add Logging
Track API calls and errors:
```javascript
console.log(`[${new Date().toISOString()}] GET /api/weather/${city}`);
console.error(`[ERROR] Weather API failed: ${error.message}`);
```

---

## Resources

- [Axios Documentation](https://axios-http.com/)
- [WeatherAPI Documentation](https://www.weatherapi.com/docs/)
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [Express Error Handling](https://expressjs.com/en/guide/error-handling.html)
- [Promise.all() Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
