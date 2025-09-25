import api from './axios'

const API_BASE = '/api/v1'

// Repair Requests API
export const repairRequestsAPI = {
  getAll: () => api.get(`${API_BASE}/repair-requests/`), // Providers only
  getMyRequests: () => api.get(`${API_BASE}/repair-requests/my-requests`), // Users only
  getById: (id) => api.get(`${API_BASE}/repair-requests/${id}`),
  create: (data) => api.post(`${API_BASE}/repair-requests/`, data),
  update: (id, data) => api.put(`${API_BASE}/repair-requests/${id}`, data),
  delete: (id) => api.delete(`${API_BASE}/repair-requests/${id}`)
}

// Service Providers API
export const serviceProvidersAPI = {
  getAll: () => api.get(`${API_BASE}/providers/`), // Users only - for browsing
  getMyProviders: () => api.get(`${API_BASE}/providers/my/providers`), // Providers only
  getById: (id) => api.get(`${API_BASE}/providers/${id}`),
  create: (data) => api.post(`${API_BASE}/providers/`, data),
  update: (id, data) => api.put(`${API_BASE}/providers/${id}`, data),
  delete: (id) => api.delete(`${API_BASE}/providers/${id}`)
}

// Services API
export const servicesAPI = {
  getAll: () => api.get(`${API_BASE}/services/`), // Users only
  getById: (id) => api.get(`${API_BASE}/services/${id}`), // Users only
  create: (data) => api.post(`${API_BASE}/services/`, data), // Providers only
  update: (id, data) => api.put(`${API_BASE}/services/${id}`, data), // Providers only
  delete: (id) => api.delete(`${API_BASE}/services/${id}`), // Providers only
  getMyServices: () => api.get(`${API_BASE}/services/my/services`) // Providers only
}

// Admin API
export const adminAPI = {
  getDashboard: () => api.get(`${API_BASE}/admin/analytics/dashboard`), // Admin only
  getUsers: () => api.get(`${API_BASE}/admin/users`), // Admin only
  updateUserRole: (userId, newRole) => api.put(`${API_BASE}/admin/users/${userId}/role`, { new_role: newRole }), // Admin only
  deleteUser: (userId) => api.delete(`${API_BASE}/admin/users/${userId}`), // Admin only
  getAllRepairRequests: () => api.get(`${API_BASE}/admin/repair-requests`), // Admin only
  deleteRepairRequest: (requestId) => api.delete(`${API_BASE}/admin/repair-requests/${requestId}`), // Admin only
  getAllServices: () => api.get(`${API_BASE}/admin/services`), // Admin only
  deleteService: (serviceId) => api.delete(`${API_BASE}/admin/services/${serviceId}`) // Admin only
}
