import { CButton, CCard, CCardHeader, CRow, CCol, CCardTitle } from '@coreui/react'
import ProductsTable from './ProductsTable'
import ProductsCreateModal from './ProductsCreateModal'
import { useState } from 'react'

const Products = () => {
  const [modal, setModal] = useState(false)
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol className="d-flex align-items-center">
              <CCardTitle className="mb-0">Продукты</CCardTitle>
            </CCol>
            <CCol className="d-flex justify-content-end">
              <CButton color="primary" onClick={() => setModal(true)}>
                Создать
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <ProductsTable />
      </CCard>
      <ProductsCreateModal visible={modal} onClose={() => setModal(false)} />
    </>
  )
}

export default Products
