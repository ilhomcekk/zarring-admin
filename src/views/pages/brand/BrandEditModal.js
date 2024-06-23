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
import Brandstore from '../../../store/brand'
import { BASE_URL } from '../../../config'
import { toast } from 'react-toastify'

const BrandEditModal = ({ visible, onClose, id }) => {
  const { detail, getDetail, getList, edit, editLoading } = Brandstore()
  const [params, setParams] = useState({
    name_ru: '',
    name_uz: '',
    img: null,
    description: '',
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

  useEffect(() => {
    if (visible) {
      getDetail(id)
    }
  }, [visible])
  useEffect(() => {
    setParams(() => ({
      name_ru: detail?.name_ru,
      name_uz: detail?.name_uz,
      img: detail?.img,
      description: detail?.description,
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
    {
      label: 'Основное изображение',
      children: (
        <div>
          <CFormInput type="file" onChange={(e) => handleFileChange(e, 'img')} />
          <img src={BASE_URL + detail?.img} alt="" />
        </div>
      ),
    },
    {
      label: 'Описание',
      children: (
        <CFormTextarea
          name="description"
          onChange={handleInputChange}
          value={params?.description}
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
        .then((res) => {
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

export default BrandEditModal
