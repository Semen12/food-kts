import classNames from 'classnames';
import React from 'react';
import styles from '../../RecipesList.module.scss';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange }) => (
  <div className={styles.pagination}>
    {[...Array(9)].map((_, index) => (
      <button
        key={index}
        className={classNames(styles.pageButton, {
          [styles.active]: currentPage === index + 1,
        })}
        onClick={() => onPageChange(index + 1)}
      >
        {index + 1}
      </button>
    ))}
  </div>
); 

export default Pagination;
