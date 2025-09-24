<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">Sign In</h2>
      <p class="login-subtitle">Welcome back! Please sign in to your account.</p>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="form-input"
            placeholder="Enter your email"
          />
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            class="form-input"
            placeholder="Enter your password"
          />
        </div>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        
        <button type="submit" :disabled="loading" class="btn btn-primary">
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>
      
      <p class="login-footer">
        Don't have an account? 
        <router-link to="/register" class="link">Sign up here</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const result = await authStore.login(form.value.email, form.value.password)
    
    if (result.success) {
      // Role-based redirect
      const userRole = authStore.getUserRole
      if (userRole === 'user') {
        router.push('/dashboard')
      } else if (userRole?.startsWith('provider_')) {
        router.push('/provider-dashboard')
      } else {
        router.push('/')
      }
    } else {
      error.value = result.error
    }
  } catch (err) {
    error.value = 'An unexpected error occurred'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
}

.login-card {
  background: white;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-title {
  font-size: 2rem;
  font-weight: bold;
  color: #334155;
  margin-bottom: 0.5rem;
  text-align: center;
}

.login-subtitle {
  color: #64748b;
  text-align: center;
  margin-bottom: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #374151;
}

.form-input {
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
}

.btn {
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  background-color: #fee2e2;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 0.5rem;
  text-align: center;
}

.login-footer {
  text-align: center;
  margin-top: 2rem;
  color: #64748b;
}

.link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.link:hover {
  text-decoration: underline;
}
</style>
