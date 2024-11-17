import classNames from 'classnames';
import React from 'react';
import styles from '../../RecipesList.module.scss';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalResults: number;
  number: number;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  onPageChange, 
  totalResults, 
  number 
}) => {
  // Если нет результатов, не показываем пагинацию
  if (!totalResults) return null;

  // Рассчитываем реальное количество страниц
  const actualTotalPages = Math.ceil(totalResults / number);
  
  // Ограничиваем максимальным значением 9
  const totalPages = Math.min(actualTotalPages, 9);
  
  // Если страница всего одна, не показываем пагинацию
  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }).map((_, index) => (
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
}; 

export default Pagination;
