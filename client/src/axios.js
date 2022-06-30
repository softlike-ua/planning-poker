import axios from 'axios';

export const API_URL = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:5000';
export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});