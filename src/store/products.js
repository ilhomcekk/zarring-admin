import { create } from 'zustand'
import { requests } from '../helpers/requests'

const initialState = {
  list: {},
  listLoading: false,
  productCodes: [],
  productCodesLoading: false,
  detail: {},
  detailLoading: false,
  createLoading: false,
  editLoading: false,
  deleteLoading: false,
}

const productStore = create((set) => ({
  ...initialState,
  getList: async (params) => {
    set({ listLoading: true })
    try {
      const { data } = await requests.fetchProduct(params)
      set({ list: data })
      return data
    } catch (err) {
      return err
    } finally {
      set({ listLoading: false })
    }
  },
  getProductCodes: async () => {
    set({ productCodesLoading: true })
    try {
      const { data } = await requests.fetchProductCodes()
      set({ productCodes: data?.data })
      return data
    } catch (err) {
      return err
    } finally {
      set({ productCodesLoading: false })
    }
  },
  getDetail: async (id) => {
    set({ detaiLoading: true })
    try {
      const { data } = await requests.fetchProductDetail(id)
      set({ detail: data?.data })
      return data
    } catch (err) {
      return err
    } finally {
      set({ detaiLoading: false })
    }
  },
  create: async (params) => {
    set({ createLoading: true })
    try {
      const { data } = await requests.createProduct(params)
      return data
    } catch (err) {
      return err
    } finally {
      set({ createLoading: false })
    }
  },
  edit: async (id, params) => {
    set({ editLoading: true })
    try {
      const { data } = await requests.editProduct(id, params)
      return data
    } catch (err) {
      return err
    } finally {
      set({ editLoading: false })
    }
  },
  remove: async (id) => {
    set({ deleteLoading: true })
    try {
      const { data } = await requests.deleteProduct(id)
      return data
    } catch (err) {
      return err
    } finally {
      set({ deleteLoading: false })
    }
  },
}))

export default productStore
