import React from 'react';
import { useMutation } from '@apollo/client';
import { Question } from '../types/graphql';
import { VOTE_QUESTION, DELETE_QUESTION, GET_QUESTIONS } from '../graphql/queries';

interface QuestionCardProps {
  question: Question;
  onEdit?: (question: Question) => void;
  showActions?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  onEdit, 
  showActions = true 
}) => {
  // useMutation gives us a function to trigger VOTE_QUESTION on demand.
  // We call voteQuestion(...) inside event handlers instead of on render.
  const [voteQuestion] = useMutation(VOTE_QUESTION);

  // Second useMutation for deleting a question.
  // refetchQueries runs GET_QUESTIONS after delete so UI matches server state.
  const [deleteQuestion] = useMutation(DELETE_QUESTION, {
    // Refetch questions after deletion
    refetchQueries: [{ query: GET_QUESTIONS }],
  });

  const handleVote = async (direction: number) => {
    try {
      await voteQuestion({
        // Variable mapping for VoteQuestion($id: ID!, $direction: Int!)
        // The component value question.id becomes $id, and function arg direction becomes $direction.
        // This is the mutation execution call returned by useMutation.
        variables: {
          id: question.id,
          direction,
        },
        // Optimistic response for immediate UI feedback
        optimisticResponse: {
          voteQuestion: {
            ...question,
            votes: question.votes + direction,
          },
        },
      });
    } catch (error) {
      console.error('Error voting on question:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await deleteQuestion({
          // Variable mapping for DeleteQuestion($id: ID!)
          // This executes the delete mutation for the selected question.
          variables: { id: question.id },
        });
      } catch (error) {
        console.error('Error deleting question:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimeAgo = (age: number) => {
    const seconds = Math.floor(age / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <h3 className="question-title">{question.title}</h3>
        {showActions && (
          <div className="question-actions">
            {onEdit && (
              <button 
                className="btn btn-secondary"
                onClick={() => onEdit(question)}
              >
                Edit
              </button>
            )}
            <button 
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="question-body">
        <p>{question.body}</p>
      </div>

      <div className="question-tags">
        {question.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="question-footer">
        <div className="question-meta">
          <span className="author">By {question.author}</span>
          <span className="date" title={formatDate(question.createdAt)}>
            {question.age ? getTimeAgo(question.age) : formatDate(question.createdAt)}
          </span>
        </div>

        {showActions && (
          <div className="voting-section">
            <button 
              className="vote-btn vote-up"
              onClick={() => handleVote(1)}
              title="Upvote"
            >
              ▲
            </button>
            <span className="vote-count">{question.votes}</span>
            <button 
              className="vote-btn vote-down" 
              onClick={() => handleVote(-1)}
              title="Downvote"
            >
              ▼
            </button>
          </div>
        )}
      </div>
    </div>
  );
};