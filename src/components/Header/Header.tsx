import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <a href="/" className={styles.header__logoLink}>
            <img src="assets/logo.svg" alt="logo" className={styles.header__logoImg} />
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
            <img src="assets/like.svg" alt="like" />
          </button>
          <button className={styles.header__button}>
            <img src="assets/user.svg" alt="user" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
