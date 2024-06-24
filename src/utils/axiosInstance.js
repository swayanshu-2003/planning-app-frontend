import axios from 'axios';

// Create an instance of axios with default configuration
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach token from sessionStorage
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default axiosInstance;
