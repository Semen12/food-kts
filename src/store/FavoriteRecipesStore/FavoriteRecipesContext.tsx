import React, { createContext, useContext } from 'react';
import FavoriteRecipesStore from './FavoriteRecipesStore';

const FavoriteRecipesContext = createContext<FavoriteRecipesStore | null>(null);

export const FavoriteRecipesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = new FavoriteRecipesStore();

  return (
    <FavoriteRecipesContext.Provider value={store}>
      {children}
    </FavoriteRecipesContext.Provider>
  );
};

export const useFavoriteRecipes = () => {
  const store = useContext(FavoriteRecipesContext);
  if (!store) {
    throw new Error('useFavoriteRecipes must be used within FavoriteRecipesProvider');
  }
  return store;
}; 