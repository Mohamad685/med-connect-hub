import axios from "axios";

const axiosHelper = axios.create({
    baseURL: 'http://localhost:8000/api/', 
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosHelper.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosHelper;
