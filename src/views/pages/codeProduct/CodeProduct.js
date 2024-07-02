import { CButton, CCard, CCardHeader, CRow, CCol, CCardTitle } from '@coreui/react'
import CodeProductTable from './CodeProductTable'
import CodeProductCreateModal from './CodeProductCreateModal'
import { useState } from 'react'

const CodeProduct = () => {
  const [modal, setModal] = useState(false)
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol className="d-flex align-items-center">
              <CCardTitle className="mb-0">Код товара</CCardTitle>
            </CCol>
            <CCol className="d-flex justify-content-end">
              <CButton color="primary" onClick={() => setModal(true)}>
                Создать
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CodeProductTable />
      </CCard>
      <CodeProductCreateModal visible={modal} onClose={() => setModal(false)} />
    </>
  )
}

export default CodeProduct
