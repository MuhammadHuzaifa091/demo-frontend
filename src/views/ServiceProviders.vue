<template>
  <div class="service-providers">
    <div class="header">
      <h1 class="page-title">🏢 Service Providers</h1>
      <button 
        v-if="authStore.getUserRole?.startsWith('provider_')" 
        @click="showCreateForm = true" 
        class="btn btn-primary"
      >
        + Add Service
      </button>
    </div>

    <!-- Create/Edit Form Modal - Providers only -->
    <div v-if="(showCreateForm || editingProvider) && authStore.getUserRole?.startsWith('provider_')" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3 class="modal-title">
          {{ editingProvider ? 'Edit Service Provider' : 'Add New Service Provider' }}
        </h3>
        
        <form @submit.prevent="submitForm" class="provider-form">
          <div class="form-group">
            <label for="name">Business Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="form-input"
              placeholder="Enter business name"
            />
          </div>
          
          <div class="form-group">
            <label for="serviceType">Service Type</label>
            <input
              id="serviceType"
              v-model="form.service_type"
              type="text"
              required
              class="form-input"
              placeholder="e.g., Plumbing, Electrical, HVAC"
            />
          </div>
          
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              v-model="form.description"
              required
              rows="4"
              class="form-input"
              placeholder="Describe your services, experience, and specialties"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="contactInfo">Contact Information</label>
            <textarea
              id="contactInfo"
              v-model="form.contact_info"
              required
              rows="3"
              class="form-input"
              placeholder="Phone, email, address, website, etc."
            ></textarea>
          </div>
          
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
          
          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" :disabled="loading" class="btn btn-primary">
              {{ loading ? 'Saving...' : (editingProvider ? 'Update' : 'Add Service') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Providers List -->
    <div v-if="loadingProviders" class="loading">
      Loading service providers...
    </div>
    
    <div v-else-if="providers.length === 0" class="empty-state">
      <div class="empty-icon">🏢</div>
      <h3>No service providers yet</h3>
      <p>Be the first to add your service provider information!</p>
    </div>
    
    <div v-else class="providers-grid">
      <div
        v-for="provider in providers"
        :key="provider.id"
        class="provider-card"
      >
        <div class="provider-header">
          <div class="provider-info">
            <h3 class="provider-name">{{ provider.name }}</h3>
            <span class="service-type">{{ provider.service_type }}</span>
          </div>
          <div class="provider-actions">
            <button
              v-if="canEdit(provider)"
              @click="startEdit(provider)"
              class="btn-icon"
              title="Edit"
            >
              ✏️
            </button>
            <button
              v-if="canDelete(provider)"
              @click="deleteProvider(provider.id)"
              class="btn-icon delete"
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </div>
        
        <p class="provider-description">{{ provider.description }}</p>
        
        <div class="contact-section">
          <h4 class="contact-title">Contact Information</h4>
          <p class="contact-info">{{ provider.contact_info }}</p>
        </div>
        
        <div class="provider-meta">
          <span class="provider-date">
            Added: {{ formatDate(provider.created_at) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { serviceProvidersAPI } from '../services/api'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const providers = ref([])
const loadingProviders = ref(false)
const showCreateForm = ref(false)
const editingProvider = ref(null)
const loading = ref(false)
const error = ref('')

const form = ref({
  name: '',
  service_type: '',
  description: '',
  contact_info: ''
})

const fetchProviders = async () => {
  loadingProviders.value = true
  try {
    // Role-based API call
    const isProvider = authStore.getUserRole?.startsWith('provider_')
    const response = isProvider 
      ? await serviceProvidersAPI.getMyProviders() // Providers see their own listings
      : await serviceProvidersAPI.getAll() // Users browse all providers
    providers.value = response.data
  } catch (err) {
    console.error('Failed to fetch providers:', err)
  } finally {
    loadingProviders.value = false
  }
}

const submitForm = async () => {
  loading.value = true
  error.value = ''
  
  try {
    if (editingProvider.value) {
      await serviceProvidersAPI.update(editingProvider.value.id, form.value)
    } else {
      await serviceProvidersAPI.create(form.value)
    }
    
    await fetchProviders()
    closeModal()
  } catch (err) {
    error.value = err.response?.data?.detail || 'Failed to save provider'
  } finally {
    loading.value = false
  }
}

const startEdit = (provider) => {
  editingProvider.value = provider
  form.value = {
    name: provider.name,
    service_type: provider.service_type,
    description: provider.description,
    contact_info: provider.contact_info
  }
}

const deleteProvider = async (id) => {
  if (!confirm('Are you sure you want to delete this service provider?')) {
    return
  }
  
  try {
    await serviceProvidersAPI.delete(id)
    await fetchProviders()
  } catch (err) {
    alert('Failed to delete provider')
  }
}

const closeModal = () => {
  showCreateForm.value = false
  editingProvider.value = null
  form.value = {
    name: '',
    service_type: '',
    description: '',
    contact_info: ''
  }
  error.value = ''
}

const canEdit = (provider) => {
  return authStore.user?.id === provider.user_id
}

const canDelete = (provider) => {
  return authStore.user?.id === provider.user_id
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  fetchProviders()
})
</script>

<style scoped>
.service-providers {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2.5rem;
  color: #334155;
  margin: 0;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background-color: #e5e7eb;
  color: #374151;
}

.btn-secondary:hover {
  background-color: #d1d5db;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-title {
  font-size: 1.5rem;
  color: #334155;
  margin-bottom: 1.5rem;
}

.provider-form {
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
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.loading {
  text-align: center;
  padding: 3rem;
  color: #64748b;
  font-size: 1.1rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.providers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
}

.provider-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.provider-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.provider-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.provider-info {
  flex: 1;
}

.provider-name {
  font-size: 1.25rem;
  color: #334155;
  margin: 0 0 0.25rem 0;
}

.service-type {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.provider-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
}

.btn-icon:hover {
  background-color: #f1f5f9;
}

.btn-icon.delete:hover {
  background-color: #fee2e2;
}

.provider-description {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.contact-section {
  background-color: #f8fafc;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.contact-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
}

.contact-info {
  color: #64748b;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
}

.provider-meta {
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
}

.provider-date {
  color: #9ca3af;
  font-size: 0.875rem;
}

.error-message {
  background-color: #fee2e2;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 0.5rem;
  text-align: center;
}
</style>
