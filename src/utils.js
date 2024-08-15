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

export const findRoleFromNumber = (number) => {
  let name = 'Admin'
  switch (number) {
    case 1:
      name = 'Admin'
      break
    case 2:
      name = 'Super admin'
      break
  }
  return name
}

export const findRoleColorFromNumber = (number) => {
  let name = 'info'
  switch (number) {
    case 1:
      name = 'info'
      break
    case 2:
      name = 'dark'
      break
  }
  return name
}

export const findStatusFromNumber = (number) => {
  let name = 'Создано'
  switch (number) {
    case 0:
      name = 'Не актив'
      break
    case 1:
      name = 'Создано'
      break
    case 2:
      name = 'Актив'
      break
  }
  return name
}

export const findStatusColorFromNumber = (number) => {
  let name = 'danger'
  switch (number) {
    case 0:
      name = 'danger'
      break
    case 1:
      name = 'primary'
      break
    case 2:
      name = 'success'
      break
  }
  return name
}

export const roleList = [
  {
    name: 'Админ',
    value: 1,
  },
  {
    name: 'Супер админ',
    value: 2,
  },
]

export const statusList = [
  {
    name: 'Не актив',
    value: 0,
  },
  {
    name: 'Создано',
    value: 1,
  },
  {
    name: 'Актив',
    value: 2,
  },
]
