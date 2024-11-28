import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@context/UseAuthContext';

interface FormData {
  email: string;
  password: string;
  username: string;
}

interface FormErrors {
  username: string;
  password: string;
  email: string;
}

export const useRegisterForm = () => {
  const authStore = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    username: '',
  });

  const [errors, setErrors] = useState<FormErrors>({
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

  const isFormValid = formData.email.trim() !== '' && 
                     formData.password.trim().length >= 3 && 
                     formData.username.trim().length >= 3 &&
                     !Object.values(errors).some(error => error !== '');

  return {
    formData,
    errors,
    showPassword,
    setShowPassword,
    handleInputChange,
    handleSubmit,
    isFormValid,
    authStore
  };
}; 