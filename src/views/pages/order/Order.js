import { CButton, CCard, CCardHeader, CRow, CCol, CCardTitle } from '@coreui/react'
import OrderTable from './OrderTable'
import { useState } from 'react'
import OrderCreateModal from './OrderCreateModal'
import handleProductsStore from '../../../store/handleProducts'
import OrderExcelModal from './OrderExcelModal'

const Order = () => {
  const { clearProducts } = handleProductsStore()
  const [params, setParams] = useState({})
  const [modal, setModal] = useState(false)
  const [excelModal, setExcelModal] = useState(false)
  console.log('params,', params)
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol className="d-flex align-items-center">
              <CCardTitle className="mb-0">Заказы</CCardTitle>
            </CCol>
            <CCol className="d-flex justify-content-end gap-2">
              <CButton color="primary" onClick={() => setExcelModal(true)}>
                Скачать в Excel
              </CButton>
              <CButton color="primary" onClick={() => setModal(true)}>
                Создать
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <OrderTable setFilter={setParams} />
      </CCard>
      <OrderCreateModal
        visible={modal}
        onClose={() => {
          setModal(false)
          clearProducts()
        }}
      />
      <OrderExcelModal visible={excelModal} onClose={() => setExcelModal(false)} />
    </>
  )
}

export default Order
