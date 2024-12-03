import React, { useState, useEffect } from 'react';
import Loading from '../../components/Common/loading'; 
import base_url from '../../services/api';

const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState('General');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {

    setUserId(sessionStorage.getItem('user_id'));
  }, []);

  const handleFeedbackTypeChange = (type) => {
    setFeedbackType(type);
  };

  const handleFeedbackMessageChange = (e) => {
    const message = e.target.value;
    const wordCount = message.split(/\s+/).filter(Boolean).length;

    if (wordCount <= 50) {
      setFeedbackMessage(message);
    }
  };

  const submitFeedback = async () => {
    setLoading(true);
    try {
      const feedbackData = {
        user_id: userId,
        feedback: {
          type: feedbackType,
          message: feedbackMessage,
        },
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(base_url+'/update_all_feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      const result = await response.json();

      if (response.ok && result.error === 'none') {
        setIsSubmitted(true);
        setErrorMessage('');
        console.log('feedback sent');
     
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        throw new Error(result.message || 'Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setErrorMessage('Failed to submit feedback. Please try again.');
    }
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (!isSubmitted) {
      submitFeedback();
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '75vh'
    }}>
      <div style={{
        maxWidth: '27.78vw',
        width: '40%',
        padding: '1.39vw',
        border: '0.07vw solid #eaeaea',
        borderRadius: '0.56vw',
        fontFamily: '"Poppins", sans-serif',
        minWidth: '15vw',
        maxWidth: '35vw'
      }}>

        <div style={{ marginBottom: '1.11vw' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.56vw',
            fontWeight: '500',
            color: '#222222',
            fontSize: '1.25vw' // 18px / 1440px * 100 = 1.25vw
          }}>
            Feedback Type *
          </label>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              type="button"
              onClick={() => handleFeedbackTypeChange('General')}
              style={{
                flex: 1,
                padding: '0.69vw',
                backgroundColor: feedbackType === 'General' ? '#0069bd' : '#fff',
                color: feedbackType === 'General' ? '#fff' : '#000',
                border: '0.07vw solid #ccc',
                borderTopLeftRadius: '0.28vw',
                borderBottomLeftRadius: '0.28vw',
                cursor: 'pointer',
                fontFamily: '"Poppins", sans-serif',
                fontSize: '1.11vw' // 16px / 1440px * 100 = 1.11vw
              }}
            >
              General
            </button>
            <button
              type="button"
              onClick={() => handleFeedbackTypeChange('Bug')}
              style={{
                flex: 1,
                padding: '0.69vw',
                backgroundColor: feedbackType === 'Bug' ? '#0069bd' : '#fff',
                color: feedbackType === 'Bug' ? '#fff' : '#000',
                border: '0.07vw solid #ccc',
                cursor: 'pointer',
                fontFamily: '"Poppins", sans-serif',
                fontSize: '1.11vw'
              }}
            >
              Bug
            </button>
            <button
              type="button"
              onClick={() => handleFeedbackTypeChange('Idea')}
              style={{
                flex: 1,
                padding: '0.69vw',
                backgroundColor: feedbackType === 'Idea' ? '#0069bd' : '#fff',
                color: feedbackType === 'Idea' ? '#fff' : '#000',
                border: '0.07vw solid #ccc',
                borderTopRightRadius: '0.28vw',
                borderBottomRightRadius: '0.28vw',
                cursor: 'pointer',
                fontFamily: '"Poppins", sans-serif',
                fontSize: '1.11vw'
              }}
            >
              Idea
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '1.11vw' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.56vw',
            fontWeight: '500',
            color: '#222222',
            fontSize: '1.25vw'
          }}>
            Feedback Message *
          </label>
          <textarea
            value={feedbackMessage}
            onChange={handleFeedbackMessageChange}
            placeholder="Enter your feedback here!"
            style={{
              width: '100%',
              padding: '0.69vw',
              border: '0.07vw solid #ccc',
              borderRadius: '0.28vw',
              minHeight: '9.77vh',
              fontFamily: '"Poppins", sans-serif',
              outlineColor: '#0069bd',
              fontSize: '1.11vw'
            }}
          />
          <div style={{ fontSize: '0.83vw', color: '#999' }}>
            {50 - feedbackMessage.split(/\s+/).filter(Boolean).length} words
          </div>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '0.83vw',
            backgroundColor: '#0069bd',
            color: '#fff',
            border: 'none',
            borderRadius: '0.28vw',
            cursor: 'pointer',
            fontSize: '1.11vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Poppins", sans-serif',
            minHeight: '5vh',
            maxHeight: '7vh'
          }}
          disabled={isSubmitted}
        >
          {isSubmitted ? 'Thanks!' : 'Send Feedback'}
        </button>
        {errorMessage && (
          <div style={{ color: 'red', fontSize: '1.11vw', marginTop: '1vw' }}>
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
