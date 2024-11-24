import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Like from '@assets/like.svg?react';
import Logo from '@assets/logo.svg?react';
import User from '@assets/user.svg?react';
import styles from './Header.module.scss';
import DynamicAdapt from '@utils/dynamic_adapt.js';
import { useTheme } from '@/context/ThemeContext';
import Moon from '@assets/moon.svg?react';
import Sun from '@assets/sun.svg?react';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
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
  }, [isMenuOpen]);



  return (
    <React.Fragment>
      <header className={styles.header}>
        <div className={styles.header__container}>
        <div className={styles.header__left}>
          <div className={styles.header__logo}>
            <NavLink
              to="/"
              className={({ isActive, isPending }) => classnames(styles.header__logoLink, isPending && styles.header__logoLinkPending, isActive && styles.header__logoLinkActive)
              }
              onClick={handleMenuItemClick}
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
              onClick={handleMenuItemClick}
              className={({ isActive, isPending }) => classnames(styles.header__menuItem, isPending && styles.header__menuItemPending, isActive && styles.header__menuItemActive)}
            >
              Recipes
            </NavLink>
            <NavLink
              to="/ingredients"
              onClick={handleMenuItemClick}
              className={({ isActive, isPending }) => classnames(styles.header__menuItem, isPending && styles.header__menuItemPending, isActive && styles.header__menuItemActive)}
            >
              Ingredients
            </NavLink>
            <NavLink
              to="/products"
              onClick={handleMenuItemClick}
              className={({ isActive, isPending }) => classnames(styles.header__menuItem, isPending && styles.header__menuItemPending, isActive && styles.header__menuItemActive)}
            >
              Products
            </NavLink>
            <NavLink
              to="/menu-items"
              onClick={handleMenuItemClick}
              className={({ isActive, isPending }) => classnames(styles.header__menuItem, isPending && styles.header__menuItemPending, isActive && styles.header__menuItemActive)}
            >
              Menu Items
            </NavLink>
            <NavLink
              to="/meal-planning"
              onClick={handleMenuItemClick}
              className={({ isActive, isPending }) => classnames(styles.header__menuItem, isPending && styles.header__menuItemPending, isActive && styles.header__menuItemActive)}
            >
              Meal Planning
            </NavLink>
          </div>
        </div>
        <div className={styles.header__theme} >
        <button 
            className={styles.header__button} 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            
          >
            {theme === 'light' ? <Moon /> : <Sun />}
          </button>
        </div>
        <div className={styles.header__buttons} data-da=".header__menuItems,893,6">
          <button className={styles.header__button}
            onClick={handleMenuItemClick}
          >
            <Like />
          </button>
        
          <button className={styles.header__button} onClick={handleMenuItemClick}>
            <User />
          </button>
          </div>
        </div>
       
      </header>
    </React.Fragment>
  );
};

export default Header;
