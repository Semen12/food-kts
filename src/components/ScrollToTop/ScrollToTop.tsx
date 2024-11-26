import React, { useState, useEffect } from 'react';
import styles from './ScrollToTop.module.scss';
import ArrowUp from '@assets/arrow-up.svg?react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Проверяем позицию скролла
  const toggleVisibility = () => {
    if (window.scrollY > 700) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Функция для скролла наверх
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          className={styles.scrollToTop}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp />
        </button>
      )}
    </>
  );
};

export default ScrollToTop; 