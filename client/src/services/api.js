import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getResources = () => api.get('/resources');
export const createResource = (data) => api.post('/resources', data);
export const getBookings = () => api.get('/bookings');
export const createBooking = (data) => api.post('/bookings', data);
export const updateBookingStatus = (id, status) => api.put(`/bookings/${id}/status`, { status });
export const getUtilization = (params) => api.get('/analytics/utilization', { params });
export const getMostUsed = (params) => api.get('/analytics/most-used', { params });
export const getIdleTimes = (params) => api.get('/analytics/idle-times', { params });

export default api;