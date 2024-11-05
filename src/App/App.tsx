import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import RecipesList from './pages/RecipesList';
import RecipeDetails from './pages/RecipeDetails';
import '../styles/reset.scss';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<RecipesList />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </>
  );
}

export default App;
