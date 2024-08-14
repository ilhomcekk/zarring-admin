import { CButton, CCard, CCardHeader, CRow, CCol, CCardTitle } from '@coreui/react'
import AdminsTable from './AdminsTable'
import AdminsCreateModal from './AdminsCreateModal'
import { useState } from 'react'

const Admins = () => {
  const [modal, setModal] = useState(false)
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol className="d-flex align-items-center">
              <CCardTitle className="mb-0">Админы</CCardTitle>
            </CCol>
            <CCol className="d-flex justify-content-end">
              <CButton color="primary" onClick={() => setModal(true)}>
                Создать
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <AdminsTable />
      </CCard>
      <AdminsCreateModal visible={modal} onClose={() => setModal(false)} />
    </>
  )
}

export default Admins
