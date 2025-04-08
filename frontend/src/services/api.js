import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to attach token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Add response interceptor to handle errors and token updates
api.interceptors.response.use(
  response => {
    // Check if this is a signin response with a new token
    if (response.config.url === '/signin' && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// Auth routes
const auth = {
  signIn: (credentials) => api.post('/signin', credentials),
  signUp: (userData) => api.post('/signup', userData),
  getProfile: () => api.get('/profile'),
};

// Products routes
const products = {
  getAll: () => api.get('/products'),
  getByCategory: (category) => api.get(`/products?category=${category}`),
  getById: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/categories'),
};

// Cart routes
const cart = {
  get: () => api.get('/cart'),
  add: (productId, quantity = 1) => api.post('/cart/add', { productId, quantity }),
  remove: (productId) => api.delete(`/cart/remove/${productId}`),
  update: (productId, quantity) => api.put(`/cart/update`, { productId, quantity }),
  clear: () => api.delete('/cart/clear'),
};

// User routes
const user = {
  getProfile: () => api.get('/profile'),
  updateProfile: (userData) => api.put('/profile', userData),
  getOrders: () => api.get('/orders'),
  getOrderById: (orderId) => api.get(`/orders/${orderId}`),
};

// Order routes
const orders = {
  create: (orderData) => api.post('/orders', orderData),
  getAll: () => api.get('/orders'),
  getById: (orderId) => api.get(`/orders/${orderId}`),
};

export default {
  auth,
  products,
  cart,
  user,
  orders,
  // Expose the base instance for custom calls
  instance: api
};
