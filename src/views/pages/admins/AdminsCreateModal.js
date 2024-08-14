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
import BannerStore from '../../../store/banner'
import { toast } from 'react-toastify'

const AdminsCreateModal = ({ visible, onClose }) => {
  const { create, createLoading, getList, list } = BannerStore()
  const [params, setParams] = useState({
    name_ru: '',
    name_uz: '',
    img: null,
  })
  const [validated, setValidated] = useState(false)

  const clearParams = () => {
    setParams({
      name_ru: '',
      name_uz: '',
      img: null,
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
        <CFormInput name="name_ru" value={params.name_ru} onChange={handleInputChange} required />
      ),
    },
    {
      label: 'Имя ( UZ )',
      children: <CFormInput name="name_uz" value={params.name_uz} onChange={handleInputChange} />,
    },
    {
      label: 'Основное изображение',
      children: (
        <>
          <CFormInput type="file" onChange={(e) => handleFileChange(e, 'img')} />
          <CButton
            color="danger"
            onClick={() =>
              setParams((prev) => ({
                ...prev,
                img: null,
              }))
            }
          >
            Удалить
          </CButton>
          {params.img && (
            <div className="w-100">
              <img
                src={URL.createObjectURL(params.img)}
                alt="Uploaded"
                style={{ maxWidth: '300px' }}
              />
            </div>
          )}
        </>
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
    <CModal size="xl" visible={visible} onClose={onClose} backdrop="static">
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

export default AdminsCreateModal
