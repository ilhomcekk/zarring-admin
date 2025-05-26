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
  toggleProduct: (product, sizes) => {
    const stateProducts = get()?.stateProducts || []
    const existingItem = stateProducts?.find((item) => item?.id === product?.id)
    if (existingItem) {
      const filteredItems = stateProducts?.filter((item) => item?.id !== product?.id)
      get().setProducts(filteredItems)
    } else {
      const selected_size = sizes[product.id]
      const productWithSize = { ...product, selected_size, count: 1 }
      const newItems = [...stateProducts, productWithSize]
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
  handleSelectSize: (productId, size) => {
    const updated = get().stateProducts?.map((item) => {
      if (item.id === productId) {
        if (item.selected_size === size) {
          const { selected_size, ...rest } = item
          return rest
        }
        return {
          ...item,
          selected_size: size,
        }
      }
      return item
    })
    get().setProducts(updated)
  },
  clearProducts: () => {
    set({ stateProducts: [] })
  },
}))

export default handleProductsStore
