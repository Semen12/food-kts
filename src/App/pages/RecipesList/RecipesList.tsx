import classNames from 'classnames';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import clock from '@assets/clock.svg';
import Search from '@assets/search.svg?react';
import Button from '@components/Button';
import Card from '@components/Card';
import Input from '@components/Input';
import Loader from '@components/Loader';
import MultiDropdown from '@components/MultiDropdown';
import Consts from '@config/consts';
import { getRecipes } from '@services/recipesService';
import { Recipe } from '@types/recipe';
import styles from './RecipesList.module.scss';
const RecipesList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);
  const navigate = useNavigate();
/* 
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
  }; */

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRecipes(currentPage);
      if (response?.results) {
        setRecipes(response.results);
        if(recipes){
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [currentPage]);

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
    <>  
      {loading && <div  className={styles.loader}><Loader size='l' /></div>}
      {! loading && (
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
                   <Search />
                  </Button>
                }
              />
              <MultiDropdown 
                options={Consts.options}
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
            {renderPagination}
          </div>
        </div>
          </div>
        </>
      )}
    </>
  );
};

export default RecipesList;
