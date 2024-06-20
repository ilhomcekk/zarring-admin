import axios from 'axios'
import { API_URL } from '../config'

export const $api = axios.create({
  baseURL: 'https://hasandev.uz/api',
})

$api.defaults.headers.common['Accept'] = 'application/json'

const tokenName = 'zarringAdminToken'

export const initApp = () => {
  const token = localStorage.getItem(tokenName)
  $api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const setToken = (token) => {
  localStorage.setItem(tokenName, token)
  $api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const removeToken = () => {
  localStorage.removeItem(tokenName)
  $api.defaults.headers.common.Authorization = ``
}

// Language
$api.interceptors.request.use((config) => {
  return config
})
