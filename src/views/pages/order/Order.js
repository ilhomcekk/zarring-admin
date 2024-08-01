import { CButton, CCard, CCardHeader, CRow, CCol, CCardTitle } from '@coreui/react'
import OrderTable from './OrderTable'
import { useState } from 'react'
import OrderCreateModal from './OrderCreateModal'
import handleProductsStore from '../../../store/handleProducts'

const Order = () => {
  const { clearProducts } = handleProductsStore()
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
      <OrderCreateModal
        visible={modal}
        onClose={() => {
          setModal(false)
          clearProducts()
        }}
      />
    </>
  )
}

export default Order
