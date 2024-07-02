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
import OrderEditstore from '../../../store/order'

const OrderEditModal = ({ visible, onClose, id }) => {
  const { detail, getDetail, getList, edit, editLoading } = OrderEditstore()
  const [params, setParams] = useState({
    name_ru: '',
    name_uz: '',
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
      name_ru: detail?.dataValues?.name_ru,
      name_uz: detail?.dataValues?.name_uz,
    }))
  }, [detail])

  const forms = [
    {
      label: 'Имя ( RU )',
      children: (
        <CFormInput name="name_ru" onChange={handleInputChange} value={params?.name_ru} required />
      ),
    },
    {
      label: 'Имя ( UZ )',
      children: <CFormInput name="name_uz" onChange={handleInputChange} value={params?.name_uz} />,
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
        .then((res) => {
          console.log(res, 'asdasdas')
          if (res?.data?.id) {
            toast.success('Успешно создано')
            getList({
              page: 1,
              pageSize: 20,
            })
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
        <CModalTitle>Изменить заказа</CModalTitle>
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

export default OrderEditModal
