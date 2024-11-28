import { observer, useLocalStore } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EyeOffIcon  from '@assets/eye-off.svg?react';
import EyeIcon  from '@assets/eye.svg?react';
import Button from '@components/Button';
import { ErrorMessage } from '@components/ErrorMessage';
import Input from '@components/Input';
import { useAuth } from '@context/UseAuthContext';
import { useAuthForm } from '@hooks/useAuthForm';
import { Meta } from '@store/types';
import styles from './Login.module.scss';

const Login = observer(() => {
  const authStore = useAuth();
  const navigate = useNavigate();
  const {
    formData,
    errors,
    showPassword,
    setShowPassword,
    handleInputChange,
    isFormValid
  } = useAuthForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      authStore.clearError();
    };
  }, [authStore]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authStore.login(formData);
      if (authStore.isAuthenticated) {
        navigate('/profile');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <div className={styles.login__content}>
          <h1 className={styles.login__title}>Вход</h1>

          <form className={styles.login__form} onSubmit={handleSubmit} autoComplete='off'>
            <div className={styles.input_wrapper}>
              <Input
                className={styles.login__input}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={(value) => handleInputChange(value, 'email')}
              />
              {errors.email && <p className={styles.error_text}>{errors.email}</p>}
            </div>
            
            <div className={styles.input_wrapper}>
              <div className={styles.login__passwordWrapper}>
                <Input
                  className={styles.login__input}
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
              className={styles.login__button}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </Button>
          </form>
          <p className={styles.login__footer}>
            Уже есть аккаунт?
            <Link className={styles.login__link} to="/register">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
});

export default Login;