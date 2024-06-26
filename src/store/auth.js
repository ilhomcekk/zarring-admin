import { create } from 'zustand'
import { requests } from '../helpers/requests'

const initialState = {
  loginLoading: false,
  me: {},
  meLoading: false,
}

const authStore = create((set) => ({
  ...initialState,
  postLogin: async (params) => {
    set({ loginLoading: true })
    try {
      const { data } = await requests.login(params)
      return data
    } catch (err) {
      return err
    } finally {
      set({ loginLoading: false })
    }
  },
  getMe: async (params) => {
    set({ meLoading: true })
    try {
      const { data } = await requests.fetchMe(params)
      set({ me: data?.data })
      return data
    } catch (err) {
      return err
    } finally {
      set({ meLoading: false })
    }
  },
}))

export default authStore
