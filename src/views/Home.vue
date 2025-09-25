<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-background">
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
        </div>
      </div>
      
      <div class="hero-content animate-fade-in">
        <h1 class="hero-title animate-slide-up">
          <span class="gradient-text">JiaWeiTong</span><br>
          Home Service Connect
        </h1>
        <p class="hero-subtitle animate-slide-up" style="animation-delay: 0.2s">
          🏠 Connect with trusted service providers and manage your repair requests efficiently with our modern platform
        </p>
        
        <div class="hero-stats animate-slide-up" style="animation-delay: 0.4s">
          <div class="stat">
            <div class="stat-number">1000+</div>
            <div class="stat-label">Happy Customers</div>
          </div>
          <div class="stat">
            <div class="stat-number">500+</div>
            <div class="stat-label">Service Providers</div>
          </div>
          <div class="stat">
            <div class="stat-number">24/7</div>
            <div class="stat-label">Support</div>
          </div>
        </div>
        
        <div v-if="!authStore.isAuthenticated" class="hero-actions animate-bounce-in" style="animation-delay: 0.6s">
          <router-link to="/register" class="btn btn-primary btn-large">
            🚀 Get Started Free
          </router-link>
          <router-link to="/login" class="btn btn-secondary btn-large">
            👤 Sign In
          </router-link>
        </div>
        
        <div v-else class="hero-actions animate-bounce-in" style="animation-delay: 0.6s">
          <router-link 
            :to="authStore.getUserRole === 'user' ? '/dashboard' : 
                 authStore.getUserRole === 'admin' ? '/admin-dashboard' : '/provider-dashboard'" 
            class="btn btn-primary btn-large"
          >
            <span v-if="authStore.getUserRole === 'user'">👤 My Dashboard</span>
            <span v-else-if="authStore.getUserRole === 'admin'">👑 Admin Panel</span>
            <span v-else>🔧 Provider Dashboard</span>
          </router-link>
          <router-link to="/service-providers" class="btn btn-secondary btn-large">
            🔍 Browse Services
          </router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title animate-fade-in">✨ Why Choose JiaWeiTong?</h2>
        <div class="features-grid">
          <div class="feature-card animate-slide-up" style="animation-delay: 0.1s">
            <div class="feature-icon">🎤</div>
            <h3>Voice Requests</h3>
            <p>Record voice messages to describe your repair needs more effectively</p>
            <div class="feature-highlight">AI-Powered</div>
          </div>
          
          <div class="feature-card animate-slide-up" style="animation-delay: 0.2s">
            <div class="feature-icon">🔍</div>
            <h3>Smart Matching</h3>
            <p>Our algorithm matches you with the most suitable service providers</p>
            <div class="feature-highlight">Intelligent</div>
          </div>
          
          <div class="feature-card animate-slide-up" style="animation-delay: 0.3s">
            <div class="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Get responses from providers within minutes, not hours</p>
            <div class="feature-highlight">Real-time</div>
          </div>
          
          <div class="feature-card animate-slide-up" style="animation-delay: 0.4s">
            <div class="feature-icon">🛡️</div>
            <h3>Secure & Safe</h3>
            <p>End-to-end encryption and verified service providers</p>
            <div class="feature-highlight">Protected</div>
          </div>
          
          <div class="feature-card animate-slide-up" style="animation-delay: 0.5s">
            <div class="feature-icon">📱</div>
            <h3>Mobile Ready</h3>
            <p>Access from any device with our responsive design</p>
            <div class="feature-highlight">Cross-platform</div>
          </div>
          
          <div class="feature-card animate-slide-up" style="animation-delay: 0.6s">
            <div class="feature-icon">👑</div>
            <h3>Admin Control</h3>
            <p>Comprehensive admin panel for platform management</p>
            <div class="feature-highlight">Enterprise</div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works">
      <div class="container">
        <h2 class="section-title animate-fade-in">🔄 How It Works</h2>
        <div class="steps">
          <div class="step animate-slide-up" style="animation-delay: 0.1s">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>📝 Post Your Request</h3>
              <p>Describe your repair needs with text or voice messages</p>
            </div>
          </div>
          
          <div class="step animate-slide-up" style="animation-delay: 0.2s">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>🔍 Get Matched</h3>
              <p>Our system finds the best service providers for your needs</p>
            </div>
          </div>
          
          <div class="step animate-slide-up" style="animation-delay: 0.3s">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>⚡ Connect & Fix</h3>
              <p>Connect with providers and get your repairs done quickly</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
      <div class="container">
        <h2 class="section-title animate-fade-in">💬 What Our Users Say</h2>
        <div class="testimonials-grid">
          <div class="testimonial animate-slide-up" style="animation-delay: 0.1s">
            <div class="testimonial-content">
              <p>"JiaWeiTong made finding a reliable plumber so easy! The voice message feature is brilliant."</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">👩‍💼</div>
              <div class="author-info">
                <div class="author-name">Sarah Chen</div>
                <div class="author-role">Homeowner</div>
              </div>
            </div>
          </div>
          
          <div class="testimonial animate-slide-up" style="animation-delay: 0.2s">
            <div class="testimonial-content">
              <p>"As a service provider, this platform has helped me grow my business significantly."</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">👨‍🔧</div>
              <div class="author-info">
                <div class="author-name">Mike Johnson</div>
                <div class="author-role">Electrician</div>
              </div>
            </div>
          </div>
          
          <div class="testimonial animate-slide-up" style="animation-delay: 0.3s">
            <div class="testimonial-content">
              <p>"The admin panel gives me complete control over the platform. Excellent system!"</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">👑</div>
              <div class="author-info">
                <div class="author-name">Admin User</div>
                <div class="author-role">Platform Manager</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content animate-bounce-in">
          <h2>🚀 Ready to Get Started?</h2>
          <p>Join thousands of satisfied users and service providers today!</p>
          <div v-if="!authStore.isAuthenticated" class="cta-actions">
            <router-link to="/register" class="btn btn-primary btn-large">
              🎯 Start Your Journey
            </router-link>
            <router-link to="/login" class="btn btn-outline btn-large">
              👋 Welcome Back
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
</script>

