import React from 'react';
import styles from './ErrorPage.module.css';
import errorImage from '../../../assets/images/400Error.svg'; // Adjust the path as necessary

const ErrorPage = () => {
  return (
    <div className={styles.errorPage}>
      <img src={errorImage} alt="400 (Bad Request)" className={styles.errorImage} />
    </div>
  );
};

export default ErrorPage;
