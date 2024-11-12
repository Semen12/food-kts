import { observer, useLocalStore } from 'mobx-react-lite';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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

const RecipesList = observer(() => {
  const recipesStore = useLocalStore(() => new RecipesStore());
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    recipesStore.getRecipesList(currentPage);
  }, [recipesStore, currentPage]);

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
      {recipesStore.meta === Meta.loading && <div className={styles.loader}><Loader size='l' /></div>}
      {recipesStore.meta === Meta.success && (
        <React.Fragment>
          <div className={styles.banner}></div>
          <div className={styles.recipes}>
            <div className={styles.recipes__container}>
              <div className={styles.recipes__title}>
                Find the perfect food and <span>drink ideas</span> for every occasion, from <span>weeknight dinners</span>{' '}
                to <span>holiday feasts</span>.
              </div>
              <div className={styles.recipes__content}>
                <div className={styles.recipes__content__search}>
                  <Input
                    className={styles.recipes__content__search__input}
                    value={searchValue}
                    onChange={setSearchValue}
                    placeholder='Enter dishes'
                    afterSlot={<Button>
                      <Search />
                    </Button>} />
                  <MultiDropdown
                    options={Consts.options}
                    value={selectedCategories}
                    onChange={setSelectedCategories}
                    getTitle={(selected) => selected.length ? selected.map(s => s.value).join(', ') : 'Categories'} />
                </div>
                <div className={styles.recipes__content__grid}>
                {recipesStore.recipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  image={recipe.image}
                  captionSlot={<><img src={clock} alt="clock" />{`${recipe.readyInMinutes ?? 0} minutes`}</>}
                  title={recipe.title}
                  subtitle={recipe.nutrition?.ingredients?.map(i => i.name).join(' + ') || 'No ingredients'}
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
