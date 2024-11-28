import classNames from 'classnames';
import React from 'react';
import ArrowRound from '@assets/arrow-round.svg?react';
import ArrrowRoundtwo from '@assets/arrow-round_copy.svg?react';
import styles from './Pagination.module.scss';

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

 const pages: (number | string)[] = [1];
  // Добавляем '...' если текущая страница больше 3
  if (currentPage > 3) {
    pages.push('...');
  }

  // Добавляем страницы вокруг текущей
  for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
    pages.push(i);
  }

  // Добавляем '...' если текущая страница меньше максимальной
  if (currentPage < totalPages - 2) {
    pages.push('...');
  }

  // Добавляем последнюю страницу
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return (
    <div className={styles.pagination}>
      <button
        className={classNames(styles.pageButton, { [styles.disabled]: currentPage === 1 })}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        type='button'
      >
        <ArrowRound  />
      </button>

      {pages.map((page, index) => (
        <button
          key={index}
          className={classNames(styles.pageButton, {
            [styles.active]: page === currentPage,
            [styles.dots]: page === '...'
          })}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}

      <button
        className={classNames(styles.pageButton, { [styles.disabled]: currentPage === totalPages })}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        type='button'
        
      >
        <ArrrowRoundtwo />
      </button>
    </div>
  );
}; 

export default Pagination;
