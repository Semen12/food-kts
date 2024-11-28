import { useState } from 'react';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email: string;
  password: string;
}

export const useAuthForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const validateField = (name: string, value: string) => {
    switch (name) {
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

  const isFormValid = formData.email.trim() !== '' && 
                     formData.password.trim().length >= 3 && 
                     !Object.values(errors).some(error => error !== '');

  return {
    formData,
    errors,
    showPassword,
    setShowPassword,
    handleInputChange,
    isFormValid
  };
}; 