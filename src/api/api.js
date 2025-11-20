import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const getCurrentUser = () => api.get('/auth/me');

// Games API
export const getGames = () => api.get('/games');
export const getGame = (id) => api.get(`/games/${id}`);
export const createGame = (data) => api.post('/games', data);
export const updateGame = (id, data) => api.put(`/games/${id}`, data);
export const deleteGame = (id) => api.delete(`/games/${id}`);

// Reviews API
export const getReviews = (gameId) => api.get(`/reviews/${gameId}`);
export const getAllReviews = () => api.get('/reviews');
export const createReview = (data) => api.post('/reviews', data);
export const updateReview = (id, data) => api.put(`/reviews/${id}`, data);
export const deleteReview = (id) => api.delete(`/reviews/${id}`);

export default api;
