import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import passupdate from '../../assets/images/icons/eye_close.svg';
import passwordicon from '../../assets/images/icons/eye_open.svg';
import Reusable from './Reusable';
import CryptoJS from 'crypto-js';
import base_url from '../../services/api';


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    occupation: '',
    aboutMe: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    occupation: '',
    password: '',
    confirmPassword: ''
  });
  const [submitted, setSubmitted] = useState(false); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
const [loading, setLoading] = useState(false);

  const validateInput = () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;
    let errorMessages = { ...errors };

    if (!firstName) errorMessages.firstName = 'This field is required';
    if (!lastName) errorMessages.lastName = 'This field is required';
    if (!email) errorMessages.email = 'This field is required';
    if (!password) errorMessages.password = 'This field is required';
    if (password !== confirmPassword) errorMessages.confirmPassword = 'Passwords do not match';

    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validEmailRegex.test(email)) errorMessages.email = 'Invalid email address';

    const minLength = 8;
    const capitalLetterRegex = /[A-Z]/;
    const smallLetterRegex = /[a-z]/;
    const numberRegex = /\d/;
    const symbolRegex = /[!"#$%&'()*+,-./:;<=>?@[\\\]_`{|}~]/;

    if (password.length < minLength) {
      errorMessages.password = `Password must be at least ${minLength} characters long.`;
    } else if (!capitalLetterRegex.test(password)) {
      errorMessages.password = 'Password must contain at least one capital letter.';
    } else if (!smallLetterRegex.test(password)) {
      errorMessages.password = 'Password must contain at least one small letter.';
    } else if (!numberRegex.test(password)) {
      errorMessages.password = 'Password must contain at least one number.';
    } else if (!symbolRegex.test(password)) {
      errorMessages.password = 'Password must contain at least one special character.';
    }
    
    setErrors(errorMessages);
    return Object.values(errorMessages).every((msg) => msg === '');
  };

  function hashPassword(password) {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
}



