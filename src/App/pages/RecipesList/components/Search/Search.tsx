import React from 'react';
import styles from '../../RecipesList.module.scss';
import SearchIcon from '@assets/search.svg?react';
import Button from '@components/Button';
import Input from '@components/Input';
import MultiDropdown, { Option } from '@components/MultiDropdown';


import { MEAL_TYPES } from '../../types';


interface SearchProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  selectedTypes: Option[];
  onTypesChange: (types: Option[]) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // Добавлено свойство onKeyPress
  onClearSearch: () => void;
  onClearTypes: () => void;
}

 const Search: React.FC<SearchProps> = ({
  searchValue,
  onSearchChange,
  onSearch,
  onClearSearch,
  selectedTypes,
  onTypesChange,
  onClearTypes,
  onKeyPress
}) => (
  <div className={styles.search}>
    <Input
      className={styles.search__input}
      value={searchValue}
      onChange={onSearchChange}
      placeholder='Enter dishes'
      afterSlot={<Button onClick={onSearch}><SearchIcon /></Button>}
      onKeyPress={onKeyPress}
      onClear={onClearSearch}
    />
    <MultiDropdown
      className={styles.search__dropdown}
      options={MEAL_TYPES}
      value={selectedTypes}
      onChange={onTypesChange}
      getTitle={(selected) => 
        selected.length ? selected.map(s => s.value).join(', ') : 'Meal Types'
      }
      onClear={onClearTypes}
    />
  </div>
); 

export default Search;
