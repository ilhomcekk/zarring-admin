import { create } from 'zustand'
import { requests } from '../helpers/requests'

const initialState = {
  list: [],
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
}))

export default statsStore
