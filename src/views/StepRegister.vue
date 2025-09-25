<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Join JiaWeiTong</h1>
        <p class="text-lg text-gray-600">Create your account in just a few steps</p>
      </div>

      <!-- Progress Steps -->
      <div class="mb-12">
        <div class="flex items-center justify-center space-x-8">
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="flex items-center"
          >
            <div 
              class="step-indicator"
              :class="{
                'step-active': currentStep === index + 1,
                'step-completed': currentStep > index + 1,
                'step-inactive': currentStep < index + 1
              }"
            >
              <span v-if="currentStep > index + 1">✓</span>
              <span v-else>{{ index + 1 }}</span>
            </div>
            <div class="ml-3 hidden sm:block">
              <p class="text-sm font-medium" :class="{
                'text-purple-600': currentStep === index + 1,
                'text-green-600': currentStep > index + 1,
                'text-gray-500': currentStep < index + 1
              }">
                {{ step.title }}
              </p>
            </div>
            <div 
              v-if="index < steps.length - 1" 
              class="hidden sm:block w-16 h-0.5 ml-8"
              :class="{
                'bg-green-500': currentStep > index + 1,
                'bg-gray-300': currentStep <= index + 1
              }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Form Card -->
      <div class="card max-w-2xl mx-auto">
        <div class="p-8">
          <form @submit.prevent="handleSubmit">
            
            <!-- Step 1: Role Selection -->
            <div v-if="currentStep === 1" class="animate-fade-in">
              <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Your Role</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div 
                  @click="selectRole('user')"
                  class="role-card cursor-pointer p-6 border-2 rounded-xl transition-all duration-300 hover:shadow-lg"
                  :class="{
                    'border-purple-500 bg-purple-50': formData.role === 'user',
                    'border-gray-200 hover:border-purple-300': formData.role !== 'user'
                  }"
                >
                  <div class="text-center">
                    <div class="text-4xl mb-4">👤</div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">User</h3>
                    <p class="text-gray-600">I need repair services for my home or business</p>
                  </div>
                </div>
                
                <div 
                  @click="selectRole('provider')"
                  class="role-card cursor-pointer p-6 border-2 rounded-xl transition-all duration-300 hover:shadow-lg"
                  :class="{
                    'border-purple-500 bg-purple-50': formData.role === 'provider',
                    'border-gray-200 hover:border-purple-300': formData.role !== 'provider'
                  }"
                >
                  <div class="text-center">
                    <div class="text-4xl mb-4">🔧</div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">Service Provider</h3>
                    <p class="text-gray-600">I offer repair and maintenance services</p>
                  </div>
                </div>

                <div 
                  @click="selectRole('admin')"
                  class="role-card cursor-pointer p-6 border-2 rounded-xl transition-all duration-300 hover:shadow-lg"
                  :class="{
                    'border-purple-500 bg-purple-50': formData.role === 'admin',
                    'border-gray-200 hover:border-purple-300': formData.role !== 'admin'
                  }"
                >
                  <div class="text-center">
                    <div class="text-4xl mb-4">👑</div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">Administrator</h3>
                    <p class="text-gray-600">I manage and oversee the platform</p>
                  </div>
                </div>
              </div>

              <!-- Provider Type Selection -->
              <div v-if="formData.role === 'provider'" class="mt-8 animate-slide-up">
                <h3 class="text-lg font-semibold text-gray-900 mb-4 text-center">Provider Type</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    @click="formData.providerType = 'individual'"
                    class="cursor-pointer p-4 border-2 rounded-lg transition-all duration-300"
                    :class="{
                      'border-purple-500 bg-purple-50': formData.providerType === 'individual',
                      'border-gray-200 hover:border-purple-300': formData.providerType !== 'individual'
                    }"
                  >
                    <div class="text-center">
                      <div class="text-2xl mb-2">👨‍🔧</div>
                      <h4 class="font-medium">Individual</h4>
                      <p class="text-sm text-gray-600">Solo service provider</p>
                    </div>
                  </div>
                  
                  <div 
                    @click="formData.providerType = 'organization'"
                    class="cursor-pointer p-4 border-2 rounded-lg transition-all duration-300"
                    :class="{
                      'border-purple-500 bg-purple-50': formData.providerType === 'organization',
                      'border-gray-200 hover:border-purple-300': formData.providerType !== 'organization'
                    }"
                  >
                    <div class="text-center">
                      <div class="text-2xl mb-2">🏢</div>
                      <h4 class="font-medium">Organization</h4>
                      <p class="text-sm text-gray-600">Company or team</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 2: Personal Information -->
            <div v-if="currentStep === 2" class="animate-fade-in">
              <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Personal Information</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="form-label">First Name</label>
                  <input
                    v-model="formData.first_name"
                    type="text"
                    required
                    class="form-input"
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div>
                  <label class="form-label">Last Name</label>
                  <input
                    v-model="formData.last_name"
                    type="text"
                    required
                    class="form-input"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div class="mt-6">
                <label class="form-label">Email Address</label>
                <input
                  v-model="formData.email"
                  type="email"
                  required
                  class="form-input"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div class="mt-6">
                <label class="form-label">Password</label>
                <input
                  v-model="formData.password"
                  type="password"
                  required
                  minlength="6"
                  class="form-input"
                  placeholder="Create a secure password (min 6 characters)"
                />
              </div>
              
              <div class="mt-6">
                <label class="form-label">Confirm Password</label>
                <input
                  v-model="formData.confirmPassword"
                  type="password"
                  required
                  class="form-input"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <!-- Step 3: Role-specific Information -->
            <div v-if="currentStep === 3" class="animate-fade-in">
              <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
                {{ getRoleSpecificTitle() }}
              </h2>
              
              <!-- User - No additional fields -->
              <div v-if="formData.role === 'user'" class="text-center py-8">
                <div class="text-6xl mb-4">🎉</div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Almost Done!</h3>
                <p class="text-gray-600">Click "Complete Registration" to finish setting up your account.</p>
              </div>

              <!-- Admin - No additional fields -->
              <div v-if="formData.role === 'admin'" class="text-center py-8">
                <div class="text-6xl mb-4">👑</div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Administrator Access Ready!</h3>
                <p class="text-gray-600">You'll have full access to manage the platform and view analytics.</p>
                <div class="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
                  <h4 class="font-semibold text-purple-800 mb-2">Admin Privileges Include:</h4>
                  <ul class="text-sm text-purple-700 space-y-1">
                    <li>• User management and role assignment</li>
                    <li>• System analytics and reporting</li>
                    <li>• Service and request oversight</li>
                    <li>• Platform configuration</li>
                  </ul>
                </div>
              </div>
              
              <!-- Individual Provider -->
              <div v-if="formData.role === 'provider' && formData.providerType === 'individual'">
                <div class="space-y-6">
                  <div>
                    <label class="form-label">Service Type</label>
                    <input
                      v-model="formData.service_type"
                      type="text"
                      required
                      class="form-input"
                      placeholder="e.g., Plumbing, Electrical, HVAC, Carpentry"
                    />
                  </div>
                  
                  <div>
                    <label class="form-label">Experience & Skills</label>
                    <textarea
                      v-model="formData.experience"
                      required
                      rows="4"
                      class="form-input"
                      placeholder="Describe your experience, certifications, and specialties..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label class="form-label">Contact Information</label>
                    <textarea
                      v-model="formData.contact_info"
                      required
                      rows="3"
                      class="form-input"
                      placeholder="Phone number, preferred contact method, availability..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <!-- Organization Provider -->
              <div v-if="formData.role === 'provider' && formData.providerType === 'organization'">
                <div class="space-y-6">
                  <div>
                    <label class="form-label">Company Name</label>
                    <input
                      v-model="formData.company_name"
                      type="text"
                      required
                      class="form-input"
                      placeholder="Enter your company name"
                    />
                  </div>
                  
                  <div>
                    <label class="form-label">Service Type</label>
                    <input
                      v-model="formData.service_type"
                      type="text"
                      required
                      class="form-input"
                      placeholder="e.g., General Contracting, HVAC Services, Electrical"
                    />
                  </div>
                  
                  <div>
                    <label class="form-label">Team Size</label>
                    <select
                      v-model="formData.team_size"
                      required
                      class="form-input"
                    >
                      <option value="">Select team size</option>
                      <option value="2">2-5 employees</option>
                      <option value="6">6-10 employees</option>
                      <option value="11">11-25 employees</option>
                      <option value="26">26-50 employees</option>
                      <option value="51">50+ employees</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="form-label">Contact Information</label>
                    <textarea
                      v-model="formData.contact_info"
                      required
                      rows="3"
                      class="form-input"
                      placeholder="Business phone, email, address, website..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-red-600 text-center">{{ error }}</p>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between mt-8">
              <button
                v-if="currentStep > 1"
                type="button"
                @click="previousStep"
                class="btn btn-secondary"
              >
                Previous
              </button>
              
              <div v-else></div>
              
              <button
                v-if="currentStep < 3"
                type="button"
                @click="nextStep"
                :disabled="!canProceed"
                class="btn btn-primary"
                :class="{ 'opacity-50 cursor-not-allowed': !canProceed }"
              >
                Next Step
              </button>
              
              <button
                v-else
                type="submit"
                :disabled="loading || !canProceed"
                class="btn btn-primary"
                :class="{ 'opacity-50 cursor-not-allowed': loading || !canProceed }"
              >
                {{ loading ? 'Creating Account...' : 'Complete Registration' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Login Link -->
      <div class="text-center mt-8">
        <p class="text-gray-600">
          Already have an account? 
          <router-link to="/login" class="text-purple-600 hover:text-purple-700 font-medium">
            Sign in here
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const currentStep = ref(1)
const loading = ref(false)
const error = ref('')

const steps = [
  { title: 'Choose Role' },
  { title: 'Personal Info' },
  { title: 'Additional Details' }
]

const formData = ref({
  role: '',
  providerType: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirmPassword: '',
  service_type: '',
  experience: '',
  contact_info: '',
  company_name: '',
  team_size: ''
})

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1:
      if (formData.value.role === 'user') return true
      if (formData.value.role === 'admin') return true
      if (formData.value.role === 'provider') return !!formData.value.providerType
      return false
    case 2:
      return formData.value.first_name && 
             formData.value.last_name && 
             formData.value.email && 
             formData.value.password && 
             formData.value.confirmPassword &&
             formData.value.password === formData.value.confirmPassword
    case 3:
      if (formData.value.role === 'user') return true
      if (formData.value.role === 'admin') return true
      if (formData.value.role === 'provider' && formData.value.providerType === 'individual') {
        return formData.value.service_type && formData.value.experience && formData.value.contact_info
      }
      if (formData.value.role === 'provider' && formData.value.providerType === 'organization') {
        return formData.value.company_name && formData.value.service_type && 
               formData.value.team_size && formData.value.contact_info
      }
      return false
    default:
      return false
  }
})

