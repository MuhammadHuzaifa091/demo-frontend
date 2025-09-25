import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/axios'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

  const isAuthenticated = computed(() => !!token.value)

  // Set up api interceptor for authentication
  api.interceptors.request.use((config) => {
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`
    }
    return config
  })

  // Handle token expiration
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout()
      }
      return Promise.reject(error)
    }
  )

  const login = async (email, password) => {
    try {
      const formData = new FormData()
      formData.append('username', email)
      formData.append('password', password)

      const response = await api.post('/auth/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      const { access_token } = response.data
      token.value = access_token
      localStorage.setItem('token', access_token)

      // Get user info
      const userResponse = await api.get('/users/me')
      user.value = userResponse.data
      localStorage.setItem('user', JSON.stringify(userResponse.data))

      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed' 
      }
    }
  }

  const register = async (registrationData) => {
    try {
      const response = await api.post('/auth/register-with-role', registrationData)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Registration failed' 
      }
    }
  }

  const parseJwtToken = (token) => {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))
      return JSON.parse(jsonPayload)
    } catch (error) {
      return null
    }
  }

  const getUserRole = computed(() => {
    if (!token.value) return null
    const payload = parseJwtToken(token.value)
    return payload?.role || null
  })

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  const initializeAuth = async () => {
    if (token.value) {
      try {
        const userResponse = await api.get('/users/me')
        user.value = userResponse.data
        localStorage.setItem('user', JSON.stringify(userResponse.data))
      } catch (error) {
        logout()
      }
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    getUserRole,
    login,
    register,
    logout,
    initializeAuth
  }
})
