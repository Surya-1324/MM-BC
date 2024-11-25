import React, { useState,useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';

import passupdate from '../../assets/images/icons/eye_close.svg';
import passwordicon from '../../assets/images/icons/eye_open.svg';
import Reusable from './Reusable';
import CryptoJS from 'crypto-js';
import base_url from '../../services/api';


const validatePassword = (password) => {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return password.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
};

const Reset = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true); // New state for password validation
  const[loading,setLoading]=useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;

    if (id === 'new_password') {
      setNewPassword(value);
      setPasswordValid(validatePassword(value)); // Validate password on change
    } else if (id === 'confirm_password') {
      setConfirmPassword(value);
    }

    // Check if passwords match
    setPasswordsMatch(newPassword === value || value === newPassword);
  };

  function hashPassword(password) {
    // Hash the password using SHA-256 algorithm
    return CryptoJS.SHA256(password).toString();
}

  function submit(emailId,otp,hashedPassword){
    // console.log("Email1",emailId)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
        "email": emailId,
        'otp':String(otp),
        'password':hashedPassword
    });
    
    
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    setLoading(true);
    fetch(base_url+"/reset_password", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (result.error === "none") {
              alert(result.message);
                navigate('/Auth/resetdone')                
            } else {
                alert("Error");
            }
        })
        .catch((error) => {
            console.error(error)})
            .finally(() => {
              setLoading(false); 
          });
    
        }

  const handlePasswordReset = () => {
    if (newPassword === confirmPassword && passwordValid) {
        const emailId = sessionStorage.getItem('email');
        const otp=sessionStorage.getItem('otp')
        const password=document.getElementById('new_password').value
        const confirm_password=document.getElementById('confirm_password').value
        const hashedPassword = hashPassword(password);

        // console.log(hashedPassword)

        if (password==confirm_password){
        submit(emailId,otp,hashedPassword)
        }
        else{
            alert('Password and Confirm Password is not Matching')
            // console.log(password)
        }
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
    <div style={styles.loginPage}>
      <Reusable/>
      <div style={styles.formSide}>
        <div style={styles.formContainer}>
          <h2 style={styles.heading}>Reset Your Password</h2>
          <p style={styles.instructionText}>
            Please enter your new password and confirm it to reset your password.
          </p>

          <div style={styles.formGroup}>
            <label htmlFor="new_password" style={styles.label}>New Password</label>
            <input 
              id="new_password" 
              type={showPassword ? "text" : "password"} 
              value={newPassword}
              onChange={handlePasswordChange}
              style={styles.input} 
            />
            <span 
              onClick={togglePasswordVisibility} 
              style={styles.showPasswordIcon}
              title={showPassword ? "Hide password" : "Show password"}
            >
              <img 
                src={showPassword ? passwordicon : passupdate} 
                alt={showPassword ? "Hide password icon" : "Show password icon"} 
                style={{ width: '30px', height: '30px' }} 
              />
            </span>
            {!passwordValid && <div style={{ color: 'red', fontSize: '12px' }}>Password must be at least 8 characters long and include uppercase, lowercase, number, and special character!</div>}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="confirm_password" style={styles.label}>Confirm Password</label>
            <input 
              id="confirm_password" 
              type={showPassword ? "text" : "password"} 
              value={confirmPassword}
              onChange={handlePasswordChange}
              style={styles.input} 
            />
            <span 
              onClick={togglePasswordVisibility} 
              style={styles.showPasswordIcon}
              title={showPassword ? "Hide password" : "Show password"}
            >
              <img 
                src={showPassword ? passwordicon : passupdate} 
                alt={showPassword ? "Hide password icon" : "Show password icon"} 
                style={{ width: '30px', height: '30px' }} 
              />
            </span>
            {!passwordsMatch && <div style={{ color: 'red', fontSize: '12px' }}>Passwords do not match!</div>}
          </div>

          <div style={styles.mrg20T}>
            <a 
              onClick={handlePasswordReset} 
              style={{
                ...styles.loginButton,
                ...(isHovered ? styles.loginButtonHover : {}),
                ...(isActive ? styles.loginButtonActive : {}),
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseDown={() => setIsActive(true)}
              onMouseUp={() => setIsActive(false)}
              disabled={!passwordsMatch || !newPassword || !confirmPassword || !passwordValid} // Disable if validation fails
            >
              Reset Password
            </a>
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
  loginPage: {
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
  },
  instructionText: {
    fontSize: '14px', 
    color: '#666',
    textAlign: 'center',
    marginBottom: '25px', 
  },
  heading: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '24px',
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: '30px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'serif',
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
  showPasswordIcon: {
    cursor: 'pointer',
    float: 'right',
    marginTop: '-35px',
    marginRight: '10px',
    position: 'relative',
  },
  mrg20T: {
    marginTop: '20px',
  },
  loginButton: {
    background: '#0069bd',
    color: '#fff',
    border: '1px solid #0069bd',
    borderRadius: '40px',
    height: '45px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '9px 14px',
    textDecoration: 'none',
    marginTop: '30px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'background-color 0.3s ease, transform 0.2s ease', // Add transitions
  },
  loginButtonHover: {
    background: '#0056a3', 
  },
  loginButtonActive: {
    transform: 'scale(0.97)',
  },
  errorLabel: {
    color: 'red',
    marginTop: '5px',
    fontSize: '12px',
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

export default Reset;
