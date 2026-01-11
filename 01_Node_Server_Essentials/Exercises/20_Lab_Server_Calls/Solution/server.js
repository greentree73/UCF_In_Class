import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

/**
 * SOLUTION: Build a weather and GitHub proxy API
 * 
 * This solution demonstrates:
 * 1. Making server-side API calls with axios
 * 2. Error handling for external API failures
 * 3. Data transformation and formatting
 * 4. Proper HTTP status codes
 * 5. API proxy pattern
 */

/**
 * SOLUTION 1: GET /api/weather/:city
 * 
 * Fetches current weather data from WeatherAPI.com
 * Returns: temperature, condition, humidity
 * 
 * Note: This uses a free tier key. In production, store API keys in .env
 */
app.get('/api/weather/:city', async (req, res) => {
  try {
    const { city } = req.params;

    // Validate input
    if (!city || city.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'City name is required',
      });
    }

    // Make server-side API call to WeatherAPI
    // Note: Using a demo key - get your own at https://www.weatherapi.com/
    const weatherApiKey = 'demo'; // In production: process.env.WEATHER_API_KEY
    const weatherUrl = 'https://api.weatherapi.com/v1/current.json';

    const response = await axios.get(weatherUrl, {
      params: {
        key: weatherApiKey,
        q: city,
        aqi: 'no', // Don't need air quality data
      },
      timeout: 5000, // 5 second timeout
    });

    // Extract relevant data from external API response
    const weatherData = {
      success: true,
      city: response.data.location.name,
      country: response.data.location.country,
      temperature: response.data.current.temp_c,
      temperature_f: response.data.current.temp_f,
      condition: response.data.current.condition.text,
      humidity: response.data.current.humidity,
      wind_kph: response.data.current.wind_kph,
      feelslike_c: response.data.current.feelslike_c,
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Weather API Error:', error.message);

    // Handle different error types
    if (error.response?.status === 400) {
      return res.status(400).json({
        success: false,
        error: 'City not found. Please check the spelling.',
      });
    }

    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({
        success: false,
        error: 'Weather API request timed out',
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to fetch weather data',
      message: error.message,
    });
  }
});

/**
 * SOLUTION 2: GET /api/github/:username
 * 
 * Fetches GitHub user profile data
 * Returns: name, bio, public_repos, followers, company
 * 
 * Benefit: GitHub's public API doesn't require authentication!
 */
app.get('/api/github/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Validate input
    if (!username || username.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'GitHub username is required',
      });
    }

    // Make server-side API call to GitHub
    const githubUrl = `https://api.github.com/users/${username}`;

    const response = await axios.get(githubUrl, {
      headers: {
        'User-Agent': 'Node.js-Server', // GitHub requires a User-Agent header
      },
      timeout: 5000,
    });

    // Extract relevant data from GitHub API response
    const userData = {
      success: true,
      username: response.data.login,
      name: response.data.name || 'Not provided',
      bio: response.data.bio || 'No bio',
      company: response.data.company || 'Not specified',
      location: response.data.location || 'Not specified',
      public_repos: response.data.public_repos,
      followers: response.data.followers,
      following: response.data.following,
      created_at: response.data.created_at,
      profile_url: response.data.html_url,
    };

    res.json(userData);
  } catch (error) {
    console.error('GitHub API Error:', error.message);

    // Handle different error types
    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        error: 'GitHub user not found',
      });
    }

    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({
        success: false,
        error: 'GitHub API request timed out',
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to fetch GitHub user data',
      message: error.message,
    });
  }
});

/**
 * BONUS: Endpoint that combines multiple API calls
 * Fetches both weather and GitHub data for a city/user combo
 */
app.get('/api/combo/:city/:username', async (req, res) => {
  try {
    const { city, username } = req.params;

    // Make both API calls in parallel using Promise.all
    const [weatherResponse, githubResponse] = await Promise.all([
      axios.get('https://api.weatherapi.com/v1/current.json', {
        params: { key: 'demo', q: city },
        timeout: 5000,
      }),
      axios.get(`https://api.github.com/users/${username}`, {
        headers: { 'User-Agent': 'Node.js-Server' },
        timeout: 5000,
      }),
    ]);

    res.json({
      success: true,
      weather: {
        city: weatherResponse.data.location.name,
        temperature: weatherResponse.data.current.temp_c,
        condition: weatherResponse.data.current.condition.text,
      },
      developer: {
        username: githubResponse.data.login,
        name: githubResponse.data.name,
        repos: githubResponse.data.public_repos,
      },
    });
  } catch (error) {
    console.error('Combo API Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch combined data',
      message: error.message,
    });
  }
});

