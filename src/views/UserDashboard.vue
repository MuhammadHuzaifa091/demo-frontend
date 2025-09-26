<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header -->
    <div class="bg-white shadow-lg border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Welcome back, {{ authStore.user?.first_name }}!</h1>
            <p class="text-gray-600 mt-1">Create repair requests and find trusted service providers</p>
          </div>
          <div class="flex items-center space-x-4">
            <span class="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              👤 User
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Quick Actions - Only show for regular users -->
      <div v-if="authStore.user?.role === 'user'" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="card p-6 hover:shadow-lg transition-shadow cursor-pointer" @click="$router.push('/repair-requests')">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span class="text-2xl">📝</span>
              </div>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">My Repair Requests</h3>
              <p class="text-gray-600">View and manage your requests</p>
            </div>
          </div>
        </div>

        <div class="card p-6 hover:shadow-lg transition-shadow cursor-pointer" @click="$router.push('/services')">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span class="text-2xl">🔍</span>
              </div>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Find Services</h3>
              <p class="text-gray-600">Browse available services</p>
            </div>
          </div>
        </div>

        <div class="card p-6 hover:shadow-lg transition-shadow cursor-pointer" @click="showCreateRequest = true">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span class="text-2xl">➕</span>
              </div>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Create Request</h3>
              <p class="text-gray-600">Submit a new repair request</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Message for service providers -->
      <div v-else class="text-center py-12">
        <div class="text-6xl mb-4">🚫</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Access Restricted</h3>
        <p class="text-gray-600 mb-4">Service providers cannot create repair requests.</p>
        <p class="text-sm text-gray-500">Please switch to your provider dashboard to manage your services.</p>
        <button 
          @click="$router.push('/provider-dashboard')" 
          class="mt-4 btn btn-primary"
        >
          Go to Provider Dashboard
        </button>
      </div>

      <!-- Recent Requests - Only show for regular users -->
      <div v-if="authStore.user?.role === 'user'" class="card">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Recent Repair Requests</h2>
        </div>
        <div class="p-6">
          <div v-if="recentRequests.length === 0" class="text-center py-8">
            <div class="text-4xl mb-4">📝</div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No repair requests yet</h3>
            <p class="text-gray-600 mb-4">Create your first repair request to get started</p>
            <button @click="showCreateRequest = true" class="btn btn-primary">
              Create Request
            </button>
          </div>
          
          <div v-else class="space-y-4">
            <div 
              v-for="request in recentRequests" 
              :key="request.id"
              class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900">{{ request.title }}</h3>
                  <p class="text-gray-600 mt-1">{{ request.description }}</p>
                  <p class="text-sm text-gray-500 mt-2">
                    Created: {{ formatDate(request.created_at) }}
                  </p>
                </div>
                <div class="ml-4">
                  <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                    Open
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Request Modal - Only show for regular users -->
    <div v-if="showCreateRequest && authStore.user?.role === 'user'" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showCreateRequest = false">
      <div class="bg-white rounded-lg p-6 w-full max-w-lg mx-4" @click.stop>
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Create Repair Request</h3>
        
        <form @submit.prevent="createRequest">
          <div class="mb-4">
            <label class="form-label">Title</label>
            <input
              v-model="newRequest.title"
              type="text"
              required
              class="form-input"
              placeholder="Brief description of the repair needed"
            />
          </div>
          
          <!-- Input Method Selection -->
          <div class="mb-4">
            <label class="form-label">How would you like to describe the issue?</label>
            <div class="flex space-x-4 mt-2">
              <label class="flex items-center">
                <input
                  v-model="inputMethod"
                  type="radio"
                  value="text"
                  class="mr-2"
                />
                📝 Text Description
              </label>
              <label class="flex items-center">
                <input
                  v-model="inputMethod"
                  type="radio"
                  value="voice"
                  class="mr-2"
                />
                🎤 Voice Recording
              </label>
            </div>
          </div>
          
          <!-- Text Description -->
          <div v-if="inputMethod === 'text'" class="mb-6">
            <label class="form-label">Description</label>
            <textarea
              v-model="newRequest.description"
              rows="4"
              class="form-input"
              placeholder="Detailed description of the issue"
              :required="inputMethod === 'text'"
            ></textarea>
          </div>
          
          <!-- Voice Upload -->
          <div v-if="inputMethod === 'voice'" class="mb-6">
            <label class="form-label">Voice Recording</label>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                ref="voiceFileInput"
                type="file"
                accept="audio/*,.mp3,.wav,.m4a"
                @change="handleVoiceFile"
                class="hidden"
              />
              
              <div v-if="!selectedVoiceFile" class="text-center">
                <div class="text-4xl mb-2">🎤</div>
                <button
                  type="button"
                  @click="$refs.voiceFileInput.click()"
                  class="btn btn-outline"
                >
                  Upload Voice Recording
                </button>
                <p class="text-sm text-gray-500 mt-2">
                  Supported formats: MP3, WAV, M4A (Max 10MB)
                </p>
              </div>
              
              <div v-else class="text-center">
                <div class="text-4xl mb-2">🎵</div>
                <p class="font-medium text-gray-900">{{ selectedVoiceFile.name }}</p>
                <p class="text-sm text-gray-500">{{ formatFileSize(selectedVoiceFile.size) }}</p>
                <button
                  type="button"
                  @click="removeVoiceFile"
                  class="text-red-600 hover:text-red-800 text-sm mt-2"
                >
                  Remove file
                </button>
              </div>
            </div>
          </div>
          
          <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            {{ error }}
          </div>
          
          <div class="flex justify-end space-x-3">
            <button type="button" @click="showCreateRequest = false" class="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" :disabled="loading || !canSubmit" class="btn btn-primary">
              {{ loading ? 'Creating...' : 'Create Request' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { repairRequestsAPI } from '../services/api'

const authStore = useAuthStore()

const recentRequests = ref([])
const showCreateRequest = ref(false)
const loading = ref(false)
const error = ref('')
const inputMethod = ref('text')
const selectedVoiceFile = ref(null)

const newRequest = ref({
  title: '',
  description: ''
})

const canSubmit = computed(() => {
  if (!newRequest.value.title) return false
  if (inputMethod.value === 'text') return !!newRequest.value.description
  if (inputMethod.value === 'voice') return !!selectedVoiceFile.value
  return false
})

const fetchRecentRequests = async () => {
  try {
    const response = await repairRequestsAPI.getMyRequests()
    // Show user's own requests and limit to 5 most recent
    recentRequests.value = response.data.slice(0, 5)
  } catch (err) {
    console.error('Failed to fetch requests:', err)
  }
}

const handleVoiceFile = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      error.value = 'File size must be less than 10MB'
      return
    }
    selectedVoiceFile.value = file
    error.value = ''
  }
}

const removeVoiceFile = () => {
  selectedVoiceFile.value = null
  if (document.querySelector('input[type="file"]')) {
    document.querySelector('input[type="file"]').value = ''
  }
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const createRequest = async () => {
  loading.value = true
  error.value = ''

  try {
    const requestData = {
      title: newRequest.value.title,
      description: inputMethod.value === 'text' ? newRequest.value.description : undefined
    }

    // Use the configured API service instead of raw axios
    await repairRequestsAPI.create(requestData)

    showCreateRequest.value = false
    newRequest.value = { title: '', description: '' }
    selectedVoiceFile.value = null
    inputMethod.value = 'text'
    await fetchRecentRequests()
  } catch (err) {
    error.value = err.response?.data?.detail || 'Failed to create request'
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  fetchRecentRequests()
})
</script>
