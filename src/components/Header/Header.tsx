import styles from './Header.module.scss';
import logo from 'assets/logo.svg';
import like from 'assets/like.svg';
import user from 'assets/user.svg';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <a href="/" className={styles.header__logoLink}>
            <img src={logo} alt="logo" className={styles.header__logoImg} />
            <p className={styles.header__logoText}>Food Client</p>
          </a>
        </div>
        <div className={styles.header__menuItems}>
          <a href="/" className={styles.header__menuItem}>
            Recipes
          </a>
          <a href="/" className={styles.header__menuItem}>
            Ingradients
          </a>
          <a href="/" className={styles.header__menuItem}>
            Products
          </a>
          <a href="/" className={styles.header__menuItem}>
          Menu Items
          </a>
          <a href="/" className={styles.header__menuItem}>
          Meal Planning
          </a>
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
