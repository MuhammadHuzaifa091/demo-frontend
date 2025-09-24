<template>
  <div class="repair-requests">
    <div class="header">
      <h1 class="page-title">🔧 Repair Requests</h1>
      <button @click="showCreateForm = true" class="btn btn-primary">
        + New Request
      </button>
    </div>

    <!-- Create/Edit Form Modal -->
    <div v-if="showCreateForm || editingRequest" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3 class="modal-title">
          {{ editingRequest ? 'Edit Repair Request' : 'Create New Repair Request' }}
        </h3>
        
        <form @submit.prevent="submitForm" class="request-form">
          <div class="form-group">
            <label for="title">Title</label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              required
              class="form-input"
              placeholder="Brief description of the repair needed"
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
              placeholder="Detailed description of the issue and repair requirements"
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
              {{ loading ? 'Saving...' : (editingRequest ? 'Update' : 'Create') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Requests List -->
    <div v-if="loadingRequests" class="loading">
      Loading repair requests...
    </div>
    
    <div v-else-if="requests.length === 0" class="empty-state">
      <div class="empty-icon">📝</div>
      <h3>No repair requests yet</h3>
      <p>Create your first repair request to get started!</p>
    </div>
    
    <div v-else class="requests-grid">
      <div
        v-for="request in requests"
        :key="request.id"
        class="request-card"
      >
        <div class="request-header">
          <h3 class="request-title">{{ request.title }}</h3>
          <div class="request-actions">
            <button
              v-if="canEdit(request)"
              @click="startEdit(request)"
              class="btn-icon"
              title="Edit"
            >
              ✏️
            </button>
            <button
              v-if="canDelete(request)"
              @click="deleteRequest(request.id)"
              class="btn-icon delete"
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </div>
        
        <p class="request-description">{{ request.description }}</p>
        
        <div class="request-meta">
          <span class="request-date">
            Created: {{ formatDate(request.created_at) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { repairRequestsAPI } from '../services/api'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const requests = ref([])
const loadingRequests = ref(false)
const showCreateForm = ref(false)
const editingRequest = ref(null)
const loading = ref(false)
const error = ref('')

const form = ref({
  title: '',
  description: ''
})

const fetchRequests = async () => {
  loadingRequests.value = true
  try {
    const response = await repairRequestsAPI.getAll()
    requests.value = response.data
  } catch (err) {
    console.error('Failed to fetch requests:', err)
  } finally {
    loadingRequests.value = false
  }
}

const submitForm = async () => {
  loading.value = true
  error.value = ''
  
  try {
    if (editingRequest.value) {
      await repairRequestsAPI.update(editingRequest.value.id, form.value)
    } else {
      await repairRequestsAPI.create(form.value)
    }
    
    await fetchRequests()
    closeModal()
  } catch (err) {
    error.value = err.response?.data?.detail || 'Failed to save request'
  } finally {
    loading.value = false
  }
}

const startEdit = (request) => {
  editingRequest.value = request
  form.value = {
    title: request.title,
    description: request.description
  }
}

const deleteRequest = async (id) => {
  if (!confirm('Are you sure you want to delete this repair request?')) {
    return
  }
  
  try {
    await repairRequestsAPI.delete(id)
    await fetchRequests()
  } catch (err) {
    alert('Failed to delete request')
  }
}

const closeModal = () => {
  showCreateForm.value = false
  editingRequest.value = null
  form.value = { title: '', description: '' }
  error.value = ''
}

const canEdit = (request) => {
  return authStore.user?.id === request.user_id
}

const canDelete = (request) => {
  return authStore.user?.id === request.user_id
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
  fetchRequests()
})
</script>

<style scoped>
.repair-requests {
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
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-title {
  font-size: 1.5rem;
  color: #334155;
  margin-bottom: 1.5rem;
}

.request-form {
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

.requests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.request-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.request-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.request-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.request-title {
  font-size: 1.25rem;
  color: #334155;
  margin: 0;
  flex: 1;
}

.request-actions {
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

.request-description {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.request-meta {
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
}

.request-date {
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
