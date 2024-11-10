import classNames from 'classnames';
import React from 'react';
import styles from './Input.module.scss';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, ...props }, ref) => {
    // Классы для инпута и контейнера
    const inputContainerClasses = classNames(styles['input-container'], className);
    const inputClasses = classNames(styles.input);

    // Обработчик события `onChange`
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
      
    };

    return (
      <div className={inputContainerClasses}>
        <input
          ref={ref}
          className={inputClasses}
          value={value}
          onChange={handleChange}
          type='text'
          {...props}
        />
        {afterSlot && <div className={styles['after-slot']}>{afterSlot}</div>}
      </div>
    );
  }
);

export default Input;
