import React from 'react';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  title: string;
  message?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ title, message }) => {
  return (
    <div className={styles.errorWrapper}>
      <div className={styles.errorContainer}>
        <h3>{title}</h3>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}; 