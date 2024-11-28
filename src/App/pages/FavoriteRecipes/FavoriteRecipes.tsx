import { observer } from 'mobx-react-lite';
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/Button';
import CardGrid from '@components/CardGrid';
import { ErrorMessage } from '@components/ErrorMessage';
import PageTitle from './components/PageTitle/PageTitle';
import SearchInput from './components/SearchInput/SearchInput';
import { useFavoriteRecipes } from '@context/FavoriteRecipesContext';
import { Recipe } from '@store/types';
import styles from './FavoriteRecipes.module.scss';
import { scrollLock } from '@utils/scrollLock';

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

  const filteredFavorites = useMemo(() => 
    favoriteStore.favorites.filter(recipe => 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [favoriteStore.favorites, searchQuery]
  );

  return (
    <div className={styles.favorites}>
      <div className={styles.favorites__container}>
        <PageTitle 
          title="Your Favorite Recipes" 
          onBack={() => navigate(-1)} 
        />

        {favoriteStore.favorites.length > 0 && (
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Поиск по избранным рецептам..."
          />
        )}

        <div className={styles.favorites__content}>
          {favoriteStore.favorites.length === 0 ? (
            <ErrorMessage 
              title='Нет сохраненных рецептов' 
              message='Сохраняйте понравившиеся рецепты, нажимая кнопку "Save" на карточках.'
            />
            
          ) : filteredFavorites.length === 0 ? (
            <div className={styles.errorWrapper}>
              <ErrorMessage 
                title='Рецепты не найдены' 
                message='Попробуйте изменить поисковый запрос'
              />
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
