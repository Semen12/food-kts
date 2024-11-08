import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getRecipeById } from '../../../services/recipesService';
import styles from './RecipeDetails.module.scss';
import { RecipeDetails as RecipeDetailsType } from 'types/recipe';
import { getTestRecipe } from 'utils/getTestRecipe';
import { IRawSingleRecipeData } from 'utils/types';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import arrowRound from 'assets/arrow-round.svg';
const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  /*   const [recipe, setRecipe] = useState<RecipeDetailsType | null>(null); */
  const [recipe, setRecipe] = useState<IRawSingleRecipeData>(getTestRecipe());
  const [loading, setLoading] = useState(true);

 /*  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(Number(id));
        setRecipe(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]); */
  useEffect(() => {
    setRecipe(getTestRecipe());
    setLoading(false);
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (!recipe) return <div>Рецепт не найден</div>;

  return (
    <div className={styles.recipe}>
      <div className={styles.recipe__container}>
        <div className={styles.recipe__top}>
          {' '}
          <h1 className={styles.recipe__title}>{recipe.title} <NavLink to="/recipes"><img src={arrowRound} alt="arrow" /></NavLink></h1>
          <img src={recipe.image} alt={recipe.title} className={styles.recipe__image} />
          <div className={styles.recipe__info}>
            <div className={styles.recipe__infoItem}>
              <span>Preparation</span>
              <span>{recipe.preparationMinutes} minutes</span>
            </div>
            <div className={styles.recipe__infoItem}>
              <span>Cooking</span>
              <span>{recipe.cookingMinutes} minutes</span>
            </div>
            <div className={styles.recipe__infoItem}>
              <span>Total</span>
              <span>{recipe.totalMinutes} minutes</span>
            </div>
            <div className={styles.recipe__infoItem}>
              <span>Ratings</span>
              <span>{recipe.aggregateLikes} likes</span>
            </div>
            <div className={styles.recipe__infoItem}>
              <span>Servings</span>
              <span>{recipe.servings} servings</span>
            </div>
          </div>
          <div className={styles.recipe__summary} dangerouslySetInnerHTML={{ __html: recipe.summary }} />
        </div>
        <div className={styles.recipe__necessity}>
          <div className={styles.recipe__section}>
            <h2>Ingredients</h2>
          <ul>
            {recipe.extendedIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
            ))}
          </ul>
        </div>
        <div className={styles.recipe__section}>
            <h2>Equipment</h2>
          <ul>
            {recipe.analyzedInstructions[0]?.steps.map((step) => (
              <li key={step.number}>{step.equipment.map((item) => item.name).join(', ')}</li>
            ))}
          </ul>
        </div>
</div>
        <div className={styles['recipe__section-steps']}>
          <h2>Directions</h2>
          {recipe.analyzedInstructions[0]?.steps.map((step) => (
            <div key={step.number} className={styles['recipe__section-step']}>
              <h3>Step {step.number}</h3>
              <p>{step.step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
