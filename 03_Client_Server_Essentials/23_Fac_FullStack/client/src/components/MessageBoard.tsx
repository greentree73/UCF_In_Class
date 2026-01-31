import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

// Type definition for a Message
interface Message {
  id: number;
  username: string;
  content: string;
  createdAt: string;
}

// API base URL
const API_URL = 'http://localhost:4000/api/messages';

function MessageBoard() {
  // State for storing messages from the server
  const [messages, setMessages] = useState<Message[]>([]);
  
  // State for form inputs
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  
  // State for loading and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch messages when component mounts
  useEffect(() => {
    fetchMessages();
  }, []);

  // Function to fetch all messages from the server
  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Make GET request to server
      const response = await axios.get<Message[]>(API_URL);
      
      // Update state with fetched messages
      setMessages(response.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages. Make sure the server is running!');
    } finally {
      setLoading(false);
    }
  };

  // Function to create a new message
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!username.trim() || !content.trim()) {
      setError('Please fill in both username and message');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Make POST request to server
      const response = await axios.post<Message>(API_URL, {
        username: username.trim(),
        content: content.trim(),
      });
      
      // Add new message to the beginning of the list
      setMessages([response.data, ...messages]);
      
      // Clear form
      setUsername('');
      setContent('');
    } catch (err) {
      console.error('Error creating message:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="message-board">
      <div className="message-board-container">
        {/* Create Message Form */}
        <section className="create-message-section">
          <h2>Post a Message</h2>
          <form onSubmit={handleSubmit} className="message-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                maxLength={50}
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="content">Message:</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                rows={4}
                disabled={loading}
              />
            </div>
            
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </section>

        {/* Error Display */}
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {/* Messages List */}
        <section className="messages-section">
          <div className="messages-header">
            <h2>Messages ({messages.length})</h2>
            <button onClick={fetchMessages} disabled={loading} className="refresh-button">
              🔄 Refresh
            </button>
          </div>
          
          {loading && messages.length === 0 ? (
            <p className="loading-text">Loading messages...</p>
          ) : messages.length === 0 ? (
            <p className="empty-state">No messages yet. Be the first to post! 🎉</p>
          ) : (
            <div className="messages-list">
              {messages.map((message) => (
                <div key={message.id} className="message-card">
                  <div className="message-header">
                    <strong className="message-username">{message.username}</strong>
                    <span className="message-date">{formatDate(message.createdAt)}</span>
                  </div>
                  <p className="message-content">{message.content}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default MessageBoard;
