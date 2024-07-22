import { CButton, CCard, CCardHeader, CRow, CCol, CCardTitle } from '@coreui/react'
import CategoryTable from './CategoryTable'
import CategoryCreateModal from './CategoryCreateModal'
import { useEffect, useState } from 'react'
import categoryStore from '../../../store/category'

const Category = () => {
  const { getParents } = categoryStore()
  const [modal, setModal] = useState(false)
  useEffect(() => {
    getParents()
  }, [])
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
        <CategoryTable />
      </CCard>
      <CategoryCreateModal visible={modal} onClose={() => setModal(false)} />
    </>
  )
}

export default Category
