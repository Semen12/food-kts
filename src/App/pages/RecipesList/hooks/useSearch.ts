import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Option } from '@components/MultiDropdown';
import { RecipesStore } from '@store/RecipesStore/RecipesStore';

interface UseSearchProps {
  recipesStore: RecipesStore;
}

export const useSearch = ({ recipesStore }: UseSearchProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchInputValue, setSearchInputValue] = useState(() => 
    searchParams.get('search') || ''
  );
  
  const [appliedSearchValue, setAppliedSearchValue] = useState(() => 
    searchParams.get('search') || ''
  );
  
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
    
    const params: Record<string, string> = {
      page: currentPage.toString(),
    };
    
    if (appliedSearchValue) {
      params.search = appliedSearchValue;
    }
    
    if (selectedTypes.length > 0) {
      params.type = selectedTypes.map(type => type.value).join(',');
    }
    
    setSearchParams(params);
  }, [currentPage, selectedTypes, recipesStore, appliedSearchValue]);

  const handleSearch = useCallback(() => {
    setCurrentPage(1);
    setAppliedSearchValue(searchInputValue);
  }, [searchInputValue, setCurrentPage, setAppliedSearchValue]);

  const handleTypesChange = useCallback((types: string[]) => {
    setCurrentPage(1);
    setSelectedTypes(types);
  }, [setCurrentPage, setSelectedTypes]);

  const handleClearSearch = useCallback(() => {
    setSearchInputValue('');
    setAppliedSearchValue('');
    setCurrentPage(1);
  }, [setSearchInputValue, setAppliedSearchValue, setCurrentPage]);

  const handleClearTypes = useCallback(() => {
    setSelectedTypes([]);
    setCurrentPage(1);
  }, [setCurrentPage, setSelectedTypes]);

  return {
    searchInputValue,
    setSearchInputValue,
    appliedSearchValue,
    setAppliedSearchValue,
    currentPage,
    setCurrentPage,
    selectedTypes,
    setSelectedTypes,
    isListLoading,
    handleSearch,
    handleTypesChange,
    handleClearSearch,
    handleClearTypes,
  };
}; 