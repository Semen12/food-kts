import { observer, useLocalStore } from 'mobx-react-lite';

import React from 'react';
import bg from '@assets/bg.jpg';
import { ErrorMessage } from '@components/ErrorMessage/ErrorMessage';
import FavoriteRecipesStore from '@store/FavoriteRecipesStore';
import RecipesStore from '@store/RecipesStore/RecipesStore';
import { Meta } from '@store/types';
import CardGrid from '../../../components/CardGrid';
import LoaderContainer from '../components/LoaderContainer';
import Pagination from './components/Pagination';
import Search from './components/Search';
import { useSearch } from './hooks/useSearch';
import styles from './RecipesList.module.scss';

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
    isListLoading,
    handleSearch,
    handleTypesChange,
    handleClearSearch,
    handleClearTypes
  } = useSearch({ recipesStore });

  return (
    <React.Fragment>
      {recipesStore.meta === Meta.loading && recipesStore.recipes.length === 0 && (
        <LoaderContainer />
      )}
      {recipesStore.meta === Meta.error && recipesStore.recipes.length === 0 && (
        <div className={styles.errorWrapper}>
          <ErrorMessage title="Ошибка загрузки рецептов" message={recipesStore.errorMessage} />
        </div>
      )}
      {(recipesStore.meta === Meta.success || recipesStore.recipes.length > 0) && (
        <>
          <div className={styles.banner} >
            <img src={bg} alt="banner" />
          </div>
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
              onClearSearch={handleClearSearch}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && searchInputValue.trim()) {
                  handleSearch();
                }
              }}
              isSearchDisabled={!searchInputValue.trim()}
              selectedTypes={selectedTypes}
              onTypesChange={handleTypesChange}
              onClearTypes={handleClearTypes} />

            {isListLoading ? (
              <LoaderContainer />
            ) : recipesStore.recipes.length === 0 ? (
              <>

                <ErrorMessage title='Рецепты не найдены' message='Попробуйте изменить параметры поиска.' />
              </>
            ) : (
              <CardGrid recipes={recipesStore.recipes} />
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalResults={recipesStore.totalResults}
            number={recipesStore.number} />
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
});

export default RecipesList;
