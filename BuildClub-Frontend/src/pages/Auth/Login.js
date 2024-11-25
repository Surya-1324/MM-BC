
import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Reusable from './Reusable';
import passupdate from '../../assets/images/icons/eye_close.svg';
import passwordicon from '../../assets/images/icons/eye_open.svg';
import CryptoJS from 'crypto-js';
import { useAuth } from '../../Routes/AuthContext';
import base_url from '../../services/api';


const Login = ({userData, fetchUserData}) => {
  const {  authenticateUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  // const [userData, setUserData] = useState({});

  const navigate = useNavigate();
    
  useEffect(() => {

    const currentUser = userData;

    if (currentUser) {
      setUserName(currentUser.username);
      setEmail(currentUser.email);
    }
  
  }, [])

  function validateEmail(email) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return validRegex.test(email);
}

  function hashPassword(password) {
    // Hash the password using SHA-256 algorithm
    return CryptoJS.SHA256(password).toString();
}

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false); // Reset the error when the user starts typing again
  };
  
  function validateAndLogin() {
    const emailId = document.getElementById('email_id').value;
    var password = document.getElementById('password').value;


    if (!emailId || !password) {
        alert("Username or password is missing");
        return;
    }

    // Validate if email is a valid email address
    if (!validateEmail(emailId)) {
        alert("Please enter a valid email address");
        return;
    }
    const hashedPassword = hashPassword(password);
    setLoading(true);
    login(emailId, hashedPassword);
}

function login(email_Id, hashedPassword) {
  let emailId = email_Id.toLowerCase();
  // console.log("pass1",hashedPassword)
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
      "email": emailId,
      "password": hashedPassword
  });

  const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
  };

  fetch(base_url+"/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
          setLoading(false); 
          if (result.error === "none" && (result.valid === true || result.valid === "True")) {
              sessionStorage.setItem('user_id', result.user_id);
              authenticateUser();
             fetchUserData();
              navigate("/user/motor-log");
          } else if (result.error === "none" && (result.valid === false || result.valid === "False")) {
              var failureModal = document.getElementById('failureModal');
              if (failureModal) {
                  failureModal.classList.add('show');
                  failureModal.style.display = 'block';
                  setTimeout(function() {
                      failureModal.classList.remove('show');
                      failureModal.style.display = 'none';
                      navigate("/");
                  }, 5000);
              }
          } else {
              alert("Login Error: Invalid email or password");
          }
          
      })
      .catch((error) => {
          console.error(error)
        });
          
          
}


  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = spinKeyframes;
    document.head.appendChild(styleSheet);
  }, []);
  return (
    <div style={styles.loginPage}>
      <Reusable />
     
      <div style={styles.formSide}>
        <div style={styles.formContainer}>
          <div style={styles.welcomeText}>Welcome</div>
          <h2 style={styles.heading}>Login to your account</h2>

          <div style={styles.formGroup}>
            <label htmlFor="email_id" style={styles.label}>Email ID</label>
            <input type="text" id="email_id" style={styles.input} />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={passwordError ? styles.errorLabel : styles.label}>
              {passwordError ? "Password doesn't match" : "Password"}
            </label>
            <input 
              id="password" 
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={handlePasswordChange}
              style={passwordError ? styles.errorInput : styles.input}
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
          </div>

          <div style={styles.forgotPassword}>
            <Link to="/Auth/forget-password" style={styles.fpass}>Forgot password?</Link>
          </div>

          <div style={styles.mrg20T}>
            <a 
              onClick={validateAndLogin} 
              style={{
                ...styles.loginButton,
                ...(isHovered ? styles.loginButtonHover : {}),
                ...(isActive ? styles.loginButtonActive : {}),
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseDown={() => setIsActive(true)}
              onMouseUp={() => setIsActive(false)}
            >
              Login
            </a>
          </div>
          {loading && (
            <div style={styles.loaderOverlay}>
              <div style={styles.loaderAnimation}></div>
            </div>
          )}
          <div style={styles.registerLink}>
            Don't have an account? <Link to="/Auth/signup" style={styles.link}>Sign Up</Link>
          </div>
         
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
  welcomeText: {
    color: '#000000',
    fontWeight: 300,
    fontSize: '18px',
    marginTop: '10px',
  },
  heading: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: '50px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'serif',
  },
  errorLabel: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'serif',
    color: 'red', // Red color for error state
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
    border: '1px solid red', // Red border for error state
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
  forgotPassword: {
    textAlign: 'right',
    marginBottom: '20px',
  },
  fpass: {
    color: '#0069bd',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600',
  },
  link: {
    color: '#0069bd',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: 'bold',
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
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  loginButtonHover: {
    background: '#0056a3',
  },
  loginButtonActive: {
    transform: 'scale(0.98)',
  },
  mrg20T: {
    marginTop: '20px',
  },
  registerLink: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px', 
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
const spinKeyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

export default Login;