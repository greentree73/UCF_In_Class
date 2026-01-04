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
    setLoading(true)     
    setError(null)      
    setData(null)        
    
    fetch(url)
      .then(res => {
        const contentType = res.headers.get('content-type') || ''

        if (!res.ok) {
          // If there's an error, we need to read the error message
          return res.text().then(text => {
            // Create a detailed error message
            const msg = `HTTP ${res.status} ${res.statusText}: ${text}`
            console.error(msg)  // Log to browser console for debugging
            setError(msg)       // Show error to the user
            throw new Error(msg) // This will jump to the .catch() below
          })
        }

        // Check if the server sent us JSON data (like an API response)
        if (contentType.includes('application/json')) {
          return res.json()
        } else {
          // If it's not JSON, treat it as text and try to parse it
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

      .then(parsed => {
        // 📝 Log what we got (helpful for debugging)
        console.log('GET response from', url, parsed)
        // 💾 Save the data to state so React can display it
        setData(parsed)
      })    
      // .catch() is like a safety net - it catches any errors from above
      .catch(e => {
        console.error('Fetch error', e)  // Log for debugging
        // Convert the error to a string and show it to the user
        setError(String(e?.message ?? e))
      })
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
