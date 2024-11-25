
import React, { useState, useEffect } from 'react';


import { useNavigate,Link } from 'react-router-dom';
import Reusable from './Reusable';
import base_url from '../../services/api';

const EmailVerifyOtp = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only numeric input
    if (!/^[0-9]$/.test(value) && value !== '') {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    // Move to the next input if the current one is filled
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      // If the current input is empty, focus the previous input
      if (!otp[index] && index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handleSubmit = () => {
    const otpString = otp.join('');
    const otpFilled = otpString.length === 6;

    if (otpFilled) {
   
      submitForm(otpString);
    } else {
      setIsValid(false); 
    }
  };

  useEffect(() => {
    document.getElementById('otp-input-0').focus();
  }, []);

  const submitForm = (otpString) => {
    const emailId = localStorage.getItem('email');
    const userName = localStorage.getItem('user_name');
    const password = localStorage.getItem('user_password');
    const about_user = localStorage.getItem('about');
    const location_user = localStorage.getItem('user_location');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": emailId,
      "otp": otpString,
      "user_name": userName,
      "password": password,
      "location": location_user,
      "about_me": about_user
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    setLoading(true);
    fetch(base_url + "/signup_verify_otp", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.error === "none") {
          if (result.valid === true || result.valid === "True") {
            sessionStorage.setItem('email', emailId);
            sessionStorage.setItem('otp', otpString);
            localStorage.removeItem('user_password');
            localStorage.removeItem('about');
            localStorage.removeItem('user_location');

            // Success logic
            sessionStorage.setItem('user_id', result.user_id);
            sessionStorage.setItem('user_name', result.user_name);
            sessionStorage.setItem('email', result.email);

            setTimeout(() => {
              navigate('/user/application');
            }, 5000);
          } else {
            // Show failure modal
            setTimeout(() => {
              navigate('/Auth/signup');
            }, 5000);
          }
        } else {
          alert("Invalid OTP. Please try again.");
        }
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false); 
    });
  };

  function callSignupAPI() {

    let email = localStorage.getItem('email');
    let userId = localStorage.getItem('user_name');
    let hashedPassword = localStorage.getItem('user_password');
    let about_user =  localStorage.getItem('about');
    let occup_user = localStorage.getItem('user_location');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "email": email,
        "password": hashedPassword,
        "user_name": userId,
        "about": about_user,
        "location": occup_user,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(base_url + "/signup", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (result.error !== "none") {
                alert("Error"+result.error);
            } 
        })
        .catch((error) => {
            console.error(error);
        });
}
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
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <div style={styles.container}>
      <Reusable/>
      <div style={styles.formSide}>
        <div style={styles.formContainer}>
          <h2 style={styles.heading}>Enter OTP</h2>
          <p style={styles.instructionText}>
            A verification email with your OTP is on its way to your inbox. Please check your email and enter the OTP to continue.
          </p>
          <div style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                id={`otp-input-${index}`}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                style={styles.otpInput}
                maxLength={1}
              />
            ))}
          </div>
          {!isValid && (
            <div style={styles.errorLabel}>
              Please enter a valid 6-digit OTP.
            </div>
          )}
         <div style={styles.link}>
         <Link onClick={callSignupAPI} style={styles.link} >Resend OTP</Link>
         </div>
          
          <div style={styles.mrg20T}>
            <button onClick={handleSubmit} style={{
        ...styles.submitButton,
        ...(isHovered ? styles.submitButtonHover : {}),
        ...(isActive ? styles.submitButtonActive : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}>Verify OTP</button>
          </div>
          {loading && (
      <div style={styles.loaderOverlay}>
        <div style={styles.loaderAnimation}></div>
      </div>
    )}
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
    overflow:'hidden'
  },
  imageSide: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
    position: 'relative',
    backgroundImage: 'url(/assets/images/full_pic.svg)', 
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right center',
    backgroundSize: 'contain',
  },
  logoContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  mmLogo: {
    zIndex: 4,
    position: 'absolute',
    top: '10px',
    left: '20px',
    width: '20vh',
    height: 'auto',
  },
  poweredBy: {
    zIndex: 4,
    position: 'absolute',
    bottom: '25px',
    left: '25px',
    width: '20vh',
    height: 'auto',
  },
  fullimg: {
    width: '100%',
    maxWidth: '100vh',
    height: 'auto',
    marginTop: '10px',
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
  otpContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  otpInput: {
    width: '3vw',
    height: '5.5vh',
    textAlign: 'center',
    fontSize: '24px',
    border: '1px solid #0069bd',
    borderRadius: '8px',
    margin: '0 5px',
    boxShadow: 'none',
    transition: 'border 0.3s ease',
    outline: 'none',
    marginBottom:'10px'
  },
  errorLabel: {
    color: 'red',
    marginBottom: '10px',
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
    transform: 'scale(0.97)', // Slightly reduce size on click
  },
  link: {
    color: '#0069bd',
    textDecoration: 'underline',
    fontSize: '16px',
    fontWeight: '500',
    marginTop:'2vh',
    marginBottom:'5vh',
   

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

export default EmailVerifyOtp;
