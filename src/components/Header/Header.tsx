import styles from './Header.module.scss';
import logo from 'assets/logo.svg';
import like from 'assets/like.svg';
import user from 'assets/user.svg';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__left}>
          <div className={styles.header__logo}>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending
                  ? `${styles.header__logoLink} ${styles.header__logoLinkPending}`
                  : isActive
                    ? `${styles.header__logoLink} ${styles.header__logoLinkActive}`
                    : styles.header__logoLink
              }
            >
              <img src={logo} alt="logo" className={styles.header__logoImg} />
              <p className={styles.header__logoText}>Food Client</p>
            </NavLink>
          </div>
          <div className={styles.header__menuItems}>
            <NavLink
              to="/recipes"
              className={({ isActive, isPending }) =>
                isPending
                  ? `${styles.header__menuItem} ${styles.header__menuItemPending}`
                  : isActive
                    ? `${styles.header__menuItem} ${styles.header__menuItemActive}`
                    : styles.header__menuItem
              }
            >
              Recipes
            </NavLink>
            <NavLink
              to="/ingredients"
              className={({ isActive, isPending }) =>
                isPending
                  ? `${styles.header__menuItem} ${styles.header__menuItemPending}`
                  : isActive
                    ? `${styles.header__menuItem} ${styles.header__menuItemActive}`
                    : styles.header__menuItem
              }
            >
              Ingradients
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive, isPending }) =>
                isPending
                  ? `${styles.header__menuItem} ${styles.header__menuItemPending}`
                  : isActive
                    ? `${styles.header__menuItem} ${styles.header__menuItemActive}`
                    : styles.header__menuItem
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/menu-items"
              className={({ isActive, isPending }) =>
                isPending
                  ? `${styles.header__menuItem} ${styles.header__menuItemPending}`
                  : isActive
                    ? `${styles.header__menuItem} ${styles.header__menuItemActive}`
                    : styles.header__menuItem
              }
            >
              Menu Items
            </NavLink>
            <NavLink
              to="/meal-planning"
              className={({ isActive, isPending }) =>
                isPending
                  ? `${styles.header__menuItem} ${styles.header__menuItemPending}`
                  : isActive
                    ? `${styles.header__menuItem} ${styles.header__menuItemActive}`
                    : styles.header__menuItem
              }
            >
              Meal Planning
            </NavLink>
          </div>
        </div>

        <div className={styles.header__buttons}>
          <button className={styles.header__button}>
            <img src={like} alt="like" />
          </button>
          <button className={styles.header__button}>
            <img src={user} alt="user" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
