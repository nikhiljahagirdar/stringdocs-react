import axios from 'axios';

const API_BASE_URL = 'https://hammerhead-app-mtxys.ondigitalocean.app'; // Replace with your API base URL

// Function to register a new user
export const registerUser = async (userData) => {
    try {
        
        const response = await axios.post(`${API_BASE_URL}/auth/register`, JSON.stringify(userData), { headers: { 'Content-Type': 'application/json' } });
        return {code:response.status,data:response.data};
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const loginUser =  async (userData) => { 
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, JSON.stringify(userData), { headers: { 'Content-Type': 'application/json' } });
        return {code:response.status,data:response.data};
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}           


