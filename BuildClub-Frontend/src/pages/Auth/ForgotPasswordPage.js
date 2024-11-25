import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Reusable from './Reusable';
import base_url from '../../services/api';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false); 
  };

  const validateEmail = (email) => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return validRegex.test(email);
  };

  const handleSubmit = () => {
    const emailIds = document.getElementById('email').value;
    let emailId = emailIds.toLowerCase();

    localStorage.setItem('email_id',emailId)

    // Validate if email is a valid email address
    if (!validateEmail(email)) {
      setEmailError(true); 
    } else {
      setEmailError(false);
      setLoading(true);

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailId.toLowerCase() }),
        redirect: "follow"  
      };

      fetch(base_url + "/send_email_forgot_password", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setLoading(false);
          if (result.error === 'none') {
            sessionStorage.setItem('email', emailId);
            navigate('/Auth/otp');
          } else {
            alert('Your email is not valid');
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error('Error:', error);
        });
    }
  };
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleSheet);
  }, []); 

  return (
    <div style={styles.container}>
      <Reusable />
      <div style={styles.formSide}>
        <div style={styles.formContainer}>
          <h2 style={styles.heading}>Forgot Password</h2>
          <p style={styles.instructionText}>
            Please enter your registered email address. We’ll send you a link to reset your password.
          </p>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={emailError ? styles.errorLabel : styles.label}>
              Email ID <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              style={emailError ? styles.errorInput : styles.input}
              placeholder="Enter your email"
            />
            {emailError && <p style={styles.errorMessage}>Please enter a valid email address</p>}
          </div>
          <div style={styles.mrg20T}>
           
              <button
                onClick={handleSubmit}
                style={{
                  ...styles.submitButton,
                  ...(isHovered ? styles.submitButtonHover : {}),
                  ...(isActive ? styles.submitButtonActive : {}),
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseDown={() => setIsActive(true)}
                onMouseUp={() => setIsActive(false)}
              >
                Send OTP
              </button>
              {loading && (
            <div style={styles.loaderOverlay}>
              <div style={styles.loaderAnimation}></div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
  },
  formSide: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  formContainer: {
    width: '50%',
    maxWidth: '400px',
    padding: '5px',
    textAlign: 'center',
  },
  heading: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: '30px',
  },
  instructionText: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '25px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'flex',
    justifyContent: 'start',
    marginBottom: '8px',
    fontWeight: 'serif',
    fontSize: '15px',
  },
  errorLabel: {
    display: 'flex',
    justifyContent: 'start',
    marginBottom: '8px',
    fontWeight: 'serif',
    fontSize: '15px',
    color: 'red',
  },
  input: {
    width: '100%',
    padding: '16px 14px',
    border: '1px solid #777777',
    borderRadius: '12px',
    color: '#000',
    fontSize: '14px',
    height: '48px',
    boxShadow: 'none',
    appearance: 'menulist',
    transition: 'border 0.3s ease',
  },
  errorInput: {
    width: '100%',
    padding: '16px 14px',
    border: '1px solid red',
    borderRadius: '12px',
    color: '#000',
    fontSize: '14px',
    height: '48px',
    boxShadow: 'none',
    appearance: 'menulist',
    transition: 'border 0.3s ease',
  },
  errorMessage: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  },
  mrg20T: {
    marginTop: '20px',
  },
  submitButton: {
    backgroundColor: '#0069bd',
    color: '#fff',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  submitButtonHover: {
    backgroundColor: '#0056a3',
  },
  submitButtonActive: {
    transform: 'scale(0.97)',
  },
  loaderOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(255, 255, 255, 0.8)", /* Semi-transparent background */
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loaderAnimation: {
    border: "12px solid #f3f3f3", /* Light grey */
    borderTop: "12px solid #3498db", /* Blue */
    borderRight: "12px solid #32cd32", /* Light green */
    borderRadius: "50%",
    width: "80px",
    height: "80px",
    animation: "spin 2s linear infinite",
    position: "fixed",
    left: "50%", /* Center horizontally */
    top: "50%", /* Center vertically */
    transform: "translate(-50%, -50%)", /* Center in both directions */
    zIndex: 1000,
  },
};


export default ForgotPasswordPage;
