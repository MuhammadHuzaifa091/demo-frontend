// src/api/index.js
import api from './axios';

// Repair Requests API
export const repairRequestsAPI = {
  getAll: () => api.get('/repair-requests/'),
  getMyRequests: () => api.get('/repair-requests/my-requests'),
  getById: (id) => api.get(`/repair-requests/${id}`),
  create: (data) => api.post('/repair-requests/', data),
  update: (id, data) => api.put(`/repair-requests/${id}`, data),
  delete: (id) => api.delete(`/repair-requests/${id}`)
};

// Service Providers API
export const serviceProvidersAPI = {
  getAll: () => api.get('/providers/'),
  getMyProviders: () => api.get('/providers/my/providers'),
  getById: (id) => api.get(`/providers/${id}`),
  create: (data) => api.post('/providers/', data),
  update: (id, data) => api.put(`/providers/${id}`, data),
  delete: (id) => api.delete(`/providers/${id}`)
};

// Services API
export const servicesAPI = {
  getAll: () => api.get('/services/'),
  getById: (id) => api.get(`/services/${id}`),
  create: (data) => api.post('/services/', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
  getMyServices: () => api.get('/services/my/services')
};
