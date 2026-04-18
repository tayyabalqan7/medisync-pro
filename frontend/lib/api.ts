import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('medisync_token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const medicineApi = {
  getAll: (params?: { search?: string; category?: string; page?: number }) =>
    api.get('/medicines', { params }),
  getById: (id: number) => api.get(`/medicines/${id}`),
  getCategories: () => api.get('/medicines/categories'),
  checkInteractions: (medicines: string[]) =>
    api.post('/medicines/interactions/check', { medicines }),
};

export const symptomApi = {
  getAll: () => api.get('/symptoms'),
  analyze: (symptoms: string[]) => api.post('/symptoms/analyze', { symptoms }),
};

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),
  getProfile: () => api.get('/auth/profile'),
};

export const patientApi = {
  getRecords: () => api.get('/patients'),
  createRecord: (data: unknown) => api.post('/patients', data),
  updateRecord: (id: string, data: unknown) => api.put(`/patients/${id}`, data),
  deleteRecord: (id: string) => api.delete(`/patients/${id}`),
};

export default api;
