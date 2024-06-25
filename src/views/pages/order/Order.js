import { CButton, CCard, CCardHeader, CRow, CCol, CCardTitle } from '@coreui/react'
import OrderTable from './OrderTable'

const Order = () => {
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol className="d-flex align-items-center">
              <CCardTitle className="mb-0">Категории</CCardTitle>
            </CCol>
            <CCol className="d-flex justify-content-end">
              <CButton color="primary" onClick={() => setModal(true)}>
                Создать
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <OrderTable />
      </CCard>
    </>
  )
}

export default Order
