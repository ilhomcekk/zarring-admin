import { API_URL } from '../config'
import { $api } from './api'
import { formData } from './form'

export const requests = {
  // PRODUCTS
  fetchProduct: (params) => $api.get(`${API_URL}/product/`, { params }),
  createProduct: (params) => $api.post(`${API_URL}/product/add`, formData(params)),
  editProduct: (params) => $api.post(`${API_URL}/product/update`, formData(params)),
  deleteProduct: (id) => $api.delete(`${API_URL}/product/delete/${id}`),
  // CATEGORY
  fetchCategory: (params) => $api.get(`${API_URL}/category`, { params }),
  createCategory: (params) => $api.post(`${API_URL}/category/add`, formData(params)),
  editProduct: (params) => $api.post(`${API_URL}/product/update`, formData(params)),
  deleteProduct: () => $api.get(`${API_URL}/product/delete`),
  // ORDER
  fetchProducts: (params) => $api.get(`${API_URL}/product`, { params }),
  createProduct: (params) => $api.post(`${API_URL}/product/add`, formData(params)),
  editProduct: (params) => $api.post(`${API_URL}/product/update`, formData(params)),
  deleteProduct: () => $api.get(`${API_URL}/product/delete`),
  // REPORTS
  fetchProducts: (params) => $api.get(`${API_URL}/product`, { params }),
  createProduct: (params) => $api.post(`${API_URL}/product/add`, formData(params)),
  editProduct: (params) => $api.post(`${API_URL}/product/update`, formData(params)),
  deleteProduct: () => $api.get(`${API_URL}/product/delete`),
}
