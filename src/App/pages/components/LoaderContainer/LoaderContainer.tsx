import React from 'react';
import Loader from '@components/Loader';
import styles from './LoaderContainer.module.scss';

interface LoaderContainerProps {
  size?: 's' | 'm' | 'l';
}

 const LoaderContainer: React.FC<LoaderContainerProps> = ({ size = 'l' }) => {
  return (
    <div className={styles.container}>
      <Loader size={size} />
    </div>
  );
};

export default LoaderContainer;
