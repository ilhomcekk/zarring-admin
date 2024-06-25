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

const ProductsShowModal = ({ visible, onClose, item }) => {
  return (
    <CModal size="xl" visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Товар ( {item?.id} )</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow xs={{ gutter: 2 }}>
          <CCol xs={{ span: 6 }}>
            <CCallout className="p-2 m-0" color="primary">
              Имя
            </CCallout>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CListGroup>
              <CListGroupItem className="p-2">{item?.title_ru}</CListGroupItem>
            </CListGroup>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CCallout className="p-2 m-0" color="primary">
              Категория
            </CCallout>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CListGroup>
              <CListGroupItem className="p-2">{item?.category_id}</CListGroupItem>
            </CListGroup>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CCallout className="p-2 m-0" color="primary">
              Цена
            </CCallout>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CListGroup>
              <CListGroupItem className="p-2">{item?.price}</CListGroupItem>
            </CListGroup>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CCallout className="p-2 m-0" color="primary">
              Картинка
            </CCallout>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CListGroup>
              <CListGroupItem className="p-2">
                <img src={BASE_URL + item?.img} alt="" />
              </CListGroupItem>
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
        </CRow>
      </CModalBody>
    </CModal>
  )
}

export default ProductsShowModal
