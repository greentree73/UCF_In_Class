import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Question, CreateQuestionInput, UpdateQuestionInput } from '../types/graphql';
import { CREATE_QUESTION, UPDATE_QUESTION, GET_QUESTIONS } from '../graphql/queries';

interface QuestionFormProps {
  editingQuestion?: Question | null;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  editingQuestion,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    author: '',
    tags: '',
  });

  // useMutation returns:
  // 1) a function we call to execute the mutation (createQuestion)
  // 2) mutation state metadata (loading in this case)
  // refetchQueries re-runs GET_QUESTIONS after create to keep the list fresh.
  const [createQuestion, { loading: creating }] = useMutation(CREATE_QUESTION, {
    refetchQueries: [{ query: GET_QUESTIONS }],
  });

  // Same useMutation pattern for updates.
  // updateQuestion(...) triggers the UpdateQuestion mutation,
  // and loading state is exposed as `updating`.
  const [updateQuestion, { loading: updating }] = useMutation(UPDATE_QUESTION, {
    refetchQueries: [{ query: GET_QUESTIONS }],
  });

  // Populate form when editing
  useEffect(() => {
    if (editingQuestion) {
      setFormData({
        title: editingQuestion.title,
        body: editingQuestion.body,
        author: editingQuestion.author,
        tags: editingQuestion.tags.join(', '),
      });
    } else {
      // Reset form for new questions
      setFormData({
        title: '',
        body: '',
        author: '',
        tags: '',
      });
    }
  }, [editingQuestion]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.title.trim() || !formData.body.trim() || !formData.author.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      if (editingQuestion) {
        // Update existing question
        const input: UpdateQuestionInput = {
          title: formData.title.trim(),
          body: formData.body.trim(),
          tags: formData.tags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0),
        };

        await updateQuestion({
          // Variables object keys must match mutation variable names:
          // mutation UpdateQuestion($id: ID!, $input: UpdateQuestionInput!)
          // Calling updateQuestion(...) sends this payload to Apollo Client,
          // which executes the GraphQL mutation over HTTP.
          variables: {
            id: editingQuestion.id,
            input,
          },
        });
      } else {
        // Create new question
        const input: CreateQuestionInput = {
          title: formData.title.trim(),
          body: formData.body.trim(),
          author: formData.author.trim(),
          tags: formData.tags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0),
        };

        await createQuestion({
          // { input } maps directly to $input in CreateQuestion($input: CreateQuestionInput!)
          // Calling createQuestion(...) executes the mutation and returns a promise.
          variables: { input },
        });

        // Reset form after successful creation
        setFormData({
          title: '',
          body: '',
          author: '',
          tags: '',
        });
      }

      // Call success callback
      onSubmit?.();
    } catch (error) {
      console.error('Error saving question:', error);
      alert('Error saving question. Please try again.');
    }
  };

  const isLoading = creating || updating;

  return (
    <div className="question-form">
      <h3>{editingQuestion ? 'Edit Question' : 'Ask a New Question'}</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="What's your question about?"
            maxLength={120}
            required
            disabled={isLoading}
          />
          <small className="char-count">{formData.title.length}/120</small>
        </div>

        <div className="form-group">
          <label htmlFor="body">Description *</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            placeholder="Provide more details about your question..."
            rows={6}
            maxLength={1000}
            required
            disabled={isLoading}
          />
          <small className="char-count">{formData.body.length}/1000</small>
        </div>

        {!editingQuestion && (
          <div className="form-group">
            <label htmlFor="author">Your Name *</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
              disabled={isLoading}
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="javascript, react, css (separate with commas)"
            disabled={isLoading}
          />
          <small className="help-text">Add up to 5 tags, separated by commas</small>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading 
              ? (editingQuestion ? 'Updating...' : 'Creating...')
              : (editingQuestion ? 'Update Question' : 'Post Question')
            }
          </button>
          
          {(editingQuestion || onCancel) && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};