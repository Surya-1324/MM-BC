import React from 'react';
import styles from './ErrorPage.module.css'; // Import the CSS module
import errorImage from '../../../assets/images/403Error.svg'; // Adjust the path as necessary

const ErrorPage = () => {
  return (
    <div className={styles.errorPage}>
      <img src={errorImage} alt="403 (Forbidden)" className={styles.errorImage} />
    </div>
  );
};

export default ErrorPage;
