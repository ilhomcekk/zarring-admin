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
import categoryStore from '../../../store/category'
import { toast } from 'react-toastify'

const CategoryCreateModal = ({ visible, onClose }) => {
  const { create, createLoading, getList, list } = categoryStore()
  const [params, setParams] = useState({
    title_ru: '',
    title_uz: '',
    img: null,
    parentId: null,
    description_ru: '',
    description_uz: '',
  })
  const [category, setCategory] = useState({})
  const [validated, setValidated] = useState(false)

  const clearParams = () => {
    setParams({
      title_ru: '',
      title_uz: '',
      img: null,
      parentId: null,
      description_ru: '',
      description_uz: '',
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setParams({ ...params, [name]: value })
  }

  const handleFileChange = (e, name) => {
    const file = e.target.files[0]
    setParams({ ...params, [name]: file })
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
          value={params?.parentId}
          name="parentId"
          onChange={handleInputChange}
          options={[
            '',
            ...list?.map((item) => ({
              label: item?.title_ru,
              value: item?.id,
            })),
          ]}
        />
      ),
    },
    {
      label: 'Основное изображение',
      children: <CFormInput type="file" onChange={(e) => handleFileChange(e, 'img')} />,
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
      create(params)
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
    <CModal size="xl" visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Создать категории</CModalTitle>
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

export default CategoryCreateModal
