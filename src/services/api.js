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

// Admin API
export const adminAPI = {
  getDashboard: () => axios.get(`${API_BASE}/admin/analytics/dashboard`), // Admin only
  getUsers: () => axios.get(`${API_BASE}/admin/users`), // Admin only
  updateUserRole: (userId, newRole) => axios.put(`${API_BASE}/admin/users/${userId}/role`, { new_role: newRole }), // Admin only
  deleteUser: (userId) => axios.delete(`${API_BASE}/admin/users/${userId}`), // Admin only
  getAllRepairRequests: () => axios.get(`${API_BASE}/admin/repair-requests`), // Admin only
  deleteRepairRequest: (requestId) => axios.delete(`${API_BASE}/admin/repair-requests/${requestId}`), // Admin only
  getAllServices: () => axios.get(`${API_BASE}/admin/services`), // Admin only
  deleteService: (serviceId) => axios.delete(`${API_BASE}/admin/services/${serviceId}`) // Admin only
}