/**
 * Home route with interactive testing interface
 */
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Server-Side API Calls Solution</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          max-width: 900px;
          margin: 40px auto;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }
        .container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          padding: 40px;
        }
        h1 {
          color: #333;
          border-bottom: 3px solid #667eea;
          padding-bottom: 15px;
          margin-bottom: 30px;
        }
        h2 {
          color: #667eea;
          margin-top: 30px;
          font-size: 1.3em;
        }
        .endpoint {
          background: #f8f9fa;
          border-left: 4px solid #667eea;
          padding: 20px;
          margin: 20px 0;
          border-radius: 6px;
        }
        .endpoint input {
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 250px;
          font-size: 14px;
        }
        button {
          padding: 10px 25px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: bold;
          transition: background 0.3s;
        }
        button:hover {
          background: #764ba2;
        }
        .result {
          background: #f0f0f0;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 15px;
          margin-top: 15px;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          overflow-x: auto;
          max-height: 400px;
          overflow-y: auto;
        }
        .success {
          border-left: 4px solid #28a745;
          color: #155724;
        }
        .error {
          border-left: 4px solid #dc3545;
          color: #721c24;
        }
        .code {
          background: #f5f5f5;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: monospace;
        }
        .example {
          background: #e7f3ff;
          padding: 10px;
          border-left: 3px solid #2196F3;
          margin: 10px 0;
          font-size: 13px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 Server-Side API Calls - SOLUTION</h1>
        <p>This solution demonstrates making HTTP requests from a Node.js server to external APIs using axios.</p>

        <h2>Endpoint 1: Weather Data</h2>
        <div class="endpoint">
          <p><strong>Route:</strong> <span class="code">GET /api/weather/:city</span></p>
          <p>Fetches current weather data from WeatherAPI and returns: temperature, condition, humidity</p>
          <label>City Name:</label><br>
          <input type="text" id="weatherCity" value="London" placeholder="Enter city name">
          <button onclick="fetchWeather()">Fetch Weather</button>
          <div class="example">
            Try: London, New York, Tokyo, Paris, Sydney
          </div>
          <pre id="weatherResult" class="result">Result will appear here...</pre>
        </div>

        <h2>Endpoint 2: GitHub User Data</h2>
        <div class="endpoint">
          <p><strong>Route:</strong> <span class="code">GET /api/github/:username</span></p>
          <p>Fetches GitHub user profile data: name, bio, repos, followers</p>
          <label>GitHub Username:</label><br>
          <input type="text" id="githubUser" value="torvalds" placeholder="Enter GitHub username">
          <button onclick="fetchGitHub()">Fetch GitHub User</button>
          <div class="example">
            Try: torvalds, guido, gvanrossum, github
          </div>
          <pre id="githubResult" class="result">Result will appear here...</pre>
        </div>

        <h2>Bonus: Combined Data</h2>
        <div class="endpoint">
          <p><strong>Route:</strong> <span class="code">GET /api/combo/:city/:username</span></p>
          <p>Fetches both weather and GitHub data in a single request!</p>
          <label>City:</label>
          <input type="text" id="comboCity" value="San Francisco" placeholder="City">
          <label style="margin-left: 20px;">Username:</label>
          <input type="text" id="comboUser" value="gvanrossum" placeholder="GitHub username">
          <br>
          <button onclick="fetchCombo()">Fetch Combined Data</button>
          <pre id="comboResult" class="result">Result will appear here...</pre>
        </div>

        <h2>Key Concepts</h2>
        <ul>
          <li><strong>Server as Proxy:</strong> Your server makes API calls instead of the client browser</li>
          <li><strong>Error Handling:</strong> Properly catch and handle API errors with meaningful messages</li>
          <li><strong>Input Validation:</strong> Validate parameters before making external requests</li>
          <li><strong>Timeout Handling:</strong> Set timeouts to prevent hanging requests</li>
          <li><strong>Data Transformation:</strong> Extract only needed data from external API responses</li>
          <li><strong>Parallel Requests:</strong> Use Promise.all() for multiple concurrent API calls</li>
        </ul>
      </div>

      <script>
        async function fetchWeather() {
          const city = document.getElementById('weatherCity').value;
          const resultEl = document.getElementById('weatherResult');
          resultEl.textContent = 'Loading...';

          try {
            const response = await fetch(\`/api/weather/\${encodeURIComponent(city)}\`);
            const data = await response.json();
            resultEl.textContent = JSON.stringify(data, null, 2);
            resultEl.className = 'result ' + (data.success ? 'success' : 'error');
          } catch (error) {
            resultEl.textContent = \`Error: \${error.message}\`;
            resultEl.className = 'result error';
          }
        }

        async function fetchGitHub() {
          const username = document.getElementById('githubUser').value;
          const resultEl = document.getElementById('githubResult');
          resultEl.textContent = 'Loading...';

          try {
            const response = await fetch(\`/api/github/\${encodeURIComponent(username)}\`);
            const data = await response.json();
            resultEl.textContent = JSON.stringify(data, null, 2);
            resultEl.className = 'result ' + (data.success ? 'success' : 'error');
          } catch (error) {
            resultEl.textContent = \`Error: \${error.message}\`;
            resultEl.className = 'result error';
          }
        }

        async function fetchCombo() {
          const city = document.getElementById('comboCity').value;
          const username = document.getElementById('comboUser').value;
          const resultEl = document.getElementById('comboResult');
          resultEl.textContent = 'Loading...';

          try {
            const response = await fetch(\`/api/combo/\${encodeURIComponent(city)}/\${encodeURIComponent(username)}\`);
            const data = await response.json();
            resultEl.textContent = JSON.stringify(data, null, 2);
            resultEl.className = 'result ' + (data.success ? 'success' : 'error');
          } catch (error) {
            resultEl.textContent = \`Error: \${error.message}\`;
            resultEl.className = 'result error';
          }
        }

        // Fetch weather for London on page load
        window.onload = () => {
          fetchWeather();
        };
      </script>
    </body>
    </html>
  `);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log('');
  console.log('📚 Available Endpoints:');
  console.log(`   GET /api/weather/:city       - Fetch weather data`);
  console.log(`   GET /api/github/:username    - Fetch GitHub user data`);
  console.log(`   GET /api/combo/:city/:user   - Fetch both (bonus)`);
  console.log('');
});