<style scoped>
.home {
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ec4899, #8b5cf6, #6366f1);
  color: white;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 120px;
  height: 120px;
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}

.shape-3 {
  width: 60px;
  height: 60px;
  top: 80%;
  left: 20%;
  animation-delay: 4s;
}

.shape-4 {
  width: 100px;
  height: 100px;
  top: 30%;
  right: 30%;
  animation-delay: 1s;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 2rem;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(45deg, #ffffff, #fce7f3, #e0e7ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.95;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 3rem 0;
  flex-wrap: wrap;
}

.stat {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 0.5rem;
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

/* Buttons */
.btn {
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.btn-large {
  padding: 1.25rem 2.5rem;
  font-size: 1.1rem;
}

.btn-primary {
  background: rgba(255, 255, 255, 0.95);
  color: #8b5cf6;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 1);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-3px);
}

.btn-outline {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
}

/* Sections */
.features-section,
.how-it-works,
.testimonials,
.cta-section {
  padding: 5rem 0;
}

.features-section {
  background: linear-gradient(135deg, #fdf2f8, #f3e8ff);
}

.how-it-works {
  background: linear-gradient(135deg, #f3e8ff, #e0e7ff);
}

.testimonials {
  background: linear-gradient(135deg, #e0e7ff, #fdf2f8);
}

.cta-section {
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  color: white;
  text-align: center;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cta-section .section-title h2 {
  color: white;
  background: none;
  -webkit-text-fill-color: white;
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 1.5rem;
  text-align: center;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.2);
  background: rgba(255, 255, 255, 1);
}

.feature-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  display: block;
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
}

.feature-card p {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.feature-highlight {
  display: inline-block;
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* How It Works */
.steps {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.step {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  max-width: 300px;
  text-align: left;
}

.step-number {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  flex-shrink: 0;
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
}

.step-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.step-content p {
  color: #6b7280;
  line-height: 1.5;
}

/* Testimonials */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.testimonial:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(139, 92, 246, 0.15);
}

.testimonial-content {
  margin-bottom: 1.5rem;
}

.testimonial-content p {
  font-style: italic;
  color: #374151;
  line-height: 1.6;
  font-size: 1.1rem;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.author-name {
  font-weight: 600;
  color: #1f2937;
}

.author-role {
  font-size: 0.9rem;
  color: #6b7280;
}

/* CTA Section */
.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-stats {
    gap: 2rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .steps {
    flex-direction: column;
    align-items: center;
  }
  
  .step {
    text-align: center;
    flex-direction: column;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-actions,
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .hero-content {
    padding: 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>
