// URL Debug Component - Add this to your Vue app to see actual URLs
// Save this as debug-url.vue and import it in your main app

<template>
  <div class="debug-panel">
    <h3>🔍 URL Debug Panel</h3>
    <div class="debug-info">
      <p><strong>Environment:</strong> {{ env.MODE }} ({{ env.PROD ? 'Production' : 'Development' }})</p>
      <p><strong>API Base URL:</strong> {{ baseURL }}</p>
      <p><strong>Repair Request URL:</strong> {{ repairRequestURL }}</p>
      <p><strong>Auth Login URL:</strong> {{ authLoginURL }}</p>
    </div>

    <button @click="testURLs" class="test-btn">Test URLs</button>

    <div v-if="testResults" class="test-results">
      <h4>Test Results:</h4>
      <pre>{{ testResults }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DebugURL',
  data() {
    return {
      env: {
        MODE: import.meta.env.MODE,
        PROD: import.meta.env.PROD,
        DEV: import.meta.env.DEV,
        VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL
      },
      baseURL: '',
      repairRequestURL: '',
      authLoginURL: '',
      testResults: null
    }
  },
  mounted() {
    this.initializeURLs()
  },
  methods: {
    initializeURLs() {
      // Simulate the exact same logic as your axios config
      const getBaseURL = () => {
        const url = this.env.VITE_API_BASE_URL || 'https://demo.publicvm.com/api/v1'
        console.log('Base URL:', url)
        return url
      }

      const baseURL = getBaseURL()
      const API_BASE = '' // Empty since axios baseURL already includes /api/v1

      this.baseURL = baseURL
      this.repairRequestURL = `${baseURL}${API_BASE}/repair-requests/`
      this.authLoginURL = `${baseURL}${API_BASE}/auth/login`

      console.log('=== URL Debug Info ===')
      console.log('Environment:', this.env)
      console.log('Base URL:', this.baseURL)
      console.log('Repair Request URL:', this.repairRequestURL)
      console.log('Auth Login URL:', this.authLoginURL)
    },

    async testURLs() {
      this.testResults = 'Testing URLs...\n\n'

      try {
        // Test backend accessibility
        const response = await fetch(`${this.baseURL}/auth/test-roles`)
        this.testResults += `✅ Backend accessible: ${response.ok}\n`

        if (response.ok) {
          const data = await response.json()
          this.testResults += `✅ Available roles: ${JSON.stringify(data.roles)}\n`
        }

        // Test repair request endpoint
        this.testResults += `\n🔧 Testing repair request URL: ${this.repairRequestURL}\n`
        this.testResults += '💡 Check browser Network tab to see actual request URLs\n'

      } catch (error) {
        this.testResults += `❌ Error: ${error.message}\n`
      }
    }
  }
}
</script>

<style scoped>
.debug-panel {
  position: fixed;
  top: 10px;
  right: 10px;
  background: #1e293b;
  color: white;
  padding: 15px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 12px;
  z-index: 9999;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.debug-info p {
  margin: 5px 0;
  padding: 2px 0;
}

.test-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.test-btn:hover {
  background: #2563eb;
}

.test-results {
  margin-top: 15px;
  padding: 10px;
  background: #0f172a;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
}

.test-results h4 {
  margin: 0 0 10px 0;
  color: #fbbf24;
}

.test-results pre {
  margin: 0;
  white-space: pre-wrap;
  font-size: 11px;
}
</style>
