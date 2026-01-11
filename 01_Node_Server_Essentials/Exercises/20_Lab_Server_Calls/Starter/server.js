import express from "express";
import axios from "axios";

const app = express();
const PORT = 8000;

app.use(express.json());

/**
 * TODO: Build a weather proxy API
 *
 * Create two endpoints:
 *
 * 1. GET /api/weather/:city
 *    - Accept a city name as a parameter
 *    - Make a server-side API call to: https://api.weatherapi.com/v1/current.json
 *    - Use query parameters: key=YOUR_KEY&q={city}
 *    - Extract and return: temperature, condition, humidity
 *    - Handle errors appropriately
 *
 * 2. GET /api/github/:username
 *    - Accept a GitHub username as a parameter
 *    - Make a server-side API call to: https://api.github.com/users/{username}
 *    - Extract and return: name, bio, public_repos, followers
 *    - Handle errors appropriately
 *
 * BONUS CHALLENGES:
 * - Add response caching to reduce API calls
 * - Validate input parameters before making requests
 * - Add request logging middleware
 * - Implement request timeout handling
 */

// TODO: Implement endpoint 1 - GET /api/weather/:city
app.get("/api/weather/:city", async (req, res) => {
  // Your code here
});

// TODO: Implement endpoint 2 - GET /api/github/:username
app.get("/api/github/:username", async (req, res) => {
  const user = req.params.username;
  const response = await axios.get(
    `https://api.github.com/users/${user}`,
    {
      headers: {
        "User-Agent": "Node.js-Server", // GitHub requires a User-Agent header
      },
      timeout: 5000,
    }
  );
 
  console.log(response);
  res.send({
    "message": "route hit",
    "data": {
      "username": response.data.login
    }
  });
  console.log(response);
});

// Home route with instructions
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Server-Side API Calls Lab</title>
      <style>
        body { font-family: Arial; max-width: 600px; margin: 40px auto; padding: 20px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 8px; }
        h1 { color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
        .instructions { background: #e7f3ff; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0; }
        code { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>📝 Server-Side API Calls Lab</h1>
        <div class="instructions">
          <h3>Your Task:</h3>
          <p>Complete the TODO comments in <code>server.js</code> to implement:</p>
          <ol>
            <li><code>GET /api/weather/:city</code> - Fetch weather data</li>
            <li><code>GET /api/github/:username</code> - Fetch GitHub user data</li>
          </ol>
          <p><strong>Tip:</strong> The GitHub API doesn't require authentication for basic requests!</p>
        </div>
        <h3>Resources:</h3>
        <ul>
          <li><a href="https://docs.weatherapi.com/">Weather API Docs</a> (Free tier available)</li>
          <li><a href="https://docs.github.com/en/rest/users/users">GitHub API Docs</a></li>
          <li>Axios: <code>await axios.get(url, { params: {...} })</code></li>
        </ul>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log("📝 Open server.js and complete the TODO comments");
});
