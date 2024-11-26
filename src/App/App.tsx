import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '@components/Header/Header';
import ScrollToTop from '@components/ScrollToTop';
import { FavoriteRecipesProvider } from '@context/FavoriteRecipesContext';
import { ThemeProvider } from '@context/ThemeContext';

import FavoriteRecipes from './pages/FavoriteRecipes/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import RecipesList from './pages/RecipesList/RecipesList';
import ShoppingList from './pages/ShoppingList';

function App() {
  return (
    <FavoriteRecipesProvider>
      <ThemeProvider>
        <Header />
        <ScrollToTop />
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
