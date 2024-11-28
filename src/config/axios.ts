import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
export const BASE_URL = 'https://e41d8e14e1ed8f0f.mokky.dev';

// Создаем инстанс для API с ключом
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  params: {
    apiKey: API_KEY
  }
});

// Создаем инстанс для авторизации
export const api = axios.create({
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

export default axiosInstance;