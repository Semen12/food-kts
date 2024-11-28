import { observer, useLocalStore } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@components/Button';
import { ErrorMessage } from '@components/ErrorMessage';
import { useAuth } from '@context/UseAuthContext';
import { Meta } from '@store/types';
import styles from './Register.module.scss';
import Input from '@components/Input';
import EyeIcon  from '@assets/eye.svg?react';
import EyeOffIcon  from '@assets/eye-off.svg?react';
import { useRegisterForm } from '@hooks/useRegisterForm';

const Register = observer(() => {
  const navigate = useNavigate();
  const {
    formData,
    errors,
    showPassword,
    setShowPassword,
    handleInputChange,
    handleSubmit: handleFormSubmit,
    isFormValid,
    authStore
  } = useRegisterForm();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authStore.register(formData);
      if (authStore.isAuthenticated) {
        navigate('/profile');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.register__container}>
        <div className={styles.register__content}>
          <h1 className={styles.register__title}>Регистрация</h1>

          <form className={styles.register__form} onSubmit={handleSubmit} autoComplete='off'>
            <div className={styles.input_wrapper}>
              <Input
                className={styles.register__input}
                type="text"
                name="username"
                placeholder="Имя пользователя"
                value={formData.username}
                onChange={(value) => handleInputChange(value, 'username')}
              />
              {errors.username && <p className={styles.error_text}>{errors.username}</p>}
            </div>
            <div className={styles.input_wrapper}>
              <Input
                className={styles.register__input}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={(value) => handleInputChange(value, 'email')}
              />
              {errors.email && <p className={styles.error_text}>{errors.email}</p>}
            </div>
            <div className={styles.input_wrapper}>
              <div className={styles.register__passwordWrapper}>
                <Input
                  className={styles.register__input}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={(value) => handleInputChange(value, 'password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.passwordToggle}
              >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && <p className={styles.error_text}>{errors.password}</p>}
            </div>
            {authStore.meta === Meta.error && <ErrorMessage title="Ошибка входа" message={authStore.errorMessage} />}
            <Button 
              type="submit" 
              className={styles.register__button}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
          </form>
          <p className={styles.register__footer}>
            Уже есть аккаунт?
            <Link className={styles.register__link} to="/login">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
});

export default Register;
