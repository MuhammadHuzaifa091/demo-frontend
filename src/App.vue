<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="nav-brand">
          <span class="logo-icon">🏠</span>
          <span class="logo-text">JiaWeiTong</span>
          <span class="logo-subtitle">Home Service Connect</span>
        </router-link>
        
        <div class="nav-links">
          <template v-if="authStore.isAuthenticated">
            <!-- Dashboard link based on role -->
            <router-link 
              :to="authStore.getUserRole === 'user' ? '/dashboard' : 
                   authStore.getUserRole === 'admin' ? '/admin-dashboard' : '/provider-dashboard'" 
              class="nav-link"
            >
              <span v-if="authStore.getUserRole === 'user'">👤 Dashboard</span>
              <span v-else-if="authStore.getUserRole === 'admin'">👑 Admin Panel</span>
              <span v-else>🔧 Dashboard</span>
            </router-link>
            
            <!-- User-specific links -->
            <template v-if="authStore.getUserRole === 'user'">
              <router-link to="/services" class="nav-link">
                🔍 Find Services
              </router-link>
            </template>
            
            <!-- Provider-specific links -->
            <template v-if="authStore.getUserRole?.startsWith('provider_')">
              <router-link to="/service-providers" class="nav-link">
                ⚙️ My Services
              </router-link>
            </template>
            
            <!-- Admin-specific links -->
            <template v-if="authStore.getUserRole === 'admin'">
              <router-link to="/service-providers" class="nav-link">
                📊 System Overview
              </router-link>
            </template>
            
            <button @click="logout" class="nav-link logout-btn">
              🚪 Logout
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
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 4px 20px rgba(236, 72, 153, 0.3);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.logo-icon {
  font-size: 2rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(45deg, #ffffff, #fce7f3);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
}

.logo-subtitle {
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0.9;
  margin-left: 0.25rem;
}

.nav-brand:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
}

.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
}

.logout-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;
  font-weight: 500;
}

.main-content {
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #fdf2f8, #f3e8ff, #e0e7ff);
}

.router-link-active {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }
  
  .logo-icon {
    font-size: 1.5rem;
  }
  
  .logo-text {
    font-size: 1.2rem;
  }
  
  .logo-subtitle {
    display: none; /* Hide subtitle on mobile for space */
  }
  
  .nav-links {
    gap: 0.5rem;
  }
  
  .nav-link {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>
