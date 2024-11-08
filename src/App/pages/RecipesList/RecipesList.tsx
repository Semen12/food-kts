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

const RecipesList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchRecipes = async (page: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<RecipesResponse>('/recipes/complexSearch', {
        params: {
          addRecipeNutrition: true,
          offset: (page - 1) * 9,
          number: 9
        }
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
              [styles.active]: currentPage === index + 1
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
    <><div className={styles.banner}>
     
    </div>
      <div className={styles.recipes}>
        <div className={styles.recipes__content}>
          <div className={styles.recipes__content__search}>
            <Input value="" onChange={() => { } } />
            <MultiDropdown options={[]} value={[]} onChange={() => { } } getTitle={() => ''} />
          </div>
          <div className={styles.recipes__content__grid}>
            {recipes.map((recipe) => (
              <Card
                key={recipe.id}
                image={recipe.image}
                captionSlot={`${recipe.readyInMinutes ?? 0} мин`}
                title={recipe.title}
                subtitle={(recipe.extendedIngredients ?? []).map(i => i.name).join(' + ')}
                contentSlot={`${Math.round(recipe.nutrition?.nutrients[0]?.amount ?? 0)} ккал`}
                onClick={() => navigate(`/recipe/${recipe.id}`)}
                actionSlot={<Button onClick={(e) => e.stopPropagation()}>
                  Сохранить
                </Button>} />
            ))}
          </div>
          {renderPagination()}
        </div>
      </div></>
  );
};

export default RecipesList;
