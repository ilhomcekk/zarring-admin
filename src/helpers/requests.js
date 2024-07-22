import { API_URL } from '../config'
import { $api } from './api'
import { formData } from './form'

export const requests = {
  // AUTH
  login: (params) => $api.post(`${API_URL}/auth/login`, params),
  fetchMe: () => $api.get(`${API_URL}/user/profile`),
  // PRODUCTS
  fetchProduct: (params) => $api.get(`${API_URL}/product/`, { params }),
  fetchProductDetail: (id) => $api.get(`${API_URL}/product/byId/${id}`),
  createProduct: (params) => $api.post(`${API_URL}/product/add`, params),
  editProduct: (id, params) => $api.post(`${API_URL}/product/update/${id}`, params),
  deleteProduct: (id) => $api.delete(`${API_URL}/product/delete/${id}`),
  // CATEGORY
  fetchCategory: (params) => $api.get(`${API_URL}/category`, { params }),
  fetchCategoryParents: (params) => $api.get(`${API_URL}/category/parent`, { params }),
  fetchCategoryDetail: (id) => $api.get(`${API_URL}/category/byId/${id}`),
  createCategory: (params) => $api.post(`${API_URL}/category/add`, formData(params)),
  editCategory: (id, params) => $api.post(`${API_URL}/category/update/${id}`, formData(params)),
  deleteCategory: (id) => $api.delete(`${API_URL}/category/delete/${id}`),
  // BANNER
  fetchBanner: (params) => $api.get(`${API_URL}/banner`, { params }),
  fetchBannerDetail: (id) => $api.get(`${API_URL}/banner/byId/${id}`),
  createBanner: (params) => $api.post(`${API_URL}/banner/add`, formData(params)),
  editBanner: (id, params) => $api.post(`${API_URL}/banner/update/${id}`, formData(params)),
  deleteBanner: (id) => $api.delete(`${API_URL}/banner/delete/${id}`),
  // BRAND
  fetchBrand: (params) => $api.get(`${API_URL}/brand`, { params }),
  fetchBrandDetail: (id) => $api.get(`${API_URL}/brand/byId/${id}`),
  createBrand: (params) => $api.post(`${API_URL}/brand/add`, formData(params)),
  editBrand: (id, params) => $api.post(`${API_URL}/brand/update/${id}`, formData(params)),
  deleteBrand: (id) => $api.delete(`${API_URL}/brand/delete/${id}`),
  // ORDER
  fetchOrder: (params) => $api.get(`${API_URL}/order`, { params }),
  fetchOrderByUser: (params) => $api.get(`${API_URL}/order/get-by-user-name/`, { params }),
  fetchOrderDetail: (id) => $api.get(`${API_URL}/order/by/${id}`),
  editOrder: (id, params) => $api.put(`${API_URL}/order/update/${id}`, params),
  // STATS
  fetchStats: () => $api.get(`${API_URL}/report/?from=&to=`),
  fetchClientsMaxCount: () => $api.get(`${API_URL}/report/clients-in-maxcount`),
  fetchProductsMaxCount: () => $api.get(`${API_URL}/report/products-in-maxcount`),
  // createProduct: (params) => $api.post(`${API_URL}/product/add`, formData(params)),
  // REPORTS
  // fetchProducts: (params) => $api.get(`${API_URL}/product`, { params }),
  // createProduct: (params) => $api.post(`${API_URL}/product/add`, formData(params)),
}
