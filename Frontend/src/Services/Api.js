import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api', // Ensure this matches your backend port
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for error handling
API.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response.data, // Automatically unwrap the data
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getProducts = () => API.get('/products');
export const createProduct = (productData) => API.post('/products', productData);
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);