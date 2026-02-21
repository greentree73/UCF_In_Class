import React, { useState } from 'react';
import { Question } from './types/graphql';
import { QuestionList } from './components/QuestionList';
import { QuestionForm } from './components/QuestionForm';
import './App.css';

type ActiveView = 'list' | 'create' | 'edit';

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('list');
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const handleCreateNew = () => {
    setEditingQuestion(null);
    setActiveView('create');
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setActiveView('edit');
  };

  const handleFormSubmit = () => {
    // Return to list view after successful form submission
    setActiveView('list');
    setEditingQuestion(null);
  };

  const handleFormCancel = () => {
    // Return to list view on cancel
    setActiveView('list');
    setEditingQuestion(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            🛰️ Apollo Splashdown Question Board 🚀
          </h1>
          <p className="app-subtitle">
            Full-Stack GraphQL with React, Apollo Client, and MongoDB
          </p>
        </div>
      </header>

      <nav className="nav-tabs">
        <button 
          className={`nav-tab ${activeView === 'list' ? 'active' : ''}`}
          onClick={() => setActiveView('list')}
        >
          📋 Questions
        </button>
        <button 
          className={`nav-tab ${activeView === 'create' || activeView === 'edit' ? 'active' : ''}`}
          onClick={handleCreateNew}
        >
          ➕ Ask Question
        </button>
      </nav>

      <main className="main-content">
        <div className="container">
          {activeView === 'list' && (
            <QuestionList onEditQuestion={handleEditQuestion} />
          )}
          
          {(activeView === 'create' || activeView === 'edit') && (
            <QuestionForm 
              editingQuestion={editingQuestion}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>
            Built with React + TypeScript + Apollo Client + GraphQL + Express + MongoDB
          </p>
          <div className="tech-stack">
            <span className="tech-badge">⚛️ React</span>
            <span className="tech-badge">🔷 TypeScript</span>
            <span className="tech-badge">🚀 Apollo</span>
            <span className="tech-badge">📊 GraphQL</span>
            <span className="tech-badge">🟢 MongoDB</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;