import { API_URL } from '../config'
import { $api } from './api'
import { formData } from './form'

export const requests = {
  // PRODUCTS
  fetchProduct: (params) => $api.get(`${API_URL}/product/`, { params }),
  fetchProductDetail: (id) => $api.get(`${API_URL}/product/by/${id}`),
  createProduct: (params) => $api.post(`${API_URL}/product/add`, formData(params)),
  // CATEGORY
  fetchCategory: (params) => $api.get(`${API_URL}/category`, { params }),
  fetchCategoryDetail: (id) => $api.get(`${API_URL}/category/byId/${id}`),
  createCategory: (params) => $api.post(`${API_URL}/category/add`, formData(params)),
  editCategory: (params) => $api.post(`${API_URL}/category/update`, formData(params)),
  deleteCategory: (id) => $api.delete(`${API_URL}/category/delete/${id}`),
  // ORDER
  // fetchProducts: (params) => $api.get(`${API_URL}/product`, { params }),
  // createProduct: (params) => $api.post(`${API_URL}/product/add`, formData(params)),
  // REPORTS
  // fetchProducts: (params) => $api.get(`${API_URL}/product`, { params }),
  // createProduct: (params) => $api.post(`${API_URL}/product/add`, formData(params)),
}
