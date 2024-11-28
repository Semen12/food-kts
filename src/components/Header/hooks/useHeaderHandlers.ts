import { useNavigate } from 'react-router-dom';
import { useAuth } from '@context/UseAuthContext';
import RecipeDetailsStore from '@store/RecipeDetailsStore';

interface UseHeaderHandlersProps {
  setIsMenuOpen: (value: boolean) => void;
  setShowRandomModal: (value: boolean) => void;
  setRandomRecipe: (value: any) => void;
  setIsShoppingListOpen: (value: boolean) => void;
  setActiveMenuItem: (value: string | null) => void;
  recipeDetailsStore: RecipeDetailsStore;
}

export const useHeaderHandlers = ({
  setIsMenuOpen,
  setShowRandomModal,
  setRandomRecipe,
  setIsShoppingListOpen,
  setActiveMenuItem,
  recipeDetailsStore,
}: UseHeaderHandlersProps) => {
  const navigate = useNavigate();
  const authStore = useAuth();

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const handleRandomRecipe = () => {
    recipeDetailsStore.getRandomRecipe();
    setRandomRecipe(recipeDetailsStore.randomRecipe);
    setShowRandomModal(true);
  };

  const handleUserClick = () => {
    handleMenuItemClick();
    if (authStore.isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const handleLogoClick = () => {
    handleMenuItemClick();
    setActiveMenuItem('logo');
  };

  const handleRecipesClick = () => {
    handleMenuItemClick();
    setActiveMenuItem('recipes');
  };

  const handleIngredientsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleMenuItemClick();
    setActiveMenuItem('ingredients');
    setIsShoppingListOpen(true);
  };

  const handleFavoritesClick = () => {
    handleMenuItemClick();
    navigate('/favorites');
  };

  return {
    handleMenuItemClick,
    handleRandomRecipe,
    handleUserClick,
    handleLogoClick,
    handleRecipesClick,
    handleIngredientsClick,
    handleFavoritesClick,
  };
}; 