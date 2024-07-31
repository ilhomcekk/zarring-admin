import { CButton, CCard, CCardHeader, CRow, CCol, CCardTitle } from '@coreui/react'
import OrderTable from './OrderTable'
import { useState } from 'react'
import OrderCreateModal from './OrderCreateModal'

const Order = () => {
  const [modal, setModal] = useState(false)
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol className="d-flex align-items-center">
              <CCardTitle className="mb-0">Заказы</CCardTitle>
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
      <OrderCreateModal visible={modal} onClose={() => setModal(false)} />
    </>
  )
}

export default Order
