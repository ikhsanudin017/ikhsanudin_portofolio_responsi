import axios from 'axios'

// Base URL untuk API
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://ikhsanudin-portofolio-responsi.vercel.app/api'  // Ganti dengan domain Vercel Anda
  : '/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// API functions
export const apiService = {
  // Get education data
  getEducation: async () => {
    try {
      const response = await api.get('/education')
      return response.data
    } catch (error) {
      console.error('Error fetching education:', error)
      throw error
    }
  },

  // Get skills data
  getSkills: async () => {
    try {
      const response = await api.get('/skills')
      return response.data
    } catch (error) {
      console.error('Error fetching skills:', error)
      throw error
    }
  },

  // Get projects data
  getProjects: async () => {
    try {
      const response = await api.get('/projects')
      return response.data
    } catch (error) {
      console.error('Error fetching projects:', error)
      throw error
    }
  }
}

export default api