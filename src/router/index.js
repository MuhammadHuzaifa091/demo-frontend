import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import StepRegister from '../views/StepRegister.vue'
import RepairRequests from '../views/RepairRequests.vue'
import ServiceProviders from '../views/ServiceProviders.vue'
import UserDashboard from '../views/UserDashboard.vue'
import ProviderDashboard from '../views/ProviderDashboard.vue'
import Services from '../views/Services.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: StepRegister,
    meta: { requiresGuest: true }
  },
  {
    path: '/register-simple',
    name: 'RegisterSimple',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/repair-requests',
    name: 'RepairRequests',
    component: RepairRequests,
    meta: { requiresAuth: true }
  },
  {
    path: '/service-providers',
    name: 'ServiceProviders',
    component: ServiceProviders,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: UserDashboard,
    meta: { requiresAuth: true, roles: ['user'] }
  },
  {
    path: '/provider-dashboard',
    name: 'ProviderDashboard',
    component: ProviderDashboard,
    meta: { requiresAuth: true, roles: ['provider_individual', 'provider_organization'] }
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
    meta: { requiresAuth: true, roles: ['user'] }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const userRole = authStore.getUserRole
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    // Role-based redirect after login
    if (userRole === 'user') {
      next('/dashboard')
    } else if (userRole?.startsWith('provider_')) {
      next('/provider-dashboard')
    } else {
      next('/')
    }
  } else if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    // Role-based access control
    if (userRole === 'user') {
      next('/dashboard')
    } else if (userRole?.startsWith('provider_')) {
      next('/provider-dashboard')
    } else {
      next('/')
    }
  } else {
    next()
  }
})

export default router
