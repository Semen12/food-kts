import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  params: {
    apiKey: API_KEY
  }
});

export default axiosInstance;