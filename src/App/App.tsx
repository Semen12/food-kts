import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '@components/Header/Header';

import RecipesList from './pages/RecipesList/RecipesList';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import { ThemeProvider } from '@context/ThemeContext';

function App() {
  return (
  <>
    <ThemeProvider>
      <Header />
      <Routes>
        <Route path="/" element={<RecipesList />} />
        <Route path="/recipes" element={<RecipesList />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </ThemeProvider>
   </>
  );
}

export default App;
