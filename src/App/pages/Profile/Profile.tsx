import axios from 'axios';
import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import avatarImage from '@assets/avatar.jpg';
import EyeOffIcon from '@assets/eye-off.svg?react';
import EyeIcon from '@assets/eye.svg?react';
import Button from '@components/Button';
import Input from '@components/Input';
import { useAuth } from '@context/UseAuthContext';
import { Meta } from '@store/types';
import LoaderContainer from '../components/LoaderContainer';
import styles from './Profile.module.scss';



const Profile = observer(() => {
  const authStore = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: authStore.user?.id || 0,
    username: authStore.user?.username || '',
    email: authStore.user?.email || '',
  });
  const [isImageLoading, setIsImageLoading] = useState(true);

 

  useEffect(() => {
    if (!authStore.user || !authStore.isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }
    
    setFormData({
      id: authStore.user?.id || 0,
      username: authStore.user?.username || '',
      email: authStore.user?.email || '',
    });
  }, [authStore.user, authStore.isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id) {
      await authStore.updateUser(formData);
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    authStore.logout();
    navigate('/login');
  };






  return (
    <div className={styles.profile}>
      <div className={styles.profile__container}>
        <div className={styles.profile__content}>
          <h1 className={styles.profile__title}>Профиль</h1>

          {authStore.meta === Meta.loading && <LoaderContainer size="m" />}

          {authStore.meta === Meta.error && <div className={styles.error}>{authStore.errorMessage}</div>}

          {authStore.isAuthenticated && (
            <React.Fragment>
              {isEditing ? (
                <form onSubmit={handleSubmit} className={styles.profile__form}>
                  <div className={styles.profile__formGroup}>
                    <label>Имя пользователя</label>
                    <Input
                      type="text"
                      value={formData.username}
                      onChange={(value: string) => setFormData({ ...formData, username: value })}
                      className={styles.profile__input}
                    />
                  </div>
                  <div className={styles.profile__formGroup}>
                    <label>Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(value: string) => setFormData({ ...formData, email: value })}
                      className={styles.profile__input}
                    />
                  </div>

                  <div className={styles.profile__buttons}>
                    <Button className={styles.profile__button} type="submit">
                      Сохранить
                    </Button>
                    <Button className={styles.profile__button} type="button" onClick={() => setIsEditing(false)}>
                      Отмена
                    </Button>
                  </div>
                </form>
              ) : (
                <div className={styles.profile__info}>
                      <div className={styles.profile__avatarWrapper}>

                
                        <img
                          src={isImageLoading ? avatarImage :  'https://xsgames.co/randomusers/avatar.php?g=male'} 
                          alt="Аватар"
                          className={styles.profile__avatar}
                          onLoad={() => setIsImageLoading(false)}
                          onError={() => {
                            setIsImageLoading(false);
                          }}
                          />
                      </div>
                      <p>
                        <strong>Имя:</strong> {authStore.user?.username}
                      </p>
                      <p>
                        <strong>Email:</strong> {authStore.user?.email}
                      </p>
                      <div className={styles.profile__buttons}>
                        <Button className={styles.profile__button} onClick={() => setIsEditing(true)}>
                          Редактировать
                        </Button>
                        <Button className={styles.profile__button} onClick={handleLogout}>
                          Выйти
                        </Button>
                      </div>
                      </div>
                    
                )}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
});

export default Profile;
