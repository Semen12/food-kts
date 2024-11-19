import axios from 'axios';


const KEY_API = process.env.API_KEY;

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  params: {
    apiKey: KEY_API
  }
});

export default axiosInstance;