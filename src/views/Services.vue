<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
    <!-- Header -->
    <div class="bg-white shadow-lg border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Available Services</h1>
            <p class="text-gray-600 mt-1">Find trusted service providers for your needs</p>
          </div>
          <div class="flex items-center space-x-4">
            <span class="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              🔍 Browse Services
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search and Filter -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search services..."
              class="form-input"
            />
          </div>
          <div class="md:w-64">
            <select v-model="selectedServiceType" class="form-input">
              <option value="">All Service Types</option>
              <option v-for="type in serviceTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Services Grid -->
      <div v-if="loading" class="text-center py-12">
        <div class="text-4xl mb-4">⏳</div>
        <p class="text-gray-600">Loading services...</p>
      </div>

      <div v-else-if="filteredServices.length === 0" class="text-center py-12">
        <div class="text-4xl mb-4">🔍</div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No services found</h3>
        <p class="text-gray-600">Try adjusting your search criteria</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="service in filteredServices" 
          :key="service.id"
          class="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div class="p-6">
            <!-- Service Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ service.name }}</h3>
                <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {{ service.service_type }}
                </span>
              </div>
              <div class="text-2xl">🔧</div>
            </div>

            <!-- Provider Info -->
            <div class="mb-4 p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center mb-2">
                <span class="text-sm font-medium text-gray-700">Provider:</span>
                <span class="ml-2 text-sm text-gray-900">
                  {{ getProviderName(service.provider) }}
                </span>
              </div>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-700">Type:</span>
                <span class="ml-2 text-sm text-gray-600">
                  {{ getProviderType(service.provider?.role) }}
                </span>
              </div>
            </div>

            <!-- Description -->
            <div class="mb-4">
              <h4 class="font-medium text-gray-900 mb-2">Description:</h4>
              <p class="text-gray-700 text-sm leading-relaxed">{{ service.description }}</p>
            </div>

            <!-- Contact Info -->
            <div class="mb-6">
              <h4 class="font-medium text-gray-900 mb-2">Contact Information:</h4>
              <div class="bg-green-50 p-3 rounded-lg">
                <p class="text-green-800 text-sm whitespace-pre-line">{{ service.contact_info }}</p>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex justify-between items-center pt-4 border-t border-gray-200">
              <span class="text-xs text-gray-500">
                Listed {{ formatDate(service.created_at) }}
              </span>
              <button 
                @click="contactProvider(service)"
                class="btn btn-primary text-sm"
              >
                Contact Provider
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Modal -->
    <div v-if="showContactModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showContactModal = false">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" @click.stop>
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Contact Provider</h3>
        
        <div v-if="selectedService" class="mb-4">
          <p class="text-gray-700 mb-2">
            <strong>Service:</strong> {{ selectedService.name }}
          </p>
          <p class="text-gray-700 mb-4">
            <strong>Provider:</strong> {{ getProviderName(selectedService.provider) }}
          </p>
          
          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-medium text-blue-900 mb-2">Contact Information:</h4>
            <p class="text-blue-800 whitespace-pre-line">{{ selectedService.contact_info }}</p>
          </div>
        </div>
        
        <div class="flex justify-end space-x-3">
          <button @click="showContactModal = false" class="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { servicesAPI } from '../services/api'

const authStore = useAuthStore()

const services = ref([])
const loading = ref(false)
const searchQuery = ref('')
const selectedServiceType = ref('')
const showContactModal = ref(false)
const selectedService = ref(null)

const serviceTypes = computed(() => {
  const types = [...new Set(services.value.map(service => service.service_type))]
  return types.sort()
})

const filteredServices = computed(() => {
  let filtered = services.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(service => 
      service.name.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.service_type.toLowerCase().includes(query)
    )
  }

  if (selectedServiceType.value) {
    filtered = filtered.filter(service => service.service_type === selectedServiceType.value)
  }

  return filtered
})

const fetchServices = async () => {
  loading.value = true
  try {
    const response = await servicesAPI.getAll()
    services.value = response.data
  } catch (err) {
    console.error('Failed to fetch services:', err)
  } finally {
    loading.value = false
  }
}

const getProviderName = (provider) => {
  if (!provider) return 'Unknown Provider'
  if (provider.company_name) {
    return provider.company_name
  }
  return `${provider.first_name || ''} ${provider.last_name || ''}`.trim() || 'Unknown Provider'
}

const getProviderType = (role) => {
  switch (role) {
    case 'provider_individual':
      return 'Individual Professional'
    case 'provider_organization':
      return 'Organization'
    default:
      return 'Service Provider'
  }
}

const contactProvider = (service) => {
  selectedService.value = service
  showContactModal.value = true
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  fetchServices()
})
</script>
