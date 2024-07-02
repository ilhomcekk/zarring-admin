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
import CodeProductStore from '../../../store/codeProduct'
import { toast } from 'react-toastify'

const CodeProductCreateModal = ({ visible, onClose }) => {
  const { create, createLoading, getList, list } = CodeProductStore()
  const [params, setParams] = useState({
    name_ru: '',
    name_uz: '',
  })
  const [validated, setValidated] = useState(false)

  const clearParams = () => {
    setParams({
      name_ru: '',
      name_uz: '',
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setParams({ ...params, [name]: value })
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
        <CModalTitle>Создать код товара</CModalTitle>
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

export default CodeProductCreateModal
