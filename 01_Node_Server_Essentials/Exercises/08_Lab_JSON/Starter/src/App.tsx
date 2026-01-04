import { useState, type JSX } from 'react'
import './App.css'

type AnyJson = any

const DEFAULT_URL = 'https://www.dnd5eapi.co/api/monsters/ancient-black-dragon'
const USER_API_URL = 'https://jsonplaceholder.typicode.com/users/1'

function App(): JSX.Element {
  const [url, setUrl] = useState<string>(DEFAULT_URL)
  const [data, setData] = useState<AnyJson | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // TODO: Step 2: this function returns formatted string
  // HINT: Use data.name, data.hit_points, data.armor_class
  const extractMonsterInfo = (monsterData: any): string => {
    // TODO: Extract name, hit points, and armor class from monsterData
    // TODO: Return a formatted string like "Ancient Black Dragon - HP: 367, AC: 22"
    
    return "TODO: Extract monster info here"
  }

  // TODO: Step 4 - Create a function to extract user information  
  // HINT: Create a function called extractUserInfo(data) for user API data
  // HINT: Use data.name, data.email, data.address.city, data.company.name
  const extractUserInfo = (userData: any): string => {
    // TODO: Extract name, email, city, and company name from userData
    // TODO: Return formatted string like "Leanne Graham from Gwenborough works at Romaguera-Crona"
    
    return "TODO: Extract user info here"
  }

  // TODO: Step 3 - Create a function to extract complex data (arrays, nested objects)
  // HINT: Extract damage_resistances array and special_abilities 
  const extractComplexInfo = (monsterData: any): string => {
    // TODO: Extract damage_resistances array and join with commas
    // TODO: Get first special ability name and description  
    
    return "TODO: Extract complex info here"
  }

  const handleFetch = () => { 
    setLoading(true)     
    setError(null)      
    setData(null)        
    
    fetch(url)
      .then(res => {
        const contentType = res.headers.get('content-type') || ''

        if (!res.ok) {
          return res.text().then(text => {
            const msg = `HTTP ${res.status} ${res.statusText}: ${text}`
            console.error(msg)
            setError(msg)
            throw new Error(msg)
          })
        }

        if (contentType.includes('application/json')) {
          return res.json()
        } else {
          return res.text().then(text => {
            try {
              return JSON.parse(text)
            } catch {
              return text
            }
          })
        }
      })

      .then(parsed => {
        console.log('GET response from', url, parsed)
        setData(parsed)
      })    
      .catch(e => {
        console.error('Fetch error', e)
        setError(String(e?.message ?? e))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // TODO: Step 4 - Create a function to fetch user data
  const handleFetchUser = () => {
    setUrl(USER_API_URL)
    setLoading(true)     
    setError(null)      
    setData(null)
    
    // TODO: Use fetch() to get user data from USER_API_URL
    // TODO: Follow same pattern as handleFetch() but set URL to user API
    // HINT: You can copy the fetch logic from handleFetch and change the URL
    
    console.log("TODO: Implement user fetch")
  }

  return (
    <div className="app-root" style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h1>JSON Parsing Lab</h1>
      <p>Learn to extract specific data from API responses!</p>

      <label style={{ display: 'block', marginBottom: 8 }}>
        API URL
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: '100%', padding: 8, marginTop: 6 }}
        />
      </label>

      <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
        <button onClick={handleFetch} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Monster (GET)'}
        </button>
        <button onClick={handleFetchUser} disabled={loading}>
          Fetch User Data
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

        {/* TODO: Step 2, 3, 4 - Add data extraction display here */}
        {data && (
          <div style={{ marginBottom: 16, padding: 12, background: '#f0f8ff', borderRadius: 6 }}>
            <h3>Extracted Information:</h3>
            
            {/* TODO: Step 2 - Display extracted monster info */}
            {url.includes('monsters') && (
              <div style={{ marginBottom: 8 }}>
                <strong>Monster:</strong> {extractMonsterInfo(data)}
              </div>
            )}
            
            {/* TODO: Step 3 - Display complex extracted info for monsters */}
            {url.includes('monsters') && (
              <div style={{ marginBottom: 8 }}>
                <strong>Details:</strong> {extractComplexInfo(data)}
              </div>
            )}
            
            {/* TODO: Step 4 - Display extracted user info */}
            {url.includes('users') && (
              <div style={{ marginBottom: 8 }}>
                <strong>User:</strong> {extractUserInfo(data)}
              </div>
            )}
          </div>
        )}

        <h3>Raw JSON Data:</h3>
        <div
          data-testid="json-output"
          style={{
            background: '#2d2d2d',
            color: '#f8f8f2',
            padding: 12,
            borderRadius: 6,
            minHeight: 80,
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
            fontSize: '12px',
            maxHeight: '400px',
            overflow: 'auto'
          }}
        >
          {data ? JSON.stringify(data, null, 2) : 'No data yet. Click "Fetch Monster (GET)" to start.'}
        </div>
      </div>
    </div>
  )
}

export default App;
