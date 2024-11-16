import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '@components/Header/Header';
import RecipesList from './pages/RecipesList/RecipesList';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';


function App() {
  return (
  <>
      <Header />
      <Routes>
        <Route path="/" element={<RecipesList />} />
        <Route path="/recipes" element={<RecipesList />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
   </>
  );
}

export default App;
