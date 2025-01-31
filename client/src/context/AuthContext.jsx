import { createContext, useState, useEffect } from 'react';
import useAuthRequest from '../hooks/useAuthRequest';

export const AuthContext = createContext({
    token: null,
    currentUserId: null,
    isAuthenticated: false,
    saveToken: () => {},
    deleteToken: () => {},
    loading: true,
});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const { sendRequest } = useAuthRequest();

    const saveToken = (token, refreshToken, expiryTime) => {
        const expiryTimestamp = expiryTime
            ? Date.now() + expiryTime * 1000
            : null;
        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', refreshToken);
        expiryTimestamp &&
            localStorage.setItem('token_expiry', expiryTimestamp);

        setToken(token);
        setIsAuthenticated(true);
    };

    const deleteToken = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('token_expiry');
        setToken(null);
        setIsAuthenticated(false);
        setCurrentUserId(null);
    };

    const getUserId = async () => {
        try {
            const data = await sendRequest('/api/users/my-id', 'GET');
            if (data.userId) {
                setCurrentUserId(data.userId);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Failed to fetch user ID:', error);
            deleteToken();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const expiryTimestamp = localStorage.getItem('token_expiry');
        const isExpired = expiryTimestamp && Date.now() > expiryTimestamp;

        if (storedToken && !isExpired) {
            setToken(storedToken);
        } else if (isExpired) {
            deleteToken();
        }
    }, []);

    useEffect(() => {
        if (token && !currentUserId) {
            getUserId();
        }
    }, [token, currentUserId]);

    return (
        <AuthContext.Provider
            value={{
                token,
                currentUserId,
                isAuthenticated,
                saveToken,
                deleteToken,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
