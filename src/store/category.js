import { create } from 'zustand'
import { requests } from '../helpers/requests'

const initialState = {
  getList: async () => {},
  list: [],
  listLoading: false,
  create: async () => {},
  createLoading: false,
  editLoading: false,
  deleteLoading: false,
}

const categoryStore = create((set) => ({
  ...initialState,
  getList: async (params) => {
    set({ listLoading: true })
    try {
      const { data } = await requests.fetchCategory(params)
      set({ list: data?.data })
      return data
    } catch (err) {
      return err
    } finally {
      set({ listLoading: false })
    }
  },
  create: async (params) => {
    set({ createLoading: true })
    try {
      const { data } = await requests.createCategory(params)
      return data
    } catch (err) {
      return err
    } finally {
      set({ createLoading: false })
    }
  },
  edit: async (params) => {
    set({ editLoading: true })
    try {
      const { data } = await requests.editProduct(params)
      return data
    } catch (err) {
      return err
    } finally {
      set({ editLoading: false })
    }
  },
  delete: async (id) => {
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

export default categoryStore
