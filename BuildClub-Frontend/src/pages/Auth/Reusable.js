import React from 'react';
import mmLogo from '../../assets/images/icons/mm_logo.svg';
import poweredByLogo from '../../assets/images/poweredby.svg';
import full from '../../assets/images/icons/full_pic.svg';

const Reusable = () => {
  return (
    <div style={styles.imageSide}>
      <div style={styles.logoContainer}>
        <img src={mmLogo} alt="MM Logo" style={styles.mmLogo} />
        {/* New Text below MM Logo */}
        <div style={styles.greenText}>
          Build your <br />
          Motor <br />
          Effortlessly
        </div>
        <img src={poweredByLogo} alt="Powered by Logo" style={styles.poweredBy} />
      </div>
      <img src={full} alt="Success Image" className="img-fluid" style={styles.fullimg} />
    </div>
  );
};

const styles = {
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
    overflow:'hidden'
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
  greenText: {
    zIndex: 4,
    position: 'absolute',
    top: '160px',
    left: '60px',
    color: '#009400',
    fontWeight: '600',
    fontSize: '2vw',
    fontFamily: "'Poppins', sans-serif",
    lineHeight: '1.5', 
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
};

export default Reusable;
