import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/Button/Button';
import { ErrorMessage } from '@components/ErrorMessage';
import Loader from '@components/Loader';
import DeleteIcon from '@components/icons/DeleteIcon';
import { Meta } from '@store/types';
import { Recipe, RecipeDetails } from '@types/recipe';
import { scrollLock } from '@utils/scrollLock';
import styles from './RandomRecipeModal.module.scss';

interface RandomRecipeModalProps {
  recipe: RecipeDetails & Recipe | null;
  onClose: () => void;
  meta: Meta;
  errorMessage: string;
}

const RandomRecipeModal = ({ recipe, onClose, meta, errorMessage }: RandomRecipeModalProps) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Блокируем прокрутку при открытии модального окна
    scrollLock.lock();
    
    // Разблокируем прокрутку при закрытии модального окна
    return () => {
      scrollLock.unlock();
    };
  }, []); // Пустой массив зависимостей, так как эффект должен сработать только при монтировании/размонтировании

  return (
    <React.Fragment>
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}><DeleteIcon/></button>
        {meta === Meta.loading ? (
        <div className={styles.loader}><Loader className='loader__random'/></div>
        ) : meta === Meta.error ? (
          <div className={styles.errorWrapper}>
            <ErrorMessage title='Произошла ошибка' message={errorMessage}/>
          </div>
        ) : recipe ? (
          <div className={styles.recipeCard}>
            <img src={recipe.image} alt={recipe.title} />
            <h2>{recipe.title}</h2>
            <div className={styles.recipeInfo}>
              {recipe.readyInMinutes &&   <p> <b>Ready in:</b> {recipe.readyInMinutes} minutes</p>}
              {recipe.servings && <p> <b>Servings:</b> {recipe.servings}</p>}
              {recipe.extendedIngredients.length > 0 && <p> <b>Ingredients:</b> {recipe.extendedIngredients.map(ingredient => ingredient.name).join(', ')}</p>}
              {recipe.vegetarian ? <p> <b>Vegetarian:</b> Yes</p> : <p> <b>Vegetarian:</b> No</p>}
              {recipe.veryHealthy ? <p> <b>Very healthy:</b> Yes</p> : <p> <b>Very healthy:</b> No</p>}

            </div>
            <Button
              className={styles.viewRecipeButton}
              onClick={() => {
                onClose();
                navigate(`/recipe/${recipe.id}`);
              }}
            >
              View full recipe
            </Button>
          </div>
        ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default RandomRecipeModal; 