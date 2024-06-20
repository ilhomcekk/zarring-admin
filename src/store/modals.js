import { create } from 'zustand'

const initialState = {
  openModal: () => {},
  closeModal: () => {},
  modals: {
    register: false,
    compare_create: false,
    delivery: false,
    search: false,
    menu: false,
  },
}

const modalsStore = create((set) => ({
  ...initialState,
  openModal: async (modalName) => {
    set((state) => ({ modals: { ...state.modals, [modalName]: true } }))
  },
  closeModal: async (modalName) => {
    set((state) => ({ modals: { ...state.modals, [modalName]: false } }))
  },
}))

export default modalsStore
