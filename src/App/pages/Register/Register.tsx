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

const Register = observer(() => {
  const authStore = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    email: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'username':
        if (value.trim().length < 3) {
          return 'Имя пользователя должно быть не менее 3 символов';
        }
        break;
      case 'password':
        if (value.trim().length < 3) {
          return 'Пароль должен быть не менее 3 символов';
        }
        break;
      case 'email':
        if (!value.trim()) {
          return 'Email обязателен';
        }
        break;
    }
    return '';
  };

  const handleInputChange = (value: string, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await authStore.register(formData);
    if (authStore.isAuthenticated) {
      navigate('/profile');
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const isFormValid = formData.email.trim() !== '' && 
                     formData.password.trim().length >= 3 && 
                     formData.username.trim().length >= 3 &&
                     !Object.values(errors).some(error => error !== '');

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
              disabled={!isFormValid}
            >
              Зарегистрироваться
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
