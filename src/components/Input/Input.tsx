import classNames from 'classnames';
import React from 'react';
import DeleteIcon from '../icons/DeleteIcon';
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
  onClear?: () => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, onClear, ...props }, ref) => {
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
          onChange={(e) => onChange(e.target.value)}
          type='text'
          {...props}
        />
        <div className={styles['after-slot'] + ' ' + styles.afterSlot_clearIcon}>
          {value && onClear && (
            <DeleteIcon 
              width={20} 
              height={20} 
              onClick={onClear}
              className={styles.clearIcon} 
            />
          )}
          {afterSlot}
        </div>
      </div>
    );
  }
);

export default Input;
