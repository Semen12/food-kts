import React from 'react';
import classNames from 'classnames';
import Loader from '../Loader';
import './Button.css';
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;

};

const Button: React.FC<ButtonProps> = ({ loading, children, className, disabled, onClick, ...props }) => {
  const buttonClasses = classNames(
    'button',
    className,
    { 'button--loading': loading }
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
      data-loading={loading}
      data-disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {loading && <Loader className="button__loader" size='s' fill="#fff" />}
      <span className="button__text">{children}</span>
    </button>
  );
};


export default Button;
