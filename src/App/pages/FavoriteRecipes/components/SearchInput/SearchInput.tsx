import React from 'react';
import DeleteIcon from '@components/icons/DeleteIcon';
import styles from './SearchInput.module.scss';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={styles.searchInput}
        />
        {value && (
          <DeleteIcon 
            className={styles.clearIcon} 
            onClick={() => onChange('')}
          />
        )}
      </div>
    </div>
  );
};

export default SearchInput; 