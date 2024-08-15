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
import { toast } from 'react-toastify'
import adminsStore from '../../../store/admins'
import { roleList, statusList } from '../../../utils'

const AdminsCreateModal = ({ visible, onClose }) => {
  const { create, createLoading, getList } = adminsStore()
  const [params, setParams] = useState({
    login: '',
    name: '',
    phone: '',
    password: '',
    role: '',
    status: '',
  })
  const [validated, setValidated] = useState(false)

  const clearParams = () => {
    setParams({
      login: '',
      name: '',
      phone: '',
      password: '',
      role: '',
      status: '',
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setParams({ ...params, [name]: value })
  }

  const forms = [
    {
      label: 'Логин',
      children: (
        <CFormInput name="login" value={params.login} onChange={handleInputChange} required />
      ),
    },
    {
      label: 'Имя',
      children: (
        <CFormInput name="name" value={params.name} onChange={handleInputChange} required />
      ),
    },
    {
      label: 'Номер телефона',
      children: (
        <CFormInput name="phone" value={params.phone} onChange={handleInputChange} required />
      ),
    },
    {
      label: 'Пароль',
      children: (
        <CFormInput name="password" value={params.password} onChange={handleInputChange} required />
      ),
    },
    {
      label: 'Роль',
      children: (
        <CFormSelect
          name="role"
          value={params?.role}
          onChange={handleInputChange}
          required
          options={[
            '',
            ...roleList?.map((item) => ({
              label: item?.name,
              value: item?.value,
            })),
          ]}
        />
      ),
    },
    {
      label: 'Статус',
      children: (
        <CFormSelect
          name="status"
          value={params?.status}
          onChange={handleInputChange}
          required
          options={[
            '',
            ...statusList?.map((item) => ({
              label: item?.name,
              value: item?.value,
            })),
          ]}
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
    <CModal size="xl" visible={visible} onClose={onClose} backdrop="static">
      <CModalHeader>
        <CModalTitle>Создать админ</CModalTitle>
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
