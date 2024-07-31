import { cilMinus, cilPlus, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CBadge,
  CButton,
  CCallout,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CListGroup,
  CListGroupItem,
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
import React, { useEffect, useState } from 'react'
import OrderEditstore from '../../../store/order'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../../config'
import {
  setColorFromStatus,
  setStaticColorFromStatus,
  setTextFromStatus,
  statusList,
} from '../../../helpers/form'
import productStore from '../../../store/products'
import handleProductsStore from '../../../store/handleProducts'

const OrderCreateModal = ({ visible, onClose }) => {
  const { getList } = OrderEditstore()
  const { products: stateProducts, toggleProduct } = handleProductsStore()
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
        <CModalTitle>Создать заказ</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow xs={{ gutter: 2 }}>
          <CCol xs={{ span: 6 }}>
            <CCallout className="p-2 m-0" color="primary">
              Имя заказчика
            </CCallout>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CListGroup>
              <CFormInput name="user_name" onChange={handleInputChange} value={params?.user_name} />
            </CListGroup>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CCallout className="p-2 m-0" color="primary">
              Номер заказчика
            </CCallout>
          </CCol>
          <CCol xs={{ span: 6 }}>
            <CListGroup>
              <CFormInput
                name="user_number"
                onChange={handleInputChange}
                value={params?.user_number}
              />
            </CListGroup>
          </CCol>
          <CCol xs={{ span: 12 }}>
            <CCallout className="p-2 m-0" color="primary">
              Товары
            </CCallout>
          </CCol>
          <CCol xs={{ span: 12 }}>
            <div className="overflow-x-auto">
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">ИД</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Картинка</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Имя</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Количество</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Код</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Сумма</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="col">
                      <CFormSelect
                        name="code"
                        value={productParams?.code}
                        onChange={(e) => {
                          handleChangeInput('code', e.target.value)
                          getProducts({
                            ...productParams,
                            page: 1,
                            pageSize: 20,
                            code: e.target.value || null,
                          })
                        }}
                        options={[
                          '',
                          ...productCodes?.map((item) => ({
                            label: item?.code,
                            value: item?.code,
                          })),
                        ]}
                      />
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {products?.data?.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{item?.id}</CTableHeaderCell>
                      <CTableDataCell>{item?.title}</CTableDataCell>
                      <CTableDataCell>
                        <img src={BASE_URL + item?.img} width={50} height={50} alt="" />
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormInput placeholder="Количество" name="count" type="number" />
                      </CTableDataCell>
                      <CTableDataCell>{item?.code}</CTableDataCell>
                      <CTableDataCell>{item?.price}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="primary" onClick={() => toggleProduct(item)}>
                          Добавить
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
        <CButton color="primary" onClick={handleSubmit}>
          Сохранить
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default OrderCreateModal
