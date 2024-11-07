import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from 'components/Header';
import RecipeDetails from './pages/RecipeDetails';
import RecipesList from './pages/RecipesList';

import 'styles/reset.scss';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<RecipesList />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="*" element={<RecipesList />} />
      </Routes>
    </>
  );
}

export default App;
