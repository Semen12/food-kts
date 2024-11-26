import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowRound from '@assets/arrow-round.svg?react';
import Button from '@components/Button';
import { ErrorMessage } from '@components/ErrorMessage';
import DeleteIcon from '@components/icons/DeleteIcon';
import { useFavoriteRecipes } from '@context/FavoriteRecipesContext';
import { Recipe } from '@store/types';
import CardGrid from '../RecipesList/components/CardGrid';
import styles from './FavoriteRecipes.module.scss';

const FavoriteRecipes = observer(() => {
  const favoriteStore = useFavoriteRecipes();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredFavorites = favoriteStore.favorites.filter(recipe => 
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.favorites}>
      <div className={styles.favorites__container}>
        <h1 className={styles.favorites__title}>
          <ArrowRound onClick={() => navigate(-1)}/>
          Your Favorite Recipes
        </h1>

       {favoriteStore.favorites.length > 0 && <div className={styles.searchContainer}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по избранным рецептам..."
              className={styles.searchInput}
            />
            {searchQuery && (
              <DeleteIcon 
                className={styles.clearIcon} 
                onClick={() => setSearchQuery('')}
              />
                
             
            )}
          </div>
        </div>}

        <div className={styles.favorites__content}>
          {favoriteStore.favorites.length === 0 ? (
            <ErrorMessage title='Нет сохраненных рецептов' message='Сохраняйте понравившиеся рецепты, нажимая кнопку &quot;Save&quot; на карточках.'/>
          ) : filteredFavorites.length === 0 ? (
            <div className={styles.errorWrapper}>
              <ErrorMessage title='Рецепты не найдены' message='Попробуйте изменить поисковый запрос'/>
            </div>
            
          ) : (
            <CardGrid 
              recipes={filteredFavorites}
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
