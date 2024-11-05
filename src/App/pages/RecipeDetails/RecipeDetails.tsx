import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../../../services/recipesService';
import styles from './RecipeDetails.module.scss';

type RecipeDetails = {
  title: string;
  image: string;
  readyInMinutes: number;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  servings: number;
  summary: string;
  extendedIngredients: Array<{
    original: string;
  }>;
  analyzedInstructions: Array<{
    steps: Array<{
      number: number;
      step: string;
      equipment: Array<{
        name: string;
      }>;
    }>;
  }>;
};

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (!recipe) return <div>Рецепт не найден</div>;

  return (
    <div className={styles.recipe}>
      <h1 className={styles.title}>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className={styles.image} />
      
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <span>Preparation</span>
          <span>{recipe.preparationMinutes} minutes</span>
        </div>
        <div className={styles.infoItem}>
          <span>Cooking</span>
          <span>{recipe.cookingMinutes} minutes</span>
        </div>
        <div className={styles.infoItem}>
          <span>Total</span>
          <span>{recipe.readyInMinutes} minutes</span>
        </div>
        <div className={styles.infoItem}>
          <span>Ratings</span>
          <span>{recipe.aggregateLikes} likes</span>
        </div>
        <div className={styles.infoItem}>
          <span>Servings</span>
          <span>{recipe.servings} servings</span>
        </div>
      </div>

      <div className={styles.summary} 
           dangerouslySetInnerHTML={{ __html: recipe.summary }} />

      <div className={styles.section}>
        <h2>Ingredients</h2>
        <ul>
          {recipe.extendedIngredients.map((ingredient, index) => (
            <li key={index}>{ingredient.original}</li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Directions</h2>
        {recipe.analyzedInstructions[0]?.steps.map((step) => (
          <div key={step.number} className={styles.step}>
            <h3>Step {step.number}</h3>
            <p>{step.step}</p>
            {step.equipment.length > 0 && (
              <div className={styles.equipment}>
                <span>Equipment needed: </span>
                {step.equipment.map(item => item.name).join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeDetails; 