const  callSignupAPI = async (userId, email, hashedPassword) => {
  setLoading(true);
  const { aboutMe, occupation } = formData;

    localStorage.setItem('email',email.toLowerCase());
    localStorage.setItem('user_name',userId);
    localStorage.setItem('user_password',hashedPassword);
    localStorage.setItem('about',aboutMe);
    localStorage.setItem('user_location',occupation);

      const raw = JSON.stringify({
      email: email.toLowerCase(),
      password: hashedPassword,
      user_name: userId,
      about: aboutMe,
      location: occupation
    });
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: raw,
      redirect: "follow"
    };
    
    try {
      const response = await fetch(base_url + '/signup', requestOptions);
      const result = await response.json();
      if (result.error !== 'none') {
        alert('Error: ' + result.error);
      } else {
        navigate('/Auth/Emailotp');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
    finally{
      setLoading(false);
    }
};

const handleSignUp = () => {
 
  setSubmitted(true);
  if (!validateInput()) return;

  const { firstName, lastName, email, password } = formData;
  const userId = `${firstName} ${lastName}`;
  const hashedPassword = hashPassword(password);

  callSignupAPI(userId, email, hashedPassword);
};

const handleChange = (e) => {
const { name, value } = e.target;
setFormData({
  ...formData,
  [name]: value,
});

if (name === 'confirmPassword' && value !== formData.password) {
  setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
} else {
  setErrors((prev) => ({ ...prev, [name]: '' }));
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
const [isHovered, setIsHovered] = useState(false);
const [isActive, setIsActive] = useState(false);

return (
  <div style={styles.signupPage}>
    <Reusable/>

    <div style={styles.formSide}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Sign up</h2>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>First name <span style={styles.asterisk}>*</span></label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={styles.input}
            />
            {submitted && !formData.firstName && <span style={styles.errorText}>{errors.firstName}</span>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Last name <span style={styles.asterisk}>*</span></label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              style={styles.input}
            />
            {submitted && !formData.lastName && <span style={styles.errorText}>{errors.lastName}</span>}
          </div>
        </div>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Id <span style={styles.asterisk}>*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
            {submitted && !formData.email && <span style={styles.errorText}>{errors.email}</span>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Occupation <span style={styles.asterisk}>*</span></label>
            <select
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select...</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="guest">Guest</option>
            </select>
            {submitted && !formData.occupation && <span style={styles.errorText}>{errors.occupation}</span>}
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>About Me</label>
          <textarea
            name="aboutMe"
            value={formData.aboutMe}
            onChange={handleChange}
            style={styles.textArea}
          />
        </div>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password <span style={styles.asterisk}>*</span></label>
            <div style={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  borderColor: errors.password ? 'red' : undefined,
                }}
              />
              <img
                src={showPassword ? passupdate : passwordicon}
                alt="Toggle Password Visibility"
                onClick={togglePasswordVisibility}
                style={styles.passwordIcon}
              />
            </div>
            {submitted && errors.password && <span style={styles.errorText}>{errors.password}</span>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password <span style={styles.asterisk}>*</span></label>
            <div style={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  borderColor: errors.confirmPassword ? 'red' : undefined,
                }}
              />
              <img
                src={showPassword ? passupdate : passwordicon}
                alt="Toggle Password Visibility"
                onClick={togglePasswordVisibility}
                style={styles.passwordIcon}
              />
            </div>
            {submitted && errors.confirmPassword && <span style={styles.errorText}>{errors.confirmPassword}</span>}
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button onClick={handleSignUp}   style={{
    ...styles.signupButton,
    ...(isHovered ? styles.signupButtonHover : {}),
    ...(isActive ? styles.signupButtonActive : {}),
  }}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  onMouseDown={() => setIsActive(true)}
  onMouseUp={() => setIsActive(false)}>
            Sign up
          </button>
        </div>

        <div style={styles.loginText}>
          Already have an account? <a href="/Auth/login" style={styles.loginLink}>Log in</a>
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
  signupPage: {
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
    position: 'absolute',
    top: '10px',
    left: '20px',
    width: '20vh',
  },
  poweredBy: {
    position: 'absolute',
    bottom: '25px',
    left: '25px',
    width: '20vh',
  },
  formSide: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  formContainer: {
    width: '100%',
    maxWidth: '70vh',
    padding: '2vh',
    '@media (max-width: 768px)': { 
      maxWidth: '60vw', 
    },
  },
  heading: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '2vw',
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: '6vh',
  },
  formRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  formGroup: {
    width: '48%',
    marginBottom: '2vh',
    maxWidth:'48vw'
  },
  label: {
    fontWeight: '400',
    fontSize:'1vw',
    marginBottom: '1.5vh',
    display: 'block',
  },
  asterisk: {
    color: 'red',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #777777',
    borderRadius: '8px',
    fontSize: '14px',
    
  },
  textArea: {
    width: '66vh',
    padding: '12px',
    height: '15vh',
    border: '1px solid #777777',
   
    borderRadius: '8px',
    fontSize: '14px',
    padding: '2vh',
    '@media (max-width: 768px)': { 
      maxWidth: '60vw', 
    },

  },
  passwordContainer: {
    position: 'relative',
  },
  passwordIcon: {
    position: 'absolute',
    right: '10px',
    top: '18px',
    cursor: 'pointer',
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: '20px',
  },
  signupButton: {
    backgroundColor: '#0069bd',
    color: '#fff',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
    transition: 'backgroundColor 0.3s ease', 
  },
  signupButtonHover: {
      backgroundColor: '#0056a3', 
    },
    signupButtonActive: {
      transform: 'scale(0.99)',
       backgroundColor: '#0056a3',  
    },
  loginText: {
    textAlign: 'center',
    marginTop: '15px',
  },
  loginLink: {
    color: '#0069bd',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
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
 
  
};

export default SignUp;