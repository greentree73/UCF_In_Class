# Client README

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run in development mode:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Features

- **MessageBoard Component**: Displays and creates messages
- **TypeScript**: Type-safe React components
- **Axios**: HTTP client for API calls
- **Vite**: Fast development server with HMR

## Component Structure

### MessageBoard
The main component that:
- Fetches messages from the API on mount
- Displays messages in a list
- Provides a form to create new messages
- Handles loading and error states
- Uses React hooks (useState, useEffect)

## API Integration

The client communicates with the server using axios:

```typescript
// GET all messages
const response = await axios.get('http://localhost:4000/api/messages');

// POST new message
const response = await axios.post('http://localhost:4000/api/messages', {
  username: 'John',
  content: 'Hello world!'
});
```
