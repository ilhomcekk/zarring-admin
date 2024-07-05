import { CButton, CCard, CCardHeader, CRow, CCol, CCardTitle } from '@coreui/react'
import BrandTable from './BrandTable'
import BrandCreateModal from './BrandCreateModal'
import { useState } from 'react'

const Brand = () => {
  const [modal, setModal] = useState(false)
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol className="d-flex align-items-center">
              <CCardTitle className="mb-0">Бренды</CCardTitle>
            </CCol>
            <CCol className="d-flex justify-content-end">
              <CButton color="primary" onClick={() => setModal(true)}>
                Создать
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <BrandTable />
      </CCard>
      <BrandCreateModal visible={modal} onClose={() => setModal(false)} />
    </>
  )
}

export default Brand
