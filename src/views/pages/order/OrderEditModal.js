import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CBadge,
  CButton,
  CCallout,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import OrderEditstore from '../../../store/order'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../../config'
import {
  setColorFromStatus,
  setStaticColorFromStatus,
  setTextFromStatus,
  statusList,
} from '../../../helpers/form'

const OrderEditModal = ({ visible, onClose, id }) => {
  const { detail: item, getDetail, getList, edit, editLoading } = OrderEditstore()
  const [params, setParams] = useState({
    user_name: '',
    user_number: '',
    status: 0,
  })
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
    setParams({
      user_name: item?.user_name,
      user_number: item?.user_number,
      status: item?.status,
    })
  }, [item])

  const handleSubmit = () => {
    edit(id, params)
      .then((res) => {
        console.log(res, 'asdasdas')
        if (res?.data) {
          toast.success('Успешно')
          getList({
            page: 1,
            pageSize: 20,
          })
          onClose()
        }
      })
      .catch((err) => console.log('err', err))
  }
  return (
    <CModal size="xl" visible={visible} onClose={onClose} backdrop="static">
      <CModalHeader>
        <CModalTitle>Заказ № ( {item?.id} )</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow xs={{ gutter: 2 }}>
          <CCol xs={{ span: 6 }}>
            <CCallout className="p-2 m-0" color="primary">
              Имя заказчика
            </CCallout>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CListGroup>
              <CFormInput name="user_name" onChange={handleInputChange} value={params?.user_name} />
            </CListGroup>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CCallout className="p-2 m-0" color="primary">
              Номер заказчика
            </CCallout>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CListGroup>
              <CFormInput
                name="user_number"
                onChange={handleInputChange}
                value={params?.user_number}
              />
            </CListGroup>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CCallout className="p-2 m-0" color="primary">
              Статус заказа
            </CCallout>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CListGroup>
              <CFormSelect
                name="status"
                className="w-50"
                value={params?.status}
                onChange={handleInputChange}
                options={statusList?.map((item) => ({
                  label: item?.name,
                  value: item?.value,
                }))}
                style={{
                  background: setStaticColorFromStatus(params?.status),
                }}
              />
              {/* <CListGroupItem className="p-2">
                {
                  <CBadge className="p-2" color={setColorFromStatus(item?.status)}>
                    {setTextFromStatus(item?.status)}
                  </CBadge>
                }
              </CListGroupItem> */}
            </CListGroup>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CCallout className="p-2 m-0" color="primary">
              Время
            </CCallout>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CListGroup>
              <CListGroupItem className="p-2">{item?.createdAt}</CListGroupItem>
            </CListGroup>
          </CCol>
          <CCol xs={{ span: 12 }}>
            <CCallout className="p-2 m-0" color="primary">
              Товары
            </CCallout>
          </CCol>
          <CCol xs={{ span: 12 }}>
            <div className="overflow-x-auto">
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">ИД</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Картинка</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Имя</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Количество</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Код</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Сумма</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {item?.products?.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{item?.id}</CTableHeaderCell>
                      <CTableDataCell>{item?.title}</CTableDataCell>
                      <CTableDataCell>
                        <img src={BASE_URL + item?.img} width={50} height={50} alt="" />
                      </CTableDataCell>
                      <CTableDataCell>{item?.count}</CTableDataCell>
                      <CTableDataCell>{item?.code}</CTableDataCell>
                      <CTableDataCell>{item?.price}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={handleSubmit}>
          Сохранить
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default OrderEditModal
