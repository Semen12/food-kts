import React, { memo } from 'react';
import styles from '../../RecipesList.module.scss';
import { useNavigate } from 'react-router-dom';
import Clock from '@assets/clock.svg';
import Button from '@components/Button';
import Card from '@components/Card';
import { Recipe } from '@store/types';
import { getRecipeSubtitle, getRecipeKcal } from '@utils/recipe';
interface CardGridProps {
  recipes: Recipe[];
}

const CardGrid: React.FC<CardGridProps> = memo(({ recipes }) => {
  const navigate = useNavigate();

  return (
    
    <div className={styles.grid}>
      {recipes.map((recipe) => (
        <Card
          key={recipe.id}
          image={recipe.image}
          captionSlot={
            <>
              <Clock />
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
    
  );
});

export default CardGrid;
