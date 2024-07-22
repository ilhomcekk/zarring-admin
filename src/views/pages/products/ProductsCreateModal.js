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
import React, { useState } from 'react'
import productStore from '../../../store/products'
import categoryStore from '../../../store/category'
import { toast } from 'react-toastify'

const ProductsCreateModal = ({ visible, onClose }) => {
  const { create, createLoading, getList } = productStore()
  const { categoryParents } = categoryStore()
  const [params, setParams] = useState({
    title_ru: '',
    title_uz: '',
    code: '',
    category_id: '',
    price: '',
    money_type: 'usd',
    img: null,
    description_ru: '',
    description_uz: '',
    characteristic: [
      { label: 'Rang', value: '' },
      { label: 'Proba', value: '' },
      { label: 'Narxi', value: '' },
      { label: 'Razmer', value: '' },
    ],
    gallery: [''],
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
      money_type: 'usd',
      img: null,
      description_ru: '',
      description_uz: '',
      characteristic: [
        { label: 'Rang', value: '' },
        { label: 'Proba', value: '' },
        { label: 'Narxi', value: '' },
        { label: 'Razmer', value: '' },
      ],
      gallery: [''],
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

  const removeAttribute = (index) => {
    const newAttributes = params.characteristic.filter((_, idx) => idx !== index)
    setParams({ ...params, characteristic: newAttributes })
  }

  const handleLabelChange = (index, newLabel) => {
    const newAttributes = [...params.characteristic]
    newAttributes[index].label = newLabel
    setParams({ ...params, characteristic: newAttributes })
  }
  const handleGalleryChange = (index, newImage) => {
    const newGallery = [...params.gallery]
    newGallery[index] = newImage
    setParams({ ...params, gallery: newGallery })
  }

  const addGalleryImage = () => {
    setParams({ ...params, gallery: [...params.gallery, null] })
  }

  const removeGalleryImage = (index) => {
    const newGallery = params.gallery.filter((_, idx) => idx !== index)
    setParams({ ...params, gallery: newGallery })
  }
  const forms = [
    {
      label: 'Имя ( RU )',
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
      children: (
        <CFormInput name="code" maxLength={6} value={params.code} onChange={handleInputChange} />
      ),
    },
    {
      label: 'Категория',
      children: (
        <CFormSelect
          value={category?.id}
          onChange={(e) => {
            if (e.target.value) {
              setCategory(categories?.find((item) => item?.id == e.target.value))
            } else {
              setCategory({})
              setParams({ ...params, category_id: '' })
            }
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
            <CFormSelect size="sm" name="money_type" onChange={handleInputChange}>
              <option value="usd">USD</option>
              <option value="uzs">UZS</option>
            </CFormSelect>
          </CInputGroupText>
        </>
      ),
    },
    {
      label: 'Основное изображение',
      children: <CFormInput type="file" onChange={(e) => handleFileChange(e, 'img')} />,
    },
    {
      label: 'Фотогалерея',
      children: (
        <div>
          {params?.gallery.map((_, idx) => (
            <div key={idx} className="mt-2">
              <CInputGroup>
                <CFormInput
                  type="file"
                  onChange={(e) => handleGalleryChange(idx, e.target.files[0])}
                />
                <CButton color="danger" className="ms-2" onClick={() => removeGalleryImage(idx)}>
                  <CIcon icon={cilTrash} style={{ '--ci-primary-color': 'white' }} />
                </CButton>
              </CInputGroup>
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
      label: 'Описание ( RU )',
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
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      const formData = new FormData()
      formData.append('img', params.img)
      const galleryArray = Array.isArray(params.gallery) ? params.gallery : [params.gallery]
      galleryArray.forEach((file, index) => {
        formData.append('gallery', file)
      })
      formData.append('title_ru', params.title_ru)
      formData.append('title_uz', params.title_uz)
      formData.append('price', params.price || 0)
      formData.append('money_type', params.money_type)
      formData.append('category_id', !params?.category_id ? category?.id : params?.category_id)
      params.characteristic.forEach((item, index) => {
        if (item?.value) {
          formData.append(`characteristic[${index}][label]`, item.label)
          formData.append(`characteristic[${index}][value]`, item.value)
        }
      })
      formData.append('description_ru', params.description_ru)
      formData.append('description_uz', params.description_uz)
      create(formData)
        .then((res) => {
          if (res?.data?.id) {
            toast.success('Успешно создано')
            getList({
              page: 1,
              pageSize: 20,
            })
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
        <CModalTitle>Создать товар</CModalTitle>
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
            <CButton color="secondary">Закрыть</CButton>
            <CButton color="primary" type="submit" disabled={createLoading}>
              Сохранить
            </CButton>
          </CModalFooter>
        </CForm>
      </CModalBody>
    </CModal>
  )
}

export default ProductsCreateModal
