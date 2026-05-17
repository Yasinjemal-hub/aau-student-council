import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor: Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('supabase_token')
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor: Handle global errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle 401 Unauthorized - log out and redirect to login
    if (error.response && error.response.status === 401) {
      // Clear token from localStorage
      localStorage.removeItem('supabase_token')
      
      // Clear any other auth-related data
      localStorage.removeItem('user')
      
      // Redirect to login page
      window.location.href = '/login'
    }
    
    return Promise.reject(error)
  }
)

export default api
