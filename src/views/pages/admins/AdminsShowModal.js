import {
  CBadge,
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
import {
  findRoleColorFromNumber,
  findRoleFromNumber,
  findStatusColorFromNumber,
  findStatusFromNumber,
} from '../../../utils'

const AdminsShowModal = ({ visible, onClose, item }) => {
  return (
    <CModal size="xl" visible={visible} onClose={onClose} backdrop="static">
      <CModalHeader>
        <CModalTitle>ID: ( {item?.id} )</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow xs={{ gutter: 2 }}>
          <CCol xs={{ span: 6 }}>
            <CCallout className="p-2 m-0" color="primary">
              ИД
            </CCallout>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CListGroup>
              <CListGroupItem className="p-2">{item?.id}</CListGroupItem>
            </CListGroup>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CCallout className="p-2 m-0" color="primary">
              Логин
            </CCallout>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CListGroup>
              <CListGroupItem className="p-2">{item?.login}</CListGroupItem>
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
              <CListGroupItem className="p-2">{item?.phone}</CListGroupItem>
            </CListGroup>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CCallout className="p-2 m-0" color="primary">
              Роль
            </CCallout>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CListGroup>
              <CListGroupItem className="p-2">
                <CBadge color={findRoleColorFromNumber(item?.role)}>
                  {findRoleFromNumber(item?.role)}
                </CBadge>
              </CListGroupItem>
            </CListGroup>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CCallout className="p-2 m-0" color="primary">
              Статус
            </CCallout>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CListGroup>
              <CListGroupItem className="p-2">
                <CBadge color={findStatusColorFromNumber(item?.status)}>
                  {findStatusFromNumber(item?.status)}
                </CBadge>
              </CListGroupItem>
            </CListGroup>
          </CCol>
        </CRow>
      </CModalBody>
    </CModal>
  )
}

export default AdminsShowModal
