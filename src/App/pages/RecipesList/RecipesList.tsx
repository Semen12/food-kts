import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axiosInstance from 'config/axios';
import { Recipe, RecipesResponse } from 'types/recipe';
import Banner from './components/Banner/index';
import styles from './RecipesList.module.scss';
import Card from 'components/Card';
import Button from 'components/Button';
import Input from 'components/Input';
import MultiDropdown from 'components/MultiDropdown';
import Text from 'components/Text';
import clock from 'assets/clock.svg';

const RecipesList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);
  const navigate = useNavigate();

  const fetchRecipes = async (page: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<RecipesResponse>('/recipes/complexSearch', {
        params: {
          addRecipeNutrition: true,
          offset: (page - 1) * 9,
          number: 9,
        },
      });
      setRecipes(response.data.results);
    } catch (error) {
      console.error('Ошибка при загрузке рецептов:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(currentPage);
  }, [currentPage]);

  const renderPagination = () => {
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
  };

  return (
    <>
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
                afterSlot={
                  <Button>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13 11H12.21L11.93 10.73C12.91 9.59 13.5 8.11 13.5 6.5C13.5 2.91 10.59 0 7 0C3.41 0 0.5 2.91 0.5 6.5C0.5 10.09 3.41 13 7 13C8.61 13 10.09 12.41 11.23 11.43L11.5 11.71V12.5L16.5 17.49L17.99 16L13 11ZM7 11C4.51 11 2.5 8.99 2.5 6.5C2.5 4.01 4.51 2 7 2C9.49 2 11.5 4.01 11.5 6.5C11.5 8.99 9.49 11 7 11Z"
                        fill="white"
                      />
                    </svg>
                  </Button>
                }
              />
              <MultiDropdown 
                options={[
                  {key: 'breakfast', value: 'Breakfast'}, 
                  {key: 'lunch', value: 'Lunch'}, 
                  {key: 'dinner', value: 'Dinner'}, 
                  {key: 'dessert', value: 'Dessert'}
                ]} 
                value={selectedCategories} 
                onChange={setSelectedCategories} 
                getTitle={(selected) => selected.length ? selected.map(s => s.value).join(', ') : 'Categories'} 
              />
            </div>
            <div className={styles.recipes__content__grid}>
              {recipes.map((recipe) => (
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
            {renderPagination()}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipesList;
