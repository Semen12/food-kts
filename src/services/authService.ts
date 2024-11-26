import axios from 'axios';
import { LoginData, RegisterData, UpdateUserData, User } from '@types/user';

const BASE_URL = 'https://e41d8e14e1ed8f0f.mokky.dev';

// Создаем инстанс axios с базовым URL
const api = axios.create({
  baseURL: BASE_URL
});

// Интерцептор для добавления токена к запросам
api.interceptors.request.use((config) => {

  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async login(data: LoginData) {
    const response = await api.post('/auth', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async register(data: RegisterData) {
    const response = await api.post('/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth_me');
    return response.data;
  },

  async updateUser(userId: number, userData: UpdateUserData): Promise<User> {
    if (!userId) {
      throw new Error('ID пользователя не определен');
    }

    const response = await api.patch(`${BASE_URL}/users/${userId}`, userData);
       

    if (!response.data) {
      throw new Error('Ошибка при обновлении профиля');
    }

    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  }
}; 