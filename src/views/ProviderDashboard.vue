<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">
              Welcome, {{ getProviderName() }}!
            </h1>
            <p class="text-gray-600 mt-1">Manage your services and connect with customers</p>
          </div>
          <div class="flex items-center space-x-4">
            <span 
              class="px-3 py-1 rounded-full text-sm font-medium"
              :class="{
                'bg-green-100 text-green-800': authStore.getUserRole === 'provider_individual',
                'bg-blue-100 text-blue-800': authStore.getUserRole === 'provider_organization'
              }"
            >
              {{ authStore.getUserRole === 'provider_individual' ? 'Individual Provider' : 'Organization' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span class="text-2xl">📊</span>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Services</p>
              <p class="text-2xl font-bold text-gray-900">{{ myServices.length }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span class="text-2xl">👥</span>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Profile Views</p>
              <p class="text-2xl font-bold text-gray-900">--</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span class="text-2xl">⭐</span>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Rating</p>
              <p class="text-2xl font-bold text-gray-900">--</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span class="text-2xl">📈</span>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">This Month</p>
              <p class="text-2xl font-bold text-gray-900">--</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions - Only show for service providers -->
      <div v-if="authStore.user?.role === 'provider_individual' || authStore.user?.role === 'provider_organization'" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="card p-6 hover:shadow-lg transition-shadow cursor-pointer" @click="$router.push('/service-providers')">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span class="text-2xl">🏢</span>
              </div>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">My Services</h3>
              <p class="text-gray-600">Manage your service listings</p>
            </div>
          </div>
        </div>

        <div class="card p-6 hover:shadow-lg transition-shadow cursor-pointer" @click="showRepairRequests = true">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span class="text-2xl">📋</span>
              </div>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Browse Requests</h3>
              <p class="text-gray-600">Find new opportunities</p>
            </div>
          </div>
        </div>

        <div class="card p-6 hover:shadow-lg transition-shadow cursor-pointer" @click="showCreateService = true">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span class="text-2xl">➕</span>
              </div>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Add Service</h3>
              <p class="text-gray-600">Create new service listing</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Message for regular users -->
      <div v-else class="text-center py-12">
        <div class="text-6xl mb-4">🚫</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Access Restricted</h3>
        <p class="text-gray-600 mb-4">Regular users cannot create or manage services.</p>
        <p class="text-sm text-gray-500">Please switch to your user dashboard to create repair requests.</p>
        <button 
          @click="$router.push('/dashboard')" 
          class="mt-4 btn btn-primary"
        >
          Go to User Dashboard
        </button>
      </div>

      <!-- Recent Activity - Only show for service providers -->
      <div v-if="authStore.user?.role === 'provider_individual' || authStore.user?.role === 'provider_organization'" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- My Services -->
        <div class="card">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900">My Services</h2>
          </div>
          <div class="p-6">
            <div v-if="myServices.length === 0" class="text-center py-8">
              <div class="text-4xl mb-4">🏢</div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">No services listed yet</h3>
              <p class="text-gray-600 mb-4">Create your first service listing to get started</p>
              <button @click="showCreateService = true" class="btn btn-primary">
                Add Service
              </button>
            </div>
            
            <div v-else class="space-y-4">
              <div 
                v-for="service in myServices" 
                :key="service.id"
                class="border border-gray-200 rounded-lg p-4"
              >
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900">{{ service.name }}</h3>
                    <p class="text-sm text-purple-600 font-medium">{{ service.service_type }}</p>
                    <p class="text-gray-600 mt-1 text-sm">{{ service.description }}</p>
                  </div>
                  <div class="ml-4">
                    <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Repair Requests -->
        <div class="card">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900">Recent Repair Requests</h2>
          </div>
          <div class="p-6">
            <div v-if="recentRequests.length === 0" class="text-center py-8">
              <div class="text-4xl mb-4">📝</div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">No recent requests</h3>
              <p class="text-gray-600">New repair requests will appear here</p>
            </div>
            
            <div v-else class="space-y-4">
              <div 
                v-for="request in recentRequests" 
                :key="request.id"
                class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                @click="$router.push('/repair-requests')"
              >
                <h3 class="font-semibold text-gray-900">{{ request.title }}</h3>
                <p class="text-gray-600 mt-1 text-sm">{{ request.description }}</p>
                <p class="text-xs text-gray-500 mt-2">
                  {{ formatDate(request.created_at) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Service Modal - Only show for service providers -->
    <div v-if="showCreateService && (authStore.user?.role === 'provider_individual' || authStore.user?.role === 'provider_organization')" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showCreateService = false">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" @click.stop>
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Add New Service</h3>
        
        <form @submit.prevent="createService">
          <div class="mb-4">
            <label class="form-label">Service Name</label>
            <input
              v-model="newService.name"
              type="text"
              required
              class="form-input"
              placeholder="e.g., Professional Plumbing Services"
            />
          </div>
          
          <div class="mb-4">
            <label class="form-label">Service Type</label>
            <input
              v-model="newService.service_type"
              type="text"
              required
              class="form-input"
              placeholder="e.g., Plumbing, Electrical, HVAC"
            />
          </div>
          
          <div class="mb-4">
            <label class="form-label">Description</label>
            <textarea
              v-model="newService.description"
              required
              rows="3"
              class="form-input"
              placeholder="Describe your services and expertise"
            ></textarea>
          </div>
          
          <div class="mb-6">
            <label class="form-label">Contact Information</label>
            <textarea
              v-model="newService.contact_info"
              required
              rows="2"
              class="form-input"
              placeholder="Phone, email, availability"
            ></textarea>
          </div>
          
          <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            {{ error }}
          </div>
          
          <div class="flex justify-end space-x-3">
            <button type="button" @click="showCreateService = false" class="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" :disabled="loading" class="btn btn-primary">
              {{ loading ? 'Creating...' : 'Add Service' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Repair Requests Modal -->
    <div v-if="showRepairRequests" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showRepairRequests = false">
      <div class="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold text-gray-900">Available Repair Requests</h3>
          <button @click="showRepairRequests = false" class="text-gray-500 hover:text-gray-700">
            <span class="text-2xl">&times;</span>
          </button>
        </div>
        
        <div v-if="allRepairRequests.length === 0" class="text-center py-8">
          <div class="text-4xl mb-4">📝</div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No repair requests available</h3>
          <p class="text-gray-600">Check back later for new opportunities</p>
        </div>
        
        <div v-else class="space-y-4">
          <div 
            v-for="request in allRepairRequests" 
            :key="request.id"
            class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div class="flex justify-between items-start mb-4">
              <div class="flex-1">
                <h4 class="text-lg font-semibold text-gray-900 mb-2">{{ request.title }}</h4>
                <div class="flex items-center text-sm text-gray-500 mb-3">
                  <span>📅 {{ formatDate(request.created_at) }}</span>
                  <span class="mx-2">•</span>
                  <span>👤 {{ request.user?.first_name }} {{ request.user?.last_name }}</span>
                </div>
              </div>
              <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                Open
              </span>
            </div>
            
            <!-- Text Description -->
            <div v-if="request.description" class="mb-4">
              <h5 class="font-medium text-gray-900 mb-2">Description:</h5>
              <p class="text-gray-700 bg-gray-50 p-3 rounded">{{ request.description }}</p>
            </div>
            
            <!-- Voice File -->
            <div v-if="request.voice_file" class="mb-4">
              <h5 class="font-medium text-gray-900 mb-2">Voice Recording:</h5>
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex items-center space-x-3">
                  <div class="text-2xl">🎵</div>
                  <div class="flex-1">
                    <audio 
                      :src="getVoiceFileUrl(request.voice_file)" 
                      controls 
                      class="w-full"
                      preload="metadata"
                    >
                      Your browser does not support audio playback.
                    </audio>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex justify-end">
              <button class="btn btn-primary">
                Contact Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { serviceProvidersAPI, repairRequestsAPI, servicesAPI } from '../services/api'

const authStore = useAuthStore()

const myServices = ref([])
const recentRequests = ref([])
const allRepairRequests = ref([])
const showCreateService = ref(false)
const showRepairRequests = ref(false)
const loading = ref(false)
const error = ref('')

const newService = ref({
  name: '',
  service_type: '',
  description: '',
  contact_info: ''
})

const getProviderName = () => {
  const user = authStore.user
  if (user?.company_name) {
    return user.company_name
  }
  return `${user?.first_name || ''} ${user?.last_name || ''}`.trim()
}

const fetchMyServices = async () => {
  try {
    const response = await servicesAPI.getMyServices()
    // Get user's own service listings
    myServices.value = response.data
  } catch (err) {
    console.error('Failed to fetch services:', err)
  }
}

const fetchRecentRequests = async () => {
  try {
    const response = await repairRequestsAPI.getAll()
    // Show recent requests from other users (potential opportunities)
    const requests = response.data.filter(request => request.user_id !== authStore.user?.id)
    recentRequests.value = requests.slice(0, 5)
    allRepairRequests.value = requests
  } catch (err) {
    console.error('Failed to fetch requests:', err)
  }
}

const getVoiceFileUrl = (voiceFilePath) => {
  if (!voiceFilePath) return ''
  // Extract filename from path
  const filename = voiceFilePath.split('/').pop() || voiceFilePath.split('\\').pop()
  return `/api/v1/repair-requests/voice/${filename}`
}

const createService = async () => {
  loading.value = true
  error.value = ''
  
  try {
    await servicesAPI.create(newService.value)
    showCreateService.value = false
    newService.value = { name: '', service_type: '', description: '', contact_info: '' }
    await fetchMyServices()
  } catch (err) {
    error.value = err.response?.data?.detail || 'Failed to create service'
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
  fetchMyServices()
  fetchRecentRequests()
})
</script>
