import classnames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import  Like from '@assets/like.svg';
import Logo from '@assets/logo.svg';
import User from '@assets/user.svg';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <React.Fragment>
      <div className={styles.header}>
        <div className={styles.header__container}>
        <div className={styles.header__left}>
          <div className={styles.header__logo}>
            <NavLink
              to="/"
              className={({ isActive, isPending }) => classnames(styles.header__logoLink, isPending && styles.header__logoLinkPending, isActive && styles.header__logoLinkActive)
              }
            >
              <Logo className={styles.header__logoImg} />
              <p className={styles.header__logoText}>Food Client</p>
            </NavLink>
          </div>
          <div className={styles.header__menuItems}>
            <NavLink
              to="/recipes"
              className={({ isActive, isPending }) => classnames(styles.header__menuItem, isPending && styles.header__menuItemPending, isActive && styles.header__menuItemActive)}
            >
              Recipes
            </NavLink>
            <NavLink
              to="/ingredients"
              className={({ isActive, isPending }) => classnames(styles.header__menuItem, isPending && styles.header__menuItemPending, isActive && styles.header__menuItemActive)}
            >
              Ingradients
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive, isPending }) => classnames(styles.header__menuItem, isPending && styles.header__menuItemPending, isActive && styles.header__menuItemActive)}
            >
              Products
            </NavLink>
            <NavLink
              to="/menu-items"
              className={({ isActive, isPending }) => classnames(styles.header__menuItem, isPending && styles.header__menuItemPending, isActive && styles.header__menuItemActive)}
            >
              Menu Items
            </NavLink>
            <NavLink
              to="/meal-planning"
              className={({ isActive, isPending }) => classnames(styles.header__menuItem, isPending && styles.header__menuItemPending, isActive && styles.header__menuItemActive)}
            >
              Meal Planning
            </NavLink>
          </div>
        </div>

        <div className={styles.header__buttons}>
          <button className={styles.header__button}>
            <Like/>
          </button>
          <button className={styles.header__button}>
            <User />
          </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
