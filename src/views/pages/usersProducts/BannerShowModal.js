import {
  CCallout,
  CCol,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import React from 'react'
import { BASE_URL } from '../../../config'

const BannerShowModal = ({ visible, onClose, item }) => {
  return (
    <CModal size="xl" visible={visible} onClose={onClose} backdrop="static">
      <CModalHeader>
        <CModalTitle>ID: ( {item?.order_id} )</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow xs={{ gutter: 2 }}>
          <CCol xs={{ span: 6 }}>
            <CCallout className="p-2 m-0" color="primary">
              Заказ ИД
            </CCallout>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CListGroup>
              <CListGroupItem className="p-2">{item?.order_id}</CListGroupItem>
            </CListGroup>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CCallout className="p-2 m-0" color="primary">
              Имя
            </CCallout>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CListGroup>
              <CListGroupItem className="p-2">{item?.name}</CListGroupItem>
            </CListGroup>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CCallout className="p-2 m-0" color="primary">
              Номер телефона
            </CCallout>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CListGroup>
              <CListGroupItem className="p-2">{item?.number}</CListGroupItem>
            </CListGroup>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CCallout className="p-2 m-0" color="primary">
              Количество товаров
            </CCallout>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CListGroup>
              <CListGroupItem className="p-2">{item?.product_count}</CListGroupItem>
            </CListGroup>
          </CCol>
        </CRow>
      </CModalBody>
    </CModal>
  )
}

export default BannerShowModal
