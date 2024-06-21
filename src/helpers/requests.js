import { API_URL } from '../config'
import { $api } from './api'
import { formData } from './form'

export const requests = {
  // PRODUCTS
  fetchProduct: (params) => $api.get(`${API_URL}/product/`, { params }),
  createProduct: (params) => $api.post(`${API_URL}/product/add`, formData(params)),
  // CATEGORY
  fetchCategory: (params) => $api.get(`${API_URL}/category`, { params }),
  createCategory: (params) => $api.post(`${API_URL}/category/add`, formData(params)),
  // ORDER
  // fetchProducts: (params) => $api.get(`${API_URL}/product`, { params }),
  // createProduct: (params) => $api.post(`${API_URL}/product/add`, formData(params)),
  // REPORTS
  // fetchProducts: (params) => $api.get(`${API_URL}/product`, { params }),
  // createProduct: (params) => $api.post(`${API_URL}/product/add`, formData(params)),
}
