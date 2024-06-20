import { create } from 'zustand'
import { requests } from '../helpers/requests'

const initialState = {
  getList: async () => {},
  list: [],
  listLoading: false,
}

const appStore = create((set) => ({
  ...initialState,
  getList: async () => {
    set({ listLoading: true })
    try {
      const { data } = await requests.fetch()
      set({ list: data })
      return data
    } catch (err) {
      return err
    } finally {
      set({ listLoading: false })
    }
  },
}))

export default appStore
