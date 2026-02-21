import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Question, SortOrder } from '../types/graphql';
import { GET_QUESTIONS, SEARCH_QUESTIONS, GET_QUESTIONS_BY_TAG } from '../graphql/queries';
import { QuestionCard } from './QuestionCard';

interface QuestionListProps {
  onEditQuestion?: (question: Question) => void;
}

export const QuestionList: React.FC<QuestionListProps> = ({ onEditQuestion }) => {
  const [sortBy, setSortBy] = useState<SortOrder>(SortOrder.NEWEST);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'search' | 'tag'>('all');

  // useQuery runs GET_QUESTIONS as soon as this component renders.
  // - variables: passes the current sort option into the GraphQL query.
  // - skip: prevents this query from running when search/tag filters are active.
  // - return values: data/ loading/ error let us render UI states safely.
  const { 
    data: questionsData, 
    loading: questionsLoading, 
    error: questionsError 
  } = useQuery(GET_QUESTIONS, {
    variables: { sortBy },
    skip: activeFilter !== 'all',
  });

  // useQuery runs SEARCH_QUESTIONS only when the user is actively searching.
  // - variables: sends the search text as $query.
  // - skip: blocks requests until there is a non-empty search string and
  //   the search filter is selected.
  // - this keeps network requests intentional and avoids empty searches.
  const { 
    data: searchData, 
    loading: searchLoading, 
    error: searchError 
  } = useQuery(SEARCH_QUESTIONS, {
    variables: { query: searchQuery },
    skip: activeFilter !== 'search' || !searchQuery.trim(),
  });

  // useQuery runs GET_QUESTIONS_BY_TAG when a tag filter is selected.
  // - variables: provides the selected tag as $tag.
  // - skip: prevents the query when there is no active tag.
  // - this gives us a dedicated data/loading/error state for tag results.
  const { 
    data: tagData, 
    loading: tagLoading, 
    error: tagError 
  } = useQuery(GET_QUESTIONS_BY_TAG, {
    variables: { tag: selectedTag },
    skip: activeFilter !== 'tag' || !selectedTag.trim(),
  });

  // Determine which data to display
  const getDisplayData = () => {
    switch (activeFilter) {
      case 'search':
        return {
          questions: searchData?.searchQuestions || [],
          loading: searchLoading,
          error: searchError,
        };
      case 'tag':
        return {
          questions: tagData?.questionsByTag || [],
          loading: tagLoading,
          error: tagError,
        };
      default:
        return {
          questions: questionsData?.questions || [],
          loading: questionsLoading,
          error: questionsError,
        };
    }
  };

  const { questions, loading, error } = getDisplayData();

  // Get unique tags from all questions for tag filter
  const allTags = Array.from(
    new Set(
      (questionsData?.questions || [])
        .flatMap(q => q.tags)
        .filter(tag => tag.length > 0)
    )
  ).sort();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveFilter('search');
    } else {
      setActiveFilter('all');
    }
  };

  const handleTagFilter = (tag: string) => {
    if (tag) {
      setSelectedTag(tag);
      setActiveFilter('tag');
    } else {
      setSelectedTag('');
      setActiveFilter('all');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag('');
    setActiveFilter('all');
  };

  if (error) {
    return (
      <div className="error-message">
        <h3>Error loading questions</h3>
        <p>{error.message}</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="question-list">
      {/* Search and Filter Controls */}
      <div className="list-controls">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            className="search-input"
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        <div className="filter-controls">
          <div className="sort-control">
            <label htmlFor="sort">Sort by:</label>
            <select 
              id="sort"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as SortOrder)}
              disabled={activeFilter !== 'all'}
            >
              <option value={SortOrder.NEWEST}>Newest First</option>
              <option value={SortOrder.OLDEST}>Oldest First</option>
              <option value={SortOrder.MOST_VOTED}>Most Voted</option>
              <option value={SortOrder.LEAST_VOTED}>Least Voted</option>
            </select>
          </div>

          <div className="tag-filter">
            <label htmlFor="tag-select">Filter by tag:</label>
            <select
              id="tag-select"
              value={selectedTag}
              onChange={(e) => handleTagFilter(e.target.value)}
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          {activeFilter !== 'all' && (
            <button className="btn btn-secondary" onClick={clearFilters}>
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Indicator */}
      {activeFilter === 'search' && (
        <div className="filter-indicator">
          <p>Showing search results for: <strong>"{searchQuery}"</strong></p>
        </div>
      )}

      {activeFilter === 'tag' && (
        <div className="filter-indicator">
          <p>Showing questions tagged: <strong>{selectedTag}</strong></p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="loading-message">
          <p>Loading questions...</p>
        </div>
      )}

      {/* Questions List */}
      {!loading && (
        <>
          <div className="questions-header">
            <h2>
              {activeFilter === 'search' ? 'Search Results' : 
               activeFilter === 'tag' ? `Questions tagged "${selectedTag}"` : 
               'All Questions'}
            </h2>
            <span className="question-count">
              {questions.length} question{questions.length !== 1 ? 's' : ''}
            </span>
          </div>

          {questions.length === 0 ? (
            <div className="no-questions">
              <p>
                {activeFilter === 'search' ? 'No questions found for your search.' :
                 activeFilter === 'tag' ? `No questions found with tag "${selectedTag}".` :
                 'No questions yet. Be the first to ask one!'}
              </p>
              {activeFilter !== 'all' && (
                <button className="btn btn-primary" onClick={clearFilters}>
                  View All Questions
                </button>
              )}
            </div>
          ) : (
            <div className="questions-grid">
              {questions.map((question) => (
                <QuestionCard 
                  key={question.id} 
                  question={question} 
                  onEdit={onEditQuestion}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};