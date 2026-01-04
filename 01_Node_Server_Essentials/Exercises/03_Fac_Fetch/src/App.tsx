import { useState, type JSX } from 'react'
import './App.css'

type AnyJson = any

const DEFAULT_URL = 'https://jsonplaceholder.typicode.com/todos/1'

function App(): JSX.Element {
  const [url, setUrl] = useState<string>(DEFAULT_URL)
  const [data, setData] = useState<AnyJson | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleFetch = () => {
    // 🎬 STEP 1: Prepare the UI for the API call
    setLoading(true)    // Tell React to show "Loading..." to the user
    setError(null)      // Clear any old error messages from previous attempts
    setData(null)       // Clear any old data from previous attempts
    
    // 🚀 STEP 2: Start the API request
    // fetch() is like making a phone call to a server
    // It returns a Promise (like a promise to call you back with an answer)
    fetch(url)
      
      // 📞 STEP 3: Handle the server's initial response
      // .then() means "when you get an answer, do this..."
      // 'res' is the server's response object (like picking up the phone)
      .then(res => {
        // 🔍 Check what kind of data the server is sending us
        // Content-Type header tells us if it's JSON, text, HTML, etc.
        const contentType = res.headers.get('content-type') || ''

        // ❌ STEP 3A: Check if the server said "something went wrong"
        // res.ok is false for error status codes like 404 (not found) or 500 (server error)
        if (!res.ok) {
          // The server sent an error, so let's read the error message
          // res.text() returns ANOTHER Promise because reading takes time
          return res.text().then(text => {
            // Build a helpful error message with the status code and text
            const msg = `HTTP ${res.status} ${res.statusText}: ${text}`
            console.error(msg)    // Log to browser console for developers
            setError(msg)         // Show the error to the user
            throw new Error(msg)  // This stops the chain and jumps to .catch()
          })
        }

        // ✅ STEP 3B: Server says everything is OK! Let's read the data
        // Check if the server sent us JSON data (most APIs do this)
        if (contentType.includes('application/json')) {
          // res.json() converts the JSON string into a JavaScript object
          // This ALSO returns a Promise because conversion takes time
          return res.json()
        } else {
          // The server sent text instead of JSON, let's handle that
          // res.text() gets the raw text content
          return res.text().then(text => {
            try {
              // Maybe it's JSON but without the right header? Let's try to parse it
              return JSON.parse(text)
            } catch {
              // Nope, it's just plain text - return it as-is
              return text
            }
          })
        }
      })
      
      // 🎉 STEP 4: Success! We have our data ready to use
      // This .then() runs when we successfully got and parsed the data
      // 'parsed' contains our final data (object, array, or string)
      .then(parsed => {
        // 📝 Log the data so developers can see what we got
        console.log('GET response from', url, parsed)
        // 💾 Save the data to React state so it shows up on the page
        setData(parsed)
      })
      
      // 💥 STEP 5: Catch any errors that happened anywhere above
      // .catch() is like a safety net that catches ALL errors from the chain
      // This could be network errors, parsing errors, or our thrown errors
      .catch(e => {
        console.error('Fetch error', e)   // Log for debugging
        // Convert the error to a string and show it to the user
        setError(String(e?.message ?? e))
      })
      
      // 🏁 STEP 6: Clean up (this runs no matter what happened above)
      // .finally() always runs, whether we succeeded or failed
      // It's like cleaning up after cooking - you do it regardless of how the meal turned out
      .finally(() => {
        setLoading(false)  // Tell React to hide the "Loading..." message
      })
  }

  return (
    <div className="app-root" style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h1>Example GET Fetch</h1>

      <label style={{ display: 'block', marginBottom: 8 }}>
        API URL
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: '100%', padding: 8, marginTop: 6 }}
        />
      </label>

      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button onClick={handleFetch} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch (GET)'}
        </button>
        <button
          onClick={() => {
            setUrl(DEFAULT_URL)
            setData(null)
            setError(null)
          }}
        >
          Reset
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        {error && (
          <div style={{ color: 'crimson', marginBottom: 8 }}>Error: {error}</div>
        )}

        <div
          data-testid="json-output"
          style={{
            background: 'gray',
            color: 'lightpurple',
            padding: 12,
            borderRadius: 6,
            minHeight: 80,
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
          }}
        >
          {data ? JSON.stringify(data, null, 2) : 'No data yet. Click "Fetch (GET)".'}
        </div>
      </div>
    </div>
  )
}

export default App
