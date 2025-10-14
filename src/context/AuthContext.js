import { createContext, useState, useEffect } from 'react';
import {
    loginUser,
    registerUser,
    setAuthData,
    getAuthData,
    clearAuthData
} from '../api/authService';

// 1. Define the initial context shape
export const AuthContext = createContext({
    user: null,
    token: null,
    isLoggedIn: false,
    login: async () => { },
    logout: () => { },
    register: async () => { },
    isLoading: false,
    error: null, // To store any global auth errors
});

// 2. Create the Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Initial load check
    const [error, setError] = useState(null);


    // Load auth data from local storage on initial mount
    useEffect(() => {
        const { user: storedUser, token: storedToken } = getAuthData();

        if (storedUser && storedToken) {
            setUser(storedUser);
            setToken(storedToken);
        }
        setIsLoading(false); // Authentication check is complete
    }, []);



    const handleSuccess = (data) => {
        const { token: jwtToken, user: userData } = data;
        setAuthData(jwtToken, userData); // Save to local storage
        setToken(jwtToken);
        setUser(userData);
        setError(null);
        return userData;
    };

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await loginUser(email, password);
            return handleSuccess(data);
        } catch (err) {
            // Note: error.response is used here because Axios uses that structure for API errors
            const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
            setError(message);
            throw new Error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await registerUser(name, email, password);
            return handleSuccess(data); // Log the user in immediately after registration
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed. User may already exist.';
            setError(message);
            throw new Error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        clearAuthData(); // Remove from local storage
        setUser(null);
        setToken(null);
        setError(null);
    };

    const contextValue = {
        user,
        token,
        isLoggedIn: !!user,
        login,
        logout,
        register,
        isLoading,
        error,
    };

    // Show a small loader while checking local storage on app start
    if (isLoading && token === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-xl text-indigo-600 animate-pulse">Loading secure session...</p>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
