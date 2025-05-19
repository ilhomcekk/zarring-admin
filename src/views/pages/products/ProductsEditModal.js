import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import productStore from '../../../store/products'
import categoryStore from '../../../store/category'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../../config'
import { findCategory } from '../../../utils'
import Zoom from 'react-medium-image-zoom'

const ProductsEditModal = ({ visible, onClose, id }) => {
  const { edit, editLoading, detail, getDetail } = productStore()
  const { list: categories, categoryParents } = categoryStore()
  console.log('categories', categories)
  const [params, setParams] = useState({
    title_ru: '',
    title_uz: '',
    code: '',
    category_id: '',
    price: '',
    money_type: '',
    img: null,
    description_ru: '',
    description_uz: '',
    characteristic: [],
    size: [],
    gallery: [''],
    new_gallery: [''],
  })
  const [category, setCategory] = useState({})
  const [validated, setValidated] = useState(false)

  const clearParams = () => {
    setParams({
      title_ru: '',
      title_uz: '',
      code: '',
      category_id: '',
      price: '',
      img: null,
      money_type: '',
      description_ru: '',
      description_uz: '',
      characteristic: [],
      size: [],
      gallery: [null],
      new_gallery: [null],
    })
    setCategory({})
    setValidated(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setParams({ ...params, [name]: value })
  }

  const handleFileChange = (e, name) => {
    const file = e.target.files[0]
    setParams({ ...params, [name]: file })
  }

  const handleAttributeChange = (index, newValue) => {
    const newAttributes = [...params.characteristic]
    newAttributes[index].value = newValue
    setParams({ ...params, characteristic: newAttributes })
  }

  const addAttribute = () => {
    setParams({ ...params, characteristic: [...params.characteristic, { label: '', value: '' }] })
  }
  const addSize = () => {
    setParams({ ...params, size: [...params.size, ''] })
  }

  const removeAttribute = (index) => {
    const newAttributes = params.characteristic.filter((_, idx) => idx !== index)
    setParams({ ...params, characteristic: newAttributes })
  }
  const removeSize = (index) => {
    const newSize = params.size.filter((_, idx) => idx !== index)
    setParams({ ...params, size: newSize })
  }

  const handleLabelChange = (index, newLabel) => {
    const newAttributes = [...params.characteristic]
    newAttributes[index].label = newLabel
    setParams({ ...params, characteristic: newAttributes })
  }
  const handleSizeChange = (index, newLabel) => {
    const newSize = [...params.size]
    newSize[index] = newLabel
    setParams({ ...params, size: newSize })
  }

  const handleGalleryChange = (index, newImage) => {
    const newGallery = [...params.new_gallery]
    newGallery[index] = newImage
    setParams({ ...params, new_gallery: newGallery })
  }

  const addGalleryImage = () => {
    setParams({ ...params, new_gallery: [...params.new_gallery, ''] })
  }

  const removeGalleryImage = (item, index) => {
    const isHas = params.gallery.includes(item)
    if (isHas) {
      setParams({ ...params, gallery: params.gallery.filter((item1) => item1 !== item) })
    } else {
      setParams({ ...params, new_gallery: params.new_gallery.filter((_, idx) => idx !== index) })
    }
  }
  useEffect(() => {
    if (visible) {
      getDetail(id)
    }
  }, [visible])

  useEffect(() => {
    setParams({
      title_ru: detail?.title_ru,
      title_uz: detail?.title_uz,
      code: detail?.code,
      category_id: detail?.category_id,
      price: detail?.price,
      img: detail?.img,
      money_type: detail?.money_type,
      description_ru: detail?.description_ru,
      description_uz: detail?.description_uz,
      characteristic: detail?.characteristic || [],
      size: detail?.size || [],
      gallery: detail?.gallery || [],
      new_gallery: [''],
    })
    findCategory(categoryParents, detail?.category_id, setCategory)
    // setCategory(categories?.find((cat) => cat.id === detail?.category_id) || {})
  }, [detail])
  const forms = [
    {
      label: 'Имя ( EN )',
      children: (
        <CFormInput name="title_ru" value={params.title_ru} onChange={handleInputChange} required />
      ),
    },
    {
      label: 'Имя ( UZ )',
      children: <CFormInput name="title_uz" value={params.title_uz} onChange={handleInputChange} />,
    },
    {
      label: 'Код товара',
      children: <CFormInput name="code" value={params.code} onChange={handleInputChange} />,
    },
    {
      label: 'Категория',
      children: (
        <CFormSelect
          value={category?.id}
          onChange={(e) => {
            const selectedCategory = categoryParents?.find((item) => item?.id == e.target.value)
            setCategory(selectedCategory || {})
            setParams({ ...params, category_id: '' })
          }}
          required
          options={[
            '',
            ...categoryParents?.map((item) => ({
              label: item?.title,
              value: item?.id,
            })),
          ]}
        />
      ),
    },
    {
      label: 'Под категория',
      children: (
        <CFormSelect
          name="category_id"
          onChange={handleInputChange}
          value={params?.category_id}
          options={[
            '',
            ...(category?.subcategories || [])?.map((item) => ({
              label: item?.title,
              value: item?.id,
            })),
          ]}
        />
      ),
    },
    {
      label: 'Цена',
      children: (
        <>
          <CFormInput name="price" value={params.price} onChange={handleInputChange} />
          <CInputGroupText>
            <CFormSelect
              size="sm"
              name="money_type"
              value={params.money_type}
              onChange={handleInputChange}
            >
              <option value="usd">USD</option>
              <option value="uzs">UZS</option>
            </CFormSelect>
          </CInputGroupText>
        </>
      ),
    },
    {
      label: 'Размеры',
      children: (
        <>
          {params.size?.map((size, idx) => (
            <div key={idx} className="mt-2 w-100">
              <CInputGroup>
                <CFormInput
                  placeholder="Значение"
                  value={size}
                  onChange={(e) => handleSizeChange(idx, e.target.value)}
                />
                <CButton color="danger" className="ms-2" onClick={() => removeSize(idx)}>
                  <CIcon icon={cilTrash} style={{ '--ci-primary-color': 'white' }} />
                </CButton>
              </CInputGroup>
            </div>
          ))}
          <CButton color="success" className="mt-2 text-white" shape="rounded" onClick={addSize}>
            Добавить размер
          </CButton>
        </>
      ),
    },
    {
      label: 'Основное изображение',
      children: (
        <div>
          <CFormInput type="file" onChange={(e) => handleFileChange(e, 'img')} />
          <img src={BASE_URL + detail?.img} width={200} alt="" />
        </div>
      ),
    },
    {
      label: 'Фотогалерея',
      children: (
        <div>
          {Array.isArray(params?.gallery) &&
            params?.gallery.map((item, idx) => (
              <div key={idx} className="mt-2">
                <CInputGroup>
                  <CFormInput
                    type="file"
                    onChange={(e) => handleGalleryChange(idx, e.target.files[0])}
                  />
                  <CButton
                    color="danger"
                    className="ms-2"
                    onClick={() => removeGalleryImage(item, idx)}
                  >
                    <CIcon icon={cilTrash} style={{ '--ci-primary-color': 'white' }} />
                  </CButton>
                </CInputGroup>
                <img src={BASE_URL + item} width={200} className="mt-2" alt="" />
              </div>
            ))}
          {Array.isArray(params?.new_gallery) &&
            params?.new_gallery.map((item, idx) => (
              <div key={idx} className="mt-2">
                <CInputGroup>
                  <CFormInput
                    type="file"
                    onChange={(e) => handleGalleryChange(idx, e.target.files[0])}
                  />
                  <CButton
                    color="danger"
                    className="ms-2"
                    onClick={() => removeGalleryImage(item, idx)}
                  >
                    <CIcon icon={cilTrash} style={{ '--ci-primary-color': 'white' }} />
                  </CButton>
                </CInputGroup>
                <img src={BASE_URL + item} width={200} className="mt-2" alt="" />
              </div>
            ))}
          <CButton color="success" className="mt-2 text-white" onClick={addGalleryImage}>
            Добавить фото
          </CButton>
        </div>
      ),
    },
    {
      label: 'Характеристики',
      children: (
        <>
          {params.characteristic?.map((attribute, idx) => (
            <div key={idx} className="mt-2 w-100">
              <CInputGroup>
                <CFormInput
                  placeholder="Ключевое слово"
                  value={attribute.label}
                  onChange={(e) => handleLabelChange(idx, e.target.value)}
                  className="me-2"
                />
                <CFormInput
                  placeholder="Значение"
                  value={attribute.value}
                  onChange={(e) => handleAttributeChange(idx, e.target.value)}
                />
                <CButton color="danger" className="ms-2" onClick={() => removeAttribute(idx)}>
                  <CIcon icon={cilTrash} style={{ '--ci-primary-color': 'white' }} />
                </CButton>
              </CInputGroup>
            </div>
          ))}
          <CButton
            color="success"
            className="mt-2 text-white"
            shape="rounded"
            onClick={addAttribute}
          >
            Добавить характеристику
          </CButton>
        </>
      ),
    },
    {
      label: 'Описание ( EN )',
      children: (
        <CFormTextarea
          name="description_ru"
          value={params.description_ru}
          onChange={handleInputChange}
        />
      ),
    },
    {
      label: 'Описание ( UZ )',
      children: (
        <CFormTextarea
          name="description_uz"
          value={params.description_uz}
          onChange={handleInputChange}
        />
      ),
    },
  ]
  console.log(params.gallery)
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      const requiredFilters = forms.filter((item) => item.children.props.required)
      requiredFilters.map((msg) => {
        const value = msg.children.props.value
        if (msg.children.props.options?.length > 0) {
          if (value?.value === undefined || value?.value === null || value?.value === '') {
            toast.error(`${msg.label} - Заполните`)
          }
        } else if (value === undefined || value === null || value === '') {
          toast.error(`${msg.label} - Заполните`)
        }
      })
    } else {
      const formData = new FormData()
      formData.append('img', params.img)
      formData.append('old_gallery', JSON.stringify(params.gallery))
      params.new_gallery.forEach((item) => formData.append('gallery', item))
      formData.append('title_ru', params.title_ru)
      formData.append('title_uz', params.title_uz)
      formData.append('price', params.price || 0)
      formData.append('code', params.code || null)
      formData.append('money_type', params.money_type)
      formData.append('category_id', !params?.category_id ? category?.id : params?.category_id)
      params.characteristic.forEach((item, index) => {
        if (item?.value) {
          formData.append(`characteristic[${index}][label]`, item.label)
          formData.append(`characteristic[${index}][value]`, item.value)
        }
      })
      params.size.forEach((size, index) => {
        if (size) {
          formData.append(`size[${index}]`, size)
        }
      })
      formData.append('description_ru', params.description_ru)
      formData.append('description_uz', params.description_uz)
      edit(id, formData)
        .then((res) => {
          if (res?.message === 'Updated successfully') {
            toast.success('Успешно отредактировано')
            clearParams()
            onClose()
          }
        })
        .catch((err) => console.log('err', err))
    }
    setValidated(true)
  }

  return (
    <CModal size="xl" visible={visible} onClose={onClose} backdrop="static">
      <CModalHeader>
        <CModalTitle>Редактировать товар</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm noValidate validated={validated} onSubmit={handleSubmit}>
          {forms?.map((item, idx) => (
            <div key={idx} className="mt-2">
              <CFormLabel>{item.label}</CFormLabel>
              <CInputGroup>{item.children}</CInputGroup>
            </div>
          ))}
          <CModalFooter>
            <CButton color="secondary" onClick={onClose}>
              Закрыть
            </CButton>
            <CButton color="primary" type="submit" disabled={editLoading}>
              Сохранить
            </CButton>
          </CModalFooter>
        </CForm>
      </CModalBody>
    </CModal>
  )
}

export default ProductsEditModal
