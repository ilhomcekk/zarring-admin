import { CCard, CCardHeader, CRow, CCol, CCardTitle } from '@coreui/react'
import CodeProductTable from './CodeProductTable'

const CodeProduct = () => {
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol className="d-flex align-items-center">
              <CCardTitle className="mb-0">Код товара</CCardTitle>
            </CCol>
          </CRow>
        </CCardHeader>
        <CodeProductTable />
      </CCard>
    </>
  )
}

export default CodeProduct
