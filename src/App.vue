<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="nav-brand">
          JiaWeiTong Home Service Connect
        </router-link>
        
        <div class="nav-links">
          <template v-if="authStore.isAuthenticated">
            <!-- Dashboard link based on role -->
            <router-link 
              :to="authStore.getUserRole === 'user' ? '/dashboard' : '/provider-dashboard'" 
              class="nav-link"
            >
              Dashboard
            </router-link>
            
            <!-- User-specific links -->
            <template v-if="authStore.getUserRole === 'user'">
              <router-link to="/services" class="nav-link">
                Find Services
              </router-link>
            </template>
            
            <!-- Provider-specific links -->
            <template v-if="authStore.getUserRole?.startsWith('provider_')">
              <router-link to="/service-providers" class="nav-link">
                My Services
              </router-link>
            </template>
            
            <button @click="logout" class="nav-link logout-btn">
              Logout
            </button>
          </template>
          <template v-else>
            <router-link to="/login" class="nav-link">Login</router-link>
            <router-link to="/register" class="nav-link">Register</router-link>
          </template>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

const logout = async () => {
  await authStore.logout()
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: white;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.logout-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;
}

.main-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
