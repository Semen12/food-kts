import { observer, useLocalStore } from 'mobx-react-lite';
import React, { memo } from 'react';
import styles from '../../RecipesList.module.scss';
import { useNavigate } from 'react-router-dom';
import clock from '@assets/clock.svg';
import Button from '@components/Button';
import Card from '@components/Card';
import { Recipe } from '@store/types';
import { useFavoriteRecipes } from '@store/FavoriteRecipesStore/FavoriteRecipesContext';
import { getRecipeSubtitle, getRecipeKcal } from '@utils/recipe';
import classNames from 'classnames';

interface CardGridProps {
  recipes: Recipe[];
  showSaveButton?: boolean;
  className?: string;
  customActionSlot?: (recipe: Recipe) => React.ReactNode;
}

const CardGrid: React.FC<CardGridProps> = observer(({ recipes, showSaveButton = true, className, customActionSlot }) => {
  const navigate = useNavigate();
  const favoriteStore = useFavoriteRecipes();

  const handleSave = (e: React.MouseEvent, recipe: Recipe) => {
    e.stopPropagation();
    favoriteStore.toggleFavorite(recipe);
  };
  

  return (
    <div className={classNames(styles.grid, className)}>
      {recipes.map((recipe) => (
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
          actionSlot={
            customActionSlot ? 
              customActionSlot(recipe) : 
              (showSaveButton && (
                <Button 
                  onClick={(e) => handleSave(e, recipe)}
                  variant={favoriteStore.isFavorite(recipe.id) ? "secondary" : "primary"}
                >
                  {favoriteStore.isFavorite(recipe.id) ? 'Saved' : 'Save'}
                </Button>
              ))
          }
        />
      ))}
    </div>
  );
});

export default CardGrid;
