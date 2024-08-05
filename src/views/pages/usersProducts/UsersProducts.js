import { CButton, CCard, CCardHeader, CRow, CCol, CCardTitle } from '@coreui/react'
import BannerTable from './UsersProductsTable'
import BannerCreateModal from './BannerCreateModal'
import { useState } from 'react'

const UsersProducts = () => {
  const [modal, setModal] = useState(false)
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol className="d-flex align-items-center">
              <CCardTitle className="mb-0">Категории</CCardTitle>
            </CCol>
            {/* <CCol className="d-flex justify-content-end">
              <CButton color="primary" onClick={() => setModal(true)}>
                Создать
              </CButton>
            </CCol> */}
          </CRow>
        </CCardHeader>
        <BannerTable />
      </CCard>
      <BannerCreateModal visible={modal} onClose={() => setModal(false)} />
    </>
  )
}

export default UsersProducts
