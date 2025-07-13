// File: frontend/src/api/axios.js

import axios from 'axios';

// Tentukan baseURL berdasarkan environment
const baseURL = import.meta.env.PROD
  ? '/api' // Untuk produksi di Vercel
  : 'http://localhost:3000/api'; // Untuk development di lokal

const apiClient = axios.create({
  baseURL: baseURL,
});

export default apiClient;