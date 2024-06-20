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

const ProductsCreateModal = ({ visible, onClose }) => {
  const [params, setParams] = useState({
    title_ru: '',
    title_uz: '',
    category_id: '',
    price: '',
    amount: '',
    img: null,
    description: '',
    attributes: [
      { label: 'Rang', value: '' },
      { label: 'Proba', value: '' },
      { label: 'Narxi', value: '' },
      { label: 'Razmer', value: '' },
    ],
    gallery: [''],
  })
  const [validated, setValidated] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setParams({ ...params, [name]: value })
  }

  const handleFileChange = (e, name) => {
    const file = e.target.files[0]
    setParams({ ...params, [name]: file })
  }

  const handleAttributeChange = (index, newValue) => {
    const newAttributes = [...params.attributes]
    newAttributes[index].value = newValue
    setParams({ ...params, attributes: newAttributes })
  }

  const addAttribute = () => {
    setParams({ ...params, attributes: [...params.attributes, { label: '', value: '' }] })
  }

  const removeAttribute = (index) => {
    const newAttributes = params.attributes.filter((_, idx) => idx !== index)
    setParams({ ...params, attributes: newAttributes })
  }

  const handleLabelChange = (index, newLabel) => {
    const newAttributes = [...params.attributes]
    newAttributes[index].label = newLabel
    setParams({ ...params, attributes: newAttributes })
  }
  const handleGalleryChange = (index, newImage) => {
    const newGallery = [...params.gallery]
    newGallery[index] = newImage
    setParams({ ...params, gallery: newGallery })
  }

  const addGalleryImage = () => {
    setParams({ ...params, gallery: [...params.gallery, ''] })
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
      label: 'Категория',
      children: (
        <CFormSelect
          name="category_id"
          value={params.category_id}
          onChange={handleInputChange}
          required
          options={[
            '',
            { label: 'Категория 1', value: '1' },
            { label: 'Категория 2', value: '2' },
            { label: 'Категория 3', value: '3' },
          ]}
        />
      ),
    },
    {
      label: 'Цена',
      children: (
        <>
          <CFormInput required name="price" value={params.price} onChange={handleInputChange} />
          <CInputGroupText>$</CInputGroupText>
        </>
      ),
    },
    {
      label: 'Количество',
      children: (
        <CFormInput name="amount" value={params.amount} onChange={handleInputChange} required />
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
          {params.attributes?.map((attribute, idx) => (
            <div key={idx} className="mt-2 w-100">
              <CInputGroup>
                <CFormInput
                  placeholder="Label"
                  value={attribute.label}
                  onChange={(e) => handleLabelChange(idx, e.target.value)}
                  className="me-2"
                />
                <CFormInput
                  placeholder="Value"
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
      label: 'Описание',
      children: (
        <CFormTextarea name="description" value={params.description} onChange={handleInputChange} />
      ),
    },
  ]
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }
  console.log(params)
  return (
    <CModal size="xl" visible={visible} onClose={onClose}>
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
            <CButton color="primary" type="submit">
              Сохранить
            </CButton>
          </CModalFooter>
        </CForm>
      </CModalBody>
    </CModal>
  )
}

export default ProductsCreateModal
