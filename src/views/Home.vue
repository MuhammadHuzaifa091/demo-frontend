<template>
  <div class="home">
    <div class="hero">
      <h1 class="hero-title">JiaWeiTong Home Service Connect</h1>
      <p class="hero-subtitle">
        Connect with trusted service providers and manage your repair requests efficiently
      </p>
      
      <div v-if="!authStore.isAuthenticated" class="hero-actions">
        <router-link to="/register" class="btn btn-primary">
          Get Started
        </router-link>
        <router-link to="/login" class="btn btn-secondary">
          Sign In
        </router-link>
      </div>
      
      <div v-else class="hero-actions">
        <router-link to="/repair-requests" class="btn btn-primary">
          View Repair Requests
        </router-link>
        <router-link to="/service-providers" class="btn btn-secondary">
          Browse Service Providers
        </router-link>
      </div>
    </div>

    <div class="features">
      <div class="feature-card">
        <div class="feature-icon">📝</div>
        <h3>Post Repair Requests</h3>
        <p>Easily create and manage your repair requests with detailed descriptions</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">🔍</div>
        <h3>Find Service Providers</h3>
        <p>Browse through qualified service providers and their specialties</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3>Quick & Secure</h3>
        <p>Fast, secure platform with user authentication and data protection</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
</script>

<style scoped>
.home {
  text-align: center;
}

.hero {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border-radius: 1rem;
  margin-bottom: 4rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
  display: inline-block;
}

.btn-primary {
  background-color: white;
  color: #f5576c;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background-color: white;
  color: #f5576c;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #334155;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #64748b;
  line-height: 1.6;
}
</style>
