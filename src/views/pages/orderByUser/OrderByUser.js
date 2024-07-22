import { CCard, CCardHeader, CRow, CCol, CCardTitle, CFormInput } from '@coreui/react'
import OrderByUserTable from './OrderTable'
import orderStore from '../../../store/order'
import { useState } from 'react'

const OrderByUser = () => {
  const { getListByUser } = orderStore()
  const [params, setParams] = useState({
    page: 1,
    pageSize: 20,
    user_name: null,
  })
  const handleChangeInput = (name, value) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      [name]: value || null,
    }))
  }
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      getListByUser(params)
    }
  }
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol className="d-flex align-items-center">
              <CCardTitle className="mb-0">Заказы</CCardTitle>
            </CCol>
            <CCol>
              <CFormInput
                placeholder="Поиск"
                type="text"
                value={params?.user_name}
                onChange={(e) => handleChangeInput('user_name', e.target.value)}
                onKeyPress={handleSearch}
              />
            </CCol>
          </CRow>
        </CCardHeader>
        <OrderByUserTable />
      </CCard>
    </>
  )
}

export default OrderByUser
