import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Attach token before every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('learnpro_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAuthRoute =
        window.location.pathname.includes('/login') ||
        window.location.pathname.includes('/register');

      // Only redirect if not already on an auth page
      // and the failing request was NOT the profile fetch on load
      const requestUrl = error.config?.url || '';
      const isProfileCheck = requestUrl.includes('/auth/profile');

      if (!isAuthRoute && !isProfileCheck) {
        localStorage.removeItem('learnpro_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;