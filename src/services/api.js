import axios from 'axios'

const API_BASE = '/api/v1'

// Repair Requests API
export const repairRequestsAPI = {
  getAll: () => axios.get(`${API_BASE}/repair-requests/`), // Providers only
  getMyRequests: () => axios.get(`${API_BASE}/repair-requests/my-requests`), // Users only
  getById: (id) => axios.get(`${API_BASE}/repair-requests/${id}`),
  create: (data) => axios.post(`${API_BASE}/repair-requests/`, data),
  update: (id, data) => axios.put(`${API_BASE}/repair-requests/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE}/repair-requests/${id}`)
}

// Service Providers API
export const serviceProvidersAPI = {
  getAll: () => axios.get(`${API_BASE}/providers/`), // Users only - for browsing
  getMyProviders: () => axios.get(`${API_BASE}/providers/my/providers`), // Providers only
  getById: (id) => axios.get(`${API_BASE}/providers/${id}`),
  create: (data) => axios.post(`${API_BASE}/providers/`, data),
  update: (id, data) => axios.put(`${API_BASE}/providers/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE}/providers/${id}`)
}

// Services API
export const servicesAPI = {
  getAll: () => axios.get(`${API_BASE}/services/`), // Users only
  getById: (id) => axios.get(`${API_BASE}/services/${id}`), // Users only
  create: (data) => axios.post(`${API_BASE}/services/`, data), // Providers only
  update: (id, data) => axios.put(`${API_BASE}/services/${id}`, data), // Providers only
  delete: (id) => axios.delete(`${API_BASE}/services/${id}`), // Providers only
  getMyServices: () => axios.get(`${API_BASE}/services/my/services`) // Providers only
}
