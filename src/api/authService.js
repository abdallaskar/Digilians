import api from './axiosConfig';

// Individual login function
export const loginUser = async (email, password) => {
    try {
        const response = await api.post('auth/login', {
            email,
            password
        });
        console.log('Login response:', response);
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error; // Re-throw to preserve error details for context
    }
};

// Individual register function
export const registerUser = async (name, email, password) => {
    try {
        const response = await api.post('auth/register', {
            name,
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error; // Re-throw to preserve error details for context
    }
};

// Local storage utility functions
export const setAuthData = (token, user) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(user));
};

export const getAuthData = () => {
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('authUser');
    const user = userStr ? JSON.parse(userStr) : null;
    return { token, user };
};

export const clearAuthData = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
};

// Default export for backward compatibility
const authService = {
    login: loginUser,
    register: registerUser,
    setAuthData,
    getAuthData,
    clearAuthData
};

export default authService;