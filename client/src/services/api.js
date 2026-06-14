import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Product API calls
export const getProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (productData) => API.post("/products", productData);
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// You can add more API calls for other models (User, Sale) here later