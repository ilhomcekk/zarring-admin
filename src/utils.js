export const findCategory = (categories, id, setCategory) => {
  categories?.find((item) => {
    const current = item?.id === id
    if (current) {
      setCategory(item)
      console.log('current', current)
    } else {
      const subCategory = item?.subcategories?.find((sub) => sub?.id === id)
      setCategory(item)
      console.log('subCategory', subCategory)
    }
  })
}

export const isHas = (items, id) => {
  return items?.find((item) => item?.id === id) ? true : false
}
