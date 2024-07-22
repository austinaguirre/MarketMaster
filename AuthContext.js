// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import authStorage from './authStorage';
import axios from 'axios';
import { API_URL } from '@env';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await authStorage.getToken();
            const refreshToken = await authStorage.getRefreshToken();

            if (!token || !refreshToken) {
                // await authStorage.clearTokens();
                setIsAuthenticated(false);
                return;
            }
            //  setIsAuthenticated(!!token);

            try {
                const response = await axios.post(`${API_URL}/users/refreshToken`, { refreshToken });
                const newToken = response.data.token;
                await authStorage.setToken(newToken);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Failed to refresh token:", error);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    // Provide a method to update isAuthenticated
    const authenticate = (value) => {
        setIsAuthenticated(value);
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated, authenticate }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
