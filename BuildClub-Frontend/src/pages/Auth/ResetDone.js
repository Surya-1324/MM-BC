import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import successImage from '../../assets/images/icons/success_image.svg'; 

import Reusable from './Reusable';
const ResetDone = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/Auth/login'); 
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
    <Reusable/>

      <div style={styles.formSide}>
        <img src={successImage} alt="Reset Successful" style={styles.image} />
        <h2 style={styles.heading}>Password Reset Successful!</h2>
        <p style={styles.instructionText}>
          Your password has been reset successfully. You will be redirected shortly.
        </p>
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
  formSide: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    textAlign: 'center',
  },
  image: {
    width: '150px', // Adjust size as needed
    height: 'auto',
    marginBottom: '20px',
  },
  heading: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: '10px',
  },
  instructionText: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '20px',
  },
};

export default ResetDone;
