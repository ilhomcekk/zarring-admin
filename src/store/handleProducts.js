import { create } from 'zustand'
import { requests } from '../helpers/requests'

const initialState = {
  products: [],
}

const handleProductsStore = create((set) => ({
  ...initialState,
  setProducts: (products) => {
    set({ products: products })
  },
  toggleProduct: async (product) => {
    set((state) => {
      const existingItem = state.products?.find((item) => item?.id === product?.id)
      if (existingItem) {
        const filteredItems = state.products?.filter((item) => item?.id !== product?.id)
        state.setProducts(filteredItems)
      } else {
        existingItem['count'] = 1
        const newItems = [...state.products, existingItem]
        state.setProducts(newItems)
      }
    })
  },
}))

export default handleProductsStore
