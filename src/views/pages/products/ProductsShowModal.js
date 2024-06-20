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

const ProductsShowModal = ({ visible, onClose }) => {
  return (
    <CModal size="xl" visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Товар ( 52 )</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol>
            <CCallout className="p-2 m-0" color="primary">
              Имя
            </CCallout>
          </CCol>
          <CCol>
            <CListGroup>
              <CListGroupItem className="p-2">Товар</CListGroupItem>
            </CListGroup>
          </CCol>
        </CRow>
      </CModalBody>
    </CModal>
  )
}

export default ProductsShowModal
