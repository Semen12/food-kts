import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import styles from './FavoriteRecipes.module.scss';
import { useFavoriteRecipes } from '@store/FavoriteRecipesStore/FavoriteRecipesContext';
import CardGrid from '../RecipesList/components/CardGrid';
import ArrowRound from '@assets/arrow-round.svg?react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/Button';
import { Recipe } from '@store/types';
import DeleteIcon from '@components/icons/DeleteIcon';

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
            <div className={styles.container}>
              <div className={styles.noResults}>
                <h3>Нет сохраненных рецептов</h3>
                <p>Сохраняйте понравившиеся рецепты, нажимая кнопку "Save" на карточках.</p>
              </div>
            </div>
          ) : filteredFavorites.length === 0 ? (
            <div className={styles.container}>
              <div className={styles.noResults}>
                <h3>Рецепты не найдены</h3>
                <p>Попробуйте изменить поисковый запрос</p>
              </div>
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
