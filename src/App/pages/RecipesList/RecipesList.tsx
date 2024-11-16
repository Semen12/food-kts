import classNames from 'classnames';
import { observer, useLocalStore } from 'mobx-react-lite';
import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import clock from '@assets/clock.svg';
import Search from '@assets/search.svg?react';
import Button from '@components/Button';
import Card from '@components/Card';
import Input from '@components/Input';
import Loader from '@components/Loader';
import MultiDropdown from '@components/MultiDropdown';
import RecipesStore from '@store/RecipesStore/RecipesStore';
import { Meta } from '@store/types';
import LoaderContainer from '../components/LoaderContainer/LoaderContainer';
import  {MEAL_TYPES}  from './types';
import { getRecipeSubtitle, getRecipeKcal } from '@utils/recipe';
import styles from './RecipesList.module.scss';



const RecipesList = observer(() => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const recipesStore = useLocalStore(() => new RecipesStore());
  
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



  const handleSearch = () => {
    setAppliedSearchValue(searchInputValue);
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
                <div className={styles.recipes__content__search}>
                  <Input
                    className={styles.recipes__content__search__input}
                    value={searchInputValue}
                    onChange={setSearchInputValue}
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
               
                {isListLoading ? (
                  <LoaderContainer />
                ) : (
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
                        subtitle={getRecipeSubtitle(recipe)}
                        contentSlot={getRecipeKcal(recipe)}
                        onClick={() => navigate(`/recipe/${recipe.id}`)}
                        actionSlot={<Button onClick={(e) => e.stopPropagation()}>Save</Button>}
                      />
                    ))}
                  </div>
                )}
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
