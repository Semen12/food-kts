import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '@components/Header/Header';
import { ThemeProvider } from '@context/ThemeContext';
import { FavoriteRecipesProvider } from '@store/FavoriteRecipesStore/FavoriteRecipesContext';

import FavoriteRecipes from './pages/FavoriteRecipes/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import RecipesList from './pages/RecipesList/RecipesList';

function App() {
  return (
    <FavoriteRecipesProvider>
      <ThemeProvider>
        <Header />
        <Routes>
          <Route path="/" element={<RecipesList />} />
          <Route path="/recipes" element={<RecipesList />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/favorites" element={<FavoriteRecipes />} />
        </Routes>
      </ThemeProvider>
    </FavoriteRecipesProvider>
  );
}

export default App;
