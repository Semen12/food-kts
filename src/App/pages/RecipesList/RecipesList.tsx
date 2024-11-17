import { observer, useLocalStore } from 'mobx-react-lite';
import React from 'react';
import styles from './RecipesList.module.scss';
import RecipesStore from '@store/RecipesStore/RecipesStore';
import { Meta } from '@store/types';
import LoaderContainer from '../components/LoaderContainer';
import CardGrid from './components/CardGrid';
import Pagination from './components/Pagination';
import Search from './components/Search';
import { useSearch } from './hooks/useSearch';


const RecipesList = observer(() => {
  const recipesStore = useLocalStore(() => new RecipesStore());
  
  const {
    searchInputValue,
    setSearchInputValue,
    setAppliedSearchValue,
    currentPage,
    setCurrentPage,
    selectedTypes,
    setSelectedTypes,
    isListLoading
  } = useSearch({ recipesStore });

  const handleSearch = () => {
    setAppliedSearchValue(searchInputValue);
  };

  return (
    <React.Fragment>
      {recipesStore.meta === Meta.loading && recipesStore.recipes.length === 0 && (
        <LoaderContainer />
      )}
      {recipesStore.meta === Meta.error && recipesStore.recipes.length === 0 && (
        <div className={styles.recipes__content__error}>
          <p>Error loading recipes</p>
        </div>  
      )}
      {(recipesStore.meta === Meta.success || recipesStore.recipes.length > 0) && (
        <React.Fragment>
          <div className={styles.banner}></div>
          <div className={styles.recipes}>
            <div className={styles.recipes__container}>
              <div className={styles.recipes__title}>
                Find the perfect food and <span>drink ideas</span> for every occasion, from{' '}
                <span>weeknight dinners</span> to <span>holiday feasts</span>.
              </div>
              <div className={styles.recipes__content}>
                <Search
                  searchValue={searchInputValue}
                  onSearchChange={setSearchInputValue}
                  onSearch={handleSearch}
                  selectedTypes={selectedTypes}
                  onTypesChange={setSelectedTypes}
                />
                
                {isListLoading ? (
                  <LoaderContainer />
                ) : (
                  <CardGrid recipes={recipesStore.recipes} />
                )}
              </div>
              <Pagination
                currentPage={currentPage}
                onPageChange={setCurrentPage}                
              />
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
});

export default RecipesList;
