import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Make sure this matches backend PORT
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
