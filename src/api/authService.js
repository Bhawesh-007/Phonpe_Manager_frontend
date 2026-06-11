import apiClient from './axiosConfig';

export const loginUser = async (email, password) => {
    try{
        const response = await apiClient.post('/auth/login', { email, password });
        return response.data; // This will contain your { "token": "eyJ..." }
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};

export const registerUser = async (username, email, password, role) => {
    try {
        const response = await apiClient.post('/auth/register', { username, email, password, role });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Registration failed');
    }
};