import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach auth token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Projects
export const getProjects = () => api.get('/projects');
export const getProject = (id) => api.get(`/projects/${id}`);
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Messages
export const sendMessage = (data) => api.post('/messages', data);
export const getMessages = () => api.get('/messages');
export const markMessageRead = (id) => api.put(`/messages/${id}/read`);
export const deleteMessage = (id) => api.delete(`/messages/${id}`);

// Auth
export const adminLogin = (data) => api.post('/auth/login', data);
export const verifyToken = () => api.get('/auth/verify');

// GitHub
export const getGitHubStats = () => api.get('/github/stats');

// Visitors
export const trackVisit = (data) => api.post('/visitors/track', data);
export const updateSessionDuration = (id, duration) => api.put(`/visitors/track/${id}`, { sessionDuration: duration });
export const getAnalytics = () => api.get('/visitors/analytics');
export const getRecentVisitors = (limit = 50) => api.get(`/visitors/recent?limit=${limit}`);

export default api;
