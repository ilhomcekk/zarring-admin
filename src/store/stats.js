import { create } from 'zustand'
import { requests } from '../helpers/requests'

const initialState = {
  list: [],
  clientsMaxCount: [],
  productsMaxCount: [],
  listLoading: false,
}

const statsStore = create((set) => ({
  ...initialState,
  getList: async (params) => {
    set({ listLoading: true })
    try {
      const { data } = await requests.fetchStats(params)
      set({ list: data?.data })
      return data
    } catch (err) {
      return err
    } finally {
      set({ listLoading: false })
    }
  },
  getClientsMaxCount: async () => {
    set({ listLoading: true })
    try {
      const { data } = await requests.fetchClientsMaxCount()
      set({ clientsMaxCount: data?.data })
      return data
    } catch (err) {
      return err
    } finally {
      set({ listLoading: false })
    }
  },
  getProductsMaxCount: async () => {
    set({ listLoading: true })
    try {
      const { data } = await requests.fetchProductsMaxCount()
      set({ productsMaxCount: data?.data })
      return data
    } catch (err) {
      return err
    } finally {
      set({ listLoading: false })
    }
  },
  getUsersProducts: async (params) => {
    set({ listLoading: true })
    try {
      const { data } = await requests.fetchUsersProducts(params)
      set({ usersProducts: data?.data })
      return data
    } catch (err) {
      return err
    } finally {
      set({ listLoading: false })
    }
  },
}))

export default statsStore
