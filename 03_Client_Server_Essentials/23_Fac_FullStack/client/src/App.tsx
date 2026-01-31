import MessageBoard from './components/MessageBoard';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>📨 Full-Stack Message Board</h1>
        <p>A simple React + Express + PostgreSQL application</p>
      </header>
      <main>
        <MessageBoard />
      </main>
    </div>
  );
}

export default App;
