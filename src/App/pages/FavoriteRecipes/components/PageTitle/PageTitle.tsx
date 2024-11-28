import React from 'react';
import ArrowRound from '@assets/arrow-round.svg?react';
import styles from './PageTitle.module.scss';

interface PageTitleProps {
  title: string;
  onBack: () => void;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, onBack }) => {
  return (
    <h1 className={styles.title}>
      <button onClick={onBack} className={styles.backButton}>
        <ArrowRound />
      </button>
      {title}
    </h1>
  );
};

export default PageTitle; 