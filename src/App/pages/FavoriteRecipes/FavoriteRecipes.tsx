import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import styles from './FavoriteRecipes.module.scss';
import { useFavoriteRecipes } from '@store/FavoriteRecipesStore/FavoriteRecipesContext';
import CardGrid from '../RecipesList/components/CardGrid';
import ArrowRound from '@assets/arrow-round.svg?react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/Button';
import { Recipe } from '@store/types';

const FavoriteRecipes = observer(() => {
  const favoriteStore = useFavoriteRecipes();
  const navigate = useNavigate();

  useEffect(() => {
    favoriteStore.loadFromLocalStorage();
    window.scrollTo(0, 0);
  }, [favoriteStore]);

  const handleRemove = (e: React.MouseEvent, recipe: Recipe) => {
    e.stopPropagation();
    favoriteStore.toggleFavorite(recipe);
  };

  const renderRemoveButton = (recipe: Recipe) => (
    <Button 
      onClick={(e) => handleRemove(e, recipe)}
      variant="secondary"
    >
      Remove
    </Button>
  );

  return (
    <div className={styles.favorites}>
      <div className={styles.favorites__container}>
        <h1 className={styles.favorites__title}>
          <ArrowRound onClick={() => navigate(-1)}/>
          Your Favorite Recipes
        </h1>

        <div className={styles.favorites__content}>
          {favoriteStore.favorites.length === 0 ? (
            <div className={styles.container}>
              <div className={styles.noResults}>
                <h3>Нет сохраненных рецептов</h3>
                <p>Сохраняйте понравившиеся рецепты, нажимая кнопку "Save" на карточках.</p>
              </div>
            </div>
          ) : (
            <CardGrid 
              recipes={favoriteStore.favorites} 
              showSaveButton={false} 
              className={styles.favorites__grid}
              customActionSlot={renderRemoveButton}
            />
          )}
        </div>
      </div>
    </div>
  );
});

export default FavoriteRecipes;
