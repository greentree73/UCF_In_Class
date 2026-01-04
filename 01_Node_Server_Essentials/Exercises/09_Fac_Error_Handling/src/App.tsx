import { useState, type JSX } from 'react'
import './App.css'

type AnyJson = any

// Test URLs for different error scenarios
const DEFAULT_URL = 'https://www.dnd5eapi.co/api/monsters/ancient-black-dragon'
const INVALID_URL = 'https://fake-nonexistent-api.com/data' // Network error
const NOT_FOUND_URL = 'https://www.dnd5eapi.co/api/monsters/nonexistent-monster' // 404 error
const SERVER_ERROR_URL = 'https://httpstat.us/500' // 500 error
const UNAUTHORIZED_URL = 'https://httpstat.us/401' // 401 error

function App(): JSX.Element {
  const [url, setUrl] = useState<string>(DEFAULT_URL)
  const [data, setData] = useState<AnyJson | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [errorType, setErrorType] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState<number>(0)

  /**
   *  
   * These functions show you how to handle different types of errors that happen in real apps
   */

  // Function to create user-friendly error messages based on error type
  const getErrorMessage = (error: any, statusCode?: number): { message: string; type: string; suggestion: string } => {
    // Network errors (no internet, server unreachable)
    if (error.name === 'TypeError' || error.message.includes('Failed to fetch')) {
      return {
        message: '🌐 Connection Problem',
        type: 'network',
        suggestion: 'Check your internet connection and try again'
      }
    }

    // HTTP Status Code errors
    if (statusCode) {
      switch (statusCode) {
        case 404:
          return {
            message: '🔍 Data Not Found',
            type: 'not-found',
            suggestion: 'The requested data doesn\'t exist. Try a different URL or check for typos'
          }
        case 401:
          return {
            message: '🔐 Authorization Required',
            type: 'unauthorized',
            suggestion: 'You need permission to access this data. Check if you need an API key'
          }
        case 403:
          return {
            message: '🚫 Access Forbidden',
            type: 'forbidden',
            suggestion: 'You don\'t have permission to access this resource'
          }
        case 500:
          return {
            message: '⚠️ Server Error',
            type: 'server-error',
            suggestion: 'The server is having problems. Try again in a few minutes'
          }
        case 503:
          return {
            message: '🔧 Service Unavailable',
            type: 'service-unavailable',
            suggestion: 'The service is temporarily down for maintenance'
          }
        default:
          return {
            message: `❌ HTTP ${statusCode} Error`,
            type: 'http-error',
            suggestion: 'Something went wrong with the server response'
          }
      }
    }

    // JSON parsing errors
    if (error.message.includes('JSON') || error.name === 'SyntaxError') {
      return {
        message: '📄 Invalid Data Format',
        type: 'parse-error',
        suggestion: 'The server sent data in an unexpected format'
      }
    }

    // Generic/unknown errors
    return {
      message: '🤔 Something Went Wrong',
      type: 'unknown',
      suggestion: 'An unexpected error occurred. Please try again'
    }
  }

  // Safe data extraction with error handling
  const extractMonsterInfo = (monsterData: any): string => {
    try {
      // Use optional chaining (?.) to safely access properties
      const name = monsterData?.name || 'Unknown Monster'
      const hitPoints = monsterData?.hit_points || 0
      const armorClass = monsterData?.armor_class[0].type || 0
      
      return `${name} - HP: ${hitPoints}, AC: ${armorClass}`
    } catch (error) {
      console.warn('Error extracting monster info:', error)
      return 'Unable to extract monster information'
    }
  }


  // Enhanced fetch function with comprehensive error handling
  const handleFetch = async () => { 
    setLoading(true)     
    setError(null)      
    setErrorType(null)
    setData(null)        
    
    try {
      console.log('🚀 Starting fetch request to:', url)
      
      // Step 1: Make the network request
      const response = await fetch(url)
      
      // Step 2: Check HTTP status codes BEFORE trying to parse data
      if (!response.ok) {
        const errorInfo = getErrorMessage(new Error(`HTTP ${response.status}`), response.status)
        setError(errorInfo.message)
        setErrorType(errorInfo.type)
        console.error('❌ HTTP Error:', response.status, response.statusText)
        
        // Try to get more details from the error response
        try {
          const errorText = await response.text()
          console.error('Error details:', errorText)
        } catch {
          console.error('Could not read error details')
        }
        
        return // Exit early on HTTP errors
      }

      // Step 3: Check content type and parse appropriately  
      const contentType = response.headers.get('content-type') || ''
      console.log('📄 Response content type:', contentType)
      
      let parsedData
      
      if (contentType.includes('application/json')) {
        // Parse JSON data
        parsedData = await response.json()
      } else {
        // Handle non-JSON responses
        const textData = await response.text()
        try {
          // Maybe it's JSON without the right header?
          parsedData = JSON.parse(textData)
        } catch {
          // It's plain text or HTML
          parsedData = { message: textData, type: 'text' }
        }
      }

      // Step 4: Success! Log and save the data
      console.log('✅ Successfully fetched data:', parsedData)
      setData(parsedData)
      setRetryCount(0) // Reset retry count on success
      
    } catch (fetchError: any) {
      // Step 5: Handle network and other errors
      console.error('🔥 Fetch failed:', fetchError)
      
      const errorInfo = getErrorMessage(fetchError)
      setError(errorInfo.message)
      setErrorType(errorInfo.type)
      
      // Log detailed error information for debugging
      console.group('🐛 Error Details')
      console.error('Error name:', fetchError.name)
      console.error('Error message:', fetchError.message)
      console.error('Full error:', fetchError)
      console.groupEnd()
      
    } finally {
      // Step 6: Always clean up loading state
      setLoading(false)
    }
  }

  // Retry function with exponential backoff
  const handleRetry = () => {
    const newRetryCount = retryCount + 1
    setRetryCount(newRetryCount)
    
    // Add delay based on retry count (1s, 2s, 4s, 8s...)
    const delay = Math.min(1000 * Math.pow(2, newRetryCount - 1), 8000)
    
    console.log(`🔄 Retrying in ${delay}ms (attempt ${newRetryCount})`)
    setTimeout(() => {
      handleFetch()
    }, delay)
  }



  return (
    <div className="app-root" style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h1>🛡️ API Error Handling Demo</h1>
      <p>Learn how to handle different types of errors that occur when fetching data from APIs!</p>

      <div style={{ marginBottom: 16, padding: 12, background: '#e8f4fd', borderRadius: 6 }}>
        <h3>🎯 Instructions:</h3>
        <ol>
          <li>Try the working API first to see success</li>
          <li>Test each error scenario below</li>
          <li>Watch the console (F12) for detailed logs</li>
          <li>Notice how errors are handled gracefully</li>
        </ol>
      </div>

      <label style={{ display: 'block', marginBottom: 8 }}>
        API URL to Test
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: '100%', padding: 8, marginTop: 6 }}
          placeholder="Enter any URL to test..."
        />
      </label>

      <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
        <button onClick={handleFetch} disabled={loading} style={{ background: '#28a745', color: 'white', padding: '8px 12px', border: 'none', borderRadius: 4 }}>
          {loading ? '⏳ Loading...' : '✅ Test Current URL'}
        </button>
        
        <button onClick={() => { setUrl(DEFAULT_URL); }} style={{ background: '#007bff', color: 'white', padding: '8px 12px', border: 'none', borderRadius: 4 }}>
          ✅ Working API
        </button>
        
        <button onClick={() => { setUrl(NOT_FOUND_URL); }} style={{ background: '#ffc107', color: 'black', padding: '8px 12px', border: 'none', borderRadius: 4 }}>
          🔍 404 Error
        </button>
        
        <button onClick={() => { setUrl(SERVER_ERROR_URL); }} style={{ background: '#dc3545', color: 'white', padding: '8px 12px', border: 'none', borderRadius: 4 }}>
          ⚠️ 500 Error
        </button>
        
        <button onClick={() => { setUrl(UNAUTHORIZED_URL); }} style={{ background: '#6f42c1', color: 'white', padding: '8px 12px', border: 'none', borderRadius: 4 }}>
          🔐 401 Error
        </button>
        
        <button onClick={() => { setUrl(INVALID_URL); }} style={{ background: '#fd7e14', color: 'white', padding: '8px 12px', border: 'none', borderRadius: 4 }}>
          🌐 Network Error
        </button>

        <button
          onClick={() => {
            setUrl(DEFAULT_URL)
            setData(null)
            setError(null)
            setErrorType(null)
            setRetryCount(0)
          }}
          style={{ background: '#6c757d', color: 'white', padding: '8px 12px', border: 'none', borderRadius: 4 }}
        >
          🔄 Reset All
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        {/* Enhanced Error Display */}
        {error && (
          <div style={{ 
            padding: 16, 
            marginBottom: 16, 
            background: '#fee', 
            borderLeft: '4px solid #dc3545', 
            borderRadius: 4 
          }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#721c24' }}>
              {error}
            </h3>
            <p style={{ margin: '0 0 12px 0', color: '#721c24' }}>
              <strong>Error Type:</strong> {errorType || 'unknown'}
            </p>
            <p style={{ margin: '0 0 12px 0', color: '#721c24' }}>
              <strong>What this means:</strong> 
              {errorType === 'network' && ' Your internet connection or the server is unreachable.'}
              {errorType === 'not-found' && ' The requested resource doesn\'t exist on the server.'}
              {errorType === 'server-error' && ' The server encountered an internal error.'}
              {errorType === 'unauthorized' && ' You need proper authorization to access this resource.'}
              {!errorType && ' An unexpected error occurred.'}
            </p>
            <p style={{ margin: '0 0 12px 0', color: '#721c24' }}>
              <strong>Try this:</strong> 
              {errorType === 'network' && ' Check your internet connection and try again.'}
              {errorType === 'not-found' && ' Verify the URL is correct or try a different endpoint.'}
              {errorType === 'server-error' && ' Wait a few moments and retry - the server may recover.'}
              {errorType === 'unauthorized' && ' Check if you need an API key or authentication.'}
              {!errorType && ' Check the browser console for more details and try again.'}
            </p>
            {(errorType === 'network' || errorType === 'server-error') && (
              <button 
                onClick={handleRetry} 
                disabled={loading}
                style={{ 
                  background: '#dc3545', 
                  color: 'white', 
                  padding: '8px 12px', 
                  border: 'none', 
                  borderRadius: 4,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? '⏳ Retrying...' : `🔄 Retry (${retryCount} attempts)`}
              </button>
            )}
          </div>
        )}

        {/* Success Data Display with Safe Extraction */}
        {data && !error && (
          <div style={{ marginBottom: 16, padding: 12, background: '#d4edda', borderRadius: 6, borderLeft: '4px solid #28a745' }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#155724' }}>✅ Success! Data Retrieved</h3>
            
            {/* Safe data extraction examples */}
            {url.includes('monsters') && (
              <div style={{ marginBottom: 8, color: '#155724' }}>
                <strong>🐲 Monster Info:</strong> {extractMonsterInfo(data)}
              </div>
            )}
            
            {url.includes('users') && (
              <div style={{ marginBottom: 8, color: '#155724' }}>
                <strong>👤 User Info:</strong> {extractUserInfo(data)}
              </div>
            )}

            {url.includes('httpstat.us') && (
              <div style={{ marginBottom: 8, color: '#155724' }}>
                <strong>📊 HTTP Status Test:</strong> This URL returned a {data.code || 'response'} status code
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div style={{ 
            padding: 16, 
            marginBottom: 16, 
            background: '#fff3cd', 
            borderLeft: '4px solid #ffc107', 
            borderRadius: 4,
            color: '#856404'
          }}>
            <h3 style={{ margin: 0 }}>⏳ Loading...</h3>
            <p style={{ margin: '8px 0 0 0' }}>Making request to: {url}</p>
          </div>
        )}

        <h3>📄 Raw Response Data (for learning):</h3>
        <div
          style={{
            background: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: 6,
            minHeight: 80,
            maxHeight: '300px',
            overflow: 'auto'
          }}
        >
          <div style={{ 
            background: '#e9ecef', 
            padding: '8px 12px', 
            borderBottom: '1px solid #dee2e6', 
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            Response Content
          </div>
          <div style={{
            padding: 12,
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
            fontSize: '12px',
            color: '#495057'
          }}>
            {data 
              ? JSON.stringify(data, null, 2) 
              : error 
                ? `No data - ${error}` 
                : 'No data yet. Try one of the test buttons above!'}
          </div>
        </div>

        <div style={{ marginTop: 16, padding: 12, background: '#f8f9fa', borderRadius: 4, fontSize: '14px' }}>
          <p><strong>💡 Learning Tip:</strong> Open your browser's Developer Tools (F12) and check the Console tab to see detailed logs of what's happening with each request!</p>
        </div>
      </div>
    </div>
  )
}

export default App;
