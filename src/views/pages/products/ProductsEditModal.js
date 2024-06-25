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

const ProductsEditModal = ({ visible, onClose, id }) => {
  const { detail, getDetail } = productStore()
  const [params, setParams] = useState({
    
  })
  const [validated, setValidated] = useState(false)

  const defaultAttributes = [
    { label: 'Rang', value: '' },
    { label: 'Proba', value: '' },
    { label: 'Narxi', value: '' },
    { label: 'Razmer', value: '' },
  ]

  const [attributes, setAttributes] = useState(defaultAttributes)
  const [gallery, setGallery] = useState([''])

  const handleAttributeChange = (index, newValue) => {
    const newAttributes = [...attributes]
    newAttributes[index].value = newValue
    setAttributes(newAttributes)
  }

  const addAttribute = () => {
    setAttributes([...attributes, { label: '', value: '' }])
  }

  const removeAttribute = (index) => {
    const newAttributes = attributes.filter((_, idx) => idx !== index)
    setAttributes(newAttributes)
  }

  const handleLabelChange = (index, newLabel) => {
    const newAttributes = [...attributes]
    newAttributes[index].label = newLabel
    setAttributes(newAttributes)
  }
  const handleGalleryChange = (index, newImage) => {
    const newGallery = [...gallery]
    newGallery[index] = newImage
    setGallery(newGallery)
  }

  const addGalleryImage = () => {
    setGallery([...gallery, ''])
  }

  const removeGalleryImage = (index) => {
    const newGallery = gallery.filter((_, idx) => idx !== index)
    setGallery(newGallery)
  }

  useEffect(() => {
    if (visible) {
      getDetail(id)
    }
  }, [visible])

  const forms = [
    {
      label: 'Имя ( RU )',
      children: <CFormInput required />,
    },
    {
      label: 'Имя ( UZ )',
      children: <CFormInput />,
    },
    {
      label: 'Категория',
      children: (
        <CFormSelect
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
      label: 'Стоимость',
      children: (
        <>
          <CFormInput required />
          <CInputGroupText>$</CInputGroupText>
        </>
      ),
    },
    {
      label: 'Количество',
      children: <CFormInput required />,
    },
    {
      label: 'Основное изображение',
      children: <CFormInput type="file" />,
    },
    {
      label: 'Фотогалерея',
      children: (
        <div>
          {gallery.map((_, idx) => (
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
          {attributes?.map((attribute, idx) => (
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
      children: <CFormTextarea />,
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

export default ProductsEditModal
