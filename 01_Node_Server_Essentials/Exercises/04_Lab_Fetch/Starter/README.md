## Activity: Scaffold a Vite app and fetch the "Ancient Black Dragon" from the D&D API

Objective
---------
Use the command line to scaffold a small Vite + React + TypeScript app. Inside the app add a button that makes a GET request to the Dungeons & Dragons API to retrieve the monster "Ancient Black Dragon" and display the JSON response on the page. Log the response to the browser console as well.

Estimated time: 45–75 minutes

Prerequisites
-------------
- Node.js (v16+) and npm installed on your machine
- Basic knowledge of the command line
- Familiarity with React and TypeScript is helpful but not required

Steps
-----

1) Create the project with Vite

	 Use the command line to scaffold a new Vite project. When prompted choose "React" and then "TypeScript".

	 ```bash
	 # from a workspace folder where you keep projects
	 npm create vite@latest my-dnd-fetch -- --template react-ts
	 cd my-dnd-fetch
	 npm install
	 ```

2) Open the project in your editor

	 Open the project's folder in VS Code or your preferred editor. The main app entry is `src/App.tsx`.

3) Replace `src/App.tsx` with a component that fetches the monster

	 Replace the starter contents of `src/App.tsx` with this example (or adapt it):

	 ```tsx
	 import React, { useState } from 'react'

	 type AnyJson = any

	 const MONSTER_URL = 'https://www.dnd5eapi.co/api/monsters/ancient-black-dragon'

	 export default function App(): JSX.Element {
		 const [data, setData] = useState<AnyJson | null>(null)
		 const [loading, setLoading] = useState(false)
		 const [error, setError] = useState<string | null>(null)

		 const fetchMonster = () => {
			 setLoading(true)
			 setError(null)
			 setData(null)
			 
			 fetch(MONSTER_URL)
				 .then(res => {
					 if (!res.ok) {
						 throw new Error(`HTTP ${res.status}`)
					 }
					 return res.json()
				 })
				 .then(json => {
					 console.log('Monster response:', json)
					 setData(json)
				 })
				 .catch(e => {
					 console.error('Fetch failed', e)
					 setError(String(e.message ?? e))
				 })
				 .finally(() => {
					 setLoading(false)
				 })
		 }

		 return (
			 <div style={{ padding: 16 }}>
				 <h1>D&D API — Ancient Black Dragon</h1>
				 <button onClick={fetchMonster} disabled={loading}>
					 {loading ? 'Loading…' : 'Fetch Monster (GET)'}
				 </button>

				 {error && <div style={{ color: 'crimson', marginTop: 12 }}>Error: {error}</div>}

				 <pre style={{ marginTop: 12, background: '#f6f8fa', padding: 12 }}>
					 {data ? JSON.stringify(data, null, 2) : 'No data yet — click the button.'}
				 </pre>
			 </div>
		 )
	 }
	 ```

4) Start the dev server

	 Run the Vite dev server and open the app in the browser.

	 ```bash
	 npm run dev
	 ```

	 The dev server will print a local URL (for example `http://localhost:5173`). Open that page in your browser.

5) Test the fetch

	 - Click the "Fetch Monster (GET)" button.
	 - The browser console should show the logged monster JSON.
	 - The page should display a formatted JSON blob containing the monster data.

Hints and troubleshooting
-------------------------

- If CORS prevents the request in the browser, try using a CORS proxy for testing (only for local learning). For example:

	```js
	const proxy = 'https://corsproxy.io/?'
	const url = proxy + encodeURIComponent(MONSTER_URL)
	fetch(url) // ...
	```

- If `fetch` fails with a network error, check your internet connection and that `https://www.dnd5eapi.co/api/monsters/ancient-black-dragon` is reachable.
- If TypeScript complains about `JSX` or missing types, ensure you installed dependencies and dev types:

	```bash
	npm install
	npm install -D typescript @types/react @types/react-dom
	```

Expected JSON keys
------------------

The D&D API returns a big JSON object with keys like `index`, `name`, `size`, `type`, `alignment`, `armor_class`, `hit_points`, `actions`, and more. A successful fetch should include `name: "Ancient Black Dragon"`.

Verification Checklist
----------------------

- [ ] Project scaffolding completed with Vite
- [ ] Dev server runs and page loads
- [ ] Button triggers a GET request
- [ ] Response logged to the browser console
- [ ] JSON displayed in the page with `name: "Ancient Black Dragon"`

Extra credit
------------

- Render a small summary (name, hit points, armor_class) in a friendly UI instead of raw JSON.
- Add error handling and a retry button.
- Implement a search input to fetch other monsters by `index` (the API path uses the monster's index, e.g., `ancient-black-dragon`).

Resources
---------

- D&D 5e API documentation: https://www.dnd5eapi.co/
- Vite: https://vitejs.dev/

