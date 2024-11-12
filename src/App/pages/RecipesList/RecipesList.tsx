import { observer, useLocalStore } from 'mobx-react-lite';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { runInAction } from 'mobx';

import RecipesStore from '@store/RecipesStore/RecipesStore';
import Loader from '@components/Loader';
import classNames from 'classnames';
import clock from '@assets/clock.svg';
import Search from '@assets/search.svg?react';
import Button from '@components/Button';
import Card from '@components/Card';
import Input from '@components/Input';
import MultiDropdown from '@components/MultiDropdown';
import Consts from '@config/consts';
import { Meta } from '@store/types';
import styles from './RecipesList.module.scss';
import React from 'react';
import  {MEAL_TYPES}  from './types';


const RecipesList = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const recipesStore = useLocalStore(() => new RecipesStore());
  
  const [searchValue, setSearchValue] = useState(() => 
    searchParams.get('search') || ''
  );
  const [currentPage, setCurrentPage] = useState(() => 
    Number(searchParams.get('page')) || 1
  );
  const [selectedTypes, setSelectedTypes] = useState<Option[]>(() => {
    const types = searchParams.get('types');
    return types 
      ? types.split(',').map(type => ({
          key: type,
          value: type
        }))
      : [];
  });

  useEffect(() => {
    setSearchParams({
      page: currentPage.toString(),
      search: searchValue,
      types: selectedTypes.map(type => type.value).join(',')
    });
  }, [currentPage, searchValue, selectedTypes]);

  useEffect(() => {
    recipesStore.getRecipesList({
      page: currentPage,
      query: searchValue,
      types: selectedTypes.map(type => type.value)
    });
  }, [currentPage, searchValue, selectedTypes]);

  const handleSearch = () => {
    recipesStore.getRecipesList({
      page: currentPage,
      query: searchValue,
      types: selectedTypes.map(type => type.value)
    });
  };

  const renderPagination = useMemo(() => {
    return (
      <div className={styles.pagination}>
        {[...Array(9)].map((_, index) => (
          <button
            key={index}
            className={classNames(styles.pageButton, {
              [styles.active]: currentPage === index + 1,
            })}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  }, [currentPage]);

  return (
    <React.Fragment>
      {recipesStore.meta === Meta.loading && (
        <div className={styles.loader}>
          <Loader size="l" />
        </div>
      )}
      {recipesStore.meta === Meta.success && (
        <React.Fragment>
          <div className={styles.banner}></div>
          <div className={styles.recipes}>
            <div className={styles.recipes__container}>
              <div className={styles.recipes__title}>
                Find the perfect food and <span>drink ideas</span> for every occasion, from{' '}
                <span>weeknight dinners</span> to <span>holiday feasts</span>.
              </div>
              <div className={styles.recipes__content}>
                <div className={styles.recipes__content__search}>
                  <Input
                    className={styles.recipes__content__search__input}
                    value={searchValue}
                    onChange={setSearchValue}
                    placeholder='Enter dishes'
                    afterSlot={<Button onClick={handleSearch}><Search /></Button>}
                  />
                  <MultiDropdown
                    options={MEAL_TYPES}
                    value={selectedTypes}
                    onChange={setSelectedTypes}
                    getTitle={(selected) => 
                      selected.length ? selected.map(s => s.value).join(', ') : 'Meal Types'
                    }
                  />
                </div>
                <div className={styles.recipes__content__grid}>
                  {recipesStore.recipes.map((recipe) => (
                    <Card
                      key={recipe.id}
                      image={recipe.image}
                      captionSlot={
                        <>
                          <img src={clock} alt="clock" />
                          {`${recipe.readyInMinutes ?? 0} minutes`}
                        </>
                      }
                      title={recipe.title}
                      subtitle={recipe.nutrition?.ingredients?.map((i) => i.name).join(' + ') || 'No ingredients'}
                      contentSlot={`${Math.round(recipe.nutrition?.nutrients[0]?.amount ?? 0)} kcal`}
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                      actionSlot={<Button onClick={(e) => e.stopPropagation()}>Save</Button>}
                    />
                  ))}
                </div>
              </div>
              {renderPagination}
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
});

export default RecipesList;
