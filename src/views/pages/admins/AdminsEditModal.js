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
import { BASE_URL } from '../../../config'
import adminsStore from '../../../store/admins'
import { roleList, statusList } from '../../../utils'
import { toast } from 'react-toastify'

const AdminsEditModal = ({ visible, onClose, id }) => {
  const { detail, getDetail, getList, edit, editLoading } = adminsStore()
  const [params, setParams] = useState({
    login: '',
    name: '',
    phone: '',
    password: '',
    role: '',
    status: '',
  })
  const [validated, setValidated] = useState(false)
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setParams({ ...params, [name]: value })
  }

  useEffect(() => {
    if (visible) {
      getDetail(id)
    }
  }, [visible])
  useEffect(() => {
    setParams(() => ({
      login: detail?.login,
      name: detail?.name,
      phone: detail?.phone,
      role: detail?.role,
      status: detail?.status,
    }))
  }, [detail])

  const forms = [
    {
      label: 'Имя',
      children: (
        <CFormInput name="name" onChange={handleInputChange} value={params?.name} required />
      ),
    },
    {
      label: 'Логин',
      children: (
        <CFormInput name="login" onChange={handleInputChange} value={params?.login} required />
      ),
    },
    {
      label: 'Номер телефона',
      children: (
        <CFormInput name="phone" onChange={handleInputChange} value={params?.phone} required />
      ),
    },
    {
      label: 'Пароль',
      children: (
        <CFormInput name="password" onChange={handleInputChange} value={params?.password} />
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
      edit(id, params)
        .then(() => {
          toast.success('Успешно создано')
          getList({
            page: 1,
            pageSize: 20,
          })
          onClose()
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

export default AdminsEditModal
