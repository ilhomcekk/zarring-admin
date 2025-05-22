import { create } from 'zustand'
import { requests } from '../helpers/requests'
import { toast } from 'react-toastify'

const initialState = {
  list: {},
  listLoading: false,
  excelList: {},
  excelListLoading: false,
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
  getExcelList: async (params) => {
    set({ excelListLoading: true })
    try {
      const { data } = await requests.fetchOrder(params)
      set({ excelList: data })
      return data
    } catch (err) {
      return err
    } finally {
      set({ excelListLoading: false })
    }
  },
  downloadExcel: async (params) => {
    set({ downloadExcelLoading: true })
    try {
      const { data } = await requests.downloadExcel(params)
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      console.log(blob)

      const url = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = 'Заказы.xlsx' // Fayl nomi
      a.click()

      window.URL.revokeObjectURL(url) // Resursni tozalash
      return data
    } catch (err) {
      return err
    } finally {
      set({ downloadExcelLoading: false })
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
      const { data } = await requests.createOrder(params)
      return data
    } catch (err) {
      toast.error(err?.response?.data?.error?.message)
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
    } catch ({ response }) {
      toast.error(response?.data?.message)
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
