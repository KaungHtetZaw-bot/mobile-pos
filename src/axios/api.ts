import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout:10000,
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
   if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.removeItem('token'); // Clear token first!
        window.location.href = '/login';
        return new Promise(() => {}); // Break the promise chain completely
    }
    return Promise.reject(error);
  }
);



export default api