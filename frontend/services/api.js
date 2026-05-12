import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL } from './config';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Note: Backend expects "Bearer <token>"
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
