import { create } from 'zustand'
import { requests } from '../helpers/requests'

const initialState = {
  list: [],
  listLoading: false,
  ordersByUser: [],
  detail: {},
  detailLoading: false,
  createLoading: false,
  editLoading: false,
  deleteLoading: false,
}

const orderStore = create((set) => ({
  ...initialState,
  getList: async (params) => {
    set({ listLoading: true })
    try {
      const { data } = await requests.fetchOrder(params)
      set({ list: data })
      return data
    } catch (err) {
      return err
    } finally {
      set({ listLoading: false })
    }
  },
  getListByUser: async (params) => {
    set({ listLoading: true })
    try {
      const { data } = await requests.fetchOrderByUser(params)
      set({ ordersByUser: data })
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
      const { data } = await requests.fetchOrderDetail(id)
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
      const { data } = await requests.createBanner(params)
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
      const { data } = await requests.editOrder(id, params)
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
      const { data } = await requests.deleteBanner(id)
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

export default orderStore
