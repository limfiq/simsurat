'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../services/api';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadUser = async () => {
            const token = Cookies.get('token');
            const savedUser = Cookies.get('user');

            if (token && savedUser) {
                setUser(JSON.parse(savedUser));
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    const login = async (email, password) => {
        try {
            if (!email || !password) {
                return {
                    success: false,
                    message: 'Email and password are required'
                };
            }

            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data;

            Cookies.set('token', token, { expires: 1 });
            Cookies.set('user', JSON.stringify(user), { expires: 1 });
            setUser(user);
            router.push('/dashboard');
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Login failed'
            };
        }
    };

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('user');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