const selectRole = (role) => {
  formData.value.role = role
  if (role === 'user' || role === 'admin') {
    formData.value.providerType = ''
  }
}

const nextStep = () => {
  if (canProceed.value && currentStep.value < 3) {
    currentStep.value++
    error.value = ''
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    error.value = ''
  }
}

const getRoleSpecificTitle = () => {
  if (formData.value.role === 'user') {
    return 'Ready to Go!'
  } else if (formData.value.role === 'admin') {
    return 'Administrator Setup Complete!'
  } else if (formData.value.providerType === 'individual') {
    return 'Tell Us About Your Services'
  } else if (formData.value.providerType === 'organization') {
    return 'Company Information'
  }
  return 'Additional Information'
}

const handleSubmit = async () => {
  if (!canProceed.value) return
  
  loading.value = true
  error.value = ''
  
  try {
    // Prepare registration data
    const registrationData = {
      email: formData.value.email,
      password: formData.value.password,
      first_name: formData.value.first_name,
      last_name: formData.value.last_name,
      role: formData.value.role === 'user' ? 'user' : 
            formData.value.role === 'admin' ? 'admin' :
            formData.value.providerType === 'individual' ? 'provider_individual' : 'provider_organization'
    }
    
    // Add role-specific fields
    if (formData.value.role === 'provider') {
      registrationData.service_type = formData.value.service_type
      registrationData.contact_info = formData.value.contact_info
      
      if (formData.value.providerType === 'individual') {
        registrationData.experience = formData.value.experience
      } else if (formData.value.providerType === 'organization') {
        registrationData.company_name = formData.value.company_name
        registrationData.team_size = parseInt(formData.value.team_size)
      }
    }
    
    const result = await authStore.register(registrationData)
    
    if (result.success) {
      router.push('/login?message=Registration successful! Please sign in.')
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
