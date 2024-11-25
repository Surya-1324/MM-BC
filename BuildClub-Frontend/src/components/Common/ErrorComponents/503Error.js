import React from 'react';
import styles from './ErrorPage.module.css'; // Import the CSS module
import errorImage from '../../../assets/images/503Error.svg'; // Adjust the path as necessary

const ErrorPage = () => {
  return (
    <div className={styles.errorPage}>
      <img src={errorImage} alt="503 (Service Unavailable)" className={styles.errorImage} />
    </div>
  );
};

export default ErrorPage;
