import { useState, type JSX } from 'react'
import './App.css'

type AnyJson = any

const DEFAULT_URL = 'https://www.dnd5eapi.co/api/2014/monsters/ancient-black-dragon'

function App(): JSX.Element {
  const [url, setUrl] = useState<string>(DEFAULT_URL)
  const [data, setData] = useState<AnyJson | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleFetch = () => {
    // 🚀 STEP 1: Set up the UI state before starting the API call
    setLoading(true)     // Show "Loading..." to the user
    setError(null)       // Clear any previous error messages
    setData(null)        // Clear any previous data
    
    // 🌐 STEP 2: Start the API call - this returns a Promise
    // Think of a Promise like ordering food at a restaurant:
    // You place your order (fetch) and get a receipt (Promise)
    // The receipt promises you'll get food later, but not right now
    fetch(url)
      
      // 📦 STEP 3: Handle the server's response (this is like getting your food delivered)
      // .then() means "when the promise is fulfilled, do this..."
      // 'res' is the Response object from the server
      .then(res => {
        // 🔍 Check what type of data the server sent us
        // This is like checking if your food order is a burger or pizza
        const contentType = res.headers.get('content-type') || ''

        // ❌ STEP 3A: Check if something went wrong (like getting the wrong order)
        // res.ok is false for error status codes (404, 500, etc.)
        if (!res.ok) {
          // If there's an error, we need to read the error message
          // This creates ANOTHER promise because reading takes time
          return res.text().then(text => {
            // Create a detailed error message
            const msg = `HTTP ${res.status} ${res.statusText}: ${text}`
            console.error(msg)  // Log to browser console for debugging
            setError(msg)       // Show error to the user
            throw new Error(msg) // This will jump to the .catch() below
          })
        }

        // ✅ STEP 3B: Server response is good! Now read the data
        // Check if the server sent us JSON data (like an API response)
        if (contentType.includes('application/json')) {
          // res.json() converts the response to a JavaScript object
          // This also returns a Promise because conversion takes time
          return res.json()
        } else {
          // If it's not JSON, treat it as text and try to parse it
          // This is like trying to read a handwritten note
          return res.text().then(text => {
            try {
              // Maybe it's JSON without the right header? Let's try to parse it
              return JSON.parse(text)
            } catch {
              // Nope, it's just plain text - return it as-is
              return text
            }
          })
        }
      })
      
      // 🎉 STEP 4: Success! We have our data
      // This .then() runs when the previous step successfully gets data
      // 'parsed' is our final data (could be an object, array, or string)
      .then(parsed => {
        // 📝 Log what we got (helpful for debugging)
        console.log('GET response from', url, parsed)
        // 💾 Save the data to state so React can display it
        setData(parsed)
      })
      
      // 💥 STEP 5: Handle any errors that happened anywhere in the chain
      // .catch() is like a safety net - it catches any errors from above
      // This runs if ANY step above fails (network error, parsing error, etc.)
      .catch(e => {
        console.error('Fetch error', e)  // Log for debugging
        // Convert the error to a string and show it to the user
        setError(String(e?.message ?? e))
      })
      
      // 🏁 STEP 6: Clean up - this ALWAYS runs (success or failure)
      // .finally() is like washing dishes after eating - you do it no matter what
      .finally(() => {
        setLoading(false)  // Hide the "Loading..." message
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
