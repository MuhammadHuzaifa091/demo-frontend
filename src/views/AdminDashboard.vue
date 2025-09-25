<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
    <!-- Header -->
    <div class="bg-white shadow-lg border-b border-purple-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p class="text-gray-600 mt-1">Manage your platform and view analytics</p>
          </div>
          <div class="flex items-center space-x-4">
            <span class="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-lg">
              👑 Administrator
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
        <p class="text-gray-600 mt-4">Loading dashboard...</p>
      </div>

      <!-- Dashboard Content -->
      <div v-else>
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="stats-card bg-gradient-to-br from-pink-500 to-pink-600 text-white">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <span class="text-2xl">👥</span>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-pink-100 text-sm font-medium">Total Users</p>
                <p class="text-3xl font-bold">{{ analytics.totals?.users || 0 }}</p>
              </div>
            </div>
          </div>

          <div class="stats-card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <span class="text-2xl">🔧</span>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-purple-100 text-sm font-medium">Service Providers</p>
                <p class="text-3xl font-bold">{{ analytics.totals?.providers || 0 }}</p>
              </div>
            </div>
          </div>

          <div class="stats-card bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <span class="text-2xl">📝</span>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-indigo-100 text-sm font-medium">Repair Requests</p>
                <p class="text-3xl font-bold">{{ analytics.totals?.repair_requests || 0 }}</p>
              </div>
            </div>
          </div>

          <div class="stats-card bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <span class="text-2xl">⚙️</span>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-emerald-100 text-sm font-medium">Total Services</p>
                <p class="text-3xl font-bold">{{ analytics.totals?.services || 0 }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Charts and Analytics -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <!-- User Role Distribution -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">User Role Distribution</h3>
            <div class="space-y-3">
              <div v-for="(count, role) in analytics.distributions?.user_roles" :key="role" class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-4 h-4 rounded-full mr-3" :class="getRoleColor(role)"></div>
                  <span class="text-sm font-medium text-gray-700 capitalize">{{ formatRoleName(role) }}</span>
                </div>
                <span class="text-sm font-bold text-gray-900">{{ count }}</span>
              </div>
            </div>
          </div>

          <!-- Service Types -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Popular Service Types</h3>
            <div class="space-y-3">
              <div v-for="(count, serviceType) in analytics.distributions?.service_types" :key="serviceType" class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">{{ serviceType }}</span>
                <div class="flex items-center">
                  <div class="w-20 h-2 bg-gray-200 rounded-full mr-3">
                    <div 
                      class="h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-500"
                      :style="{ width: `${(count / Math.max(...Object.values(analytics.distributions?.service_types || {}))) * 100}%` }"
                    ></div>
                  </div>
                  <span class="text-sm font-bold text-gray-900">{{ count }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Recent Requests -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Repair Requests</h3>
            <div class="space-y-4">
              <div v-for="request in analytics.recent_requests" :key="request.id" class="border-l-4 border-purple-400 pl-4 py-2">
                <div class="flex items-center justify-between">
                  <h4 class="font-medium text-gray-900">{{ request.title }}</h4>
                  <span v-if="request.has_voice" class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">🎤 Voice</span>
                </div>
                <p class="text-sm text-gray-600">by {{ request.user_name }}</p>
                <p class="text-xs text-gray-500">{{ formatDate(request.created_at) }}</p>
              </div>
              <div v-if="!analytics.recent_requests?.length" class="text-center py-4 text-gray-500">
                No recent requests
              </div>
            </div>
          </div>

          <!-- User Management Quick Actions -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div class="space-y-3">
              <button @click="showUserManagement = true" class="w-full btn bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all duration-300">
                👥 Manage Users
              </button>
              <button @click="showServiceManagement = true" class="w-full btn bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 transition-all duration-300">
                ⚙️ Manage Services
              </button>
              <button @click="showRequestManagement = true" class="w-full btn bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-600 hover:to-blue-600 transition-all duration-300">
                📝 Manage Requests
              </button>
              <button @click="refreshAnalytics" class="w-full btn btn-outline border-purple-300 text-purple-600 hover:bg-purple-50 transition-all duration-300">
                🔄 Refresh Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- User Management Modal -->
    <div v-if="showUserManagement" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showUserManagement = false">
      <div class="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto" @click.stop>
        <h3 class="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
        
        <div v-if="loadingUsers" class="text-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
        </div>
        
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in users" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ user.first_name }} {{ user.last_name }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="getRoleBadgeClass(user.role)">
                    {{ formatRoleName(user.role) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button @click="editUser(user)" class="text-purple-600 hover:text-purple-900 mr-3">Edit</button>
                  <button @click="deleteUser(user)" class="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="flex justify-end mt-4">
          <button @click="showUserManagement = false" class="btn btn-secondary">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import axios from 'axios'

const authStore = useAuthStore()

const loading = ref(false)
const loadingUsers = ref(false)
const analytics = ref({})
const users = ref([])
const showUserManagement = ref(false)
const showServiceManagement = ref(false)
const showRequestManagement = ref(false)

const fetchAnalytics = async () => {
  loading.value = true
  try {
    const response = await axios.get('/api/v1/admin/analytics/dashboard')
    analytics.value = response.data
  } catch (err) {
    console.error('Failed to fetch analytics:', err)
  } finally {
    loading.value = false
  }
}

const fetchUsers = async () => {
  loadingUsers.value = true
  try {
    const response = await axios.get('/api/v1/admin/users')
    users.value = response.data
  } catch (err) {
    console.error('Failed to fetch users:', err)
  } finally {
    loadingUsers.value = false
  }
}

const refreshAnalytics = async () => {
  await fetchAnalytics()
}

const getRoleColor = (role) => {
  const colors = {
    'user': 'bg-blue-500',
    'provider_individual': 'bg-green-500',
    'provider_organization': 'bg-purple-500',
    'admin': 'bg-pink-500'
  }
  return colors[role] || 'bg-gray-500'
}

const getRoleBadgeClass = (role) => {
  const classes = {
    'user': 'bg-blue-100 text-blue-800',
    'provider_individual': 'bg-green-100 text-green-800',
    'provider_organization': 'bg-purple-100 text-purple-800',
    'admin': 'bg-pink-100 text-pink-800'
  }
  return classes[role] || 'bg-gray-100 text-gray-800'
}

const formatRoleName = (role) => {
  const names = {
    'user': 'User',
    'provider_individual': 'Individual Provider',
    'provider_organization': 'Organization',
    'admin': 'Administrator'
  }
  return names[role] || role
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

const editUser = (user) => {
  // TODO: Implement user editing
  console.log('Edit user:', user)
}

const deleteUser = async (user) => {
  if (confirm(`Are you sure you want to delete ${user.first_name} ${user.last_name}?`)) {
    try {
      await axios.delete(`/api/v1/admin/users/${user.id}`)
      await fetchUsers()
    } catch (err) {
      console.error('Failed to delete user:', err)
    }
  }
}

onMounted(() => {
  fetchAnalytics()
})

// Watch for user management modal opening
const originalShowUserManagement = showUserManagement.value
const unwatchUserManagement = () => {
  if (showUserManagement.value && !originalShowUserManagement) {
    fetchUsers()
  }
}
</script>

<style scoped>
.stats-card {
  @apply p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl;
}

.card {
  @apply bg-white rounded-xl shadow-lg border border-purple-100 transform transition-all duration-300 hover:shadow-xl;
}

.btn {
  @apply px-4 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2;
}

.btn-outline {
  @apply border-2 bg-transparent;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-800 hover:bg-gray-300;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
</style>
