import axios from 'axios';
import { BiRegistered } from 'react-icons/bi';


const authService = {
    login: async (email, password) => {
        try {
            const response = await axios.post('/api/login', {
                params: { email, password }
            });
            return response.data;
        } catch (error) {
            throw new Error('Login failed');
        }
    },

    register: async (userName, email, password) => {
        try {
            const response = await axios.post('/api/register', {
                params: { userName, email, password }
            });
            return response.data;
        } catch (error) {
            throw new Error('Registration failed');
        }
    }
};

export default authService;