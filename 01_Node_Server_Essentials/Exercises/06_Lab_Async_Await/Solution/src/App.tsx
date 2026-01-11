import { useState, type JSX } from 'react'
import './App.css'

type AnyJson = any

const DEFAULT_URL = 'https://www.dnd5eapi.co/api/2014/monsters/ancient-black-dragon'

function App(): JSX.Element {
  const [url, setUrl] = useState<string>(DEFAULT_URL)
  const [data, setData] = useState<AnyJson | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // 🔄 REFACTORED: Promise chains converted to async/await
  // Added 'async' keyword to enable await usage inside this function
  const handleFetch = async () => { 
    // 🎬 STEP 1: Prepare UI state (same as before)
    setLoading(true)     // Show loading indicator to user
    setError(null)       // Clear any previous error messages
    setData(null)        // Clear any previous data
    
    // 🛡️ STEP 2: Wrap all async operations in try/catch
    // This replaces the .catch() from the Promise chain
    try {
      // 🌐 STEP 3: Make the API request with await
      // Instead of: fetch(url).then(res => ...)
      // We now: const res = await fetch(url)
      const res = await fetch(url)
      
      // 🔍 STEP 4: Check response headers (same logic as before)
      const contentType = res.headers.get('content-type') || ''

      // ❌ STEP 5: Handle HTTP errors (404, 500, etc.)
      if (!res.ok) {
        // 📖 Read the error message from server
        // Before: return res.text().then(text => ...)
        // Now: const text = await res.text()
        const text = await res.text()
        
        // 📝 Create detailed error message
        const msg = `HTTP ${res.status} ${res.statusText}: ${text}`
        console.error(msg)  // Log for debugging
        setError(msg)       // Show to user
        
        // 💥 Throw error to jump to catch block
        // This replaces the Promise chain's automatic error propagation
        throw new Error(msg)
      }

      // ✅ STEP 6: Process successful response
      let parsed: AnyJson
      
      // 📄 Handle JSON responses
      if (contentType.includes('application/json')) {
        // Before: return res.json()
        // Now: parsed = await res.json()
        parsed = await res.json()
      } else {
        // 📃 Handle text responses with JSON fallback
        // Before: return res.text().then(text => ...)
        // Now: const text = await res.text()
        const text = await res.text()
        
        try {
          // 🔄 Try to parse as JSON (maybe missing content-type header)
          parsed = JSON.parse(text)
        } catch {
          // 📝 If parsing fails, use raw text
          parsed = text
        }
      }

      // 🎉 STEP 7: Handle successful data processing
      // This replaces the second .then() in the Promise chain
      console.log('GET response from', url, parsed)  // Debug logging
      setData(parsed)  // Update React state with the data
      
    } catch (e) {
      // 💥 STEP 8: Handle ALL errors in one place
      // This replaces the .catch() from the Promise chain
      // Catches: network errors, HTTP errors, JSON parsing errors
      console.error('Fetch error', e)  // Debug logging
      setError(String(e?.message ?? e))  // Show error to user
      
    } finally {
      // 🏁 STEP 9: Cleanup that always runs
      // This replaces the .finally() from the Promise chain
      // Runs whether the operation succeeded or failed
      setLoading(false)  // Hide loading indicator
    }
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
