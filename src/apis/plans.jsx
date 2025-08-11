import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Replace with your API base URL

// Function to register a new user
export const getAllPlans = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/subscription/`);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

