import classnames from 'classnames';
import { observer, useLocalStore } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Dice from '@assets/dice.svg?react';
import Like from '@assets/like.svg?react';
import Logo from '@assets/logo.svg?react';
import Moon from '@assets/moon.svg?react';
import Sun from '@assets/sun.svg?react';
import User from '@assets/user.svg?react';
import { useFavoriteRecipes } from '@context/FavoriteRecipesContext';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/UseAuthContext';
import RecipeDetailsStore from '@store/RecipeDetailsStore';
import { Recipe, RecipeDetails } from '@types/recipe';
import DynamicAdapt from '@utils/dynamic_adapt.js';
import RandomRecipeModal from '../RandomRecipeModal';
import ShoppingListModal from '../ShoppingListModal';
import styles from './Header.module.scss';

const Header = observer(() => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const favoriteStore = useFavoriteRecipes();
  const [showRandomModal, setShowRandomModal] = useState(false);
  const [randomRecipe, setRandomRecipe] = useState<RecipeDetails & Recipe | null>(null);
  const recipeDetailsStore = useLocalStore(() => new RecipeDetailsStore());
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);
  const authStore = useAuth();
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);

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

  useEffect(() => {
    const da = new DynamicAdapt("max");
    da.init();
    console.log('DynamicAdapt initialized from Header');
    console.log('Found elements:', document.querySelectorAll("[data-da]").length);
     if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen,favoriteStore,recipeDetailsStore]);



  return (
    <React.Fragment>
      <header className={styles.header}>
        <div className={styles.header__container}>
        <div className={styles.header__left}>
          <div className={styles.header__logo}>
            <NavLink
              to="/"
              className={({ isActive }) => classnames(
                styles.header__logoLink, 
                isActive && activeMenuItem === 'logo' && styles.header__logoLinkActive
              )}
              onClick={() => {
                handleMenuItemClick();
                setActiveMenuItem('logo');
              }}
            >
              <Logo className={styles.header__logoImg} />
              <p className={styles.header__logoText}>Food Client</p>
            </NavLink>
          </div>
          <button 
            className={classnames(styles.burger, isMenuOpen && styles.burger_active)} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={classnames(
            styles.header__menuItems,
            'header__menuItems',
            isMenuOpen && styles.header__menuItems_active
          )}>
            <NavLink
              to="/recipes"
              onClick={() => {
                handleMenuItemClick();
                setActiveMenuItem('recipes');
              }}
              className={({ isActive }) =>
                classnames(
                  styles.header__menuItem,
                  isActive && activeMenuItem === 'recipes' && styles.header__menuItemActive
                )
              }
            >
              Recipes
            </NavLink>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick();
                setActiveMenuItem('ingredients');
                setIsShoppingListOpen(true);
              }}
              className={classnames(
                styles.header__menuItem,
                activeMenuItem === 'ingredients' && styles.header__menuItemActive
              )}
            >
              Ingredients
            </button>
            
          </div>
        </div>
          <div className={styles.header__utils}>
        <div className={styles.header__theme} >
        <button 
            className={styles.header__button + ' header__button_theme'} 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            
          >
            {theme === 'light' ? <Moon /> : <Sun />}
          </button>
        </div>
          <div className={styles.header__random}>
          <button 
            className={styles.header__button + ' header__button_random'}
            onClick={() => {
              handleMenuItemClick();
              handleRandomRecipe();
            }}
            aria-label="Get random recipe"
          >
            <Dice />
          </button>
        </div>
        </div>
        <div className={styles.header__buttons} data-da=".header__menuItems,931,6">
          <button 
            className={styles.header__button + ' header__button_favorite'}
            onClick={() => {
              handleMenuItemClick();
              navigate('/favorites');
            }}
          >
            <Like />
            {favoriteStore.favoritesCount > 0 && (
              <p className={styles.header__favoriteCount}>
                {favoriteStore.favoritesCount > 99 ? '99+' : favoriteStore.favoritesCount}
              </p>
            )}
          </button>
        
          <button 
            className={styles.header__button + ' header__button_user'} 
            onClick={() => {
              handleMenuItemClick();
              handleUserClick();
            }}
          >
            <User />
            {authStore.isAuthenticated && <span className={styles.header__userDot} />}
          </button>
          </div>
        </div>
       
      </header>
      
      {showRandomModal && (
        <RandomRecipeModal 
          recipe={recipeDetailsStore.randomRecipe}
          onClose={() => setShowRandomModal(false)}
          meta={recipeDetailsStore.meta}
          errorMessage={recipeDetailsStore.errorMessage}
        />
      )}

      {isShoppingListOpen && (
        <ShoppingListModal onClose={() => {
          setIsShoppingListOpen(false);
          setActiveMenuItem(null);
        }} />
      )}
    </React.Fragment>
  );
});

export default Header;
