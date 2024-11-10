import React from 'react';
import classNames from 'classnames';
import Loader from '../Loader';

import styles from './Button.module.scss';
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;

};

const Button: React.FC<ButtonProps> = ({ loading, children, className, disabled, onClick, ...props }) => {
  const buttonClasses = classNames(
    styles.button,
    className,
    { [styles['button--loading']]: loading }
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      event.preventDefault(); // Prevent any action if loading
      return;
    }
    onClick?.(event); // Call the onClick prop if not loading
  };

  return (
    <button
      type="button"
      className={buttonClasses}
      disabled={disabled || loading} // Disable if loading or explicitly disabled
      onClick={handleClick}
      {...props}
    >
      {loading && <Loader className={styles['button__loader']} size='s' fill="#fff" />}
      <span className={styles['button__text']}>{children}</span>
    </button>
  );
};


export default Button;
