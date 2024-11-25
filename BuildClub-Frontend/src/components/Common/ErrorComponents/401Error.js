import React from 'react';
import styles from './ErrorPage.module.css';
import errorImage from '../../../assets/images/401Error.svg'; // Adjust the path as necessary

const ErrorPage = () => {
  return (
    <div className={styles.errorPage}>
      <img src={errorImage} alt="401 (Unauthorized Error)" className={styles.errorImage} />
    </div>
  );
};

export default ErrorPage;
