import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Replace with your API base URL

export const getAllPdf = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/pdf/getpds`);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const getPdf = async (pdfId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/pdf/get_pdf/${pdfId}`);
        return response.data;   
    }
    catch(error){
        console.error('Error registering user:', error);
        throw error;
    }
}