import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const updateUserProfile = async (data: { firstName: string; lastName: string }) => {
    const response = await api.put('/users/profile', data);
    return response.data;
};

export const getMyAthletes = async () => {
    const response = await api.get('/users/my-athletes');
    return response.data;
};

export const updateAthleteStatus = async (id: number, data: { status: string; categoryName?: string; subCategoryName?: string }) => {
    const response = await api.put(`/users/${id}/status`, data);
    return response.data;
};

export default api;
