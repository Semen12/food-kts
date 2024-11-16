import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Option } from '@components/MultiDropdown';
import { RecipesStore } from '@store/RecipesStore/RecipesStore';

interface UseSearchProps {
  recipesStore: RecipesStore;
}

export const useSearch = ({ recipesStore }: UseSearchProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchInputValue, setSearchInputValue] = useState('');
  const [appliedSearchValue, setAppliedSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(() => 
    Number(searchParams.get('page')) || 1
  );
  const [selectedTypes, setSelectedTypes] = useState<Option[]>(() => {
    const types = searchParams.get('type');
    return types 
      ? types.split(',').map(type => ({
          key: type,
          value: type
        }))
      : [];
  });
  const [isListLoading, setIsListLoading] = useState(false);

  useEffect(() => {  
    setIsListLoading(true);
    recipesStore.getRecipesList({
      page: currentPage,
      query: appliedSearchValue,
      type: selectedTypes.map(type => type.value)
    }).finally(() => {
      setIsListLoading(false);
    });
    setSearchParams({
      page: currentPage.toString(),
      search: appliedSearchValue,
      type: selectedTypes.map(type => type.value).join(',')
    });
  }, [currentPage, selectedTypes, recipesStore, appliedSearchValue]);

  return {
    searchInputValue,
    setSearchInputValue,
    appliedSearchValue,
    setAppliedSearchValue,
    currentPage,
    setCurrentPage,
    selectedTypes,
    setSelectedTypes,
    isListLoading
  };
}; 