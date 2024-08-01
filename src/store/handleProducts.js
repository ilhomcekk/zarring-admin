import { create } from 'zustand'
import { requests } from '../helpers/requests'

const initialState = {
  stateProducts: [],
}

const handleProductsStore = create((set, get) => ({
  ...initialState,
  setProducts: (products) => {
    set({ stateProducts: products || [] })
  },
  toggleProduct: (product) => {
    const stateProducts = get()?.stateProducts || []
    const existingItem = stateProducts?.find((item) => item?.id === product?.id)
    if (existingItem) {
      const filteredItems = stateProducts?.filter((item) => item?.id !== product?.id)
      get().setProducts(filteredItems)
    } else {
      product['count'] = 1
      const newItems = [...stateProducts, product]
      get().setProducts(newItems)
    }
  },
  setCount: (product, count) => {
    const stateProducts = get()?.stateProducts || []
    const existingItem = stateProducts?.find((item) => item?.id === product?.id)
    existingItem['count'] = count
    const newItems = [...stateProducts]
    get().setProducts(newItems)
  },
  clearProducts: () => {
    set({ stateProducts: [] })
  },
}))

export default handleProductsStore
