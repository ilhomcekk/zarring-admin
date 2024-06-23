import { create } from 'zustand'
import { requests } from '../helpers/requests'

const initialState = {
  list: [],
  listLoading: false,
  detail: {},
  detailLoading: false,
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
  getDetail: async (id) => {
    set({ detailLoading: true })
    try {
      const { data } = await requests.fetchCategoryDetail(id)
      set({ detail: data?.data })
      return data
    } catch (err) {
      return err
    } finally {
      set({ detailLoading: false })
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
      const { data } = await requests.editCategory(params)
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
      const { data } = await requests.deleteCategory(id)
      if (data?.data) {
        set((state) => ({
          ...state,
          list: state.list?.filter((item) => item?.id !== id),
        }))
      }
      return data
    } catch (err) {
      return err
    } finally {
      set({ deleteLoading: false })
    }
  },
}))

export default categoryStore
