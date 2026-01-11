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

  // SOLUTION: Extract basic monster information from D&D API response
  const extractMonsterInfo = (monsterData: any): string => {
    // Extract specific properties from the monster data
    const name = monsterData.name
    const hitPoints = monsterData.hit_points
    const armorClass = monsterData.armor_class
    
    // Return formatted string with extracted data
    return `${name} - HP: ${hitPoints}, AC: ${armorClass}`
  }

  // SOLUTION: Extract user information from JSONPlaceholder API response  
  // This demonstrates working with nested objects
  const extractUserInfo = (userData: any): string => {
    // Extract basic info
    const name = userData.name
    const email = userData.email
    
    // Extract nested address info
    const city = userData.address.city
    
    // Extract nested company info  
    const company = userData.company.name
    
    // Return formatted string combining all extracted data
    return `${name} (${email}) from ${city} works at ${company}`
  }

  // SOLUTION: Extract complex data including arrays and nested objects
  const extractComplexInfo = (monsterData: any): string => {
    // Extract array of damage resistances and join into string  
    const resistances = monsterData.damage_resistances.join(', ')
    
    // Extract first special ability
    const firstAbility = monsterData.special_abilities[0]
    const abilityInfo = `${firstAbility.name}: ${firstAbility.desc}`
    
    return `Resistances: ${resistances} | First Ability: ${abilityInfo}`
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
    
    fetch(USER_API_URL)
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
        console.log('GET response from', USER_API_URL, parsed)
        setData(parsed)
      })    
      .catch(e => {
        console.error('Fetch error', e)
        setError(String(e?.message ?? e))
      })
      .finally(() => {
        setLoading(false)
      })    
    
    console.log("TODO: Implement user fetch")
  }

  return (
    <div className="app-root" style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h1>JSON Parsing Lab - Solution</h1>
      <p>Complete working implementation showing JSON extraction techniques!</p>

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
