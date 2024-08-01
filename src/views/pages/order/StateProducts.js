import {
  CButton,
  CCallout,
  CCol,
  CFormInput,
  CFormSelect,
  CListGroup,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useState } from 'react'
import OrderEditstore from '../../../store/order'
import { BASE_URL } from '../../../config'
import productStore from '../../../store/products'
import handleProductsStore from '../../../store/handleProducts'
import { isHas } from '../../../utils'

const StateProductsModal = ({ visible, onClose }) => {
  const { getList } = OrderEditstore()
  const { stateProducts, toggleProduct, setCount } = handleProductsStore()
  console.log(stateProducts)
  const { productCodes, getList: getProducts, list: products } = productStore()
  const [params, setParams] = useState({
    user_name: '',
    user_number: '',
    status: 0,
    products: [],
  })
  const [productParams, setProductParams] = useState({
    page: 1,
    pageSize: 20,
    code: null,
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setParams({ ...params, [name]: value })
  }
  const handleChangeInput = (name, value) => {
    setProductParams({ ...params, [name]: value })
  }

  const handleSubmit = () => {}
  return (
    <CModal size="xl" visible={visible} onClose={onClose} backdrop="static">
      <CModalHeader>
        <CModalTitle>Товары</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow xs={{ gutter: 2 }}>
          <CCol xs={{ span: 12 }}>
            <div className="overflow-x-auto">
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">ИД</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Имя</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Количество</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Картинка</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Код</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Сумма</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {stateProducts?.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{item?.id}</CTableHeaderCell>
                      <CTableDataCell>{item?.title}</CTableDataCell>
                      <CTableDataCell>
                        <CFormInput
                          placeholder="Количество"
                          value={item?.count}
                          onChange={(e) => setCount(item, +e.target.value)}
                          type="number"
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <img src={BASE_URL + item?.img} width={50} height={50} alt="" />
                      </CTableDataCell>
                      <CTableDataCell>{item?.code}</CTableDataCell>
                      <CTableDataCell>{item?.price}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color={`${isHas(stateProducts, item?.id) ? 'danger' : 'primary'}`}
                          onClick={() => toggleProduct(item)}
                        >
                          {isHas(stateProducts, item?.id) ? 'Удалить' : 'Добавить'}
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" onClick={onClose}>
          Закрыть
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default StateProductsModal
